学习时间：2020.06.06

学习章节：[《你不知道的 Blob》](https://mp.weixin.qq.com/s/lQKTCS_QB0E62SK9oXD4LA)

原文对 Blob 的知识点介绍得非常完整清晰，本文通过四个问题来总结本文核心知识：

1. Blob 是什么？
1. Blob 怎么用？
1. Blob 有哪些使用场景？
1. Blob 与 ArrayBuffer 有何区别？

![读《你不知道的 Blob》总结.png](http://images.pingan8787.com/blog/you-dont-know-blob/xmind.png)

# 一、Blob 是什么？
[Blob（Binary Large Object）](https://zh.wikipedia.org/wiki/Blob)表示二进制类型的大对象，通常是影像、声音或多媒体文件。MySql/Oracle数据库中，就有一种Blob类型，专门存放二进制数据。在 JavaScript 中 Blob 对象表示一个不可变、原始数据的类文件对象，它不一定非得是大量数据，也可以表示一个小型文件的内容。

另外，JavaScript 中的 [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 接口是基于 Blob，继承 Blob 的功能并将其扩展使其支持用户系统上的文件。

# 二、Blob 怎么用？
`Blob` 由一个可选字符串 `type` 和 `blobParts` 组成，其中， `type` 通常为 MIME 类型。
> MIME（Multipurpose Internet Mail Extensions）多用途互联网邮件扩展类型，常见有：超文本标记语言文本 .html `text/html` 、PNG图像 .png `image/png` 、普通文本 .txt `text/plain`  等。



## 1. 构造函数
Blob 构造函数语法为：
```javascript
const myBlob = new Blob(blobParts[, options])
```
**入参：**

- `blobParts`：它是一个由 ArrayBuffer，ArrayBufferView，Blob，DOMString 等对象构成的数组。DOMStrings 会被编码为 UTF-8。
- `options` ：一个可选的对象，包含以下两个属性：
   - `type` ：默认值为 `""` ，表示将会被放入到 blob 中的数组内容的 MIME 类型。
   - `endings` ：默认值为 `"transparent"`，用于指定包含行结束符 `\n` 的字符串如何被写入。它是以下两个值中的一个：`"native"`，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 `"transparent"`，代表会保持 blob 中保存的结束符不变。



**出参：**返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。

## 2. 属性和方法
### 2.1 属性介绍
`Blob` 对象拥有 2 个属性：

- `size` ：只读，表示 `Blob` 对象中所包含的数据大小（以字节为单位）；
- `type` ：只读，值为字符串，表示该 `Blob` 对象所包含数据的 MIME 类型。若类型未知，则该属性值为空字符串。



### 2.2 方法介绍

- `slice([start[, end[, contentType]]])` ：返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。
- `stream()`：返回一个能读取 Blob 内容的 `ReadableStream` 。
- `text()`：返回一个 Promise 对象且包含 Blob 所有内容的 UTF-8 格式的 `USVString` 。
- `arrayBuffer()`：返回一个 Promise 对象且包含 Blob 所有内容的二进制格式的 `ArrayBuffer` 。


**注意**：`Blob` **对象是不可改变的**，但是可以进行分割，并创建出新的 `Blob` 对象，将它们混合到一个新的 `Blob`  中。类似于 JavaScript 字符串：我们无法更改字符串中的字符，但可以创建新的更正后的字符串。

## 3. 简单上手
### 3.1 示例1：从字符串创建 Blob
```javascript
let myBlobParts = ['<html><h2>Hello Leo</h2></html>']; // 一个包含DOMString的数组
let myBlob = new Blob(myBlobParts, {type : 'text/html', endings: "transparent"}); // 得到 blob

console.log(myBlob.size + " bytes size");
// Output: 31 bytes size
console.log(myBlob.type + " is the type");
// Output: text/html is the type
```

### 3.2 示例2：从类型化数组和字符串创建 Blob
JavaScript类型化数组是一种类似数组的对象，并提供了一种用于 **访问原始二进制数据的机制** 。并且在类型数组上调用 `Array.isArray()` 会返回 `false` 。

详细可参考MDN《[JavaScript 类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays)》章节。

```javascript
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"
let blob = new Blob([hello, ' ', 'leo'], {type: 'text/plain'});
// Output: "Hello leo"
```

### 3.3 示例3：组装新的 Blob
由于 `Blob` 对象是不可改变的，但我们可以进行分割，并组装成一个新的 `Blob` 对象：
```javascript
let blob1 = new Blob(['<html><h2>Hello Leo</h2></html>'], 
   {type : 'text/html', endings: "transparent"});
let blob2 = new Blob(['<html><h2>Happy Boy!</h2></html>'], 
   {type : 'text/html', endings: "transparent"});
let slice1 = blob1.slice(16);
let slice2 = blob2.slice(0, 16);

await slice1.text();
// currtent slice1 value: "Leo</h2></html>"
await slice2.text();
// currtent slice2 value: "<html><h2>Happy "

let newBlob = new Blob([slice2, slice1], 
   {type : 'text/html', endings: "transparent"});
await newBlob.text();
// currtent newBlob value: "<html><h2>Happy Leo</h2></html>"
```

# 三、Blob 有哪些使用场景？
## 1. 图片本地预览
这里整理 2 种图片本地预览的方式：

1. 使用 DataURL 方式；
1. 使用 Blob URL/Object URL 方式；
```html
<body>
    <h1>1.DataURL方式：</h1>
    <input type="file" accept="image/*" onchange="selectFileForDataURL(event)">
    <img id="output1">

    <h1>2.Blob方式：</h1>
    <input type="file" accept="image/*" onchange="selectFileForBlob(event)">
    <img id="output2">

    <script>
        // 1.DataURL方式：
        async function selectFileForDataURL() {
            const reader = new FileReader();
            reader.onload = function () {
                const output = document.querySelector("#output1")
                output.src = reader.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }

        //2.Blob方式：
        async function selectFileForBlob(){
            const reader = new FileReader();
            const output = document.querySelector("#output2");
            const imgUrl = window.URL.createObjectURL(event.target.files[0]);
            output.src = imgUrl;
            reader.onload = function(event){
                window.URL.revokeObjectURL(imgUrl);
            }
        }
    </script>
</body>
```

上面主要介绍 `Blob URL` 和 `Data URL` 两种方式实现图片本地预览，这两个类型的区别在**《五、拓展》**中介绍。

## 2. 图片本地预览 + 分片上传
**实现本地预览：**

将 `input` 获取到的 `file` 对象，通过实例化 `FileReader` ，赋值给变量 `reader` ，调用`reader` 的 `readAsDataURL` 方法，将 `file` 对象转换为  `dataURL` ，然后监听 `reader` 的 `onload` 属性，获取到读取结果 `result` ，然后设置为图片的 `src` 值。


**实现分片上传**：

由于 File 是特殊类型的 Blob，可用于任意 Blob 类型的上下文，所以针对大文件传输，我们可以使用 `slice` 方法进行文件切割，分片上传。

```html
<body>
    <input type="file" accept="image/*" onchange="selectFile(event)">
    <button onclick="upload()">上传</button>
    <img id="output">

    <script>
        const chunkSize = 10000;
        const url = "https://httpbin.org/post";
        async function selectFile(){
          	// 本地预览
            const reader = new FileReader();
            reader.onload = function(){
                const output = document.querySelector("#output")
                output.src = reader.result;
            }
            reader.readAsDataURL(event.target.files[0]);

          	// 分片上传
            await upload(event.target.files[0]);
        }
        async function upload(files){
            const file = files;
            for(let start = 0; start < file.size; start += chunkSize){
                const chunk = file.slice(start, start + chunkSize + 1);
                const fd = new FormData();
                fd.append("data", chunk);
                await fetch(url, { method: "post", body: fd }).then((res) =>{
                    console.log(res)
                    res.text();
                });
            }
        }
    </script>
</body>
```


## 3. 图片本地预览 + 分片上传 + 暂停 + 续传
```html
<body>
    <input type="file" accept="image/*" onchange="selectFile(event)">
    <button onclick="upload()">上传</button>
    <button onclick="pause()">暂停</button>
    <button onclick="continues()">继续</button>
    <img id="output" src="" alt="">

    <script>
        const chunkSize = 30000;
        let start = 0, curFile, isPause = false;
        const url = "https://httpbin.org/post";
        async function selectFile(){
            const reader = new FileReader();
            reader.onload = function(){
                const output = document.querySelector("#output")
                output.src = reader.result;
            }
            reader.readAsDataURL(event.target.files[0]);
            curFile = event.target.files[0];
        }
        async function upload(){
            const file = curFile;
            for(start; start < file.size; start += chunkSize){
                if(isPause) return;
                const chunk = file.slice(start, start + chunkSize + 1);
                const fd = new FormData();
                fd.append("data", chunk);
                await fetch(url, { method: "post", body: fd }).then((res) =>{
                        res.text()
                    }
                );
                if(chunk.size < chunkSize){
                    uploadSuccess();
                    return;
                }
            }
        }
        function pause(){
            isPause = true;
        }
        function continues(){
            isPause = false;
            upload();
        }
        function uploadSuccess(){
            isPause = false;
            start = 0;
        }
    </script>
</body>
```


## 4. 从互联网下载数据
在实现“从互联网下载数据”方法时，我们使用 `createObjectURL` 显示图片，在请求互联网图片时，我们有两种方式：

- 使用 `XMLHttpRequest` ；
- 使用 `fetch` ；
```html
<body>
    <button onclick="download1()">使用 XMLHttpRequest 下载</button>
    <button onclick="download2()">使用 fetch 下载</button>
    <img id="pingan">
    <script>
        const url = "http://images.pingan8787.com/TinyCompiler/111.png";
        const pingan = document.querySelector('#pingan');
        function download1 (){
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = () => {
                renderImage(xhr.response);
            }
            xhr.send(null);
        }
        function download2 (){
            fetch(url).then(res => {
                return res.blob();
            }).then(myBlob => {
                renderImage(myBlob);
            })
        }

        function renderImage (data){
            let objectURL = URL.createObjectURL(data);
            pingan.src = objectURL;
          	// 根据业务需要手动调用 URL.revokeObjectURL(imgUrl)
        }
    </script>
</body>
```

## 5. 下载文件
通过调用 Blob 的构造函数来创建类型为 `"text/plain"` 的 Blob 对象，然后通过动态创建 `a` 标签来实现文件的下载。
```html
<body>
    <button onclick="download()">Blob 文件下载</button>

    <script>
        function download(){
            const fileName= "Blob文件.txt";
            const myBlob = new Blob(["一文彻底掌握 Blob Web API"], { type: "text/plain" });
            downloadFun(fileName, myBlob);
        }
        function downloadFun(fileName, blob){
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            link.remove();
            URL.revokeObjectURL(link.href);
        }
    </script>
</body>
```

## 6. 图片压缩
当我们希望本地图片在上传之前，先进行一定压缩，再提交，从而减少传输的数据量。

在前端我们可以使用 Canvas 提供的 `toDataURL()` 方法来实现，该方法接收 `type` 和 `encoderOptions` 两个可选参数：

- `type` 表示**图片格式**，默认为 `image/png` ；
- `encoderOptions` 表示**图片质量**，在指定图片格式为 `image/jpeg` 或 `image/webp` 的情况下，可以从 0 到 1 区间内选择图片质量。如果超出取值范围，将会使用默认值 `0.92`，其他参数会被忽略。
```html
<body>
    <input type="file" accept="image/*" onchange="loadFile(event)" />
    <script>
        // compress.js
        const MAX_WIDTH = 800; // 图片最大宽度
      	// 图片压缩方法
        function compress(base64, quality, mimeType) {
            let canvas = document.createElement("canvas");
            let img = document.createElement("img");
            img.crossOrigin = "anonymous";
            return new Promise((resolve, reject) => {
                img.src = base64;
                img.onload = () => {
                    let targetWidth, targetHeight;
                    if (img.width > MAX_WIDTH) {
                        targetWidth = MAX_WIDTH;
                        targetHeight = (img.height * MAX_WIDTH) / img.width;
                    } else {
                        targetWidth = img.width;
                        targetHeight = img.height;
                    }
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    let ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    let imageData = canvas.toDataURL(mimeType, quality / 100); // 设置图片质量
                    resolve(imageData);
                };
            });
        }

        // 为了进一步减少传输的数据量，我们可以把它转换为 Blob 对象
        function dataUrlToBlob(base64, mimeType) {
            let bytes = window.atob(base64.split(",")[1]);
            let ab = new ArrayBuffer(bytes.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeType });
        }

        // 通过 AJAX 提交到服务器
        function uploadFile(url, blob) {
            let formData = new FormData();
            let request = new XMLHttpRequest();
            formData.append("image", blob);
            request.open("POST", url, true);
            request.send(formData);
        }

        function loadFile(event) {
            const reader = new FileReader();
            reader.onload = async function () {
                let compressedDataURL = await compress(
                    reader.result,
                    90,
                    "image/jpeg"
                );
                let compressedImageBlob = dataUrlToBlob(compressedDataURL);
                uploadFile("https://httpbin.org/post", compressedImageBlob);
            };
            reader.readAsDataURL(event.target.files[0]);
        };
    </script>
</body>
```
其实 Canvas 对象除了提供 `toDataURL()` 方法之外，它还提供了一个 `toBlob()` 方法，该方法的语法如下：

```javascript
canvas.toBlob(callback, mimeType, qualityArgument)
```

和 `toDataURL()` 方法相比，`toBlob()` 方法是异步的，因此多了个 `callback` 参数，这个 `callback` 回调方法默认的第一个参数就是转换好的 `blob`文件信息。<br />

## 7. 生成 PDF 文档
在浏览器端，利用一些现成的开源库，比如 jsPDF，我们也可以方便地生成 PDF 文档。
```html
  <body>
    <h3>客户端生成 PDF 示例</h3>
    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>
    <script>
      (function generatePdf() {
        const doc = new jsPDF();
        doc.text("Hello semlinker!", 66, 88);
        const blob = new Blob([doc.output()], { type: "application/pdf" });
        blob.text().then((blobAsText) => {
          console.log(blobAsText);
        });
      })();
    </script>
  </body>
```
其实 jsPDF 除了支持纯文本之外，它也可以生成带图片的 PDF 文档，比如：
```javascript
let imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/...'
let doc = new jsPDF();

doc.setFontSize(40);
doc.text(35, 25, 'Paranyan loves jsPDF');
doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
```

# 四、Blob 与 ArrayBuffer 有何区别？

## 1. 定义区别
`ArrayBuffer` 对象用于表示**通用的，固定长度的原始二进制数据缓冲区**。且**不能直接操纵** ArrayBuffer 的内容，需要创建一个类型化数组对象或 `DataView` 对象，该对象以特定格式表示缓冲区，并使用该对象读取和写入缓冲区的内容。

`Blob` 类型的对象表示**不可变的类似文件对象的原始数据**。`Blob` 表示的不一定是 JavaScript 原生格式的数据。`File` 接口基于 `Blob`，继承了`Blob` 功能并将其扩展为支持用户系统上的文件。

`Blob` 类型只有 `slice` 方法，用于返回一个新的 `Blob` 对象，包含了源 `Blob` 对象中指定范围内的数据。 对比发现，`ArrayBuffer` 的数据，是可以**按照字节去操作**的，而 `Blob` 只能作为一个完整对象去处理。所以说，`ArrayBuffer` 相比 `Blob` 更接近真实的二进制，更底层。

## 2. 两者互转
### 2.1 ArrayBuffer 转 Blob
只需将 `ArrayBuffer` 作为参数传入即可：
```javascript
const buffer = new ArrayBuffer(16);
const blob = new Blob([buffer]);
```

### 2.2 Blob 转 ArrayBuffer
需要借助 `FileReader` 对象：
```javascript
const blob = new Blob([1,2,3,4,5]);
const reader = new FileReader();

reader.onload = function() {
    console.log(this.result);
}
reader.readAsArrayBuffer(blob);
```

## 3. 其他区别

1. 需要使用写入/编辑操作时使用 ArrayBuffer，否则使用 Blob 即可；
1. Blob 对象不可变，而 ArrayBuffer 可以通过 TypedArrays 或 DataView 操作；
1. Blob 可以位于磁盘、高速缓存内存和其他不同用位置，而 ArrayBuffer 存在内存中，可以直接操作；

## 4. Ajax 中使用 Blob 和 ArrayBuffer
```javascript
function GET(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer'; // or xhr.responseType = "blob";
  xhr.send();

  xhr.onload = function(e) {
    if (xhr.status != 200) {
      alert("Unexpected status code " + xhr.status + " for " + url);
      return false;
    }
    callback(new Uint8Array(xhr.response)); // or new Blob([xhr.response]);
  };
}
```

# 五、拓展
## 1. Blob URL 和 Data URL 区别
### 1.1 格式不同
`Blob URL` 格式如 `blob:域名/uuid` ， `Data URL` 格式如： `data:[<mediatype>][;base64],<data>`  。

`mediatype` 是个 MIME 类型的字符串，例如 "`image/jpeg`" 表示 JPEG 图像文件。如果被省略，则默认值为 `text/plain;charset=US-ASCII`。

![image.png](http://images.pingan8787.com/blog/you-dont-know-blob/code.png)
### 1.2 长度不同
`Blob URL` 一般长度较短，而 `Data URL` 因为直接存储图片 base64 编码后的数据，往往比较长。

### 1.3 XMLHttpRequest 支持情况不同
`Blob URL`  可以很方便使用 XMLHttpRequest 获取源数据（ `xhr.responseType = 'blob'` ），而 `Data URL` 并不是所有浏览器都支持通过 XMLHttpRequest 获取源数据的。

### 1.4 使用场景不同
`Blob URL`  只能在当前应用内使用，把 `Blob URL`  复制到浏览器地址栏是无法获取数据，而 `Data URL` 则可以在任意浏览器中使用。

# 六、总结
本文中我们主要通过 4 个问题来复习了 Blob 知识点：“Blob 是什么”、“Blob 怎么用”、“Blob 使用场景”和“Blob 与 ArrayBuffer 区别”，在“Blob 使用场景”部分中，也主要介绍了我们实际开发中非常常见的“图片预览”、“图片下载”和“生成文件”的场景。在文章最后，也通过和大家复习了“Blob URL 和 Data URL 区别”，让我们对 Blob 有更深的认识。


|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|
|语雀知识库|[Cute-FrontEnd](https://www.yuque.com/wangpingan/cute-frontend)|

![bg](http://images.pingan8787.com/2019_07_12guild_page.png)  