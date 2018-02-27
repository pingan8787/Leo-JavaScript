> [阅读原文](https://zhuanlan.zhihu.com/p/33932184?group_id=951215260410126336)

`async` / `await` 是 ES2017中引入的，为了使异步操作得更加方便，本质上 `async` 函数是 `Generator` 函数的语法糖。  

`async` 函数书写的方式跟我们普通的函数书写方式一样，只不过是前面多了一个 `async` 关键字，并且函数返回的是一个` Promise` 对象，所接收的值就是函数 `return` 的值。  
```js
let fn = async function(name) {
  return name;
}

fn('小明').then(name => console.log(name)); // 小明
```
在 `async` 函数内部可以使用 `await` 命令，表示等待一个异步函数的返回。`await` 后面跟着的是一个 `Promise` 对象，如果不是的话，系统会调用 `Promise.resolve()` 方法，将其转为一个 `resolve` 的 `Promise` 的对象。  
```js
let foo = async function() {
  return await 1;
}

foo().then(obj => console.log(obj));    // 1


// 下面将会在 1000 毫秒之后输出 hello world
let bar = async function() {
    return await new Promise(resolve => {
      setTimeout(() => resolve('hello world'),1000)
    });
}

bar().then(src => console.log(src));
```
如果 `async` 函数当中执行出现错误的话，返回的 `Promise` 就会被 `reject`。  
```js
let fn = async function() {
  throw 'reject';
}
fn().catch(err => console.log(err));    // reject
```
并且，如果 `await` 后面的 `Promise` 的状态是 `reject` ，那么整个 `async` 函数就会中断执行，错误会被 `async` 函数的 `catch` 捕获到。  
```js
let foo = async function() {
  await Promise.reject(1);
}

foo().catch(err => console.log(err))    // 1
```
所以我们用来操作异步请求时，有可能会出现请求失败的情况 ，这个时候为了防止函数停止运行，我们需要一个`try...catch` 结构来处理错误代码。  
```js
let bar = async function() {
  try {
    await Promise.reject('error')
  } catch(e) {
    console.log(e)
  }
}
```
上面的写法就保证了我们的异步函数不会因为出错而中断执行。  

以上就是 `async` 函数的简单用法，如果大家想要深入了解的话，推荐大家阅读阮一峰老师的《ES6标准入门》。  

你以为我会就这么快就水完了？那是不可能的。说起异步的话，我们都知道 `js` 在执行的时候只有一个主线程，主线程会不停的读取调用栈。  

这个时候我们就要说到 `setTimeout(fn,0)` 了，在我眼中这段代码的意思是尽快的加入当前的调用栈，只要执行完前面的任务，就会来执行它。我们可以脑补一下这个画面。`setTimeout` 函数对着 js引擎说：大哥，我这儿任务比较紧急，让我插插队呗。js引擎大哥就不耐烦的说：知道了，知道了，后面排队去，前面的完了就到你了。  

所以就出现了下面这段代码：  
```js
let fn = async function() {
    let num = await 1;
    console.log(num)
    num++;
    return num;
}
fn().then(num => console.log(num))
setTimeout(() => console.log(100),0);
```
猜猜看，会依次输出什么？  

起初，我认为会输出 `100 ，1 ，2`。但其实最终结果是`1，2，100`，这不论是在 `node` 环境还是 `chrome `下都是如此。后来我自信思考了一下，我们 `await` 后面跟着是一个 `resolve` 的 `Promise` 对象，本质上还是同步的代码，所以该 `async` 函数就如同普通函数一样执行。  

我们再改造一下上面的代码：  
```js
let fn = async function() {
    let num = await 1;
    console.log(num)
    await new Promise(resolve => setTimeout(() => resolve(++num)),0);
    console.log(num)
    return num;
}
fn().then(num => console.log(num))
setTimeout(() => console.log(100),0);
```
现在这个代码会依次输出啥？  

踩过了上面的那个坑之后，我仔细想了一下，我们 `async` 函数内部的 `setTimeout` 虽说是尽快排队，但是 `await` 命令会在此暂停住，继续往下执行代码，将下面的 `setTimeout` 先排上队，然后再将` async` 内部的排上队。所以这边的代码输出的是 ：` 1，100，2，2`。  

JavaScript 在发展过程中，共经历了回调函数、`Promise` 对象、`Generator` 函数，`async` 函数来处理异步。我们接下来就来看一下 `async` 函数如何更优雅的处理异步。  

假设我们需要分别读取 `a`、`b`、`c `三个文件，具体代码如下：  
```js
const fs = require('fs');

// 对 fs 模块进行 Promise 封装
const readFile = function(src) {
    return new Promise((resolve,reject) => {
        fs.readFile(src,(err,data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

// Promise 的写法

readFile('./a.txt').then(data => {
    console.log(data.toString());
    return readFile('./b.txt');
}).then(data => {
    console.log(data.toString());
    return readFile('./c.txt');
}).then(data => {
    console.log(data.toString());
})

// Generator 函数写法

function * ascReadFile() {
    yield readFile('./a.txt');
    yield readFile('./b.txt');
    yield readFile('./c.txt');
}

let g = ascReadFile();
g.next().value.then(data => {
    console.log(data.toString());
    return g.next().value;
}).then(data => {
    console.log(data.toString());
    return g.next().value;
}).then(data => {
    console.log(data.toString());
})

// async 函数写法
async function asyncReadFile() {
    let a = await readFile('./a.txt');
    console.log(a.toString());

    let b = await readFile('./b.txt');
    console.log(b.toString());

    let c = await readFile('./c.txt');
    console.log(c.toString());
}
asyncReadFile();
```
上面是一个简化版的代码，省略了错误处理。通过上面代码的对比，我们可以看出来 `async` 函数比起 `Promise` 的链式操作，以及 `Generator` 的手动执行，要方便得太多了，代码上也简洁明了，让我们看起来一目了然。  

上面就是我眼中的 `async` 函数，以及我所理解的异步处理方法。如果大家对我所理解的有任何歧义，欢迎大家来一起探讨。  