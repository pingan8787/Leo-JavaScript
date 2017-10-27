### 一、页面防抖
> 主要是要解决事件频繁触发的问题。

```
<body>
    <div id="container"></div>
    <script src="debounce.js"></script>
</body>
<scirpt>
    var count = 1;
    var container = document.getElementById('container');
    
    function getUserAction() {
        container.innerHTML = count++;
    };
    
    container.onmousemove = getUserAction;
</scirpt>
```
执行上面代码，会在鼠标经过div时，频繁调用`getUserAction`方法。  
实际项目中，例如倒计时会用到，在倒计时到了以后一直去调用开奖接口，导致太多资源浪费。  
#### 防抖原理
将事件触发设置到n秒后执行，如果在n秒内又触发这个函数，则以新的事件事件为准，n秒后执行，即必须在触发完事件n秒内不再触发事件，才执行。

#### 代码尝试1  直接写

```
function debounce(){
    let timeout ;
    return function(func,wait){
        clearTimeout(timeout);
        timeout = setTimeout(func,wait);
    }
}
container.onmousemove = debounce(getUserAction,1000)
```
此时，你怎么移动，都会在1000ms内不触发，才执行事件。

#### 代码尝试2  考虑this对象
在上述代码`getUserAction`方法中`console.log(this)`，在没有使用`debounce`方法时，`this`的值为：

```
<div id="container"></div>
```
如果有使用了`debounce`方法，则`this`指向Window对象，所以我们需要把`this`指向正确对象。
修改：
```
function debounce(){
    let timeout ;
    return function(){
        let context = this;
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            func.apply(context);
        },wait);
    }
}

```
这样就指向正常了。


#### 代码尝试3  考虑event对象
JavaScript 在事件处理函数中会提供事件对象`event`对象，修改代码：
```
function getUserAction(e) {
    console.log(e);
    container.innerHTML = count++;
};
```
不使用`debounce`函数时，会打印`MouseEvent`对象。  
使用`debounce`函数后，会打印`undefined`。  
即修改代码如下

```
function debounce(func, wait) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}
```

#### 更改需求：要求立即执行
要求变成：不用等到事件停止才触发，而是立刻执行函数，然后等到停止触发n秒后，才重新执行。  
即加入`immediate`参数判断是否立刻执行。  
```
function debounce(func,wait,immediate){
    let timeout,result;
    return function(){
        let context = this;
        let args = arguments;
        
        if(timeout) clearTimeout(timeout);
        if(immediate){
            let callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            },wait)
            if(callNow) func.apply(context,args);
        }else{
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}
```
####  添加取消功能
希望实现取消`debounce`函数的功能， `debounce`的时间间隔是 10 秒钟，`immediate`为 true，这样的话，我只有等 10 秒后才能重新触发事件，现在我希望有一个按钮，点击后，取消防抖，这样我再去触发，就可以又立刻执行。
```
// 第六版
function debounce(func, wait, immediate) {

    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}
```
使用`cancel`函数：
```
var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    container.innerHTML = count++;
};

var setUseAction = debounce(getUserAction, 10000, true);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function(){
    setUseAction.cancel();
})
```

[阅读原文](https://github.com/mqyqingfeng/Blog/issues/22)
