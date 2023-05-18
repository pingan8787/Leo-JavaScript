Welcome to the **Must Know JavaScript API** series, this series will learn the **JavaScript API** with you, so that you can be more proficient in using it like a senior engineer. Let's start learning together:

- [**Page Visibility API**](https://javascript.plainenglish.io/must-know-javascript-api-page-visibility-api-9f3e10439842)
- [**Broadcast Channel API**](https://javascript.plainenglish.io/must-know-javascript-api-broadcast-channel-api-f059860f9349)
- [**Resize Observer API**](https://javascript.plainenglish.io/must-know-javascript-api-resize-observer-api-9420aab1a74)
- [**Beacon API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-beacon-api-4abe0bee29ff)
- [**Clipboard API**](https://javascript.plainenglish.io/must-know-javascript-api-clipboard-api-22ac0861e27b)
- [**Fetch API**](https://javascript.plainenglish.io/must-know-javascript-api-fetch-api-11846c9a3b07)

## 🏝 1. What is the Performance API

### 1.1 Introduction

The Performance API provides a way to **access and measure browser performance-related information**. Through the Performance API, developers can obtain detailed information about **page load time**, **resource load performance**, **user interaction latency**, and more for performance analysis and optimization.

### 1.2 Use Case

The Performance API is designed to help developers locate and solve performance problems and optimize page loading speed and user experience. It can be used in the following scenarios:

- **Web Page Performance Monitoring**

Measure and analyze page load time, resource load performance, critical rendering path and other metrics to understand web page performance bottlenecks.

- **Performance Optimization**

Identify potential performance problems and take corresponding optimization measures to improve web page loading speed and response performance.

- **User Experience Analysis**

Evaluate the quality of user experience of web pages by measuring user interaction latency and animation performance.

- **Performance Benchmarking**

Compare the performance difference between different versions or different configurations to evaluate the performance improvement effect.

## 🎨 2. How to use the Performance API

The Performance API provides a set of methods and properties for obtaining and measuring performance-related information. The following are some common usage examples:

- **Get Page Load Time**

```javascript
const loadTime =
  window.performance.timing.loadEventEnd -
  window.performance.timing.navigationStart;

console.log(`Page load time: ${loadTime}ms`);
```

- **Measuring Resource Load Time**

```javascript
const resourceTiming = window.performance.getEntriesByType("resource");
resourceTiming.forEach((resource) => {
  console.log(`${resource.name} load time: ${resource.duration}ms`);
});
```

- **Monitor User Interaction Latency**

```javascript
const interactionStart = Date.now();
document.addEventListener("click", () => {
  const interactionEnd = Date.now();
  const interactionDelay = interactionEnd - interactionStart;
  console.log(`User click delay:${interactionDelay}ms`);
});
```

Please note that these codes are only examples and actual use may require **appropriate handling and compatibility testing** based on specific requirements and browser compatibility.

## 🧭 3. Examples of the Performance API

The Performance API can be applied to a number of scenarios and optimization schemes, here are a few common examples:

### 3.1 Page Load Time Monitoring and Optimization

With the Performance API, we can monitor page load times and optimize them. The following is a sample code for monitoring page load time and resource load time:

```javascript
// Monitoring page load time
const loadTime =
  window.performance.timing.loadEventEnd -
  window.performance.timing.navigationStart;

console.log(`Page load time: ${loadTime}ms`);

// Monitor resource load time
const resourceTiming = window.performance.getEntriesByType("resource");
resourceTiming.forEach((resource) => {
  console.log(`${resource.name} load time: ${resource.duration}ms`);
});
```

By getting the timestamp in the `window.performance.timing` object, we can calculate the loading time of the page. In addition, by using `window.performance.getEntriesByType('resource')` method, we can get the loading performance information of all the resources and further optimize the resource loading.

### 3.2 Resource loading performance analysis

For critical resources in web pages, we usually need to pay attention to their loading time for performance optimization.
Through the Performance API, we can monitor and analyze the loading performance of critical resources. The following is a sample code to monitor the loading time of a specified critical resource:

```javascript
// Monitor the load time of a critical resource
const keyResources = [
  "https://example.com/css/style.css",
  "https://example.com/js/main.js",
];
keyResources.forEach((resource) => {
  const resourceEntry = window.performance.getEntriesByName(resource)[0];
  console.log(`${resource} load time: ${resourceEntry.duration}ms`);
});
```

By using the `window.performance.getEntriesByName()` method, we can obtain information about the loading performance of a specific resource, and then analyze and optimize the loading time of critical resources.

### 3.3 User interaction latency monitoring

User experience is one of the most important factors in web development, and the Performance API can help us to monitor the latency of user interaction with web pages for optimization. The following is a sample code to monitor user click latency:

```javascript
// Monitor user click latency
const interactionStart = Date.now();
document.addEventListener("click", () => {
  const interactionEnd = Date.now();
  const interactionDelay = interactionEnd - interactionStart;
  console.log(`User click delay: ${interactionDelay}ms`);
});
```

By recording the start time and end time of user interaction, we can calculate the delay time of user clicks to help us evaluate and improve user experience.

### 3.4 Page Animation Performance Monitoring

Using animations in web pages can enhance user experience, but unreasonable animation implementation may lead to performance problems. With the Performance API, we can monitor the performance of page animations so that we can optimize them. The following is a sample code to monitor animation execution time:

```javascript
// Monitoring animation performance
function measureAnimationPerformance() {
  const animationStart = performance.now();
  // Execute animation operations
  requestAnimationFrame(() => {
    const animationEnd = performance.now();
    const animationDuration = animationEnd - animationStart;
    console.log(`Animation execution time: ${animationDuration}ms`);
  });
}

measureAnimationPerformance();
```

In this example, we use the `performance.now()` method to get the start time and end time of the animation, and calculate the execution time of the animation. By monitoring the animation performance, we can determine whether the animation is smooth or not, and whether it takes up too many resources, so that we can optimize and improve it.

## 📋 4. Compatibility and advantages and disadvantages

### 4.1 Compatibility

The following is the compatibility of the Performance API on different browsers:

- Chrome 6+ ✅
- Firefox 7+ ✅
- Safari 8+ ✅
- Edge 12+ ✅
- Internet Explorer: partially supported, IE 9+ is supported

It is recommended to conduct compatibility tests based on the target user's browser usage during actual development and provide alternate solutions or use polyfill to fill compatibility differences as needed.

For detailed compatibility information, please visit [Can I use](https://caniuse.com/?search=Performance%20API)。

### 4.2 Pros and Cons

The Performance API has the following advantages and disadvantages:

Pros:

- Provides a **rich set of performance metrics and measurements** to comprehensively evaluate the performance of web pages.
- Supports access to key metrics such as page load time, resource load performance, and user interaction latency to help developers locate and solve performance problems.
- Enables performance optimization and user experience analysis to **improve the loading speed and responsiveness of web pages**.

Disadvantages:

- In some cases, obtaining performance metrics may have some impact on web page performance and needs to be used with caution.
- May not be supported in some older browser versions, **compatibility handling or alternative solutions are required**.
- The accuracy of some metrics may be limited by browser implementation and device performance, and requires comprehensive consideration and validation.

When using them, they need to be used and handled reasonably in conjunction with actual needs and compatibility requirements.

### 4.3 Tool Recommendations

Several third-party libraries based on the Performance API wrapper are recommended:

1. [Web Vitals](https://github.com/GoogleChrome/web-vitals): 6.1K ⭐

A library for measuring and monitoring core web performance metrics, based on the Performance API, including Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS), and other metrics.

2. [Perfume.js](https://github.com/Zizzamia/perfume.js): 2.8K ⭐

A small but powerful performance metric library for monitoring page load time, critical resource load time, and user interaction latency.

3. [PerformanceNow.js](https://github.com/myrne/performance-now): 100⭐

A small performance timing library that provides more accurate performance measurements based on the Performance API's high-resolution timestamps.

These libraries are wrapped and extended on top of the Performance API to provide a more convenient interface and functionality to help developers better monitor and optimize web performance. We can choose the right library to simplify performance monitoring and analysis based on specific needs.

## 👍 5. Usage suggestions and considerations

A few recommendations and considerations for using the Performance API are summarized:

1. When measuring performance, you should choose the right time and target to avoid additional burden on page performance.
2. Pay attention to compatibility issues, test and handle compatibility according to the target browser, and consider using polyfill or alternative solutions.
3. Combine with other tools and methods, such as browser developer tools, performance analysis tools, etc., to comprehensively analyze and optimize the performance of web pages.
4. Understand the meaning and interpretation of different metrics to avoid misunderstanding or misinterpreting performance data.
5. Use performance data for targeted optimization, prioritizing bottlenecks that affect user experience.
6. Follow the latest changes and enhancements to the Performance API as browsers are updated and standards evolve.

## 🍭 6. Summary

The Performance API is a key JavaScript API for accessing and measuring browser performance-related information. It provides a rich set of performance metrics and measurements to help developers locate and solve performance problems and optimize page load speed and user experience.

Through the Performance API, key metrics such as page load time, resource loading performance, user interaction latency, etc. can be obtained for performance analysis and optimization.

## 🎯 7. Extensions

If you are interested in the Performance API, you can expand your learning by referring to the following materials:

- [MDN web docs - Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [Google Developers - Assessing Loading Performance in Real Life with Navigation and Resource Timing](https://developers.google.com/web/fundamentals/performance/navigation-and-resource-timing)

I hope this article has helped you understand and use the Performance API. If you have any questions, please feel free to ask.

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
