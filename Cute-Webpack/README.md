### 一、概念

需要理解**四个核心概念**：   

* 入口(entry)
* 输出(output)
* loader
* 插件(plugins)

#### 1. 入口

##### 1.1 基础概念

指定 webpack 由哪个模块作为项目构建的开始。  

通过配置 `entry` 属性，指定一个或多个起点，默认值 `./src` ：   

```js
module.exports = {
  entry: './path/leo/file.js'
};
```

##### 1.2 核心知识

**1.2.1 单文件入口**

用法：`entry: string|Array<string>`   

当 `entry` 中没有配置入口的文件对象的名称，默认使用的是 `main` 的名称，输出就是 `main.js`，即：

```js
// 默认情况
module.exports = {
  entry: './path/leo/file.js'
};
// 配置单个入口
const config = {
  entry: {
    main: './path/leo/file.js'
  }
};
```

可以看出，实际上 **默认情况** 知识 **配置单个入口** 的简写形式。   

另外，**文件路径**我们也可以传入一个数组，就会将多个依赖文件一起注入：   

```js
const config = {
  entry: {
    main: ['./path/leo/file.js', './path/leo/index.js', './path/leo/server.js']
  }
};
```

**1.2.2 多文件入口**   

用法：`entry: {[entryChunkName: string]: string|Array<string>}`   

多个文件**完全分离**，**互相独立**（每个 bundle 中都有一个 webpack 引导(bootstrap)），常见于只有一个入口的单页面应用。

```js
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```


#### 2. 出口

##### 2.1 基础概念   

指定 webpack 最终输出的文件输出位置和文件名等信息。   

通过配置 `output` 属性，指定输出位置和文件名，默认输出位置为 `./dist` ：   

两个属性：  

* `path` ：输出的目录绝对路径；
* `filename`  ：输出的文件名称；

```js
const path = require('path');
module.exports = {
  entry: './path/leo/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'leo-webpack.bundle.js'
  }
};
```

##### 2.2 核心知识

**2.2.1 使用占位符来为每个文件命名，保证名称唯一**   

```js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
```

更多占位符，[点击查看](
https://www.webpackjs.com/configuration/output/#output-filename)

**2.2.2 使用CDN和资源hash**   

```js
output: {
  path: "/home/proj/cdn/assets/[hash]",
  publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

关于`output.publicPath` ， [点击查看](https://www.webpackjs.com/configuration/output/#output-publicpath)

如果编译时不知道最终文件的 `publicPath` ，可以留空，并在入口文件中动态设置。或者在入口起点设置 `__webpack_public_path__`  来忽略它。   

```js
__webpack_public_path__ = myRuntimePublicPath
```

#### 3. loader

##### 3.1 基础概念  

让 webpack 能够处理非 JS 文件，在 `import` 或 “加载”模块时预处理文件。 

通过配置 loader 两个属性来实现：   

* `test` 属性，用来标识出应该被对应的 loader 进行转换的某个或多个文件；
* `use` 属性，表示转换时要用哪个 loader；

```js
const path = require('path');
const config = {
  output: {
    filename: 'leo-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
module.exports = config;
```

##### 3.2核心知识

**3.2.1 安装并使用loader**

如安装一个 `css-loader` 和 `ts-loader`  使得 webpack 可以加载 CSS 文件，或者将 `TypeScript` 转换成 `JavaScript`：   

```shell
npm install --save-dev css-loader ts-loader
```
使用：   

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

**3.2.2 使用loader的三种方式**

* 配置（推荐）：在 webpack.config.js 文件中指定 loader。

指定多个loader：

```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```

* 内联：在每个 import 语句中显式指定 loader。

可以在 `import` 语句或[任何等效于 `import` 的方式](
https://www.webpackjs.com/api/module-methods/)中指定 loader，使用 `!` 将多个 loader 分开，每个部分都是相对于当前目录的解析。   
```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

**尽可能使用 module.rules，减少代码量，并且在出错时，更快地调试和定位 loader 中的问题。**

* CLI：在 shell 命令中指定它们。

```shell
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

**3.2.3 loader加载顺序**   

loader 会从数组最后一个开始，往前一个一个加载：   

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ]
  }
};
```

**3.2.4 loader 特性**  


* loader 支持链式传递。

能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。

* loader 可以是同步的，也可以是异步的。
* loader 运行在 Node.js 中，并且能够执行任何可能的操作。
* loader 接收查询参数。用于对 loader 传递配置。
* loader 也能够使用 options 对象进行配置。
* 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
* 插件(plugin)可以为 loader 带来更多特性。
* loader 能够产生额外的任意文件。


另外可以查看 [如何编写 loader](
https://www.webpackjs.com/contribute/writing-a-loader/)？

#### 4. 插件

##### 4.1 基础概念  

让 webpack 能够执行更多任务，从**优化和压缩**，到**重新定义环境中的变量**，非常强大。  

插件目的在于解决 loader 无法实现的其他事。  

使用时，只需要 `require`  它，并添加到 `plugins` 数组，通过 `new` 实例化即可:    

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]};

module.exports = config;
```

##### 4.2 核心知识

**原理剖析：**   

webpack 插件是一个具有 `apply` 属性的 JavaScript 对象。`apply` 属性会被 `webpack compiler` 调用，并且 `compiler` 对象可**在整个编译生命周期访问**。

```js
// ConsoleLogOnBuildWebpackPlugin.js

const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
```
compiler hook 的 `tap` 方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 `hook` 中复用。

**用法：**

由于插件可以携带**参数**/**选项**，你必须在 `webpack` 配置中，向 `plugins` 属性传入 `new` 实例。

**配置：**

```js
// webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
  entry: './path/leo/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

#### 5. 模式

通过配置 `mode` 参数，指定当前的开发模式，有 `development` 和 `production` 两个值：   

```js
module.exports = {
  mode: 'production'
};
```

也可以通过 CLI 参数传递：   

```shell
webpack --mode=production
```

**参数描述：**   

|选项|描述|
|---|---|
|`development`|会将 `process.env.NODE_ENV` 的值设为` development`。启用 `NamedChunksPlugin `和 `NamedModulesPlugin`。|
|`production`|会将 `process.env.NODE_ENV` 的值设为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`,` OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`。|

**记住，只设置 NODE_ENV，则不会自动设置 mode。**


### 二、配置

webpack 的配置文件，是导出一个对象的 JavaScript 文件，由 webpack 根据对象定义的属性进行解析。

因为 webpack 配置是标准的 Node.js CommonJS 模块，你可以做到以下事情：

* 通过 `require(...)` 导入其他文件;   
* 通过 `require(...)` 使用` npm` 的工具函数;   
* 使用 JavaScript 控制流表达式，例如 `?:` 操作符;   
* 对常用值使用常量或变量;   
* 编写并执行函数来生成部分配置;   

**但应避免以下做法：**

* 在使用 webpack 命令行接口(CLI)（应该编写自己的命令行接口(CLI)，或使用 `--env`）时，访问命令行接口(CLI)参数;   
* 导出不确定的值（调用 webpack 两次应该产生同样的输出文件）;   
* 编写很长的配置（应该将配置拆分为多个文件）;   

#### 1. 基本配置

```js
// webpack.config.js

var path = require('path');
module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
```

#### 2. 多种配置

除了到处单个配置对象，我们也可以有一些其他方式：  

##### 2.1 导出为一个函数

我们可能需要同时考虑到**开发环境**和**生产环境**，在 `webpack.config.js`中实现，我们会有至少两种方式：  

1. 导出一个配置对象来代替；
2. 导出一个可以传入参数的函数：  

传入两个参数：环境变量（[查看 CLI 文档的环境选项](https://www.webpackjs.com/api/cli/#environment-options)）和 map 对象（`argv`）参数。

```js
module.exports = function(env, argv) {
  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-maps' : 'eval',
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: argv['optimize-minimize'] // 只有传入 -p 或 --optimize-minimize
       })
     ]
  };
};
```

##### 2.2 导出为一个 Promise

webpack 将运行由配置文件导出的函数，并且等待 `Promise` 返回。便于需要异步地加载所需的配置变量。

```js
module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: './app.js',
        /* ... */
      })
    }, 5000)
  })
}
```

##### 2.3 导出多个配置对象

我们把导出对象设置成一个数组，webpack 运行时，会将所有配置对象都构建，这对于针对多个[构建目标](https://www.webpackjs.com/configuration/output/#output-librarytarget)（例如 AMD 和 CommonJS）[打包一个 library](https://www.webpackjs.com/guides/author-libraries/) 非常有用。

```js
module.exports = [{
  output: {
    filename: './dist-amd.js',
    libraryTarget: 'amd'
  },
  entry: './app.js',
  mode: 'production',
}, {
  output: {
    filename: './dist-commonjs.js',
    libraryTarget: 'commonjs'
  },
  entry: './app.js',
  mode: 'production',
}]
```

#### 3. 使用其他配置语言   

webpack 接受以多种编程和数据语言编写的配置文件。支持的文件扩展名列表，可以在 [node-interpret](https://github.com/js-cli/js-interpret) 包中找到。使用 [node-interpret](https://github.com/js-cli/js-interpret)，webpack 可以处理许多不同类型的配置文件。

> 文档介绍：[《使用不同语言进行配置(configuration languages)》](https://www.webpackjs.com/configuration/configuration-languages/)

##### 3.1 TypeScript

为了用 TypeScript 书写 webpack 的配置文件，必须先安装相关依赖：

```shell
npm install --save-dev typescript ts-node @types/node @types/webpack
```

使用 TypeScript 书写 webpack 的配置文件：  

```js
// webpack.config.ts

import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
export default config;
```


##### 3.2 Babel and JSX

在以下的例子中，使用了 JSX（React 形式的 javascript）以及 Babel 来创建 JSON 形式的 webpack 配置文件：

首先安装依赖：

```shell
npm install --save-dev babel-register jsxobj babel-preset-es2015
```

```js
// .babelrc

{
  "presets": [ "es2015" ]
}
```

```js
// webpack.config.babel.js

import jsxobj from 'jsxobj';

// example of an imported plugin
const CustomPlugin = config => ({
  ...config,
  name: 'custom-plugin'
});

export default (
  <webpack target="web" watch mode="production">
    <entry path="src/index.js" />
    <resolve>
      <alias {...{
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }} />
    </resolve>
    <plugins>
      <uglify-js opts={{
        compression: true,
        mangle: false
      }} />
      <CustomPlugin foo="bar" />
    </plugins>
  </webpack>
);
```
