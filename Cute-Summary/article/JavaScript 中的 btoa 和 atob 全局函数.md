在 JavaScript 中，`[btoa](https://developer.mozilla.org/en-US/docs/Web/API/btoa)` 和 `[atob](https://developer.mozilla.org/en-US/docs/Web/API/atob)`是两个全局函数，通常用来对**字符串**进行 Base64 **编码和解码**。

> Base64 是一种编码方法，可以将二进制数据转换成 ASCII 字符集的文本形式。这种编码方式常用于在不支持二进制数据的系统之间传输数据，比如在 Web 应用中传输图片数据。

## 1.API 介绍

### btoa() 函数

`btoa()` 方法用于将一个字符串进行 Base64 **编码**。例如，以下代码将字符串 `"Hello, world!"` 进行 Base64 编码：

```javascript
const str = "Hello, world!";
const encodedStr = btoa(str);
console.log(encodedStr); // "SGVsbG8sIHdvcmxkIQ=="
```

> **注意**：`btoa()` 方法只能对 ASCII 字符进行编码，如果字符串中包含非 ASCII 字符，则会抛出一个错误。

浏览器兼容性：
![btoa.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1713950525700-f604b541-0661-4eca-91c3-920d14b67145.png#averageHue=%23f8f8f8&clientId=ubf225f0c-3f94-4&from=ui&id=u62a22838&originHeight=520&originWidth=993&originalType=binary&ratio=2&rotation=0&showTitle=false&size=58764&status=done&style=none&taskId=u07f7f969-ccc9-4cec-8733-408ced63ad4&title=)

### atob() 函数

`atob()` 方法用于将一个 Base64 编码的字符串进行**解码**。例如：

```javascript
const encodedStr = "SGVsbG8sIHdvcmxkIQ==";
const decodedStr = atob(encodedStr);
console.log(decodedStr); // "Hello, world!"
```

> **注意**：`atob()` 方法只能对有效的 Base64 编码的字符串进行解码，如果字符串不是一个有效的 Base64 编码，则会抛出一个错误。

浏览器兼容性：
![atob.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1713950506262-259dab2e-53f1-45dc-a838-3a6680360ef0.png#averageHue=%23f8f8f8&clientId=ubf225f0c-3f94-4&from=ui&id=uf2b90df1&originHeight=523&originWidth=994&originalType=binary&ratio=2&rotation=0&showTitle=false&size=58838&status=done&style=none&taskId=u39540854-f809-47d1-9608-116325bde4e&title=)

## 2.注意事项

- `btoa`和`atob`只能处理**纯文本数据**，不能用于编码二进制数据。
- 编码后的 Base64 字符串大小会比原始数据大约 33%。
- `btoa`和`atob`是 Web 浏览器提供的函数，不是 ECMAScript 标准的一部分，因此在非浏览器环境中（如 Node.js）不可用。

## 3.相同点和不同点

`atob`和`btoa`有以下相同点和不同点：

### 相同点：

1. **编码方式**：两者都使用 Base64 编码方式。
2. **浏览器兼容性**：仅支持浏览器使用，它们都是 Web 浏览器提供的内置函数。
3. **文本操作**：`btoa()`和`atob()`函数都只能处理纯文本字符串，不能直接处理二进制数据。
4. **安全性**：由于只是进行内容编码和解码操作，所以**不建议作为加密手段使用**。

### 不同点：

以表格形式展示`btoa()`和`atob()`函数的不同点：

|
| `btoa()` | `atob()` |
| --- | --- | --- |
| **作用** | 将文本字符串转换为 Base64 编码 | 将 Base64 编码的字符串解码为文本 |
| **使用场景** | 编码文本以便在不支持二进制的环境中传输 | 解码接收到的 Base64 编码的字符串 |
| **输出格式** | Base64 编码的字符串 | 解码后的原始文本字符串 |

## 4.实际应用

这两个方法的使用场景如下：

1. **数据传输**：在不支持二进制的上下文中，如 HTTP 请求的 URL 或 JSON 格式，可以使用 Base64 编码传输二进制数据。
2. **图片数据**：在 Web 页面中，可以通过 Base64 编码直接在 HTML 中嵌入图片，而不需要使用`<img>`标签的`src`属性指向一个外部图片文件。
3. **跨域通信**：在需要绕过浏览器的同源策略时，可以使用 Base64 编码来传输数据。

实际应用中：

### 在 img 标签使用 Base64 编码的图片

```html
<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA
AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
9TXL0Y4OHwAAAABJRU5ErkJggg=="
  alt="Red dot"
/>
```

### 使用 Base64 编码传输文件数据

```javascript
// 假设我们有一个文件读取函数readFile，返回文件内容的字符串
function readFile(file) {
  // 这里应该是读取文件并返回字符串的逻辑
  // 为了示例，我们假设返回一个字符串
  return "这里是文件内容";
}

// 读取文件并编码
const fileContent = readFile("example.txt");
const base64Encoded = btoa(fileContent);

// 将编码后的数据发送到服务器
// 这里只是一个示意，实际应用中会通过AJAX或Fetch API等发送请求
```

## 总结

本文主要介绍 JavaScript 中 `btoa`和`atob` 这两个全局函数，用来对**字符串**进行 Base64 **编码和解码**，非常好用。
