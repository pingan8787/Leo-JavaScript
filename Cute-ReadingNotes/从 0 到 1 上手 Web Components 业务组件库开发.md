组件化是前端发展的一个重要方向，它一方面提高开发效率，另一方面降低维护成本。主流的 Vue.js、React 及其延伸的 Ant Design、uniapp、Taro 等都是组件框架。
​
[Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components) 是一组 Web 原生 API 的总称，允许我们创建可重用的自定义组件，并在我们 Web 应用中像使用原生 HTML 标签一样使用。目前已经很多前端框架/库支持 [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)。

本文将带大家回顾 [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components) 核心 API，并从 0 到 1 实现一个基于 Web Components API 开发的业务组件库。
​
> 最终效果：[https://blog.pingan8787.com/exe-components/demo.html](https://blog.pingan8787.com/exe-components/demo.html)  
> 仓库地址：[https://github.com/pingan8787/Learn-Web-Components](https://github.com/pingan8787/Learn-Web-Components)

## 一、回顾 Web Components

在前端发展历史中，从刚开始重复业务到处复制相同代码，到 Web Components 的出现，我们使用原生 HTML 标签的自定义组件，复用组件代码，提高开发效率。通过 Web Components 创建的组件，几乎可以使用在任何前端框架中。

### 1. 核心 API 回顾

Web Components 由 3 个核心 API 组成：

- **Custom elements（自定义元素）**：用来让我们定义**自定义元素**及其**行为**，对外提供组件的标签；
- **Shadow DOM（影子 DOM）**：用来封装组件内部的结构，避免与外部冲突；
- **HTML templates（HTML 模版）**：包括 `<template>`和`<slot>` 元素，让我们可以定义各种组件的 HTML 模版，然后被复用到其他地方，使用过 Vue/React 等框架的同学应该会很熟悉。

> 另外，还有 HTML imports，但目前已废弃，所以不具体介绍，其作用是用来控制组件的依赖加载。

![image](http://images.pingan8787.com/web-components-1/image0.jpg)
​
### 2. 入门示例

接下来通过下面简单示例快速了解一下**如何创建一个简单 Web Components 组件**。

- 使用组件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="./index.js" defer></script>
</head>
<body>
    <h1>custom-element-start</h1>
    <custom-element-start></custom-element-start>
</body>
</html>
```

- 定义组件

```javascript
/**
 * 使用 CustomElementRegistry.define() 方法用来注册一个 custom element
 * 参数如下：
 * - 元素名称，符合 DOMString 规范，名称不能是单个单词，且必须用短横线隔开
 * - 元素行为，必须是一个类
 * - 继承元素，可选配置，一个包含 extends 属性的配置对象，指定创建的元素继承自哪个内置元素，可以继承任何内置元素。
 */

class CustomElementStart extends HTMLElement {
    constructor(){
        super();
        this.render();
    }
    render(){
        const shadow = this.attachShadow({mode: 'open'});
        const text = document.createElement("span");
        text.textContent = 'Hi Custom Element!';
        text.style = 'color: red';
        shadow.append(text);
    }
}

customElements.define('custom-element-start', CustomElementStart)
```
上面代码主要做 3 件事：

1. 实现组件类

通过实现 `CustomElementStart` 类来定义组件。

2. 定义组件

将组件的标签和组件类作为参数，通过 `customElements.define` 方法定义组件。

3. 使用组件

导入组件后，跟使用普通 HTML 标签一样直接使用自定义组件 `<custom-element-start></custom-element-start>`。

随后浏览器访问 `index.html` 可以看到下面内容：
![image](http://images.pingan8787.com/web-components-1/image1.jpg)

### 3. 兼容性介绍

在 [MDN | Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components) 章节中介绍了其兼容性情况：

> - Firefox(版本63)、Chrome和Opera都默认支持Web组件。
> - Safari支持许多web组件特性，但比上述浏览器少。
> - Edge正在开发一个实现。

关于兼容性，可以看下图：
![image](http://images.pingan8787.com/web-components-1/image2.jpg)
图片来源：[https://www.webcomponents.org/](https://www.webcomponents.org/)

这个网站里面，有很多关于 Web Components 的优秀项目可以学习。

### 4. 小结

这节主要通过一个简单示例，简单回顾基础知识，详细可以阅读文档：

- [使用 custom elements](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements)
- [使用 shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)
- [使用 templates and slots](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_templates_and_slots)

![image](http://images.pingan8787.com/web-components-1/image3.jpg)

## 二、EXE-Components 组件库分析设计

### 1. 背景介绍

假设我们需要实现一个 EXE-Components 组件库，该组件库的组件分 2 大类：

1. components 类型

以**通用简单组件**为主，如`exe-avatar`头像组件、 `exe-button`按钮组件等；

2. modules 类型

以**复杂、组合组件**为主，如`exe-user-avatar`用户头像组件（含用户信息）、`exe-attachement-list`附件列表组件等等。
​

详细可以看下图：

![image](http://images.pingan8787.com/web-components-1/image4.jpg)

接下来我们会基于上图进行 EXE-Components 组件库设计和开发。
​
### 2. 组件库设计

在设计组件库的时候，主要需要考虑以下几点：

1. 组件命名、参数命名等规范，方便组件后续维护；
1. 组件参数定义；
1. 组件样式隔离；

当然，这几个是最基础需要考虑的点，随着实际业务的复杂，还需要考虑更多，比如：工程化相关、组件解耦、组件主题等等。

针对前面提到这 3 点，这边约定几个命名规范：

1. 组件名称以 `exe-功能名称` 进行命名，如 `exe-avatar`表示头像组件；
1. 属性参数名称以 `e-参数名称` 进行命名，如 `e-src` 表示 `src` 地址属性；
1. 事件参数名称以 `on-事件类型` 进行命名，如 `on-click`表示点击事件；

### 3. 组件库组件设计

这边我们主要设计 `exe-avatar` 、`exe-button` 和 `exe-user-avatar`三个组件，前两个为简单组件，后一个为复杂组件，其内部使用了前两个组件进行组合。这边先定义这三个组件支持的属性：

![image](http://images.pingan8787.com/web-components-1/xmind.jpg)

> 这边属性命名看着会比较复杂，大家可以按照自己和团队的习惯进行命名。

这样我们思路就清晰很多，实现对应组件即可。

## 三、EXE-Components 组件库准备工作

本文示例最终将对实现的组件进行**组合使用**，实现下面「**用户列表**」效果：


![image](http://images.pingan8787.com/web-components-1/image5.jpg)

体验地址：[https://blog.pingan8787.com/exe-components/demo.html](https://blog.pingan8787.com/exe-components/demo.html)

### 1. 统一开发规范

首先我们先统一开发规范，包括：

1. 目录规范

![image](http://images.pingan8787.com/web-components-1/image6.jpg)

2. 定义组件规范

![image](http://images.pingan8787.com/web-components-1/image7.jpg)

3. 组件开发模版

组件开发模版分 `index.js`**组件入口文件**和 `template.js` **组件 HTML 模版文件**：

```javascript
// index.js 模版
const defaultConfig = {
    // 组件默认配置
}

const Selector = "exe-avatar"; // 组件标签名

export default class EXEAvatar extends HTMLElement {
    shadowRoot = null;
    config = defaultConfig;

    constructor(){
        super();
        this.render(); // 统一处理组件初始化逻辑
    }

    render() {
        this.shadowRoot = this.attachShadow({mode: 'closed'});
        this.shadowRoot.innerHTML = renderTemplate(this.config);
    }
}

// 定义组件
if (!customElements.get(Selector)) {
    customElements.define(Selector, EXEAvatar)
}
```

```javascript
// template.js 模版

export default config => {
    // 统一读取配置
    const { avatarWidth, avatarRadius, avatarSrc } = config;
    return `
        <style>
            /* CSS 内容 */
        </style>
        <div class="exe-avatar">
            /* HTML 内容 */
        </div>
    `
}
```

### 2. 开发环境搭建和工程化处理

为了方便使用 EXE-Components 组件库，更接近实际组件库的使用，我们需要将组件库打包成一个 UMD 类型的 js 文件。这边我们使用 [rollup](https://rollupjs.org/guide/en/) 进行构建，最终打包成 `exe-components.js` 的文件，使用方式如下：

```html
<script src="./exe-components.js"></script>
```

接下来通过 `npm init -y`生成 `package.json`文件，然后全局安装 rollup 和 [http-server](https://github.com/http-party/http-server)(用来启动本地服务器，方便调试)：

```bash
npm init -y
npm install --global rollup http-server
```

然后在 `package.json`的 `script` 下添加 `"dev"`和 `"build"`脚本：

```json
{
	// ...
  "scripts": {
    "dev": "http-server -c-1 -p 1400",
    "build": "rollup index.js --file exe-components.js --format iife"
  },
}
```

其中：

- `"dev"` 命令：通过 http-server 启动静态服务器，作为开发环境使用。添加 `-c-1` 参数用来禁用缓存，避免刷新页面还会有缓存，详细可以看 [http-server 文档](https://github.com/http-party/http-server)；
- `"build"`命令：将 index.js 作为 rollup 打包的入口文件，输出 `exe-components.js` 文件，并且是 iife 类型的文件。

这样就完成简单的本地开发和组件库构建的工程化配置，接下来就可以进行开发了。
​
## 四、EXE-Components 组件库开发

### 1. 组件库入口文件配置

前面 `package.json` 文件中配置的 `"build"` 命令，会使用根目录下 `index.js` 作为入口文件，并且为了方便 components 通用基础组件和 modules 通用复杂组件的引入，我们创建 3 个 `index.js`，创建后目录结构如下：

![image](http://images.pingan8787.com/web-components-1/image8.jpg)

三个入口文件内容分别如下：

```javascript
// EXE-Components/index.js
import './components/index.js';
import './modules/index.js';

// EXE-Components/components/index.js
import './exe-avatar/index.js';
import './exe-button/index.js';

// EXE-Components/modules/index.js
import './exe-attachment-list/index.js.js';
import './exe-comment-footer/index.js.js';
import './exe-post-list/index.js.js';
import './exe-user-avatar/index.js';
```

### 2. 开发 exe-avatar 组件 index.js 文件

通过前面的分析，我们可以知道 `exe-avatar`组件需要支持参数：

- e-avatar-src：头像图片地址，例如：./testAssets/images/avatar-1.png
- e-avatar-width：头像宽度，默认和高度一致，例如：52px
- e-button-radius：头像圆角，例如：22px，默认：50%
- on-avatar-click：头像点击事件，默认无

接着按照之前的模版，开发入口文件 `index.js` ：

```javascript
// EXE-Components/components/exe-avatar/index.js
import renderTemplate from './template.js';
import { Shared, Utils } from '../../utils/index.js';

const { getAttributes } = Shared;
const { isStr, runFun } = Utils;

const defaultConfig = {
    avatarWidth: "40px",
    avatarRadius: "50%",
    avatarSrc: "./assets/images/default_avatar.png",
    onAvatarClick: null,
}

const Selector = "exe-avatar";

export default class EXEAvatar extends HTMLElement {
    shadowRoot = null;
    config = defaultConfig;

    constructor(){
        super();
        this.render();
    }

    render() {
        this.shadowRoot = this.attachShadow({mode: 'closed'});
        this.shadowRoot.innerHTML = renderTemplate(this.config);// 生成 HTML 模版内容
    }

		// 生命周期：当 custom element首次被插入文档DOM时，被调用。
    connectedCallback() {
        this.updateStyle();
        this.initEventListen();
    }

    updateStyle() {
        this.config = {...defaultConfig, ...getAttributes(this)};
        this.shadowRoot.innerHTML = renderTemplate(this.config); // 生成 HTML 模版内容
    }

    initEventListen() {
        const { onAvatarClick } = this.config;
        if(isStr(onAvatarClick)){ // 判断是否为字符串
            this.addEventListener('click', e => runFun(e, onAvatarClick));
        }
    }
}

if (!customElements.get(Selector)) {
    customElements.define(Selector, EXEAvatar)
}

```
其中有几个方法是抽取出来的公用方法，大概介绍下其作用，具体可以看源码：

- `renderTemplate` 方法

来自 template.js 暴露的方法，传入配置 config，来生成 HTML 模版。

- `getAttributes` 方法

传入一个 HTMLElement 元素，返回该元素上所有属性键值对，其中会对 `e-` 和 `on-` 开头的属性，分别处理成普通属性和事件属性，示例如下：

```javascript
// input
<exe-avatar
    e-avatar-src="./testAssets/images/avatar-1.png"
    e-avatar-width="52px"
    e-avatar-radius="22px"
    on-avatar-click="avatarClick()"
></exe-avatar>
  
// output
{
  avatarSrc: "./testAssets/images/avatar-1.png",
  avatarWidth: "52px",
  avatarRadius: "22px",
  avatarClick: "avatarClick()"
}
```

- `runFun`方法

由于通过属性传递进来的方法，是个字符串，所以进行封装，传入 `event` 和事件名称作为参数，调用该方法，示例和上一步一样，会执行 `avatarClick()` 方法。

另外，Web Components 生命周期可以详细看文档：[使用生命周期回调函数](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements#%E4%BD%BF%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)。

### 3. 开发 exe-avatar 组件 template.js 文件

该文件暴露一个方法，返回组件 HTML 模版：

```javascript
// EXE-Components/components/exe-avatar/template.js
export default config => {
  const { avatarWidth, avatarRadius, avatarSrc } = config;
  return `
    <style>
      .exe-avatar {
        width: ${avatarWidth};
        height: ${avatarWidth};
        display: inline-block;
        cursor: pointer;
      }
      .exe-avatar .img {
        width: 100%;
        height: 100%;
        border-radius: ${avatarRadius};
        border: 1px solid #efe7e7;
      }
    </style>
    <div class="exe-avatar">
      <img class="img" src="${avatarSrc}" />
    </div>
  `
}
```

最终实现效果如下：

![image](http://images.pingan8787.com/web-components-1/image9.jpg)

开发完第一个组件，我们可以简单总结一下创建和使用组件的步骤：

![image](http://images.pingan8787.com/web-components-1/image10.jpg)

### 4. 开发 exe-button 组件

按照前面 `exe-avatar`组件开发思路，可以很快实现 `exe-button` 组件。
需要支持下面参数：

- e-button-radius：按钮圆角，例如：8px
- e-button-type：按钮类型，例如：default, primary, text, dashed
- e-button-text：按钮文本，默认：打开
- on-button-click：按钮点击事件，默认无

```javascript
// EXE-Components/components/exe-button/index.js
import renderTemplate from './template.js';
import { Shared, Utils } from '../../utils/index.js';

const { getAttributes } = Shared;
const { isStr, runFun } = Utils;
const defaultConfig = {
    buttonRadius: "6px",
    buttonPrimary: "default",
    buttonText: "打开",
    disableButton: false,
    onButtonClick: null,
}

const Selector = "exe-button";

export default class EXEButton extends HTMLElement {
    // 指定观察到的属性变化，attributeChangedCallback 会起作用
    static get observedAttributes() { 
        return ['e-button-type','e-button-text', 'buttonType', 'buttonText']
    }

    shadowRoot = null;
    config = defaultConfig;

    constructor(){
        super();
        this.render();
    }

    render() {
        this.shadowRoot = this.attachShadow({mode: 'closed'});
    }

    connectedCallback() {
        this.updateStyle();
        this.initEventListen();
    }

    attributeChangedCallback (name, oldValue, newValue) {
        // console.log('属性变化', name)
    }

    updateStyle() {
        this.config = {...defaultConfig, ...getAttributes(this)};
        this.shadowRoot.innerHTML = renderTemplate(this.config);
    }

    initEventListen() {
        const { onButtonClick } = this.config;
        if(isStr(onButtonClick)){
            const canClick = !this.disabled && !this.loading
            this.addEventListener('click', e => canClick && runFun(e, onButtonClick));
        }
    }

    get disabled () {
        return this.getAttribute('disabled') !== null;
    }

    get type () {
        return this.getAttribute('type') !== null;
    }

    get loading () {
        return this.getAttribute('loading') !== null;
    }
}

if (!customElements.get(Selector)) {
    customElements.define(Selector, EXEButton)
}

```

模版定义如下：

```javascript
// EXE-Components/components/exe-button/tempalte.js
// 按钮边框类型
const borderStyle = { solid: 'solid', dashed: 'dashed' };

// 按钮类型
const buttonTypeMap = {
    default: { textColor: '#222', bgColor: '#FFF', borderColor: '#222'},
    primary: { textColor: '#FFF', bgColor: '#5FCE79', borderColor: '#5FCE79'},
    text: { textColor: '#222', bgColor: '#FFF', borderColor: '#FFF'},
}

export default config => {
    const { buttonRadius, buttonText, buttonType } = config;

    const borderStyleCSS = buttonType 
        && borderStyle[buttonType] 
        ? borderStyle[buttonType] 
        : borderStyle['solid'];

    const backgroundCSS = buttonType 
        && buttonTypeMap[buttonType] 
        ? buttonTypeMap[buttonType] 
        : buttonTypeMap['default'];

    return `
        <style>
            .exe-button {
                border: 1px ${borderStyleCSS} ${backgroundCSS.borderColor};
                color: ${backgroundCSS.textColor};
                background-color: ${backgroundCSS.bgColor};
                font-size: 12px;
                text-align: center;
                padding: 4px 10px;
                border-radius: ${buttonRadius};
                cursor: pointer;
                display: inline-block;
                height: 28px;
            }
            :host([disabled]) .exe-button{ 
                cursor: not-allowed; 
                pointer-events: all; 
                border: 1px solid #D6D6D6;
                color: #ABABAB;
                background-color: #EEE;
            }
            :host([loading]) .exe-button{ 
                cursor: not-allowed; 
                pointer-events: all; 
                border: 1px solid #D6D6D6;
                color: #ABABAB;
                background-color: #F9F9F9;
            }
        </style>
        <button class="exe-button">${buttonText}</button>
    `
}
```

最终效果如下：

![image](http://images.pingan8787.com/web-components-1/image11.jpg)

### 5. 开发 exe-user-avatar 组件

该组件是将前面 `exe-avatar` 组件和 `exe-button` 组件进行组合，不仅需要支持**点击事件**，还需要支持**插槽 slot 功能**。
​
由于是做组合，所以开发起来比较简单~先看看入口文件：

```javascript
// EXE-Components/modules/exe-user-avatar/index.js

import renderTemplate from './template.js';
import { Shared, Utils } from '../../utils/index.js';

const { getAttributes } = Shared;
const { isStr, runFun } = Utils;

const defaultConfig = {
    userName: "",
    subName: "",
    disableButton: false,
    onAvatarClick: null,
    onButtonClick: null,
}

export default class EXEUserAvatar extends HTMLElement {
    shadowRoot = null;
    config = defaultConfig;

    constructor() {
        super();
        this.render();
    }

    render() {
        this.shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.updateStyle();
        this.initEventListen();
    }

    initEventListen() {
        const { onAvatarClick } = this.config;
        if(isStr(onAvatarClick)){
            this.addEventListener('click', e => runFun(e, onAvatarClick));
        }
    }

    updateStyle() {
        this.config = {...defaultConfig, ...getAttributes(this)};
        this.shadowRoot.innerHTML = renderTemplate(this.config);
    }
}

if (!customElements.get('exe-user-avatar')) {
    customElements.define('exe-user-avatar', EXEUserAvatar)
}
```

主要内容在 template.js 中：

```javascript
// EXE-Components/modules/exe-user-avatar/template.js

import { Shared } from '../../utils/index.js';

const { renderAttrStr } = Shared;

export default config => {
    const { 
        userName, avatarWidth, avatarRadius, buttonRadius, 
        avatarSrc, buttonType = 'primary', subName, buttonText, disableButton,
        onAvatarClick, onButtonClick
    } = config;
    return `
        <style>
            :host{
                color: "green";
                font-size: "30px";
            }
            .exe-user-avatar {
                display: flex;
                margin: 4px 0;
            }
            .exe-user-avatar-text {
                font-size: 14px;
                flex: 1;
            }
            .exe-user-avatar-text .text {
                color: #666;
            }
            .exe-user-avatar-text .text span {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
            exe-avatar {
                margin-right: 12px;
                width: ${avatarWidth};
            }
            exe-button {
                width: 60px;
                display: flex;
                justify-content: end;
            }
        </style>
        <div class="exe-user-avatar">
            <exe-avatar
                ${renderAttrStr({
                    'e-avatar-width': avatarWidth,
                    'e-avatar-radius': avatarRadius,
                    'e-avatar-src': avatarSrc,
                })}
            ></exe-avatar>
            <div class="exe-user-avatar-text">
                <div class="name">
                    <span class="name-text">${userName}</span>
                    <span class="user-attach">
                        <slot name="name-slot"></slot>
                    </span>
                </div>
                <div class="text">
                    <span class="name">${subName}<slot name="sub-name-slot"></slot></span>
                </div>
            </div>
            ${
                !disableButton && 
                `<exe-button
                    ${renderAttrStr({
                        'e-button-radius' : buttonRadius,
                        'e-button-type' : buttonType,
                        'e-button-text' : buttonText,
                        'on-avatar-click' : onAvatarClick,
                        'on-button-click' : onButtonClick,
                    })}
                ></exe-button>`
            }

        </div>
    `
}
```

其中 `renderAttrStr` 方法接收一个属性对象，返回其键值对字符串：

```javascript
// input
{
  'e-avatar-width': 100,
  'e-avatar-radius': 50,
  'e-avatar-src': './testAssets/images/avatar-1.png',
}
  
// output
"e-avatar-width='100' e-avatar-radius='50' e-avatar-src='./testAssets/images/avatar-1.png' "
```

最终效果如下：

![image](http://images.pingan8787.com/web-components-1/image12.jpg)

### 6. 实现一个用户列表业务

接下来我们通过一个实际业务，来看看我们组件的效果：

![image](http://images.pingan8787.com/web-components-1/image13.jpg)
其实实现也很简单，根据给定数据，然后循环使用组件即可，假设有以下用户数据：

```javascript
const users = [
  {"name":"前端早早聊","desc":"帮 5000 个前端先跑 @ 前端早早聊","level":6,"avatar":"qdzzl.jpg","home":"https://juejin.cn/user/712139234347565"}
  {"name":"来自拉夫德鲁的码农","desc":"谁都不救我，谁都救不了我，就像我救不了任何人一样","level":2,"avatar":"lzlfdldmn.jpg","home":"https://juejin.cn/user/994371074524862"}
  {"name":"黑色的枫","desc":"永远怀着一颗学徒的心。。。","level":3,"avatar":"hsdf.jpg","home":"https://juejin.cn/user/2365804756348103"}
  {"name":"captain_p","desc":"目的地很美好，路上的风景也很好。今天增长见识了吗","level":2,"avatar":"cap.jpg","home":"https://juejin.cn/user/2532902235026439"}
  {"name":"CUGGZ","desc":"文章联系微信授权转载。微信：CUG-GZ，添加好友一起学习~","level":5,"avatar":"cuggz.jpg","home":"https://juejin.cn/user/3544481220801815"}
  {"name":"政采云前端团队","desc":"政采云前端 ZooTeam 团队，不掺水的原创。 团队站点：https://zoo.team","level":6,"avatar":"zcy.jpg","home":"https://juejin.cn/user/3456520257288974"}
]
```

我们就可以通过简单 for 循环拼接 HTML 片段，然后添加到页面某个元素中：

```javascript
// 测试生成用户列表模版
const usersTemp = () => {
    let temp = '', code = '';
    users.forEach(item => {
        const {name, desc, level, avatar, home} = item;
        temp += 
`
<exe-user-avatar 
    e-user-name="${name}"
    e-sub-name="${desc}"
    e-avatar-src="./testAssets/images/users/${avatar}"
    e-avatar-width="36px"
    e-button-type="primary"
    e-button-text="关注"
    on-avatar-click="toUserHome('${home}')"
    on-button-click="toUserFollow('${name}')"
>
${
    level >= 0 && `<span slot="name-slot">
        <span class="medal-item">（Lv${level}）</span>
    </span>`}
</exe-user-avatar>
`
})
    return temp;
}

document.querySelector('#app').innerHTML = usersTemp;
```

到这边我们就实现了一个用户列表的业务，当然实际业务可能会更加复杂，需要再优化。

## 五、总结
本文首先简单回顾 Web Components 核心 API，然后对组件库需求进行分析设计，再进行环境搭建和开发，内容比较多，可能没有每一点都讲到，还请大家看看我仓库的源码，有什么问题欢迎和我讨论。
​
写本文的几个核心目的：

1. 当我们接到一个新任务的时候，需要从分析设计开始，再到开发，而不是盲目一上来就开始开发；
1. 带大家一起看看如何用 Web Components 开发简单的业务组件库；
1. 体验一下 Web Components 开发组件库有什么缺点（就是要写的东西太多了）。

最后看完本文，大家是否觉得用  Web Components 开发组件库，实在有点复杂？要写的太多了。
没关系，下一篇我将带大家一起使用 [Stencil](https://stenciljs.com/) 框架开发 Web Components 标准的组件库，毕竟整个[ ionic ](https://ionic.io/)已经是使用 [Stencil](https://stenciljs.com/) 重构，Web Components 大势所趋~！

## 拓展阅读

- [WEBCOMPONENTS.ORG Discuss & share web components](https://www.webcomponents.org/)
- [Web Components as Technology](https://dzone.com/articles/web-components-as-technology)
- [Stenciljs - Build. Customize. Distribute. Adopt.](https://stenciljs.com/)
