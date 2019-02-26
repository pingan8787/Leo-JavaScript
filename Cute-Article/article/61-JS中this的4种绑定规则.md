> [原文地址](https://segmentfault.com/a/1190000016678888)

## this
* ES6中的**箭头函数**采用的是**词法作用域**。
* 为什么要使用this：**使API设计得更简洁且易于复用**。
* this即不指向自身，也不指向函数的词法作用域。
* this的指向只取决于**函数的调用方式**。

## this绑定规则
* new > 显示绑定 > 隐式绑定 > 默认绑定

### 默认绑定

* 当独立函数调用时，不管是否在调用栈中，this都指向**全局对象**（浏览器中为window）
* 严格模式下，不能将全局对象用于默认绑定。
```js
var a = 2;
function foo(){
    console.log(this.a);
}
function bar(){
    var a = 5;
    foo();
}
bar(); // 2
```

### 隐式绑定

* 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的`this`绑定到这个上下文对象。
* 对象属性引用链中只有最后一层在调用位置中起作用。
* 要求：对象内部必须包含一个指向函数的属性，该对象可通过这个属性间接引用函数。
```js
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 42
```

* 隐式丢失
```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // 这里bar将引用foo函数本身，所以不带有函数对象的上下文

var a = "oops, global"; // a是全局对象的属性

bar(); // "oops, global"
```

和回调函数的情况下（参数传递时的隐式赋值）

```js
function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // 参数传递时，相当于fn = obj.foo，就和上个例子一样了
    fn(); // <-- call-site!
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"
```

### 显式绑定

* 采用`call()`和`apply()`，通过传入一个对象（若为基本类型，会被封装函数转为对象—装箱），将`this`绑定到该对象。
* 硬绑定

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

var bar = function() {
    foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// 硬绑定后bar无论怎么调用，都不会影响foo函数的this绑定
bar.call( window ); // 2
```

硬绑定的典型应用是如下的包裹函数：

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function() {
    return foo.apply( obj, arguments ); // 将obj对象硬编码进去
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

即将内部函数用`apply`硬绑定到某个对象，无论怎么调用这个包裹函数，都不会影响内部函数的`this`。
`bind`辅助函数如下：

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments ); // 利用参数将obj传入进去
    };
}

var obj = {
    a: 2
};

var bar = bind( foo, obj ); // bind( foo, obj )会返回一个包裹函数

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```
* **总结**：上述包裹函数，想要包裹其他函数，只能一个一个重复写，硬编码的方式导致不能被重用，当某种功能需要多次重复使用时，将其抽象出来，成为函数。

## new绑定
任何函数都可能被用作构造函数，当函数被`new`操作符“**构造调用**”时，会执行下面操作：
 1. 创建一个新对象（若该函数不是JS内置的，则创建一个新的Object对象）；
 2. 将this绑定到这个对象；
 3. 执行构造函数中的代码（为这个新对象添加属性）；
 4. 若函数没有返回其他对象，则自动返回这个新对象；若函数有return返回的是非对象，则还是自动返回这个新对象，即覆盖那个非对象。

```js
function foo(a) {
    this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
```

### 补充说明
* 间接引用
```js
function foo() {
    console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2，由于p.foo = o.foo的返回值是目标函数的引用，所以调用位置是foo()，而不是p.foo()或o.foo()
```

* **箭头函数**：不使用这四个this规则，根据**词法作用域**来决定`this`。
```js
function foo() {
    // 返回一个箭头函数
    return (a) => {
        // `this` here is lexically adopted from `foo()`
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
};

// foo()不是箭头函数，他的this被绑定到obj1
var bar = foo.call( obj1 ); // foo.call( obj1 )返回箭头函数，所以bar为箭头函数
bar.call( obj2 ); // 2! 箭头函数的this无法被修改，new也不行
```

如下为和箭头函数一样的模式：

```js
function foo() {
    var self = this; // lexical capture of `this`
    setTimeout( function(){
        console.log( self.a );
    }, 100 );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
```

this绑定的趣题：
[知乎链接-arguments对象调用](https://www.zhihu.com/question/21466212)