# 一、什么是 Scope Hoisting
Scope Hoisting 是 webpack3 的新功能，直译为 "**作用域提升**"，它可以让 webpack 打包出来的**代码文件更小**，**运行更快**。

在 JavaScript 中，还有“变量提升”和“函数提升”，JavaScript 会将变量和函数的声明提升到当前作用域顶部，而“作用域提升”也类似，webpack 将引入到 JS 文件“提升到”它的引入者的顶部。

首先回顾下在没有 Scope Hoisting 时用 webpack 打包下面两个文件：

```javascript
// main.js
export default "hello leo~";

// index.js
import str from "./main.js";
```

使用 webpack 打包后输出文件内容如下：

```javascript
[
  (function (module, __webpack_exports__, __webpack_require__) {
    var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(1);
    console.log(__WEBPACK_IMPORTED_MODULE_0__util_js__["a"]);
  }),
  (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_exports__["a"] = ('hello leo~');
  })
]
```

再开启 Scope Hoisting 后，相同源码打包输出结果变为：

```javascript
[
  (function (module, __webpack_exports__, __webpack_require__) {
    var util = ('hello leo~');
    console.log(util);
  })
]
```

对比两种打包方式输出的代码，我们可以看出，启用 Scope Hoisting 后，函数声明变成一个， `main.js` 中定义的内容被直接注入到 `main.js` 对应模块中，这样做的好处：

- **代码体积更小**，因为函数申明语句会产生大量代码，导致包体积增大（模块越多越明显）；
- 代码在运行时因为创建的函数作用域更少，**内存开销也随之变小**。

# 二、webpack 模块机制

我们使用下面 `webpack.config.js` 配置，打包来看看 webpack 模块机制：

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'none',
    optimization: {
        usedExports: true,
    },
};
```
打包后输出结果（精简后）：
![](https://images.pingan8787.com/Webpack/Scope-Hoisting/build-result.png)
通过分析，我们可以得出以下结论：

- webpack 打包输出打是一个 IIFE（匿名闭包）；
- `modules`  是一个数组，每一项是一个模块初始化函数；
- 使用 `__webpack_require()` 来家在模块，返回 `module.exports` ；
- 通过 `__webpack_require__(__webpack_require__.s = 0);` 启动程序。

# 三、Scope Hoisting 原理

Scope Hoisting 的实现原理其实很简单：分析出模块之间的依赖关系，尽可能将打散的模块合并到一个函数中，前提是不能造成代码冗余。 因此**只有那些被引用了一次的模块才能被合并**。

由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码**必须采用 ES6 模块化语句**，不然它将无法生效。 原因和[4-10 使用 TreeShaking](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-10%E4%BD%BF%E7%94%A8TreeShaking.html) 中介绍的类似。

![](https://images.pingan8787.com/Webpack/Scope-Hoisting/build-result-comparison.png)

# 四、Scope Hoisting 使用方式
## 1. 自动启用
在 webpack 的 `mode` 设置为 `production` 时，会默认自动启用 Scope Hooting。
```javascript
// webpack.config.js

// ...
module.exports = {
    // ...
	mode: "production"
};
```

## 2. 手动启用
在 webpack 中已经内置 Scope Hoisting ，所以用起来很简单，只需要配置[ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/#root) 插件即可：
```javascript
// webpack.config.js

// ...
const webpack = require('webpack');
module.exports = {
    // ...
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
```

考虑到 Scope Hoisting 以来 ES6 模块化语法，而现在很多 npm 包的第三方库还是使用 CommonJS 语法，为了充分发挥 Scope Hoisting 效果，我们可以增加以下 `mainFields` 配置：

```javascript
// webpack.config.js

// ...
const webpack = require('webpack');
module.exports = {
    // ...
    resolve: {
        // 针对 npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
```

针对非 ES6 模块化语法的代码，webpack 会降级处理不使用 Scope Hoisting 优化，我们可以在 webpack 命令上增加 `--display-optimization-bailout` 参数，在输出的日志查看哪些代码做了降级处理：

```javascript
// package.json
{
  // ...
  "scripts": {
    "build": "webpack --display-optimization-bailout" 
  }
}
```

我们写个简单示例代码：

```javascript
// index.js
import str from "./main.js";
const { name } = require('./no-es6.js');

// main.js
export default "hello leo~";

// no-es6.js
module.exports = {
    name : "leo"
}
```

接着打包测试，可以看到控制台输出下面日志：

![](https://images.pingan8787.com/Webpack/Scope-Hoisting/build-result-log.png)

输出的日志中 `ModuleConcatenation bailout` 告诉我们哪些文件因为什么原因导致降级处理了。

# 五、参考文章

- [《通过Scope Hoisting优化Webpack输出》](https://imweb.io/topic/5a43064fa192c3b460fce360) 
- [《webpack 的 scope hoisting 是什么？》](https://segmentfault.com/a/1190000018220850) 
