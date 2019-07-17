> 原文地址：[《Webpack 是怎样运行的?》](https://segmentfault.com/a/1190000019117897)

在平时开发中我们经常会用到 `Webpack `这个时下最流行的前端打包工具。它打包开发代码，输出能在各种浏览器运行的代码，提升了开发至发布过程的效率。

我们知道一份Webpack配置文件主要包含入口（ `entry `）、输出文件（ `output `）、模式、加载器（ `Loader `）、插件（ `Plugin `）等几个部分。但如果只需要组织 JS 文件的话，指定入口和输出文件路径即可完成一个迷你项目的打包。下面我们来通过一个简单的项目来看一下Webpack是怎样运行的。


### 同步加载

> 本文使用 webpack ^4.30.0 作示例.为了更好地观察产出的文件，我们将模式设置为 development 关闭代码压缩，再开启 source-map 支持原始源代码调试。除此之外。我们还简单的写了一个插件 `MyPlugin `来去除源码中的注释。


新建 `src/index.js`:    
```js
console.log('Hello webpack!');
```

新建 `webpack `配置文件 `webpack.config.js `
```js
const path = require('path');
const MyPlugin = require('./src/MyPlugin.js')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[
    new MyPlugin()
  ]
};
```

新建 `src/MyPlugin.js `。[了解webpack插件更多信息](https://github.com/xiangxingchen/blog/issues/18)

```js
class MyPlugin {
  constructor(options) {
    this.options = options
    this.externalModules = {}
  }

  apply(compiler) {
    var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)|(\/\*\*\*\*\*\*\/)/g
    compiler.hooks.emit.tap('CodeBeautify', (compilation)=> {
      Object.keys(compilation.assets).forEach((data)=> {
        let content = compilation.assets[data].source() // 欲处理的文本
        content = content.replace(reg, function (word) { // 去除注释后的文本
          return /^\/{2,}/.test(word) || /^\/\*!/.test(word) || /^\/\*{3,}\//.test(word) ? "" : word;
        });
        compilation.assets[data] = {
          source(){
            return content
          },
          size(){
            return content.length
          }
        }
      })
    })
  }
}
module.exports = MyPlugin
```

现在我们运行命令 `webpack --config webpack.config.js` ，打包完成后会多出一个输出目录 `dist`：`dist/main.js`。`main` 是 `webpack` 默认设置的输出文件名，我们快速瞄一眼这个文件：

```js
(function(modules){
  // ...
})({
  "./src/index.js": (function(){
    // ...
  })
});
```
整个文件只含一个立即执行函数（`IIFE`），我们称它为 `webpackBootstrap`，它仅接收一个对象 —— 未加载的 模块集合（`modules`），这个` modules` 对象的 `key` 是一个路径，`value` 是一个函数。你也许会问，这里的模块是什么？它们又是如何加载的呢？

在细看产出代码前，我们先丰富一下源代码：

新文件 `src/utils/math.js`：
```js
export const plus = (a, b) => {
  return a + b;
};
```
修改 `src/index.js`：
```js
import { plus } from './utils/math.js';

console.log('Hello webpack!');
console.log('1 + 2: ', plus(1, 2));
```
我们按照 ES 规范的模块化语法写了一个简单的模块 `src/utils/math.js`，给 `src/index.js` 引用。`Webpack` 用自己的方式支持了 `ES6 Module` 规范，前面提到的 `modul`e 就是和 `ES6 module` 对应的概念。

接下来我们看一下这些模块是如何通 ES5 代码实现的。再次运行命令 `webpack --config webpack.config.js` 后查看输出文件：
```js
(function(modules){
  // ...
})({
  "./src/index.js": (function(){
    // ...
  }),
  "./src/utils/math.js": (function() {
    // ...
  })
});
```
`IIFE` 传入的 `modules` 对象里多了一个键值对，对应着新模块 `src/utils/math.js`，这和我们在源代码中拆分的模块互相呼应。然而，有了 `modules` 只是第一步，这份文件最终达到的效果应该是让各个模块按开发者编排的顺序运行。

### 探究 `webpackBootstrap`
接下来看看 `webpackBootstrap` 函数中有些什么：
```js
// webpackBootstrap
(function(modules){

  // 缓存 __webpack_require__ 函数加载过的模块
  var installedModules = {};

  /**
   * Webpack 加载函数，用来加载 webpack 定义的模块
   * @param {String} moduleId 模块 ID，一般为模块的源码路径，如 "./src/index.js"
   * @returns {Object} exports 导出对象
   */
  function __webpack_require__(moduleId) {
    // ...
  }

  // 在 __webpack_require__ 函数对象上挂载一些变量及函数 ...

  // 传入表达式的值为 "./src/index.js"
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})(/* modules */);
```

可以看到其实主要做了两件事：

1. 定义一个模块加载函数`` __webpack_require__``。
2. 使用加载函数加载入口模块 `"./src/index.js"`。

整个 `webpackBootstrap` 中只出现了入口模块的影子，那其他模块又是如何加载的呢？我们顺着 `__webpack_require__("./src/index.js")` 细看加载函数的内部逻辑：
```js
function __webpack_require__(moduleId) {
  // 重复加载则利用缓存
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }

  // 如果是第一次加载，则初始化模块对象，并缓存
  var module = installedModules[moduleId] = {
    i: moduleId,  // 模块 ID
    l: false,     // 模块加载标识
    exports: {}   // 模块导出对象
  };

  /**
    * 执行模块
    * @param module.exports -- 模块导出对象引用，改变模块包裹函数内部的 this 指向
    * @param module -- 当前模块对象引用
    * @param module.exports -- 模块导出对象引用
    * @param __webpack_require__ -- 用于在模块中加载其他模块
    */
  modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

  // 模块加载标识置为已加载
  module.l = true;

  // 返回当前模块的导出对象引用
  return module.exports;
}
```

首先，加载函数使用了闭包变量 `installedModules`，用来将已加载过的模块保存在内存中。 接着是初始化模块对象，并把它挂载到缓存里。然后是模块的执行过程，加载入口文件时 `modules[moduleId]` 其实就是` ./src/index.js `对应的模块函数。执行模块函数前传入了跟模块相关的几个实参，让模块可以导出内容，以及加载其他模块的导出。最后标识该模块加载完成，返回模块的导出内容。

根据 `__webpack_require__` 的缓存和导出逻辑，我们得知在整个 `IIFE` 运行过程中，加载已缓存的模块时，都会直接返回`installedModules[moduleId].exports`，换句话说，相同的模块只有在第一次引用的时候才会执行模块本身。


### 模块执行函数

`__webpack_require__ `中通过 `modules[moduleId].call()` 运行了模块执行函数，下面我们就进入到`webpackBootstrap` 的参数部分，看看模块的执行函数。

```js
/*** 入口模块 ./src/index.js ***/
"./src/index.js": (function (module, __webpack_exports__, __webpack_require__) {
  "use strict";
// 用于区分 ES 模块和其他模块规范，不影响理解 demo，战略跳过。
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */
 // 源模块代码中，`import {plus} from './utils/math.js';` 语句被 loader 解析转化。
    // 加载 "./src/utils/math.js" 模块，
  var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/utils/math.js");
  console.log('Hello webpack!');
  console.log('1 + 2: ', Object(_utils_math_js__WEBPACK_IMPORTED_MODULE_0__["plus"])(1, 2));
}),

"./src/utils/math.js": (function (module, __webpack_exports__, __webpack_require__) {
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */
// 源模块代码中，`export` 语句被 loader 解析转化。
  __webpack_require__.d(__webpack_exports__, "plus", function () {
    return plus;
  });
  const plus = (a, b) => {
    return a + b;
  };
})
```

执行顺序是：入口模块 -> 工具模块 -> 入口模块。入口模块中首先就通过 `__webpack_require__("./src/utils/math.js")` 拿到了工具模块的 exports 对象。再看工具模块，ES 导出语法转化成了`__webpack_require__.d(__webpack_exports__, [key], [getter])`，而 `__webpack_require__.d` 函数的定义在 `webpackBootstrap` 内：

```js
// 定义 exports 对象导出的属性。
  __webpack_require__.d = function (exports, name, getter) {

    // 如果 exports （不含原型链上）没有 [name] 属性，定义该属性的 getter。
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
    }
  };

  // 包装 Object.prototype.hasOwnProperty 函数。
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
```

可见 `__webpack_require__.d` 其实就是 `Object.defineProperty` 的简单包装.
引用工具模块导出的变量后，入口模块再执行它剩余的部分。至此，`Webpack` 基本的模块执行过程就结束了。

好了，我们用流程图总结一下` Webpack` 模块的加载思路：

![图片描述](http://images.pingan8787.com/20190718_articlex1.jpg)

### 异步加载
有上面的打包我们发现将不同的打包进一个 `main.js` 文件。`main.js` 会集中消耗太多网络资源，导致用户需要等待很久才可以开始与网页交互。

一般的解决方式是：根据需求降低首次加载文件的体积，在需要时（如切换前端路由器，交互事件回调）异步加载其他文件并使用其中的模块。

Webpack 推荐用 ES `import()` 规范来异步加载模块，我们根据 ES 规范修改一下入口模块的 import 方式，让其能够异步加载模块：

`src/index.js`

```js
console.log('Hello webpack!');

window.setTimeout(() => {
  import('./utils/math').then(mathUtil => {
  console.log('1 + 2: ' + mathUtil.plus(1, 2));
  });
}, 2000);
工具模块（src/utils/math.js）依然不变，在webpack 配置里，我们指定一下资源文件的公共资源路径（publicPath），后面的探索过程中会遇到。

const path = require('path');
const MyPlugin = require('./src/MyPlugin.js')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  plugins:[
    new MyPlugin()
  ]
};
```
接着执行一下打包，可以看到除了 `dist/main.js` 外，又多了一个 `dist/0.js` `./src/utils/math.js`。模块从`main chunk` 迁移到了 `0 chunk` 中。而与 `demo1` 不同的是，`main chunk` 中添加了一些用于异步加载的代码，我们概览一下：
```js
// webpackBootstrap
(function (modules) {
  // 加载其他 chunk 后的回调函数
  function webpackJsonpCallback(data) {
    // ...
  }

  // ...

  // 用于缓存 chunk 的加载状态，0 为已加载
  var installedChunks = {
    "main": 0
  };

  // 拼接 chunk 的请求地址
  function jsonpScriptSrc(chunkId) {
    // ...
  }

  // 同步 require 函数，内容不变
  function __webpack_require__(moduleId) {
    // ...
  }

  // 异步加载 chunk，返回封装加载过程的 promise
  __webpack_require__.e = function requireEnsure(chunkId) {
    // ...
  }

  // ...

  // defineProperty 的包装，内容不变
  __webpack_require__.d = function (exports, name, getter) {}

  // ...

  // 根据配置文件确定的 publicPath
  __webpack_require__.p = "/dist/";

  /**** JSONP 初始化 ****/
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;
  /**** JSONP 初始化 ****/

  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})({
  "./src/index.js": (function(module, exports, __webpack_require__) {

    document.write('Hello webpack!\n');

    window.setTimeout(() => {
      __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./utils/math */ "./src/utils/math.js")).then(mathUtil => {
        console.log('1 + 2: ' + mathUtil.plus(1, 2));
      });
    }, 2000);

  })
})
```
可以看到 `webpackBootstrap` 的函数体部分增加了一些内容，参数部分移除了` "./src/utils/math.js" `模块。跟着包裹函数的执行顺序，我们先聚焦到「`JSONP 初始化`」部分：
```js
// 存储 jsonp 的数组，首次运行为 []
var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];

// 保存 jsonpArray 的 push 函数，首次运行为 Array.prototype.push
var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);

// 将 jsonpArray 的 push 重写为 webpackJsonpCallback （加载其他 chunk 后的回调函数）
jsonpArray.push = webpackJsonpCallback;

// 将 jsonpArray 重置为正常数组，push 重置为 Array.prototype.push
jsonpArray = jsonpArray.slice();

// 由于 jsonpArray 为 []，不做任何事
for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);

// Array.prototype.push
var parentJsonpFunction = oldJsonpFunction;
```

初始化结束后，变化就是 `window` 上挂载了一个 `webpackJsonp` 数组，它的值为` []`；此外，这个数组的 `push` 被改写为 `webpackJsonpCallback` 函数，我们在后面会提到这些准备工作的作用。

接着是 `__webpack_require__ `入口模块，由于 `__webpack_require__` 函数没有改变，我们继续观察入口模块执行函数有了什么变化。

显然，`import('../utils/math.js')` 被转化为`__webpack_require__.e(0).then(__webpack_require__.bind(null, "./src/utils/math.js"))`。0 是 `./src/utils/math.js` 所在 `chunk` 的`id`，「同步加载模块」的逻辑拆分成了「先加载 `chunk`，完成后再加载模块」。

我们翻到 `__webpack_require__.e `的定义位置：
```js
__webpack_require__.e = function requireEnsure(chunkId) {
  var promises = [];

  // installedChunks 是在 webpackBootstrap 中维护的 chunk 缓存
  var installedChunkData = installedChunks[chunkId];

  // chunk 未加载
  if(installedChunkData !== 0) {

    // installedChunkData 为 promise 表示 chunk 加载中
    if(installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      /*** 首次加载 chunk: ***/
      // 初始化 promise 对象
      var promise = new Promise(function(resolve, reject) {
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
      });
      promises.push(installedChunkData[2] = promise);

      // 创建 script 标签加载 chunk
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      var onScriptComplete;

      // ... 省略一些 script 属性设置

      // src 根据 publicPath 和 chunkId 拼接
      script.src = jsonpScriptSrc(chunkId);

      // 加载结束回调函数，处理 script 加载完成、加载超时、加载失败的情况
      onScriptComplete = function (event) {
        script.onerror = script.onload = null; // 避免 IE 内存泄漏问题
        clearTimeout(timeout);
        var chunk = installedChunks[chunkId];

        // 处理 script 加载完成，但 chunk 没有加载完成的情况
        if(chunk !== 0) {
          // chunk 加载中
          if(chunk) {
            var errorType = event && (event.type === 'load' ? 'missing' : event.type);
            var realSrc = event && event.target && event.target.src;
            var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
            error.type = errorType;
            error.request = realSrc;

            // reject(error)
            chunk[1](error);
          }

          // 统一将没有加载的 chunk 标记为未加载
          installedChunks[chunkId] = undefined;
        }
      };

      // 设置 12 秒超时时间
      var timeout = setTimeout(function(){
        onScriptComplete({ type: 'timeout', target: script });
      }, 120000);

      script.onerror = script.onload = onScriptComplete;
      head.appendChild(script);

      /*** 首次加载 chunk ***/
    }
  }
  return Promise.all(promises);
};
```

看起来有点长，我们一步步剖析，先从第一行和最后一行来看，整个函数将异步加载的过程封装到了 `promise` 中，最终导出。

接着从第二行开始，`installedChunkData` 从缓存中取值，显然首次加载 `chunk` 时此处是 `undefined`。接下来，`installedChunkData` 的 `undefined` 值触发了第一层 `if` 语句的判断条件。紧接着进行到第二层 `if` 语句，此时根据判断条件走入 `else `块，这里 `if` 块里的内容我们先战略跳过，`else `里主要有两块内容，一是 `chunk` 脚本加载过程，这个过程创建了一个 `script` 标签，使其请求 `chunk`所在地址并执行` chunk` 内容；二是初始化 `promise` ，并用 `promis` 控制 `chunk` 文件加载过程。

不过，我们只在这段 `else` 代码块中找到了 `reject` 的使用处，也就是在 chunk 加载异常时` chunk[1](error)` 的地方，但并没发现更重要的 `resolve `的使用地点，仅仅是把 `resolve` 挂在了缓存上（`installedChunks[chunkId] = [resolve, reject]`）。

这里的 `chunk` 文件加载下来会发生什么呢？让我们打开`dist/0.js `一探究竟：
```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0], {
  "./src/utils/math.js":
    (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */
      __webpack_require__.d(__webpack_exports__, "plus", function () {
        return plus;
      });
      const plus = (a, b) => {
        return a + b;
      };
    })

}]);
```
我们发现了：

1. 久违的 `./src/utils/math.js` 模块
2. `window["webpackJsonp"]` 数组的使用地点

这段代码开始执行，把异步加载相关的 `chunk id` 与模块传给` push` 函数。而前面已经提到过，`window["webpackJsonp"] `数组的 `push` 函数已被重写为 `webpackJsonpCallback` 函数，它的定义位置在 `webpackBootstrap` 中：
```js
function webpackJsonpCallback(data) {
  var chunkIds = data[0];
  var moreModules = data[1];

  // then flag all "chunkIds" as loaded and fire callback
  var moduleId, chunkId, i = 0, resolves = [];

  // 将 chunk 标记为已加载
  for(;i < chunkIds.length; i++) {
    chunkId = chunkIds[i];
    if(installedChunks[chunkId]) {
      resolves.push(installedChunks[chunkId][0]);
    }
    installedChunks[chunkId] = 0;
  }

  // 把 "moreModules" 加到 webpackBootstrap 中的 modules 闭包变量中。
  for(moduleId in moreModules) {
    if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
      modules[moduleId] = moreModules[moduleId];
    }
  }

  // parentJsonpFunction 是 window["webpackJsonp"] 的原生 push
  // 将 data 加入全局数组，缓存 chunk 内容
  if(parentJsonpFunction) parentJsonpFunction(data);

  // 执行 resolve 后，加载 chunk 的 promise 状态变为 resolved，then 内的函数开始执行。
  while(resolves.length) {
    resolves.shift()();
  }

};
```
走进这个函数中，意味着异步加载的 `chunk` 内容已经拿到，这个时候我们要完成两件事，一是让依赖这次异步加载结果的模块继续执行，二是缓存加载结果。

关于第一点，我们回忆一下之前 `__webpack_require__.e` 的内容，此时 `chunk` 还处于「加载中」的状态，也就是说对应的 `installedChunks[chunkId]` 的值此时为` [resolve, reject, promise]`。 而这里，`chunk` 已经加载，但 `promise` 还未决议，于是 `webpackJsonpCallback` 内部定义了一个 `resolves` 变量用来收集 `installedChunks` 上的 `resolve` 并执行它。`

接下来说到第二点，就要涉及几个层面的缓存了。

首先是 `chunk` 层面，这里有两个相关操作，操作一将 `installedChunks[chunkId]` 置为 0 可以让 `__webpack_require__.e `在第二次加载同一 `chunk` 时返回一个立即决议的 `promise`（`Promise.all([])`）；操作二将 `chunk data` 添加进 `window["webpackJsonp"]` 数组，可以在多入口模式时，方便地拿到已加载过的 `chunk` 缓存。通过以下代码实现：
```js
/*** 缓存执行部分 ***/
var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
// ...
for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
var parentJsonpFunction = oldJsonpFunction;
/*** 缓存执行部分 ***/

/*** 缓存添加部分 ***/
function webpackJsonpCallback(data) {
  //...
    // 此处的 parentJsonpFunction 是 window["webpackJsonp"] 数组的原生 push
    if (parentJsonpFunction) parentJsonpFunction(data);
  //...
}
/*** 缓存添加部分 ***/
```
而在 `modules` 层面，`chunk` 中的 `moreModule`s 被合入入口文件的` modules` 中，可供下一个微任务中的 `__webpack_require__` 同步加载模块。

```js
({

  "./src/index.js":
    (function (module, exports, __webpack_require__) {
      console.log('Hello webpack!');
      window.setTimeout(() => {
        __webpack_require__.e(0).then(__webpack_require__.bind(null, "./src/utils/math.js")).then(mathUtil => {
          console.log('1 + 2: ' + mathUtil.plus(1, 2));
        });
      }, 2000);
    })
});
```
`__webpack_require__.e(0) `返回的 `promise` 决议后，`__webpack_require__.bind(null, "./src/utils/math.js")` 可以加载到` chunk `携带的模块，并返回模块作为下一个微任务函数的入参，接下来就是 `Webpack Loader` 翻译过的其他业务代码了。

现在让我们把异步流程梳理一下：

![图片描述](http://images.pingan8787.com/20190718_articlex2.jpg)

![2019_07_12guild_page](http://images.pingan8787.com/2019_07_12guild_page.png)