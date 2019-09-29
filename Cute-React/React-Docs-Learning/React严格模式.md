最近天气转冷，请小心感冒。

> https://juejin.im/post/5ad949e36fb9a07aa92544e4

## 一、严格模式 - 介绍和用途


StrictMode 于 v16.3 推出。顾名思义，即严格模式，可用于在开发环境下提醒组件内使用不推荐写法和即将废弃的 API（该版本废弃了三个生命周期钩子）。与 Fragment 相同，并不会被渲染成真实 DOM。官方文档严格模式里详细介绍了会在哪些情况下发出警告。对于我们开发者来说，及时弃用不被推荐的写法即可规避这些警告。



## 二、严格模式 - 实例分析

做代码迁移


## 三、严格模式 - 源码分析


在源码中可以看到：

```js
// react.js
const React = {
    // ...
    StrictMode: REACT_STRICT_MODE_TYPE,
    // ...
}
```

然后我们在看看源码中的 `REACT_STRICT_MODE_TYPE` 是什么：

```js
// ReactSymbols.js
// ...
export const REACT_STRICT_MODE_TYPE = hasSymbol
  ? Symbol.for('react.strict_mode')
  : 0xeacc;
// ...
```

可以看出，它就是一个 Symbol ，一个标志，可能已经颠覆了我们的理解，在我们开发组件时，会在组件里面写很多业务逻辑或者渲染一些东西，但是 `StrictMode` 组件就是一个简单的 `Symbol` 没有任何的其他东西。

接下来我们全局搜索 `REACT_STRICT_MODE_TYPE`，看下它有做什么处理，搜索到这么多结果：

![图片1](reacrt20190929-01.png)

其他文件不是很重要，我们重点看 `ReactPartialRenderer.js`，其中有这么一段代码：

```js
//...
switch (elementType) {
  case REACT_STRICT_MODE_TYPE:
  case REACT_CONCURRENT_MODE_TYPE:
  case REACT_PROFILER_TYPE:
  case REACT_SUSPENSE_LIST_TYPE:
  case REACT_FRAGMENT_TYPE: {
    const nextChildren = toArray(
      ((nextChild: any): ReactElement).props.children,
    );
    const frame: Frame = {
      type: null,
      domNamespace: parentNamespace,
      children: nextChildren,
      childIndex: 0,
      context: context,
      footer: '',
    };
    if (__DEV__) {
      ((frame: any): FrameDev).debugElementStack = [];
    }
    this.stack.push(frame);
    return '';
  }
//...
```

上面代码我们可以大概看出，当我们渲染的元素是 `REACT_STRICT_MODE_TYPE` 类型时，声明了 `nextChildren` 和 `frame` 两个变量，并且往 `this.stack` 中压入 `frame` 的值。

看到这么，可能你就会（**哎呀卧槽，就是这里了**）。

![e1](http://ww2.sinaimg.cn/large/9150e4e5gy1g5bp6k40t7g208c08c3ze.gif)