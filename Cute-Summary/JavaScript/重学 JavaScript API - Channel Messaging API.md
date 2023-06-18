## 🏝 1. 快速入门

### 1.1 概念介绍

[Channel Messaging API](https://developer.mozilla.org/zh-CN/docs/Web/API/Channel_Messaging_API) 是一种在浏览器窗口或标签页之间进行**双向通信**的 API。它基于消息传递机制，允许在不同的上下文中创建通信通道，以便安全地发送和接收消息。这些上下文可以是不同的窗口、标签页或者同一页面中的不同 iframe。

### 1.2 作用和使用场景

Channel Messaging API 在许多场景下都非常有用。以下是一些常见的使用场景：

- **跨窗口通信**

当一个应用程序包含多个窗口或标签页时，可以使用 Channel Messaging API 在它们之间进行实时的双向通信，以便共享数据或实现协作。

- **跨文档通信**

如果网页中包含多个 iframe，每个 iframe 都代表不同的文档，那么可以使用 Channel Messaging API 在这些 iframe 之间进行通信，以实现数据的共享和同步操作。

- **Web Workers 通信**

Web Workers 是在后台线程中运行 JavaScript 的一种机制。Channel Messaging API 可以用于在主线程和 Web Workers 之间进行高效的通信，以便共享数据和进行协作计算。

## 🎨 2. 如何使用

Channel Messaging API 的使用非常简单和直观。下面是一些示例代码，展示了如何创建通道并发送消息。

```javascript
// 在第一个窗口中创建一个通道
const channel = new MessageChannel();

// 获取通道的两个端口
const port1 = channel.port1;
const port2 = channel.port2;

// 监听消息事件
port1.onmessage = function (event) {
  console.log("接收到消息:", event.data);
};

// 发送消息到第二个窗口
port2.postMessage("Hello, 第二个窗口!");
```

在这个示例中，我们首先创建了一个通道 channel，然后从该通道中获取了两个端口 `port1` 和 `port2`。我们可以通过监听 `port1` 的 `onmessage `事件来接收来自其他窗口的消息，而通过调用 `postMessage` 方法并传递消息内容，我们可以向其他窗口发送消息。

## 🧭 3. 实际应用

Channel Messaging API 的实际应用非常广泛，特别是在以下场景中：

### 3.1 多窗口协作编辑

当多个窗口需要共同编辑文档或实时协作时，可以使用 Channel Messaging API 进行实时的数据同步和通信。

```javascript
// 窗口1代码
const channel = new MessageChannel();
const port1 = channel.port1;
port1.onmessage = function (event) {
  console.log("窗口1接收到消息:", event.data);
};

// 窗口2代码
const port2 = channel.port2;
port2.postMessage("窗口2发送的消息");
```

### 3.2 跨域通信

**在不同域名或不同协议的页面之间进行通信通常是不被允许的**，但通过使用 Channel Messaging API，可以在这些页面之间安全地传递消息。

```javascript
// 页面1代码
const iframe = document.createElement("iframe");
iframe.src = "https://www.example.com/page2.html";
document.body.appendChild(iframe);

const channel = new MessageChannel();
const port1 = channel.port1;

port1.onmessage = function (event) {
  console.log("页面1接收到消息:", event.data);
};
iframe.contentWindow.postMessage("页面1发送的消息", "*", [channel.port2]);

// 页面2（https://www.example.com/page2.html）代码
window.addEventListener(
  "message",
  function (event) {
    const port = event.ports[0];
    port.onmessage = function (event) {
      console.log("页面2接收到消息:", event.data);
    };
    port.postMessage("页面2发送的消息");
  },
  false
);
```

### 3.3 视频会议或聊天应用

Channel Messaging API 可以用于在不同的窗口或标签页之间进行**实时的音视频数据传输和通信**，实现视频会议或聊天应用程序。

```javascript
// 窗口1代码
const channel = new MessageChannel();
const port1 = channel.port1;
port1.onmessage = function (event) {
  console.log("窗口1接收到消息:", event.data);
};

// 窗口2代码
const port2 = channel.port2;
port2.postMessage("窗口2发送的消息");
```

## 📋 4. 兼容性和优缺点

### 4.1 兼容性

以下是 Channel Messaging API 的兼容性列表，包含了主流浏览器及其支持的最低版本：

- Chrome 4+✅
- Firefox 41+✅
- Safari 5+✅
- Edge 12+✅
- Opera 11.5+✅
- IE 10+✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1685928391112-5962f7c9-5494-48e1-b10f-5f6daeb1ebda.png#averageHue=%23dcccb5&clientId=u07c2bb07-a58e-4&from=paste&height=586&id=ud8ea5035&originHeight=586&originWidth=1449&originalType=binary&ratio=1&rotation=0&showTitle=false&size=89192&status=done&style=none&taskId=ufd367bdc-03cd-46a8-bf56-f76a0fc6773&title=&width=1449)
也可以在 [caniuse.com](https://caniuse.com/?search=Channel%20messaging) 上查看具体的兼容性信息。

### 4.2 优缺点

Channel Messaging API 具有以下优点和一些限制：
**优点**：

- 高效的消息传递：Channel Messaging API 提供了一种高效的消息传递机制，可在不同上下文间快速地发送和接收消息。
- 安全性：由于通信是在同一源或经过双方信任的源之间进行的，因此 Channel Messaging API 提供了一种安全的通信方式，防止恶意代码的干扰。

**限制**：

- 通信范围受限：Channel Messaging API 只能在同一源或信任的源之间进行通信，限制了其在跨域通信方面的应用。
- 窗口间的依赖关系：在多窗口通信中，窗口之间的创建和关闭顺序可能会导致通信失败或不可预测的结果。

### 4.3 工具推荐

在使用 Channel Messaging API 进行开发时，以下工具可能对您有所帮助：

- [DevTools](https://github.com/ChromeDevTools/devtools-frontend)：2.7K ⭐， Chrome 浏览器开发者工具。The Chrome DevTools UI
- [Comlink](https://github.com/GoogleChromeLabs/comlink)：9.7K ⭐，一个简化 Web Workers 通信的库，可与 Channel Messaging API 配合使用。Comlink makes WebWorkers enjoyable.
- [Postmate](https://github.com/dollarshaveclub/postmate)：1.8K ⭐，一个小巧的、易于使用的跨窗口通信库。📭 A powerful, simple, promise-based postMessage library.

## 🎯 5. 使用建议和注意事项

以下是一些建议和注意事项：

- **确保通信的安全性**：由于通信是在不同的上下文之间进行的，确保只与受信任的源进行通信，以防止安全漏洞和恶意行为。
- **考虑跨域限制**：在涉及跨域通信的场景中，了解并遵守浏览器的跨域安全策略，或者使用相关的跨域解决方案。
- **注意窗口的打开和关闭顺序**：在多窗口通信中，确保正确管理窗口的打开和关闭顺序，以避免通信中的问题。
- **进行适当的错误处理和异常处理**：在消息传递过程中，处理可能发生的错误和异常情况，以提高应用程序的健壮性和可靠性。

## 🍭 6. 总结

Channel Messaging API 为开发人员提供了在不同窗口或页面之间进行安全且高效通信的机制。通过使用该 API，我们可以实现跨文档的消息传递，从而在不同的上下文中共享数据和实现协作。

## 📚 7. 拓展阅读

- [Channel Messaging API 文档](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API)
- [HTML Living Standard 中的 Channel Messaging API](https://html.spec.whatwg.org/multipage/web-messaging.html#channel-messaging)
- [Web Workers 文档](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Broadcast Channel API 文档](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
