## 🏝 1. 快速入门

### 1.1 概念介绍

[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) 是现代浏览器提供的用于监测 DOM 元素交叉状态的 API。通过使用 Intersection Observer API，我们可以轻松地**判断一个元素是否进入或离开可视区域**，从而实现各种交互效果和懒加载等功能。

### 1.2 作用和使用场景

Intersection Observer API 可以用于实现各种各样的交互效果和懒加载等功能。常见的使用场景包括：

- 图片懒加载——当图片滚动到可见时才进行加载
- 内容无限滚动——也就是用户滚动到接近内容底部时直接加载更多，而无需用户操作翻页，给用户一种网页可以无限滚动的错觉
- 检测广告的曝光情况——为了计算广告收益，需要知道广告元素的曝光情况
- 在用户看见某个区域时执行任务或播放动画

## 🎨 2. 如何使用

Intersection Observer API 的使用非常简单，它只需要一个回调函数和一个配置对象，其中回调函数会在目标元素进入或离开交叉区域时被触发，配置对象可以设置一些参数，比如 root、rootMargin 和 threshold。

### 2.1 示例代码

以下是一个简单的示例，可以帮助我们快速上手：

```javascript
// 目标元素
const targetElement = document.querySelector(".target");

// 创建 Intersection Observer 实例
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 目标元素进入可视区域
        console.log("目标元素进入可视区域");
      } else {
        // 目标元素离开可视区域
        console.log("目标元素离开可视区域");
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  }
);

// 开始观察目标元素
observer.observe(targetElement);
```

在这个示例中，首先使用 `querySelector` 方法选择一个目标元素。
然后创建一个 Intersection Observer 实例，并传入一个回调函数，该回调函数将在**目标元素进入或离开可视区域时被触发**。
最后，通过调用 `observe` 方法开始观察目标元素。当目标元素进入或离开可视区域时，回调函数中的相应代码将被执行，并打印相应的消息到控制台。

### 2.2 参数介绍

下面是对 Intersection Observer API 的参数进行介绍：

1. 回调函数 (`callback`)：
   - 用于指定观察器的回调函数，当目标元素进入或离开交叉区域时被触发。
   - 回调函数接收一个参数，即 `entries` 数组，其中包含一个或多个 IntersectionObserverEntry 对象，每个对象代表一个目标元素的交叉状态。
2. 选项 (`options`)：
   - `root`：指定**根元素**，即目标元素与其交叉状态将被观察的祖先元素，默认为视口 (viewport)。
   - `rootMargin`：指定**根元素的边界偏移量**，用于扩展或缩小交叉区域的大小。
   - `threshold`：指定**一个阈值或阈值数组**，表示目标元素可见度的百分比，用于触发回调函数。例如，0.5 表示目标元素至少一半可见时触发回调。

## 🧭 3. 实际应用

Intersection Observer API 可以用于实现各种各样的交互效果和懒加载等功能。下面是一些实际应用的例子。

### 3.1 图片懒加载

图片懒加载是 Intersection Observer API 最常见的应用之一。通过监听图片元素是否进入可视区域，我们可以实现图片的懒加载，从而提升页面性能。

```html
<img data-src="image.jpg" />

<script>
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => {
    observer.observe(img);
  });
</script>
```

在上面的代码中，我们给图片元素添加了一个 `data-src` 属性来存放图片的真实地址。然后创建了一个新的 IntersectionObserver 实例，观察所有的图片元素。当一个图片元素进入可视区域时，我们就把 `data-src` 属性赋值给 `src` 属性，从而实现图片的懒加载。

### 3.2 无限滚动

无限滚动是一种常见的 UI 设计，它可以让用户在滚动时无限加载更多的内容。通过监听最后一个元素是否进入可视区域，我们可以实现无限滚动。

```html
<div id="content">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <!-- ... -->
  <div class="item">Item N</div>
</div>

<script>
  const content = document.getElementById("content");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target === content.lastElementChild) {
          // 加载更多内容
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  observer.observe(content.lastElementChild);
</script>
```

在上面的代码中，我们给最后一个元素添加了一个 IntersectionObserver 实例，当最后一个元素进入可视区域时，我们就可以触发加载更多内容的操作。

### 3.3 跟随导航栏

通过监听某个元素是否进入或离开可视区域，我们可以实现一些有趣的效果，比如跟随导航栏。

```html
<header>
  <!-- 导航栏 -->
</header>

<section class="content">
  <!-- 页面内容 -->
</section>

<script>
  const header = document.querySelector("header");
  const content = document.querySelector(".content");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 目标元素进入可视区域
          header.classList.add("fixed");
        } else {
          // 目标元素离开可视区域
          header.classList.remove("fixed");
        }
      });
    },
    {
      root: null,
      rootMargin: "-100px",
      threshold: 0,
    }
  );

  observer.observe(content);
</script>
```

在上面的代码中，我们创建了一个 IntersectionObserver 实例，观察页面内容元素。当页面内容元素进入可视区域时，我们就让导航栏固定在页面顶部。当页面内容元素离开可视区域时，我们就让导航栏恢复原来的位置。

## 📋 4. 兼容性和优缺点

### 4.1 兼容性

以下是 IndexedDB API 的兼容性列表，包含了主流浏览器及其支持的最低版本：

- Chrome 51+✅
- Firefox 55+✅
- Safari 12.1+✅
- Edge 15+✅
- Oper 38+✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1685625722611-783d17bf-249e-4e5c-8a9b-413510b4324f.png#averageHue=%2331291e&clientId=u37f57fe9-198f-4&from=paste&height=1572&id=u9c0ac86b&originHeight=1572&originWidth=2914&originalType=binary&ratio=1&rotation=0&showTitle=false&size=404282&status=done&style=none&taskId=u97350999-03f3-4274-8f7a-8bba1cd0134&title=&width=2914)
也可以在 [caniuse.com](https://caniuse.com/intersectionobserver) 上查看具体的兼容性信息。

### 4.2 优缺点

优点

- 能够实现各种各种交互效果和懒加载等功能，提升用户体验。
- 能够优化页面性能，避免不必要的网络请求和计算。

缺点

- 兼容性较差，需要使用 polyfill 进行兼容。
- 可能会影响页面性能，如果监听的目标元素过多，会导致浏览器频繁触发回调函数。

### 4.3 工具推荐

以下是一些常用的 Intersection Observer API 工具和库：

- [Lax.js](https://github.com/alexfoxy/lax.js)：9.8K ⭐，Lax.js 是一个轻量级的滚动动画库，它使用 Intersection Observer API 来观察元素与视口的交叉情况，并在滚动时触发自定义的动画效果，例如平移、缩放和旋转等。Simple & lightweight (<4kb gzipped) vanilla JavaScript library to create smooth & beautiful animations when you scroll.
- [lozad.js](https://github.com/ApoorvSaxena/lozad.js)：7.3K ⭐，一个轻量级的图片懒加载库，使用 IntersectionObserver API，在纯 JS 中具有高性能、轻量级和可配置的惰性加载程序，不依赖于图像、 iframe 等。Highly performant, light ~1kb and configurable lazy loader in pure JS with no dependencies for responsive images, iframes and more
- [Scrollama](https://github.com/russellgoldenberg/scrollama)：5.6K ⭐， Scrollama 是一个用于创建滚动交互效果的 JavaScript 库。它使用 Intersection Observer API 来观察目标元素与视口的交叉情况，并触发自定义的回调函数，从而实现根据滚动位置来触发动画或其他交互效果。Scrollytelling with IntersectionObserver.
- [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)：4.1K ⭐，一个 React 组件，使用 Intersection Observer API 实现监听视图中元素进入和离开。React implementation of the Intersection Observer API to tell you when an element enters or leaves the viewport.

## 🎯 5. 使用建议和注意事项

- 尽量减少监听目标元素的数量，避免影响页面性能。
- 注意设置 root 和 rootMargin 参数，以确保正确地观察目标元素。
- 如果需要在回调函数中修改 DOM，建议使用 requestAnimationFrame() 函数，以免触发多次重排和重绘。

## 🍭 6. 总结

Intersection Observer API 是一个用于监测 DOM 元素交叉状态的 API，可以用于实现各种各样的交互效果和懒加载等功能。本文介绍了 Intersection Observer API 的快速入门、实际应用、兼容性和优缺点，并推荐了一些常用的工具和库。在使用 Intersection Observer API 时，需要注意一些使用建议和注意事项，以确保正确地观察目标元素，提升页面性能。

## 📚 7. 拓展阅读

- [MDN Web Docs：Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Google Developers：Loading Third-Party JavaScript](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript)
- [Smashing Magazine：Native Lazy Loading For The Web](https://www.smashingmagazine.com/native-lazy-loading/)
- [CSS-Tricks：A Few Functional Uses for Intersection Observer to Know When an Element is in View](https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/)
