随着 React 越来越受欢迎，React 开发者也越来越多，在开发过程中也遇到各种各样的问题。

本文我将结合自己实际工作经验，总结 11 个 React 开发中常见的一些错误，帮助您避免一些错误的发生。

如果您刚开始使用 React，那建议这篇文章你要好好看一下，如果您已经使用过 React 开发项目，也建议您能查缺补漏一下。

阅读完本文，您将学习如何避免下面这 11 个 React 错误用法：

1. 渲染列表时，不使用 key
2. 直接通过赋值方式修改 state 值
3. 将 state 值直接绑定到 input 标签的 value 属性
4. 执行 setState 后直接使用 state
5. 使用 useState + useEffect 时出现无限循环
6. 忘记在 useEffect 中清理副作用
7. 错误的使用布尔运算符
8. 没有定义组件参数类型
9. 把字符串当做数值传递到组件
10. 没有以大写字母开头的组件名称
11. 错误的为元素绑定事件

## 1. 渲染列表时，不使用 key

### 问题描述

在刚学 React 时，我们会根据文档介绍的方式来渲染一个列表，比如：

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);
```

当渲染以后，控制台会提示警告 ⚠️ `a key should be provided for list items`。

### 解决方法

你只需要按照提示，为每一项添加 `key`属性即可：

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number, index) => <li key={index}>{number}</li>);
```

`key` 帮助 React 识别哪些元素改变了，比如被添加或删除。所以我们需要给数组中的每一个元素设置一个唯一的 `key`值。

### 文档介绍

[React - Basic List Component](https://reactjs.org/docs/lists-and-keys.html#basic-list-component)

## 2. 直接通过赋值方式修改 state 值

### 问题描述

在 React 中，state 是不能直接赋值修改，否则会导致难以修复的问题，比如：

```jsx
updateState = () => {
  this.state.name = "Chris1993";
};
```

此时编辑器会提示警告 ⚠️：

```
Do not mutate state directly. Use setState().
```

### 解决方法

类组件可以通过 `setState()`方法修改，函数组件使用 `useState()`即可：

```jsx
// ClassComponent：use setState()
this.setState({ name: "Chris1993" });

// FunctionConponent：use useState()
const [name, setName] = useState("");
setName("Chris1993");
```

### 文档介绍

[React - State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
[React - Using the State Hook](https://reactjs.org/docs/hooks-state.html)

## 3. 将 state 值直接绑定到 input 标签的 value 属性

### 问题描述

当我们直接将 `state`的值作为参数绑定到 `input`标签的 `value`属性上，我们会发现，无论我们在输入框输入什么内容，输入框内容都不会发生变化。

```jsx
export default function App() {
  const [count, setCount] = useState(0);
  return <input type="text" value={count} />;
}
```

这是因为我们是使用带状态的 state 变量作为默认值赋值给 `<input>`的 `value`，而函数式组件中要修改 `state`的只能通过 `useState` 返回的 `set`方法修改。所以解决的办法也很简单，只要修改的时候使用对于 `set`方法即可。

### 解决方法

只需要为 `<input>`绑定一个 `onChange`事件，通过调用 `setCount`实现修改：

```jsx
export default function App() {
  const [count, setCount] = useState(0);
  const change = (val) => setCount(val.value);
  return <input type="text" value={count} onChange={change} />;
}
```

## 4. 执行 setState 后直接使用 state

### 问题描述

当我们通过 `setState()`修改完数据，马上获取该数据，会出现数据还是旧值的情况：

```jsx
// init state data
this.state = { name: "Chris1993" };

// update state data
this.setState({ name: "Hello Chris1993!" });
console.log(this.state.name); // output: Chris1993
```

我们可能会认为这时候输入的 `this.state.name`应该是 `Hello Chris1993!`，但结果却是 `Chris1993`。
这是因为 `setState()`是异步的，当执行 `setState()`时，会把真正的更新操作放到异步队列中去执行，而接下来要执行的代码（即`console.log`这一行）是同步执行的，所以打印出来的 `state`不是最新值。

### 解决方法

只需要将要执行的后续操作封装成函数，作为 `setState()`第二个参数，该回调函数会在更新完成后执行。

```jsx
this.setState({ name: "Hello Chris1993!" }, () => {
  console.log(this.state.name); // output: Hello Chris1993!
});
```

现在就可以输出正确的内容了。

## 5. 使用 useState + useEffect 时出现无限循环

### 问题描述

当我们在 `useEffect()`中直接调用 `useState()`返回的 `set*()`方法，并且没有设置 `useEffect()`第二个参数时，会发现出现死循环了：

```jsx
export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  });
  return <div className="App">{count}</div>;
}
```

这时可以看到页面上数据一直增加，`useEffect()`被无限调用了，进入死循环状态。

### 解决方法

这是典型的 `useEffect()`使用错误的问题，`useEffect()`可以看做是类组件中`componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个生命周期函数的组合。
`useEffect(effect, deps)`接收 2 个参数：

- `effect`副作用函数；
- `deps`依赖项数组。

当 `deps`数组发生变化，副作用函数 `effect`就会执行。
修改方法只需要在 `useEffect()`第二个参数传入 `[]`即可：

```jsx
export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, []);
  return <div className="App">{count}</div>;
}
```

具体再解释一下 `useEffect` 使用的 4 种情况：

- **第二个参数不传**：任何状态更新，都会触发 `useEffect`的副作用函数。

```jsx
useEffect(() => {
  setCount(count + 1);
});
```

- **第二个参数为空数组**：仅在挂载和卸载的时触发 `useEffect`的副作用函数。

```jsx
useEffect(() => {
  setCount(count + 1);
}, []);
```

- **第二个参数为单值数组**：仅在该值变化，才会触发 `useEffect`的副作用函数。

```jsx
useEffect(() => {
  setCount(count + 1);
}, [name]);
```

- **第二个参数为多值数组**：仅在传入的值发生变化，才会触发 `useEffect`的副作用函数。

```jsx
useEffect(() => {
  setCount(count + 1);
}, [name, age]);
```

## 6. 忘记在 useEffect 中清理副作用

### 问题描述

我们在类组件中，经常使用 `componentWillUnmount()` 生命周期方法去清理一些副作用，比如定时器、事件监听等。

### 解决方法

可以为 `useEffect()`的副作用函数设置返回函数，该函数类似 `componentWillUnmount()` 生命周期方法的作用：

```jsx
useEffect(() => {
  // Other Code
  return () => clearInterval(id);
}, [name, age]);
```

另外，当需要实现`componentWillUnmount` 生命周期函数的效果时，可以在 `useEffect()`函数返回一个函数即可，该函数会在组件卸载时执行：

```jsx
export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
    return () => {
      console.log("[组件已卸载]");
    };
  }, []);
  return <div className="App">{count}</div>;
}
```

### 文档介绍

[React - Example Using Hooks](https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1)

## 7. 错误的使用布尔运算符

### 问题描述

在 JSX/TSX 语法中，我们经常通过布尔值来控制渲染的元素，很多情况我们会使用 `&&`运算符来处理这种逻辑：

```jsx
const count = 0;
const Comp = () => count && <h1>Chris1993</h1>;
```

我们会很自然的以为这时候页面显示的是空内容，但实际却显示了 `0`的内容在上面。

### 解决方法

原因是因为 [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) 表达式会使 `&&` 后面的元素被跳过，但会返回 falsy 表达式的值。所以我们尽量要把判断条件写完整，不依赖 JavaScript 的布尔值真假来比较：

```jsx
const count = 0;
const Comp = () => count > 0 && <h1>Chris1993</h1>;
```

页面就能显示空内容了。

### 文档介绍

[React - Inline If with Logical && Operator](https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator)

## 8. 没有定义组件参数类型

### 问题描述

对于团队开发常见，每个人开发的组件如果没有定义好参数类型，就很容易出现配合的同事不知道如何使用组件，这就很麻烦了，比如：

```jsx
const UserInfo = (props) => {
  return (
    <div>
      {props.name} : {props.age}
    </div>
  );
};
```

### 解决方法

解决方法有

- 使用 TypeScript ，定义组件 `props`类型；

```jsx
// ClassComponent
interface AppProps {
  value: string;
}
interface AppState {
  count: number;
}

class App extends React.Component<AppProps, AppStore> {
  // ...
}

// FunctionComponent
interface AppProps {
  value?: string;
}
const App: React.FC<AppProps> = ({ value = "", children }) => {
  //...
};
```

- 不使用 TypeScript，可以使用 `propTypes`定义 `props`类型；

```jsx
const UserInfo = (props) => {
  return (
    <div>
      {props.name} : {props.age}
    </div>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};
```

## 9. 把字符串当做数值传递到组件

### 问题描述

由于 React 也有模版语法，跟 HTML 非常类似，所以经常出现将数字直接作为 props 传给组件，导致取值判断的时候不符合预期：

```jsx
<MyComp count="99"></MyComp>
```

在 `MyComp`组件中通过 `props.count === 99`就会返回 `false`。

### 解决方法

正确的做法应该是用大括号来传参：

```jsx
<MyComp count={99}></MyComp>
```

## 10. 没有以大写字母开头的组件名称

### 问题描述

对于新手而言，忘记使用大写字母开头作为组件名的问题很常见。在 JSX/TSX 中以小写字母开头的组件会被编译成 HTML 元素，比如 `<div />` 表示 HTML 标签。

```jsx
class myComponent extends React.component {}
```

### 解决方法

只要把首字母改为大写即可：

```jsx
class MyComponent extends React.component {}
```

### 文档介绍

[React - Rendering a Component](https://reactjs.org/docs/components-and-props.html#rendering-a-component)

## 11. 错误的为元素绑定事件

### 问题描述

```jsx
import { Component } from "react";

export default class HelloComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: "Chris1993",
    };
  }

  update() {
    this.setState({ name: "Hello Chris1993!" });
  }
  render() {
    return (
      <div>
        <button onClick={this.update}>update</button>
      </div>
    );
  }
}
```

当点击 `update`按钮时，控制台会报错：

```typescript
Cannot read properties of undefined (reading 'setState')
```

### 解决方法

这是因为 `this`指向问题，解决方法有以下几种：

- 在构造函数中绑定

```jsx
constructor() {
  super();
  this.state = {
    name: "Chris1993"
  };
  this.update = this.update.bind(this);
}
```

- 使用箭头函数

```jsx
update = () => {
  this.setState({ name: "Hello Chris1993!" });
};
```

- 在 render 函数中绑定（不建议，每次组件渲染创建一个新函数，影响性能）

```jsx
<button onClick={this.update.bind(this)}>update</button>
```

- 在 render 函数中使用箭头函数（不建议，每次组件渲染创建一个新函数，影响性能）

```jsx
<button onClick={() => this.update()}>update</button>
```

### 文档介绍

[React - How do I pass an event handler (like onClick) to a component?](https://reactjs.org/docs/faq-functions.html#how-do-i-pass-an-event-handler-like-onclick-to-a-component)

如果您觉得本文不错，欢迎点赞评论关注，您的支持是我分享的最大动力。
