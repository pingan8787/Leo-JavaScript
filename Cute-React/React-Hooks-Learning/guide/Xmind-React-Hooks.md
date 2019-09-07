# React-Hooks

## 一、介绍和作用

### 1.来源

2018年底由 FaceBook 的 React 小组推出。

### 2.作用

React Hooks 使用函数形式替换原来继承类的形式。

### 3.官方介绍

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

### 4.API

基础 Hook

* `useState`
* `useEffect`
* `useContext`

额外的 Hook

* `useReducer`
* `useCallback`
* `useMemo`
* `useRef`
* `useImperativeHandle`
* `useLayoutEffect`
* `useDebugValue`

### 5.需要记住

React Hook 是完全可选（v16.8.0以后，可在已有代码直接使用），并且是完全向后兼容。

## 二、useState

### 1.作用

用来声明状态变量

### 2.参数

接收的参数是状态的初始值

### 3.返回值

返回一个数组

第一个值是当前状态

第二个值是修改当前状态的方法

### 4.使用

导入：`import React, { useState } from 'react';`

声明：`const [ count , setCount ] = useState(0);`

读取：`<p>You clicked {count} times</p>`

修改：`<button onClick={()=>{setCount(count+1)}}>click</button>`

### 5.注意

所有 `React Hooks` 不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序。

## 三、useEffect

### 1.作用

将原来生命周期的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 进行合并。

**副作用**：和函数业务主逻辑关联不大，特定时间或事件中执行的动作，比如`Ajax`请求后端数据，添加登录监听和取消登录，手动修改`DOM`等等。

### 2.参数

* 第一个参数是一个**方法**，即当首次加载或之后每次渲染时，需要执行的操作。

可以在函数中返回一个方法，对组件进行解绑

* 第二个参数是一个**数组**，保存状态值的变量，用来对状态值进行解绑。

当为空数组 `[]` 时，表示当组件将被销毁时才解绑 ，类似`componentWillUnmount`

### 3.使用

导入：`import React, { useState ,useEffect } from 'react';`

使用：  

```js
useEffect(() => { 
   document.title = `hello`; 
});
```

使用参数：
```js
useEffect(() => { 
   document.title = `hello`; 
 }, [ ]);
```

### 4.注意

React首次渲染和之后的每次渲染都会调用一遍 `useEffect` 函数

`useEffect` 中定义的函数的执行不会阻碍浏览器更新视图，异步执行

## 四、useContext

### 1.作用

让父子组件传值更简单   

跨越组件层级直接传递变量，实现共享   

### 2.使用

导入：`import React, { useState , createContext, useContext } from 'react';`

创建：`const CountContext = createContext()`

父组件使用： 

```js
<CountContext.Provider value={count}>
  <Counter />
</CountContext.Provider>
```

使用 `CountContext.Provider` 标签，将需要使用到上下文的组件包裹在里面

`CountContext.Provider` 的 `value` 属性，用来传递参数

子组件使用：`let count = useContext(CountContext)`

### 3.注意

接收一个 `context` 对象（`React.createContext` 的返回值）并返回该 `context` 的当前值。
当前的 `context` 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` `prop` 决定。

`useContext` 的参数必须是 `context` 对象本身

调用了 `useContext` 的组件总会在 `context` 值变化时重新渲染。

## 五、useReducer

### 1.作用

`useState` 的替代方案，在某些场景下，`useReducer `会比 `useState` 更适用。

### 2.参数

* 第一个参数是一个 `reducer` 方法

接收一个形如` (state, action) => newState` 的` reducer`，并返回当前的 `state` 以及与其配套的 `dispatch` 方法。

* 第二个参数是一个对象

接收一个对象，作为初始化的参数

* 第三个参数是可选参数

 `init` 函数用来作为惰性初始`state`

### 3.使用

使用：`const [state, dispatch] = useReducer(reducer, initialArg, init);`

实现 `reducer`：根据不同`action`，设置不同 `state` 的值

使用 `dispatch`：`<button onClick={() => dispatch({type: 'decrement'})}>-</button>`

### 4.注意

`React` `会确保 dispatch` 函数的标识是稳定的，并且不会在组件重新渲染时改变。

如果 `Reducer Hook` 的返回值与当前 `state` 相同，`React` 将跳过子组件的渲染及副作用的执行。

## 六、useMemo

### 1.作用

`useMemo` 主要用来解决使用 `React hooks` 产生的无用渲染的性能问题。

返回一个 `memoized` 值。

### 2.参数

第一个参数，接收一个函数

第二个参数，接收一个依赖项数组，当某个依赖项改变时，才会重新计算，如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。

### 3.使用

`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`

### 4.注意

传入 `useMemo `的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作

可以把 `useMemo` 作为性能优化的手段，但不要把它当成语义上的保证。

## 七、useRef

### 1.作用

用 `useRef` 获取 `React JSX` 中的 `DOM` 元素

`useRef` 返回一个可变的 `ref` 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。

返回的 `ref` 对象在组件的整个生命周期内保持不变。

### 2.使用

```js
const inputEl = useRef(null);

<input ref={inputEl} type="text" />
```

### 3.注意

当 `ref` 对象内容发生变化时，`useRef` 并不会通知你。变更 `.current` 属性不会引发组件重新渲染。

如果想要在 `React` 绑定或解绑 `DOM `节点的 `ref` 时运行某些代码，则需要使用回调 `ref` 来实现。

## 八、自定义 Hooks 函数

### 1.创建

自定义 `Hook` 是一个函数，其名称以 “`use`” 开头，函数内部可以调用其他的 `Hook`。

如 `useWinSize`

### 2.使用

使用自定义的 Hooks：`const size = useWinSize()`

### 3.注意

自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性。

* 在两个组件中使用相同的 Hook 会共享 state 吗？不会。

自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，
所以每次使用自定义 Hook 时，其中的所有 `state` 和副作用都是完全隔离的。

* 自定义 Hook 如何获取独立的 state？

每次调用 Hook，它都会获取独立的 state。
由于我们直接调用了 `useFriendStatus`，从 React 的角度来看，
我们的组件只是调用了 `useState` 和 `useEffect`。 
