最近天气转冷，请小心感冒。

> https://juejin.im/post/5ad949e36fb9a07aa92544e4

## 一、严格模式 - 介绍和用途

严格模式（StrictMode）已经在 React v16.3 版本加入。它的作用是：在开发环境下中，主动提示组件内使用不推荐写法和即将废弃的 API。

React 支持我们在部分代码中启用严格模式，下面通过简单代码，看下它是如何使用：

```js
import React from 'react';

function LoginPage() {
  return (
    <>
      <Logo />
      <React.StrictMode>
        <div>
          <LoginForm />
        </div>
      </React.StrictMode>
      <SubimtBtn />
    </>
  );
}
```

在上面 demo 中，不会对 `Logo` 和 `SubimtBtn` 组件进行严格模式检查。只会对 `<React.StrictMode>` 标签内的 `LoginForm` 及它的所有后代元素都将进行检查。


**需要注意几点重要的知识：**

* 严格模式检查仅在开发模式下运行；它们不会影响生产构建；   
* `<React.StrictMode>` 不会被渲染成真实 DOM；


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