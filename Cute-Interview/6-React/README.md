### 1. React声明周期及自己的理解

### 2. 如何配置React-Router

### 3. Redux如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理

### 4. 介绍Redux数据流的流程

### 5. 介绍Redux，主要解决什么问题

### 6. Redux中间件

### 7. 介绍React优化

### 8. React组件中怎么做事件代理及原理

### 9. React-router怎么实现路由切换

### 10. React-router里的`<Link>`标签和`<a>`标签有什么区别

### 11. Redux中异步的请求怎么处理

### 12. 中间件是怎么拿到store和action，然后怎么处理

### 13. pureComponent和FunctionComponent区别

### 14. 介绍虚拟DOM

### 15. 介绍下React高阶组件，和普通组件有什么区别

### 16. React性能优化

### 17. 介绍Fiber，画Filber渲染树

### 18. React生命周期

### 19. React子父组件之间如何传值

### 20. componentWillReceiveProps的触发条件是什么

### 21. React中setState后发生了什么

### 22. 虚拟DOM本身是什么，主要做了什么

### 23. React常见的通信方式

### 24. React性能优化 / 当调用setState时，React render 是如何工作的？

咱们可以将"render"分为两个步骤：

* **虚拟 DOM 渲染:**当 `render` 方法被调用时，它返回一个新的组件的虚拟 DOM 结构。当调用 `setState() `时， `render` 会被再次调用，因为默认情况下 `shouldComponentUpdate` 总是返回 `true` ，所以默认情况下 React 是没有优化的。
* **原生 DOM 渲染:**React 只会在虚拟 DOM 中修改真实 DOM 节点，而且修改的次数非常少——这是很棒的 React 特性，它优化了真实 DOM 的变化，使 React 变得更快。

### 25. props和state的区别

### 26. 介绍React context

### 27. 重新渲染render会做些什么

### 28. 哪些方法会触发React重新渲染

### 29. setState是同步还是异步

### 30. React 的生命周期方法有哪些？

* `componentWillMount`: 在渲染之前执行，用于根组件中的 App 级配置。   
* `componentDidMount`： 在第一次渲染之后执行，可以在这里做 AJAX 请求，DOM 的操作或状态更新以及设置事件监听器。   
* `componentWillReceiveProps`： 在初始化 `render` 的时候不会执行，它会在组件接受到新的状态( `Props` )时被触发，一般用于父组件状态更新时子组件的重新渲染。   
* `shouldComponentUpdate`： 确定是否更新组件。默认情况下，它返回true。如果确定在 `state` 或 `props` 更新后组件不需要在重新渲染，则可以返回 `false` ，这是一个提高性能的方法。   
* `componentWillUpdate`： 在 `shouldComponentUpdate` 返回 `true` 确定要更新组件之前件之前执行。   
* `componentDidUpdate`： 它主要用于更新 DOM 以响应 `props` 或 `state` 更改。   
* `componentWillUnmount`： 它用于取消任何的网络请求，或删除与组件关联的所有事件监听器。   

### 31. 在使用 ES6 类的 React 中 super() 和 super(props) 有什么区别?

当你想要在 `constructor()` 函数中访问 `this.props`，你需要将 `props` 传递给 `super()` 方法。

使用 `super(props)`:

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props) // { name: 'John', ... }
  }
}
```

使用 super():

```js
class MyComponent extends React.Component {
  constructor(props) {
    super()
    console.log(this.props) // undefined
  }
}
```
在 `constructor()` 函数之外，访问` this.props` 属性会显示相同的值。

阅读资源：

[《为什么我们要写 super(props) ？》](https://overreacted.io/zh-hans/why-do-we-write-super-props/)

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 
