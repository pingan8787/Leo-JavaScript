[《在 React 中使用 Shadow DOM》](https://yq.aliyun.com/articles/717933)

> 本文作者：houfeng
> 原文地址：https://yq.aliyun.com/articles/717933


## 1. Shadow DOM 是什么

**Shadow DOM** 是什么？我们先来打开 Chrome 的 DevTool，并在 **'Settings -> Preferences -> Elements'** 中把 **' Show user agent shadow DOM'** 打上勾。然后，打开一个支持 HTML5 播放的视频网站。比如 Youtube：

![2019110401](http://images.pingan8787.com/blog/2019110401.png)

可以看到 `video` 内部有一个 `#shadow-root` ，在 ShadowRoot 之下还能看到 `div` 这样的普通 HTML 标签。我们能知道 `video` 会有「播放/暂停按钮、进度条、视频时间显示、音量控制」等控件，那其实，就是由 `ShadowRoot` 中的这些子元素构成的。而我们最常用的 input 其实也附加了 Shadow DOM，比如，我们在 Chrome 中尝试给一个 `Input` 加上 placeholder ，通过 DevTools 便能看到，其实文字是在 `ShadowRoot` 下的一个 `Id` 为 `palcehoder` 的 `div` 中。

![2019110402](http://images.pingan8787.com/blog/2019110402.png)

Shadow DOM 允许在文档（Document）渲染时插入一棵「子 DOM  树」，并且这棵子树不在主 DOM 树中，同时为子树中的 DOM 元素和 CSS 提供了封装的能力。Shadow DOM 使得子树 DOM 与主文档的 DOM 保持分离，子 DOM 树中的 CSS 不会影响到主 DOM 树的内容，如下图所示：

![2019110403](http://images.pingan8787.com/blog/2019110403.png)

这里有几个需要了解和 Shadow DOM 相关的技术概念：

* `Shadow host`： 一个常规 DOM 节点，Shadow DOM 会被附加到这个节点上。
* `Shadow tree`：Shadow DOM 内部的 DOM 树。
* `Shadow boundary`：Shadow DOM 结束的地方，也是常规 DOM 开始的地方。
* `Shadow root`:  Shadow tree 的根节点。

## 2. Shadwo DOM 有何用

### 2.1. 浏览器内建的原生组件

Shadow DOM 最大的用处应该是隔离外部环境用于封装组件。估计浏览器的开发者们也意识到通过 HTML/CSS 来实现浏览器内建的原生组件更容易，如上边提到的浏览器原生组件 `input`，`video`，还有 `textarea`，`select`，`audio` 等，也都是由 HTML/CSS 渲染出来的。


### 2.2. Web Components

Web Components 允许开发者创建可重用的自定义元素，它们可以一起使用来创建封装功能的自定义元素，并可以像浏览器原生的元素一样在任何地方重用，而不必担心样式和 DOM 的冲突问题，主要由三项主要技术组成：

* `Custom Elements`（自定义元素）：一组 JavaScript API，允许您定义 Custom Elements 及其行为，然后可以在您的用户界面中按照需要使用它们。
* `HTML Templates`（ HTML 模板）： `template` 和 `slot` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。
* `Shadow DOM`（影子 DOM）：一组 JavaScript API 用于将「影子 DOM 树」附加到元素上，与主文档 DOM 树隔离，并能控制其关联的功能。通过这种方式，可以保持元素的私有，并能不用担心「样式」与文档的其他部分发生冲突。

在 **Web Components** 中的一个重要特性是「封装」，可以将「HTML 标签结构、CSS 样式、行为」隐藏起来，并从页面上的其他代码中分离开来，这样不同的功能不会混在一起，代码看起来也会更加干净整洁，其中 Shadow DOM 便是 DOM 和 CSS 封装所依赖的关键特性。


### 2.3 其他需要隔离的场景

不少人大概会听说过「微前端」，微前端作为一种「架构风格」，其中可由多个「可独立交付的前端子应用」组合成一个大的整体。那么在「微前端架构」下，每一个独立的子应用间及子应用间的如何保证不会冲突？样式不会相互覆盖？那么，是否可以将每个「子应用」通过 Shadow DOM 进行隔离？答案是肯定的，我就在部分项目中有过实践。

其他，在需要进行 DOM/CSS 隔离的场景，都有可能是 Shadow DOM 的用武之地。比如像 「阿里云购物车」这种需要「嵌入集成」到不同产品售卖页的「公共组件」，就很需要避免和宿主页面的样式冲突，即不影响宿主页面，也不要受宿主页面的影响。

![2019110404](http://images.pingan8787.com/blog/2019110404.png)

## 3. 主流浏览器的支持情况
其中 Chrome，Opera 和 Safari 默认就支持 Shadow DOM，而 Firefox 从 63 版本开始已经支持，可以看到支持最好的是 Chrome，而 IE 直到 11 也都是不支持的，微软的另一款浏览器 Edge 要换成和 Chrome 相同内核了，那换核后的 Edge 肯定会支持 Shadow DOM 了。

![2019110405](http://images.pingan8787.com/blog/2019110405.png)

各浏览器支持详细情况，请参考 https://caniuse.com/#feat=shadowdomv1


## 4. 如何创建 Shadow DOM

Shadow DOM 必须附加在一个元素上，可以是通过 HTML 声明的一个元素，也可以是通过脚本动态创建的元素。可以是原生的元素，如 `div`、`p `，也可以是「自定义元素」如 `my-element` ，语法如下：

```js
const shadowroot = element.attachShadow(shadowRootInit); 
```

参考如下例所示：

```html
<html>
  <head>
    <title>Shadow Demo</title>
  </head>
  <body>
    <h1>Shadow Demo</h1>
    <div id="host"></div>
    <script>
      const host = document.querySelector('#host');
      // 通过 attachShadow 向元素附加 Shadow DOM
      const shodowRoot = host.attachShadow({ mode: 'open' });
      // 向 shodowRoot 中添加一些内容
      shodowRoot.innerHTML = `<style>*{color:red;}</style><h2>haha!</h2>`;
    </script>
  </body>
</html>
```

通过这个简单的示例可以看到「在 Shadow DOM 中定义的样式，并不会影响到主文档中的元素」，如下图

![2019110406](http://images.pingan8787.com/blog/2019110406.png)

`Element.attachShadow`  的参数 `shadowRootInit`  的 `mode`  选项用于设定「封装模式」。它有两个可选的值 ：

* **"open"** ：可 `Host` 元素上通过 `host.shadowRoot`  获取 `shadowRoot` 引用，这样任何代码都可以通过 `shadowRoot` 来访问的子 DOM 树。
* **"closed"**：在 `Host` 元素上通过 `host.shadowRoot`  获取的是 `null`，我们只能通过 `Element.attachShadow` 的返回值拿到 `shadowRoot` 的引用（通常可能隐藏在类中）。例如，浏览器内建的 input、video 等就是关闭的，我们没有办法访问它们。

## 5. 哪些元素可以附加 Shadow DOM

并非所有 HTML 元素都可以开启 Shadow DOM 的，只有一组有限的元素可以附加 Shadow DOM。有时尝试将 Shadow DOM 树附加到某些元素将会导致 `DOMException` 错误，例如：

```js
document.createElement('img').attachShadow({mode: 'open'});    
// => DOMException
```

用 `<img>` 这样的非容器素作为 Shadow Host 是不合理的，因此这段代码将抛出 DOMException 错误。此外因为安全原因一些元素也不能附加 Shadow DOM（比如 A 元素），会出现错误的另一个原因是浏览器已经用该元素附加了 Shadow DOM，比如 Input 等。

下表列出了所有支持的元素：

![2019110407](http://images.pingan8787.com/blog/2019110407.png)

## 6. 在 React 中如何应用 Shadow DOM

在基于 React 的项目中应该如何使用 Shadow DOM 呢？比如你正在基于 React 编写一个面向不同产品或业务，可嵌入集成使用的公共组件，比如你正在基于 React 做一个「微前端架构」应用的设计或开发。

我们在编写 React 应用时一般不希望到处是 DOM 操作，因为这很不 React (形容词)。那是否能封装成一下用更 React (形容词) 的组件风格去使用 Shadow DOM 呢? 


### 6.1. 尝试写一个 React 组件:

```js
import React from "react";
import ReactDOM from "react-dom";

export class ShadowView extends React.Component {
  attachShadow = (host: Element) => {
    host.attachShadow({ mode: "open" });
  }
  render() {
    const { children } = this.props;
    return <div ref={this.attachShadow}>
      {children}
    </div>;
  }
}

export function App() {
  return <ShadowView>
    <span>这儿是隔离的</span>
  </ShadowView>
}

ReactDOM.render(<App />, document.getElementById("root"));
```

跑起来看看效果，一定会发现「咦？什么也没有显示」：


![2019110408](http://images.pingan8787.com/blog/2019110408.png)

在这里需要稍注意一下，在一个元素上附加了 Shadow DOM 后，元素原本的「子元素」将不会再显示，并且这些子元素也不在 Shadow DOM 中，只有 `host.shadowRoot`  的子元素才是「子 DOM 树」中一部分。也就是说这个「子 DOM 树」的「根节点」是 `host.shadowRoot` 而非 `host`。 `host.shadowRoot` 是 ShadowRoot 的实例，而 `ShadowRoot` 则继承于 `DocumentFragment`，可通过原生 DOM API 操作其子元素。

我们需通过` Element.attachShadow` 附加到元素，然后就能拿到附加后的 ShadowRoot 实例。 针对 ShadowRoot 这样一个原生 DOM Node 的的引用，除了利用 `ReactDOM.render` 或 `ReactDOM.createPortal`  ，我们并不能轻易的将` React.Element` 渲染到其中，除非直接接操作 DOM。


### 6.2. 基于直接操作 DOM 改造一版:

在 React 中通过 `ref` 拿到真实的 DOM 引用后，是否能通过原生的 DOM  API，将 `host` 的 `children` 移动到 `host.shadowRoot` 中？


```js
import React from "react";
import ReactDOM from "react-dom";

// 基于直接操作 DOM 的方式改造的一版
export class ShadowView extends React.Component {
  attachShadow = (host: Element) => {
    const shadowRoot = host.attachShadow({ mode: "open" });
    //将所有 children 移到 shadowRoot 中
    [].slice.call(host.children).forEach(child => {
      shadowRoot.appendChild(child);
    });
  }
  render() {
    const { children } = this.props;
    return <div ref={this.attachShadow}>
      {children}
    </div>;
  }
}

// 验证一下
export class App extends React.Component {
  state = { message: '...' };
  onBtnClick = () => {
    this.setState({ message: 'haha' });
  }
  render() {
    const { message } = this.state;
    return <div>
      <ShadowView>
        <div>{message}</div>
        <button onClick={this.onBtnClick}>内部单击</button>
      </ShadowView>
      <button onClick={this.onBtnClick}>外部单击</button>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

在浏览器中看看效果，可以看到是可以正常显示的。但与此同时会发现一个问题「隔离在 ShadowRoot 中的元素上的事件无法被触发了」，这是什么原因呢？

是由于 React 的「合成事件机制」的导致的，我们知道在 React 中「事件」并不会直接绑定到具体的 DOM 元素上，而是通过在 `document` 上绑定的 `ReactEventListener` 来管理， 当时元素被单击或触发其他事件时，事件被 `dispatch` 到 `document` 时将由 React 进行处理并触发相应合成事件的执行。

那为什么合成事件在 Shadow DOM 中不能被正常触发？是因为当在 Shadow DOM 外部捕获时浏览器会对事件进行「重定向」，也就是说在 Shadow DOM 中发生的事件在外部捕获时将会使用 host 元素作为事件源。这将让 React 在处理合成事件时，不认为 ShadowDOM 中元素基于 JSX 语法绑定的事件被触发了。


![2019110409](http://images.pingan8787.com/blog/2019110409.png)

### 6.3. 尝试利用 ReactDOM.render 改造一下:

`ReactDOM.render` 的第二个参数，可传入一个 DOM 元素。那是不是能通过 `ReactDOM.render` 将 `React Eements` 渲染到 Shodaw DOM 中呢？看一下如下尝试：

```js
import React from "react";
import ReactDOM from "react-dom";

// 换用 ReactDOM.render 实现
export class ShadowView extends React.Component {
  attachShadow = (host: Element) => {
    const { children } = this.props;
    const shadowRoot = host.attachShadow({ mode: "open" });
    ReactDOM.render(children, shadowRoot);
  }
  render() {
    return <div ref={this.attachShadow}></div>;
  }
}

// 试试效果如何
export class App extends React.Component {
  state = { message: '...' };
  onBtnClick = () => {
    this.setState({ message: 'haha' });
    alert('haha');
  }
  render() {
    const { message } = this.state;
    return <ShadowView>
      <div>{message}</div>
      <button onClick={this.onBtnClick}>单击我</button>
    </ShadowView>
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```


可以看到通过 `ReactDOM.render` 进行 `children` 的渲染，是能够正常渲染到 `Shadow Root` 中，并且在 Shadow DOM 中合成事件也是能正常触发执行的。

为什么此时「隔离在 Shadow DOM 中的元素事件」能够被触发了呢？ 因为在 React 在发现渲染的目标在 ShadowRoot 中时，将会将事件绑定在通过 `Element.getRootNode()` 获取的 `DocumentFragment` 的 `RootNode` 上。

![2019110410](http://images.pingan8787.com/blog/2019110410.png)

看似一切顺利，但却会发现父组件的 state 更新时，而 ShadowView 组件并没有更新。如上边的示例，其中的 message 显示的还是旧的，而原因就在我们使用 `ReactDOM.render` 时，Shadow DOM 的元素和父组件不在一个 React 渲染上下文中了。


### 6.4. 利用 ReactDOM.createPortal 实现一版：

我们知道 `createPortal` 的出现为「弹窗、提示框」等脱离文档流的组件开发提供了便利，替换了之前不稳定的 API `unstable_renderSubtreeIntoContainer`。

`ReactDOM.createPortal` 有一个特性是「通过 `createPortal` 渲染的 DOM，事件可以从 Portal 的入口端冒泡上来」，这一特性很关键，没有父子关系的 DOM ，合成事件能冒泡过来，那通过  `createPortal` 渲染到 Shadow DOM 中的元素的事件也能正常触发吧？并且能让所有元素的渲染在一个上下文中。那就基于 `createPortal` 实现一下：

```js
import React from "react";
import ReactDOM from "react-dom";

// 利用 ReactDOM.createPortal 的实现
export function ShadowContent({ root, children }) {
  return ReactDOM.createPortal(children, root);
}

export class ShadowView extends React.Component {
  state = { root: null };
  setRoot = eleemnt => {
    const root = eleemnt.attachShadow({ mode: "open" });
    this.setState({ root });
  };
  render() {
    const { children } = this.props;
    const { root } = this.state;
    return <div ref={this.setRoot}>
      {root && <ShadowContent root={root} >
        {children}
      </ShadowContent>}
    </div>;
  }
}

// 试试如何
export class App extends React.Component {
  state = { message: '...' };
  onBtnClick = () => {
    this.setState({ message: 'haha' });
  }
  render() {
    const { message } = this.state;
    return <ShadowView>
      <div>{message}</div>
      <button onClick={this.onBtnClick}>单击我</button>
    </ShadowView>
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

![2019110411](http://images.pingan8787.com/blog/2019110411.png)

Wow! 一切正常，有一个小问题是 `createPortal` 不支持 React 16 以下的版本，但大多数情况下这并不是个什么大问题。


## 7. 面向 React 的 ShadowView 组件

上边提到了几种在 React 中实现 Shadwo DOM 组件的方法，而 ShadowView 是一个写好的可开箱即用的面向 React 的 Shadow DOM 容器组件，利用 ShadowView 可以像普通组件一样方便的在 React 应用中创建启用 Shadow DOM 的容器元素。

ShadowView 目前完整兼容支持 React 15/16，组件的「事件处理、组件渲染更新」等行为在两个版中都是一致的。

GitHub: https://github.com/Houfeng/shadow-view


### 7.1. 安装组件

```sh
npm i shadow-view --save
```

### 7.2. 使用组件

```js
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ShadowView } from "shadow-view";

function App() {
  return (
    <ShadowView 
        styleContent={`*{color:red;}`} 
            styleSheets={[
            'your_style1_url.css',
          'your_style2_url.css'
        ]}
        >
      <style>{`在这儿也可写内部样式`}</style>
      <div>这是一个测试</div>
    </ShadowView>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
```

### 7.3. 组件属性

![2019110412](http://images.pingan8787.com/blog/2019110412.png)


![2019_07_12guild_page](http://images.pingan8787.com/2019_07_12guild_page.png)

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|JS小册|js.pingan8787.com|
