In front-end development, we often need to control the use of resources and improve the performance and responsiveness of a page based on its visibility. The [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) in JavaScript provides a way to **check if a page is visible**.

This article will introduce what the Page Visibility API is, how it works, compatibility and usage scenarios.

## What is the Page Visibility API?

The Page Visibility API is a browser API that provides a way to **detect if a page is visible**. With the Page Visibility API, we can know **whether the current page is hidden or minimized**, so we can control the behavior of the page and the use of resources based on the visibility of the page.

The Page Visibility API provides 2 properties and 1 event, which are:

### 1. properties

1. `document.hidden`: **read-only**, indicates **whether the current page is hidden**, returns `true` if the page is hidden, otherwise returns `false`. 2.
2. `document.visibilityState`: **read-only**, indicates **the visibility state of the current page**, possible values are

- `visible`: the current page is visible, i.e. the page is the foreground tab of a non-minimized window.
- `hidden`: the current page is hidden, i.e. the page can be a background tab, or part of a minimized window, or in a state where the OS lock screen is active.
- `prerender`: the current page is being preloaded.
- `unloaded`: the current page is being unloaded, some browsers do not support this.

### 2. Methods

- `visibilitychange`: trigger this event when the visibility state of the page changes.

## Where the Page Visibility API is used

The Page Visibility API can be used in many scenarios, such as

1. Video player

During video playback, you can use the Page Visibility API to check whether the page is visible or not. If the page is not visible, the video can be paused to save resources and bandwidth. When the page becomes visible again, playback can be resumed.

2. Real-time Message Notification

If our web page needs to send real-time notifications to users, we can use Page Visibility API to detect whether the page is visible or not, and if the page is not visible, no notification will be sent. When the user reopens the page, we can check again and make sure they see any unread messages.

3. Automatically save form data

If a user enters a lot of data on a form and leaves the page while filling it out, we can use the Page Visibility API to determine when to leave the page and automatically save the form data for later revisiting.

4. Game applications

If we are developing a web-based game, we can use the Page Visibility API to pause and resume the game so that the player can leave the game without losing any progress.

5. Web buried statistics analysis

Use the Page Visibility API to collect more accurate visit counts for better analysis of user behavior.

6. Web Page Performance Measurement

Use the Page Visibility API to measure page load time and page unload time to help you optimize your website performance.

7. Page Caching

If a site using the Page Visibility API is exited by a user, then by recording the cache status, you can better manage the cache of pages for faster access next time.

Of course there are more usage scenarios, so I won't cover them too much in this article.

## How to use the Page Visibility API?

Using the Page Visibility API is as simple as listening for visibilitychange events in JavaScript. Here is a simple example:

```javascript
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // the page is hidden
  } else {
    // the page is visible
  }
}).
```

In the above example, we use the visibilitychange event to listen for changes in the visibility state of the page, so that we can perform some actions when the page is hidden, and some actions when the page is visible again.

## Page Visibility API Compatibility

The Page Visibility API is not supported by all browsers, so we need to check if the browser supports the API before using it:

- Chrome: Supported.
- Firefox: Support.
- Safari: Supported.
- IE: IE10+ is supported.
- Edge: Support.

For more details, please see "[Page Visibility API](https://caniuse.com/?search=Page%20Visibility%20API)".

If you need to be compatible with browsers that do not support the Page Visibility API, we can use Polyfill or other detection methods to achieve this.

## Example of using the Page Visibility API

The following are some practical use cases for the Page Visibility API:

### 1. controlling video playback based on page visibility

[demo](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#examples)

### 2. Control animation execution based on page visibility

Create small balls in a page whose position changes over time. Using the Page Visibility API, you can stop the animation when the page is not visible, and resume it when the page becomes visible again.

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

where `setInterval()` is a loop function that executes the code of the function continuously to achieve the animation effect. In this case, the `move()` function continuously modifies the position of the ball (by modifying the `top` and `left` properties in the CSS) and reverses it when it reaches the edge of the screen. Page visibility is monitored by the `visibilitychange` event, which stops the animation when the page goes from visible to invisible, and resumes the animation when it goes the other way.

## Summary

Through this article, we have learned about the concepts, usage, compatibility and practical use cases of the Page Visibility API. In practical development, we can control the use of resources based on page visibility to improve user experience and performance optimization. If you want to learn more about the Page Visibility API, you can refer to the following documents:

- [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [W3C Specification](https://www.w3.org/TR/page-visibility/)
