Welcome to the **Must Know JavaScript API** series, this series will learn the **JavaScript API** with you, so that you can be more proficient in using it like a senior engineer. Let's start learning together:

- [**Page Visibility API**](https://javascript.plainenglish.io/must-know-javascript-api-page-visibility-api-9f3e10439842)
- [**Broadcast Channel API**](https://javascript.plainenglish.io/must-know-javascript-api-broadcast-channel-api-f059860f9349)
- [**Resize Observer API**](https://javascript.plainenglish.io/must-know-javascript-api-resize-observer-api-9420aab1a74)
- [**Beacon API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-beacon-api-4abe0bee29ff)
- [**Clipboard API**](https://javascript.plainenglish.io/must-know-javascript-api-clipboard-api-22ac0861e27b)
- [**Fetch API**](https://javascript.plainenglish.io/must-know-javascript-api-fetch-api-11846c9a3b07)

## 🏝 1. What is Beacon API

### 1.1 Introduction

The Beacon API is a new browser API provided by HTML5 that can be used to send data asynchronously in the background of the browser without affecting the loading and performance of the current page. With the Beacon API, developers can send data to the server when pages are unloaded or closed, thus enabling some monitoring and logging features.

### 1.2 Role

The main role of the Beacon API is to **send data asynchronously**, so in some scenarios that require fast response and do not affect the user experience, the Beacon API can be used to report and send data. For example, performance monitoring of pages, exception logging, user behavior tracking, etc. can be implemented using Beacon API.
In addition, the Beacon API can be used to send data to the server when a page is unloaded or closed, thus improving the integrity and accuracy of the data.

## 🎨 2. How to use the Beacon API

Using the Beacon API is as simple as calling the `[navigator.sendBeacon()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)` method. The syntax of this method is as follows:

```javascript
navigator.sendBeacon(url);
navigator.sendBeacon(url, data);
```

Parameters include:

- `url`

The `url` parameter indicates the destination address to which `data` will be sent.

- `data` is optional

The `data` parameter is the address to which the [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [ ArrayBufferView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob), [DOMString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String), [FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData), or [URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) type of data.

For example, the following is an example of sending a simple log record:

```javascript
navigator.sendBeacon("/log", "Log message");
```

## 🧭 3. Examples of Beacon API usage

The Beacon API can be used in a variety of scenarios, and the following are some usage examples:

### 3.1 Page performance monitoring

Using the Beacon API, performance data can be sent to the server asynchronously after a page is loaded for monitoring and analysis. For example, page load time, resource load time, response time, etc. can be sent.

```javascript
window.addEventListener("load", function () {
  var timing = performance.timing;
  var data = {
    page_load_time: timing.loadEventEnd - timing.navigationStart,
    dns_time: timing.domainLookupEnd - timing.domainLookupStart,
    tcp_time: timing.connectEnd - timing.connectStart,
    request_time: timing.responseEnd - timing.requestStart,
    dom_loading_time:
      timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
    dom_interactive_time: timing.domInteractive - timing.navigationStart,
    dom_ready_time: timing.domContentLoadedEventEnd - timing.navigationStart,
    redirect_time: timing.redirectEnd - timing.redirectStart,
    unload_time: timing.unloadEventEnd - timing.unloadEventStart,
    secure_connection_time:
      timing.secureConnectionStart > 0
        ? timing.connectEnd - timing.secureConnectionStart
        : 0,
  };
  navigator.sendBeacon("/log", JSON.stringify(data));
});
```

### 3.2 Exception Logging

Using the Beacon API you can asynchronously send exception information to the server when an exception occurs on a page for logging and analysis. For example, exception type, exception stack information, user information, etc. can be sent.

```javascript
window.onerror = function (msg, url, lineNo, columnNo, error) {
  var data = {
    message: msg,
    url: url,
    line_number: lineNo,
    column_number: columnNo,
    stack_trace: error ? error.stack : "",
  };
  navigator.sendBeacon("/log", JSON.stringify(data));
  return true;
};
```

### 3.3 User Behavior Tracking

Using the Beacon API, behavioral data can be sent to the server asynchronously when a user performs certain actions for behavioral analysis and user profiling. For example, behavioral data such as user clicks, scrolls, and hovers can be sent.

```javascript
document.addEventListener("click", function (event) {
  var data = {
    type: "click",
    target: event.target.tagName,
    x: event.clientX,
    y: event.clientY,
  };
  navigator.sendBeacon("/log", JSON.stringify(data));
});
```

### 3.4 Example of burial in React or Vue

The following is an example of a burial in React using the Beacon API:

```jsx
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleClick = (event) => {
      const data = {
        type: "click",
        target: event.target.tagName,
        x: event.clientX,
        y: event.clientY,
      };
      navigator.sendBeacon("/log", JSON.stringify(data));
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <div>Hello, World!</div>;
}

export default App;
```

In this example, we register a `click` event listener in the component's `useEffect` hook and use the Beacon API in the event handler to send the event data to the server. Also, since we only need to register the event listener when the component is mounted, we use the `useEffect` hook for registration and deregistration.

Similarly, we can also use the Beacon API for burial in Vue, here's an example:

```javascript
export default {
  mounted() {
    const handleClick = (event) => {
      const data = {
        type: "click",
        target: event.target.tagName,
        x: event.clientX,
        y: event.clientY,
      };
      navigator.sendBeacon("/log", JSON.stringify(data));
    };
    document.addEventListener("click", handleClick);
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("click", handleClick);
    });
  },
};
```

In this example, we register a `click` event listener in the component's `mounted` hook and use the Beacon API in the event handler to send the event data to the server. Also, since we need to log out the event listener when the component is destroyed, we use the `$once` method to listen to the component's `beforeDestroy` hook and log out the event listener in the hook.

## 📋 4. Compatibility, advantages and disadvantages of the Beacon API

### 4.1 Compatibility of the Beacon API

The Beacon API is supported in all major browsers, including Chrome, Firefox, Safari, and so on. However, there may be compatibility issues in some low version browsers, and compatibility issues need to be handled.

Details of compatibility can be found on the [Can I Use](https://caniuse.com/?search=Beacon%20API) website.

### 👍 5. Suggestions and Cautions for Using the Beacon API

### 5.1 Recommendations for using the Beacon API

When using the Beacon API, the following points need to be noted:

- The size of the data should be as small as possible so that it can be sent quickly.
- The destination URL should be reliable so that the data can be sent to the server correctly.
- The Beacon API can send data to the server when the page is unloaded or closed, so the timeliness of the data needs to be taken into account.
- When using the Beacon API, attention should be paid to the performance of the page and the user experience to avoid interfering with the normal operation of the user.

### 5.2 Precautions for Beacon API

When using the Beacon API, the following points need to be noted:

- The Beacon API may have compatibility issues, which need to be handled for compatibility.
- When using the Beacon API, data should be properly encrypted and compressed to ensure data security and transmission efficiency.
- When using the Beacon API, attention should be paid to the server's receiving and processing capabilities to avoid server-side performance issues.

## 🍭 6. Summary

The Beacon API is a new browser API that can be used to send data asynchronously in the background of the browser without affecting the loading and performance of the current page. The Beacon API can be used for page performance monitoring, exception logging, user behavior tracking and other functions, and has some practical application value.
When using Beacon API, you need to pay attention to the size of data, reliability of target URL, timeliness of data, performance and user experience, as well as compatibility, data security and server-side performance issues.

## 🎯 Expand

- [MDN Web Docs：Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API)
- [Google Developers：Using the Beacon API for Analytics](https://developers.google.com/web/updates/2016/04/beacon-api-removes-document-write)
