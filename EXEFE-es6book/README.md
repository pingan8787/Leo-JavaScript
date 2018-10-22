**整理进度**：  
- [x] 介绍  
- [x] 目录  
- [ ] ES6  
- [ ] ES7  
- [ ] ES8  
- [ ] ES9  
- [ ] 知识补充  
> 最后更新 2018.10.22  
> 在思考，如何整理好这一份资料，让不同阶段的人，能有不同的收获。  

# 一、介绍
现如今网络上已经有各式各样关于 **ECMAScript** 规范的介绍和分析的文章，而我准备整理一份比较完善也比较精简适合快速入门的资料，主要内容将涵盖**ES6**、**ES7**、**ES8**、**ES9**，如有异议欢迎指点。  
这份资料的**ES6部分**将会参考阮一峰老师的 [ECMAScript6入门](http://es6.ruanyifeng.com/) ，精简和整理出快速实用的内容。  
另外**ES7/ES8/ES9**则会从网络综合参考和整理。   

# 二、目录
<!-- TOC -->

- [一、介绍](#一介绍)
- [二、目录](#二目录)
- [三、正文](#三正文)
    - [1. ES6](#1-es6)
        - [let 和 const命令](#let-和-const命令)
            - [1.let 命令](#1let-命令)
            - [2.const 命令](#2const-命令)
        - [变量的解构赋值](#变量的解构赋值)
            - [1.数组](#1数组)
            - [2.对象的解构赋值](#2对象的解构赋值)
            - [3.字符串的解构赋值](#3字符串的解构赋值)
            - [4.数值和布尔值的解构赋值](#4数值和布尔值的解构赋值)
            - [5.函数参数的解构赋值](#5函数参数的解构赋值)
            - [6.用途](#6用途)
        - [字符串的拓展](#字符串的拓展)
            - [1.includes(),startsWith(),endsWith()](#1includesstartswithendswith)
            - [2.repeat()](#2repeat)
            - [3.padStart(),padEnd()](#3padstartpadend)
            - [4.模版字符串](#4模版字符串)
        - [正则的拓展](#正则的拓展)
        - [数值的拓展](#数值的拓展)
            - [1.Number.isFinite(), Number.isNaN()](#1numberisfinite-numberisnan)
            - [2.Number.parseInt(), Number.parseFloat()](#2numberparseint-numberparsefloat)
            - [3.Number.isInteger()](#3numberisinteger)
            - [4.Math对象的拓展](#4math对象的拓展)
            - [5.指数运算符](#5指数运算符)
        - [函数的拓展](#函数的拓展)
            - [1.参数默认值](#1参数默认值)
            - [2.rest 参数](#2rest-参数)
            - [3.name 属性](#3name-属性)
            - [4.箭头函数](#4箭头函数)
            - [5.双冒号运算符](#5双冒号运算符)
        - [对象的拓展](#对象的拓展)
            - [1.拓展运算符](#1拓展运算符)
            - [2.Array.from()](#2arrayfrom)
            - [3.Array.of()](#3arrayof)
            - [4.find()和findIndex()](#4find和findindex)
            - [5.fill()](#5fill)
            - [6.entries(),keys(),values()](#6entrieskeysvalues)
            - [7.includes()](#7includes)
            - [8.flat(),flatMap()](#8flatflatmap)
    - [2. ES7](#2-es7)
    - [3. ES8](#3-es8)
    - [4. ES9](#4-es9)
    - [5. 知识补充](#5-知识补充)
        - [块级作用域](#块级作用域)
        - [ES5/6对数组空位的处理](#es56对数组空位的处理)
- [四、结语](#四结语)

<!-- /TOC -->

# 三、正文
## 1. ES6

### let 和 const命令

在ES6中，我们通常实用 `let` 表示**变量**，`const` 表示**常量**，并且 `let` 和 `const` 都是**块级作用域**，且在**当前作用域有效**不能重复声明。

#### 1.let 命令
`let` 命令的用法和 `var` 相似，但是 `let` 只在所在代码块内有效。  
**基础用法**：   
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

#### 2.const 命令
`const` 声明一个**只读**的**常量**。  
**基础用法**：  
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
**基础用法**：    
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
**基础用法**：  
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

**基础用法**：    
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
**基础用法**： 
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
**基础用法**：  
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
#### 1.includes(),startsWith(),endsWith()
在我们判断字符串是否包含另一个字符串时，ES6之前，我们只有`typeof`方法，ES6之后我们又多了三种方法：   
* **includes()**:返回**布尔值**，表示**是否找到参数字符串**。 
* **startsWith()**:返回**布尔值**，表示参数字符串是否在原字符串的**头部**。 
* **endsWith()**:返回**布尔值**，表示参数字符串是否在原字符串的**尾部**。 
```js
let a = 'hello leo';
a.startsWith('leo');   // false
a.endsWith('o');       // true
a.includes('lo');      // true
```
并且这三个方法都支持第二个参数，表示起始搜索的位置。  
```js
let a = 'hello leo';
a.startsWith('leo',1);   // false
a.endsWith('o',5);       // true
a.includes('lo',6);      // false
```
`endsWith` 是针对前 `n` 个字符，而其他两个是针对从第`n`个位置直到结束。  

#### 2.repeat()
`repeat`方法返回一个新字符串，表示将原字符串重复`n`次。    
**基础用法**：  
```js
'ab'.repeat(3);        // 'ababab'
'ab'.repeat(0);        // ''
```
**特殊用法**:    
* 参数为`小数`，则取整  
```js
'ab'.repeat(2.3);      // 'abab'
```
* 参数为`负数`或`Infinity`，则报错  
```js
'ab'.repeat(-1);       // RangeError
'ab'.repeat(Infinity); // RangeError
```
* 参数为`0到-1的小数`或`NaN`，则取0  
```js
'ab'.repeat(-0.5);     // ''
'ab'.repeat(NaN);      // ''
```
* 参数为`字符串`，则转成`数字`  
```js
'ab'.repeat('ab');     // ''
'ab'.repeat('3');      // 'ababab'
```

#### 3.padStart(),padEnd()
用于将字符串**头部**或**尾部**补全长度，`padStart()`为**头部补全**，`padEnd()`为**尾部补全**。    
这两个方法接收**2个**参数，第一个指定**字符串最小长度**，第二个**用于补全的字符串**。  
**基础用法** ：  
```js
'x'.padStart(5, 'ab');   // 'ababx'
'x'.padEnd(5, 'ab');     // 'xabab'
```
**特殊用法**:  
* 原字符串长度，大于或等于指定最小长度，则返回原字符串。  
```js
'xyzabc'.padStart(5, 'ab'); // 'xyzabc'
```
* 用来补全的字符串长度和原字符串长度之和，超过指定最小长度，则截去超出部分的补全字符串。  
```js
'ab'.padStart(5,'012345'); // "012ab"
```
* 省略第二个参数，则用`空格`补全。  
```js
'x'.padStart(4);           // '    x'
'x'.endStart(4);           // 'x    '
```
#### 4.模版字符串
用于拼接字符串，ES6之前：  
```js
let a = 'abc' + 
    'def' + 
    'ghi';
```
ES6之后：  
```js
let a = `
    abc
    def
    ghi
`
```
**拼接变量**:
在**反引号(\`)**中使用`${}`包裹变量或方法。  
```js
// ES6之前
let a = 'abc' + v1 + 'def';

// ES6之后
let a = `abc${v1}def`
```

### 正则的拓展

### 数值的拓展
#### 1.Number.isFinite(), Number.isNaN()
`Number.isFinite()` 用于检查一个数值是否是有限的，即不是`Infinity`，若参数不是`Number`类型，则一律返回`false` 。    
```js
Number.isFinite(10);            // true
Number.isFinite(0.5);           // true
Number.isFinite(NaN);           // false
Number.isFinite(Infinity);      // false
Number.isFinite(-Infinity);     // false
Number.isFinite('leo');         // false
Number.isFinite('15');          // false
Number.isFinite(true);          // false
Number.isFinite(Math.random()); // true
```

`Number.isNaN()`用于检查是否是`NaN`，若参数不是`NaN`，则一律返回`false`。  
```js
Number.isNaN(NaN);      // true
Number.isNaN(10);       // false
Number.isNaN('10');     // false
Number.isNaN(true);     // false
Number.isNaN(5/NaN);    // true
Number.isNaN('true' / 0);      // true
Number.isNaN('true' / 'true'); // true
```

**区别**：  
与传统全局的`isFinite()`和`isNaN()`方法的区别，传统的这两个方法，是先将参数转换成**数值**，再判断。    
而ES6新增的这两个方法则只对**数值**有效，  `Number.isFinite()`对于**非数值**一律返回`false`,` Number.isNaN()`只有对于`NaN`才返回`true`，其他一律返回`false`。  
```js
isFinite(25);          // true
isFinite("25");        // true
Number.isFinite(25);   // true
Number.isFinite("25"); // false

isNaN(NaN);            // true
isNaN("NaN");          // true
Number.isNaN(NaN);     // true
Number.isNaN("NaN");   // false
```

#### 2.Number.parseInt(), Number.parseFloat()
这两个方法与全局方法`parseInt()`和`parseFloat()`一致，目的是逐步**减少全局性的方法**，让**语言更模块化**。    
```js
parseInt('12.34');     // 12
parseFloat('123.45#'); // 123.45

Number.parseInt('12.34');     // 12
Number.parseFloat('123.45#'); // 123.45

Number.parseInt === parseInt;     // true
Number.parseFloat === parseFloat; // true
```

#### 3.Number.isInteger() 
用来判断一个数值是否是整数，若参数不是数值，则返回`false`。    
```js
Number.isInteger(10);   // true
Number.isInteger(10.0); // true
Number.isInteger(10.1); // false
```

#### 4.Math对象的拓展
ES6新增17个数学相关的**静态方法**，只能在**Math对象**上调用。  
* **Math.trunc**:  
用来去除小数的小数部分，**返回整数部分**。  
若参数为**非数值**，则**先转为数值**。  
若参数为**空值**或**无法截取整数的值**，则返回**NaN**。  
```js
// 正常使用
Math.trunc(1.1);     // 1
Math.trunc(1.9);     // 1
Math.trunc(-1.1);    // -1
Math.trunc(-1.9);    // -1
Math.trunc(-0.1234); // -0

// 参数为非数值
Math.trunc('11.22'); // 11
Math.trunc(true);    // 1
Math.trunc(false);   // 0
Math.trunc(null);    // 0

// 参数为空和无法取整
Math.trunc(NaN);       // NaN
Math.trunc('leo');     // NaN
Math.trunc();          // NaN
Math.trunc(undefined); // NaN
```
**ES5实现**：   
```js
Math.trunc = Math.trunc || function(x){
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}
```

* **Math.sign()**:  
判断一个数是**正数**、**负数**还**是零**，对于非数值，会先转成**数值**。    
返回值：   
> 参数为正数， 返回 +1
> 参数为负数， 返回 -1
> 参数为0， 返回 0
> 参数为-0， 返回 -0
> 参数为其他值， 返回 NaN
```js
Math.sign(-1);   // -1
Math.sign(1);    // +1
Math.sign(0);    // 0
Math.sign(-0);   // -0
Math.sign(NaN);  // NaN

Math.sign('');   // 0
Math.sign(true); // +1
Math.sign(false);// 0
Math.sign(null); // 0
Math.sign('9');  // +1
Math.sign('leo');// NaN
Math.sign();     // NaN
Math.sign(undefined); // NaN
```

**ES5实现**  
```js
Math.sign = Math.sign || function (x){
    x = +x;
    if (x === 0 || isNaN(x)){
        return x;
    }
    return x > 0 ? 1: -1;
}
```

* **Math.cbrt()**:  
用来计算一个数的立方根，若参数为非数值则先转成数值。
```js
Math.cbrt(-1); // -1
Math.cbrt(0);  // 0
Math.cbrt(1);  // 1
Math.cbrt(2);  // 1.2599210498

Math.cbrt('1');   // 1
Math.cbrt('leo'); // NaN
```
**ES5实现**  
```js
Math.cbrt = Math.cbrt || function (x){
    var a = Math.pow(Math.abs(x), 1/3);
    return x < 0 ? -y : y;
}
```

* **Math.clz32()**:  
用于返回一个数的 32 位无符号整数形式有多少个前导 0。
```js
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
```

* **Math.imul()**:  
用于返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。   
```js
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4
```

* **Math.fround()**:  
用来返回一个数的**2位单精度浮点数**形式。  
```js
Math.fround(0)   // 0
Math.fround(1)   // 1
Math.fround(2 ** 24 - 1)   // 16777215
```

* **Math.hypot()**:   
用来返回所有参数的平方和的**平方根**。  
```js
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3
```

* **Math.expm1()**:  
用来返回` ex - 1`，即`Math.exp(x) - 1`。  
```js
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045
```
**ES5实现**  
```js
Math.expm1 = Math.expm1 || function(x) {
  return Math.exp(x) - 1;
};
```

* **Math.log1p()**:  
用来返回`1 + x`的自然对数，即`Math.log(1 + x)`。如果x小于`-1`，返回`NaN`。  
```js
Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN
```
**ES5实现**  
```js
Math.log1p = Math.log1p || function(x) {
  return Math.log(1 + x);
};
```

* **Math.log10()**:  
用来返回以 `10 `为底的`x的对数`。如果x小于 0，则返回 `NaN`。  
```js
Math.log10(2)      // 0.3010299956639812
Math.log10(1)      // 0
Math.log10(0)      // -Infinity
Math.log10(-2)     // NaN
Math.log10(100000) // 5
```
**ES5实现**  
```js
Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};
```

* **Math.log2()**:  
用来返回以 `2` 为底的`x的对数`。如果`x`小于` 0`，则返回 `NaN`。   
```js
Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 << 29) // 29
```
**ES5实现**  
```js
Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};
```
* **双曲函数方法**:  
>`Math.sinh(x)` 返回x的**双曲正弦**（hyperbolic sine）  
>`Math.cosh(x)` 返回x的**双曲余弦**（hyperbolic cosine）  
>`Math.tanh(x)` 返回x的**双曲正切**（hyperbolic tangent）  
>`Math.asinh(x)` 返回x的**反双曲正弦**（inverse hyperbolic sine）  
>`Math.acosh(x)` 返回x的**反双曲余弦**（inverse hyperbolic cosine）  
>`Math.atanh(x)` 返回x的**反双曲正切**（inverse hyperbolic tangent）  

#### 5.指数运算符
新增的指数运算符(`**`):  
```js
2 ** 2; // 4
2 ** 3; // 8 

2 ** 3 ** 2; // 相当于 2 ** (3 ** 2); 返回 512
```
指数运算符(`**`)与`Math.pow`的实现不相同，对于特别大的运算结果，两者会有细微的差异。
```js
Math.pow(99, 99)
// 3.697296376497263e+197

99 ** 99
// 3.697296376497268e+197
```

### 函数的拓展
#### 1.参数默认值
```js
// ES6 之前
function f(a, b){
    b = b || 'leo';
    console.log(a, b);
}

// ES6 之后
function f(a, b='leo'){
    console.log(a, b);
}

f('hi');          // hi leo
f('hi', 'jack');  // hi jack
f('hi', '');      // hi leo
```
**注意**:  
* 参数变量是默认声明的，不能用`let`和`const`再次声明：    
```js
function f (a = 1){
    let a = 2; // error
}
```
* 使用参数默认值时，参数名不能相同：  
```js
function f (a, a, b){ ... };     // 不报错
function f (a, a, b = 1){ ... }; // 报错
```

**与解构赋值默认值结合使用**：  
```js
function f ({a, b=1}){
    console.log(a,b)
};
f({});         // undefined 1
f({a:2});      // 2 1
f({a:2, b:3}); // 2 3
f();           // 报错

function f ({a, b = 1} = {}){
    console.log(a, b)
}
f();  // undefined 1
```

**尾参数定义默认值**:   
通常在尾参数定义默认值，便于观察参数，并且非尾参数无法省略。 
```js
function f (a=1,b){
    return [a, b];
}
f();    // [1, undefined]
f(2);   // [2, undefined]
f(,2);  // 报错

f(undefined, 2);  // [1, 2]

function f (a, b=1, c){
    return [a, b, c];
}
f();        // [undefined, 1, undefined]
f(1);       // [1,1,undefined]
f(1, ,2);   // 报错
f(1,undefined,2); // [1,1,2]
```
在给参数传递默认值时，传入`undefined`会触发默认值，传入`null`不会触发。  
```js
function f (a = 1, b = 2){
    console.log(a, b);
}
f(undefined, null); // 1 null
```

**函数的length属性**:  
`length`属性将返回，没有指定默认值的参数数量，并且rest参数不计入`length`属性。    
```js
function f1 (a){...};
function f2 (a=1){...};
function f3 (a, b=2){...};
function f4 (...a){...};
function f5 (a,b,...c){...};

f1.length; // 1
f2.length; // 0
f3.length; // 1
f4.length; // 0
f5.length; // 2
```

#### 2.rest 参数
`rest`参数形式为（`...变量名`），其值为一个数组，用于获取函数多余参数。  
```js
function f (a, ...b){
    console.log(a, b);
}
f(1,2,3,4); // 1 [2, 3, 4]
```
**注意**：  
* `rest`参数只能放在最后一个，否则报错：  
```js
function f(a, ...b, c){...}; // 报错 
```
* 函数的`length`属性不包含`rest`参数。
```js
function f1 (a){...};
function f2 (a,...b){...};
f1(1);   // 1
f2(1,2); // 1
```

#### 3.name 属性
用于返回该函数的函数名。  
```js
function f (){...};
f.name;    // f

const f = function g(){...};
f.name;    // g
```

#### 4.箭头函数
使用“箭头”(`=>`)定义函数。  
**基础使用**：   
```js
// 有1个参数
let f = v => v;
// 等同于
let f = function (v){return v};

// 有多个参数
let f = (v, i) => {return v + i};
// 等同于
let f = function (v, i){return v + i};

// 没参数
let f = () => 1;
// 等同于
let f = function (){return 1};
```

**箭头函数与变量结构结合使用**：  
```js
// 正常函数写法
function f (p) {
    return p.a + ':' + p.b;
}

// 箭头函数写法
let f = ({a, b}) => a + ':' + b;
```

**简化回调函数**：  
```js
// 正常函数写法
[1, 2, 3].map(function (x){
    return x * x;
})


// 箭头函数写法
[1, 2, 3].map(x => x * x);
```

**箭头函数与rest参数结合**：  
```js
let f = (...n) => n;
f(1, 2, 3); // [1, 2, 3]
```

**注意点**：   
* 1.箭头函数内的`this`**总是**指向**定义时所在的对象**，而不是调用时。  
* 2.箭头函数不能当做**构造函数**，即不能用`new`命令，否则报错。  
* 3.箭头函数不存在`arguments`对象，即不能使用，可以使用`rest`参数代替。  
* 4.箭头函数不能使用`yield`命令，即不能用作**Generator**函数。   

**不适用场景**：  
* 1.在定义函数方法，且该方法内部包含`this`。  
```js
const obj = {
    a:9,
    b: () => {
        this.a --;
    }
}
```
上述`b`如果是**普通函数**，函数内部的`this`指向`obj`，但是如果是箭头函数，则`this`会指向**全局**，不是预期结果。  

* 2.需要动态`this`时。  
```js
let b = document.getElementById('myID');
b.addEventListener('click', ()=>{
    this.classList.toggle('on');
})
```
上诉按钮点击会报错，因为`b`监听的箭头函数中，`this`是全局对象，若改成**普通函数**，`this`就会指向被点击的按钮对象。  

#### 5.双冒号运算符
双冒号暂时是一个提案，用于解决一些不适用的场合，取代`call`、`apply`、`bind`调用。    
双冒号运算符(`::`)的左边是一个**对象**，右边是一个**函数**。该运算符会自动将左边的对象，作为上下文环境(即`this`对象)，绑定到右边函数上。  
```js
f::b;
// 等同于
b.bind(f);

f::b(...arguments);
// 等同于
b.apply(f, arguments);
```
若双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定到该对象上。  
```js
let f = a::a.b;
// 等同于
let f = ::a.b;
```

### 对象的拓展
#### 1.拓展运算符
拓展运算符使用(`...`)，类似`rest`参数的逆运算，将数组转为用(`,`)分隔的参数序列。   
```js
console.log(...[1, 2, 3]);   // 1 2 3 
console.log(1, ...[2,3], 4); // 1 2 3 4
```
拓展运算符主要使用在函数调用。  
```js
function f (a, b){
    console.log(a, b);
}
f(...[1, 2]); // 1 2

function g (a, b, c, d, e){
    console.log(a, b, c, d, e);
}
g(0, ...[1, 2], 3, ...[4]); // 0 1 2 3 4
```
**若拓展运算符后面是个空数组，则不产生效果**。  
```js
[...[], 1]; // 1
```

**替代apply方法**  
```js
// ES6之前
function f(a, b, c){...};
var a = [1, 2, 3];
f.apply(null, a);

// ES6之后
function f(a, b, c){...};
let a = [1, 2, 3];
f(...a);

// ES6之前
Math.max.apply(null, [3,2,6]);

// ES6之后
Math.max(...[3,2,6]);
```

**拓展运算符的运用** 
* **(1)复制数组**：  
通常我们直接复制数组时，只是浅拷贝，如果要实现深拷贝，可以使用拓展运算符。  
```js
// 通常情况 浅拷贝
let a1 = [1, 2];
let a2 = a1; 
a2[0] = 3;
console.log(a1,a2); // [3,2] [3,2]

// 拓展运算符 深拷贝
let a1 = [1, 2];
let a2 = [...a1];
// let [...a2] = a1; // 作用相同
a2[0] = 3;
console.log(a1,a2); // [1,2] [3,2]
```
* **(2)合并数组**：  
注意，这里合并数组，只是浅拷贝。  
```js
let a1 = [1,2];
let a2 = [3];
let a3 = [4,5];

// ES5 
let a4 = a1.concat(a2, a3);

// ES6
let a5 = [...a1, ...a2, ...a3];

a4[0] === a1[0]; // true
a5[0] === a1[0]; // true
```

* **(3)与解构赋值结合**：  
与解构赋值结合生成数组，但是使用拓展运算符需要放到参数最后一个，否则报错。   
```js
let [a, ...b] = [1, 2, 3, 4]; 
// a => 1  b => [2,3,4]

let [a, ...b] = [];
// a => undefined b => []

let [a, ...b] = ["abc"];
// a => "abc"  b => []
```

#### 2.Array.from()
将 **类数组对象** 和 **可遍历的对象**，转换成真正的数组。  
```js
// 类数组对象
let a = {
    '0':'a',
    '1':'b',
    length:2
}
let arr = Array.from(a);

// 可遍历的对象
let a = Array.from([1,2,3]);
let b = Array.from({length: 3});
let c = Array.from([1,2,3]).map(x => x * x);
let d = Array.from([1,2,3].map(x => x * x));
```

#### 3.Array.of()
将一组数值，转换成**数组**，弥补`Array`方法参数不同导致的差异。   
```js
Array.of(1,2,3);    // [1,2,3]
Array.of(1).length; // 1

Array();       // []
Array(2);      // [,] 1个参数时，为指定数组长度
Array(1,2,3);  // [1,2,3] 多于2个参数，组成新数组
```

#### 4.find()和findIndex()
`find()`方法用于找出第一个符合条件的数组成员，参数为一个回调函数，所有成员依次执行该回调函数，返回第一个返回值为`true`的成员，如果没有一个符合则返回`undefined`。  
```js
[1,2,3,4,5].find( a => a < 3 ); // 1
```
回调函数接收三个参数，当前值、当前位置和原数组。  
```js
[1,2,3,4,5].find((value, index, arr){
    // ...
});
```
`findIndex()`方法与`find()`类似，返回第一个符合条件的数组成员的**位置**，如果都不符合则返回`-1`。  
```js
[1,2,3,4].findIndex((v,i,a)=>{
    return v>2;
}); // 2
```

#### 5.fill()
用于用指定值**填充**一个数组，通常用来**初始化空数组**，并抹去数组中已有的元素。   
```js
new Array(3).fill('a');   // ['a','a','a']
[1,2,3].fill('a');        // ['a','a','a']
```
并且`fill()`的第二个和第三个参数指定填充的**起始位置**和**结束位置**。   
```js
[1,2,3].fill('a',1,2);
```

#### 6.entries(),keys(),values()
主要用于遍历数组，`entries()`对键值对遍历，`keys()`对键名遍历，`values()`对键值遍历。   
```js
for (let i of ['a', 'b'].keys()){
    console.log(i)
}
// 0
// 1

for (let e of ['a', 'b'].keys()){
    console.log(e)
}
// 'a'
// 'b'

for (let e of ['a', 'b'].keys()){
    console.log(e)
}
// 0 'a'
// 1 'b'
```

#### 7.includes()
用于表示数组是否包含给定的值，与字符串的`includes`方法类似。   
```js
[1,2,3].includes(2);     // true
[1,2,3].includes(4);     // false
[1,2,NaN].includes(NaN); // true
```
第二个参数为**起始位置**，默认为`0`，如果负数，则表示倒数的位置，如果大于数组长度，则重置为`0`开始。  
```js
[1,2,3].includes(3,3);    // false
[1,2,3].includes(3,4);    // false
[1,2,3].includes(3,-1);   // true
[1,2,3].includes(3,-4);   // true
```

#### 8.flat(),flatMap()
`flat()`用于将数组一维化，返回一个新数组，不影响原数组。   
默认一次只一维化一层数组，若需多层，则传入一个整数参数指定层数。   
若要一维化所有层的数组，则传入`Infinity`作为参数。  
```js
[1, 2, [2,3]].flat();        // [1,2,2,3]
[1,2,[3,[4,[5,6]]]].flat(3); // [1,2,3,4,5,6]
[1,2,[3,[4,[5,6]]]].flat('Infinity'); // [1,2,3,4,5,6]
```
`flatMap()`是将原数组每个对象先执行一个函数，在对返回值组成的数组执行`flat()`方法，返回一个新数组，不改变原数组。  
 `flatMap()`只能展开一层。  
```js
[2, 3, 4].flatMap((x) => [x, x * 2]); 
// [2, 4, 3, 6, 4, 8] 
```


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

### ES5/6对数组空位的处理

数组的空位不是`undefined`，而是没有任何值，数组的`undefined`也是有值。  
```js
0 in [undefined,undefined,undefined] // true
0 in [,,,] // false
```
**ES5对空位的处理**：  
* `forEach()`, `filter()`, `reduce()`, `every()` 和`some()`都会跳过空位。  
* `map()`会跳过空位，但会保留这个值。  
* `join()`和`toString()`会将空位视为`undefined`，而`undefined`和`null`会被处理成空字符串。  
```js
[,'a'].forEach((x,i) => console.log(i)); // 1
['a',,'b'].filter(x => true);      // ['a','b']
[,'a'].every(x => x==='a');        // true
[1,,2].reduce((x,y) => x+y);       // 3
[,'a'].some(x => x !== 'a');       // false
[,'a'].map(x => 1);                // [,1]
[,'a',undefined,null].join('#');   // "#a##"
[,'a',undefined,null].toString();  // ",a,,"
```
**ES6对空位的处理**：  
将空位视为正常值，转成`undefined`。
```js
Array.from(['a',,'b']);// [ "a", undefined, "b" ]
[...['a',,'b']];       // [ "a", undefined, "b" ]

//copyWithin() 会连空位一起拷贝。  
[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]

//fill()会将空位视为正常的数组位置。
new Array(3).fill('a') // ["a","a","a"]

//for...of循环也会遍历空位。
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}  // 1 1
```
`entries()`、`keys()`、`values()`、`find()`和`findIndex()`会将空位处理成`undefined`。   
```js
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

[...[,'a'].keys()] // [0,1]

[...[,'a'].values()] // [undefined,"a"]

[,'a'].find(x => true) // undefined

[,'a'].findIndex(x => true) // 0
```
**由于空位的处理规则非常不统一，所以建议避免出现空位。**


# 四、结语
