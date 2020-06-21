最近原创文章回顾：
- [《了不起的 tsconfig.json 指南》](https://juejin.im/post/5ed589a251882542e3022f44)
- [《了不起的 Webpack HMR 学习指南（含源码分析）》](https://juejin.im/post/5ee8e32a51882543485780d3)
- [《《你不知道的 Blob》番外篇》](https://juejin.im/post/5ede5300e51d4578a6798220)
- [《《你不知道的 WeakMap》番外篇》](https://juejin.im/post/5ee78bb7f265da76f15a0698)

Webpack 是前端很火的打包工具，它本质上是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 Webpack 处理应用程序时，它会递归地构建一个依赖关系图(`dependency graph`)，其中包含应用程序需要的每个模块，然后将所有模块打包成一个或多个 `bundle`。

其实就是：Webpack 是一个 JS 代码打包器。

至于图片、CSS、Less、TS等其他文件，就需要 Webpack 配合 loader 或者 plugin 功能来实现~

![了不起的 Webpack 构建流程学习指南.png](http://images.pingan8787.com/Webpack-Build/Webpack-Build-Xmind.png)

# 一、Webpack 构建流程分析
## 1. Webpack 构建过程
首先先简单了解下 Webpack 构建过程：

1. 根据配置，识别入口文件；
1. 逐层识别模块依赖（包括 Commonjs、AMD、或 ES6 的 import 等，都会被识别和分析）；
1. Webpack 主要工作内容就是分析代码，转换代码，编译代码，最后输出代码；
1. 输出最后打包后的代码。

## 2. Webpack 构建原理
看完上面的构建流程的简单介绍，相信你已经简单了解了这个过程，那么接下来开始详细介绍 Webpack 构建原理，包括从启动构建到输出结果一系列过程：

**（1）初始化参数**

解析 Webpack 配置参数，合并 Shell 传入和 `webpack.config.js` 文件配置的参数，形成最后的配置结果。

**（2）开始编译**

上一步得到的参数初始化 `compiler` 对象，注册所有配置的插件，插件监听 Webpack 构建生命周期的事件节点，做出相应的反应，执行对象的 `run` 方法开始执行编译。

**（3）确定入口**

从配置文件（ `webpack.config.js` ）中指定的 `entry` 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去。

**（4）编译模块**

递归中根据**文件类型**和 **loader** 配置，调用所有配置的 loader 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。

**（5）完成模块编译并输出**

递归完后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据 `entry` 配置生成代码块 `chunk` 。

**（6）输出完成**

输出所有的 `chunk` 到文件系统。

注意：在构建生命周期中有一系列插件在做合适的时机做合适事情，比如 `UglifyPlugin` 会在 loader 转换递归完对结果使用 `UglifyJs` 压缩**覆盖之前的结果**。

# 二、手写 Webpack 构建工具
到这里，相信大家对 Webpack 构建流程已经有所了解，但是这还不够，我们再来试着手写 Webpack 构建工具，来将上面文字介绍的内容，应用于实际代码，那么开始吧~

## 1. 初始化项目
在手写构建工具前，我们先初始化一个项目：
```bash
$ yarn init -y
```

并安装下面四个依赖包：

1. `@babel/parser` : 用于分析通过 `fs.readFileSync`  读取的文件内容，并返回 AST (抽象语法树) ； 
1. `@babel/traverse` : 用于遍历 AST, 获取必要的数据；
1. `@babel/core` : babel 核心模块，提供 `transformFromAst` 方法，用于将 AST 转化为浏览器可运行的代码；
1. `@babel/preset-env` : 将转换后代码转化成 ES5 代码；

```bash
$ yarn add @babel/parser @babel/traverse @babel/core @babel/preset-env
```

初始化项目目录及文件：
![image.png](http://images.pingan8787.com/Webpack-Build/Webpack-Build-Xmind-Demo1.png)

代码存放在仓库：[https://github.com/pingan8787/Leo-JavaScript/tree/master/Cute-Webpack/Write-Webpack](https://github.com/pingan8787/Leo-JavaScript/tree/master/Cute-Webpack/Write-Webpack)

由于本部分核心内容是实现 Webpack 构建工具，所以会从《2. Webpack 构建原理》的“（3）确定入口”步骤开始下面介绍。

大致代码实现流程如下：

![webpack构建流程.jpg](http://images.pingan8787.com/Webpack-Build/Webpack-Build.jpeg)

从图中可以看出，手写 Webpack 的核心是实现以下三个方法：

- `createAssets` : 收集和处理文件的代码；
- `createGraph` ：根据入口文件，返回所有文件依赖图；
- `bundle` : 根据依赖图整个代码并输出；

## 2. 实现 createAssets 函数
### 2.1 读取通过入口文件，并转为 AST
首先在 `./src/index` 文件中写点简单代码：
```javascript
// src/index.js

import info from "./info.js";
console.log(info);
```
实现 `createAssets` 方法中的 **文件读取** 和 **AST转换** 操作：
```javascript
// leo_webpack.js

const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
// 由于 traverse 采用的 ES Module 导出，我们通过 requier 引入的话就加个 .default
const babel = require("@babel/core");

let moduleId = 0;
const createAssets = filename => {
    const content = fs.readFileSync(filename, "utf-8"); // 根据文件名，同步读取文件流
  
  	// 将读取文件流 buffer 转换为 AST
    const ast = parser.parse(content, {
        sourceType: "module" // 指定源码类型
    })
    console.log(ast);
}

createAssets('./src/index.js');
```
上面代码：
通过 `fs.readFileSync()` 方法，以**同步方式**读取指定路径下的文件流，并通过 `parser` 依赖包提供的 `parse()` 方法，将读取到的文件流 buffer **转换为浏览器可以认识的代码（AST）**，AST 输出如下：

![image.png](http://images.pingan8787.com/Webpack-Build/Webpack-Build-Xmind-Demo2.png)

另外需要注意，这里我们声明了一个 `moduleId` 变量，来区分当前操作的模块。
在这里，不仅将读取到的文件流 buffer 转换为 AST 的同时，也将 ES6 代码转换为 ES5 代码了。


### 2.2 收集每个模块的依赖

接下来声明 `dependencies` 变量来保存收集到的文件依赖路径，通过 `traverse（）` 方法遍历 `ast`，获取每个节点依赖路径，并 `push` 进 `dependencies` 数组中。
```javascript
// leo_webpack.js

function createAssets(filename){
    // ...
    const dependencies = []; // 用于收集文件依赖的路径

  	// 通过 traverse 提供的操作 AST 的方法，获取每个节点的依赖路径
    traverse(ast, {
        ImportDeclaration: ({node}) => {
            dependencies.push(node.source.value);
        }
    });
}
```

### 2.3 将 AST 转换为浏览器可运行代码
在收集依赖的同时，我们可以将 AST 代码转换为浏览器可运行代码，这就需要使用到 `babel` ，这个万能的小家伙，为我们提供了非常好用的 `transformFromAstSync()` 方法，同步的将 AST 转换为浏览器可运行代码：
```javascript
// leo_webpack.js

function createAssets(filename){
    // ...
    const { code } = babel.transformFromAstSync(ast,null, {
        presets: ["@babel/preset-env"]
    });
    let id = moduleId++; // 设置当前处理的模块ID
    return {
        id,
        filename,
        code,
        dependencies
    }
}
```

到这一步，我们在执行 `node leo_webpack.js` ，输出如下内容，包含了入口文件的路径 `filename`  、浏览器可执行代码 `code` 和文件依赖的路径 `dependencies` 数组：
```bash
$ node leo_webpack.js

{ 
  filename: './src/index.js',
  code: '"use strict";\n\nvar _info = _interopRequireDefault(require("./info.js"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n\nconsole.log(_info["default"]);', 
  dependencies: [ './info.js' ] 
}
```
### 2.4 代码小结
```javascript
// leo_webpack.js

const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
// 由于 traverse 采用的 ES Module 导出，我们通过 requier 引入的话就加个 .default
const babel = require("@babel/core");

let moduleId = 0;
function createAssets(filename){
    const content = fs.readFileSync(filename, "utf-8"); // 根据文件名，同步读取文件流
  
  	// 将读取文件流 buffer 转换为 AST
    const ast = parser.parse(content, {
        sourceType: "module" // 指定源码类型
    })
    const dependencies = []; // 用于收集文件依赖的路径

  	// 通过 traverse 提供的操作 AST 的方法，获取每个节点的依赖路径
    traverse(ast, {
        ImportDeclaration: ({node}) => {
            dependencies.push(node.source.value);
        }
    });

  	// 通过 AST 将 ES6 代码转换成 ES5 代码
    const { code } = babel.transformFromAstSync(ast,null, {
        presets: ["@babel/preset-env"]
    });
  
    let id = moduleId++; // 设置当前处理的模块ID
    return {
      	id,
        filename,
        code,
        dependencies
    }
}
```

## 3. 实现 createGraph 函数
在 `createGraph()` 函数中，我们将递归所有依赖模块，循环分析每个依赖模块依赖，生成一份依赖图谱。
为了方便测试，我们补充下 `consts.js` 和 `info.js` 文件的代码，增加一些依赖关系：

```javascript
// src/consts.js
export const company = "平安";

// src/info.js
import { company } from "./consts.js";
export default `你好，${company}`;
```

接下来开始实现 `createGraph()` 函数，它需要接收一个入口文件的路径（ `entry` ）作为参数：
```javascript
// leo_webpack.js

function createGraph(entry) {
    const mainAsset = createAssets(entry); // 获取入口文件下的内容
    const queue = [mainAsset]; // 入口文件的结果作为第一项
    for(const asset of queue){
        const dirname = path.dirname(asset.filename);
        asset.mapping = {};
        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath); // 转换文件路径为绝对路径
            const child = createAssets(absolutePath);
            asset.mapping[relativePath] = child.id; // 保存模块ID 
            queue.push(child); // 递归去遍历所有子节点的文件
        })
    }
    return queue;
}
```

上面代码：

首先通过 `createAssets()` 函数读取入口文件的内容，并作为依赖关系的队列（依赖图谱） `queue` 数组的第一项，接着遍历依赖图谱 `queue` 每一项，再遍历将每一项中的依赖 `dependencies` 依赖数组，将依赖中的每一项拼接成依赖的绝对路径（`absolutePath` ），作为 `createAssets()` 函数调用的参数，递归去遍历所有子节点的文件，并将结果都保存在依赖图谱 `queue` 中。


注意， `mapping` 对象是用来保存文件的相对路径和模块 ID 的对应关系，在 `mapping` 对象中，我们使用依赖文件的相对路径作为 `key` ，来存储保存模块 ID。


然后我们修改启动函数：
```diff
// leo_webpack.js

- const result = createAssets('./src/index.js');
+ const graph = createGraph("./src/index.js");
+ console.log(graph);
```

这时我们将得到一份包含所有文件依赖关系的依赖图谱：

![image.png](http://images.pingan8787.com/Webpack-Build/Webpack-Build-Xmind-Demo3.png)

这个依赖图谱，包含了所有文件模块的依赖，以及模块的代码内容。下一步只要实现 `bundle()` 函数，将结果输出即可。

## 4. 实现 bundle 函数
从前面介绍，我们知道，函数 `createGraph()` 会返回一个包含每个依赖相关信息（id / filename / code / dependencies）的依赖图谱 `queue`，这一步就将使用到它了。

在 `bundle()` 函数中，接收一个依赖图谱 `graph` 作为参数，最后输出编译后的结果。

### 4.1 读取所有模块信息
我们首先声明一个变量 `modules`，值为字符串类型，然后对参数 `graph` 进行遍历，将每一项中的 `id` 属性作为 `key` ，值为一个数组，包括一个用来执行代码 `code` 的方法和序列化后的 `mapping`，最后拼接到 `modules` 中。
```javascript
// leo_webpack.js

function bundle(graph) {
    let modules = "";
    graph.forEach(item => {
        modules += `
            ${item.id}: [
                function (require, module, exports){
                    ${item.code}
                },
                ${JSON.stringify(item.mapping)}
            ],
        `
    })
}
```
上面代码：

在 `modules` 中每一项的值中，下标为 0 的元素是个函数，接收三个参数 `require` / `module` / `exports` ，为什么会需要这三个参数呢？

原因是：构建工具无法判断是否支持`require` / `module` / `exports` 这三种模块方法，所以需要自己实现（后面步骤会实现），然后方法内的 `code` 才能正常执行。

### 4.2 返回最终结果
接着，我们来实现 `bundle()` 函数返回值的处理：
```javascript
// leo_webpack.js

function bundle(graph) {
    //...
    return `
        (function(modules){
            function require(id){
                const [fn, mapping] = modules[id];
                function localRequire(relativePath){
                    return require(mapping[relativePath]);
                }

                const module = {
                    exports: {}
                }

                fn(localRequire, module, module.exports);

                return module.exports;
            }
            require(0);
        })({${modules}})
    `
}
```
上面代码：

最终 `bundle` 函数返回值是一个字符串，包含一个[自执行函数（IIFE）](https://zh.wikipedia.org/wiki/%E7%AB%8B%E5%8D%B3%E8%B0%83%E7%94%A8%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)，其中函数参数是一个对象， `key` 为 `modules` ， `value` 为前面拼接好的 `modules` 字符串，即 `{modules: modules字符串}` 。

在这个自执行函数中，实现了 `require` 方法，接收一个 `id` 作为参数，在方法内部，分别实现了 `localRequire` / `module` / `modules.exports` 三个方法，并作为参数，传到 `modules[id]` 中的 `fn` 方法中，最后初始化 `require()` 函数（`require(0);`）。

### 4.3 代码小结
```javascript
// leo_webpack.js

function bundle(graph) {
    let modules = "";
    graph.forEach(item => {
        modules += `
            ${item.id}: [
                function (require, module, exports){
                    ${item.code}
                },
                ${JSON.stringify(item.mapping)}
            ],
        `
    })
    return `
        (function(modules){
            function require(id){
                const [fn, mapping] = modules[id];
                function localRequire(relativePath){
                    return require(mapping[relativePath]);
                }

                const module = {
                    exports: {}
                }

                fn(localRequire, module, module.exports);

                return module.exports;
            }
            require(0);
        })({${modules}})
    `
}
```

## 5. 执行代码
当我们上面方法都实现以后，就开始试试吧：
```javascript
// leo_webpack.js

const graph = createGraph("./src/index.js");
const result = bundle(graph);
console.log(result)
```
这时候可以看到终端输出类似这样的代码，是字符串，这里为了方便查看而复制到控制台了：

![image.png](http://images.pingan8787.com/Webpack-Build/Webpack-Build-Xmind-Demo4.png)

这就是打包后的代码咯~

那么如何让这些代码执行呢？用 `eval()` 方法咯：
```javascript
// leo_webpack.js

const graph = createGraph("./src/index.js");
const result = bundle(graph);
eval(result);
```
这时候就能看到控制台输出 `你好，平安` 。那么我们就完成一个简单的 Webpack 构建工具啦~

能看到这里的朋友，为你点个赞~

# 三、总结
本文主要介绍了 Webpack 的构建流程和构建原理，并在此基础上，和大家分享了手写 Webpack 的实现过程，希望大家对 Webpack 构建流程能有更深了解，毕竟面试贼喜欢问啦~


|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|
|语雀知识库|[Cute-FrontEnd](https://www.yuque.com/wangpingan/cute-frontend)|

![bg](http://images.pingan8787.com/2019_07_12guild_page.png)