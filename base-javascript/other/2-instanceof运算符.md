最近开始在整理`ES6/ES7/ES8/ES9`的知识点（已经上传到 [我的博客](http://es.pingan8787.com) 上），碰到一些知识点是自己已经忘记（用得少的知识点），于是也重新复习了一遍。     
这篇文章要复习的 `instanceof` 是我在整理过程中遇到的，那就整理下来吧，不然容易忘记。   
要是哪里写得不妥，欢迎各位大佬指点。  


## 1.定义
> `instanceof`运算符用于测试构造函数的`prototype`属性是否出现在对象的原型链中的任何位置。  —— MDN

简单理解为：`instanceof`可以检测一个实例是否属于某种类型。   
比如：   
```js
function F (){
    // ...
}
let a = new F ();

a instanceof F;      // true
a instanceof Object; // true  后面介绍原因
```
还可以在**继承关系**中用来判断一个实例是否属于它的父类型。   
比如：  
```js
function F (){};
function G (){};
function Q (){};
G.prototype = new F();   // 继承
 
let a = new G(); 
a instanceof F;      // true
a instanceof G;      // true
a instanceof Q;      // false
```

## 2.使用方法
语法为: `object instanceof constructor`。  
* `object` : 需要测试的函数  
* `constructor` : 构造函数   

即：用`instanceof`运算符来检测`constructor.prototype` 是否存在参数`object`的原型链。   
```js
function F (){};
function G (){};
let a = new F ();

a instanceof F;      // true  因为：Object.getPrototypeOf(a) === F.prototype
a instanceof Q;      // false 因为：F.prototype不在a的原型链上
a instanceof Object; // true  因为：Object.prototype.isPrototypeOf(a)返回true
F.prototype instanceof Object;  // true,同上
```
**注意**：   
1. `a instanceof F` 返回 `true` 以后，不一定永远都都返回为`true`，`F.prototype`属性的值有可能会改变。  
2. 原表达式`a`的值也会改变，比如 `a.__proto__ = {}`之后，`a instanceof F`就会返回`false`了。   

**检测对象是不是特定构造函数的实例：**   
```js
// 正确
if (!(obj instanceof F)) {
  // ...
}

// 错误 因为
if (!obj instanceof F);  // 永远返回false  
// 因为 !obj 在instanceof之前被处理 ， 即一直使用一个布尔值检测是否是F的实例
```

## 3.实现instanceof
```js
/**
* 实现instanceof
* @param obj{Object} 需要测试的对象
* @param fun{Function} 构造函数
*/
function _instanceof(obj, fun) {
    let f = fun.prototype;   // 取B的显示原型
    obj = obj.__proto__;       // 取A的隐式原型
    while (true) {
        //Object.prototype.__proto__ === null
        if (obj === null)
            return false;
        if (f === obj)        // 这里重点：当 f 严格等于 obj 时，返回 true
            return true;
        obj = obj.__proto__;
    }
}
```

## 4.instanceof 与 typeof 对比
**相同**：  
`instanceof`和`typeof`都能用来判断一个变量的类型。   

**区别**：   
`instanceof` 只能用来判断对象、函数和数组，不能用来判断字符串和数字等：   
```js
let a = {};
let b = function () {};
let c = [];
let d = 'hi';
let e = 123;

a instanceof Object;  // true
b instanceof Object;  // true
c instanceof Array;   // true
d instanceof String;  // false
e instanceof Number;  // false
```
 
`typeof` ：用于判断一个表达式的原始值，返回一个字符串。  
```js
typeof 42;         // "number"
typeof 'blubber';  // "string"
typeof true;       // "boolean"
typeof aa;         // "undefined"
```
一般返回结果有：     
* number
* boolean
* string
* function（函数）
* object（NULL,数组，对象）
* undefined。

**判断变量是否存在**：  
不能使用：  
```js
if(a){
    //变量存在
}
// Uncaught ReferenceError: a is not defined
```
原因是如果变量未定义，就会报**未定义**的错，而应该使用：   
```js
if(typeof a != 'undefined'){
    //变量存在
}
```

## 5.参考资料
1. [MDN instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)   

2. [IBM instanceof](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html)

3. [js中typeof和instanceof用法区别](https://blog.csdn.net/qq_27626333/article/details/76146078)