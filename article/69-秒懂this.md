> [打开原文](segmentfault.com/a/1190000017075730)

日常开发中经常会遇到 `this` 指向的 bug，郁闷好久才猛然醒悟，痛定思痛，将 `this` 做个汇总，以便在日后的开发工作中少走弯路。   
注意：本文讲述只针对浏览器环境。  

# 一：全局执行
```js
console.log(this);
// Window
```
可以看出在全局作用域中 `this` 指向当前的全局对象 `Window`。   

# 二：函数中执行
## 1. 非严格模式中
```js
function func () {
    console.log(this);
}
func();
// Window
```

## 2. 严格模式中
```js
"use strict";
function func () {
    console.log(this);
}
func();
// undefined
```

# 三：作为对象的方法调用
当一个函数被当作一个对象的方法调用的时候，`this` 指向当前的对象 `obj`：   
```js
var obj = {
    name: 'kk',
    func: function () {
        console.log(this.name);
    }
}
obj.func();
// kk
```
如果把对象的方法赋值给一个变量，调用该方法时，`this` 指向` Window`：    
```js
var obj = {
    name: 'kk',
    func: function () {
        console.log(this);
    }
}
var test = obj.func;
test();
// Window
```
# 四：作为一个构造函数使用
在 JS 中，为了实现类，我们需要定义一些构造函数，在调用一个构造函数的时候加上 `new `这个关键字：  
```js
function Person (name) {
    this.name = name;
    console.log(this);
}
var p1 = new Person('kk');
// Person
```  
此时，`this` 指向这个构造函数调用的时候实例化出来的对象。  

当然了，构造函数其实也是一个函数，若将构造函数当做普通函数来调用，`this` 指向 `Window`:   
```js
function Person (name) {
    this.name = name;
    console.log(this);
}
var p2 = Person('MM');
// Window
```

# 五：在定时器中使用
```js
setInterval(function () {
    console.log(this);
}, 2000)
// Window
setTimeout(function () {
    console.log(this);
}, 0)
// Window
```
如果没有特殊指向（指向更改请看下方：怎么改变 `this` 的指向），`setInterval` 和`setTimeout` 的回调函数中 `this` 的指向都是 `Window` 。这是因为 JS 的定时器方法是定义在` Window` 下的。   

# 六：箭头函数
在全局环境中调用：  
```js
var func = () => {
    console.log(this);
}
func();
// Window
```
作为对象的一个函数调用：  
```js
var obj = {
    name: 'hh',
    func: function () {
       console.log(this);
    }
}
obj.func();
// obj
var obj = {
    name: 'hh',
    func: () => {
       console.log(this);
    }
}
obj.func();
// Window
```
不难发现，普通函数作为对象的一个函数被调用，`this` 指向 `obj`，箭头函数作为对象的一个函数被调用，`this` 指向 `Window`。  

特殊情况：结合定时器调用：  
```js
var obj = {
    name: 'hh',
    func: function () {
        setTimeout(function () {
            console.log(this);
        }, 0)
    }
}
obj.func();
// Window
var obj = {
    name: 'hh',
    func: function () {
        setTimeout(() => {
            console.log(this);
        }, 0)
    }
}
obj.func();
// obj
```
若在对象的函数中，普通函数作为定时器延时执行的函数调用，`this` 指向 `Window`；箭头函数作为定时器延时执行的函数调用， `this` 指向定义时所在的对象，也就是 `func `中的 `this`，即` obj`。

箭头函数中 `this `的值取决于该函数外部非箭头函数的`this `的值，且不能通过 `call()` 、` apply()` 和 `bind()` 方法来改变 `this` 的值。   
# 七：call、apply、bind
**1.call**:  
```js
fun.call(thisArg[, arg1[, arg2[, ...]]])
```
它会立即执行函数，第一个参数是指定执行函数中 `this` 的上下文，后面的参数是执行函数需要传入的参数；

**apply**：  
```js
fun.apply(thisArg, [argsArray])
```
它也会立即执行函数，第一个参数是指定执行函数中 `this` 的上下文，第二个参数是一个数组，是传给执行函数的参数（与 `call` 的区别）；  

**bind**：  
```js
var foo = fun.bind(thisArg[, arg1[, arg2[, ...]]]);
```
它不会执行函数，而是返回一个新的函数，这个新的函数被指定了 `this` 的上下文，后面的参数是执行函数需要传入的参数；

我们来看个示例：
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  console.log(this);
}
var obj = {
  name: 'kk',
  age: 6
};
Person.call(obj, 'mm', 10);
// obj，{name: "mm", age: 10}

Person.apply(obj, ['mm', 10]);
// obj，{name: "mm", age: 10}

var p1 = Person.bind(obj, 'mm', 10)
var p2 = new p1();
// Person {name: "mm", age: 10}
```
在这个示例中，`call`、`apply` 和 `bind` 的 `this` 都指向了` obj`，都能正常运行；`call`、`apply `会立即执行函数，`call` 和 `apply` 的区别就在于传递的参数，`call` 接收多个参数列表，`apply` 接收一个包含多个参数的数组；`bind` 不是立即执行函数，它返回一个函数，需要执行 `p2` 才能返回结果，`bind` 接收多个参数列表。  

## 应用：怎么改变 this 的指向
为什么讲这个模块呢，为了便于大家更加透彻的理解上面所讲述的 `this` 指向问题，以及更加彻底的理解 JS 函数中重要的三种方法：`call`、`apply`、`bind` 的使用；并且在实际的项目开发中，我们经常会遇到需要改变 this 指向的情况。  

我们来看下都有哪些方法：

## 1. 使用 es6 的箭头函数
```js
var name = "hh";
var obj = {
    name : "kk",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        setTimeout(function () {
            this.func1()
        }, 1000);
    }
};

obj.func2();
// Uncaught TypeError: this.func1 is not a function
```
这时会报错，因为 `setTimeout` 里函数的 `thi`s 指向 `Window`，而 `Window` 对象上是没有 `func1` 这个函数的。下面我们来修改成箭头函数：  
```js
var name = "hh";
var obj = {
    name : "kk",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        setTimeout(() => {
            this.func1()
        }, 1000);
    }
};

obj.func2();
// kk
```
这时候，没有报错，因为箭头函数的` this` 的值取决于该函数外部非箭头函数的 `this` 的值，也就是 `func2` 的 `this `的值， 即` obj`。  

## 2. 在函数内部使用 _this = this
```js
var name = "hh";
var obj = {
    name : "kk",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        let _this = this;
        setTimeout(function () {
            _this.func1()
        }, 1000);
    }
};

obj.func2();
// kk
```
此时，`func2` 也能正常运行。在` func`2 中，首先设置 `var _this = this`，这里的 `this` 是指向 `func2` 的对象 `obj`，为了防止在 `func2` 中的 `setTimeout` 被 `window` 调用而导致的在 `setTimeout` 中的 `this` 为 window。我们将 `this` (指向变量 `obj`) 赋值给一个变量 `_this`，这样，在 `func2` 中我们使用 `_this` 就是指向对象 `obj` 了。

## 3. 使用 call、apply、bind

**call**：  
```js
var name = "hh";
var obj = {
    name : "kk",
    func1: function () {s
        console.log(this.name)     
    },
    func2: function () {
        setTimeout(function () {
            this.func1()
        }.call(obj), 1000);
    }
};

obj.func2();
// kk
```

**apply**:  
```js
var name = "hh";
var obj = {
    name : "kk",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        setTimeout(function () {
            this.func1()
        }.apply(obj), 1000);
    }
};

obj.func2();
// kk
```

**bind**:  
```js
var name = "hh";
var obj = {
    name : "kk",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        setTimeout(function () {
            this.func1()
        }.bind(obj)(), 1000);
    }
};

obj.func2();
// kk
```
`call`、`apply`、`bind` 都能改变` this` 的上下文对象，所以也没有报错，可以正常执行。  

具体原因可看上述第七点，`call`、`apply`、`bind`。  

## 4. new 实例化一个对象
如上：第四点，作为一个构造函数使用。  