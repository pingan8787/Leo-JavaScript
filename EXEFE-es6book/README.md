**整理进度**：
- [x] 介绍
- [x] 目录
- [ ] ES6
- [ ] ES7
- [ ] ES8
- [ ] ES9
- [ ] 知识补充
> 最后更新 2018.10.18
> 也在思考，如何整理好这一份资料，让看的人，都各有收获。

# 一、介绍
现如今网络上已经有各式各样关于 **ECMAScript** 规范的介绍和分析的文章，而我准备整理一份比较完善也比较精简便于快速入门的资料。
这份资料的**ES6部分**将会参考阮一峰老师的 [ECMAScript6入门](http://es6.ruanyifeng.com/) ，精简和整理出快速实用的内容。
另外**ES7/ES8/ES9**则会从网络参考和整理。

# 二、目录
<!-- TOC -->

- [一、介绍](#一介绍)
- [二、目录](#二目录)
- [三、正文](#三正文)
    - [1. ES6](#1-es6)
        - [let 和 const命令](#let-和-const命令)
            - [let 命令](#let-命令)
            - [const 命令](#const-命令)
        - [变量的解构赋值](#变量的解构赋值)
            - [1.数组](#1数组)
            - [2.对象的解构赋值](#2对象的解构赋值)
            - [3.字符串的解构赋值](#3字符串的解构赋值)
            - [4.数值和布尔值的解构赋值](#4数值和布尔值的解构赋值)
            - [5.函数参数的解构赋值](#5函数参数的解构赋值)
            - [6.用途](#6用途)
        - [字符串的拓展](#字符串的拓展)
        - [正则的拓展](#正则的拓展)
        - [数值的拓展](#数值的拓展)
        - [函数的拓展](#函数的拓展)
        - [对象的拓展](#对象的拓展)
    - [2. ES7](#2-es7)
    - [3. ES8](#3-es8)
    - [4. ES9](#4-es9)
    - [5. 知识补充](#5-知识补充)
        - [块级作用域](#块级作用域)
- [四、结语](#四结语)

<!-- /TOC -->

# 三、正文
## 1. ES6

### let 和 const命令

在ES6中，我们通常实用 `let` 表示**变量**，`const` 表示**常量**，并且 `let` 和 `const` 都是**块级作用域**，且在**当前作用域有效**不能重复声明。

#### let 命令
`let` 命令的用法和 `var` 相似，但是 `let` 只在所在代码块内有效。  
基础用法： 
```js
{
    let a = 1;
    let b = 2;
}
```

并且 `let` 有以下特点：  

* **不存在变量提升：**
在ES6之前，我们 `var` 声明一个**变量**一个**函数**，都会伴随着变量提升的问题，导致实际开发过程经常出现一些逻辑上的疑惑，按照一般思维习惯，变量都是需要先声明后使用。
```js
// var 
console.log(v1); // undefined
var v1 = 2;
// 由于变量提升 代码实际如下
var v1;
console.log(v1)
v1 = 2;

// let 
console.log(v2); // ReferenceError
let v2 = 2;
```

* **不允许重复声明：**
`let` 和 `const` 在相同作用域下，都**不能重复声明同一变量**，并且**不能在函数内重新声明参数**。
```js
// 1. 不能重复声明同一变量
// 报错
function f1 (){
    let a = 1;
    var a = 2;
}
// 报错
function f2 (){
    let a = 1;
    let a = 2;
}

// 2. 不能在函数内重新声明参数
// 报错
function f3 (a1){
    let a1; 
}
// 不报错
function f4 (a2){
    {
        let a2
    }
}
```

#### const 命令
`const` 声明一个**只读**的**常量**。  
基础用法：  
```js
const PI = 3.1415926;
console.log(PI);  // 3.1415926

```
**注意点**：  
* `const` 声明后，无法修改值；
```js
const PI = 3.1415926;
PI = 3; 
// TypeError: Assignment to constant variable.
```
* `const` 声明时，必须赋值；
```js
const a ; 
// SyntaxError: Missing initializer in const declaration.
```
* `const` 声明的常量，`let` 不能重复声明；
```js
const PI = 3.1415926;
let PI = 0;  
// Uncaught SyntaxError: Identifier 'PI' has already been declared
```


### 变量的解构赋值
**解构赋值概念**：在ES6中，直接从数组和对象中取值，按照对应位置，赋值给变量的操作。

#### 1.数组
基础用法：  
```js
// ES6 之前
let a = 1;
let b = 2;

// ES6 之后
let [a, b] = [1, 2];
```

本质上，只要等号两边模式一致，左边变量即可获取右边对应位置的值，更多用法：

```js
let [a, [[b], c]] = [1, [[2], 3]];
console.log(a, b, c); // 1, 2, 3

let [ , , c] = [1, 2, 3];
console.log(c);       // 3

let [a, , c] = [1, 2, 3];
console.log(a,c);     // 1, 3

let [a, ...b] = [1, 2, 3];
console.log(a,b);     // 1, [2,3]

let [a, b, ..c.] = [1];
console.log(a, b, c); // 1, undefined, []
```

**注意点**：  
* 如果解构不成功，变量的值就等于`undefined`。  
```js
let [a] = [];     // a => undefined
let [a, b] = [1]; // a => 1 , b => undefined
```
* 当左边模式多于右边，也可以解构成功。
```js
let [a, b] = [1, 2, 3];
console.log(a, b); // 1, 2
```
* 两边模式不同，报错。
```js
let [a] = 1;
let [a] = false;
let [a] = NaN;
let [a] = undefined;
let [a] = null;
let [a] = {};
```

**指定解构的默认值**：
基础用法：
```js
let [a = 1] = [];      // a => 1
let [a, b = 2] = [a];  // a => 1 , b => 2
```
特殊情况：
```js
let [a = 1] = [undefined]; // a => 1
let [a = 1] = [null];      // a => null
```
右边模式对应的值，必须严格等于`undefined`，默认值才能生效，而`null`不严格等于`undefined`。

#### 2.对象的解构赋值
与数组解构不同的是，对象解构**不需要严格按照顺序取值**，而只要按照**变量名**去取对应**属性名**的值，若取不到对应**属性名**的值，则为`undefined` 。

基础用法：  
```js
let {a, b} = {a:1, b:2};  // a => 1 , b => 2
let {a, b} = {a:2, b:1};  // a => 2 , b => 1
let {a} = {a:3, b:2, c:1};// a => 3
let {a} = {b:2, c:1};     // a => undefined
```

**注意点**：
* 若**变量名**和**属性名**不一致，则需要修改名称。
```js
let {a:b} = {a:1, c:2}; 
// error: a is not defined
// b => 1
```
对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
上面代码中，`a` 是匹配的模式，`b`才是变量。真正被赋值的是变量`b`，而不是模式`a`。

* 对象解构也支持**嵌套解构**。
```js
let obj = {
    a:[ 1, { b: 2}]
};
let {a, a: [c, {b}]} = obj;
// a=>[1, {b: 2}], b => 2, c => 1
```

**指定解构的默认值**：
```js
let {a=1} = {};        // a => 1
let {a, b=1} = {a:2};  // a => 2, b => 1

let {a:b=3} = {};      // b => 3
let {a:b=3} = {a:4};   // b = >4
// a是模式，b是变量 牢记

let {a=1} = {a:undefined};  // a => 1
let {a=1} = {a:null};   // a => null
// 因为null与undefined不严格相等，所以赋值有效
// 导致默认值1不会生效。
```

#### 3.字符串的解构赋值
字符串的解构赋值中，字符串被转换成了一个**类似数组的对象**。
基础用法：
```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length:len} = 'hello';// len => 5
```

#### 4.数值和布尔值的解构赋值
解构赋值的规则是，**只要等号右边的值不是对象或数组，就先将其转为对象**。由于`undefined`和`null`**无法转为对象**，所以对它们进行解构赋值，都会报错。
```js
// 数值和布尔值的包装对象都有toString属性
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true

let { prop: x } = undefined; // TypeError
let { prop: y } = null;      // TypeError
```

#### 5.函数参数的解构赋值
基础用法： 
```js
function fun ([a, b]){
    return a + b;
}
fun ([1, 2]); // 3
```
**指定默认值的解构**:
```js
function fun ({a=0, b=0} = {}){
    return [a, b];
}
fun ({a:1, b:2}); // [1, 2]
fun ({a:1});      // [1, 0]
fun ({});         // [0, 0]
fun ();           // [0, 0]

function fun ({a, b} = {a:0, b:0}){
    return [a, b];
}
fun ({a:1, b:2}); // [1, 2]
fun ({a:1});      // [1, undefined]
fun ({});         // [undefined, undefined]
fun ();           // [0, 0]
```

#### 6.用途
* **交换变量的值**:
```js
let a = 1,b = 2;
[a, b] = [b, a]; // a =>2 , b => 1 
```

* **函数返回多个值**:
```js
// 返回一个数组
function f (){
    return [1, 2, 3];
}
let [a, b, c] = f(); // a=>1, b=>2, c=>3

// 返回一个对象
function f (){
    return {a:1, b:2};
}
let {a, b} = f();    // a=>1, b=>2
```

* **快速对应参数**:
快速的将一组参数与变量名对应。
```js
function f([a, b, c]) {...}
f([1, 2, 3]);

function f({a, b, c}) {...}
f({b:2, c:3, a:1});
```

* **提取JSON数据**：
```js
let json = {
    name : 'leo',
    age: 18
}
let {name, age} = json;
console.log(name,age); // leo, 18
```

* **遍历Map结构**:
```js
const m = new Map();
m.set('a':1);
m.set('b':2);
for ([k, v] of m){
    console.log(k + ' : ' + v);
}
// 获取键名
for (let [k] of m){...}
// 获取键值
for (let [,k] of m){...}
```

* **输入模块的指定方法**:
用于**按需加载**模块中需要用到的方法。
```js
const {log, sin, cos} = require('math');

```

### 字符串的拓展
### 正则的拓展
### 数值的拓展
### 函数的拓展
### 对象的拓展

## 2. ES7

## 3. ES8

## 4. ES9

## 5. 知识补充
### 块级作用域

通常指一个**函数内部**，或者一个**代码块内部**。  
比如：  
```js
function fun1 () {
    // 块级作用域
    if (true) {
        // 块级作用域
    }
}
```
**缺点**：
1.导致内层变量覆盖外层变量
```js
var a1 = new Date();
function f1 (){
    console.log(a1); // undefined
    if (false) {
        var a1 = 'hello'
    }
}
```
输出 `undefined` 是因为 `if` 内的 `a1` 变量声明的变量提升，导致内部的 `a1` 覆盖外部的 `a1`，所以输出为 `undefined` 。 

2.变量的全局污染
```js
var a = 'hello';
for (var i = 0; i< a.length; i++) {
    //...
}
console.log(i); // 5
```
循环结束后，变量 `i` 的值依然存在，造成变量的全局污染。


# 四、结语