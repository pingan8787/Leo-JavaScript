Welcome to the **Must Know JavaScript API** series, this series will learn the **JavaScript API** with you, so that we can be more proficient in using it like a senior engineer. Let's start learning together:

- [**Page Visibility API**](https://javascript.plainenglish.io/must-know-javascript-api-page-visibility-api-9f3e10439842)
- [**Broadcast Channel API**](https://javascript.plainenglish.io/must-know-javascript-api-broadcast-channel-api-f059860f9349)
- [**Resize Observer API**](https://javascript.plainenglish.io/must-know-javascript-api-resize-observer-api-9420aab1a74)
- [**Beacon API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-beacon-api-4abe0bee29ff)

## 🏝 1. What is Clipboard API

The [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) is a set of JavaScript APIs for manipulating the clipboard in a browser. With the Clipboard API, developers can copy text, images and other data to the clipboard, as well as read data from the clipboard to perform functions such as copying, cutting and pasting.

### 1.2 Use Case

The Clipboard API can be widely used in various Web applications, such as

- Copy, cut and paste in a text editor.
- Copy and paste images in an image editor.
- Copy and share links in web pages.

## 🎨 2. How to use the Clipboard API

The Clipboard API includes two main interfaces: `Clipboard` and `DataTransfer`.
The Clipboard interface is used for operating system clipboards (such as the clipboard in Windows or macOS) and contains the following methods:

- `writeText(text: string): Promise<void>`: Copies text to the clipboard.
- `readText(): Promise<string>`: Reads text from the clipboard.

The following is an example of copying text to the clipboard using the Clipboard interface:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Clipboard API Example</title>
  </head>
  <body>
    <button id="copy-btn">Copy to Clipboard</button>
    <script>
      const copyButton = document.getElementById("copy-btn");
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText("Hello, World!");
          console.log("Text copied to clipboard");
        } catch (error) {
          console.error("Failed to copy text: ", error);
        }
      });
    </script>
  </body>
</html>
```

In this example, clicking the "Copy to Clipboard" button will successfully copy the text "Hello, World"!

The `DataTransfer` interface is used to simulate the clipboard inside the application, and it contains the following methods:

- `setData(type: string, data: string): void`: Copies the data of the specified type to the clipboard.
- `getData(type: string): string`: reads the data of the specified type from the clipboard.

The following is an example of copying text to the clipboard using the `DataTransfer` interface:

```javascript
const dataTransfer = new DataTransfer();
dataTransfer.setData("text/plain", "Hello, World!");

const element = document.createElement("div");
element.addEventListener("copy", (event) => {
  event.clipboardData.setData("text/plain", dataTransfer.getData("text/plain"));
  event.preventDefault();
});

document.body.appendChild(element);
element.dispatchEvent(new ClipboardEvent("copy"));
```

## 🧭 3. Examples of the Clipboard API

The following are some real-world scenarios for the Clipboard API:

### 3.1 Copying Text

Text can be copied to the clipboard using the Clipboard interface, an example of which is as follows:

```javascript
navigator.clipboard
  .writeText("Hello, World!")
  .then(() => console.log("Text copied to clipboard"))
  .catch((error) => console.error("Failed to copy text: ", error));
```

### 3.2 Copying Images

Images can be copied to the clipboard using the `DataTransfer` interface, an example of which is shown below:

```javascript
const dataTransfer = new DataTransfer();
dataTransfer.items.add(
  new File(["hello world"], "hello.txt", { type: "text/plain" })
);
dataTransfer.items.add(
  new File(["world"], "world.txt", { type: "text/plain" })
);

const element = document.createElement("div");
element.addEventListener("copy", (event) => {
  event.clipboardData.setData("text/plain", dataTransfer.getData("text/plain"));
  event.clipboardData.files = dataTransfer.files;
  event.preventDefault();
});

document.body.appendChild(element);
element.dispatchEvent(new ClipboardEvent("copy"));
```

### 3.3 Reading data from the clipboard

Text can be read from the clipboard using the Clipboard interface, an example of which is shown below:

```javascript
navigator.clipboard
  .readText()
  .then((text) => console.log("Text read from clipboard: ", text))
  .catch((error) =>
    console.error("Failed to read text from clipboard: ", error)
  );
```

## 4. Clipboard API Compatibility and Pros and Cons

### 4.1 Compatibility of the Clipboard API

The following is the compatibility status of the Clipboard API:

- Chrome: 43+ ✅
- Edge: 12+ ✅
- Firefox: 41+ ✅
- Internet Explorer: ❌
- Opera: 29+ ✅
- Safari: 10+ ✅

You can use the [Can I Use](https://caniuse.com/?search=Clipboard) website to check the compatibility of the Clipboard API.

### 4.2 Advantages and Disadvantages of the Clipboard API

The advantages of the Clipboard API include:

- Support for manipulating the clipboard in the browser to facilitate copying, cutting and pasting.
- Support for copying various types of data (text, images, etc.) to the clipboard.
- Support for reading various types of data from the clipboard.

Disadvantages of Clipboard API include:

- Compatibility issues may cause some users to be unable to use the relevant functions.
- The need to obtain authorization from the user to operate the clipboard may cause unnecessary interference to the user.
- In some cases, security may be an issue, for example, malicious websites may be able to access sensitive information copied to the clipboard by the user.

## 👍 5. Suggestions and Cautions for Using the Clipboard API

When using the Clipboard API, the following things need to be noted:

- When using the Clipboard interface, you need to get the user's authorization. You can request authorization when the user performs the relevant action, or request authorization when the page is loaded.
- When using the DataTransfer interface, you need to set the event.clipboardData property in the copy event, otherwise the copy operation may fail.
- When handling clipboard data, you need to pay attention to the type of data to avoid unexpected errors.

We can also use some third-party libraries to quickly implement the requirements:

- [**clipboard.js**](https://github.com/zenorocha/clipboard.js/): 33.1K ⭐, a simple JavaScript library for manipulating the clipboard.
- [**clipboard-polyfill**](https://github.com/lgarron/clipboard-polyfill/): 884⭐, a clipboard polyfill library for implementing similar functionality in browsers that do not support the Clipboard API.
- [**react-copy-to-clipboard**](https://github.com/nkbt/react-copy-to-clipboard/): 2.2K ⭐, a React-based clipboard library for implementing copy and paste functionality in React applications.

All of these libraries above provide easy-to-use interfaces that help developers quickly implement Clipboard API-related features.

## 🍭 6. Summary

The Clipboard API is a set of JavaScript APIs for manipulating the clipboard in the browser. Through the Clipboard API, developers can copy text, images and other data to the clipboard, as well as read data from the clipboard to achieve the functions of copy, cut and paste.
In practice, Clipboard API can be widely used in various web applications, such as text editors, image editors, web pages, etc. However, the compatibility of Clipboard API has some problems, and developers need to deal with compatibility.
In order to use Clipboard API better, developers need to pay attention to the following things:

- When using the `Clipboard` interface, you need to get the user's authorization.
- When using the `DataTransfer` interface, you need to set the `event.clipboardData` property in the `copy` event.
- When working with clipboard data, you need to pay attention to the type of data.

## 🎯 7. Expand

- [MDN Web Docs: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [W3C: Clipboard API and events](https://www.w3.org/TR/clipboard-apis/)
- [Can I Use: Clipboard API](https://caniuse.com/?search=Clipboard)

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
