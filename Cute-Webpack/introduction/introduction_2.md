## Webpack4 入门手册（共 18 章）（下）

![webpack_bg](http://images.pingan8787.com/webpack_bg.png)

## 介绍

### 1. 背景

最近和部门老大，一起在研究团队【EFT - 前端新手村】的建设，目的在于：**帮助新人快速了解和融入公司团队**，**帮助零基础新人学习和入门前端开发**并且**达到公司业务开发水平**。

本文也是属于【EFT - 前端新手村】的一部分，用来帮助新人快速入门 `Webpack4`，内容偏基础，当然也可以作为复习材料~~这里分享给各位小伙伴啦！


### 2. 文章概要

由于本文篇幅较长，将分为《**Webpack4入门手册（上）（共 18 章）**》和《**Webpack4入门手册（下）（共 18 章）**》两篇文章发布，请联系起来看~

我将从最基础的【项目初始化】开始介绍，到【处理 CSS / JS / 图片】，到【热更新，打包优化】等等，一一介绍和实践。

文章共分为 18 章，关于最基础的四个核心概念，可以到我整理的另一篇文章 [《Webpack4 的四个核心概念》](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-Webpack/guide/README.md) 中学习。

> 《Webpack4 的四个核心概念》
> https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-Webpack/guide/README.md

### 3. 教程目录

![教程目录](http://images.pingan8787.com/Webpack4%E5%85%A5%E9%97%A8%E6%89%8B%E5%86%8C2.png)

## 十、 webpack 图片 base64 和字体处理

### 1. 图片 base64 处理

`url-loader` 功能类似于 `file-loader`，可以将 url 地址对应的文件，打包成 base64 的 DataURL，提高访问效率。

安装插件：

```sh
npm install url-loader --save-dev
```

使用插件：

> 注意：这里需要将前面配置的 `image-webpack-loader` 先删除掉，在使用 `url-loader`。

```js
// webpack.config.js

module: {
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    include: [path.resolve(__dirname, 'src/')],
    use: [
      {
        loader: 'url-loader', // 根据图片大小，把图片转换成 base64
          options: { limit: 10000 }, 
      },
      {
        loader: "image-webpack-loader",
        options: {
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: '65-90', speed: 4 },
          gifsicle: { interlaced: false },
          webp: { quality: 75 }
        }
      },
    ]
  }]
},
```

> 更多参数介绍，可访问中文官网的介绍:   
> [《url-loader》](https://github.com/webpack-contrib/url-loader)https://github.com/webpack-contrib/url-loader。


### 2. 字体处理

字体处理的方式和图片处理方式是一样的，只是我们在配置 `rules` 时的 `test` 值不相同：

```js
// webpack.config.js

module: {
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    include: [path.resolve(__dirname, 'src/')],
    use: [ 'file-loader' ]
  }
},
```

## 十一、 webpack 配置合并和提取公共配置

在开发环境（development）和生产环境（production）配置文件有很多不同，但也有部分相同，为了不每次更换环境的时候都修改配置，我们就需要将配置文件做合并，和提取公共配置。

我们使用 `webpack-merge` 工具，将两份配置文件合并。

安装插件：

```sh
npm install webpack-merge --save-dev
```

然后调整目录结构，为了方便，我们将原来 `webpack.config.js` 文件修改名称为 `webpack.commen.js`，并复制两份相同的文件出来，分别修改文件名为 `webpack.prod.js` 和 `webpack.dev.js` 。 

```diff
  ├─package.json
  ├─dist
  ├─src
- ├─webpack.config.js
+ ├─webpack.common.js  // webpack 公共配置文件
+ ├─webpack.prod.js    // webpack 生产环境配置文件
+ ├─webpack.dev.js     // webpack 开发环境配置文件
```

由于我们文件调整了，所以在 `package.json` 中，打包命令也需要调整，并且配置 `mode` 模式。

```diff
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
- "build": "npx webpack -c webpack.config.js",
+ "build": "npx webpack -c webpack.dev.js --mode development",
+ "dist": "npx webpack -c webpack.prod.js --mode production"
},
```

### 1. 调整 webpack.common.js 

我们先调整 `webpack.common.js ` 文件，将通用的配置保留，不是通用的配置删除，结果如下：

```js
// webpack.common.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    noParse: function (content) {return /jquery|lodash/.test(content);},
    rules: [
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      include: [path.resolve(__dirname, 'src/')],
      use: [{
        loader: 'url-loader', // 根据图片大小，把图片转换成 base64
        options: { limit: 10000 },
      },{
        loader: "image-webpack-loader",
        options: {
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: '65-90', speed: 4 },
          gifsicle: { interlaced: false },
          webp: { quality: 75 }
        }
      }]
    },{
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      include: [path.resolve(__dirname, 'src/')],
      use: [ 'file-loader' ]
    }]
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: "leo study!",
          filename: "main.html",
          template: path.resolve(__dirname, 'src/index.html'), 
          minify: {
              collapseWhitespace: true,
              removeComments: true,
              removeAttributeQuotes: true,
          }
      }),
      new CleanWebpackPlugin()
  ],
}
```

### 2. 安装 babel-loader

安装 `babel-loader` 是为了将 ES6 及以上版本的 JS 代码转换成 ES5。

```sh
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

使用插件：  

```js
// webpack.common.js

rules: [
  // ... 省略其他
  {
    test: /\.js$/,
    use: [{
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }],
    exclude: /(node_modules|bower_components)/,
  }
]
```

关于 `babel-loader` 更多介绍可以[《查看文档》](https://webpack.js.org/loaders/babel-loader/)https://webpack.js.org/loaders/babel-loader/。


### 3. 调整 webpack.dev.js

这里我们就需要用到 `merge-webpack` 插件进行配置合并了：  

```js
// webpack.dev.js

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let devConfig = {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(sc|c|sa)ss$/,
      use: [
        'style-loader', {
          loader: "css-loader",
          options: { sourceMap: true }
        }, {
          loader: "postcss-loader",
          options: {
              ident: "postcss", sourceMap: true,
              plugins: loader => [ require('autoprefixer')() ]
          }
        }, {
          loader: "sass-loader",
          options: { sourceMap: true }
        }
      ]
    }]
  }
}
module.exports = merge(common, devConfig)
```

### 4. 调整 webpack.prod.js

同样对于生产环境的配置，我们也需要用 `merge-webpack` 插件进行配置合并：  

```js
// webpack.prod.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let prodConfig = {
  mode: 'production',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(sc|c|sa)ss$/,
      use: [
        MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: { sourceMap: true }
        },  {
          loader: "postcss-loader",
          options: {
            ident: "postcss", sourceMap: true,
            plugins: loader => [ require('autoprefixer')() ]
          }
        }, {
          loader: "sass-loader",
          options: { sourceMap: true }
        }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new OptimizeCssAssetsPlugin({}),
    new UglifyJsPlugin({
      cache: true, parallel: true, sourceMap: true
    }),
  ],
}
module.exports = merge(common, prodConfig)
```

## 十二、 webpack 监控自动编译和启用 js 的 sourceMap

### 1. 开启 js 的 sourceMap

当 webpack 打包源代码后，就很难追踪到错误和警告在源代码的位置。

如将三个源文件打包一个 `bundle` 中，其中一个文件的代码报错，那么堆栈追中就会指向 `bundle`。

为了能方便定位错误，我们使用 `inline-source-map` 选项，注意不要在生产环境中使用。

```diff
// webpack.dev.js

let devConfig = {
  // ... 省略其他
+  devtool: 'inline-source-map'
}
```

### 2. 测试 sourceMap

为了测试是否成功，我们将 `src/index.js` 代码中，在第 12 行上，添加一句日志打印。

```diff
// src/index.js

// ... 省略其他
+ console.log(111)
```

对比下开启 `sourceMap` 前后的区别：

![webpack12](http://images.pingan8787.com/webpack12.png)

### 3. 开启监控自动编译

如果每次我们修改完代码，都要手动编译，那是多累的一件事。

为此我们使用 `--watch` 命令，让我们每次保存完，都会自动编译。

为此，我们需要在 `package.json` 中的打包命令添加 `--watch` 命令：

```diff
// package.json

- "build": "npx webpack --config webpack.dev.js",
+ "build": "npx webpack --config webpack.dev.js --watch",
```

这里仅对开发环境开启，生产环境不需要使用。

## 十三、 webpack 热更新

上一节介绍监控自动编译，当我们保存文件后，会自动编译文件，但是我们还是需要手动去刷新页面，才能看到编译后的结果。

于是为了自动编译之后，再自动重新加载，我们就可以使用 `webpack-dev-server` 来启动一个简单 web 服务器，实时重新加载。

### 1. 开启热更新

插件安装：

```sh
npm install webpack-dev-server --save-dev
```

使用插件：

```js
// webpack.dev.js

const webpack = require('webpack');
const webpack = require('webpack');

let devConfig = {
  // ... 省略其他
  devServer: {
    contentBase: path.join(__dirname, 'dist'), 
    compress: true,
    hot: true,
    overlay: true, 
    open:true,
    publicPath: '/',
    host: 'localhost',
    port: '1200'
 }
 plugins: [
    new webpack.NamedModulesPlugin(), // 更容易查看（patch）的以来
    new webpack.HotModuleReplacementPlugin() // 替换插件
 ]
}
```

启动热更新：

```sh
npx webpack-dev-server --config webpack.dev.js
```

常用配置：
```
contentBase: path.join(__dirname, 'dist'), //本地服务器所加载的页面所在的目录
clinetLogLevel: 'warning', // 可能值有 none, error, warning 或者 info (默认值)
hot:true,//启动热更新替换特性，需要配合 webpack.HotModuleReplacementPlugin 插件
host:'0.0.0.0', // 启动服务器的 host
port:7000,      // 端口号
compress:true,  // 为所有服务启用gzip压缩
overlay: true,  // 在浏览器中显示全屏覆盖
stats: "errors-only" ,// 只显示包中的错误
open:true, // 启用“打开”后，dev服务器将打开浏览器。
proxy: {   // 设置代理
    "/api": {
        target: "http://localhost:3000",
        pathRewrite: {"^/api" : ""}
    }
}
```

这时候我们访问 `http://localhost:1200/main.html` 就可以看到页面，并且修改文件，页面也会同时刷新。

### 2. 优化命令

我们可以将 `npx webpack-dev-server --config webpack.dev.js` 写到 `package.json` 中作为一个命令：

```diff
// package.json

"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "npx webpack --config webpack.dev.js --watch",
  "dist": "npx webpack --config webpack.prod.js",
+ "watch": "npx webpack-dev-server --config webpack.dev.js"
},
```

## 十四、 webpack 设置代理服务器和 babel 转换及优化


### 1. 设置代理服务器

接着上一节，接下来给 webpack 设置代理服务器：

```js
// webpack.dev.js

let devConfig = {
  // ... 省略其他
  devServer: {
    // ... 省略其他
    proxy: { 
      "/api": { // 以 '/api' 开头的请求，会跳转到下面的 target 配置
        target: "http://192.168.30.33:8080",
        pathRewrite: {
          "^api": "/mock/api"
        }
    }
 }
}
```

最后当我们请求 `/api/getuser` 接口，就会转发到 `http://192.168.30.33:8080/mock/api`。

### 2. babel 转换及优化

`babel-loader` 插件的安装，已经提前介绍，在【十一、 webpack 配置合并和提取公共配置】中。

这里讲一下 `babel-loader` 的优化。

`babel-loader` 可以配置 `cacheDirectory` 来提高打包效率：

* `cacheDirectory`：默认值 `false`，开启后构建时会缓存文件夹，后续从缓存中读取，将提高打包效率。

## 十五、 webpack 开启 Eslint

安装插件：

```sh
npm install eslint eslint-loader --save-dev
```

另外还需要安装 eslint 解释器、校验规则等：

```sh
npm install babel-loader standard --save-dev
```

### 2. 添加 .eslintrc.js

在项目根目录创建 `.eslintrc.js`，指定 eslint 规则。

这份配置内容有点多，可以去 [我的 gist 复制](https://gist.github.com/pingan8787/8b9abe4e04bed85f9d7846e513ed2e11)https://gist.github.com/pingan8787/8b9abe4e04bed85f9d7846e513ed2e11 。

### 3. 添加 .eslintignore

在项目根目录创建 `.eslintignore`，指定 eslint 忽略一些文件不校验，比如内容可以是：

```
/dist/
/node_modules/
```

## 十六、 webpack 解析模块拓展名和别名

在 webpack 配置中，我们使用 `resolve` 来配置模块解析方式。

这是非常重要的，比如 `import _ from 'lodash'` ，其实是加载解析了 `lodash.js` 文件。

该配置就是用来设置**加载和解析**的方式。

在解析过程中，我们可以进行配置：   

### 1. resolve.alias

当我们引入一些文件时，需要写很长的路径，这样使得代码更加复杂。

为此我们可以使用 `resolve.alias`，创建 `import` 或 `require` 的别名，使模块引入更加简单。

使用配置：

```diff
// webpack.common.js

module.exports = {
  entry: './src/index.js',
+ resolve: {
+   alias: {
+     '@' : path.resolve(__dirname, 'src/')
+   }
+ }
  // 省略其他
}
```

`alias` 参数的含义：

使用 `@` 来替代 `path.resolve(__dirname, 'src/')` 这个路径，接下来我们测试看看。

我们在 `src/` 目录下新增 `leo.js`：

```js
// leo.js

export let name = 'pingan';
```

再到 `src/index.js` 中引入：  

```js
// index.js

import { name } from '@/leo.js';
```

这样就能正常引入。   

当然，我们也可以根据实际情况，**为不同路径设置不同别名**：

```diff
// webpack.common.js


alias: {
  '@' : path.resolve(__dirname, 'src/')
+ 'assets' : path.resolve(__dirname, 'src/assets/')
}
```

> 更多参数介绍，可访问中文官网的介绍:   
> [《resolve》](https://www.webpackjs.com/configuration/resolve/)https://www.webpackjs.com/configuration/resolve/。


### 2. resolve.extensions

`resolve.extensions` 用来自动解析确定的扩展，让我们在引入模块的时候，可以不用设置拓展名，默认值为：

```js
extensions: [".js", ".json"]
```

使用配置：

```js
// webpack.common.js

import { name } from '@/leo';
```

## 十七、 webpack 配置外部拓展

当我们使用 CDN 引入 `jquery` 时，我们并不想把它也打包到项目中，我们就可以配置 `externals` 外部拓展的选项，来将这些不需要打包的模块从输出的 bundle 中排除：

```html
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
```

配置 `externals`：

```diff
// webpack.common.js

module.exports = {
  // ... 省略其他
+ externals: {
+   jquery: 'jQuery'
+ },
}
```

通过上面配置，我们就不会把不需要打包的模块打包进来。并且下面代码正常运行：

```js
import $ from 'jquery';

$('.leo').show();
```

> 更多参数介绍，可访问中文官网的介绍:   
> [《externals》](https://www.webpackjs.com/configuration/externals/)https://www.webpackjs.com/configuration/externals/。

## 十八、 webpack 打包分析报表及优化总结

### 1. 生成报表

这里我们使用 `webpack-bundle-analyzer` 插件，来对打包后的文件进行数据分析，从来找到项目优化的方向。

`webpack-bundle-analyzer` 使用交互式可缩放树形图可视化 webpack 输出文件的大小。

安装插件：

```sh
npm install webpack-bundle-analyzer --save-dev
```

这个我们只有在**开发环境**中使用。

使用插件：

```js
// webpack.dev.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
    // ...
  ]
}
```

配置完成以后，我们执行 `npm run build` 打包，打包完成后，会自动打开一个数据报表分析的页面，地址是 `http://127.0.0.1:8888/`：

![webpack14](http://images.pingan8787.com/webpack14.png)

`webpack-bundle-analyzer` 将帮助我们：
* 看清楚我们包内都包含什么模块；
* 准确看出每个模块的组成；
* 最后优化它！

我们经常将报表中区域最大的模块进行优化！

### 2. 通过报表优化项目

![webpack14](http://images.pingan8787.com/webpack14.png)

我们可以看出，打包后的项目中 `lodash.js` 占了非常大的内存，我们就针对 `lodash.js` 进行优化。

我们将 `lodash.js` 改为 CDN 引入：

```html
// index.html

<script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.js"></script>
```

然后去设置上一节讲到的 `externals`：

```diff
// webpack.common.js

externals: {
  jquery: 'jQuery',
+ lodash: '_'
},
```

再打包以后，可以看到 `lodash.js` 已经不在包里面了：

![webpack15](http://images.pingan8787.com/webpack15.png)


并且打包后的文件，也能正常运行：

![webpack16](http://images.pingan8787.com/webpack16.png)

> 更多参数介绍，可访问中文官网的介绍:   
> [《webpack-bundle-analyzer》](https://github.com/webpack-contrib/webpack-bundle-analyzer)https://github.com/webpack-contrib/webpack-bundle-analyzer。


## 参考资料

* [《Webpack4 中文网》](https://www.webpackjs.com)

* [《2019最新Webpack4.0教程4.x 成仙之路》](https://www.bilibili.com/video/av41546218/?p=1)


---
《Webpack4入门手册（下）（共 18 章）》到这里结束。 

----

## 总结

本文是根据 [《2019最新Webpack4.0教程4.x 成仙之路》](https://www.bilibili.com/video/av41546218/?p=1) 学习总结下来的学习之路，适合入门，涉及范围较多，内容比较长，需要能静下心来学习。

内容如果有误，欢迎留言指点，我会及时修改。

本文代码最终托管在我的 github 上，[点击查看](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-Webpack/introduction/README.md)(https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-Webpack/introduction/README.md)。

希望自己的文章会对各位有所帮助，也欢迎各位大佬指点。 

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|

## 微信公众号
![bg](http://images.pingan8787.com/2019_07_12guild_page.png)  