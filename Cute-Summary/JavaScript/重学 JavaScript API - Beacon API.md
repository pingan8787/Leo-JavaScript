## 1. 什么是 Beacon API

### 1.1 概念介绍

Beacon API 是 HTML5 提供的一种新的浏览器 API，可以用于在浏览器后台异步地发送数据，而不影响当前页面的加载和性能。通过 Beacon API，开发者可以在**页面卸载或关闭时**，**将数据发送给服务器**，从而实现一些监控和日志等功能。

### 1.2 作用和使用场景

Beacon API 的主要作用是**异步地发送数据**，因此在一些需要快速响应和不影响用户体验的场景下，可以使用 Beacon API 来进行数据的上报和发送。例如，页面的性能监控、异常日志记录、用户行为追踪等都可以使用 Beacon API 来实现。
此外，Beacon API 还可以用于在页面卸载或关闭时，将数据发送给服务器，从而提高数据的完整性和精确性。

## 2. 如何使用 Beacon API

使用 Beacon API 非常简单，只需要调用 [navigator.sendBeacon()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) 方法即可。该方法语法如下：

```javascript
navigator.sendBeacon(url);
navigator.sendBeacon(url, data);
```

参数包括：

- `url`

`url` 参数表明 `data` 将要被发送到的目标地址。

- `data` 可选

`data` 参数是将要发送的 [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)、[ArrayBufferView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)、[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、[DOMString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData) 或 [URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 类型的数据。

例如，以下是发送一条简单的日志记录的示例：

```javascript
navigator.sendBeacon("/log", "Log message");
```

## 3. Beacon API 的实际应用

Beacon API 可以应用于多种场景，以下是一些实际应用的示例：

### 3.1 页面性能监控

使用 Beacon API 可以在页面加载完毕后，异步地将性能数据发送到服务器，以便进行监控和分析。例如，可以发送页面加载时间、资源加载时间、响应时间等。

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

### 3.2 异常日志记录

使用 Beacon API 可以在页面发生异常时，异步地将异常信息发送到服务器，以便进行记录和分析。例如，可以发送异常类型、异常堆栈信息、用户信息等。

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

### 3.3 用户行为追踪

使用 Beacon API 可以在用户进行某些操作时，异步地将行为数据发送到服务器，以便进行行为分析和用户画像。例如，可以发送用户点击、滚动、停留等行为数据。

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

### 3.4 React 或 Vue 中埋点示例

以下是一个在 React 中使用 Beacon API 进行埋点的示例：

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

在上面的示例中，我们在组件的 `useEffect` 钩子中注册了一个 `click` 事件监听器，并在事件处理函数中使用 Beacon API 将事件数据发送到服务器。同时，由于我们只需要在组件挂载时注册事件监听器，因此我们使用了 `useEffect` 钩子来进行注册和注销。

类似的，我们也可以在 Vue 中使用 Beacon API 进行埋点，以下是一个示例：

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

在上面的示例中，我们在组件的 `mounted` 钩子中注册了一个 `click` 事件监听器，并在事件处理函数中使用 Beacon API 将事件数据发送到服务器。同时，由于我们需要在组件销毁时注销事件监听器，因此我们使用了 `$once` 方法来监听组件的 `beforeDestroy` 钩子，并在钩子中注销事件监听器。

## 4. Beacon API 的兼容性和优缺点

### 4.1 Beacon API 的兼容性

Beacon API 在主流浏览器中都已经得到支持，包括 Chrome、Firefox、Safari 等。但是在一些低版本浏览器中可能存在兼容性问题，需要进行兼容性处理。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1683701441222-09467378-377c-4d19-963b-5d286e4ce1ed.png#averageHue=%23dbcbb5&clientId=ua50102d1-7274-4&from=paste&height=573&id=u46b64822&originHeight=573&originWidth=1451&originalType=binary&ratio=1&rotation=0&showTitle=false&size=90815&status=done&style=none&taskId=ud82bbfdb-971d-424f-b162-c2c2e709480&title=&width=1451)
详细兼容性情况可以在 [Can I Use](https://caniuse.com/?search=Beacon%20API) 网站上查看。

### 4.2 Beacon API 的优缺点

Beacon API 的主要优点是可以在后台异步地发送数据，不影响当前页面的加载和性能。同时，由于可以在页面卸载或关闭时，将数据发送给服务器，因此可以提高数据的完整性和精确性。但是，Beacon API 也存在一些缺点，例如无法进行请求的细节控制、无法进行请求的回调处理等。

## 5. Beacon API 的使用建议和注意事项

### 5.1 Beacon API 的使用建议

在使用 Beacon API 时，需要注意以下几点：

- 数据的大小应该尽量小，以便快速进行发送。
- 目标 URL 应该可靠，以便数据能够被正确地发送到服务器。
- Beacon API 可以在页面卸载或关闭时，将数据发送给服务器，因此需要考虑数据的时效性。
- 在使用 Beacon API 时，应该注意页面的性能和用户体验，避免影响用户的正常操作。

### 5.2 Beacon API 的注意事项

在使用 Beacon API 时，需要注意以下几点：

- Beacon API 可能存在兼容性问题，需要进行兼容性处理。
- 在使用 Beacon API 时，应该适当地进行数据的加密和压缩，以保证数据的安全性和传输效率。
- 在使用 Beacon API 时，应该注意服务器的接收能力和处理能力，以避免服务器端的性能问题。

## 6. 总结

Beacon API 是一种新的浏览器 API，可以用于在浏览器后台异步地发送数据，而不影响当前页面的加载和性能。使用 Beacon API 可以实现页面性能监控、异常日志记录、用户行为追踪等功能，具有一定的实际应用价值。
在使用 Beacon API 时，需要注意数据的大小、目标 URL 的可靠性、数据的时效性、性能和用户体验等问题，同时也需要注意兼容性、数据的安全性和服务器端的性能问题。

## 拓展阅读

- [MDN Web Docs：Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API)
- [Google Developers：Using the Beacon API for Analytics](https://developers.google.com/web/updates/2016/04/beacon-api-removes-document-write)
