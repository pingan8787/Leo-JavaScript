这里主要介绍下`void运算符`，小知识点也需要记住：   

## 1、void 运算符
> 查看原文 [MDN介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)
> 这个运算符能向期望一个表达式的值是`undefined`的地方插入会产生副作用的表达式。
> void 运算符通常只用于获取 `undefined` 的原始值，一般使用`void(0)`（等同于`void0`）。在上述情况中，也可以使用全局变量`undefined` 来代替（假定其仍是默认值）。


在MDN上的定义是：`void运算符`对给定的表达式进行求值，然后返回`undefined`。  
使用它来实现立即执行的函数表达式（`IIFE`），如下：  
```js
void function foo(){
    console.log('hello Leo')
}()

// 与下面等效

(function foo(){
    console.log('hello Leo')
})()
```
使用`void`必须注意的是，无论给定表达式返回结果如何，`void运算符`整体返回的结果都是空的(`undefined`)！  
```js
const w1 = void function foo(){ 
    return 'hello leo' 
}()      // undefined

const w2 = (function foo(){
    return 'hello leo'
})()     // hello
```
与 `async` 一起使用，这样就能把函数作为异步代码的入口：  
```js
void async function (){
    try{
        const res = await fetch('air.ghost.io');
        const text = await res.text();
        console.log(text);
    } catch(e){
        console.log(e)
    }
}

// 与下面等效

(async ()=>{
    try{
        const res = await fetch('air.ghost.io');
        const text = await res.text();
        console.log(text);
    } catch(e){
        console.log(e);
    }
})();
```

另外，经常也用在 `URI操作` 上，当用户点击一个以 `javascript: URI` 时，它会评估URI中的代码，然后用返回的值替换页面内容，除非返回的值是`undefined`。`void运算符`可用于返回`undefined`。例如：  
```html
<a href="javascript:void(0);">
  这个链接点击之后不会做任何事情，如果去掉 void()，
  点击之后整个页面会被替换成一个字符 0。
</a>
<p> chrome中即使<a href="javascript:0;">也没变化，firefox中会变成一个字符串0 </p>
<a href="javascript:void(document.body.style.backgroundColor='green');">
  点击这个链接会让页面背景变成绿色。
</a>
```
注意，虽然这么做是可行的，但利用 `javascript:` 伪协议来执行` JavaScript` 代码是不推荐的，推荐的做法是为链接元素绑定事件。   
