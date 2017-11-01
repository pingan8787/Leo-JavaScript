#### 使用场景
当我们写js代码，经常在各种函数各种回调中，被同步异步所困扰，以前只能写各种回调来解决这个问题，现在ES提供了Promise可以让我们轻松解决。  
#### 参考文档
1、[阮一峰ES6系列-Promise](http://es6.ruanyifeng.com/#docs/promise)  
2、[10个最佳ES6特性](https://blog.fundebug.com/2017/08/21/10-best-es6-feature/)

#### 代码对比
##### 不使用Promise
嵌套两个`setTimeou`t回调函数：  

```
setTimeout(function()
{
    console.log('Hello'); // 1秒后输出"Hello"
    setTimeout(function()
    {
        console.log('Fundebug'); // 2秒后输出"Fundebug"
    }, 1000);
}, 1000);
```

##### 使用Promise
使用两个`then`是异步编程串行化，避免了回调地狱：  
```
var wait1000 = new Promise(function(resolve, reject)
{
    setTimeout(resolve, 1000);
});
wait1000
    .then(function()
    {
        console.log("Hello"); // 1秒后输出"Hello"
        return wait1000;
    })
    .then(function()
    {
        console.log("Fundebug"); // 2秒后输出"Fundebug"
    });
```
#### 实际问题
在自己写小demo时，遇到个小问题，就是想将一个`JSON`数据循环遍历写到一个`<tbody></tbody>`标签内，但是理想是美好的，结果确是糟糕的，于是乎看下面代码的简单使用对比：  
```
//数据内容，没啥用的
let testdata = [
    { date: '2017.10.10', a1: '1', a2: '2', a3: '3', a4: '4', a5: '5' },
    { date: '2017.10.10', a1: '3', a2: '1', a3: '4', a4: '2', a5: '5' },
    { date: '2017.10.10', a1: '2', a2: '5', a3: '4', a4: '1', a5: '3' },
    { date: '2017.10.10', a1: '4', a2: '3', a3: '1', a4: '2', a5: '5' },
    { date: '2017.10.10', a1: '2', a2: '5', a3: '1', a4: '4', a5: '3' },
    { date: '2017.10.10', a1: '1', a2: '3', a3: '2', a4: '5', a5: '4' },
    { date: '2017.10.10', a1: '4', a2: '2', a3: '3', a4: '4', a5: '5' },
    { date: '2017.10.10', a1: '5', a2: '2', a3: '3', a4: '4', a5: '5' },
    { date: '2017.10.10', a1: '3', a2: '1', a3: '5', a4: '2', a5: '4' },
    { date: '2017.10.10', a1: '4', a2: '5', a3: '2', a4: '3', a5: '1' },
    { date: '2017.10.10', a1: '5', a2: '4', a3: '2', a4: '1', a5: '3' },
]
```
原本是这么写逻辑的：  
```
let tableHtml = '';
for (let k in testdata) {
    tableHtml += `
            <tr>
            <td>${testdata[k].date}</td>
            <td>${testdata[k].a1}</td>
            <td>${testdata[k].a2}</td>
            <td>${testdata[k].a3}</td>
            <td>${testdata[k].a4}</td>
            <td>${testdata[k].a5}</td>
            </tr>
        `
}
document.getElementById('testTbody').innerHTML = tableHtml;
```
然后可想而知，`tableHtml`是空值。就是因为异步了，所以，修改了下，代码如下：   
```
let tableHtml = '';
let getdata = new Promise(function(resolve, reject) {
    for (let k in testdata) {
        tableHtml += `
            <tr>
            <td>${testdata[k].date}</td>
            <td>${testdata[k].a1}</td>
            <td>${testdata[k].a2}</td>
            <td>${testdata[k].a3}</td>
            <td>${testdata[k].a4}</td>
            <td>${testdata[k].a5}</td>
            </tr>
        `
    }
    resolve();
});
getdata.then(() => {
    document.getElementById('testTbody').innerHTML = tableHtml;
})
```
这下就很好的实现的我们的需求。
#### 补充知识
##### 1、Promise定义
> Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。
> 
> 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
> 
> Promise对象有以下两个特点。   
> 
> （1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。   
> 
> （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

摘自 阮一峰《ECMAScript6入门》
##### 2、Promise.all()
`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
```
var p = Promise.all([p1, p2, p3]);

```
案例1
```
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```
上面代码中，promises是包含6个 Promise 实例的数组，只有这6个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。   

案例2 
```
const databasePromise = connectDatabase();

const booksPromise = databasePromise
  .then(findAllBooks);

const userPromise = databasePromise
  .then(getCurrentUser);

Promise.all([
  booksPromise,
  userPromise
])
.then(([books, user]) => pickTopRecommentations(books, user));
```
上面代码中，`booksPromise`和`userPromise`是两个异步操作，只有等到它们的结果都返回了，才会触发`pickTopRecommentations`这个回调函数。

##### 3、Promise.resolve()/Promise.reject()等方法
[详细请点这](http://es6.ruanyifeng.com/#docs/promise#Promise-all)


