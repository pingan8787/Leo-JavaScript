## 🏝 1. 什么是 Fetch API

### 1.1 概念介绍

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 是一种现代的 JavaScript API，用于进行**网络请求**。它提供了一种更简洁、灵活的方式来发送和接收数据，并取代了传统的 [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)。
Fetch API 使用 Promise 对象处理异步操作，使得处理网络请求变得更加直观和易用。

### 1.2 作用和使用场景

Fetch API 主要用于从服务器获取数据，发送数据到服务器或与远程 API 进行通信。它支持各种类型的网络请求，例如获取文本、JSON、XML 或二进制数据，以及发送表单数据或上传文件等。
Fetch API 在现代的前端开发中被广泛使用，特别适用于构建单页应用程序、使用 RESTful API 进行数据交互、实现异步数据加载等场景。

## 🎨 2.如何使用 Fetch API

使用 Fetch API 非常简单和直观。下面是一个基本的使用示例，展示了如何发送一个 GET 请求并处理响应：

```javascript
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => {
    // 处理获取的数据
    console.log(data);
  })
  .catch((error) => {
    // 处理请求错误
    console.error(error);
  });
```

上述代码中，我们使用 `fetch()` 函数发送了一个 GET 请求到指定的 URL，然后使用` .then()` 方法处理返回的响应。
在第一个 `.then()` 中，我们调用 `response.json()` 将响应转换为 JSON 格式的数据。
在第二个`.then()` 中，我们可以访问获取到的数据，并对其进行处理。
如果请求出现错误，我们可以使用 `.catch()` 方法来捕获并处理错误。

除了 GET 请求之外，Fetch API 还支持其他类型的请求，例如 `POST`、`PUT`、`DELETE` 等。你可以通过设置请求的方法、头部信息和请求体来发送不同类型的请求。
更多关于 Fetch API 的用法和参数设置，请参考官方文档：[Fetch API - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 🧭 3. Fetch API 的实际应用

Fetch API 在实际应用中具有广泛的用途。下面是一些常见的实际应用场景：

### 3.1 数据获取和展示

通过 Fetch API 可以从服务器获取数据并在页面上展示。你可以获取 JSON、XML 或其他格式的数据，并将其呈现给用户。

```javascript
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => {
    // 处理获取的数据并展示在页面上
    const container = document.getElementById("data-container");
    data.forEach((item) => {
      const element = document.createElement("p");
      element.textContent = item.name;
      container.appendChild(element);
    });
  })
  .catch((error) => {
    // 处理请求错误
    console.error(error);
  });
```

上述代码通过 Fetch API 从服务器获取数据，并将数据展示在页面上。假设页面中有一个 id 为 `data-container` 的容器元素，将获取到的数据逐项创建 `<p>` 元素，并添加到容器中展示。

### 3.2 表单提交和验证

Fetch API 可以用于将用户输入的表单数据发送到服务器进行处理。你可以使用 Fetch API 发送 POST 请求，并在服务器端进行数据验证和处理。

### 3.3 文件上传

使用 Fetch API，你可以发送包含文件的请求，实现文件上传的功能。这对于构建图片上传、文件存储等应用非常有用。

```javascript
const fileInput = document.getElementById("file-input");
const uploadButton = document.getElementById("upload-button");

uploadButton.addEventListener("click", () => {
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  fetch("https://api.example.com/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        // 文件上传成功
        console.log("File uploaded successfully");
      } else {
        // 文件上传失败
        console.error("File upload failed");
      }
    })
    .catch((error) => {
      // 处理请求错误
      console.error(error);
    });
});
```

上述代码通过 Fetch API 实现了文件上传的功能。通过监听上传按钮的点击事件，获取用户选择的文件，并将文件通过 `FormData` 的形式发送到服务器的上传接口。
请注意，上述代码中的 URL `https://api.example.com/upload` 和表单元素的 id `file-input`、`upload-button` 仅为示意，你需要将其替换为实际的上传接口和页面元素。

### 3.4 异步数据加载

Fetch API 的异步特性使其非常适合用于异步数据加载。你可以在页面加载时使用 Fetch API 请求数据，以避免阻塞页面渲染，并在数据加载完成后进行相应的处理。

```javascript
// 异步加载数据
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => {
    // 处理获取的数据
    console.log(data);
  })
  .catch((error) => {
    // 处理请求错误
    console.error(error);
  });
```

上述代码使用 Fetch API 异步加载数据，并在获取到数据后进行相应的处理。假设服务器端返回的数据是 JSON 格式，我们通过调用 `response.json()` 方法将响应数据解析为 JavaScript 对象。

### 3.5 跨域请求

Fetch API 具有内置的跨域请求支持，因此可以轻松处理跨域请求。这在与不同域的服务器进行数据交互时非常有用。

```javascript
// 发送跨域请求
fetch("https://api.example.com/data", {
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://example.com",
  },
})
  .then((response) => response.json())
  .then((data) => {
    // 处理获取的跨域数据
    console.log(data);
  })
  .catch((error) => {
    // 处理请求错误
    console.error(error);
  });
```

上述代码展示了如何发送跨域请求。在请求的参数中，我们设置了 `mode: 'cors'` 表示允许跨域请求，并通过设置请求头部的 `'Access-Control-Allow-Origin'` 字段指定了允许跨域访问的域名。
需要注意的是，跨域请求的成功与否还受到服务器端的配置限制，服务器需要设置正确的响应头部以允许跨域请求。

以上仅是 Fetch API 的一些常见应用场景，实际上，它在前端开发中的应用非常广泛，涵盖了各种数据交互和网络请求的需求。

## 📋 4. 兼容性和优缺点

### 4.1 兼容性

以下是 Fetch API 在常见现代浏览器中的兼容性情况：

- Chrome 40+ ✅
- Firefox 39+ ✅
- Safari 10.1+ ✅
- Edge 14+ ✅

对于 Internet Explorer（IE），Fetch API 在 IE11 及更早版本中不受支持。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1683790715624-df7d81ea-4769-49fd-a552-a62ca10f0f86.png#averageHue=%23dbcbb7&clientId=u1e887976-1464-4&from=paste&height=474&id=u5d1c8ef5&originHeight=474&originWidth=1443&originalType=binary&ratio=1&rotation=0&showTitle=false&size=80281&status=done&style=none&taskId=u8dc7fe57-6eb5-42f9-871e-6d952059f4d&title=&width=1443)
详细兼容性信息，请访问 [Can I use Fetch](https://caniuse.com/fetch)。

### 4.2 优缺点

Fetch API 带来了许多优点，但也有一些限制和缺点：
优点：

- **简洁易用**：Fetch API 提供了简洁的语法和链式调用的方式，使得发送和处理网络请求变得更加直观和易于理解。
- **支持 Promise**：Fetch API 使用 Promise 对象处理异步操作，使得处理请求和响应更加灵活和便捷。
- **内置的跨域请求支持**：Fetch API 默认支持跨域请求，无需额外配置。
- **支持流数据**：Fetch API 支持处理流数据，使得处理大型数据或流式数据更加高效。

缺点：

- **不支持同步请求**：Fetch API 只支持异步请求，不支持同步请求。这意味着在某些特定场景下可能需要使用其他方式来处理同步请求的需求。
- **兼容性问题**：部分较老的浏览器不支持 Fetch API，需要考虑兼容性问题，并做相应的降级处理。

### 4.3 工具推荐

以下是基于 Fetch API 封装的一些第三方库：

1. [axios](https://github.com/axios/axios): 100k⭐， 一个基于 Promise 的 HTTP 客户端，提供简洁易用的 API。
2. [SuperAgent](https://github.com/visionmedia/superagent): 16.3k⭐， 轻量级的 Ajax 客户端库，支持链式调用和 Promise。
3. [Fetch API Polyfill](https://github.com/github/fetch): 26k⭐， Fetch API 的 polyfill 库，在不支持 Fetch API 的浏览器中提供兼容性支持。
4. [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch): 7k⭐， 提供 Fetch API 兼容性支持的库，适用于浏览器和 Node.js 等环境。

## 👍 5. 使用建议和注意事项

使用 Fetch API 时，以下是一些建议和注意事项：

1. **异常处理**

使用 `.catch()` 方法来捕获请求过程中可能发生的错误，并进行适当的处理，例如显示错误信息给用户或进行备用操作。

2. **跨域请求**

在进行跨域请求时，确保服务器端已配置允许跨域访问的响应头信息（例如 CORS）。否则，跨域请求可能会受到限制。

3. **请求和响应处理**

根据需要设置请求的方法、头部信息和请求体，并在响应中使用合适的方法（如 `response.json()`、`response.text()` 等）来解析和处理返回的数据。

4. **数据格式处理**

根据服务器返回的数据格式，使用相应的方法（如 `response.json()`、`response.text()`）来解析响应数据。

5. **兼容性考虑**

如果需要在较老的浏览器中使用 Fetch API，可以考虑使用 polyfill 或使用传统的 `XMLHttpRequest` 进行兼容处理。

6. **性能优化**

在发送请求时，可以使用请求头部信息、请求方法和缓存设置等来优化请求性能和网络资源利用。

## 🍭 6. 总结

Fetch API 是现代 JavaScript 中用于进行网络请求的强大工具。它提供了简洁易用的语法和 Promise 支持，使得处理网络请求变得更加直观和便捷。
通过了解 Fetch API 的概念、使用方法和实际应用场景，你可以在前端开发中更加灵活地处理数据交互、异步数据加载和与服务器的通信。

## 🎯 7. 拓展

如果你想深入了解 Fetch API 的更多内容，可以参考以下资源：

1. [Fetch API - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API): MDN Web Docs 提供了详细的 Fetch API 文档，包含用法示例和参数说明。
2. [Using Fetch - Google Developers](https://developers.google.com/web/updates/2015/03/introduction-to-fetch): Google Developers 提供了一篇关于使用 Fetch API 的详细介绍和示例。
3. [Fetch API Polyfill](https://github.com/github/fetch): 如果你需要在旧版浏览器中使用 Fetch API，可以考虑使用 Fetch API 的 polyfill。
4. [Ajax vs Fetch: Which Should You Choose](https://www.sitepoint.com/ajax-vs-fetch-api/): 这篇文章对比了传统的 Ajax 请求和 Fetch API，帮助你理解何时选择使用 Fetch API。
5. [Fetch API vs Axios: Which Should You Choose](https://blog.bitsrc.io/fetch-api-vs-axios-js-for-making-http-requests-32bec2475d1b): 这篇文章比较了 Fetch API 和 Axios 这两种常用的网络请求工具，帮助你选择适合你的项目的工具。

通过进一步学习和实践，你将更加熟练地运用 Fetch API，提升前端开发的能力和效率。
