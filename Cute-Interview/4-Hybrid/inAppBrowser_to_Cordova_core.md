![inAppBrowser_to_Cordova_core.jpg](http://images.pingan8787.com/image/blog/inAppBrowser_to_Cordova_core.jpg)

## 一、流程简介

`InAppBrowser` 调用 `Cordova` 插件的流程共分为 9 个步骤：

1. 前端进入页面，加载 JSSDK（`jexe.js`）；

2. 动态加载对应平台的 `Cordova.js` 及 `Cordova` 插件；

3. 用户触发请求事件， 前端调用 `Cordova` 插件；

4. 前端传递 `command` 参数与 Native 层通信（如 iOS 端使用 `postMessage`）；

5. Native 层接收并解析前端传入的 参数，调用对应 `Cordova` 插件，将插件和主 `WebView` 绑定；

6. 主 `WebView` 中调用 `callbackFromNative`；

7. 执行 `callbackFromNative` ，调用 `InAppBrowser` 实例的 `executeScript` 方法进行结果回传；

8. 将调用结果进行回传到 `InAppBorwser` 层中；

9. 调用 `InAppBorwser` 层的 `callbackFromNative`，调用前端回调函数；

## 二、流程分析

接下来的介绍，将以 iOS 端调用 `Cordova` 的 `ImagePicker` 插件为例，介绍整个从 `InAppBrowser` 调用 `Cordova` 插件的流程。

### 1. 前端页面加载 JSSDK

当用户进入页面时，会开始加载 JSSDK 文件（`jexe.js`）。

```html
<script src="./dist/js/jexe.js"></script>
```

### 2. 动态添加不同平台 Cordova 及插件

在 `jexe.js` 文件中，主要有两部分逻辑：

1. 我们原本的 JSSDK 文件，及 `exe.app.js`；

2. 判断设备平台的逻辑，并动态添加 `Cordova.js` 及插件；

```js
// 判断平台 动态加载

// .... 省略其他 有精简
var u = $window.navigator.userAgent;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var flatform = isIOS ? 'cdvi' : 'cdva';
var cordovaPath = `./dist/js/${flatform}.min.js`;
var script = $window.document.createElement('script');
script.src = cordovaPath;
script.type = 'text/javascript';
script.crossorigin="anonymous";
$window.document.head.appendChild(script);
```

这段代码中，当我们加载 `jexe.js` 时，会判断当前设备平台（ iOS / Android ），并**动态创建 script 标签**去加载对应平台的 `Cordova.js` 及插件。

- iOS 平台会加载 `cdvi.min.js` 文件；

- Android 平台会加载 `cdva.min.js` 文件；

```html
<script src="./dist/js/cdvi.min.js?r=1567007708887" type="text/javascript"></script>
```

### 3. 用户触发请求，前端调用插件

用户通过前端页面，触发事件，来实现调用 JSSDK 方法。

这里通过约定好的命名空间 `exe` 去调用 `Cordova` 中的 `ImagePicker` 插件，并执行插件的 `getPictures` 方法。

`getPictures` 方法需要传入 `options` 参数，具体可以查看**《EXE开放平台》**上的参数介绍。

```js
var options = {
    maximumImagesCount: 9,
    width: 360,
    height: 360,
    quality: 100,
    outputType: 1,
    chosePicture: true,
    choseVideo: true,
}
exe.ImagePicker.getPictures(options)
  .then( res => {
      // do success something
      console.log(res)
  })
  .catch( err => {
      // do error something
      console.log(err)
  })
```

### 4. 与 Native 层通信

在调用 `exe.ImagePicker.getPictures` 方法时，iOS 端需要传入一个 `command` 作为参数，再调用 `postMessage` 方法，才能与 `Cordova.js` 通信，最终返回一个 `Promise` 对象。

`command` 参数中，包含如下值：

- `successCallback` : 执行成功的回调方法；  
- `failCallback` : 执行失败的回调方法；  
- `service` : 插件的服务；  
- `action` : 调用的插件名称；  
- `actionArgs` : 调用的插件参数；  

这里所说的 `postMessage` 方法，是用来与 Native 层做通信的桥梁，iOS 端通过监听下面方法来接收并解析前面传递过来的 `command` 参数：

`window.webkit.meeageHandlers.cordova.postMessage(command);`；

这样便实现了前端到 iOS 端的单向通信。
 
### 5. 解析参数和插件绑定

在 iOS 端接收后，开始解析 `command` 参数，将解析结果回传到下一步。

另外在此之前， `InAppBrowser.js` 中声明全局变量 `__globalBrowser`，保存当前使用的 `InAppBrowser` 实例：

```js
module.exports = function(strUrl, strWindowName, strWindowFeatures, callbacks) {
    // ... 省略其他
    exec(cb, cb, "InAppBrowser", "open", [strUrl, strWindowName, strWindowFeatures]);
    // 声明全局变量__globalBrowser，保存当前使用的InAppBrowser实例
    window.__globalBrowser = iab;
    return iab;
}
```

之后在调用过程中，会将 `Cordova` 插件与主 `WebView` 绑定，实现主 `WebView` 和 `InAppBrowser` 共享实例。

### 6. 调起 Native 层的 Cordova 插件

接下来开始调用 Native 层的对应 Cordova 插件。

当主 `WebView` 和 `InAppBrowser` 共享实例后，Native 层就可以获取到 `InAppBorwser` 中的整个 `window` 对象（即 `window.__globalBrowser`）。

再执行 Native 层的 `callbackFromNative` 方法。


### 7. 执行前端传入的回调

在执行的 `callbackFromNative` 方法中，会执行到 `else` 语句中，随后判断主 `WebView` 和 `InAppBrowser` 是否已经共享实例（即 `__globalBrowser` 是否指向当前使用的 `InAppBrowser` 实例）。

如果已经共享实例，则会通过拼接字符串实现 `cordova.callbackFromNative` 方法调用，并将字符串作为 `InAppBrowser` 实例的 `executeScript` 方法的参数对象中 `code` 的值，进行结构的回传。

```
callbackFromNative: function(callbackId, isSuccess, status, args, keepCallback) {
    try {
        // ... 省略
    } else {
        // __globalBrowser指向当前使用的InAppBrowser实例
        if(window.__globalBrowser) {
            var message = 'cordova.callbackFromNative("'+callbackId+'",
            '+isSuccess+',' + status +',' +JSON.stringify(args) + ',' 
                + keepCallback + ')';
            // 调用InAppBrowser实例的executeScript方法进行结果回传
            window.__globalBrowser.executeScript({code: message});
        }
    }
}
```

### 8. 回传调用结果

将 `window.__globalBrowser.executeScript` 调用结果进行回传到 `InAppBorwser` 层中。

### 9. 调用前端回调函数

最后一步，`window.__globalBrowser.executeScript` 中会在 `InAppBorwser` 层中执行参数 `code` 值中的 `cordova.callbackFromNative` 方法，此时已经是在 `InAppBorwser` 层，因此这个 `cordova.callbackFromNative` 方法是 `InAppBorwser` 层中的。

在 `code` 参数中，包含：

- `callbackId`；
- `isSuccess`；
- `status`；
- `args`；
- `keepCallback`；

对应 `cordova.callbackFromNative` 方法中的参数。

此时在 `try` 语句中，就会通过 `callbackId` 拿到对应整个 `callback` 对象，最终执行 `callback.success` 方法等。

```js
callbackFromNative: function(callbackId, isSuccess, status, args, keepCallback) {
    try {
        var callback = cordova.callbacks[callbackId];
        if (callback) {
            if (isSuccess && status == cordova.callbackStatus.OK) {
                callback.success && callback.success.apply(null, args);
            } else if (!isSuccess) {
                callback.fail && callback.fail.apply(null, args);
            }
            if (!keepCallback) {
                delete cordova.callbacks[callbackId];
            }
    } else {
        // __globalBrowser指向当前使用的InAppBrowser实例
        if(window.__globalBrowser) {
        var message = 'cordova.callbackFromNative("'+callbackId+'",
        '+isSuccess+',' + status +',' +JSON.stringify(args) + ',' 
            + keepCallback + ')';
        // 调用InAppBrowser实例的executeScript方法进行结果回传
        window.__globalBrowser.executeScript({code: message});
        }
    }
}
```

这样便实现了 iOS 端到前端的单向通信。

于是，两端通信边完成，整个 `InAppBrowser` 调用 `Cordova` 插件的流程便完成了。
