Welcome to the **Must Know JavaScript API** series, this series will learn the **JavaScript API** with you, so that you can be more proficient in using it like a senior engineer. Let's start learning together:

- [**Page Visibility API**](https://javascript.plainenglish.io/must-know-javascript-api-page-visibility-api-9f3e10439842)
- [**Broadcast Channel API**](https://javascript.plainenglish.io/must-know-javascript-api-broadcast-channel-api-f059860f9349)
- [**Resize Observer API**](https://javascript.plainenglish.io/must-know-javascript-api-resize-observer-api-9420aab1a74)
- [**Beacon API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-beacon-api-4abe0bee29ff)
- [**Clipboard API**](https://javascript.plainenglish.io/must-know-javascript-api-clipboard-api-22ac0861e27b)
- [**Fetch API**](https://javascript.plainenglish.io/must-know-javascript-api-fetch-api-11846c9a3b07)
- [**Performance API**](https://javascript.plainenglish.io/must-know-javascript-api-performance-api-85f7b8306b90)
- [**Storage API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-storage-api-2141f3066858)

The WebSockets API provides a mechanism to establish a persistent connection between the client and the server, making the transfer of real-time data much easier and more efficient.

## 🏝 1. 1. What is WebSockets API

### 1.1 Introduction

The WebSockets API **allows two-way communication between a browser and a server**. Compared to the traditional HTTP request-response model, WebSockets allows the server to actively push data to the client, enabling real-time and bi-directional communication. It is built on top of the standard HTTP protocol and uses standard WebSocket URLs for communication.

### 1.2 Use Case

The WebSockets API has many useful scenarios, including real-time chat applications, multi-person collaboration tools, real-time data monitoring, and games.
By using WebSockets, developers can easily implement features such as real-time updates, instant notifications, and real-time data transfer to provide a better user experience.

## 🎨 2. How to use the WebSockets API

The WebSockets API is relatively simple to use, requiring only a few basic steps:

1. **Create a WebSocket connection**

In the client code, use JavaScript to create a WebSocket object and establish a connection to the server via a WebSocket URL.

```javascript
const socket = new WebSocket("ws://example.com/socket");
```

2. **Handling connection events**

After the connection is established, the WebSocket object will trigger different events that we can listen to in order to handle the connection status and receive data.

```javascript
socket.onopen = () => {
  console.log("WebSocket connection established");
};

socket.onmessage = (event) => {
  console.log("Message received:", event.data);
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};
```

3. **Send and receive data**

Send data to the server via the `send()` method of the WebSocket object, and the server can use the `send()` method to send data to the client.

```javascript
// Sending data
socket.send("Hello, Server!");

// Receive data
socket.onmessage = (event) => {
  console.log("Received message:", event.data);
};
```

4. **Closing the connection**

When the WebSocket connection is no longer needed, you can close it by calling the `close()` method of the WebSocket object.

```javascript
socket.close();
```

## 🧭 3. Examples

The WebSockets API plays an important role in many real-world applications. Here are a few common application scenarios:

### 3.1 Real-time chat applications

WebSockets can be used to build real-time chat applications where users can send and receive messages in real time. By establishing a persistent WebSocket connection, users can instantly receive messages from other users, enabling a real-time chat experience.

```javascript
// client-side code
const socket = new WebSocket("ws://example.com/chat");

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  displayMessage(message);
};

function sendMessage(message) {
  socket.send(JSON.stringify(message));
}
```

### 3.2 Real-time data monitoring

WebSockets can be used to monitor changes in real-time data. For example, a real-time stock market monitoring application can get real-time stock prices through a WebSocket connection and display them to the user in real time.

```javascript
// client-side code
const socket = new WebSocket("ws://example.com/stocks");

socket.onmessage = (event) => {
  const stockData = JSON.parse(event.data);
  displayStockPrices(stockData);
};
```

### 3.3 Game Development

The WebSockets API provides a powerful foundation for multiplayer game development. Game servers can use WebSockets to establish two-way communication with clients and transmit game state and player actions in real time.

```javascript
// client-side code
const socket = new WebSocket("ws://example.com/game");

socket.onmessage = (event) => {
  const gameData = JSON.parse(event.data);
  updateGame(gameData);
};

function sendPlayerAction(action) {
  socket.send(JSON.stringify(action));
}
```

## 📋 4. Compatibility and advantages and disadvantages

### 4.1 Compatibility

These are the minimum versions of major browsers supported by the WebSockets API:

- Chrome 4+✅
- Firefox 4+✅
- Safari 5+✅
- Edge 12+✅
- Opera 11.5+✅
- Internet Explorer 10+✅
- iOS Safari 4.2+✅
- Android Browser 4.4+✅
- Chrome for Android 33+✅
- Firefox for Android 4+✅

You can find details at [Can I use](https://caniuse.com/?search=websockets).

### 4.2 Pros and Cons

The WebSockets API has the following advantages:

- **Real-time**

**real-time data transfer** and **two-way communication** by establishing persistent connections.

- **Lower latency**

Compared to traditional polling mechanisms, WebSockets can **reduce invalid requests and responses** and reduce latency.

- **Save bandwidth**

WebSockets are more efficient at transferring data because **less frequent requests and responses** are required.

However, the WebSockets API also has some drawbacks:

- **Compatibility issues**

Although WebSockets is widely supported by modern browsers, some older versions of browsers may not support it or have some limitations. Applications need to be designed with compatibility issues in mind and provide alternatives to handle cases where WebSockets are not supported.

- **Server Overhead**

WebSockets requires the server to maintain persistent connections compared to the traditional HTTP request-response model, which can increase the load on the server.

- **Security Considerations**

Since WebSockets allows the server to actively push data to the client, security issues need to be carefully considered to prevent potential security vulnerabilities.

### 4.3 Tool Recommendations

A few commonly used tools are recommended:

- [Socket.IO](https://socket.io/) 58.2K⭐

A JavaScript framework for real-time applications that provides cross-browser bi-directional communication. It supports scenarios such as real-time chat, real-time analytics, and real-time collaboration.

- [ws](https://github.com/websockets/ws) 19.8K⭐

An easy-to-use WebSocket client and server library for Node.js that provides basic WebSocket functionality and supports custom extensions.

- [uWebSockets](https://github.com/uWebSockets/uWebSockets) 15.4K⭐

A fast, lightweight WebSocket library for building high-performance real-time applications. It provides an easy-to-use interface and supports multi-threaded and event-driven architectures.

- [SignalR](https://github.com/SignalR/SignalR) 8.9K⭐

A library of real-time Web functionality for ASP.NET developers that establishes bi-directional communication between the browser and the server. It supports multiple client-side technologies, including JavaScript, .

- [sockjs-client](https://github.com/sockjs/sockjs-client) 8.2K⭐

A JavaScript library for creating cross-browser real-time applications that provides a WebSocket-like API and uses polling techniques for fallback in browsers that do not support WebSocket.

## 👍 5. Usage suggestions and considerations

The following are some suggestions and considerations for use:

- **Consider compatibility**

When designing and implementing applications, you need to consider compatibility across browsers and platforms and provide alternatives to handle situations where WebSockets are not supported.

- **Handle connection breaks**

In client-side code, connection drops and errors need to be handled, such as network failures or server disconnections. These can be caught by listening for `onclose` and `onerror` events.

- **Security measures**

Ensure appropriate security measures are in place for WebSocket connections to prevent potential security vulnerabilities and attacks. Use a secure connection (`wss://`) and appropriate authentication and authorization mechanisms.

- **Consider server load**.

Since WebSockets requires the maintenance of persistent connections, the server load may increase. Load balancing and scalability need to be considered when designing the server architecture.

- **Data transfer volume control**

Take care to control the amount of data transfer to avoid excessive data transfer that negatively affects bandwidth and performance.

## 🍭 6. Summary

The WebSockets API provides a convenient solution for real-time and two-way communication. By using WebSockets, developers can easily build applications such as real-time chat applications, real-time data monitoring, and multiplayer games.

The extensive support and power of the WebSockets API makes it an integral part of modern Web development. With proper usage and considerations, we can leverage WebSockets to achieve better user experience and functionality.

## 🎯 7. Extensions

- [WebSockets API 文档](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [WebSockets 兼容性](https://caniuse.com/websockets)
- [Introducing WebSockets - Bringing Sockets to the Web](https://web.dev/websockets-basics/)

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
