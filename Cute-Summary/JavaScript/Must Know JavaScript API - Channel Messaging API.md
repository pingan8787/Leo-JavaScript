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
- [**Intersection Observer API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-intersection-observer-api-3d00f4f3aa6d)

## 🏝 1. Quick Start

### 1.1 Introduction

The [Channel Messaging API](https://developer.mozilla.org/zh-CN/docs/Web/API/Channel_Messaging_API) is an API for **bi-directional communication** between browser windows or tabs. It is based on the messaging mechanism that allows creating communication channels in different contexts in order to send and receive messages securely. These contexts can be different windows, tabs or different iframes within the same page.

### 1.2 Use Case

The Channel Messaging API is very useful in many scenarios. The following are some common usage scenarios:

- **Cross-Window Communication**

When an application contains multiple windows or tabs, the Channel Messaging API can be used to communicate between them in real time and in both directions to share data or enable collaboration.

- **Cross-Document Communication**

If a web page contains multiple iframes, each representing a different document, then the Channel Messaging API can be used to communicate between these iframes to share data and synchronize operations.

- **Web Workers Communication**

Web Workers are a mechanism for running JavaScript in a background thread, and the Channel Messaging API can be used to efficiently communicate between the main thread and Web Workers to share data and perform collaborative computations.

## 🎨 2. How to use

The Channel Messaging API is very simple and intuitive to use. Here is some sample code that shows how to create a channel and send messages.

```javascript
// Create a channel in the first window
const channel = new MessageChannel();

// Get the two ports of the channel
const port1 = channel.port1;
const port2 = channel.port2;

// Listening for message events
port1.onmessage = function (event) {
  console.log("Received message:", event.data);
};

// Send a message to the second window
port2.postMessage("Hello, Second window!");
```

In this example, we first create a channel, and then get two ports `port1` and `port2` from that channel. We can receive messages from other windows by listening to the `onmessage ` event of `port1`, and we can send messages to other windows by calling the `postMessage` method and passing the message content.

## 🧭 3. Examples

The Channel Messaging API has a wide range of practical applications, particularly in the following scenarios:

### 3.1 Multi-Window collaborative editing

When multiple windows need to edit documents together or collaborate in real time, the Channel Messaging API can be used for real-time data synchronization and communication.

```javascript
// Window 1 code
const channel = new MessageChannel();
const port1 = channel.port1;
port1.onmessage = function (event) {
  console.log("Window 1 receives the message.", event.data);
};

// Window 2 Code
const port2 = channel.port2;
port2.postMessage("Message sent by window 2");
```

### 3.2 Cross-Domain Communication

**Communicating between pages with different domains or different protocols is usually not allowed**, but by using the Channel Messaging API it is possible to securely pass messages between these pages.

```javascript
// Page 1 code
const iframe = document.createElement("iframe");
iframe.src = "https://www.example.com/page2.html";
document.body.appendChild(iframe);

const channel = new MessageChannel();
const port1 = channel.port1;

port1.onmessage = function (event) {
  console.log("Page 1 receives the message.", event.data);
};
iframe.contentWindow.postMessage("Message sent by page 1", "*", [
  channel.port2,
]);

// Page 2（https://www.example.com/page2.html）
window.addEventListener(
  "message",
  function (event) {
    const port = event.ports[0];
    port.onmessage = function (event) {
      console.log("Page 2 receives the message.", event.data);
    };
    port.postMessage("Message sent by page 2");
  },
  false
);
```

### 3.3 Video Conferencing or Chat Applications

The Channel Messaging API can be used for **real-time audio and video data transfer and communication** between different windows or tabs to implement video conferencing or chat applications.

```javascript
// Window 1 code
const channel = new MessageChannel();
const port1 = channel.port1;
port1.onmessage = function (event) {
  console.log("Window 1 receives the message.", event.data);
};

// Window 2 code
const port2 = channel.port2;
port2.postMessage("Message sent by window 2");
```

## 📋 4. Compatibility and advantages and disadvantages

### 4.1 Compatibility

These are the compatibility lists for the Channel Messaging API, including the major browsers and the minimum versions they support:

- Chrome 4+✅
- Firefox 41+✅
- Safari 5+✅
- Edge 12+✅
- Opera 11.5+✅
- IE 10+✅

You can find details at [caniuse.com](https://caniuse.com/?search=Channel%20messaging).

### 4.2 Pros and Cons

The Channel Messaging API has the following advantages and some limitations:

**Advantages**：

- **Efficient Messaging**: The Channel Messaging API provides an efficient messaging mechanism for sending and receiving messages quickly across contexts.
- **Security**: The Channel Messaging API provides a secure way of communicating against malicious code since communication takes place between the same source or between sources that are trusted by both parties.

**Restrictions**：

- **Limited communication scope**: The Channel Messaging API can only communicate between the same source or trusted sources, limiting its application to cross-domain communication.
- **Inter-window dependencies**: In multi-window communication, the order of creation and closure between windows may lead to communication failures or unpredictable results.

### 4.3 Tool Recommendations

- [DevTools](https://github.com/ChromeDevTools/devtools-frontend)：2.7K ⭐ The Chrome DevTools UI
- [Comlink](https://github.com/GoogleChromeLabs/comlink)：9.7K ⭐ Comlink makes WebWorkers enjoyable.
- [Postmate](https://github.com/dollarshaveclub/postmate)：1.8K ⭐ 📭 A powerful, simple, promise-based postMessage library.

## 🎯 5. Usage suggestions and considerations

I have compiled some suggestions and considerations:

- **Ensure communication security**: As communication takes place between different contexts, ensure that you only communicate with trusted sources to prevent security breaches and malicious behavior.
- **Consider cross-domain restrictions**: In scenarios involving cross-domain communication, understand and comply with the browser's cross-domain security policy or use a relevant cross-domain solution.
- **Attend to window opening and closing order**: In multi-window communication, ensure that the order of window opening and closing is properly managed to avoid problems in communication.
- **Perform proper error handling and exception handling**: Handle errors and exceptions that may occur during message passing to improve the robustness and reliability of the application.

## 🍭 6. Summary

The Channel Messaging API provides developers with a mechanism for secure and efficient communication between different windows or pages. By using this API, we can implement cross-document messaging to share data and collaborate in different contexts.

## 📚 7. Extensions

- [Channel Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API)
- [HTML Living Standard - Channel Messaging API](https://html.spec.whatwg.org/multipage/web-messaging.html#channel-messaging)
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
