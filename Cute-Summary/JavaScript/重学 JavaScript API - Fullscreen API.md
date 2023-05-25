本文中，我们将探索 Fullscreen API 的概念、使用方法、实际应用、兼容性和优缺点，并提供一些建议和注意事项。让我们一起深入了解吧！

## 🔍 1. 什么是 Fullscreen API

### 1.1 概念介绍

Fullscreen API 是一组用于控制网页全屏显示的 JavaScript 方法和属性。它允许开发者通过 JavaScript 代码将网页中的特定元素或整个文档切换到全屏模式，以便更好地利用屏幕空间。
通过 Fullscreen API，开发者可以通过按键、鼠标点击或触摸手势等方式触发全屏切换，并在全屏状态下进行自定义的交互和操作。

### 1.2 作用和使用场景

Fullscreen API 的作用在于提供更好的用户体验和交互方式。它可以在特定场景中增强网页的功能性，例如：

- 视频播放器：在观看视频时，通过将视频元素全屏显示，可以提供更沉浸式的观影体验。
- 游戏应用：在游戏应用中，全屏模式可以消除干扰，使玩家能够专注于游戏内容。
- 演示文稿：通过将演示文稿全屏显示，可以确保观众集中注意力，展示出更好的视觉效果。
- 图片浏览器：在浏览图片时，将图片全屏显示可以提供更大的展示区域，使用户能够更好地欣赏图片细节。

Fullscren API 的使用场景丰富多样，可以根据具体需求来应用。

## 💻 2. 如何使用 Fullscreen API

Fullscreen API 提供了一组方法和属性，用于实现全屏显示和控制。下面是一些常用的方法和属性：

- `document.documentElement.requestFullscreen()`: 这个方法将整个文档切换到全屏模式。
- `element.requestFullscreen()`: 这个方法将指定的元素切换到全屏模式。
- `document.exitFullscreen()`: 这个方法用于退出全屏模式。
- `document.fullscreenElement`: 这个属性返回当前处于全屏状态的元素，如果没有元素处于全屏状态，则返回 null。
- `document.fullscreenEnabled`: 这个属性表示当前环境是否支持 Fullscreen API。

下面是一个简单的使用示例，用于将文档切换到全屏模式：

```javascript
const button = document.querySelector("button");
button.addEventListener("click", () => {
  document.documentElement.requestFullscreen();
});
```

在这个例子中，我们获取了一个按钮元素，当按钮被点击时，我们调用 `requestFullscreen() `方法，将整个文档切换到全屏模式。当用户想要退出全屏模式时，可以按 Esc 键或调用 `exitFullscreen()` 方法。

## 🚀 3. 实际应用

Fullscreen API 可以应用于各种不同的场景中。下面是一些实际应用的示例：

- 视频播放器：通过 Fullscreen API，可以将视频元素切换到全屏模式，提供更好的观影体验。
- 游戏应用：在游戏应用中，全屏模式可以消除干扰，提供更好的游戏体验。
- 演示文稿：通过 Fullscreen API，可以将演示文稿全屏显示，确保观众集中注意力，展示出更好的视觉效果。
- 图片浏览器：在浏览图片时，将图片全屏显示可以提供更大的展示区域，使用户能够更好地欣赏图片细节。

除此之外，Fullscreen API 还可以应用于各种需要全屏显示的场景中。

接下来使用 Fullscreen API 实现图片全屏展示的示例：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Fullscreen Image Demo</title>
    <style>
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    </style>
  </head>
  <body>
    <button id="fullscreen-btn">Fullscreen</button>
    <img src="https://picsum.photos/1200/800" alt="Demo Image" />
    <script>
      const fullscreenBtn = document.querySelector("#fullscreen-btn");
      const image = document.querySelector("img");

      fullscreenBtn.addEventListener("click", () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          image.requestFullscreen();
        }
      });
    </script>
  </body>
</html>
```

按照类似实现方式，可以实现视频全屏播放、PPT 全屏播放等效果。

## 🎯 4. 兼容性和优缺点

### 4.1 兼容性

以下是 Fullscreen API 的兼容性列表，包含了主流浏览器及其支持的最低版本：

- Chrome 15+✅
- Firefox 10+✅
- Safari 5.1+✅
- Edge 12+✅
- Opera 12.1+✅
- Internet Explorer 11+✅
- iOS Safari 4.2+✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1684224891456-b2f583d5-95d5-435e-9c72-f523831f8f73.png#averageHue=%23d8c7a9&clientId=uf6801929-40a6-4&from=paste&height=752&id=u831773b9&originHeight=752&originWidth=1438&originalType=binary&ratio=1&rotation=0&showTitle=false&size=132980&status=done&style=none&taskId=u10f35755-cfc4-4630-a13d-6b84eef1e2b&title=&width=1438)
可以在 [Can I use](https://caniuse.com/?search=Fullscreen) 网站上查看 Fullscreen API 的兼容性详情。

### 4.2 优缺点

使用 Fullscreen API 可以提供更好的用户体验和交互方式，但是也存在一些缺点。下面是一些优缺点的总结：
优点：

- 提供更好的用户体验和交互方式。
- 可以在特定场景中增强网页的功能性。

缺点：

- 兼容性问题，不同浏览器的支持程度不同。
- 部分用户可能不喜欢全屏模式，可能会选择手动退出全屏。

### 4.3 工具推荐

以下是几个基于 Fullscreen API 实现的 GitHub 仓库：

1. [fullPage.js](https://github.com/alvarotrigo/fullPage.js)：34.6k⭐，一个基于 Fullscreen API 的全屏滚动库，支持多种效果和自定义配置。

2. [screenfull.js](https://github.com/sindresorhus/screenfull.js)：6.8k⭐，一个小巧的 Fullscreen API 库，支持多种浏览器和设备。

3. [BigVideo.js](https://github.com/dfcb/BigVideo.js)：2.3k⭐，一个基于 Fullscreen API 的视频背景库，支持多种视频格式和配置选项。

## ✨ 5. 使用建议和注意事项

在使用 Fullscreen API 时，以下是一些建议和注意事项：

- 请确保提供合适的用户控制方式，让用户可以自由切换全屏模式和退出全屏模式。
- 在切换到全屏模式时，注意调整页面布局和样式，以适应全屏显示。
- 注意处理兼容性问题，提供备选方案或回退策略，以便在不支持 Fullscreen API 的浏览器中提供良好的用户体验。

## 🔚 6. 总结

本文介绍了 Fullscreen API，它是一种用于控制浏览器全屏显示的 JavaScript API。通过 Fullscreen API，开发者可以提供更好的用户体验和交互方式。

## 📚 7. 拓展阅读

- [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API): Mozilla Developer Network 对 Fullscreen API 的详细文档。
- [Using the Fullscreen API in web browsers](https://www.sitepoint.com/use-html5-full-screen-api/): SitePoint 的文章，介绍如何在网页中使用 Fullscreen API。
- [HTML Fullscreen API Specification](https://fullscreen.spec.whatwg.org/): Fullscreen API 的规范文档，提供了更深入的技术细节。

希望本文能帮助你了解和使用 Fullscreen API。
