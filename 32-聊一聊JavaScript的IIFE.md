> [阅读原文](http://softlab.sdut.edu.cn/blog/subaochen/2016/02/%E8%AF%B4%E4%B8%80%E8%AF%B4js%E7%9A%84iife/)

## 1.定义
**IIFE**: Immediately Invoked Function Expression，意为`立即调用的函数表达式`，也就是说，声明函数的同时立即调用这个函数。   
对比一下，这是不采用IIFE时的函数声明和函数调用：  
```js
function foo(){
  var a = 10;
  console.log(a);
}
 
foo();
```
下面是IIFE形式的函数调用：   
```js
(function foo(){
  var a = 10;
  console.log(a);
})();
```
`函数的声明`和`IIFE`的区别在于，在函数的声明中，我们首先看到的是`function`关键字，而IIFE我们首先看到的是左边的`(`。也就是说，使用一对`()`将函数的声明括起来，使得JS编译器不再认为这是一个函数声明，而是一个`IIFE`，即需要立刻执行声明的函数。  
两者达到的目的是相同的，都是声明了一个函数`foo`并且随后调用函数`foo`。  

## 2.为什么需要IIFE？
如果只是为了立即执行一个函数，显然`IIFE`所带来的好处有限。实际上，`IIFE`的出现是为了弥补JS在`scope`方面的缺陷：  
JS只有全局作用域`（global scope）`、函数作用域`（function scope）`，从ES6开始才有块级作用域`（block scope）`。对比现在流行的其他面向对象的语言可以看出，JS在访问控制这方面是多么的脆弱！那么如何实现作用域的隔离呢？在JS中，只有`function`才能实现作用域隔离，因此如果要将一段代码中的变量、函数等的定义隔离出来，只能将这段代码封装到一个函数中。      

在我们通常的理解中，将代码封装到函数中的目的是为了复用。在JS中，当然声明函数的目的在大多数情况下也是为了复用，但是JS迫于作用域控制手段的贫乏，我们也经常看到只使用一次的函数：这通常的目的是为了隔离作用域了！既然只使用一次，那么立即执行好了！既然只使用一次，函数的名字也省掉了！这就是IIFE的由来。    

## 3.IIFE的常见形式
根据最后表示函数执行的一对 `()` 位置的不同，常见的`IIFE`写法有两种，示例如下：  
* 列表 1:IIFE写法一
```js
(function foo(){  
  var a = 10;  
  console.log(a);  
})(); 
```
* 列表 2:IIFE写法二
```js
(functionfoo(){  
    var a=10;  
    console.log(a);  
}());  
```
这两种写法效果完全一样，使用哪种写法取决于你的风格，貌似第一种写法比较常见。   
其实，IIFE不限于`()`的表现形式[**1**]，但是还是遵守约定俗成的习惯比较好。   

## 4.IIFE的函数名和参数
根据《You Don’t Know JS:Scope & Clouses》[**2**]的说法，尽量避免使用匿名函数。但是`IIFE`确实只执行一次，给`IIFE`起个名字有些画蛇添足了。如果非要给`IIFE`起个名字，干脆就叫`IIFE`好了。  
`IIFE`可以带（多个）参数，比如下面的形式：  
```js
(function IIFE(global){
    var a = 3;
    console.log(a); // 3
    console.log(global.a); // 2
})(window);
 
console.log(a); // 2
```

## 5.IIFE构造单例模式
JS的模块就是函数，最常见的模块定义如下：  
```js
function myModule(){
  var someThing = "123";
  var otherThing = [1,2,3];
 
  function doSomeThing(){
    console.log(someThing);
  }
 
  function doOtherThing(){
    console.log(otherThing);
  }
 
  return {
    doSomeThing:doSomeThing,
    doOtherThing:doOtherThing
  }
}
 
var foo = myModule();
foo.doSomeThing();
foo.doOtherThing();
 
var foo1 = myModule();
foo1.doSomeThing();
```
如果需要一个单例模式的模块，那么可以利用IIFE：   
```js
var myModule = (function module(){
  var someThing = "123";
  var otherThing = [1,2,3];
 
  function doSomeThing(){
    console.log(someThing);
  }
 
  function doOtherThing(){
    console.log(otherThing);
  }
 
  return {
    doSomeThing:doSomeThing,
    doOtherThing:doOtherThing
  }
})();
 
myModule.doSomeThing();
myModule.doOtherThing();
```

## 6.小结
IIFE的目的是为了隔离作用域，防止污染全局命名空间。  
ES6以后也许有更好的访问控制手段（模块？类？），有待研究。  

### 引用
> 1 Ben Alman, “Immediately-Invoked Function Expression (IIFE)”.   
> 2 Kyle Simpson, You Don’t Know JS:Scope & Clouses (, 2014).   
 