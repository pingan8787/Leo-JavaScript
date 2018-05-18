开发中，我们或多或少地接触了设计模式，但是很多时候不知道自己使用了哪种设计模式或者说该使用何种设计模式。本文意在梳理常见设计模式的特点，从而对它们有比较清晰的认知。   

### JavaScript 中常见设计模式
* 单例模式
* 策略模式
* 代理模式
* 迭代器模式
* 发布-订阅模式
* 命令模式
* 组合模式
* 模板方法模式
* 享元模式
* 职责链模式
* 中介者模式
* 装饰者模式
* 状态模式
* <a href="#适配者模式">适配者模式</a>

### 各设计模式关键词
看完了上述设计模式后，把它们的关键词特点罗列出来，以后提到某种设计模式，进而联想相应的关键词和例子，从而心中有数。   

|设计模式|特点|案例|
|-|-|-|
|单例模式|一个类只能构造出唯一实例|创建菜单对象|
|策略模式|根据不同参数可以命中不同的策略|动画库里的算法函数|
|代理模式|代理对象和本体对象具有一致的接口|图片预加载|
|迭代器模式|能获取聚合对象的顺序和元素|each([1, 2, 3], cb)|
|发布-订阅模式|PubSub|瀑布流库|
|命令模式|不同对象间约定好相应的接口|按钮和命令的分离|
|组合模式|组合模式在对象间形成一致对待的树形结构|扫描文件夹|
|模板方法模式|父类中定好执行顺序|咖啡和茶|
|享元模式|减少创建实例的个数|男女模具试装|
|职责链模式|通过请求第一个条件，会持续执行后续的条件，直到返回结果为止|if else 优化|
|中介者模式|对象和对象之间借助第三方中介者进行通信|测试结束告知结果|
|装饰者模式|动态地给函数赋能|天冷了穿衣服，热了脱衣服|
|状态模式|每个状态建立一个类，状态改变会产生不同行为|电灯换挡|
|适配者模式|一种数据结构改成另一种数据结构|枚举值接口变更|


## 1.单例模式 
### 两个条件
* 确保只有一个实例
* 可以全局访问

### 适用
适用于弹框的实现，全局缓存  
### 实现单例模式  
```js
const singleton = function(name) {
  this.name = name
  this.instance = null
}

singleton.prototype.getName = function() {
  console.log(this.name)
}

singleton.getInstance = function(name) {
  if (!this.instance) { // 关键语句
    this.instance = new singleton(name)
  }
  return this.instance
}

// test
const a = singleton.getInstance('a') // 通过 getInstance 来获取实例
const b = singleton.getInstance('b')
console.log(a === b)
```
### JavaScript 中的单例模式
因为 JavaScript 是无类的语言，而且 JS 中的全局对象符合单例模式两个条件。很多时候我们把全局对象当成单例模式来使用，  
```js
var obj = {}
```
### 弹框层的实践
实现弹框的一种做法是先创建好弹框，然后使之隐藏，这样子的话会浪费部分不必要的 DOM 开销，我们可以在需要弹框的时候再进行创建，同时结合单例模式实现只有一个实例，从而节省部分 DOM 开销。下列为登入框部分代码：  
```js
const createLoginLayer = function() {
  const div = document.createElement('div')
  div.innerHTML = '登入浮框'
  div.style.display = 'none'
  document.appendChild(div)
  return div
}
```
使单例模式和创建弹框代码解耦  
```js
const getSingle = function(fn) {
  const result
  return function() {
    return result || result = fn.apply(this, arguments)
  }
}
```
```js
const createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = function() {
  createSingleLoginLayer()
}
```

***

## 2.策略模式
> 定义：根据不同参数可以命中不同的策略 
 
### JavaScript 中的策略模式
观察如下获取年终奖的 demo，根据不同的参数（level）获得不同策略方法(规则)，这是策略模式在 JS 比较经典的运用之一。  
```js
const strategy = {
  'S': function(salary) {
    return salary * 4
  },
  'A': function(salary) {
    return salary * 3
  },
  'B': function(salary) {
    return salary * 2
  }
}

const calculateBonus = function(level, salary) {
  return strategy[level](salary)
}

calculateBonus('A', 10000) // 30000
```
在函数是一等公民的 JS 中，策略模式的使用常常隐藏在高阶函数中，稍微变换下上述 demo 的形式如下，可以发现我们平时已经在使用它了，恭喜我们又掌握了一种设计模式。  
```js
const S = function(salary) {
  return salary * 4
}

const A = function(salary) {
  return salary * 3
}

const B = function(salary) {
  return salary * 2
}

const calculateBonus = function(func, salary) {
  return func(salary)
}

calculateBonus(A, 10000) // 30000
```
### 优点
* 能减少大量的 if 语句
* 复用性好

***

## 3.代理模式
情景：小明追女生 A  
* 非代理模式：小明 =花=> 女生A  
* 代理模式：小明 =花=> 让女生A的好友B帮忙 =花=> 女生A  

### 代理模式的特点  
* 代理对象和本体对象具有一致的接口，对使用者友好  

代理模式的种类有很多，在 JS 中最常用的为虚拟代理和缓存代理。  
#### 虚拟代理实现图片预加载  
下面这段代码运用代理模式来实现图片预加载，可以看到通过代理模式巧妙地将创建图片与预加载逻辑分离，并且在未来如果不需要预加载，只要改成请求本体代替请求代理对象就行。  
```js
const myImage = (function() {
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()

const proxyImage = (function() {
  const img = new Image()
  img.onload = function() { // http 图片加载完毕后才会执行
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('loading.jpg') // 本地 loading 图片
      img.src = src
    }
  }
})()

proxyImage.setSrc('http://loaded.jpg')
```

缓存代理实现乘积计算  
```js
const mult = function() {
  let a = 1
  for (let i = 0, l; l = arguments[i++];) {
    a = a * l
  }
  return a
}

const proxyMult = (function() {
  const cache = {}
  return function() {
    const tag = Array.prototype.join.call(arguments, ',')
    if (cache[tag]) {
      return cache[tag]
    }
    cache[tag] = mult.apply(this, arguments)
    return cache[tag]
  }
})()

proxyMult(1, 2, 3, 4) // 24
```

### 小 tip
在开发时候不要先去猜测是否需要使用代理模式，如果发现直接使用某个对象不方便时，再来优化不迟。  

*** 

## 4.迭代器模式
> 定义：能访问到聚合对象的顺序与元素
### 实现一个内部迭代器
```js
function each(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(i, arr[i])
  }
}

each([1, 2, 3], function(i, n) {
  console.log(i) // 0 1 2
  console.log(n) // 1 2 3
})
```
可以看出内部迭代器在调用的时候非常简单，使用者不用关心迭代器内部实现的细节，但这也是内部迭代器的缺点。比如要比较两数组是否相等，只能在其回调函数中作文章了，代码如下：  
```js
const compare = function(arr1, arr2) {
  each(arr1, function(i, n) {
    if (arr2[i] !== n) {
      console.log('两数组不等')
      return
    }
  })
  console.log('两数组相等')
}

const arr1 = [1, 2, 3]
const arr2 = [1, 2, 3]
compare(arr1, arr2) // 两数组相等
```
### 实现一个外部迭代器

相较于内部迭代器，外部迭代器将遍历的权利转移到外部，因此在调用的时候拥有了更多的自由性，不过缺点是调用方式较复杂。  
```js
const iterator = function(arr) {
  let current = 0
  const next = function() {
    current = current + 1
  }
  const done = function() {
    return current >= arr.length
  }
  const value = function() {
    return arr[current]
  }
  return {
    next,
    done,
    value,
  }
}

const arr1 = [1, 2 ,3]
const arr2 = [1, 2, 3]
const iterator1 = iterator(arr1)
const iterator2 = iterator(arr2)

const compare = function(iterator1, iterator2) {
  while (!iterator1.done() && !iterator2.done()) {
    if (iterator1.value() !== iterator2.value()) {
      console.log('两数组不等')
      return
    }
    iterator1.next() // 外部迭代器将遍历的权利转移到外部
    iterator2.next()
  }
  console.log('两数组相等')
}

compare(iterator1, iterator2)
```

***

## 5.发布订阅模式

事件发布/订阅模式 (PubSub) 在异步编程中帮助我们完成更松的解耦，甚至在 MVC、MVVC 的架构中以及设计模式中也少不了发布-订阅模式的参与。  
优点：在异步编程中实现更深的解耦  
缺点：如果过多的使用发布订阅模式，会增加维护的难度  

### 实现一个发布订阅模式
```js
var Event = function() {
  this.obj = {}
}

Event.prototype.on = function(eventType, fn) {
  if (!this.obj[eventType]) {
    this.obj[eventType] = []
  }
  this.obj[eventType].push(fn)
}

Event.prototype.emit = function() {
  var eventType = Array.prototype.shift.call(arguments)
  var arr = this.obj[eventType]
  for (let i = 0; i < arr.length; i++) {
    arr[i].apply(arr[i], arguments)
  }
}

var ev = new Event()

ev.on('click', function(a) { // 订阅函数
  console.log(a) // 1
})

ev.emit('click', 1)          // 发布函数
```

### 订阅函数逻辑一定要优先于发布函数吗
考虑以下场景：  
```js
$.ajax('', () => {
  // 异步订阅函数逻辑
})

// 在其他地方执行发布函数，此时并不能保证执行发布函数的时候，订阅函数已经执行
```
我们需要实现这样的逻辑：  
```js
var ev = new Event()
ev.emit('click', 1)

ev.on('click', function(a) {
  console.log(a) // 1
})
```
目标明确后，来着手实现它：  
```js
var Event = function() {
  this.obj = {}
  this.cacheList = []
}

Event.prototype.on = function(eventType, fn) {
  if (!this.obj[eventType]) {
    this.obj[eventType] = []
  }
  this.obj[eventType].push(fn)

  for (let i = 0; i < this.cacheList.length; i++) {
    this.cacheList[i]()
  }
}

Event.prototype.emit = function() {
  const arg = arguments
  const that = this
  function cache() {
    var eventType = Array.prototype.shift.call(arg)
    var arr = that.obj[eventType]
    for (let i = 0; i < arr.length; i++) {
      arr[i].apply(arr[i], arg)
    }
  }
  this.cacheList.push(cache)
}
``` 
以上代码实现思路就是把原本在 `emit` 里触发的函数存到 `cacheList`，再转交到 `on` 中触发。从而实现了发布函数先于订阅函数执行。  

***

## 6.命令模式
命令模式与策略模式有些类似，在 JavaScript 中它们都是隐式的。  
重要性：较低  
### JavaScript 中的命令模式  
命令模式在 JavaScript 中也比较简单，下面代码中对按钮和命令进行了抽离，因此可以复杂项目中可以使用命令模式将界面的代码和功能的代码交付给不同的人去写。  
```js
const setCommand = function(button, command) {
  button.onClick = function() {
    command.excute()
  }
}

// --------------------  上面的界面逻辑由A完成，下面的由B完成

const menu = {
  updateMenu: function() {
    console.log('更新菜单')
  },
}

const UpdateCommand = function(receive) {
  return {
    excute: receive.updateMenu,
  }
}

const updateCommand = UpdateCommand(menu) // 创建命令

const button1 = document.getElementById('button1')
setCommand(button1, updateCommand)
```

***

## 7.组合模式
* 组合模式在对象间形成树形结构;  
* 组合模式中基本对象和组合对象被一致对待;  
* 无须关心对象有多少层，调用时只需在根部进行调用;  

### demo1 —— 宏命令

想象我们现在手上有个万能遥控器，当我们回家，按一下开关，下列事情将被执行:  
1. 煮咖啡
2. 打开电视、打开音响
3. 打开空调、打开电脑

我们把任务划分为 3 类，效果图如下：  
![任务划分](https://camo.githubusercontent.com/a44e97b789bd6e25d1aa13b15b12239c0566b015/687474703a2f2f6f71687473637573302e626b742e636c6f7564646e2e636f6d2f39633837636538333535313566336439623630613836613066323838393764392e6a70672d343030)  
接着看看结合了命令模式和组合模式的具体实现：    
```js
const MacroCommand = function() {
  return {
    lists: [],
    add: function(task) {
      this.lists.push(task)
    },
    excute: function() { // ①：组合对象调用这里的 excute，
      for (let i = 0; i < this.lists.length; i++) {
        this.lists[i].excute()
      }
    },
  }
}

const command1 = MacroCommand() // 基本对象

command1.add({
  excute: () => console.log('煮咖啡') // ②：基本对象调用这里的 excute，
})

const command2 = MacroCommand() // 组合对象

command2.add({
  excute: () => console.log('打开电视')
})

command2.add({
  excute: () => console.log('打开音响')
})

const command3 = MacroCommand()

command3.add({
  excute: () => console.log('打开空调')
})

command3.add({
  excute: () => console.log('打开电脑')
})

const macroCommand = MacroCommand()
macroCommand.add(command1)
macroCommand.add(command2)
macroCommand.add(command3)

macroCommand.excute()

// 煮咖啡
// 打开电视
// 打开音响
// 打开空调
// 打开电脑
```

可以看出在组合模式中基本对象和组合对象被一致对待，所以要保证基本对象(叶对象)和组合对象具有一致方法。  

### demo2 —— 扫描文件夹
扫描文件夹时，文件夹下面可以为另一个文件夹也可以为文件，我们希望统一对待这些文件夹和文件，这种情形适合使用组合模式。  
```js
const Folder = function(folder) {
  this.folder = folder
  this.lists = []
}

Folder.prototype.add = function(resource) {
  this.lists.push(resource)
}

Folder.prototype.scan = function() {
  console.log('开始扫描文件夹：', this.folder)
  for (let i = 0, folder; folder = this.lists[i++];) {
    folder.scan()
  }
}

const File = function(file) {
  this.file = file
}

File.prototype.add = function() {
  throw Error('文件下不能添加其它文件夹或文件')
}

File.prototype.scan = function() {
  console.log('开始扫描文件：', this.file)
}

const folder = new Folder('根文件夹')
const folder1 = new Folder('JS')
const folder2 = new Folder('life')

const file1 = new File('深入React技术栈.pdf')
const file2 = new File('JavaScript权威指南.pdf')
const file3 = new File('小王子.pdf')

folder1.add(file1)
folder1.add(file2)

folder2.add(file3)

folder.add(folder1)
folder.add(folder2)

folder.scan()

// 开始扫描文件夹： 根文件夹
// 开始扫描文件夹： JS
// 开始扫描文件： 深入React技术栈.pdf
// 开始扫描文件： JavaScript权威指南.pdf
// 开始扫描文件夹： life
// 开始扫描文件： 小王子.pdf
```

***

## 8.模板方法模式
> 定义：在继承的基础上，在父类中定义好执行的算法。  
### 泡茶和泡咖啡
来对比下泡茶和泡咖啡过程中的异同  
|步骤 |	泡茶 | 泡咖啡|
|-|-|-|
|1 |烧开水 | 烧开水|
|2 |浸泡茶叶 | 冲泡咖啡|
|3 |倒入杯子 | 倒入杯子|
|4 |加柠檬 | 加糖|

可以清晰地看出仅仅在步骤 2 和 4 上有细微的差别，下面着手实现：  
```js
const Drinks = function() {}

Drinks.prototype.firstStep = function() {
  console.log('烧开水')
}

Drinks.prototype.secondStep = function() {}

Drinks.prototype.thirdStep = function() {
  console.log('倒入杯子')
}

Drinks.prototype.fourthStep = function() {}

Drinks.prototype.init = function() { // 模板方法模式核心：在父类上定义好执行算法
  this.firstStep()
  this.secondStep()
  this.thirdStep()
  this.fourthStep()
}

const Tea = function() {}

Tea.prototype = new Drinks

Tea.prototype.secondStep = function() {
  console.log('浸泡茶叶')
}

Tea.prototype.fourthStep = function() {
  console.log('加柠檬')
}

const Coffee = function() {}

Coffee.prototype = new Drinks

Coffee.prototype.secondStep = function() {
  console.log('冲泡咖啡')
}

Coffee.prototype.fourthStep = function() {
  console.log('加糖')
}

const tea = new Tea()
tea.init()

// 烧开水
// 浸泡茶叶
// 倒入杯子
// 加柠檬

const coffee = new Coffee()
coffee.init()

// 烧开水
// 冲泡咖啡
// 倒入杯子
// 加糖
```

### 钩子
假如客人不想加佐料(糖、柠檬)怎么办，这时可以引人钩子来实现之，实现逻辑如下：  
```js
// ...

Drinks.prototype.ifNeedFlavour = function() { // 加上钩子
  return true
}

Drinks.prototype.init = function() { // 模板方法模式核心：在父类上定义好执行算法
  this.firstStep()
  this.secondStep()
  this.thirdStep()
  if (this.ifNeedFlavour()) { // 默认是 true，也就是要加调料
    this.fourthStep()
  }
}

// ...
const Coffee = function() {}

Coffee.prototype = new Drinks()
// ...

Coffee.prototype.ifNeedFlavour = function() {
  return window.confirm('是否需要佐料吗？') // 弹框选择是否佐料
}
```

***

## 9.享元模式  
享元模式是一种优化程序性能的模式，本质为减少对象创建的个数。  

以下情况可以使用享元模式：  
* 有大量相似的对象，占用了大量内存  
* 对象中大部分状态可以抽离为外部状态  

### demo
某商家有 50 种男款内衣和 50 种款女款内衣，要展示它们  

方案一：造 50 个塑料男模和 50 个塑料女模，让他们穿上展示，代码如下：  
```js
const Model = function(gender, underwear) {
  this.gender = gender
  this.underwear = underwear
}

Model.prototype.takephoto = function() {
  console.log(`${this.gender}穿着${this.underwear}`)
}

for (let i = 1; i < 51; i++) {
  const maleModel = new Model('male', `第${i}款衣服`)
  maleModel.takephoto()
}

for (let i = 1; i < 51; i++) {
  const female = new Model('female', `第${i}款衣服`)
  female.takephoto()
}
```

方案二：造 1 个塑料男模特 1 个塑料女模特，分别试穿 50 款内衣  
```js
const Model = function(gender) {
  this.gender = gender
}

Model.prototype.takephoto = function() {
  console.log(`${this.sex}穿着${this.underwear}`)
}

const maleModel = new Model('male')
const femaleModel = new Model('female')

for (let i = 1; i < 51; i++) {
  maleModel.underwear = `第${i}款衣服`
  maleModel.takephoto()
}

for (let i = 1; i < 51; i++) {
  femaleModel.underwear = `第${i}款衣服`
  femaleModel.takephoto()
}
```
对比发现：方案一创建了 100 个对象，方案二只创建了 2 个对象，在该 demo 中，gender(性别) 是内部对象，underwear(穿着) 是外部对象。  

当然在方案二的 demo 中，还可以进一步改善：  

* 一开始就通过构造函数显示地创建实例，可用工场模式将其升级成可控生成
* 在实例上手动添加 underwear 不是很优雅，可以在外部单独在写个 manager 函数
```js
const Model = function(gender) {
  this.gender = gender
}

Model.prototype.takephoto = function() {
  console.log(`${this.gender}穿着${this.underwear}`)
}

const modelFactory = (function() { // 优化第一点
  const modelGender = {}
  return {
    createModel: function(gender) {
      if (modelGender[gender]) {
        return modelGender[gender]
      }
      return modelGender[gender] = new Model(gender)
    }
  }
}())

const modelManager = (function() {
  const modelObj = {}
  return {
    add: function(gender, i) {
      modelObj[i] = {
        underwear: `第${i}款衣服`
      }
      return modelFactory.createModel(gender)
    },
    copy: function(model, i) { // 优化第二点
      model.underwear = modelObj[i].underwear
    }
  }
}())

for (let i = 1; i < 51; i++) {
  const maleModel = modelManager.add('male', i)
  modelManager.copy(maleModel, i)
  maleModel.takephoto()
}

for (let i = 1; i < 51; i++) {
  const femaleModel = modelManager.add('female', i)
  modelManager.copy(femaleModel, i)
  femaleModel.takephoto()
}
```

***

## 10.职责链模式
职责链模式：类似多米诺骨牌，通过请求第一个条件，会持续执行后续的条件，直到返回结果为止。   
![职责链模式](https://camo.githubusercontent.com/cb2073f5e9c165843754e0b5984652c3291e88a6/687474703a2f2f6f71687473637573302e626b742e636c6f7564646e2e636f6d2f63626338633130626261653230326263643234336636623037303464653362612e6a70672d333030)   
重要性：4 星，在项目中能对 if-else 语句进行优化   
### 场景 demo
场景：某电商针对已付过定金的用户有优惠政策，在正式购买后，已经支付过 500 元定金的用户会收到 100 元的优惠券，200 元定金的用户可以收到 50 元优惠券，没有支付过定金的用户只能正常购买。   
```js
// orderType: 表示订单类型，1：500 元定金用户；2：200 元定金用户；3：普通购买用户
// pay：表示用户是否已经支付定金，true: 已支付；false：未支付
// stock: 表示当前用于普通购买的手机库存数量，已支付过定金的用户不受此限制

const order = function( orderType, pay, stock ) {
  if ( orderType === 1 ) {
    if ( pay === true ) {
      console.log('500 元定金预购，得到 100 元优惠券')
    } else {
      if (stock > 0) {
        console.log('普通购买，无优惠券')
      } else {
        console.log('库存不够，无法购买')
      }
    }
  } else if ( orderType === 2 ) {
    if ( pay === true ) {
      console.log('200 元定金预购，得到 50 元优惠券')
    } else {
      if (stock > 0) {
        console.log('普通购买，无优惠券')
      } else {
        console.log('库存不够，无法购买')
      }
    }
  } else if ( orderType === 3 ) {
    if (stock > 0) {
        console.log('普通购买，无优惠券')
    } else {
      console.log('库存不够，无法购买')
    }
  }
}

order( 3, true, 500 ) // 普通购买，无优惠券
```

下面用职责链模式改造代码：  
```js
const order500 = function(orderType, pay, stock) {
  if ( orderType === 1 && pay === true ) {
    console.log('500 元定金预购，得到 100 元优惠券')
  } else {
    order200(orderType, pay, stock)
  }
}

const order200 = function(orderType, pay, stock) {
  if ( orderType === 2 && pay === true ) {
    console.log('200 元定金预购，得到 50 元优惠券')
  } else {
    orderCommon(orderType, pay, stock)
  }
}

const orderCommon = function(orderType, pay, stock) {
  if (orderType === 3 && stock > 0) {
    console.log('普通购买，无优惠券')
  } else {
    console.log('库存不够，无法购买')
  }
}

order500( 3, true, 500 ) // 普通购买，无优惠券
```

改造后可以发现代码相对清晰了，但是链路代码和业务代码依然耦合在一起，进一步优化：  
```js
// 业务代码
const order500 = function(orderType, pay, stock) {
  if ( orderType === 1 && pay === true ) {
    console.log('500 元定金预购，得到 100 元优惠券')
  } else {
    return 'nextSuccess'
  }
}

const order200 = function(orderType, pay, stock) {
  if ( orderType === 2 && pay === true ) {
    console.log('200 元定金预购，得到 50 元优惠券')
  } else {
    return 'nextSuccess'
  }
}

const orderCommon = function(orderType, pay, stock) {
  if (orderType === 3 && stock > 0) {
    console.log('普通购买，无优惠券')
  } else {
    console.log('库存不够，无法购买')
  }
}

// 链路代码
const chain = function(fn) {
  this.fn = fn
  this.sucessor = null
}

chain.prototype.setNext = function(sucessor) {
  this.sucessor = sucessor
}

chain.prototype.init = function() {
  const result = this.fn.apply(this, arguments)
  if (result === 'nextSuccess') {
    this.sucessor.init.apply(this.sucessor, arguments)
  }
}

const order500New = new chain(order500)
const order200New = new chain(order200)
const orderCommonNew = new chain(orderCommon)

order500New.setNext(order200New)
order200New.setNext(orderCommonNew)

order500New.init( 3, true, 500 ) // 普通购买，无优惠券
```

重构后，链路代码和业务代码彻底地分离。假如未来需要新增 order300，那只需新增与其相关的函数而不必改动原有业务代码。  
另外结合 AOP 还能简化上述链路代码：  
```js
// 业务代码
const order500 = function(orderType, pay, stock) {
  if ( orderType === 1 && pay === true ) {
    console.log('500 元定金预购，得到 100 元优惠券')
  } else {
    return 'nextSuccess'
  }
}

const order200 = function(orderType, pay, stock) {
  if ( orderType === 2 && pay === true ) {
    console.log('200 元定金预购，得到 50 元优惠券')
  } else {
    return 'nextSuccess'
  }
}

const orderCommon = function(orderType, pay, stock) {
  if (orderType === 3 && stock > 0) {
    console.log('普通购买，无优惠券')
  } else {
    console.log('库存不够，无法购买')
  }
}

// 链路代码
Function.prototype.after = function(fn) {
  const self = this
  return function() {
    const result = self.apply(self, arguments)
    if (result === 'nextSuccess') {
      return fn.apply(self, arguments) // 这里 return 别忘记了~
    }
  }
}

const order = order500.after(order200).after(orderCommon)

order( 3, true, 500 ) // 普通购买，无优惠券
```
职责链模式比较重要，项目中能用到它的地方会有很多，用上它能解耦 1 个请求对象和 n 个目标对象的关系。   

*** 

## 11.中介者模式
中介者模式：对象和对象之间借助第三方中介者进行通信。  
![中介者模式](https://camo.githubusercontent.com/8411d6ad7b3c4e4f4fa3a14115f33428f5e4ab0f/687474703a2f2f6f71687473637573302e626b742e636c6f7564646e2e636f6d2f61653039353866383539393039373863343862336136616132636137366561312e6a70672d343030)  
### 场景 demo  
一场测试结束后，公布结果：告知解答出题目的人挑战成功，否则挑战失败。    
```js
const player = function(name) {
  this.name = name
  playerMiddle.add(name)
}

player.prototype.win = function() {
  playerMiddle.win(this.name)
}

player.prototype.lose = function() {
  playerMiddle.lose(this.name)
}

const playerMiddle = (function() { // 将就用下这个 demo，这个函数当成中介者
  const players = []
  const winArr = []
  const loseArr = []
  return {
    add: function(name) {
      players.push(name)
    },
    win: function(name) {
      winArr.push(name)
      if (winArr.length + loseArr.length === players.length) {
        this.show()
      }
    },
    lose: function(name) {
      loseArr.push(name)
      if (winArr.length + loseArr.length === players.length) {
        this.show()
      }
    },
    show: function() {
      for (let winner of winArr) {
        console.log(winner + '挑战成功;')
      }
      for (let loser of loseArr) {
        console.log(loser + '挑战失败;')
      }
    },
  }
}())

const a = new player('A 选手')
const b = new player('B 选手')
const c = new player('C 选手')

a.win()
b.win()
c.lose()

// A 选手挑战成功;
// B 选手挑战成功;
// C 选手挑战失败;
```
在这段代码中 A、B、C 之间没有直接发生关系，而是通过另外的 playerMiddle 对象建立链接，姑且将之当成是中介者模式了。  

***

## 12.装饰者模式
装饰器模式：动态地给函数赋能。  

### JavaScript 的装饰者模式
生活中的例子：天气冷了，就添加衣服来保暖；天气热了，就将外套脱下；这个例子很形象地含盖了装饰器的神韵，随着天气的冷暖变化，衣服可以动态的穿上脱下。  
```js
let wear = function() {
  console.log('穿上第一件衣服')
}

const _wear1 = wear

wear = function() {
  _wear1()
  console.log('穿上第二件衣服')
}

const _wear2 = wear

wear = function() {
  _wear2()
  console.log('穿上第三件衣服')
}

wear()

// 穿上第一件衣服
// 穿上第二件衣服
// 穿上第三件衣服
```

这种方式有以下缺点：1：临时变量会变得越来越多；2：this 指向有时会出错  
### AOP 装饰函数
```js
// 前置代码
Function.prototype.before = function(fn) {
  const self = this
  return function() {
    fn.apply(this, arguments)
    return self.apply(this, arguments)
  }
}

// 后置代码
Function.prototype.after = function(fn) {
  const self = this
  return function() {
    self.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}
```
用后置代码来实验下上面穿衣服的 demo，  
```js
const wear1 = function() {
  console.log('穿上第一件衣服')
}

const wear2 = function() {
  console.log('穿上第二件衣服')
}

const wear3 = function() {
  console.log('穿上第三件衣服')
}

const wear = wear1.after(wear2).after(wear3)
wear()

// 穿上第一件衣服
// 穿上第二件衣服
// 穿上第三件衣服
```

但这样子有时会污染原生函数，可以做点通变  
```js
const after = function(fn, afterFn) {
  return function() {
    fn.apply(this, arguments)
    afterFn.apply(this, arguments)
  }
}

const wear = after(after(wear1, wear2), wear3)
wear()
```

***

## 13.状态模式
状态模式：将事物内部的每个状态分别封装成类，内部状态改变会产生不同行为。  

优点：用对象代替字符串记录当前状态，状态易维护  
缺点：需编写大量状态类对象  

### 场景 demo
某某牌电灯，按一下按钮打开弱光，按两下按钮打开强光，按三下按钮关闭灯光。  
```js
// 将状态封装成不同类
const weakLight = function(light) {
  this.light = light
}

weakLight.prototype.press = function() {
  console.log('打开强光')
  this.light.setState(this.light.strongLight)
}

const strongLight = function(light) {
  this.light = light
}

strongLight.prototype.press = function() {
  console.log('关灯')
  this.light.setState(this.light.offLight)
}

const offLight = function(light) {
  this.light = light
}

offLight.prototype.press = function() {
  console.log('打开弱光')
  this.light.setState(this.light.weakLight)
}

const Light = function() {
  this.weakLight = new weakLight(this)
  this.strongLight = new strongLight(this)
  this.offLight = new offLight(this)
  this.currentState = this.offLight          // 初始状态
}

Light.prototype.init = function() {
  const btn = document.createElement('button')
  btn.innerHTML = '按钮'
  document.body.append(btn)
  const self = this
  btn.addEventListener('click', function() {
    self.currentState.press()
  })
}

Light.prototype.setState = function(state) { // 改变当前状态
  this.currentState = state
}

const light = new Light()
light.init()

// 打开弱光
// 打开强光
// 关灯
```

### 非面向对象实现的状态模式
借助于 JavaScript 的委托机制，可以像如下实现状态模式：  
```js
const obj = {
  'weakLight': {
    press: function() {
      console.log('打开强光')
      this.currentState = obj.strongLight
    }
  },
  'strongLight': {
    press: function() {
      console.log('关灯')
      this.currentState = obj.offLight
    }
  },
  'offLight': {
    press: function() {
      console.log('打开弱光')
      this.currentState = obj.weakLight
    }
  },
}

const Light = function() {
  this.currentState = obj.offLight
}

Light.prototype.init = function() {
  const btn = document.createElement('button')
  btn.innerHTML = '按钮'
  document.body.append(btn)
  const self = this
  btn.addEventListener('click', function() {
    self.currentState.press.call(self) // 通过 call 完成委托
  })
}

const light = new Light()
light.init()
```

***

## <span name="适配者模式">14.适配者模式</span>
适配者模式：主要用于解决两个接口之间不匹配的问题。  
### demo
```js
// 老接口
const zhejiangCityOld = (function() {
  return [
    {
      name: 'hangzhou',
      id: 11,
    },
    {
      name: 'jinhua',
      id: 12
    }
  ]
}())

console.log(getZhejiangCityOld())

// 新接口希望是下面形式
{
  hangzhou: 11,
  jinhua: 12,
}

// 这时候就可采用适配者模式
const const adaptor = (function(oldCity) {
  const obj = {}
  for (let city of zhejiangCityOld) {
    obj[city.name] = city.id
  }
  return obj
}())
```


> 原文地址 [JavaScript 中常见设计模式整理](https://juejin.im/post/5afe6430518825428630bc4d)