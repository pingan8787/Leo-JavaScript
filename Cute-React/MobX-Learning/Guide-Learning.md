![Cover](http://images.pingan8787.com/blog/20191024MobX_Cover.png)

# 一、MobX 介绍

首先看下官网介绍： 

> MobX 是一个经过战火洗礼的库，它通过透明的函数响应式编程(transparently applying functional reactive programming - TFRP)使得状态管理变得简单和可扩展。MobX背后的哲学很简单:
> 任何源自应用状态的东西都应该自动地获得。
> 其中包括UI、数据序列化、服务器通讯，等等。

核心重点就是：**MobX 通过响应式编程实现简单高效，可扩展的状态管理**。

<img src="http://images.pingan8787.com/blog/mobx.png" width="120px"/>

## React 和 Mobx 关系

React 和 MobX 相辅相成，相互合作。

官网介绍：

> React 通过提供机制把应用状态转换为可渲染组件树并对其进行渲染。而MobX提供机制来存储和更新应用状态供 React 使用。


## Mobx 工作流程

这里先了解下大概整理流程，接下来会结合代码，介绍每一个部分。

![2019102303.png](http://images.pingan8787.com/blog/2019102303.png)

## 本文概要

本文使用的是 MobX 5 版本，主要将从以下几个方面介绍 MobX 的使用：

1. 配置 Webpack 的 MobX 开发环境
2. MobX 常用 API 介绍（主要介绍与**可观察数据**相关的操作）
3. MobX 简单实例

![cover](http://images.pingan8787.com/blog/20191024cover.png)

# 二、配置 Webpack 的 MobX 开发环境

* 安装 webpack 和 babel 依赖包：

```sh
cnpm i webpack webpack-cli babel-core babel-preset-env babel-loader -D
```

* 安装 MobX 相关依赖包：

```sh
cnpm i mobx-react -D
cnpm i babel-plugin-transform-class-properties -D 
cnpm i babel-plugin-transform-decorators-legacy -D 
```

* webpack.config.js 中添加配置：

注意：`transform-decorators-legacy` 一定放在第一个。

```js
const path = require('path')

const config = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path:  path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-decorators-legacy', 'transform-class-properties']
                }
            }
        }]
    },
    devtool: 'inline-source-map'
}

module.exports = config
```


# 三、MobX 常用 API 介绍

## 1. 设置可观察数据（observable）

### 1.1 (@)observable

`observable` 是一种让数据的变化可以被观察的方法，底层是通过把该属性转化成 `getter` / `setter` 来实现的。。

`observable` 值可以是 JS原始数据类型、引用类型、普通对象、类实例、数组和映射。

#### observable 使用

* 对于**JS原始类型**（`Number`/`String`/`Boolean`）， 使用` observable.box() `方法设置:

```js
const num = observable.box(99)
const str = observable.box('leo')
const bool = observable.box(true)

// 获取原始值  get()
console.log(num.get(),str.get(),bool.get())   // 99 "leo" true

// 修改原始值  set(params)
num.set(100);
str.set('pingan');
bool.set(false);
console.log(num.get(),str.get(),bool.get())  // 100 "pingan" false
```

* 对于**数组**、**对象类型**，使用 `observable()` 方法设置：   
```js
const list = observable([1, 2, 4]);
list[2] = 3;
list.push(5) // 可以调用数组方法
console.log(list[0], list[1], list[2], list[3]) // 1 2 3 5

const obj = observable({a: '11', b: '22'})
console.log(obj.a, obj.b) // 11 22
obj.a = "leo";
console.log(obj.a, obj.b) // leo 22
```

**需要注意的是：**应该避免**下标越界**去方法数组中的值，这样的数据将不会被 MobX 所监视：

```js
const list = observable([1, 2, 4]);
// 错误
console.log(list[9]) // undefined
```

因此在实际开发中，需要注意数组长度的判断。

* 对于**映射**（Map）类型，使用 `observable.map()` 方法设置：   

```js
const map = observable.map({ key: "value"});
map.set("key", "new value");
console.log(map.has('key'))  // true
map.delete("key");
console.log(map.has('key'))  // false
```

#### @observable 使用

MobX 也提供使用装饰器 `@observable` 来将其转换成可观察的，可以使用在实例的字段和属性上。

```js
import {observable} from "mobx";

class Leo {
    @observable arr = [1];
    @observable obj = {};
    @observable map = new Map();
    @observable str = 'leo';
    @observable num = 100;
    @observable bool = false;
}
let leo = new Leo()
console.log(leo.arr[0]) // 1
```


相比于前面使用 `observable.box() `方法对**JS原始类型**（`Number`/`String`/`Boolean`）进行定义，装饰器 `@observable` 则可以直接定义这些类型。

原因是装饰器 `@observable` 更进一步封装了 `observable.box()`。


## 2. 响应可观察数据的变化

### 2.1 (@)computed

**计算值**(computed values)是可以根据现有的状态或其它计算值进行组合计算的值。可以使实际可修改的状态尽可能的小。 

此外计算值还是**高度优化过**的，所以尽可能的多使用它们。

**可以简单理解为：**它是**相关状态变化时自动更新的值**，可以将多个可观察数据合并成一个可观察数据，并且只有在**被使用时才会自动更新**。

#### 知识点：使用方式

* **使用方式1：声明式创建**

```js
import {observable, computed} from "mobx";

class Money {
    @observable price = 0;
    @observable amount = 2;

    constructor(price = 1) {
        this.price = price;
    }

    @computed get total() {
        return this.price * this.amount;
    }
}
let m = new Money()

console.log(m.total) // 2
m.price = 10;
console.log(m.total) // 20
```

* **使用方式2：使用 decorate 引入**

```js
import {decorate, observable, computed} from "mobx";

class Money {
    price = 0;
    amount = 2;
    constructor(price = 1) {
        this.price = price;
    }

    get total() {
        return this.price * this.amount;
    }
}
decorate(Money, {
    price: observable,
    amount: observable,
    total: computed
})

let m = new Money()

console.log(m.total) // 2
m.price = 10;
console.log(m.total) // 20
```

* **使用方式3：使用 observable.object 创建**

`observable.object` 和 `extendObservable` 都会自动将 `getter` 属性推导成**计算属性**，所以下面这样就足够了:

```js
import {observable} from "mobx";

const Money = observable.object({
    price: 0,
    amount: 1,
    get total() {
        return this.price * this.amount
    }
})

console.log(Money.total) // 0
Money.price = 10;
console.log(Money.total) // 10
```

* **注意点**

如果任何影响计算值的值发生变化了，计算值将根据状态自动进行变化。

如果前一个计算中使用的数据没有更改，计算属性将不会重新运行。 如果某个其它计算属性或 reaction 未使用该计算属性，也不会重新运行。 在这种情况下，它将被暂停。

#### 知识点：computed 的 setter

`computed` 的 `setter` 不能用来改变**计算属性的值**，而是用来它里面的成员，来使得 `computed` 发生变化。

这里我们使用 `computed` 的第一种声明方式为例，其他几种方式实现起来类似：

```js
import {observable, computed} from "mobx";

class Money {
    @observable price = 0;
    @observable amount = 2;

    constructor(price = 1) {
        this.price = price;
    }

    @computed get total() {
        return this.price * this.amount;
    }

    set total(n){
        this.price = n + 1
    }
}

let m = new Money()

console.log(m.total) // 2
m.price = 10;
console.log(m.total) // 20
m.total = 6;
console.log(m.total) // 14
```

从上面实现方式可以看出，`set total` 方法中接收一个参数 `n` 作为 `price` 的新值，我们调用 `m.total` 后设置了新的 `price`，于是 `m.total` 的值也随之发生改变。 

**注意：**   
一定在 geeter 之后定义 setter，一些 typescript 版本会认为声明了两个名称相同的属性。

#### 知识点：computed(expression) 函数

一般可以通过下面两种方法观察变化，并获取计算值：

* 方法1： 将 `computed` 作为函数调用，在返回的对象使用 `.get()` 来获取计算的当前值。
* 方法2： 使用 `observe(callback)` 来观察值的改变，其计算后的值在 `.newValue` 上。

```js
import {observable, computed} from "mobx";

let leo = observable.box('hello');
let upperCaseName = computed(() => leo.get().toUpperCase())
let disposer = upperCaseName.observe(change => console.log(change.newValue))
leo.set('pingan')
```

更详细的 `computed` 参数可以查看文档：[《Computed 选项》](https://cn.mobx.js.org/refguide/computed-decorator.html)。

#### 知识点：错误处理

计算值在计算期间抛出异常，则此异常会被捕获，并**在读取其值的时候抛出异常**。

抛出异常**不会中断跟踪**，所有计算值可以从异常中恢复。

```js
import {observable, computed} from "mobx";
let x = observable.box(10)
let y = observable.box(2)
let div = computed(() => {
    if(y.get() === 0) throw new Error('y 为0了')
    return x.get() / y.get()
})

div.get() // 5
y.set(0)  // ok
div.get() // 报错，y 为0了

y.set(5)
div.get() // 恢复正常，返回 2
```

#### 小结
用法：

* `computed(() => expression)`
* `computed(() => expression, (newValue) => void)`
* `computed(() => expression, options)`
* `@computed({equals: compareFn}) get classProperty() { return expression; }`
* `@computed get classProperty() { return expression; }`

还有各种选项可以控制 `computed` 的行为。包括:

* `equals: (value, value) => boolean` 用来重载默认检测规则的比较函数。 内置比较器有: `comparer.identity`, `comparer.default`, `comparer.structural`；
* `requiresReaction: boolean` 在重新计算衍生属性之前，等待追踪的 `observables` 值发生变化；
* `get: () => value)` 重载计算属性的 `getter`；
* `set: (value) => void` 重载计算属性的 `setter`；
* `keepAlive: boolean` 设置为 `true` 以自动保持计算值活动，而不是在没有观察者时暂停；



### 2.2 autorun

#### 概念

`autorun` 直译就是**自动运行**的意思，那么我们要知道这两个问题：

* 自动运行什么？

即：自动运行传入 `autorun` 的参数函数。

```js
import { observable, autorun } from 'mobx'
class Store {
    @observable str = 'leo';
    @observable num = 123;
}

let store = new Store()
autorun(() => {
    console.log(`${store.str}--${store.num}`)
})
// leo--123
```

可以看出 `autorun` 自动被运行一次，并输出 `leo--123` 的值，显然这还不是自动运行。

* 怎么触发自动运行？

**当修改 autorun 中任意一个可观察数据**即可触发自动运行。

```js
// 紧接上部分代码

store.str = 'pingan'

// leo--123
// pingan--123
```

现在可以看到控制台输出这两个日志，证明 `autorun` 已经被执行两次。

#### 知识点：观察 computed 的数据

```js
import { observable, autorun } from 'mobx'
class Store {
    @observable str = 'leo';
    @observable num = 123;

    @computed get all(){
        return `${store.str}--${store.num}`
    }
}

let store = new Store()
autorun(() => {
    console.log(store.all)
})
store.str = 'pingan'

// leo--123
// pingan--123
```

可以看出，这样将 `computed` 的值在 `autorun` 中进行观察，也是可以达到一样的效果，这也是我们实际开发中常用到的。

#### 知识点：computed 与 autorun 区别

**相同点：**

都是响应式调用的表达式；

**不同点：**

* `@computed` 用于响应式的产生一个可以被其他 observer 使用的**值**；
* `autorun` 不产生新的值，而是**达到一个效果**（如：打印日志，发起网络请求等命令式的副作用）；
* `@computed`中，如果一个计算值不再被观察了，MobX 可以自动地将其**垃圾回收**，而 `autorun` 中的值必须要手动清理才行。


#### 小结

`autorun` 默认会执行一次，以获取哪些可观察数据被引用。

`autorun` 的作用是在**可观察数据被修改之后**，**自动去执行依赖可观察数据的行为**，这个行为一直就是传入 `autorun` 的函数。

### 2.3 when

接收两个函数参数，第一个函数**必须根据可观察数据来返回一个布尔值**，当该布尔值为 `true` 时，才会去执行第二个函数，并且只会执行一次。

```js
import { observable, when } from 'mobx'
class Leo {
    @observable str = 'leo';
    @observable num = 123;
    @observable bool = false;
}

let leo = new Leo()
when(() => leo.bool, () => {
    console.log('这是true')
})
leo.bool = true
// 这是true
```

可以看出当 `leo.bool` 设置成 `true` 以后，`when` 的第二个方法便执行了。

#### 注意

1. 第一个参数，必须是根据**可观察数据**来返回的布尔值，而不是普通变量的布尔值。

2. 如果第一个参数默认值为 `true`，则 `when` 函数会默认执行一次。

### 2.4 reaction

接收两个函数参数，第一个函数**引用可观察数据，并返回一个可观察数据**，作为第二个函数的参数。

`reaction` **第一次渲染的时候，会先执行一次第一个函数**，这样 MobX 就会知道哪些可观察数据被引用了。随后在这些数据被修改的时候，执行第二个函数。

```js
import { observable, reaction } from 'mobx'
class Leo {
    @observable str = 'leo';
    @observable num = 123;
    @observable bool = false;
}

let leo = new Leo()
reaction(() => [leo.str, leo.num], arr => {
    console.log(arr)
})
leo.str = 'pingan'
leo.num = 122
// ["pingan", 122]
// ["pingan", 122]
```

这里我们依次修改 `leo.str` 和 `leo.num` 两个变量，会发现 `reaction` 方法被执行**两次**，在控制台输出**两次**结果 `["pingan", 122]` ，因为可观察数据 `str` 和 `num` **分别**被修改了一次。

**实际使用场景：**

当我们没有获取到数据的时候，没有必要去执行存缓存逻辑，当第一次获取到数据以后，就执行存缓存的逻辑。

### 2.5 小结

* `computed` 可以将多个可观察数据组合成一个可观察数据；

* `autorun` 可以自动追踪所引用的可观察数据，并在数据发生变化时自动触发；

* `when` 可以设置自动触发变化的时机，是 `autorun` 的一个变种情况；

* `reaction` 可以通过分离可观察数据声明，以副作用的方式对 `autorun` 做出改进；

它们各有特点，互为补充，都能在合适场景中发挥重要作用。


## 3. 修改可观察数据

在上一部分内容中，我们了解到，对可观察的数据做出反应的时候，需要我们手动修改可观察数据的值。这种修改是通过直接向变量赋值来实现的，虽然简单易懂，但是这样会带来一个较为严重的副作用，就是**每次的修改**都会触发 `autorun` 或者 `reaction` **运行一次**。多数情况下，这种高频的触发是完全没有必要的。

比如用户对视图的一次点击操作需要很多修改 N 个状态变量，但是视图的更新只需要一次就够了。

为了优化这个问题， MobX 引入了 `action` 。

### 3.1 (@)action

`action` 是修改任何状态的行为，使用 `action` 的好处是能**将多次修改可观察状态合并成一次**，从而减少触发 `autorun` 或者 `reaction` 的次数。

可以理解成**批量操作**，即一次动作中包含多次修改可观察状态，此时只会在动作结束后，做一次性重新计算和反应。

`action` 也有两种使用方法，这里以 `decorate` 方式来介绍。

```js
import { observable, computed, reaction, action} from 'mobx'

class Store {
    @observable string = 'leo';
    @observable number = 123;
    @action bar(){
        this.string = 'pingan'
        this.number = 100
    }
}
let store = new Store()
reaction(() => [store.string, store.number], arr => {
    console.log(arr)
})
store.bar() // ["pingan", 100]
```

当我们连续去修改 `store.string` 和 `store.number` 两个变量后，再运行 `store.bar()` 会发现，控制台值输出一次 `["pingan", 100]` ，这就说明 `reaction` 只被执行一次。

#### 知识点：action.bound

另外 `action` 还有一种特殊使用方法：`action.bound`，常常用来作为一个 `callback` 的方法参数，并且执行效果也是一样：

```js
import { observable, computed, reaction, action} from 'mobx'

class Store {
    @observable string = 'leo';
    @observable number = 123;
    @action.bound bar(){
        this.string = 'pingan'
        this.number = 100
    }
}
let store = new Store()
reaction(() => [store.string, store.number], arr => {
    console.log(arr)
})
let bar = store.bar;
function foo(fun){
    fun()
}
foo(bar) //["pingan", 100]
```

#### 知识点：runInAction(name?, thunk)

`runInAction` 是个简单的工具函数，它接收代码块并在(异步的)动作中执行。这对于即时创建和执行动作非常有用，例如在**异步过程**中。`runInAction(f)` 是 `action(f)()` 的语法糖。

```js
import { observable, computed, reaction, action} from 'mobx'
class Store {
    @observable string = 'leo';
    @observable number = 123;
    @action.bound bar(){
        this.string = 'pingan'
        this.number = 100
    }
}
let store = new Store()
reaction(() => [store.string, store.number], arr => {
    console.log(arr)
})
runInAction(() => {
    store.string = 'pingan'
    store.number = 100
})//["pingan", 100]
```

# 四、 Mobx-React 简单实例

这里以简单计数器为例，实现点击按钮，数值累加的简单操作，如图：

![2019102301.png](http://images.pingan8787.com/blog/2019102301.png)

在这个案例中，我们引用 `mobx-react` 库来实现，很明显可以看出 `mobx-react` 是作为 `mobx` 和 `react` 之前的桥梁。

它将 `react` 组件转化为对可观察数据的反应，也就是将组件的 `render` 方法包装成 `autorun` 方法，使得状态变化时能自动重新渲染。

详细可以查看：https://www.npmjs.com/package/mobx-react 。

接下来开始我们的案例：

## 1. 安装依赖和配置webpack

由于配置和前面第二节介绍差不多，所以这里会以第二节的配置为基础，添加配置。

首先安装 `mobx-react` 依赖：

```shell
cnpm i mobx-react -D
```

修改` webpack.config.js`，在 `presets` 配置中添加 `react` 进来：

```diff
// ... 省略其他
- entry: path.resolve(__dirname, 'src/index.js'),
+ entry: path.resolve(__dirname, 'src/index.jsx'),
module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
-                 presets: ['env'],
+                 presets: ['env', 'react'],
                plugins: ['transform-decorators-legacy', 'transform-class-properties']
            }
        }
    }]
},
```

## 2. 初始化 React 项目

这里初始化一下我们本次项目的简单骨架：

```jsx
// index.jsx
import { observable, action} from 'mobx';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {observer, PropTypes as observablePropTypes} from 'mobx-react'

class Store {
    
}

const store = new Store();

class Bar extends Component{

}

class Foo extends Component{
    
}

ReactDOM.render(<Foo />, document.querySelector("#root"))
```

这些组件对应到我们最后页面效果如图：

![2019102302.png](http://images.pingan8787.com/blog/2019102302.png)

## 2. 实现 Store 类

`Store` 类用于存储数据。

```jsx
class Store {
    @observable cache = { queue: [] }
    @action.bound refresh(){
        this.cache.queue.push(1)
    }
}
```



## 3. 实现 Bar 和 Foo 组件

实现代码如下:
```js
@observer
class Bar extends Component{
    static propTypes = {
        queue: observablePropTypes.observableArray
    }
    render(){
        const queue = this.props.queue;
        return <span>{queue.length}</span>
    }
}

class Foo extends Component{
    static propTypes = {
        cache: observablePropTypes.observableObject
    }
    render(){
        const cache = this.props.cache;
        return <div><button onClick={this.props.refresh}>点击 + 1</button> 当前数值：<Bar queue={cache.queue} /></div>
    }
}
```

这里需要注意： 

1. 可观察数据类型中的数组，实际上并不是数组类型，这里需要用 `observablePropTypes.observableArray` 去声明它的类型，对象也是一样。

2. `@observer` 在需要**根据数据变换，而改变UI的组件去引用**，另外建议**有使用到相关数据的类**都引用。

1. 事实上，我们只需要记住 `observer` 方法，将所有 `React` 组件用 `observer` 修饰，就是 `react-mobx` 的用法。

## 4. 使用 Foo 组件

最后我们使用 `Foo` 组件，需要给它传递两个参数，这样 `Bar` 组件才能拿到并使用：

```jsx
ReactDOM.render(
    <Foo cache={store.cache} refresh={store.refresh}/>, 
    document.querySelector("#root")
)
```

# 结尾

本文参考：

* [《MobX 官方文档》](https://cn.mobx.js.org/)
* [茵风泳月《MobX 入门基础教程》](https://www.imooc.com/learn/1012)


### 关于我

> 本文首发在 [pingan8787个人博客](http://www.pingan8787.com)，如需转载请保留个人介绍。

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|

###  微信公众号
![bg](http://images.pingan8787.com/blog/2019_10_24guild_page.png)  