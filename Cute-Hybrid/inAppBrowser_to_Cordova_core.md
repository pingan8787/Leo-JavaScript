## 简介

`InAppBrowser` 调用 `Cordova` 插件的流程和 `Ionic Native `的核心


## 一、流程简介

`InAppBrowser` 调用 `Cordova` 插件的流程共分为 9 个步骤：

1. 前端进入页面，加载 JSSDK（`jexe.js`），调用 `exe.app.js` 部分，并判断平台（ iOS / Android ）；

2. 动态加载对应平台的 `Cordova.js` 及 `Cordova` 插件；

3. 用户触发请求事件， 前端携带 `Command` 参数调用 `Cordova` 插件；

4. 前端与 Native 层通信（如 iOS 端使用 `postMessage`）；

5. Native 层接收并解析前端传入的 `Command` 参数，调用对应 `Cordova` 插件，将插件和主 `WebView` 绑定，将返回调用结果传入主 `WebView` 的 `Cordova` 插件；

6. 主 `WebView` 中调用 `callbackFromNative`；

7. 执行 `callbackFromNative` 中的 `else` 语句；

8. 将主 `WebView` 中调用结果返回回传，调用 `InAppBrowser` 中 `callbackFromNative` 方法；

9. 调用响应回调函数，返回调用结果给前端；

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

在 iOS 端接收并解析完 `command` 参数以后，开始调用 Native 层的对应插件。

在调用过程中，会将 `Cordova` 插件与主 `WebView` 绑定，实现主 `WebView` 和 `InAppBrowser` 共享实例。

// TODO： 添加代码

### 6. 调起 Native 层的 Cordova 插件

当主 `WebView` 和 `InAppBrowser` 共享实例后，Native 层就可以获取到 `InAppBorwser` 中的整个 `window` 对象。

然后调起 Native 层的 `Cordova.js` 和 Cordova 插件，再通过 Native 层的 `callbackFromNative` 方法，执行。

### 7. 执行前端传入的回调

### 8. 回传调用结果

### 9. 前端调用回调函数


```js

    var PreviewBox = document.getElementById('eft-preview-box');

    function CameraFun(){
        exe.Camera.getPicture().then(function (res) {
            PreviewBox.style.display = 'block';
            var html = '<div class="eft-preview-scroll"><img src="' + res.url + '"/></div>';
            document.getElementById('eft-preview').innerHTML = html;
        })
    }


    function PickerFun(){
        var options = {
            maximumImagesCount: 9,
            width: 360,
            height: 360,
            quality: 100,
            outputType: 1,
            chosePicture: true,
            choseVideo: true,
        }
        exe.ImagePicker.getPictures(options).then(function (res) {
            if(Array.isArray(res)){
                PreviewBox.style.display = 'block';
                var html = '';
                for(var k = 0; k < res.length; k++){
                    html += '<img src="' + res[k]['url'] + '"/>'
                }
                console.log(html)
                document.getElementById('eft-preview').innerHTML = '<div class="eft-preview-scroll">' + html + '</div>';
            }
        }).catch(function (err) {
            console.log(err);
        });
    }

    function CloseFun(){
        PreviewBox.style.display = 'none';
    }

```