
## 一、组件

React 定义组件的方式有：`React.Component` 和 `React.PureComponent`。

### 1.React.Component

通过继承 React 基类进行定义：

```js
class LEOComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
}
```

### 2.React.PureComponent

和 `React.Component` 

### 3.从源码看两者区别

以下是两者实现源码：

```js
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};
Component.prototype.setState = function(partialState, callback) {
    // 省略...
};
Component.prototype.forceUpdate = function(callback) {
    // 省略...
};

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

export {Component, PureComponent};
```

从源码看， `React.Component` 与 `React.PureComponent` 类实现的方式一样，并且`React.PureComponent` 继承于 `React.Component`，但比 `React.Component` 原型链上多了 `isPureReactComponent` 属性。