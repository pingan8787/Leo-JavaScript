在前端开发中，我们经常需要根据页面的可见性来控制资源的使用和提高页面的性能和响应速度。而 JavaScript 中的 [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) 就提供了一种**检测页面是否可见**的方法。

本文将介绍 Page Visibility API 的概念、使用方法、兼容性和实际应用案例。

## 什么是 Page Visibility API？

Page Visibility API 是一种浏览器 API，它提供了一种**检测页面是否可见**的方法。通过 Page Visibility API，我们可以知道**当前页面是否被隐藏或者最小化**，从而可以根据页面的可见性来控制页面的行为和资源的使用。

Page Visibility API 提供了 2 个属性和 1 个事件，分别是：

### 1. 属性

1. `document.hidden`：只读，表示**当前页面是否被隐藏**，如果页面被隐藏返回 `true`，否则返回 `false`。
2. `document.visibilityState`：只读，表示**当前页面的可见性状态**，可能的取值有：

- `visible`：当前页面可见，即页面是非最小化窗口的前景选项卡。
- `hidden`：当前页面被隐藏，即页面可以是一个后台标签，或是最小化窗口的一部分，或是在操作系统锁屏激活的状态下。
- `prerender`：当前页面正在预加载。
- `unloaded`：当前页面正在卸载，部分浏览器不支持。

### 2. 方法

- `visibilitychange`：当页面的可见性状态发生变化时触发该事件。

## Page Visibility API 的使用场景

Page Visibility API 可以应用于很多场景，比如：

1. 视频播放器

在视频播放期间，可以使用 Page Visibility API 来检测页面是否可见。如果页面不可见，可以通过暂停视频来节省资源和带宽。当页面重新变为可见时，可以恢复播放。

2. 实时消息通知

如果我们网页需要向用户发送实时通知，就可以使用 Page Visibility API 来检测页面是否可见，如果页面不可见，就不会发送通知。当用户重新打开页面时，我们可以再次检查，并确保他们看到任何未读消息。

3. 自动保存表单数据

如果用户在表单上输入了大量数据，而且在填写过程中离开了页面，我们可以使用 Page Visibility API 确定何时离开页面，并自动保存表单数据，以便以后再次访问。

4. 游戏应用程序

如果我们正在开发一个基于 Web 的游戏，就可以使用 Page Visibility API 暂停和恢复游戏，以便玩家能够在离开游戏时不会丢失任何进度。

5. 网页埋点统计分析

使用 Page Visibility API 可以收集更准确的访问次数，以便更好地分析用户行为。

6. 网页性能测量

使用 Page Visibility API 可以测量页面加载时间和页面卸载时间，帮助您优化网站性能。

7. 页面缓存

如果使用 Page Visibility API 的网站被用户退出，那么通过记录缓存状态，可以更好地管理页面的缓存，以便下次更快的访问。

当然还有更多使用场景，本文不再过多介绍。

## 如何使用 Page Visibility API？

使用 Page Visibility API 非常简单，只需要在 JavaScript 中监听 visibilitychange 事件即可。以下是一个简单的示例：

```javascript
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // 页面被隐藏
  } else {
    // 页面可见
  }
});
```

在以上示例中，我们使用了 visibilitychange 事件来监听页面的可见性状态变化，当页面被隐藏时，我们可以执行一些操作，当页面重新可见时，我们也可以执行一些操作。

## Page Visibility API 的兼容性

Page Visibility API 并不是所有浏览器都支持，我们需要在使用之前检查浏览器是否支持该 API。以下是一些浏览器的支持情况：

- Chrome：支持。
- Firefox：支持。
- Safari：支持。
- IE：支持 IE10+。
- Edge：支持。

详细可以查看 「[Page Visibility API](https://caniuse.com/?search=Page%20Visibility%20API)」。

如果需要兼容不支持 Page Visibility API 的浏览器，我们可以使用 Polyfill 或者其他的检测方法来实现。

## Page Visibility API 的实际应用案例

以下是一些 Page Visibility API 的实际应用案例：

### 1. 根据页面的可见性来控制视频播放

点击 [demo](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#examples) 查看。

### 2. 根据页面的可见性来控制动画执行

在页面中创建小球，其位置随着时间的推移而变化。使用 Page Visibility API，可以在页面不可见时停止动画，并在页面重新变为可见时恢复动画。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Animation Control Using Page Visibility API</title>
    <style>
      #ball {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top: 0;
        left: 0;
      }
    </style>
  </head>

  <body>
    <div id="ball"></div>
    <script>
      window.addEventListener("DOMContentLoaded", function () {
        var ball = document.getElementById("ball");
        ball.style.top = 0;
        ball.style.left = 0;
        var speedX = 2;
        var speedY = 3;
        function move() {
          var top = parseFloat(ball.style.top);
          var left = parseFloat(ball.style.left);

          // 确保小球不会移出屏幕
          if (top < 0 || top > window.innerHeight - 50) {
            speedY = -speedY;
          }
          if (left < 0 || left > window.innerWidth - 50) {
            speedX = -speedX;
          }
          ball.style.top = top + speedY + "px";
          ball.style.left = left + speedX + "px";
        }

        var timer = setInterval(function () {
          move();
        }, 10);

        document.addEventListener("visibilitychange", function () {
          if (document.visibilityState === "hidden") {
            clearInterval(timer);
          } else {
            timer = setInterval(function () {
              move();
            }, 10);
          }
        });
      });
    </script>
  </body>
</html>
```

其中 `setInterval()` 是一个循环函数，它可以连续执行函数的代码，实现动画效果。在本例中，`move()` 函数不断修改球的位置（通过修改 CSS 中的 `top` 和 `left` 属性），并在达到屏幕边缘时将其反转。页面可见性通过 `visibilitychange` 事件进行监测，当页面从可见到不可见时停止动画，反之则恢复动画。

## 总结

通过本文的介绍，我们了解了 Page Visibility API 的概念、使用方法、兼容性和实际应用案例。在实际开发中，我们可以根据页面的可见性来控制资源的使用，提高用户体验和性能优化。如果你想深入了解 Page Visibility API，可以参考以下文档：

- [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [W3C 规范](https://www.w3.org/TR/page-visibility/)
