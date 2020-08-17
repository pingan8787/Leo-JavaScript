# 一、模式介绍

## 1. 背景介绍
在软件系统中经常碰到这类需求：当一个对象的状态发生改变，某些与它相关的对象也要随之做出相应的变化。这是建立一种**对象与对象之间的依赖关系**，一个对象发生改变时将**自动通知其他对象**，其他对象将**相应做出反应**。

我们将发生改变的对象称为**观察目标**，将被通知的对象称为**观察者**，**一个观察目标可以对应多个观察者**，而且这些观察者之间没有相互联系，之后可以根据需要增加和删除观察者，使得系统更易于扩展，这就是观察者模式的产生背景。

## 2. 概念介绍
观察者模式(Observer Pattern)：定义对象间的一种**一对多依赖关系**，使得每当一个对象状态发生改变时，其相关依赖对象皆得到通知并被自动更新。观察者模式是一种对象行为型模式。

## 3. 生活场景
在所有浏览器事件（鼠标悬停，按键等事件）都是观察者模式的例子。

另外还有：

如我们订阅微信公众号“前端自习课”（**观察目标**），当“前端自习课”群发图文消息后，所有公众号粉丝（**观察者**）都会接收到这篇文章（事件），这篇文章的内容是发布者自定义的（自定义事件），粉丝阅读后作出特定操作（如：点赞，收藏，关注等）。

![观察者模式.png](http://images.pingan8787.com/DesignPattern/observer-parttern.png)

# 二、模式特点

## 1. 模式组成
在观察者模式中，通常包含以下角色：

- **目标：Subject**
- **观察目标：ConcreteSubject**
- **观察者：Observer**
- **具体观察者：ConcreteObserver**

## 2. UML 类图
![UML 类图](http://images.pingan8787.com/DesignPattern/observer-UML.png)


图片来源：[《TypeScript 设计模式之观察者模式》](https://www.semlinker.com/ts-observer-pattern/) 

## 3. 优点

- 观察者模式可以实现**表示层和数据逻辑层的分离**，并**降低观察目标和观察者之间耦合度**；
- 观察者模式支持**简单广播通信**，**自动通知**所有已经订阅过的对象；
- 观察者模式**符合“开闭原则”的要求**；
- 观察目标和观察者之间的抽象耦合关系能够**单独扩展以及重用**。

## 4. 缺点

- 当一个观察目标**有多个直接或间接的观察者**时，通知所有观察者的过程将会花费很多时间；
- 当观察目标和观察者之间存在**循环依赖**时，观察目标会触发它们之间进行循环调用，可能**导致系统崩溃**。
- 观察者模式缺少相应机制，让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。

# 三、使用场景
在以下情况下可以使用观察者模式：

- 在一个抽象模型中，一个对象的行为**依赖于**另一个对象的状态。即当**目标对象**的状态发生改变时，会直接影响到**观察者**的行为；
- 一个对象需要通知其他对象发生反应，但不知道这些对象是谁。
- 需要在系统中创建一个触发链，A对象的行为将影响B对象，B对象的行为将影响C对象……，可以使用观察者模式创建一种链式触发机制。

# 四、实战示例

## 1. 简单示例

1. 定义**观察目标接口**（Subject）和**观察者接口**（Observer）
```typescript
// ObserverPattern.ts

// 观察目标接口
interface Subject {
  addObserver: (observer: Observer) => void;
  deleteObserver: (observer: Observer) => void;
  notifyObservers: () => void;
}

// 观察者接口
interface Observer {
  notify: () => void;
}
```

2. 定义**具体观察目标类**（ConcreteSubject）
```typescript
// ObserverPattern.ts

// 具体观察目标类
class ConcreteSubject implements Subject{ 
  private observers: Observer[] = [];
	
  // 添加观察者
  public addObserver(observer: Observer): void {
    console.log(observer, " is pushed~~");
    this.observers.push(observer);
  }

  // 移除观察者
  public deleteObserver(observer: Observer): void {
    console.log(observer, " have deleted~~");
    const idx: number = this.observers.indexOf(observer);
    ~idx && this.observers.splice(idx, 1);
  }

  // 通知观察者
  public notifyObservers(): void {
    console.log("notify all the observers ", this.observers);
    this.observers.forEach(observer => { 
      // 调用 notify 方法时可以携带指定参数
      observer.notify();
    });
  }
}
```

3. 定义**具体观察者类**（ConcreteObserver）
```typescript
// ObserverPattern.ts

// 具体观
class ConcreteObserver implements Observer{
  constructor(private name: string) {}

  notify(): void {
    // 可以处理其他逻辑
    console.log(`${this.name} has been notified.`);
  }
}
```


4. 测试代码
```typescript
// ObserverPattern.ts

function useObserver(): void {
  const subject: Subject = new ConcreteSubject();
  const Leo   = new ConcreteObserver("Leo");
  const Robin = new ConcreteObserver("Robin");
  const Pual  = new ConcreteObserver("Pual");
  const Lisa  = new ConcreteObserver("Lisa");

  subject.addObserver(Leo);
  subject.addObserver(Robin);
  subject.addObserver(Pual);
  subject.addObserver(Lisa);
  subject.notifyObservers();
  
  subject.deleteObserver(Pual);
  subject.deleteObserver(Lisa);
  subject.notifyObservers();
}

useObserver();
```

完整演示代码如下：
```typescript
// ObserverPattern.ts

interface Subject {
  addObserver: (observer: Observer) => void;
  deleteObserver: (observer: Observer) => void;
  notifyObservers: () => void;
}

interface Observer {
  notify: () => void;
}

class ConcreteSubject implements Subject{ 
  private observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    console.log(observer, " is pushed~~");
    this.observers.push(observer);
  }

  public deleteObserver(observer: Observer): void {
    console.log(observer, " have deleted~~");
    const idx: number = this.observers.indexOf(observer);
    ~idx && this.observers.splice(idx, 1);
  }

  public notifyObservers(): void {
    console.log("notify all the observers ", this.observers);
    this.observers.forEach(observer => { 
      // 调用 notify 方法时可以携带指定参数
      observer.notify();
    });
  }
}

class ConcreteObserver implements Observer{
  constructor(private name: string) {}

  notify(): void {
    // 可以处理其他逻辑
    console.log(`${this.name} has been notified.`);
  }
}

function useObserver(): void {
  const subject: Subject = new ConcreteSubject();
  const Leo   = new ConcreteObserver("Leo");
  const Robin = new ConcreteObserver("Robin");
  const Pual  = new ConcreteObserver("Pual");
  const Lisa  = new ConcreteObserver("Lisa");

  subject.addObserver(Leo);
  subject.addObserver(Robin);
  subject.addObserver(Pual);
  subject.addObserver(Lisa);
  subject.notifyObservers();
  
  subject.deleteObserver(Pual);
  subject.deleteObserver(Lisa);
  subject.notifyObservers();
}

useObserver();
```

## 2. Vue.js 数据双向绑定实现原理
在 Vue.js 中，当我们修改数据状时，视图随之更新，这就是 Vue.js 的双向数据绑定（也称响应式原理），这是 Vue.js 中最独特的特性之一。
如果你对 Vue.js 的双向数据绑定还不清楚，建议先阅读官方文档《[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)》章节。

### 2.1 原理介绍

在官网中提供这么一张流程图，介绍了 Vue.js 响应式系统的整个流程：

![原理介绍](http://images.pingan8787.com/DesignPattern/vue-observer.png)
图片来自：Vue.js 官网《[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)》

在 Vue.js 中，每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”（“Touch” 过程）过的数据 property 记录为依赖（Collect as Dependency 过程）。之后当依赖项的 setter 触发时，会通知 watcher（Notify 过程），从而使它关联的组件重新渲染（Trigger re-render 过程）——这是一个典型的观察者模式。

这道面试题考察面试者对 Vue.js 底层原理的理解、对观察者模式的实现能力以及一系列重要的JS知识点，具有较强的综合性和代表性。

### 2.2 组成部分
在 Vue.js 数据双向绑定的实现逻辑中，包含三个关键角色：

- observer（监听器）：这里的 observer 不仅是订阅者（**需要监听数据变化**），同时还是发布者（**对监听的数据进行转发**）。
- watcher（订阅者）：watcher对象是**真正的订阅者， **observer 把数据转发给 watcher 对象。watcher 接收到新的数据后，执行视图更新。
- compile（编译器）：MVVM 框架特有的角色，负责对每个节点元素指令进行扫描和解析，处理指令的数据初始化、订阅者的创建等操作。

这三者的配合过程如图所示：
![组成部分](http://images.pingan8787.com/DesignPattern/observer-watcher.png)
图片来自：掘金小册《JavaScript 设计模式核⼼原理与应⽤实践》

### 2.3 实现核心代码 observer
首先我们需要实现一个方法，这个方法会对需要监听的数据对象进行遍历、给它的属性加上定制的 `getter` 和 `setter` 函数。这样但凡这个对象的某个属性发生了改变，就会触发 `setter` 函数，进而通知到订阅者。这个 `setter` 函数，就是我们的监听器：
```javascript
// observe方法遍历并包装对象属性
function observe(target) {
    // 若target是一个对象，则遍历它
    if(target && typeof target === 'object') {
        Object.keys(target).forEach((key)=> {
            // defineReactive方法会给目标属性装上“监听器”
            defineReactive(target, key, target[key])
        })
    }
}
// 定义defineReactive方法
function defineReactive(target, key, val) {
    // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
    observe(val)
    // 为当前属性安装监听器
    Object.defineProperty(target, key, {
         // 可枚举
        enumerable: true,
        // 不可配置
        configurable: false, 
        get: function () {
            return val;
        },
        // 监听器函数
        set: function (value) {
            console.log(`${target}属性的${key}属性从${val}值变成了了${value}`)
            val = value
        }
    });
}
```

下面实现订阅者 `Dep`：
```javascript
// 定义订阅者类Dep
class Dep {
    constructor() {
        // 初始化订阅队列
        this.subs = []
    }
    
    // 增加订阅者
    addSub(sub) {
        this.subs.push(sub)
    }
    
    // 通知订阅者（是不是所有的代码都似曾相识？）
    notify() {
        this.subs.forEach((sub)=>{
            sub.update()
        })
    }
}
```


现在我们可以改写 `defineReactive` 中的 `setter` 方法，在监听器里去通知订阅者了：
```javascript
function defineReactive(target, key, val) {
    const dep = new Dep()
    // 监听当前属性
    observe(val)
    Object.defineProperty(target, key, {
        set: (value) => {
            // 通知所有订阅者
            dep.notify()
        }
    })
}
```

# 五、总结
观察者模式又称发布-订阅模式、模型-视图模式、源-监听器模式或从属者模式。是一种**对象行为型模式**。其定义了一种**对象间的一对多依赖关系**，当观察目标发生状态变化，会通知所有观察者对象，使它们自动更新。

在实际业务中，如果一个对象的行为**依赖于**另一个对象的状态。或者说当**目标对象**的状态发生改变时，会直接影响到**观察者**的行为，尽量考虑到使用观察者模式来实现。

# 六、拓展
观察者模式和发布-订阅模式两者很像，但其实区别比较大。例如：

- 耦合度差异：观察者模式的耦合度就比发布-订阅模式要高；
- 关注点不同：观察者模式需要知道彼此的存在，而发布-订阅模式则是通过调度中心来联系发布/订阅者。

下一篇文章见。

# 参考文章
1.[《3. 观察者模式》](https://design-patterns.readthedocs.io/zh_CN/latest/behavioral_patterns/observer.html)
2.[《TypeScript 设计模式之观察者模式》](semlinker.com/ts-observer-pattern/) 
3.[《JavaScript 设计模式核⼼原理与应⽤实践》](https://juejin.im/book/6844733790204461070)
