# 前言
在之前两篇自测清单中，和大家分享了很多 JavaScript 基础知识，大家可以一起再回顾下~

本文是我在我们团队内部“**现代 JavaScript 突击队**”分享的一篇内容，第二期学习内容为“**设计模式**”系列，我会将我负责分享的知识整理成文章输出，希望能够和大家一起温故知新！

“**现代 JavaScript 突击队**”学习总结：

1. [《初中级前端 JavaScript 自测清单 - 1》](https://juejin.im/post/6846687584710557710)
2. [《初中级前端 JavaScript 自测清单 - 2》](https://juejin.im/post/6857037330113363982)
3. [《TypeScript 设计模式之观察者模式》](https://juejin.im/post/6862112623417098248)
4. [《TypeScript语法总结+项目(Vue.js+TS)实战》](https://juejin.im/post/6861525441786675208)

# 2.发布-订阅模式 2020.08.14

# 一、模式介绍

## 1. 生活场景
最近刚毕业的学生 Leo 准备开始租房了，他来到房产中介，跟中介描述了自己的租房需求，开开心心回家了。第二天，中介的小哥哥小姐姐为 Leo 列出符他需求的房间，并打电话约他一起看房了，最后 Leo 选中一套满意的房间，高高兴兴过去签合同，准备开始新生活~

还有个大佬 Paul，准备将手中 10 套房出租出去，于是他来到房产中介，在中介那边提供了自己要出租的房间信息，沟通好手续费，开开心心回家了。第二天，Paul 接到中介的好消息，房子租出去了，于是他高高兴兴过去签合同，开始收房租了~

![发布-订阅模式（简介）.png](http://images.pingan8787.com/DesignPattern/PubSubPattern/pub-sub-desc.png)

上面场景有个需要特别注意的地方：

- 租户在租房过程中，不知道房间具体房东是谁，到后面签合同才知道；
- 房东在出租过程中，不知道房间具体租户是谁，到后面签合同才知道；

这两点其实就是后面要介绍的 **发布-订阅模式** 的一个核心特点。

## 2. 概念介绍
在[软件架构](https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6%E6%9E%B6%E6%9E%84)中，发布-订阅模式是一种[消息](https://zh.wikipedia.org/wiki/%E6%B6%88%E6%81%AF)[范式](https://zh.wikipedia.org/wiki/%E8%8C%83%E5%BC%8F)，消息的发送者（称为发布者）**不会将消息直接发送给特定的接收者**（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者（如果有的话）存在。

发布-订阅是[消息队列](https://zh.wikipedia.org/wiki/%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97)范式的兄弟，通常是更大的[面向消息中间件](https://zh.wikipedia.org/w/index.php?title=%E9%9D%A2%E5%90%91%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6&action=edit&redlink=1)系统的一部分。大多数消息系统在[API](https://zh.wikipedia.org/wiki/%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E6%8E%A5%E5%8F%A3)中同时支持消息队列模型和发布/订阅模型，例如[Java消息服务](https://zh.wikipedia.org/wiki/Java%E6%B6%88%E6%81%AF%E6%9C%8D%E5%8A%A1)（JMS）。

这种模式提供了更大的网络[可扩展性](https://zh.wikipedia.org/wiki/%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7)和更动态的[网络拓扑](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E6%8B%93%E6%89%91)，同时也降低了对发布者和发布数据的结构修改的灵活性。

# 二、 观察者模式 vs 发布-订阅模式
看完上面概念，有没有觉得与观察者模式很像？
但其实两者还是有差异的，接下来一起看看。

## 1. 概念对比
我们分别为通过两种实际生活场景来介绍这两种模式：

- **观察者模式**：如微信中 **顾客-微商** 关系；
- **发布-订阅模式**：如淘宝购物中 **顾客-淘宝-商家** 关系。

这两种场景的过程分别是这样：

### 1.1 观察者模式
![观察者模式（微商与顾客）.png](http://images.pingan8787.com/DesignPattern/PubSubPattern/observer-desc.png)
**观察者模式**中，消费顾客关注（如加微信好友）自己有兴趣的微商，微商就会私聊发自己在卖的产品给消费顾客。
这个过程中，消费顾客相当于观察者（Observer），微商相当于观察目标（Subject）。

### 1.2 发布-订阅模式
接下来看看 **发布-订阅模式** ：

![发布-订阅模式（淘宝与顾客） .png](http://images.pingan8787.com/DesignPattern/PubSubPattern/pub-sub-demo1.png)
在 **发布-订阅模式** 中，消费顾客通过淘宝搜索自己关注的产品，商家通过淘宝发布商品，当消费顾客在淘宝搜索的产品，已经有商家发布，则淘宝会将对应商品推荐给消费顾客。
这个过程中，消费顾客相当于订阅者，淘宝相当于事件总线，商家相当于发布者。

## 2. 流程对比
![观察者模式和发布-订阅模式区别（流程图）.png](http://images.pingan8787.com/DesignPattern/PubSubPattern/pub-sub.png)

## 3. 小结
所以可以看出，**观察者模式**和**发布-订阅模式**差别在于**有没有一个中央的事件总线**。如果有，我们就可以认为这是个**发布-订阅模式**。如果没有，那么就可以认为是**观察者模式**。因为其实它们都实现了一个关键的功能：**发布事件-订阅事件并触发事件**。

# 三、模式特点
对比完**观察者模式**和**发布-订阅模式**后，我们大致理解**发布-订阅模式**是什么了。接着总结下该模式的特点：

## 1. 模式组成
在发布-订阅模式中，通常包含以下角色：

- **发布者：Publisher**
- **事件总线：Event Channel**
- **订阅者：Subscriber**

## 2. UML 类图
![发布-订阅模式（UML）.jpg](http://images.pingan8787.com/DesignPattern/PubSubPattern/pub-sub-uml.jpg)

## 3. 优点

1. 松耦合（Independence）

**发布-订阅模式**可以将众多需要通信的子系统(Subsystem)解耦，每个子系统独立管理。而且即使部分子系统取消订阅，也不会影响**事件总线**的整体管理。
**发布-订阅模式**中每个应用程序都可以专注于其核心功能，而**事件总线**负责将消息路由到每个**订阅者**手里。

2. 高伸缩性（Scalability）

**发布-订阅模式**增加了系统的可伸缩性，提高了发布者的响应能力。原因是**发布者**(Publisher)可以快速地向输入通道发送一条消息，然后返回到其核心处理职责，而不必等待子系统处理完成。然后**事件总线**负责确保把消息传递到每个**订阅者**(Subscriber)手里。

3. 高可靠性（Reliability）

**发布-订阅模式**提高了可靠性。异步的消息传递有助于应用程序在增加的负载下继续平稳运行，并且可以更有效地处理间歇性故障。

4. 灵活性（Flexibility）

你不需要关心不同的组件是如何组合在一起的，只要他们共同遵守一份协议即可。
**发布-订阅模式**允许延迟处理或者按计划的处理。例如当系统负载大的时候，订阅者可以等到非高峰时间才接收消息，或者根据特定的计划处理消息。

## 4. 缺点**

1. 在创建订阅者本身会消耗内存，但当订阅消息后，没有进行发布，而订阅者会一直保存在内存中，占用内存；
1. 创建订阅者需要消耗一定的时间和内存。如果过度使用的话，反而使代码不好理解及代码不好维护。

# 四、使用场景
如果我们项目中很少使用到订阅者，或者与子系统实时交互较少，则不适合 **发布-订阅模式** 。
在以下情况下可以考虑使用此模式：

1. 应用程序需要**向大量消费者广播信息**。例如微信订阅号就是一个消费者量庞大的广播平台。
1. 应用程序需要与一个或多个独立开发的应用程序或服务**通信**，这些应用程序或服务可能使用不同的平台、编程语言和通信协议。
1. 应用程序可以向消费者发送信息，而不需要消费者的实时响应。

# 五、实战示例

## 1. 简单示例

1. 定义**发布者接口**（Publisher）、**事件总线接口**（EventChannel）和**订阅者接口**（Subscriber）：
```typescript
interface Publisher<T> {
  subscriber: string;
  data: T;
}

interface EventChannel<T>  {
  on  : (subscriber: string, callback: () => void) => void;
  off : (subscriber: string, callback: () => void) => void;
  emit: (subscriber: string, data: T) => void;
}

interface Subscriber {
  subscriber: string;
  callback: () => void;
}

// 方便后面使用
interface PublishData {
  [key: string]: string;
}
```

2. 实现**具体发布者类**（ConcretePublisher）：
```typescript
class ConcretePublisher<T> implements Publisher<T> {
  public subscriber: string = "";
  public data: T; 
  constructor(subscriber: string, data: T) {
    this.subscriber = subscriber;
    this.data = data;
  }
}
```

3. 实现**具体事件总线类**（ConcreteEventChannel）：
```typescript
class ConcreteEventChannel<T> implements EventChannel<T> {
  // 初始化订阅者对象
  private subjects: { [key: string]: Function[] } = {};

  // 实现添加订阅事件
  public on(subscriber: string, callback: () => void): void {
    console.log(`收到订阅信息，订阅事件：${subscriber}`);
    if (!this.subjects[subscriber]) {
      this.subjects[subscriber] = [];
    }
    this.subjects[subscriber].push(callback);
  };

  // 实现取消订阅事件
  public off(subscriber: string, callback: () => void): void {
    console.log(`收到取消订阅请求，需要取消的订阅事件：${subscriber}`);
    if (callback === null) {
      this.subjects[subscriber] = [];
    } else {
      const index: number = this.subjects[subscriber].indexOf(callback);
      ~index && this.subjects[subscriber].splice(index, 1);
    }
  };
  
  // 实现发布订阅事件
  public emit (subscriber: string, data: T): void {
    console.log(`收到发布者信息，执行订阅事件：${subscriber}`);
    this.subjects[subscriber].forEach(item => item(data));
  };
}
```

4. 实现**具体订阅者类**（ConcreteSubscriber）：
```typescript
class ConcreteSubscriber implements Subscriber {
  public subscriber: string = "";
  constructor(subscriber: string, callback: () => void) {
    this.subscriber = subscriber;
    this.callback = callback;
  }
  public callback(): void { };
}
```

5. 运行示例代码：
```typescript
interface Publisher<T> {
  subscriber: string;
  data: T;
}

interface EventChannel<T>  {
  on  : (subscriber: string, callback: () => void) => void;
  off : (subscriber: string, callback: () => void) => void;
  emit: (subscriber: string, data: T) => void;
}

interface Subscriber {
  subscriber: string;
  callback: () => void;
}

interface PublishData {
  [key: string]: string;
}

class ConcreteEventChannel<T> implements EventChannel<T> {
  // 初始化订阅者对象
  private subjects: { [key: string]: Function[] } = {};

  // 实现添加订阅事件
  public on(subscriber: string, callback: () => void): void {
    console.log(`收到订阅信息，订阅事件：${subscriber}`);
    if (!this.subjects[subscriber]) {
      this.subjects[subscriber] = [];
    }
    this.subjects[subscriber].push(callback);
  };

  // 实现取消订阅事件
  public off(subscriber: string, callback: () => void): void {
    console.log(`收到取消订阅请求，需要取消的订阅事件：${subscriber}`);
    if (callback === null) {
      this.subjects[subscriber] = [];
    } else {
      const index: number = this.subjects[subscriber].indexOf(callback);
      ~index && this.subjects[subscriber].splice(index, 1);
    }
  };
  
  // 实现发布订阅事件
  public emit (subscriber: string, data: T): void {
    console.log(`收到发布者信息，执行订阅事件：${subscriber}`);
    this.subjects[subscriber].forEach(item => item(data));
  };
}

class ConcretePublisher<T> implements Publisher<T> {
  public subscriber: string = "";
  public data: T; 
  constructor(subscriber: string, data: T) {
    this.subscriber = subscriber;
    this.data = data;
  }
}

class ConcreteSubscriber implements Subscriber {
  public subscriber: string = "";
  constructor(subscriber: string, callback: () => void) {
    this.subscriber = subscriber;
    this.callback = callback;
  }
  public callback(): void { };
}


/* 运行示例 */
const pingan8787 = new ConcreteSubscriber(
  "running",
  () => { 
    console.log("订阅者 pingan8787 订阅事件成功！执行回调~");
  }
);

const leo = new ConcreteSubscriber(
  "swimming",
  () => { 
    console.log("订阅者 leo 订阅事件成功！执行回调~");
  }
);

const lisa = new ConcreteSubscriber(
  "swimming",
  () => { 
    console.log("订阅者 lisa 订阅事件成功！执行回调~");
  }
);

const pual = new ConcretePublisher<PublishData>(
  "swimming",
  {message: "pual 发布消息~"}
);

const eventBus = new ConcreteEventChannel<PublishData>();
eventBus.on(pingan8787.subscriber, pingan8787.callback);
eventBus.on(leo.subscriber, leo.callback);
eventBus.on(lisa.subscriber, lisa.callback);

// 发布者 pual 发布 "swimming"相关的事件
eventBus.emit(pual.subscriber, pual.data); 
eventBus.off (lisa.subscriber, lisa.callback);
eventBus.emit(pual.subscriber, pual.data);

/*
输出结果：
[LOG]: 收到订阅信息，订阅事件：running
[LOG]: 收到订阅信息，订阅事件：swimming
[LOG]: 收到订阅信息，订阅事件：swimming
[LOG]: 收到发布者信息，执行订阅事件：swimming 
[LOG]: 订阅者 leo 订阅事件成功！执行回调~ 
[LOG]: 订阅者 lisa 订阅事件成功！执行回调~ 
[LOG]: 收到取消订阅请求，需要取消的订阅事件：swimming 
[LOG]: 收到发布者信息，执行订阅事件：swimming 
[LOG]: 订阅者 leo 订阅事件成功！执行回调~ 
*/
```
完整代码如下：
```typescript
interface Publisher {
  subscriber: string;
  data: any;
}

interface EventChannel {
  on  : (subscriber: string, callback: () => void) => void;
  off : (subscriber: string, callback: () => void) => void;
  emit: (subscriber: string, data: any) => void;
}

interface Subscriber {
  subscriber: string;
  callback: () => void;
}

class ConcreteEventChannel implements EventChannel {
  // 初始化订阅者对象
  private subjects: { [key: string]: Function[] } = {};

  // 实现添加订阅事件
  public on(subscriber: string, callback: () => void): void {
    console.log(`收到订阅信息，订阅事件：${subscriber}`);
    if (!this.subjects[subscriber]) {
      this.subjects[subscriber] = [];
    }
    this.subjects[subscriber].push(callback);
  };

  // 实现取消订阅事件
  public off(subscriber: string, callback: () => void): void {
    console.log(`收到取消订阅请求，需要取消的订阅事件：${subscriber}`);
    if (callback === null) {
      this.subjects[subscriber] = [];
    } else {
      const index: number = this.subjects[subscriber].indexOf(callback);
      ~index && this.subjects[subscriber].splice(index, 1);
    }
  };
  
  // 实现发布订阅事件
  public emit (subscriber: string, data = null): void {
    console.log(`收到发布者信息，执行订阅事件：${subscriber}`);
    this.subjects[subscriber].forEach(item => item(data));
  };
}

class ConcretePublisher implements Publisher {
  public subscriber: string = "";
  public data: any; 
  constructor(subscriber: string, data: any) {
    this.subscriber = subscriber;
    this.data = data;
  }
}

class ConcreteSubscriber implements Subscriber {
  public subscriber: string = "";
  constructor(subscriber: string, callback: () => void) {
    this.subscriber = subscriber;
    this.callback = callback;
  }
  public callback(): void { };
}


/* 运行示例 */
const pingan8787 = new ConcreteSubscriber(
  "running",
  () => { 
    console.log("订阅者 pingan8787 订阅事件成功！执行回调~");
  }
);

const leo = new ConcreteSubscriber(
  "swimming",
  () => { 
    console.log("订阅者 leo 订阅事件成功！执行回调~");
  }
);

const lisa = new ConcreteSubscriber(
  "swimming",
  () => { 
    console.log("订阅者 lisa 订阅事件成功！执行回调~");
  }
);

const pual = new ConcretePublisher(
  "swimming",
  {message: "pual 发布消息~"}
);

const eventBus = new ConcreteEventChannel();
eventBus.on(pingan8787.subscriber, pingan8787.callback);
eventBus.on(leo.subscriber, leo.callback);
eventBus.on(lisa.subscriber, lisa.callback);

// 发布者 pual 发布 "swimming"相关的事件
eventBus.emit(pual.subscriber, pual.data); 
eventBus.off (lisa.subscriber, lisa.callback);
eventBus.emit(pual.subscriber, pual.data);

/*
输出结果：
[LOG]: 收到订阅信息，订阅事件：running
[LOG]: 收到订阅信息，订阅事件：swimming
[LOG]: 收到订阅信息，订阅事件：swimming
[LOG]: 收到发布者信息，执行订阅事件：swimming 
[LOG]: 订阅者 leo 订阅事件成功！执行回调~ 
[LOG]: 订阅者 lisa 订阅事件成功！执行回调~ 
[LOG]: 收到取消订阅请求，需要取消的订阅事件：swimming 
[LOG]: 收到发布者信息，执行订阅事件：swimming 
[LOG]: 订阅者 leo 订阅事件成功！执行回调~ 
*/
```

## 2. Vue.js 使用示例
参考文章：[《Vue事件总线（EventBus）使用详细介绍》](https://zhuanlan.zhihu.com/p/72777951) 。

### 2.1 创建 event bus
在 Vue.js 中创建 EventBus 有两种方式：

1. 手动实现，导出 Vue 实例化的结果。
```javascript
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue();
```

2. 直接在项目中的 `main.js`全局挂载 Vue 实例化的结果。
```javascript
// main.js
Vue.prototype.$EventBus = new Vue()
```

### 2.2 发送事件
假设你有两个Vue页面需要通信： A 和 B ，A页面按钮上绑定了**点击事件**，发送一则消息，通知 B 页面。
```vue
<!-- A.vue -->
<template>
    <button @click="sendMsg()">-</button>
</template>

<script> 
import { EventBus } from "../event-bus.js";
export default {
  methods: {
    sendMsg() {
      EventBus.$emit("aMsg", '来自A页面的消息');
    }
  }
}; 
</script>
```

### 2.3 接收事件
B 页面中接收消息，并展示内容到页面上。
```vue
<!-- IncrementCount.vue -->
<template>
  <p>{{msg}}</p>
</template>

<script> 
import { 
  EventBus 
} from "../event-bus.js";
export default {
  data(){
    return {
      msg: ''
    }
  },
  mounted() {
    EventBus.$on("aMsg", (msg) => {
      // A发送来的消息
      this.msg = msg;
    });
  }
};
</script>
```
同理可以从 B 页面往 A 页面发送消息，使用下面方法：
```javascript
// 发送消息
EventBus.$emit(channel: string, callback(payload1,…))

// 监听接收消息
EventBus.$on(channel: string, callback(payload1,…))
```

### 2.4 **移除事件监听者**
使用 `EventBus.$off('aMsg')` 来移除应用内所有对此某个事件的监听。或者直接用 `EventBus.$off()` 来移除所有事件频道，不需要添加任何参数 。
```javascript
import { 
  eventBus 
} from './event-bus.js'
EventBus.$off('aMsg', {})
```

# 六、总结
观察者模式和发布-订阅模式的差别在于事件总线，如果有则是发布-订阅模式，反之为观察者模式。所以在实现发布-订阅模式，关键在于实现这个事件总线，在某个特定时间触发某个特定事件，从而触发监听这个特定事件的组件进行相应操作的功能。发布-订阅模式在很多时候非常有用。

# 参考文章
1.[《发布/订阅》](https://zh.wikipedia.org/wiki/发布/订阅) 
2.[《观察者模式VS订阅发布模式》](https://molunerfinn.com/observer-vs-pubsub-pattern/#概述) 