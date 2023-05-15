## 🏝 1. 什么是 Clipboard API

### 1.1 概念介绍

[Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) 是一组 JavaScript API，用于在浏览器中操作剪贴板。通过 Clipboard API，开发者可以将文本、图片和其他数据复制到剪贴板，也可以从剪贴板中读取数据，实现复制、剪切和粘贴等功能。

### 1.2 作用和使用场景

Clipboard API 可以广泛应用于各种 Web 应用程序中，例如：

- 在文本编辑器中实现复制、剪切和粘贴功能。
- 在图像编辑器中实现复制和粘贴图像功能。
- 在网页中实现复制分享链接的功能。

## 🎨 2. 如何使用 Clipboard API

Clipboard API 包括两个主要的接口：`Clipboard` 和 `DataTransfer`。
Clipboard 接口用于操作系统剪贴板（例如 Windows 或 macOS 中的剪贴板），它包含以下方法：

- `writeText(text: string): Promise<void>`：将文本复制到剪贴板。
- `readText(): Promise<string>`：从剪贴板读取文本。

以下是一个使用 Clipboard 接口将文本复制到剪贴板的示例：

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

在这个示例中，点击「Copy to Clipboard」按钮会，就能成功复制「'Hello, World!'」这段文本。

`DataTransfer` 接口用于在应用程序内部模拟剪贴板，它包含以下方法：

- `setData(type: string, data: string): void`：将指定类型的数据复制到剪贴板。
- `getData(type: string): string`：从剪贴板读取指定类型的数据。

以下是一个使用 `DataTransfer` 接口将文本复制到剪贴板的示例：

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

## 🧭 3. Clipboard API 的实际应用

以下是 Clipboard API 的一些实际应用场景：

### 3.1 复制文本

可以使用 Clipboard 接口将文本复制到剪贴板，以下是一个示例：

```javascript
navigator.clipboard
  .writeText("Hello, World!")
  .then(() => console.log("Text copied to clipboard"))
  .catch((error) => console.error("Failed to copy text: ", error));
```

### 3.2 复制图片

可以使用 `DataTransfer` 接口将图片复制到剪贴板，以下是一个示例：

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

### 3.3 从剪贴板中读取数据

可以使用 Clipboard 接口从剪贴板中读取文本，以下是一个示例：

```javascript
navigator.clipboard
  .readText()
  .then((text) => console.log("Text read from clipboard: ", text))
  .catch((error) =>
    console.error("Failed to read text from clipboard: ", error)
  );
```

## 📋 4. Clipboard API 的兼容性和优缺点

### 4.1 Clipboard API 的兼容性

以下是 Clipboard API 的兼容性情况：

- Chrome: 43+ ✅
- Edge: 12+ ✅
- Firefox: 41+ ✅
- Internet Explorer: ❌
- Opera: 29+ ✅
- Safari: 10+ ✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1684157444459-bf4911e0-3acd-4ac6-a4b0-fa62954ea4d9.png#averageHue=%23302a1b&clientId=u1270148a-12bb-4&from=paste&height=1058&id=ua9b7394c&originHeight=1058&originWidth=2906&originalType=binary&ratio=2&rotation=0&showTitle=false&size=288366&status=done&style=none&taskId=ube09861d-3793-458c-80fe-fab5ac51ae0&title=&width=2906)
可以使用 [Can I Use](https://caniuse.com/?search=Clipboard) 网站查看 Clipboard API 的兼容性情况。

### 4.2 Clipboard API 的优缺点

Clipboard API 的优点包括：

- 支持在浏览器中操作剪贴板，方便实现复制、剪切和粘贴等功能。
- 支持将各种类型的数据（文本、图片等）复制到剪贴板。
- 支持从剪贴板中读取各种类型的数据。

Clipboard API 的缺点包括：

- 兼容性问题可能会导致一些用户无法使用相关功能。
- 操作剪贴板需要获取用户的授权，可能会对用户造成不必要的干扰。
- 在某些情况下，安全性可能存在问题，例如恶意网站可能会获取用户复制到剪贴板中的敏感信息。

## 👍 5. Clipboard API 的使用建议和注意事项

使用 Clipboard API 时，需要注意以下事项：

- 在使用 Clipboard 接口时，需要获取用户的授权。可以在用户进行相关操作时请求授权，或者在页面加载时请求授权。
- 在使用 DataTransfer 接口时，需要在 copy 事件中设置 event.clipboardData 属性，否则复制操作可能会失败。
- 在处理剪贴板数据时，需要注意数据的类型，以避免出现意外的错误。

我们也可以使用一些第三方库，快速实现需求：

- [**clipboard.js**](https://github.com/zenorocha/clipboard.js/): 33.1K⭐，一个简单的 JavaScript 库，用于操作剪贴板。
- [**clipboard-polyfill**](https://github.com/lgarron/clipboard-polyfill/): 884⭐，一个剪贴板 polyfill 库，用于在不支持 Clipboard API 的浏览器中实现类似的功能。
- [**react-copy-to-clipboard**](https://github.com/nkbt/react-copy-to-clipboard/): 2.2K⭐，一个基于 React 的剪贴板库，用于在 React 应用程序中实现复制和粘贴功能。

以上这些库都提供了简单易用的接口，可以帮助开发者快速实现 Clipboard API 相关功能。

## 🍭 6. 总结

Clipboard API 是一组 JavaScript API，用于在浏览器中操作剪贴板。通过 Clipboard API，开发者可以将文本、图片和其他数据复制到剪贴板，也可以从剪贴板中读取数据，实现复制、剪切和粘贴等功能。
在实际应用中，Clipboard API 可以广泛应用于各种 Web 应用程序中，例如文本编辑器、图像编辑器、网页等。然而，Clipboard API 的兼容性存在一定的问题，需要开发者进行兼容性处理。
为了更好地使用 Clipboard API，开发者需要注意以下事项：

- 在使用 `Clipboard` 接口时，需要获取用户的授权。
- 在使用 `DataTransfer` 接口时，需要在 `copy` 事件中设置 `event.clipboardData` 属性。
- 在处理剪贴板数据时，需要注意数据的类型。

## 🎯 7. 拓展学习

- [MDN Web Docs: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [W3C: Clipboard API and events](https://www.w3.org/TR/clipboard-apis/)
- [Can I Use: Clipboard API](https://caniuse.com/?search=Clipboard)
