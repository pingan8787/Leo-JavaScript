原文地址：[https://mp.weixin.qq.com/s/yLMA02zAq6ZMSaT0E2aEIA](https://mp.weixin.qq.com/s/yLMA02zAq6ZMSaT0E2aEIA)

<a name="2VLCN"></a>
# 前言
作为一个开发了多个 H5 项目的前端工程师，在开发过程中难免会遇到一些兼容性等**爬过坑**的问题。现在我将这些问题一一汇总一下，并在后面给出**坑产生的原理**，和**现阶段常规的填坑方案**。由此来做一个阶段性的总结。
> 常规操作哈，**点赞**后再观看呗！你的**点赞**就是我创作的动力之一！

<a name="wyoRM"></a>
# 问题
下面列举了我遇到的一些常规问题，如有遇到其他问题请在评论区补充，之后我也会实践后加以补充，感谢！（经常更新该文）
<a name="DMZ5C"></a>
## 移动端 H5 相关问题汇总：

- **1px 问题**
- **响应式布局**
- **iOS 滑动不流畅**
- **iOS 上拉边界下拉出现白色空白**
- **页面件放大或缩小不确定性行为**
- **click 点击穿透与延迟**
- **软键盘弹出将页面顶起来、收起未回落问题**
- **iPhone X 底部栏适配问题**
- **保存页面为图片和二维码问题和解决方案**
- **微信公众号 H5 分享问题**
- **H5 调用 SDK 相关问题及解决方案**
- **H5 调试相关方案与策略**
<a name="tlOsN"></a>
## 移动端 H5 相关基础技术概览
<br />![](https://cdn.nlark.com/yuque/0/2020/webp/186051/1584973292716-a8f6c379-9716-4603-b75d-f20da9de3b43.webp#align=left&display=inline&height=558&originHeight=558&originWidth=1080&size=0&status=done&style=none&width=1080)
<a name="B3DB3"></a>
# 原理与实践
之前两篇文章已经详细的论述了**1px** 问题与 **响应式布局**问题，并给出了原理和解决方案。
> 防止丢失，**点赞收藏**后跳转至快捷通道：**1px**通道与响应式布局通道

接下来呢，我们看看其他问题的原理和解决方案吧。
> 以下解决方案，均经过我测试成功，健康安全，请放下食用。由于篇幅原因，某些非核心解决方案的实现细节暂未谈论，需要自行研究。

<a name="MEmWf"></a>
## iOS 滑动不流畅

<a name="gftoz"></a>
### 表现
上下滑动页面会产生卡顿，手指离开页面，页面立即停止运动。整体表现就是滑动不流畅，没有滑动惯性。
<a name="ImU4y"></a>
### 产生原因
**为什么 iOS 的 webview 中 滑动不流畅，它是如何定义的？**<br />最终我在 `safari` 文档里面寻找到了答案（文档链接在参考资料项）。<br />![](https://cdn.nlark.com/yuque/0/2020/webp/186051/1584973292693-cf9fd82e-fb54-41dc-b6df-09a84ba5447d.webp#align=left&display=inline&height=241&originHeight=840&originWidth=1080&size=0&status=done&style=none&width=309)<br />原来在 iOS 5.0 以及之后的版本，滑动有定义有两个值 `auto` 和 `touch`，默认值为 `auto`。
```css
-webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
-webkit-overflow-scrolling: auto; /* 当手指从触摸屏上移开，滚动会立即停止 */
```
<a name="mBt28"></a>
### 解决方案
<a name="Cqqo7"></a>
#### 1.在滚动容器上增加滚动 touch 方法
将`-webkit-overflow-scrolling` 值设置为 `touch`
```css
.wrapper {
    -webkit-overflow-scrolling: touch;
}
```
> 设置滚动条隐藏： `.container ::-webkit-scrollbar {display: none;}`

可能会导致使用`position:fixed;` 固定定位的元素，随着页面一起滚动
<a name="l8X63"></a>
#### 2.设置 overflow
设置外部 `overflow` 为 `hidden`,设置内容元素 `overflow` 为 `auto`。内部元素超出 body 即产生滚动，超出的部分 body 隐藏。
```
body {
    overflow-y: hidden;
}
.wrapper {
    overflow-y: auto;
}
```
> 两者结合使用更佳！

<a name="K7ror"></a>
## <br />
<a name="yBz6b"></a>
## iOS 上拉边界下拉出现白色空白

<a name="IREl0"></a>
### 表现
手指按住屏幕下拉，屏幕顶部会多出一块白色区域。手指按住屏幕上拉，底部多出一块白色区域。
<a name="YJJFH"></a>
### 产生原因
在 iOS 中，手指按住屏幕上下拖动，会触发 `touchmove` 事件。这个事件触发的对象是整个 `webview` 容器，容器自然会被拖动，剩下的部分会成空白。
<a name="4U7AV"></a>
### 解决方案
<a name="UlkBK"></a>
#### 1. 监听事件禁止滑动
移动端触摸事件有三个，分别定义为
```
1. touchstart ：手指放在一个DOM元素上。
2. touchmove ：手指拖曳一个DOM元素。
3. touchend ：手指从一个DOM元素上移开。
```
显然我们需要控制的是 `touchmove` 事件，由此我在 W3C 文档中找到了这样一段话
> Note that the rate at which the user agent sends touchmove events is implementation-defined, and may depend on hardware capabilities and other implementation details.
> If the preventDefault method is called on the first touchmove event of an active touch point, it should prevent any default action caused by any touchmove event associated with the same active touch point, such as scrolling.

**`touchmove` 事件的速度是可以实现定义的，取决于硬件性能和其他实现细节**<br />**`preventDefault` 方法，阻止同一触点上所有默认行为，比如滚动。**<br />由此我们找到解决方案，通过监听 `touchmove`，让需要滑动的地方滑动，不需要滑动的地方禁止滑动。
> 值得注意的是我们要过滤掉具有滚动容器的元素。

实现如下：
```
document.body.addEventListener('touchmove', function(e) {
    if(e._isScroller) return;
    // 阻止默认事件
    e.preventDefault();
}, {
    passive: false
});
```
<a name="ni3BV"></a>
#### 2. 滚动妥协填充空白，装饰成其他功能
在很多时候，我们可以不去解决这个问题，换一直思路。根据场景，**我们可以将下拉作为一个功能性的操作**。<br />**比如：下拉后刷新页面**<br />![](https://cdn.nlark.com/yuque/0/2020/webp/186051/1584973292780-06c3559e-c021-4d93-a838-7037a10062cd.webp#align=left&display=inline&height=473&originHeight=1326&originWidth=754&size=0&status=done&style=none&width=269)
<a name="Hxn1Y"></a>
## 页面放大或缩小不确定性行为

<a name="WaBCL"></a>
### 表现
双击或者双指张开手指页面元素，页面会放大或缩小。
<a name="IbgkD"></a>
### 产生原因
HTML 本身会产生放大或缩小的行为，比如在 PC 浏览器上，可以自由控制页面的放大缩小。但是在移动端，我们是不需要这个行为的。所以，我们需要禁止该不确定性行为，来提升用户体验。
<a name="ajKbc"></a>
### 原理与解决方案
HTML `meta` 元标签标准中有个 中 `viewport` 属性，用来控制页面的缩放，一般用于移动端。如下图 MDN 中介绍<br />![](https://cdn.nlark.com/yuque/0/2020/webp/186051/1584973292670-0ea4c1d6-5493-44ce-b397-d166244a6110.webp#align=left&display=inline&height=541&originHeight=1003&originWidth=1080&size=0&status=done&style=none&width=582)<br />移动端常规写法
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
因此我们可以设置 `maximum-scale`、`minimum-scale` 与 `user-scalable=no` 用来避免这个问题<br />

```html
<meta name=viewport
  content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no">
```
<a name="At6W3"></a>
## <br />
<a name="WBVBL"></a>
## click 点击事件延时与穿透

<a name="bePtI"></a>
### 表现
监听元素 `click` 事件，点击元素触发时间延迟约 `300ms`。<br />点击蒙层，蒙层消失后，下层元素点击触发。
<a name="pqBbU"></a>
### 产生原因
<a name="WUcpk"></a>
#### 为什么会产生 click 延时？
iOS 中的 safari，为了实现双击缩放操作，在单击 300ms 之后，如果未进行第二次点击，则执行 `click` 单击操作。也就是说来判断用户行为是否为双击产生的。但是，在 App 中，无论是否需要双击缩放这种行为，`click` 单击都会产生 300ms 延迟。
<a name="PTmlB"></a>
#### 为什么会产生 click 点击穿透？
双层元素叠加时，在上层元素上绑定 `touch` 事件，下层元素绑定 `click` 事件。由于 `click` 发生在 `touch` 之后，点击上层元素，元素消失，下层元素会触发 `click` 事件，由此产生了点击穿透的效果。
<a name="tXLZs"></a>
### 原理与解决方案
<a name="Cp3YC"></a>
#### 解决方案一：使用 touchstart 替换 click
前面已经介绍了，移动设备不仅支持点击，还支持几个触摸事件。那么我们现在基本思路就是用 `touch` 事件代替`click` 事件。<br />将 `click` 替换成 `touchstart` 不仅解决了 `click` 事件都延时问题，还解决了穿透问题。因为穿透问题是在 `touch` 和 `click` 混用时产生。<br />在原生中使用
```javascript
el.addEventListener("touchstart", () => { console.log("ok"); }, false);
```

<br />在 vue 中使用
```html
<button @touchstart="handleTouchstart()">点击</button>
```

<br />开源解决方案中，也是既提供了 `click` 事件，又提供了`touchstart` 事件。如 vant 中的 `button` 组件<br />![](https://cdn.nlark.com/yuque/0/2020/webp/186051/1584973292676-2ee3bed1-2ffb-48ec-94f8-271324dfef3b.webp#align=left&display=inline&height=170&originHeight=263&originWidth=1080&size=0&status=done&style=none&width=699)<br />**那么，是否可以将 `click` 事件全部替换成 `touchstart` 呢？为什么开源框架还会给出 `click` 事件呢？**<br />我们想象一种情景，同时需要点击和滑动的场景下。如果将 `click` 替换成 `touchstart` 会怎样？
> 事件触发顺序: `touchstart`, `touchmove`, `touchend`, `click`。

很容易想象，在我需要`touchmove`滑动时候，优先触发了`touchstart`的点击事件，是不是已经产生了冲突呢？<br />所以呢，在具有滚动的情况下，还是建议使用 `click` 处理。<br />在接下来的`fastclick`开源库中也做了如下处理。针对 `touchstart` 和 `touchend`，截取了部分源码。
```javascript
// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
// 1) the user does a fling scroll on the scrollable layer
// 2) the user stops the fling scroll with another tap
// then the event.target of the last 'touchend' event will be the element that was under the user's finger
// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
this.updateScrollParent(targetElement);
```
```javascript
// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
scrollParent = targetElement.fastClickScrollParent;
if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
	return true;
}
```
主要目的就是，在使用 `touchstart` 合成 `click` 事件时，保证其不在滚动的父元素之下。
<a name="kXM7Q"></a>
#### <br />
<a name="y87OQ"></a>
#### 解决方案二：使用 fastclick 库
使用 `npm/yarn` 安装后使用
```
import FastClick from 'fastclick';
FastClick.attach(document.body, options);
```
同样，使用`fastclick`库后，`click` 延时和穿透问题都没了<br />按照我的惯例，只要涉及开源库，那么我们一定要去了解它实现的原理。主要是将现有的原生事件集合封装合成一个兼容性较强的事件集合。<br />fastclick源码 核心代码不长， 1000 行不到。有兴趣可以了解一下!
<a name="UbO16"></a>
## <br />
<a name="gHC0b"></a>
## 软键盘将页面顶起来、收起未回落问题

<a name="rggs2"></a>
### 表现
Android 手机中，点击 `input` 框时，键盘弹出，将页面顶起来，导致页面样式错乱。<br />移开焦点时，键盘收起，键盘区域空白，未回落。
<a name="3vuem"></a>
### 产生原因
我们在app 布局中会有个固定的底部。安卓一些版本中，输入弹窗出来，会将解压 `absolute` 和 `fixed` 定位的元素。导致可视区域变小，布局错乱。
<a name="Y0xsS"></a>
### 原理与解决方案
软键盘将页面顶起来的解决方案，主要是通过监听页面高度变化，强制恢复成弹出前的高度。
```javascript
// 记录原有的视口高度
const originalHeight = document.body.clientHeight || document.documentElement.clientHeight;
window.onresize = function(){
  var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
  if(resizeHeight < originalHeight ){
    // 恢复内容区域高度
    // const container = document.getElementById("container")
    // 例如 container.style.height = originalHeight;
  }
}
```
键盘不能回落问题出现在 iOS 12+ 和 wechat 6.7.4+ 中，而在微信 H5 开发中是比较常见的 Bug。<br />兼容原理，1.判断版本类型 2.更改滚动的可视区域
```javascript
const isWechat = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
if (!isWechat) return;
const wechatVersion = wechatInfo[1];
const version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
 
 // 如果设备类型为iOS 12+ 和wechat 6.7.4+，恢复成原来的视口
if (+wechatVersion.replace(/\./g, '') >= 674 && +version[1] >= 12) {
  window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
}
```
> `window.scrollTo(x-coord, y-coord)`，其中`window.scrollTo(0, clientHeight)`恢复成原来的视口

<a name="1M65y"></a>
## <br />
<a name="BEqEb"></a>
## iPhone X系列安全区域适配问题

<a name="u0zcm"></a>
### 表现
头部刘海两侧区域或者底部区域，出现刘海遮挡文字，或者呈现黑底或白底空白区域。
<a name="SvZZj"></a>
### 产生原因
iPhone X 以及它以上的系列，都采用**刘海屏设计**和**全面屏手势**。头部、底部、侧边都需要做特殊处理。才能适配 iPhone X 的特殊情况。
<a name="W3qPI"></a>
### 解决方案
**设置安全区域，填充危险区域，危险区域不做操作和内容展示。**
> 危险区域指头部不规则区域，底部横条区域，左右触发区域。

![](https://cdn.nlark.com/yuque/0/2020/webp/186051/1584973292709-970ada98-9c73-41ed-ae93-0866ceb7f069.webp#align=left&display=inline&height=375&originHeight=574&originWidth=1080&size=0&status=done&style=none&width=710)<br />具体操作为：`viewport-fit` `meta` 标签设置为 `cover`，获取所有区域填充。判断设备是否属于 iPhone X，给头部底部增加**适配层**
> `viewport-fit` 有 3 个值分别为：
> - `auto`：此值不影响初始布局视图端口，并且整个web页面都是可查看的。
> - `contain`：视图端口按比例缩放，以适合显示内嵌的最大矩形。
> - `cover`：视图端口被缩放以填充设备显示。强烈建议使用 `safe area inset` 变量，以确保重要内容不会出现在显示之外。

<a name="S4Yj6"></a>
#### <br />
<a name="UQdL9"></a>
#### 设置 viewport-fit 为 `cover`
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, viewport-fit=cover">
```
<a name="inDm8"></a>
#### <br />
<a name="ITb7W"></a>
#### 增加适配层
使用 `safe area inset` 变量
```css
/* 适配 iPhone X 顶部填充*/
@supports (top: env(safe-area-inset-top)){
  body,
  .header{
      padding-top: constant(safe-area-inset-top, 40px);
      padding-top: env(safe-area-inset-top, 40px);
      padding-top: var(safe-area-inset-top, 40px);
  }
}
/* 判断iPhoneX 将 footer 的 padding-bottom 填充到最底部 */
@supports (bottom: env(safe-area-inset-bottom)){
    body,
    .footer{
        padding-bottom: constant(safe-area-inset-bottom, 20px);
        padding-bottom: env(safe-area-inset-bottom, 20px);
        padding-top: var(safe-area-inset-bottom, 20px);
    }
}
```
> `safe-area-inset-top`, `safe-area-inset-right`, `safe-area-inset-bottom`, `safe-area-inset-left` `safe-area-inset-*`由四个定义了视口边缘内矩形的 `top`, `right`, `bottom` 和 `left` 的环境变量组成，这样可以安全地放入内容，而不会有被非矩形的显示切断的风险。对于矩形视口，例如普通的笔记本电脑显示器，其值等于零。对于非矩形显示器（如圆形表盘，`iPhoneX` 屏幕），在用户代理设置的四个值形成的矩形内，所有内容均可见。

其中 `env()` 用法为 `env( <custom-ident> , <declaration-value>? )`，第一个参数为自定义的区域，第二个为备用值。<br />其中 `var()` 用法为 `var( <custom-property-name> , <declaration-value>? )`，作用是在 `env()` 不生效的情况下，给出一个备用值。<br />`constant（）` 被 `css` 2017-2018 年为草稿阶段，是否已被标准化未知。而其他iOS 浏览器版本中是否有此函数未知，作为兼容处理而添加进去。<br />详情请查看文章末尾的参考资料。
<a name="1Mgzd"></a>
#### 兼容性
![](https://cdn.nlark.com/yuque/0/2020/webp/186051/1584973292674-a2dab6c3-2d03-4b0c-be10-4e4a1e95a2bb.webp#align=left&display=inline&height=208&originHeight=303&originWidth=1080&size=0&status=done&style=none&width=746)
<a name="eHt6L"></a>
## <br />
<a name="a0OxU"></a>
## 页面生成为图片和二维码问题

<a name="3vKdi"></a>
### 表现
在工作中有需要将页面生成图片或者二维码的需求。可能我们第一想到的，交给后端来生成更简单。但是这样我们需要把页面代码全部传给后端，网络性能消耗太大。
<a name="4j1dZ"></a>
### 解决方案
<a name="5ebSb"></a>
#### 生成二维码
使用 QRCode 生成二维码
```javascript
import QRCode from 'qrcode';
// 使用 async 生成图片
const options = {};
const url = window.location.href;
async url => {
  try {
    console.log(await QRCode.toDataURL(url, options))
  } catch (err) {
    console.error(err);
  }
}
```
将 `await QRCode.toDataURL(url, options)` 赋值给 图片 `url` 即可
<a name="8BT6Q"></a>
#### 生成图片
主要是使用 `htmlToCanvas` 生成 `canvas` 画布
```javascript
import html2canvas from 'html2canvas';
html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
});
```
但是不单单在此处就完了，由于是 `canvas` 的原因。移动端生成出来的图片比较模糊。<br />我们使用一个新的 `canvas` 方法多倍生成，放入一倍容器里面，达到更加清晰的效果，通过超链接下载图片 **下载文件简单实现，更完整的实现方式之后更新**
```javascript
const scaleSize = 2;
const newCanvas = document.createElement("canvas");
const target = document.querySelector('div');
const width = parseInt(window.getComputedStyle(target).width);
const height = parseInt(window.getComputedStyle(target).height);
newCanvas.width = width * scaleSize;
newCanvas.height = widthh * scaleSize;
newCanvas.style.width = width + "px";
newCanvas.style.height =width + "px";
const context = newCanvas.getContext("2d");
context.scale(scaleSize, scaleSize);
html2canvas(document.querySelector('.demo'), { canvas: newCanvas }).then(function(canvas) {
  // 简单的通过超链接设置下载功能
  document.querySelector(".btn").setAttribute('href', canvas.toDataURL());
}
```
> 根据需要设置 `scaleSize` 大小

<a name="7EVcY"></a>
## <br />
<a name="orluD"></a>
## 微信公众号分享问题

<a name="Jlo16"></a>
### 表现
在微信公众号 H5 开发中，页面内部点击分享按钮调用 SDK，方法不生效。
<a name="d87PA"></a>
### 解决方案
<a name="ICGBj"></a>
#### 解决方法：添加一层蒙层，做分享引导。
因为页面内部点击分享按钮无法直接调用，而分享功能需要点击右上角更多来操作。<br />然后用户可能不知道通过右上角小标里面的功能分享。又想引导用户分享，这时应该怎么做呢？<br />技术无法实现的，从产品出发。<br />![](https://cdn.nlark.com/yuque/0/2020/webp/186051/1584973292687-c9f1db44-c5b1-44bc-a76e-36e4376861ae.webp#align=left&display=inline&height=492&originHeight=574&originWidth=328&size=0&status=done&style=none&width=281)<br />**如果技术上实现复杂，或者直接不能实现。不要强行钻牛角尖哦，学会怼产品，也是程序员必备的能力之一。**
<a name="A3uQI"></a>
## <br />
<a name="QSYes"></a>
## H5 调用 SDK 相关解决方案

<a name="xHZv1"></a>
### 产生原因
在 Hybrid App 中使用 H5 是最常见的不过了，刚接触的，肯定会很生疏模糊。不知道 H5 和 Hybrid 是怎么交互的。怎样同时支持 iOS 和 Android 呢？现在来谈谈 Hybrid 技术要点，**原生与 H5 的通信**。
<a name="KXfLZ"></a>
### 解决方案
![](https://cdn.nlark.com/yuque/0/2020/webp/186051/1584973292800-3d01c42f-0012-4518-af08-c2d6df5c6d19.webp#align=left&display=inline&height=36&originHeight=278&originWidth=1080&size=0&status=done&style=none&width=140)使用 `DSBridge` 同时支持 iOS 与 Android
> 文档见参考资料

<a name="Xj9KC"></a>
#### SDK小组 提供方法

1. 注册方法 `bridge.register`
```javascript
bridge.register('enterApp', function() {
  broadcast.emit('ENTER_APP')
})
```

2. 回调方法 `bridge.call`
```javascript
export const getSDKVersion = () => bridge.call('BLT.getSDKVersion')
```
<a name="o3E7U"></a>
#### 事件监听与触发法
```javascript
const broadcast = {
  on: function(name, fn, pluralable) {
    this._on(name, fn, pluralable, false)
  },
  once: function(name, fn, pluralable) {
    this._on(name, fn, pluralable, true)
  },
  _on: function(name, fn, pluralable, once) {
    let eventData = broadcast.data
    let fnObj = { fn: fn, once: once }
    if (pluralable && Object.prototype.hasOwnProperty.call(eventData, 'name')) {
      eventData[name].push(fnObj)
    } else {
      eventData[name] = [fnObj]
    }
    return this
  },
  emit: function(name, data, thisArg) {
    let fn, fnList, i, len
    thisArg = thisArg || null
    fnList = broadcast.data[name] || []
    for (i = 0, len = fnList.length; i < len; i++) {
      fn = fnList[i].fn
      fn.apply(thisArg, [data, name])
      if (fnList[i].once) {
        fnList.splice(i, 1)
        i--
        len--
      }
    }
    return this
  },
  data: {}
}
export default broadcast
```
<a name="mWkqQ"></a>
#### 踩坑注意
方法调用前，一定要判断 SDK 是否提供该方法 如果 Android 提供该方法，iOS 上调用就会出现一个方法**调用失败等弹窗**。怎么解决呢？<br />提供一个判断是否 Android、iOS。根据设备进行判断
```javascript
export const hasNativeMethod = (name) =>
  return bridge.hasNativeMethod('BYJ.' + name)
}
export const getSDKVersion = function() {
  if (hasNativeMethod('getSDKVersion')) {
    bridge.call('BYJ.getSDKVersion')
  }
}
```
> 同一功能需要iOS，Android方法名相同，这样更好处理哦

<a name="EMvSQ"></a>
## <br />
<a name="lUN21"></a>
## H5 调试相关方案策略

<a name="RIuUu"></a>
### 表现
调试代码一般就是为了**查看数据**和**定位 bug**。分为两种场景，一种是开发和测试时调试，一种是生产环境上调试。
> 为什么有生产环境上调试呢？有些时候测试环境上没法复现这个 bug，测试环境和生产环境不一致，此时就需要紧急生产调试。

在 PC 端开发时，我们可以直接掉出控制台，使用浏览器提供的工具操作devtools或者查看日志。但是在 App 内部我们怎么做呢？
<a name="zEOM7"></a>
### 原理与解决方案
<a name="RHoFl"></a>
#### 1. `vconsole` 控制台插件
使用方法也很简单
```javascript
import Vconsole from 'vconsole'
new Vconsole()
```
![](https://cdn.nlark.com/yuque/0/2020/webp/186051/1584973292698-5c2c8fc5-cebf-4773-b0d3-1f424f1c58a9.webp#align=left&display=inline&height=557&originHeight=810&originWidth=1080&size=0&status=done&style=none&width=742)<br />有兴趣看看它实现的基本原理，我们关注的点应该在 **vsconsole 如何打印出我们所有 log 的** 腾讯开源vconsole<br />上述方法仅用于开发和测试。**生产环境中不允许出现，所以，使用时需要对环境进行判断。**
```javascript
import Vconsole from 'vconsole'
if (process.env.NODE_ENV !== 'production') {
    new Vconsole()
}
```
<a name="5XaN3"></a>
#### 2. 代理 + spy-debugger
操作稍微有点麻烦，不过我会详细写出，大致分为 4 个步骤

1. 安装插件(全局安装)
```
sudo npm install spy-debugger -g
```

2. 手机与电脑置于同一 wifi 下，手机设置代理

设置手机的 HTTP 代理，代理 IP 地址设置为 PC 的 IP 地址，端口为`spy-debugger`的启动端口
> spy-debugger 默认端口：9888
> Android ：设置 - WLAN - 长按选中网络 - 修改网络 - 高级 - 代理设置 - 手动
> IOS ：设置 - Wi-Fi - 选中网络, 点击感叹号, HTTP 代理手动

3. 手机打开浏览器或者 app 中 H5 页面
3. 打开桌面日志网站进行调试，点击 npm 控制台监听地址。查看抓包和 H5 页面结构

**这种方式可以调试生成环境的页面，不需要修改代码，可以应付大多数调试需求**
<a name="ea0Lw"></a>
# 总结
本篇文章耗费作者一个多星期的业余时间，存手工敲打 4500 +字，同时收集，整理之前很多坑点和边写作边**思考**和**总结**。如果能对你有帮助，便是它最大的价值。都看到这里还不**点赞**，太过不去啦！😄<br />由于技术水平有限，文章中如有错误地方，请在评论区指出，感谢！<br />关于移动端 H5 的文章告一段落了，之后实践中遇到的问题都将在此文中更新。另外准备做一个移动端 H5 开源项目。多关注下 我的github动态哦！<br />之后，应该回去研究下**开源和面试题相关内容**分享，想持续了解更多，不妨**点赞**和**关注**呗。
