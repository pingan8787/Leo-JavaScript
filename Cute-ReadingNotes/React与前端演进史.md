这几天在通过各种资料，了解了 React 出现的背景，还有前端这些年的变换，不得不说，感觉真的神奇！

本文将带大家了解**前端发展的那些年**还有 React **出现的背景**～

首先我们来看看为什么会产生 React 这个框架？

React 是 Facebook 在 2013 年开源的一款前端框架，在这之前，Facebook 工程师开发一个简单功能时，如下图界面中“小红点”功能：

![Facebook](http://images.pingan8787.com/chuanzhiboke/messages_on_facebook.png)

在导航栏中有“新好友”、“新消息”和“新动态”三个功能按钮，这其实功能挺简单，但却经常出 BUG，比如“收到新消息后，新消息的图标上数字没有正确更新”等问题。

大家可以先猜一下导致这个问题可能的原因。

我们都知道 Facebook 工程师都是世界顶级水平，**他们找寻出现这种问题的深层次原因** ，最终总结为两个原因：

1.**工程师太过关注 UI 层面的细节操作**；å

2.**应用程序的状态较为分散，无法追踪和维护**。

另外这里再介绍下 React 出现的时代背景：

1.**大量业务逻辑由后端转为前端实现**，即前后端分离；

2.已有前端框架开发的**复杂应用性能不佳**。

当时由于 Ajax 技术兴起，大量原来由服务端处理的逻辑，慢慢转移到前端做处理，这也是为了追求更流畅的 Web 交互体验。后来为了**提升开发效率和应用性能**，开始有很多大型前端框架出现（如：AngularJS），这些框架也让工程师们越来越关注 UI 层面的操作（如：频繁操作 DOM），**应用性能越来越差**，并伴随无法预知的 BUG 出现，就像前面讲到的 Facebook 工程师总结的原因之一。

之后 Facebook 工程师开始打造自己的前端框架，解决前面总结的问题，于是 React 就诞生啦～

![react](http://images.pingan8787.com/chuanzhiboke/section-1-react.png)

接下来就跟我一起，踏上 React 入门第一步吧！

# 一、React 介绍

## 1. 前端开发方式演进

- 前端混沌时代

在“前端混沌时代”，页面主要在服务端开发并生成，服务端生成什么页面，浏览器端就展示什么样的页面，这是时代，是多么单纯。

* 小前端时代

随后进入“小前端时代”，形成了以 HTML 为骨架，CSS 为外貌，JavaScript 为交互体验的前端开发模式，在这个时代，出现了 Ajax 这种划时代意义的技术，让静态网页升级为动态网页，并随着 JavaScript 的发展，前端能做更加多样的页面。当时出现了 jQuery 这类 JS 工具库，主要用来**操作 DOM**，**处理数据交互**，至今仍有很多老旧项目依然在使用 jQuery。

![jquery](http://images.pingan8787.com/chuanzhiboke/section-1-jquery.png)

* 大前端时代

在小前端时代稳定发展一段时间之后，工程师们开始发现前端**需要呈现的数据量越来越大**，**网页动态交互效果也越来越多**，jQuery 这类工具库**越来越频繁操作 DOM**，使得应用性能越来越差，页面越来越卡，慢慢前端大佬们开始解决这些问题。

在 2009 年诞生了 NodeJS ，将前端带入全新方向，为 AngularJS（2009年诞生），React（2011年诞生）和 Vuejs （2014年诞生）三大框架的**诞生奠定基础**。这些框架通过一定的分析比较算法，实现同等效果下最小的 DOM 开销，提高应用性能。前端开发进入“大前端时代”。

![frame](http://images.pingan8787.com/chuanzhiboke/section-1-frame.jpg)

* 全栈前端时代

“大前端时代”之后 NodeJS 社区蓬勃发展，4G 网络也在不断普及发展，很多传统 PC 网站开始转向手机、平板等移动端设备，开始出现了混合应用技术（Hybrid APP），出现了各种开发框架，如 Cordova、React-Native、Weex、Electron等，还有最近比较火的 Flutter。

![app](http://images.pingan8787.com/chuanzhiboke/section-1-app.png)

随着 TypeScript 的出现，和 ECMAScript 标准日渐完善，**前端开发正在朝着更加全能化**，**多样化和更加细分领域的方向发展**。

## 2. React 介绍

React 是一个用于构建用户界面的 JavaScript 库，是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式。

由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。

在 React 中，可以将页面中每个部分分成每一个独立的小模块，每个小模块就是组建，这些组件可以互相组合和嵌套，就组成每一个页面。相比传统操作 DOM 的前端开发方式，我们**主要要关心的是应用中数据的变化** ，React 会帮我们将 UI 渲染完成。

以一个“用户推荐关注页面”为例子，可以将页面简单分为下面几个组件：

![component](http://images.pingan8787.com/chuanzhiboke/section-1-component.png)

其中：

- 组件`UserPageComponent` 为：主页面组件；
- 组件 `HeaderComponent` 为：页面顶部标题栏组件；
- 组件`ContentComponent` 为：页面主要内容区域组件；
- 组件`FooterComponent` 为：页面底部操作组件；
- 组件`UserInfoComponent` 为：通用用户信息组件；
- 组件`CommonButtonComponent` 为：通用按钮组件。

接下来看下这个页面在 React 中是如何编写的吧～

```jsx
class UserPageComponent extends React.Component {
  // ...
  render() {
    return (
      <div>
        <HeaderComponent></HeaderComponent>
        <ContentComponent></ContentComponent>
        <FooterComponent></FooterComponent>
      </div>
    );
  }
}

class ContentComponent extends React.Component {
  // ...
  render() {
    return (
      <div>
        <UserInfoComponent></UserInfoComponent>
        <UserInfoComponent></UserInfoComponent>
        <UserInfoComponent></UserInfoComponent>
      </div>
    );
  }
}
```

看起来就跟叠积木一样啦～～

看到这里，恭喜你已经了解了 React 并且知道 React 代码是如何编写的了！

接下来再来看看 React 各个重大版本的更新，这对于你了解 React 很有帮助。

## 3. React 版本 

我们可以在 React 官网中查看 React 的版本迭代历史记录和更新内容：https://reactjs.org/versions/。

在 2017.09.26 Facebook 发布 React v16.0 版本，截止课程制作时，React 最新版本为 v16.13.1 ，且引入了大量的令人振奋的新特性，接下来将以 React v16.0 版本开始，介绍一些重要更新内容，快跟我一起看看吧！

- **React v16.2.0 (November 28, 2017)** 

增加 Fragment 组件，其作用是将一些子元素添加到 DOM tree 上且不需要为这些元素提供额外的父节点，相当于 render 返回数组元素。

* **React v16.3.0 (March 29, 2018)** 

增加 `React.createRef()` API，可以通过 `React.createRef` 取得 Ref 对象。

增加 `React.forwardRef()`  API，它是 Ref 的转发, 让父组件能够访问到子组件的 Ref，从而操作子组件的 DOM。

- **React v16.6.0 (October 23, 2018)** 

增加 `React.memo()` API，它只能作用在简单的函数组件上，本质是一个高阶函数，可以自动帮助组件执行 。

增加 `React.lazy()` API，它提供了动态 import 组件的能力，实现代码分割。

- **React v16.8.0 (February 6, 2019)** 

增加 React Hooks，一种无需编写类即可使用状态和其他React功能的方法，用来解决状态逻辑复用问题，且不会产生 JSX 嵌套地狱。

改进 `useReducer`  Hook 惰性初始化API。

React 版本大概介绍到这里，相信这里还有很多知识你还不清楚，但是没关系，接下来的课程，我们将一一解答～

# 二、闯关训练

请问 React 开发中，相比传统前端开发，我们更需要关注什么？

A. 应用中 DOM 的变化

B. 应用中数据的变化

C. 应用中 UI 展示

答案：B