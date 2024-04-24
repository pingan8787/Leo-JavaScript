In JavaScript, the `btoa()` and `atob()` functions are two global methods commonly used to encode and decode **strings** in Base64.

> Base64 is an encoding method that converts binary data into a text format using the ASCII character set. This encoding is often used to transmit data between systems that do not support binary data, such as transmitting image data in web applications.

## 1. API Introduction

### btoa() Function

The `btoa()` method is used to encode a string into Base64. For example, the following code encodes the string "Hello, world!" into Base64:

```javascript
const str = "Hello, world!";
const encodedStr = btoa(str);
console.log(encodedStr); // "SGVsbG8sIHdvcmxkIQ=="
```

> **Note**: The `btoa()` method can only encode ASCII characters. If the string contains non-ASCII characters, it will throw an error.

Browser Compatibility:
![btoa.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1713950525700-f604b541-0661-4eca-91c3-920d14b67145.png#averageHue=%23f8f8f8&clientId=ubf225f0c-3f94-4&from=ui&id=u62a22838&originHeight=520&originWidth=993&originalType=binary&ratio=2&rotation=0&showTitle=false&size=58764&status=done&style=none&taskId=u07f7f969-ccc9-4cec-8733-408ced63ad4&title=)

### atob() Function

The `atob()` method is used to decode a Base64-encoded string. For example:

```javascript
const encodedStr = "SGVsbG8sIHdvcmxkIQ==";
const decodedStr = atob(encodedStr);
console.log(decodedStr); // "Hello, world!"
```

> **Note**: The `atob()` method can only decode strings that are valid Base64-encoded. If the string is not a valid Base64 encoding, it will throw an error.

Browser Compatibility:
![atob.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1713950506262-259dab2e-53f1-45dc-a838-3a6680360ef0.png#averageHue=%23f8f8f8&clientId=ubf225f0c-3f94-4&from=ui&id=uf2b90df1&originHeight=523&originWidth=994&originalType=binary&ratio=2&rotation=0&showTitle=false&size=58838&status=done&style=none&taskId=u39540854-f809-47d1-9608-116325bde4e&title=)

## 2. Considerations

- `btoa` and `atob` can only handle **plain text data** and are not suitable for encoding binary data.
- The size of the Base64-encoded string is approximately 33% larger than the original data.
- `btoa` and `atob` are functions provided by web browsers and are not part of the ECMAScript standard, so they are not available in non-browser environments (such as Node.js).

## 3. Similarities and Differences

`atob` and `btoa` have the following similarities and differences:

### Similarities:

1. **Encoding Method**: Both use the Base64 encoding method.
2. **Browser Compatibility**: They are only supported in browsers and are built-in functions provided by web browsers.
3. **Text Operations**: Both `btoa()` and `atob()` functions can only handle plain text strings and cannot directly handle binary data.
4. **Security**: Since they only perform encoding and decoding operations, they are **not recommended for use as encryption**.

### Differences:

The differences between the `btoa()` and `atob()` functions are presented in the table below:

| Aspect            | `btoa()`                                                                      | `atob()`                                  |
| ----------------- | ----------------------------------------------------------------------------- | ----------------------------------------- |
| **Function**      | Converts a text string into a Base64-encoded string                           | Decodes a Base64-encoded string into text |
| **Use Case**      | Encodes text for transmission in environments that do not support binary data | Decodes received Base64-encoded strings   |
| **Output Format** | A Base64-encoded string                                                       | The original text string after decoding   |

## 4. Practical Applications

The use cases for these methods are as follows:

1. **Data Transfer**: In contexts that do not support binary, such as HTTP request URLs or JSON format, Base64 encoding can be used to transmit binary data.
2. **Image Data**: On web pages, images can be embedded directly in HTML using Base64 encoding, without the need for the `src` attribute of the `<img>` tag to point to an external image file.
3. **Cross-Origin Communication**: When it is necessary to bypass the browser's same-origin policy, Base64 encoding can be used to transmit data.

In practical applications:

### Using Base64-Encoded Images in img Tags

```html
<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
  alt="Red dot"
/>
```

### Using Base64-Encoded to Transfer File Data

```javascript
// Suppose we have a file reading function `readFile` that returns a string of file content
function readFile(file) {
  // The logic here should read the file and return a string
  // For demonstration, we assume it returns a string
  return "Here is the file content";
}

// Read the file and encode it
const fileContent = readFile("example.txt");
const base64Encoded = btoa(fileContent);

// Send the encoded data to the server
// This is just an example, in actual applications, you would send a request via AJAX or the Fetch API, etc.
```

## Summary

This article mainly introduces the `btoa` and `atob` global functions in JavaScript, which are used to encode and decode **strings** in Base64. They are very useful.
