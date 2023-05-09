## 🏝 什么是 Resize Observer API

[Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API) 可以帮助我们监听元素尺寸的变化，并在尺寸变化时执行一些操作。例如，我们可以使用 Resize Observer API 来动态调整 UI 布局、加载或卸载图片等。

## 🎨 如何使用 Resize Observer API

使用 Resize Observer API 非常简单。接下来我会通过 3 个使用示例带大家熟悉 Resize Observer API。

### 1.监听元素尺寸的变化

在实际应用中，我们通常需要**监听元素尺寸的变化**，并在**尺寸变化时执行一些操作**。例如，我们可能需要动态调整 UI 布局，以适应不同尺寸的屏幕或设备。下面是一个监听元素尺寸变化的示例：

```javascript
// 创建一个 ResizeObserver 实例
const observer = new ResizeObserver((entries) => {
  for (let entry of entries) {
    console.log(entry.target, entry.contentRect);

    // 动态调整 UI 布局
    const { width, height } = entry.contentRect;
    // ...
  }
});

// 监听一个元素
const element = document.getElementById("my-element");
observer.observe(element);
```

在上面的示例中，我们使用 Resize Observer API 来监听 ID 为 "my-element" 的元素的尺寸变化。在回调函数中，我们可以获取元素的尺寸信息，并使用这些信息来动态调整 UI 布局。

### 2.监听元素内部的尺寸变化

除了监听元素本身的尺寸变化外，我们还可以监听**元素内部**的尺寸变化。例如，当元素内部的文本或图像发生变化时，我们可能需要重新计算元素的尺寸，并相应地调整 UI 布局。下面是一个监听元素内部尺寸变化的示例：

```javascript
// 创建一个 ResizeObserver 实例
const observer = new ResizeObserver((entries) => {
  for (let entry of entries) {
    console.log(entry.target, entry.contentRect);

    // 动态调整 UI 布局
    const { width, height } = entry.contentRect;
    // ...
  }
});

// 监听一个元素的内部尺寸变化
const element = document.getElementById("my-element");
observer.observe(element, { box: "content-box" });
```

在上面的示例中，我们使用 Resize Observer API 来监听 ID 为 "my-element" 的**元素内部**的尺寸变化。我们传递了一个选项对象，其中 `box` 属性设置为 `content-box`，表示要监听元素内部的尺寸变化。

### 3.React 中使用 Resize Observer API

当然，我们也可以在 React 或 Vue 中使用，还可以使用第三方库来简化 Resize Observer API 的使用。例如，在 React 中，您可以使用 `react-resize-observer` 库来监听元素的尺寸变化。以下是一个使用 react-resize-observer 库的示例：

```jsx
import React, { useState } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import { useResizeObserver } from "react-resize-observer";

function MyComponent() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const onResize = (entry) => {
    const { width, height } = entry.contentRect;
    setWidth(width);
    setHeight(height);
  };

  const { ref } = useResizeObserver({ onResize, polyfill: ResizeObserver });

  return <div ref={ref}>My content goes here</div>;
}
```

在上面的示例中，我们使用了 [react-resize-observer](https://github.com/bootstarted/react-resize-observer) 和 [@juggle/resize-observer](https://github.com/juggle/resize-observer) 两个库来监听元素的尺寸变化。我们使用 `useResizeObserver()` hook 来创建一个 ResizeObserver 实例，并在回调函数中更新组件的状态。

## 👍 Resize Observer API 的实际应用

Resize Observer API 可以在很多实际场景中使用。下面是一些常见的应用场景：

### 1.响应式布局

使用 Resize Observer API 可以轻松实现**响应式布局**。例如，当屏幕尺寸发生变化时，我们可以监听根元素的尺寸变化，并相应地调整 UI 布局。
以下是使用 Resize Observer API 实现的示例代码：

```html
<!-- 响应式布局示例代码 -->
<div class="container" id="responsive-container">
  <div class="row">
    <div class="col-sm-4">
      <p>First column content</p>
    </div>
    <div class="col-sm-4">
      <p>Second column content</p>
    </div>
    <div class="col-sm-4">
      <p>Third column content</p>
    </div>
  </div>
</div>

<script>
  const container = document.getElementById("responsive-container");

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width } = entry.contentRect;
      if (width >= 768) {
        container.classList.add("large-device");
      } else {
        container.classList.remove("large-device");
      }
    }
  });

  resizeObserver.observe(container);
</script>

<style>
  .large-device .col-sm-4 {
    width: 33.33%;
  }
</style>
```

### 2.图片懒加载

使用 Resize Observer API 可以实现**图片懒加载**。例如，当图片元素进入可视区域时，我们可以监听其尺寸变化，并在元素完全加载后显示图片。
以下是一个使用 Resize Observer API 实现图片懒加载的示例代码：

```html
<!-- HTML -->
<img data-src="https://example.com/image.jpg" alt="My image" />

<script>
  // JavaScript
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-src");
        if (src) {
          img.setAttribute("src", src);
          img.removeAttribute("data-src");
        }
      }
    }
  });

  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => {
    observer.observe(img);
  });
</script>
```

在上面的代码中，我们使用 Resize Observer API 来监听图片元素的尺寸变化。当图片元素进入可视区域时，我们将其 `data-src` 属性中的 URL 赋值给其 `src` 属性，从而实现图片懒加载的效果。同时，我们使用 Intersection Observer API 来监听图片元素是否进入可视区域。
注意，在上面的代码中，我们还需要为图片元素设置一个 `data-src` 属性，其中包含要加载的图片的 URL。这样可以避免在页面加载时立即加载所有图片，从而提高页面性能。

### 3.自适应 UI 组件

使用 Resize Observer API 可以轻松实现自适应 UI 组件。例如，当 UI 组件内部的元素数量或尺寸发生变化时，我们可以监听其尺寸变化，并相应地调整 UI 布局。

## 🧭 Resize Observer API 的兼容性

Resize Observer API 是一个比较新的 Web API，目前仅在现代浏览器中得到支持。以下是 Resize Observer API 的兼容性情况：

- Chrome 64+ ✅
- Firefox 69+ ✅
- Safari 14.1+ ✅
- Edge 79+ ✅
- Opera 51+ ✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1683609794997-4bd11158-086d-4ada-8401-ed39fe08e273.png#averageHue=%23ddcab0&clientId=u1da9896d-cbb4-4&from=paste&height=571&id=u4665fcad&originHeight=571&originWidth=1421&originalType=binary&ratio=1&rotation=0&showTitle=false&size=84946&status=done&style=none&taskId=u7cfac091-67dc-4053-971a-cfb92373114&title=&width=1421)

详细兼容性情况可以在 [Can I Use](https://caniuse.com/?search=Resize%20Observer%20API) 网站上查看。

## 📋 Resize Observer API 优缺点

接下来看看 Resize Observer API 的优点和缺点：

### 1.优点

- 可以用于检测元素大小的变化，而无需轮询或使用其他检测技术。
- 它能够监听**多个元素**的大小变化，并且只在元素大小发生变化时才会触发回调函数。
- 可以检测到**任何元素**的大小变化，不仅限于可见元素。
- 相比于其他检测技术（如 `window.resize` 事件），Resize Observer API 更加稳定，因为它可以避免由于事件的频繁触发而导致的性能问题。

### 2.缺点

- 不是所有浏览器都支持，特别是较旧的浏览器。
- 因为 Resize Observer API 的回调函数是异步执行的，所以它不能保证在元素大小变化之后立即执行。
- Resize Observer API 不会提供元素的具体大小值，只提供了尺寸的变化信息。如果需要获取元素的具体大小值，开发人员需要自己计算。

## 🎯 总结

在本文中，我们介绍了 Resize Observer API 的基本使用方法，并提供了一些示例代码来帮助大家更好地理解和使用该 API。希望本文能够帮助您更好地理解和使用 Resize Observer API。
如果您想了解更多信息，请参阅下面的参考资料：

- [MDN Web Docs: Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
- [W3C: Resize Observer](https://www.w3.org/TR/resize-observer/)
