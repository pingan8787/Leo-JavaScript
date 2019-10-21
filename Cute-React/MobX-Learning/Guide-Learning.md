
# 文章简介

思路：

* 一、MobX 基础语法
* 二、配置 Webpack 的 MobX 开发环境
* 三、MobX 常用 API 介绍
    1. 可观察数据（observable）
    2. 对可观察数据做出反应
    3. 修改可观察数据
* 四、Mobx 简单实例


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

`observable` 是一种让数据的变化可以被观察的方法。

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

**可以简单理解为：**它可以将多个可观察数据合并成一个可观察数据。

#### 使用方式

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

#### computed 的 setter

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

#### computed(expression) 函数

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

#### 错误处理

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

#### 观察 computed 的数据

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

#### computed 与 autorun 区别

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

这里数组 `[leo.str, leo.num]` 会被输出两次，因为可观察数据 `str` 和 `num` 分别被修改了。

**实际使用场景：**

当我们没有获取到数据的时候，没有必要去执行存缓存逻辑，当第一次获取到数据以后，就执行存缓存的逻辑。

### 2.5 小结

* `computed` 可以将多个可观察数据组合成一个可观察数据；

* `autorun` 可以自动追踪所引用的可观察数据，并在数据发生变化时自动触发；

* `when` 可以设置自动触发变化的时机，是 `autorun` 的一个变种情况；

* `reaction` 可以通过分离可观察数据声明，以副作用的方式对 `autorun` 做出改进；

它们各有特点，互为补充，都能在合适场景中发挥重要作用。


## 3. 修改可观察数据