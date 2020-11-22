> React 是一个 Facebook 开源的，用于构建用户界面的 JavaScript 库。

React 目的在于解决：构建随着时间数据不断变化的大规模应用程序。
其中 React 合成事件是较为重要的知识点，阅读完本文，你将收获：

1. 合成事件的概念和作用；
1. 合成事件与原生事件的 3 个区别；
1. 合成事件与原生事件的执行顺序；
1. 合成事件的事件池；
1. 合成事件 4 个常见问题。


接下来和我一起开始学习吧~

## 一、概念介绍

React 合成事件（SyntheticEvent）是 React **模拟原生 DOM 事件所有能力的一个事件对象**，即浏览器原生事件的跨浏览器包装器。它根据 [W3C 规范](https://www.w3.org/TR/DOM-Level-3-Events/) 来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口。
看个简单示例：

```jsx
const button = <button onClick={handleClick}>Leo 按钮</button>
```

在 React 中，所有事件都是合成的，不是原生 DOM 事件，但可以通过 `e.nativeEvent` 属性获取 DOM 事件。

```jsx
const handleClick = (e) => console.log(e.nativeEvent);;
const button = <button onClick={handleClick}>Leo 按钮</button>
```


学习一个新知识的时候，一定要知道为什么会出现这个技术。
那么 React 为什么使用合成事件？其主要有三个目的：

1. 进行浏览器兼容，实现更好的跨平台

React 采用的是顶层事件代理机制，能够保证冒泡一致性，可以跨浏览器执行。React 提供的合成事件用来抹平不同浏览器事件对象之间的差异，将不同平台事件模拟合成事件。


2. 避免垃圾回收

事件对象可能会被频繁创建和回收，因此 React 引入**事件池**，在事件池中获取或释放事件对象。**即 React 事件对象不会被释放掉，而是存放进一个数组中，当事件触发，就从这个数组中弹出，避免频繁地去创建和销毁(垃圾回收)**。


3. 方便事件统一管理和事务机制



> 本文不介绍源码啦，对具体实现的源码有兴趣的朋友可以查阅：[《React SyntheticEvent》](https://github.com/facebook/react/blob/75ab53b9e1de662121e68dabb010655943d28d11/packages/events/SyntheticEvent.js#L62) 。

## 二、原生事件回顾

在开始介绍 React 合成事件之前，我们先简单回顾 JavaScript 原生事件中几个重要知识点：
![Native-Event.png](https://images.pingan8787.com/React/Synthetic-Event/Native-Event.png)

### 1. 事件捕获

当某个元素触发某个事件（如 `onclick` ），顶层对象 `document` 就会发出一个事件流，随着 DOM 树的节点向目标元素节点流去，**直到到达事件真正发生的目标元素**。在这个过程中，事件相应的监听函数是不会被触发的。


### 2. 事件目标

当到达目标元素之后，执行目标元素该事件相应的处理函数。如果没有绑定监听函数，那就不执行。


### 3. 事件冒泡

从目标元素开始，往顶层元素传播。途中如果有节点绑定了相应的事件处理函数，这些函数都会被触发一次。如果想阻止事件起泡，可以使用 `e.stopPropagation()` 或者` e.cancelBubble=true`（IE）来阻止事件的冒泡传播。


### 4. 事件委托/事件代理

简单理解就是**将一个响应事件委托到另一个元素**。
当子节点被点击时，`click` 事件向上冒泡，父节点捕获到事件后，我们判断是否为所需的节点，然后进行处理。其优点在于**减少内存消耗和动态绑定事件**。

## 二、合成事件与原生事件区别

React 事件与原生事件很相似，但不完全相同。这里列举几个常见区别：

### 1. 事件名称命名方式不同

原生事件命名为纯小写（onclick, onblur），而 React 事件命名采用**小驼峰式**（camelCase），如 `onClick` 等：

```jsx
// 原生事件绑定方式
<button onclick="handleClick()">Leo 按钮命名</button>
      
// React 合成事件绑定方式
const button = <button onClick={handleClick}>Leo 按钮命名</button>
```


### 2. 事件处理函数写法不同

原生事件中事件处理函数为字符串，在 React JSX 语法中，传入一个**函数**作为事件处理函数。

```jsx
// 原生事件 事件处理函数写法
<button onclick="handleClick()">Leo 按钮命名</button>
      
// React 合成事件 事件处理函数写法
const button = <button onClick={handleClick}>Leo 按钮命名</button>
```


### 3. 阻止默认行为方式不同

在原生事件中，可以通过返回 `false` 方式来阻止默认行为，但是在 React 中，需要显式使用 `preventDefault()` 方法来阻止。
这里以阻止 `<a>` 标签默认打开新页面为例，介绍两种事件区别：

```jsx
// 原生事件阻止默认行为方式
<a href="https://www.pingan8787.com" 
  onclick="console.log('Leo 阻止原生事件~'); return false"
>
  Leo 阻止原生事件
</a>

// React 事件阻止默认行为方式
const handleClick = e => {
  e.preventDefault();
  console.log('Leo 阻止原生事件~');
}
const clickElement = <a href="https://www.pingan8787.com" onClick={handleClick}>
  Leo 阻止原生事件
</a>
```

### 4. 小结

小结前面几点区别：

|  | 原生事件 | React 事件 |
| --- | :---: | :---: |
| 事件名称命名方式 | 名称全部小写<br/>（onclick, onblur）| 名称采用小驼峰<br/>（onClick, onBlur）|
| 事件处理函数语法 | 字符串 | 函数 |
| 阻止默认行为方式 | 事件返回 `false` | 使用 `e.preventDefault()` 方法 |

![Native-Event-VS-Synthetic-Event.png](https://images.pingan8787.com/React/Synthetic-Event/Native-Event-VS-Synthetic-Event.png)


## 三、React 事件与原生事件执行顺序

在 React 中，“合成事件”会以事件委托（[Event Delegation](https://javascript.info/event-delegation)）方式绑定在组件最上层，并在组件卸载（unmount）阶段自动销毁绑定的事件。这里我们手写一个简单示例来观察 React 事件和原生事件的执行顺序：

```jsx
class App extends React.Component<any, any> {
  parentRef: any;
  childRef: any;
  constructor(props: any) {
    super(props);
    this.parentRef = React.createRef();
    this.childRef = React.createRef();
  }
  componentDidMount() {
    console.log("React componentDidMount！");
    this.parentRef.current?.addEventListener("click", () => {
      console.log("原生事件：父元素 DOM 事件监听！");
    });
    this.childRef.current?.addEventListener("click", () => {
      console.log("原生事件：子元素 DOM 事件监听！");
    });
    document.addEventListener("click", (e) => {
      console.log("原生事件：document DOM 事件监听！");
    });
  }
  parentClickFun = () => {
    console.log("React 事件：父元素事件监听！");
  };
  childClickFun = () => {
    console.log("React 事件：子元素事件监听！");
  };
  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentClickFun}>
        <div ref={this.childRef} onClick={this.childClickFun}>
          分析事件执行顺序
        </div>
      </div>
    );
  }
}
export default App;
```

触发事件后，可以看到控制台输出：

```jsx
原生事件：子元素 DOM 事件监听！ 
原生事件：父元素 DOM 事件监听！ 
React 事件：子元素事件监听！ 
React 事件：父元素事件监听！ 
原生事件：document DOM 事件监听！ 
```

通过上面流程，我们可以理解：

- React 所有事件都挂载在 `document` 对象上；
- 当真实 DOM 元素触发事件，会冒泡到 `document` 对象后，再处理 React 事件；
- 所以会先执行原生事件，然后处理 React 事件；
- 最后真正执行 `document` 上挂载的事件。

![Native-Event-And-Synthetic-Event.png](https://images.pingan8787.com/React/Synthetic-Event/Native-Event-And-Synthetic-Event.png)


## 四、合成事件的事件池**

### 1. 事件池介绍

合成事件对象池，是 React 事件系统提供的一种**性能优化方式**。**合成事件对象在事件池统一管理**，**不同类型的合成事件具有不同的事件池**。

- 当事件池未满时，React 创建新的事件对象，派发给组件。
- 当事件池装满时，React 从事件池中复用事件对象，派发给组件。



关于“事件池是如何工作”的问题，可以看看下面图片：

![Synthetic-Event-Loop.png](https://images.pingan8787.com/React/Synthetic-Event/Synthetic-Event-Loop.png)

（图片来自：ReactDeveloper [https://juejin.cn/post/6844903862285893639](https://juejin.cn/post/6844903862285893639)）


### 2. 事件池分析（React 16 版本）

**React 事件池仅支持在 React 16 及更早版本中，在 React 17 已经不使用事件池**。
下面以 React 16 版本为例：

```jsx
function handleChange(e) {
  console.log("原始数据：", e.target)
  setTimeout(() => {
    console.log("定时任务 e.target：", e.target); // null
    console.log("定时任务：e：", e); 
  }, 100);
}
function App() {
  return (
    <div className="App">
      <button onClick={handleChange}>测试事件池</button>
    </div>
  );
}

export default App;

```

可以看到输出：   
![Synthetic-Event-React16.png](https://images.pingan8787.com/React/Synthetic-Event/Synthetic-Event-React16.png)

在 React 16 及之前的版本，合成事件对象的事件处理函数全部被调用之后，所有属性都会被置为 `null` 。这时，如果我们需要在事件处理函数运行之后获取事件对象的属性，可以使用 React 提供的 `e.persist()` 方法，保留所有属性：

```jsx
// 只修改 handleChange 方法，其他不变
function handleChange(e) {
  // 只增加 persist() 执行
  e.persist();
  
  console.log("原始数据：", e.target)
  setTimeout(() => {
    console.log("定时任务 e.target：", e.target); // null
    console.log("定时任务：e：", e); 
  }, 100);
}
```

再看下结果：

![Synthetic-Event-React17.png](https://images.pingan8787.com/React/Synthetic-Event/Synthetic-Event-React17.png)

### 3. 事件池分析（React 17 版本）

由于 Web 端的 React 17 不使用事件池，所有不会存在上述“所有属性都会被置为 `null`”的问题。

## 五、常见问题

### 1. React 事件中 this 指向问题

在 React 中，JSX 回调函数中的 this 经常会出问题，在 Class 中方法不会默认绑定 this，就会出现下面情况， `this.funName` 值为 `undefined` ：

```jsx
class App extends React.Component<any, any> {
  childClickFun = () => {
    console.log("React 事件");
  };
  clickFun() {
    console.log("React this 指向问题", this.childClickFun); // undefined
  }
  render() {
    return (
        <div onClick={this.clickFun}>React this 指向问题</div>
    );
  }
}
export default App;
```

我们有 2 种方式解决这个问题：

1. 使用 `bind` 方法绑定 `this` ：

```jsx
class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.clickFun = this.clickFun.bind(this);
  }
  
  // 省略其他代码
}
export default App;
```

2. 将需要使用 `this` 的方法改写为使用**箭头函数**定义：

```jsx
class App extends React.Component<any, any> {
  clickFun = () => {
    console.log("React this 指向问题", this.childClickFun); // undefined
  }
  
  // 省略其他代码
}
export default App;
```

或者在回调函数中使用**箭头函数**：

```jsx
class App extends React.Component<any, any> {
  // 省略其他代码
  clickFun() {
    console.log("React this 指向问题", this.childClickFun); // undefined
  }
  render() {
    return (
        <div onClick={() => this.clickFun()}>React this 指向问题</div>
    );
  }
}
export default App;
```

### 2. 向事件传递参数问题

经常在遍历列表时，需要向事件传递额外参数，如 `id` 等，来指定需要操作的数据，在 React 中，可以使用 2 种方式向事件传参：

```jsx
const List = [1,2,3,4];
class App extends React.Component<any, any> {
  // 省略其他代码
  clickFun (id) {console.log('当前点击：', id)}
  render() {
    return (
        <div>
        	<h1>第一种：通过 bind 绑定 this 传参</h1>
        	{
          	List.map(item => <div onClick={this.clickFun.bind(this, item)}>按钮：{item}</div>)
          }
        	<h1>第二种：通过箭头函数绑定 this 传参</h1>
        	{
          	List.map(item => <div onClick={() => this.clickFun(item)}>按钮：{item}</div>)
          }
        </div>
    );
  }
}
export default App;
```

这两种方式是等价的：

- 第一种通过 `Function.prototype.bind` 实现；
- 第二种通过**箭头函数**实现。

### 3. 合成事件阻止冒泡

官网文档描述了：

> 从 v0.14 开始，事件处理器返回 false 时，不再阻止事件传递。你可以酌情手动调用 e.stopPropagation() 或 e.preventDefault() 作为替代方案。

也就是说，在 React 合成事件中，需要阻止冒泡时，可以使用 `e.stopPropagation()` 或 `e.preventDefault()`  方法来解决，另外还可以使用 [`e.nativeEvent.stopImmediatePropagation()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation) 方法解决。


#### 3.1 e.stopPropagation

对于开发者来说，更希望使用 `e.stopPropagation()` 方法来阻止当前 DOM 事件冒泡，但事实上，从前两节介绍的执行顺序可知，`e.stopPropagation()` 只能阻止合成事件间冒泡，即下层的合成事件，不会冒泡到上层的合成事件。事件本身还都是在 document 上执行。所以**最多只能阻止 document 事件不能再冒泡到 window 上。**

```typescript
class App extends React.Component<any, any> {
  parentRef: any;
  childRef: any;
  constructor(props: any) {
    super(props);
    this.parentRef = React.createRef();
  }
  componentDidMount() {
    this.parentRef.current?.addEventListener("click", () => {
      console.log("阻止原生事件冒泡~");
    });
    document.addEventListener("click", (e) => {
      console.log("原生事件：document DOM 事件监听！");
    });
  }
  parentClickFun = (e: any) => {
    e.stopPropagation();
    console.log("阻止合成事件冒泡~");
  };
  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentClickFun}>
        点击测试“合成事件和原生事件是否可以混用”
      </div>
    );
  }
}
export default App;
```

输出结果：

```typescript
阻止原生事件冒泡~ 
阻止合成事件冒泡~ 
```

#### 3.2 e.nativeEvent.stopImmediatePropagation

该方法可以**阻止监听同一事件的其他事件监听器被调用**。
在 React 中，一个组件只能绑定一个同类型的事件监听器，当重复定义时，后面的监听器会覆盖之前的。
事实上 nativeEvent 的 `stopImmediatePropagation`只能阻止绑定在 document 上的事件监听器。而合成事件上的 [`e.nativeEvent.stopImmediatePropagation()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation)  能**阻止合成事件不会冒泡到 document 上**。


举一个实际案例：实现点击空白处关闭菜单的功能：
当菜单打开时，在 document 上动态注册事件，用来关闭菜单。

- 点击菜单内部，由于不冒泡，会正常执行菜单点击。
- 点击菜单外部，执行document上事件，关闭菜单。

在菜单关闭的一刻，在 document 上移除该事件，这样就不会重复执行该事件，浪费性能，也可以在 window 上注册事件，这样可以避开 document。
**

### 4. 合成事件和原生事件是否可以混用

**合成事件和原生事件最好不要混用**。
原生事件中如果执行了`stopPropagation`方法，则会导致其他`React`事件失效。因为所有元素的事件将无法冒泡到`document`上。
通过前面介绍的两者事件执行顺序来看，所有的 React 事件都将无法被注册。通过代码一起看看：

```typescript
class App extends React.Component<any, any> {
  parentRef: any;
  childRef: any;
  constructor(props: any) {
    super(props);
    this.parentRef = React.createRef();
  }
  componentDidMount() {
    this.parentRef.current?.addEventListener("click", (e: any) => {
    	e.stopPropagation();
      console.log("阻止原生事件冒泡~");
    });
    document.addEventListener("click", (e) => {
      console.log("原生事件：document DOM 事件监听！");
    });
  }
  parentClickFun = (e: any) => {
    console.log("阻止合成事件冒泡~");
  };
  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentClickFun}>
        点击测试“合成事件和原生事件是否可以混用”
      </div>
    );
  }
}
export default App;
```

输出结果：

```typescript
阻止原生事件冒泡~ 
```


好了，本文就写到这里，建议大家可以再回去看下官方文档[《合成事件》](https://zh-hans.reactjs.org/docs/events.html)[《事件处理》](https://zh-hans.reactjs.org/docs/handling-events.html)章节理解，有兴趣的朋友也可以阅读源码[《React SyntheticEvent.js》](https://github.com/facebook/react/blob/75ab53b9e1de662121e68dabb010655943d28d11/packages/events/SyntheticEvent.js#L62)。

## 总结

最后在回顾下本文学习目标：

1. 合成事件的概念和作用；
1. 合成事件与原生事件的 3 个区别；
1. 合成事件与原生事件的执行顺序；
1. 合成事件的事件池；
1. 合成事件 4 个常见问题。

你是否都清楚了？欢迎一起讨论学习。


## 参考文章

1.[《事件处理与合成事件（react）》](https://juejin.im/post/6844904099004022797)  
2.官方文档[《合成事件》](https://zh-hans.reactjs.org/docs/events.html)[《事件处理》](https://zh-hans.reactjs.org/docs/handling-events.html)  
3.[《React合成事件和DOM原生事件混用须知》](https://juejin.cn/post/6844903502729183239)  
4.[《React 合成事件系统之事件池》](https://www.bilibili.com/read/cv2836048/)  