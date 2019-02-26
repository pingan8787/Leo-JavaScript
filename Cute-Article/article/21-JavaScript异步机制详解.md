> [原文地址](https://juejin.im/post/5a6ad46ef265da3e513352c8)   

> 学习JavaScript的时候了解到JavaScript是单线程的，刚开始很疑惑，单线程怎么处理网络请求、文件读写等耗时操作呢？效率岂不是会很低？随着对这方面内容的了解和深入，知道了其中的奥秘。本篇文章就主要讲解一下JavaScript怎么处理异步问题。

## 一、同步与异步
在介绍JavaScript的异步机制之前，首先介绍一下：什么是同步？什么是异步？   
![Synchronous/Asynchronous](https://user-gold-cdn.xitu.io/2018/1/26/161314dc9a9298f4?imageView2/0/w/1280/h/960/ignore-error/1)  
### 同步
如果在函数返回的时候，调用者就能够得到预期结果(即拿到了预期的返回值或者看到了预期的效果)，那么这个函数就是同步的。  
如下所示：  
```
//在函数返回时，获得了预期值，即2的平方根
Math.sqrt(2);
//在函数返回时，获得了预期的效果，即在控制台上打印了'hello'
console.log('hello');
```
上面两个函数就是同步的。  
**如果函数是同步的，即使调用函数执行的任务比较耗时，也会一直等待直到得到预期结果。**

## 异步
如果在函数返回的时候，调用者还不能够得到预期结果，而是需要在将来通过一定的手段得到，那么这个函数就是异步的。   
如下所示：  
```
//读取文件
fs.readFile('hello.txt', 'utf8', function(err, data) {
    console.log(data);
});
//网络请求
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = xxx; // 添加回调函数
xhr.open('GET', url);
xhr.send(); // 发起函数
```
上述示例中读取文件函数 `readFile`和网络请求的发起函数  `send`都将执行耗时操作，虽然函数会立即返回，但是不能立刻获取预期的结果，因为耗时操作交给其他线程执行，暂时获取不到预期结果（后面介绍）。而在`JavaScript`中通过回调函数 `function(err, data) { console.log(data); }`和 `onreadystatechange`   ，在耗时操作执行完成后把相应的结果信息传递给回调函数，通知执行`JavaScript`代码的线程执行回调。   
**如果函数是异步的，发出调用之后，马上返回，但是不会马上返回预期结果。调用者不必主动等待，当被调用者得到结果之后会通过回调函数主动通知调用者。**

## 二、单线程与多线程
![单线程与多线程](https://user-gold-cdn.xitu.io/2018/1/26/161314dc9b08b2b1?imageView2/0/w/1280/h/960/ignore-error/1)  

在上面介绍异步的过程中就可能会纳闷：既然JavaScript是单线程，怎么还存在异步，那些耗时操作到底交给谁去执行了？  
JavaScript其实就是一门语言，说是单线程还是多线程得结合具体运行环境。JS的运行通常是在浏览器中进行的，具体由JS引擎去解析和运行。下面我们来具体了解一下浏览器。  
### 浏览器
目前最为流行的浏览器为：Chrome，IE，Safari，FireFox，Opera。浏览器的内核是多线程的。     
一个浏览器通常由以下几个常驻的线程：   
* 渲染引擎线程：顾名思义，该线程负责页面的渲染
* JS引擎线程：负责JS的解析和执行
* 定时触发器线程：处理定时事件，比如setTimeout, setInterval
* 事件触发线程：处理DOM事件
* 异步http请求线程：处理http请求

需要注意的是，渲染线程和JS引擎线程是不能同时进行的。渲染线程在执行任务的时候，JS引擎线程会被挂起。因为JS可以操作DOM，若在渲染中JS处理了DOM，浏览器可能就不知所措了。  

### JS引擎
通常讲到浏览器的时候，我们会说到两个引擎：渲染引擎和JS引擎。渲染引擎就是如何渲染页面，Chrome／Safari／Opera用的是Webkit引擎，IE用的是Trident引擎，FireFox用的是Gecko引擎。不同的引擎对同一个样式的实现不一致，就导致了经常被人诟病的浏览器样式兼容性问题。这里我们不做具体讨论。  
JS引擎可以说是JS虚拟机，负责JS代码的解析和执行。通常包括以下几个步骤：  
* 词法分析：将源代码分解为有意义的分词
* 语法分析：用语法分析器将分词解析成语法树
* 代码生成：生成机器能运行的代码
* 代码执行

不同浏览器的JS引擎也各不相同，Chrome用的是V8，FireFox用的是SpiderMonkey，Safari用的是JavaScriptCore，IE用的是Chakra。  
之所以说JavaScript是单线程，就是因为浏览器在运行时只开启了一个JS引擎线程来解析和执行JS。那为什么只有一个引擎呢？如果同时有两个线程去操作DOM，浏览器是不是又要不知所措了。  
所以，虽然JavaScript是单线程的，可是浏览器内部不是单线程的。一些I/O操作、定时器的计时和事件监听（click, keydown...）等都是由浏览器提供的其他线程来完成的。  


## 三、消息队列与事件循环
通过以上了解，可以知道其实JavaScript也是通过JS引擎线程与浏览器中其他线程交互协作实现异步。但是回调函数具体何时加入到JS引擎线程中执行？执行顺序是怎么样的？  
这一切的解释就需要继续了解消息队列和事件循环。  
![](https://user-gold-cdn.xitu.io/2018/1/26/161314dca3a23ba4?imageView2/0/w/1280/h/960/ignore-error/1)
如上图所示，左边的栈存储的是同步任务，就是那些能立即执行、不耗时的任务，如变量和函数的初始化、事件的绑定等等那些不需要回调函数的操作都可归为这一类。  
右边的堆用来存储声明的变量、对象。下面的队列就是消息队列，一旦某个异步任务有了响应就会被推入队列中。如用户的点击事件、浏览器收到服务的响应和setTimeout中待执行的事件，每个异步任务都和回调函数相关联。  
JS引擎线程用来执行栈中的同步任务，当所有同步任务执行完毕后，栈被清空，然后读取消息队列中的一个待处理任务，并把相关回调函数压入栈中，单线程开始执行新的同步任务。  
JS引擎线程从消息队列中读取任务是不断循环的，每次栈被清空后，都会在消息队列中读取新的任务，如果没有新的任务，就会等待，直到有新的任务，这就叫事件循环。  
![ajax异步请求](https://user-gold-cdn.xitu.io/2018/1/26/161314dcb17a84ad?imageView2/0/w/1280/h/960/ignore-error/1)  
上图以AJAX异步请求为例，发起异步任务后，由AJAX线程执行耗时的异步操作，而JS引擎线程继续执行堆中的其他同  步任务，直到堆中的所有异步任务执行完毕。然后，从消息队列中依次按照顺序取出消息作为一个同步任务在JS引擎线程中执行，那么AJAX的回调函数就会在某一时刻被调用执行。

## 四、示例
引用一篇文章中提到的考察JavaScript异步机制的面试题来具体介绍。  
> 执行下面这段代码，执行后，在 5s 内点击两下，过一段时间（>5s）后，再点击两下，整个过程的输出结果是什么？
```
setTimeout(function(){
    for(var i = 0; i < 100000000; i++){}
    console.log('timer a');
}, 0)

for(var j = 0; j < 5; j++){
    console.log(j);
}

setTimeout(function(){
    console.log('timer b');
}, 0)

function waitFiveSeconds(){
    var now = (new Date()).getTime();
    while(((new Date()).getTime() - now) < 5000){}
    console.log('finished waiting');
}

document.addEventListener('click', function(){
    console.log('click');
})

console.log('click begin');
waitFiveSeconds();
```

要想了解上述代码的输出结果，首先介绍下定时器。  
`setTimeout`的作用是在间隔一定的时间后，将回调函数插入消息队列中，等栈中的同步任务都执行完毕后，再执行。因为栈中的同步任务也会耗时，**所以间隔的时间一般会大于等于指定的时间**。  
`setTimeout(fn, 0)`的意思是，将回调函数fn立刻插入消息队列，等待执行，而不是立即执行。看一个例子：  
```
setTimeout(function() {
    console.log("a")
}, 0)

for(let i=0; i<10000; i++) {}
console.log("b")
```
```
b  a
```
打印结果表明回调函数并没有立刻执行，而是等待栈中的任务执行完毕后才执行的。栈中的任务执行多久，它就得等多久。  
理解了定时器的作用，那么对于输出结果就容易得出了。   
首先，先执行同步任务。其中`waitFiveSeconds`是耗时操作，持续执行长达5s。   
```
0
1
2
3
4
click begin
finished waiting
```
然后，在JS引擎线程执行的时候，`'timer a'`对应的定时器产生的回调、 `'timer b'`对应的定时器产生的回调和两次 `click` 对应的回调被先后放入消息队列。由于JS引擎线程空闲后，会**先查看是否有事件可执行**，接着再处理其他异步任务。因此会产生 下面的输出顺序。  
```
click
click
timer a
timer b
```
最后，5s 后的两次 click 事件被放入消息队列，由于此时JS引擎线程空闲，便被立即执行了。  
```
click
click
```

## 五、参考文章  
[JavaScript：彻底理解同步、异步和事件循环(Event Loop)](https://segmentfault.com/a/1190000004322358)  
[从setTimeout说事件循环模型](http://www.alloyteam.com/2015/10/turning-to-javascript-series-from-settimeout-said-the-event-loop-model/)  
[JavaScript单线程和异步机制](https://github.com/pramper/Blog/issues/4)  
[JavaScript的单线程机制](https://github.com/huangtengfei/blog/issues/15)  
[JavaScript单线程异步的背后——事件循环机制](https://zhuanlan.zhihu.com/p/27035708)  
[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)  