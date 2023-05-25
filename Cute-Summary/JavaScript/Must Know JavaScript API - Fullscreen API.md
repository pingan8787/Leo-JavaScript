Welcome to the **Must Know JavaScript API** series, this series will learn the **JavaScript API** with you, so that you can be more proficient in using it like a senior engineer. Let's start learning together:

- [**Page Visibility API**](https://javascript.plainenglish.io/must-know-javascript-api-page-visibility-api-9f3e10439842)
- [**Broadcast Channel API**](https://javascript.plainenglish.io/must-know-javascript-api-broadcast-channel-api-f059860f9349)
- [**Resize Observer API**](https://javascript.plainenglish.io/must-know-javascript-api-resize-observer-api-9420aab1a74)
- [**Beacon API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-beacon-api-4abe0bee29ff)
- [**Clipboard API**](https://javascript.plainenglish.io/must-know-javascript-api-clipboard-api-22ac0861e27b)
- [**Fetch API**](https://javascript.plainenglish.io/must-know-javascript-api-fetch-api-11846c9a3b07)
- [**Performance API**](https://javascript.plainenglish.io/must-know-javascript-api-performance-api-85f7b8306b90)
- [**Storage API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-storage-api-2141f3066858)

In this article, we'll explore the concepts, usage, practical applications, compatibility and pros and cons of the [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API), and provide some suggestions and considerations. Let's dive in!

## 🔍 1. What is Fullscreen API

### 1.1 Introduction

The Fullscreen API is a set of JavaScript methods and properties for **controlling the fullscreen display of web pages**. It allows developers to switch specific elements of a web page or an entire document to fullscreen mode through JavaScript code in order to make better use of screen space.

With the Fullscreen API, developers can trigger the fullscreen switch by keystrokes, mouse clicks or touch gestures, and perform custom interactions and actions in fullscreen.

### 1.2 Use Case

The Fullscreen API is intended to provide a better user experience and interaction. It can enhance the functionality of web pages in specific scenarios, such as

- **Video Player**: When watching videos, it can provide a more immersive viewing experience by displaying video elements in full screen.
- **Gaming applications**: In gaming applications, full-screen mode eliminates distractions and allows players to focus on the game content.
- **Presentations**: By displaying presentations in full screen, you can ensure the audience's attention and showcase better visuals.
- **Image Viewer**: When viewing images, displaying them full screen provides a larger display area, allowing users to better appreciate the details of the image.

The Fullscren API is used in a variety of scenarios and can be applied according to specific needs.

## 💻 2. How to use the Fullscreen API

The Fullscreen API provides a set of methods and properties to implement fullscreen display and control. The following are some commonly used methods and properties:

- `document.documentElement.requestFullscreen()`: This method switches the entire document to fullscreen mode.
- `element.requestFullscreen()`: This method switches the specified element to fullscreen mode.
- `document.exitFullscreen()`: This method is used to exit fullscreen mode.
- `document.fullscreenElement`: This property returns the element currently in fullscreen mode, or null if no element is in fullscreen mode.
- `document.fullscreenEnabled`: This property indicates whether the current environment supports the Fullscreen API.

The following is a simple usage example for switching a document to fullscreen mode:

```javascript
const button = document.querySelector("button");
button.addEventListener("click", () => {
  document.documentElement.requestFullscreen();
});
```

In this example, we get a button element and when the button is clicked, we call the `requestFullscreen() ` method to switch the whole document to fullscreen mode. When the user wants to exit fullscreen mode, they can either press Esc or call the `exitFullscreen()` method.

## 🚀 3. Examples

The Fullscreen API can be used in a variety of different scenarios. Here are some examples of practical applications:

- **Video player**: With the Fullscreen API, you can switch video elements to full-screen mode to provide a better viewing experience.
- **Gaming applications**: In gaming applications, fullscreen mode can eliminate distractions and provide a better gaming experience.
- **Presentations**: With the Fullscreen API, presentations can be displayed in full screen to ensure the audience's attention and show a better visual effect.
- **Image Viewer**: When viewing images, displaying them full screen provides a larger display area, allowing users to better appreciate the details of the images.

In addition, the Fullscreen API can be used in a variety of scenarios where full-screen display is required.

The following is an example of using the Fullscreen API for full-screen display of images:

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

Similarly, we can implement functions such as playing videos and PPTs in full screen.

## 📋 4. Compatibility and advantages and disadvantages

### 4.1 Compatibility

The following is the compatibility list for the Fullscreen API, with the major browsers and their minimum supported versions:

- Chrome 15+ ✅
- Firefox 10+ ✅
- Safari 5.1+✅
- Edge 12+✅
- Opera 12.1+✅
- Internet Explorer 11+✅
- iOS Safari 4.2+✅

You can find details at [Can I use](https://caniuse.com/?search=Fullscreen).

### 4.2 Pros and Cons

Pros:

- Provides a better user experience and interaction.
- Can be used to enhance the functionality of web pages in specific scenarios.

Disadvantages:

- Compatibility issues, different browsers have different levels of support.
- Some users may not like the fullscreen mode and may choose to exit fullscreen manually.

### 4.3 Tool Recommendations

These are a few GitHub repositories based on the Fullscreen API implementation:

1. [fullPage.js](https://github.com/alvarotrigo/fullPage.js)：34.6k⭐ FullPage plugin by Alvaro Trigo. Create full screen pages fast and simple.
2. [screenfull.js](https://github.com/sindresorhus/screenfull.js)：6.8k⭐ Simple wrapper for cross-browser usage of the JavaScript Fullscreen API.

3. [BigVideo.js](https://github.com/dfcb/BigVideo.js)：2.3k⭐ The jQuery Plugin for Big Background Video (and Images).

## 👍 5. Usage suggestions and considerations

The following are some recommendations and considerations when using the Fullscreen API:

- Make sure to provide **appropriate user control methods** to allow users to freely switch to and from fullscreen mode.
- When switching to fullscreen mode, take care to adjust the **page layout and style** to fit the fullscreen display.
- Pay attention to handling **compatibility issues** and provide alternatives or fallback strategies to provide a good user experience in browsers that do not support the Fullscreen API.

## 🍭 6. Summary

This article introduces the Fullscreen API, a JavaScript API for controlling the fullscreen display of a browser, through which developers can provide a better user experience and interaction.

## 🎯 7. Extensions

- [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API): Mozilla Developer Network's detailed documentation of the Fullscreen API.
- [Using the Fullscreen API in web browsers](https://www.sitepoint.com/use-html5-full-screen-api/): SitePoint's article on how to use the Fullscreen API in web pages.
- [HTML Fullscreen API Specification](https://fullscreen.spec.whatwg.org/): The specification document for the Fullscreen API provides more in-depth technical details.

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
