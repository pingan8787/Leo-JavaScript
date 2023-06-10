Welcome to the **Must Know JavaScript API** series, this series will learn the **JavaScript API** with you, so that you can be more proficient in using it like a senior engineer. Let's start learning together:

- [**Page Visibility API**](https://javascript.plainenglish.io/must-know-javascript-api-page-visibility-api-9f3e10439842)
- [**Broadcast Channel API**](https://javascript.plainenglish.io/must-know-javascript-api-broadcast-channel-api-f059860f9349)
- [**Resize Observer API**](https://javascript.plainenglish.io/must-know-javascript-api-resize-observer-api-9420aab1a74)
- [**Beacon API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-beacon-api-4abe0bee29ff)
- [**Clipboard API**](https://javascript.plainenglish.io/must-know-javascript-api-clipboard-api-22ac0861e27b)
- [**Fetch API**](https://javascript.plainenglish.io/must-know-javascript-api-fetch-api-11846c9a3b07)
- [**Performance API**](https://javascript.plainenglish.io/must-know-javascript-api-performance-api-85f7b8306b90)
- [**Storage API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-storage-api-2141f3066858)
- [**Fullscreen API**](https://javascript.plainenglish.io/must-know-javascript-api-fullscreen-api-64f0d4eff196)
- [**WebSockets API**](https://javascript.plainenglish.io/must-know-javascript-api-websockets-api-fd82719f256e)
- [**Geolocation API**](https://medium.com/@Chris1993/must-know-javascript-api-geolocation-api-f653f2d84b)
- [**IndexedDB API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-indexeddb-api-6e8c990f2c85)

## 🏝 1. What is Intersection Observer API

### 1.1 Introduction

The [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is an API provided by modern browsers for monitoring the intersection state of DOM elements. Intersection Observer API, we can easily **determine whether an element is entering or leaving the visible area**, thus enabling various interactive effects and lazy loading, etc.

### 1.2 Use Case

The Intersection Observer API can be used to implement a variety of interactive effects and lazy loading features. Common usage scenarios include.

- **Image lazy loading** - where images are loaded only when they are scrolled to visibility.
- **Infinite scrolling of content** - that is, the user scrolls near the bottom of the content and loads more directly without the user having to turn the page, giving the user the illusion that the page can scroll infinitely.
- **Detection of ad exposure** - in order to calculate ad revenue, it is necessary to know the exposure of ad elements.
- Execute tasks or play animations when the user sees a certain area.

## 🎨 2. How to use

The Intersection Observer API is very simple to use, it only requires a callback function and a configuration object, where the callback function is triggered when the target element enters or leaves the intersection, and the configuration object can set some parameters such as root, rootMargin and threshold.

### 2.1 Example

The following is a simple example to help us get started quickly:

```javascript
// Target elements
const targetElement = document.querySelector(".target");

// Create Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("The target element enters the visible area.");
      } else {
        console.log("The target element leaves the visible area.");
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  }
);

// Start observing the target element
observer.observe(targetElement);
```

In this example, a target element is first selected using the `querySelector` method.
Then an instance of Intersection Observer is created and a callback function is passed in that will be triggered when **the target element enters or leaves the visible area**.

Finally, the observation of the target element is started by calling the `observe` method. When the target element enters or leaves the visible area, the corresponding code in the callback function will be executed and the corresponding message will be printed to the console.

### 2.2 Introduction to parameters

The following is a description of the parameters of the Intersection Observer API:

1. callback function (`callback`):
   - Callback function for specifying an observer that is triggered when a target element enters or leaves an intersection.
   - The callback function takes one argument, the `entries` array, which contains one or more IntersectionObserverEntry objects, each representing the intersection state of a target element.
2. options (`options`):
   - `root`: specifies the **root element**, the ancestor of the target element whose intersection state will be observed, the default is the viewport.
   - `rootMargin`: specifies the **root element's boundary offset**, which is used to expand or reduce the size of the intersection area.
   - `threshold`: specifies **a threshold or an array of thresholds** indicating the percentage of visibility of the target element to be used to trigger the callback function. For example, 0.5 means that the callback is triggered when the target element is at least half visible.

## 🧭 3. Examples

The Intersection Observer API can be used to implement a variety of interactive effects and lazy loading features. Here are some examples of practical applications.

### 3.1 Image Lazy Loading

Image lazy loading is one of the most common applications of the Intersection Observer API. By listening to whether an image element enters the visible area, we can achieve lazy loading of images and thus improve page performance.

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

In this example, we add a `data-src` attribute to the image element to store the image's real address. Then a new IntersectionObserver instance is created to watch all the image elements. When an image element enters the visible area, we assign the `data-src` attribute to the `src` attribute, thus enabling lazy loading of images.

### 3.2 Infinite Scrolling

Infinite scrolling is a common UI design that allows users to load infinitely more content as they scroll. We can achieve infinite scrolling by listening to whether the last element enters the visible area or not.

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
          // Load more content
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

In the above code, we add an IntersectionObserver instance to the last element, so that we can trigger the load more content action when the last element enters the visible area.

### 3.3 Following the navigation bar

By listening to whether an element enters or leaves the viewable area, we can achieve some interesting effects, such as following the navigation bar.

```html
<header>
  <!-- Navigation bar -->
</header>

<section class="content">
  <!-- Page content -->
</section>

<script>
  const header = document.querySelector("header");
  const content = document.querySelector(".content");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.add("fixed");
        } else {
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

In this example, we create an instance of IntersectionObserver to observe the page content elements. When the page content element enters the viewable area, we have the navigation bar fixed at the top of the page. When the page content element leaves the viewable area, we let the navigation bar resume its original position.

## 📋 4. Compatibility and advantages and disadvantages

### 4.1 Compatibility

These are the minimum versions of major browsers supported by the Intersection Observer API:

- Chrome 51+✅
- Firefox 55+✅
- Safari 12.1+✅
- Edge 15+✅
- Oper 38+✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1685625722611-783d17bf-249e-4e5c-8a9b-413510b4324f.png#averageHue=%2331291e&clientId=u37f57fe9-198f-4&from=paste&height=1572&id=u9c0ac86b&originHeight=1572&originWidth=2914&originalType=binary&ratio=1&rotation=0&showTitle=false&size=404282&status=done&style=none&taskId=u97350999-03f3-4274-8f7a-8bba1cd0134&title=&width=2914)

You can find details at [caniuse.com](https://caniuse.com/?search=intersectionobserver).

### 4.2 Pros and Cons

The benefits of Intersection Observer API include:

- Ability to implement various kinds of interactive effects and lazy loading and other functions to improve user experience.
- Ability to optimize page performance and avoid unnecessary network requests and calculations.

Disadvantages of Intersection Observer API include:

- Poor compatibility, need to use polyfill for compatibility.
- May affect page performance and cause browsers to trigger callback functions frequently if too many target elements are listened to.

### 4.3 Tool Recommendations

- [Lax.js](https://github.com/alexfoxy/lax.js)：9.8K ⭐ Simple & lightweight (<4kb gzipped) vanilla JavaScript library to create smooth & beautiful animations when you scroll.
- [lozad.js](https://github.com/ApoorvSaxena/lozad.js)：7.3K ⭐ Highly performant, light ~1kb and configurable lazy loader in pure JS with no dependencies for responsive images, iframes and more
- [Scrollama](https://github.com/russellgoldenberg/scrollama)：5.6K ⭐ Scrollytelling with IntersectionObserver.
- [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)：4.1K ⭐ React implementation of the Intersection Observer API to tell you when an element enters or leaves the viewport.

## 🎯 5. Usage suggestions and considerations

- Minimize the number of target elements listened to to avoid impacting page performance.
- Be careful to set the `root` and `rootMargin` parameters to ensure that the target elements are watched correctly.
- If you need to modify the DOM in the callback function, it is recommended to use the `requestAnimationFrame()` function to avoid triggering multiple rearrangements and redraws.

## 🍭 6. Summary

The Intersection Observer API is an API for monitoring the intersection state of DOM elements and can be used to implement a variety of interactive effects and lazy loading features.

This article describes the Intersection Observer API's quick start, practical applications, compatibility and advantages and disadvantages, and recommends some common tools and libraries. When using the Intersection Observer API, there are some usage tips and considerations to ensure proper observation of target elements and improve page performance.

## 📚 7. Extensions

- [MDN Web Docs：Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Google Developers：Loading Third-Party JavaScript](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript)
- [Smashing Magazine：Native Lazy Loading For The Web](https://www.smashingmagazine.com/native-lazy-loading/)
- [CSS-Tricks：A Few Functional Uses for Intersection Observer to Know When an Element is in View](https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/)

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
