## Webpack4 入门手册（共 18 章）（上）

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

## 一、 项目初始化

### 1. 初始化 demo

新建并进入文件夹 `leo`:
```sh
mkdir leo
cd leo
```

然后本地安装 `webpack` 和 `webpack-cli` （**在 Webpack 4.0以后需要单独安装**）：

```sh
npm install webpack webpack-cli --save-dev
```

初始化项目结构：
```diff
+ ├─package.json
+ ├─dist          // 存放最终打包的文件
+ │  └─index.html
+ ├─src           // 存放入口文件等开发文件
+ │  └─index.js
+ ├─webpack.config.js  // webpack的配置文件
```

安装 `lodash`：

```sh
npm install lodash --save-dev
```

*`--save` 可以简写为`-S`, `--save-dev`可以简写为`-D`.*

开发 `index.js`：

```js
import _ from 'lodash';

function createElement(){
    let div = document.createElement('div');
    div.innerHTML = _.join(['my', 'name', 'is', 'leo'], '');
    return div;
}
document.body.appendChild(createElement());
```

开发 `webpack.config.js`：   

```js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}
```

### 2. 打包测试

开始第一次打包任务：   

```sh
npx webpack

// 输出：

Hash: 030b37b6b9a0b4344437
Version: webpack 4.39.1Time: 308ms
Built at: 2019-08-07 08:10:21
  Asset     Size  Chunks             Chunk Names
main.js  552 KiB    main  [emitted]  main
Entrypoint main = main.js
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} [built][./src/index.js] 225 bytes {main} [built]
    + 1 hidden module
```

打包成功后，生成的文件会保存在 `dist` 目录中。

现在在 `dist/index.html` 中引入打包后的 `main.js`，打开浏览器测试：

```html
<script src="./main.js"></script>
```


## 二、 webpack 处理 CSS 模块

这一部分，我们开始学着使用 `webpack` 去处理 `css` 相关的模块。

### 1. 修改代码

在项目 `src` 目录中，新建 `style` 文件夹，并新建 `index.css` 文件：
```diff
  ├─package.json
  ├─dist          // 存放最终打包的文件
  │  └─index.html
  ├─src           // 存放入口文件等开发文件
  │  ├─index.js
+ │  └─style
+ │     └─index.css
  ├─webpack.config.js  // webpack的配置文件
```

接着在 `index.js` 的新建元素方法中，添加 `class` 为 `box`，这样新建的元素就带有 `box` 的 `class` 属性：

```diff
// src/index.js

import _ from 'lodash';
import './style/index.css';// 引入样式文件

function createElement(){
  let div = document.createElement('div');
  div.innerHTML = _.join(['my', 'name', 'is', 'leo'], '');
+ div.className = 'box';
  return div;
}
document.body.appendChild(createElement());
```

然后在 `index.css` 文件为 `box` ：

```css
// src/style/index.css

.box{
    color: red;
}
```


**注意：**

这里使用 `import './style/index.css';` 引入我们的样式文件，是没办法解析使用，这时我们需要在 `webpack` 中使用到第三方 `loader` 插件，这里我们使用：   

* `css-loader` ： 用于处理 `css` 文件，使得能在 js 文件中引入使用；
* `style-loader` ： 用于将 `css` 文件注入到 `index.html` 中的 `<style>` 标签上；

### 2. 安装配置插件

安装插件：

```sh
npm install --save-dev style-loader css-loader
```

再到 `webpack.config.js` 中添加 `css` 解析的 `loader` 配置：

```js
// webpack.config.js

module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }
  ]
}
```

参数介绍：

`test`：**需要匹配的模块后缀名**；
`use`：对应**处理的 loader 插件名称**（处理顺序是从右往左）。

### 3. 打包测试

```sh
npx webpack

// 输出：

Hash: 28b3965aa1b6a0047536
Version: webpack 4.39.1
Time: 482msBuilt at: 2019-08-09 07:45:25  Asset     Size  Chunks             Chunk Names
main.js  565 KiB    main  [emitted]  main
Entrypoint main = main.js
[./node_modules/_css-loader@3.2.0@css-loader/dist/cjs.js!./src/style/index.css] 190 bytes {main} [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {main} [built][./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} [built][./src/index.js] 303 bytes {main} [built]
[./src/style/index.css] 447 bytes {main} [built]
    + 3 hidden modules
```

这时候可以看见 `index.html` 中，文本已经变成红色，并且 `css` 代码已经添加到 `<style>` 标签上。

![webpack01](http://images.pingan8787.com/webpack01.png)

## 三、 webpack 模块介绍和处理 sass

在这一节中，我们会介绍 `webpack` 中的模块，并且介绍如何去处理 `sass` 文件。

### 1. webpack 模块介绍

这里介绍的模块（module）是指 `webpack.config.js` 文件中的 `module` 配置，它决定了如何处理项目中的不同类型模块。

比如上一节介绍的，使用 `style-loader` 、 ` css-loader` 两个插件去处理 `css` 文件。   

`webpack` 模块支持如下语句：

* ES2015 `import` 语句；
* CommonJS `require()` 语句；
* AMD `define` 和 `require` 语句；
* `css/sass/less` 文件中 `@import` 语句；
* 样式 `(url(...))` 或者 HTML 文件 `(<img src=...>)` 中的图片链接 `(image url)`；

这里建议使用 `ES2015` 的引入方法，毕竟这是标准。

> 更多参数介绍，可访问中文官网的介绍:   
> [《webpack 配置选项》](https://www.webpackjs.com/configuration/) https://www.webpackjs.com/configuration/

### 2. 常用模块 

#### 2.1 module.noParse

值的类型：`RegExp | [RegExp] | function`

防止 `webpack` 解析那些符合匹配条件的文件，忽略的文件夹中不应该含有 `import`、`require`、`define`的调用，或任何其他导入机制，忽略的 `library` 可以**提高构建效率**。

```js
// webpack.config.js

module: {
  noParse: function(content){
    return /jquery|lodash/.test(content);
  }
}
```

#### 2.2 module.rules

创建模块时，匹配请求的规则数组。按照规则为对应模块使用对应的 `loader`，或修改解析器（parser）。

```js
// webpack.config.js

module: {
  rules: [
    { test: /\.css$/, use: ['style-loader', 'css-loader']}
  ]
}
```

* `module.rules` 参数有：

`use`：为模块使用指定 `loader`，并且可以传入一个字符串数组，**加载顺序从右往左**。

* `module.rules` 匹配条件有：

`{test : Condition}`：**匹配**特定条件，非必传，支持一个**正则表达式**或**正则表达式数组**；  
`{include : Condition}`：**匹配**特定条件，非必传，支持一个**字符串**或**字符串数组**；  
`{exclude : Condition}`：**排除**特定条件，非必传，支持一个**字符串**或**字符串数组**；  
`{and : [Condition]}`：必须匹配数组中的所有条件；  
`{or : [Condition]}`：匹配数组中任一条件；   
`{not : [Condition]}`：必须排除这个条件；   

> 更多参数介绍，可访问中文官网的介绍:   
> [《Rule》](https://www.webpackjs.com/configuration/module/#rule) https://www.webpackjs.com/configuration/module/#rule

```js
// webpack.config.js

module: {
  rules: [
    { 
      test: /\.css$/, 
      use: ['style-loader', 'css-loader'],
      include: [
        path.resolve(__dirname, "app/style.css"),
        path.resolve(__dirname, "vendor/style.css")
      ]
    }
  ]
}

```

### 3. 加载 Sass 文件

需要使用到 `sass-loader` 的插件，这里先安装：  

```sh
npm install sass-loader node-sass --save-dev
```

在 `src/style` 目录下添加 `leo.scss` 文件，并添加内容：

```css
// leo.scss

$bg-color: #ee3;
.box{
    background-color: $bg-color;
}
```

然后在 `src/index.js` 中引入 `leo.scss` 文件：

```js
// src/index.js
import './style/leo.scss';
```

再 `npx webpack` 重新打包，并打开 `dist/index.html` 可以看到背景颜色已经添加上去：

![webpack03](http://images.pingan8787.com/webpack03.png)


### 4. 添加快捷打包命令

像 `npx webpack` 这个命令我们需要经常使用，对于这种命令，我们可以把它写成命令，方便每次使用。

我们在 `package.json` 的 `scripts` 中添加一个命令为 `build`，以后打包只要执行 `npm run build` 即可：  

```js
"scripts": {
  "build": "npx webpack -c webpack.config.js"
},
```

这里的 `-c webpack.config.js` 中，`-c` 后面跟着的是 `webpack` 配置文件的文件名，默认可以不写。  


## 四、 webpack 开启 SourceMap 和添加 CSS3 前缀

添加 `SourceMap` 是为了方便打包之后，我们在项目中调试样式，定位到样式在源文件的位置。

### 1. 开启 SourceMap  

在 `css-loader` 和 `sass-loader` 都可以通过设置 `options` 选项启用 `sourceMap`。

```js
// webpack.config.js

rules: [
  {
    test: /\.(sc|c|sa)ss$/,
    use: [
      "style-loader", 
      {
        loader:"css-loader",
        options:{ sourceMap: true }
      },
      {
        loader:"sass-loader",
        options:{ sourceMap: true }
      },
    ]
  }
]
```

再重新打包，看下 `index.html` 的样式，样式已经定位到源文件上了：

![webpack04](http://images.pingan8787.com/webpack04.png)

这样我们在开发过程中，调试样式就方便很多了。


### 2. 为样式添加 CSS3 前缀

这里我们用到 `PostCSS` 这个 `loader`，它是一个 CSS **预处理工具**，可以为 CSS3 的属性**添加前缀**，样式格式校验（`stylelint`），提前使用 `CSS` 新特性，实现 `CSS` 模块化，防止 `CSS` 样式冲突。

首先安装 `PostCSS`：

```shell
npm install postcss-loader autoprefixer --save-dev
```

另外还有：

* `postcss-cssnext` 可以让我们使用 `CSS4 `的样式，并能配合 `autoprefixer` 进行浏览器部分兼容的补全，还支持嵌套语法。

* `precss` 类似 `scss` 语法，如果我们只需要使用嵌套，就可以用它替换 `scss`。

* `postcss-import` 让我们可以在`@import` CSS文件的时 `webpack` 能监听并编译。

> 更多参数介绍，可访问中文官网的介绍:   
> [《postcss-loader》](https://www.webpackjs.com/loaders/postcss-loader/) https://www.webpackjs.com/loaders/postcss-loader/

开始添加 `postcss-loader` 并设置 `autoprefixer`：

```js
// webpack.config.js

rules: [
  {
    test: /\.(sc|c|sa)ss$/,
    use: [
      "style-loader", 
      {
        loader:"css-loader",
        options:{ sourceMap: true }
      },
      {
        loader:"postcss-loader",
        options: {
          ident: "postcss",
          sourceMap: true,
          plugins: loader => [
            require('autoprefixer')(),
            // 这里可以使用更多配置，如上面提到的 postcss-cssnext 等
            // require('postcss-cssnext')()
          ]
        }
      },
      {
        loader:"sass-loader",
        options:{ sourceMap: true }
      },
    ]
  }
]
```

还需要在 `package.json` 中添加判断浏览器版本：

```json
// package.json

{
  //...
  "browserslist": [
    "> 1%", // 全球浏览器使用率大于1%，最新两个版本并且是IE8以上的浏览器，加前缀 
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

为了做测试，我们修改 `src/style/leo.scss` 中 `.box` 的样式：

```css
// src/style/leo.scss

.box{
    background-color: $bg-color;
    display: flex;
}
```

然后重新打包，可以看见 CSS3 属性的前缀已经添加上去了：

![webpack05](http://images.pingan8787.com/webpack05.png)


## 五、 webpack 将 CSS 抽取成单独文件

在之前学习中，CSS 样式代码都是写到 `index.html` 的 `<style>` 标签中，这样样式代码多了以后，很不方便。

于是我们需要将这些样式打包成单独的 `CSS` 文件。

webpack4 开始使用 `mini-css-extract-plugin` 插件，而在 1-3 版本使用 `extract-text-webpack-plugin`。

> 注意：抽取样式以后，就不能使用 `style-loader` 注入到 html 中。

安装插件：   

```sh
npm install mini-css-extract-plugin --save-dev
```

引入插件：

```js
// webpack.config.js

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

然后修改 `rules`，将 `style-loader`，替换成 `MiniCssExtractPlugin.loader` ，然后添加 `plugins` 配置项：   

```js
// webpack.config.js

module: {
  rules: [
    {
      test: /\.(sc|c|sa)ss$/,
      use: [
        MiniCssExtractPlugin.loader, 
        {
          loader:"css-loader",
          options:{ sourceMap: true }
        },
        {
          loader:"postcss-loader",
          options: {
            ident: "postcss",
            sourceMap: true,
            plugins: loader => [require('autoprefixer')()]
          }
        },
        {
          loader:"sass-loader",
          options:{ sourceMap: true }
        },
      ]
    }
  ]
},
plugins: [
  new MiniCssExtractPlugin({
    filename: '[name].css', // 最终输出的文件名
    chunkFilename: '[id].css'
  })
]
```

然后重新打包，这时候可以看到我们 `dist` 目录下就多了个 `main.css` 文件：

![webpack06](http://images.pingan8787.com/webpack06.png)

因为现在已经将 CSS 都抽取成单独文件，所以在 `dist/index.html` 中，我们需要手动引入 `main.css` 了：

```html
// index.html

<link rel="stylesheet" href="main.css">
```

## 六、 webpack 压缩 CSS 和 JS

为了缩小打包后包的体积，我们经常做优化的时候，将 CSS 和 JS 文件进行压缩，这里需要使用到不同的插件。

### 1. 压缩 CSS

使用 `optimize-css-assets-webpack-plugin` 压缩 CSS 的插件。  

安装插件：

```sh
npm install optimize-css-assets-webpack-plugin --save-dev
```

使用插件：

```js
// webpack.config.js

// ... 省略
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  // ... 省略
  plugins: [
    // ... 省略
    new OptimizeCssAssetsPlugin({})
  ],
}
```

重新打包，可以看到 `main.css` 已经被压缩成一行代码，即压缩成功~

### 2. 压缩 JS

使用 `uglifyjs-webpack-plugin` 压缩 JS 的插件。  


安装插件：   

```sh
npm install uglifyjs-webpack-plugin --save-dev
```

引入插件：

```js
// webpack.config.js

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
```

使用插件：

```js
// webpack.config.js
// ... 省略
module.exports = {
  // ... 省略
  plugins: [
    // ... 省略
    new OptimizeCssAssetsPlugin({}),
    new UglifyJsPlugin({
      cache: true, parallel: true, sourceMap: true
    })
  ],
}
```

其中 `UglifyJsPlugin` 的参数：  

`cache`：当 JS 没有发生变化则不压缩；  
`parallel`：是否启用并行压缩；  
`sourceMap`：是否启用 sourceMap；  

然后重新打包，查看 `main.js`，已经被压缩了：

![webpack07](http://images.pingan8787.com/webpack07.png)

## 七、webpack 为文件名添加 hash 值

由于我们打包出来的 `css`、`js` 文件是静态文件，就存在缓存问题，因此我们可以给文件名添加 `hash` 值，防止缓存。   

### 1. 添加 hash 值

直接在 `webpack.config.js` 中，为需要添加 hash 值的文件名添加 `[hash]` 就可以：

```js
// webpack.config.js

module.exports = {
  // ... 省略其他
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
  ],
}
```

配置完成后，重新打包，就可以看到文件名中包含了 `hash` 值了：

![webpack08](http://images.pingan8787.com/webpack08.png)

### 2. 动态引用打包后的文件

由于我们前面给打包的文件名添加了 `hash` 值，会导致 `index.html` 引用文件错误，所以我们需要让它能动态引入打包后的文件。

这里我们使用 `HtmlWebpackPlugin` 插件，它可以把打包后的 CSS 或者 JS 文件直接引用注入到 HTML 模版中，就不用每次手动修改。

安装插件：

```sh
npm install html-webpack-plugin --save-dev
```

引入插件：

```js
// webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
```

使用插件：

```js
// webpack.config.js

plugins: [
  new HtmlWebpackPlugin({
    title: "leo study!",   // 生成的文件标题
    filename: "main.html", // 最终生成的文件名
    minify: { // 压缩选项
      collapseWhitespace: true, // 移除空格
      removeComments: true, // 移除注释
      removeAttributeQuotes: true, // 移除双引号
    }
  })
],
```

关于 `html-webpack-plugin` 更多介绍可以[《查看文档》](https://github.com/jantimon/html-webpack-plugin)https://github.com/jantimon/html-webpack-plugin/。

接着我们打包以后，可以看见 `dist` 目录下，多了 `main.html` 的文件，格式化以后，可以看出，已经动态引入打包后的 CSS 文件和 JS 文件了：

![webpack09](http://images.pingan8787.com/webpack09.png)


## 八、 webpack 清理目录插件

在之前，我们每次打包都会生成新的文件，并且在添加 `hash` 值以后，文件名不会出现重复的情况，导致旧文件的冗余。

为了解决这个问题，我们需要在每次打包之前，将 `/dist` 目录清空，再进行打包。

这里我们使用 `clean-webpack-plugin` 插件来实现。

安装插件：

```sh
npm install clean-webpack-plugin --save-dev
```

引入插件：

```js
// webpack.config.js

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
```

使用插件：  

```js
// webpack.config.js

plugins: [
  new CleanWebpackPlugin()
],
```

参数 `cleanOnceBeforeBuildPatterns` 是表示需要清除的文件夹。

这样我们每次打包之前，都会先将 `/dist` 目录清空一次，再执行打包。   

> 更多参数介绍，可访问中文官网的介绍:   
> [《clean-webpack-plugin》](https://github.com/jantimon/clean-webpack-plugin)https://github.com/jantimon/clean-webpack-plugin/。


## 九、 webpack 图片处理和优化

### 1. 图片处理

在项目中引入图片：

```css
// src/style/leo.scss

.box{
    background-color: $bg-color;
    display: flex;
    background: url('./../assets/logo.jpg')
}
```

这时候我们如果直接打包，会报错。

我们需要使用 `file-loader` 插件来处理文件导入的问题。   

安装插件：

```sh
npm install file-loader --save-dev
```

使用插件：

```js
// webpack.config.js

module: {
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    use: ["file-loader"]
  }]
},
```

重新打包以后，发现 `dist` 目录下多了一个如 `373e5e0e214390f8aa9e7abb4c7c635c.jpg` 名称的文件，这就是我们打包后的图片。

![webpack10](http://images.pingan8787.com/webpack10.png)

### 2. 图片优化

更进一步，我们可以对图片进行压缩和优化，这里我们用到 `image-webpack-loader` 插件来处理。

安装插件：

```sh
npm install image-webpack-loader --save-dev
```

使用插件：

```js
// webpack.config.js

module: {
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    include: [path.resolve(__dirname, 'src/')],
    use: ["file-loader",{
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
> [《image-webpack-loader》](https://github.com/tcoopman/image-webpack-loader)https://github.com/tcoopman/

再重新打包，我们可以看到图片打包前后，压缩了很大：

![webpack11](http://images.pingan8787.com/webpack11.png)


## 参考资料

* [《Webpack4 中文网》](https://www.webpackjs.com)

* [《2019最新Webpack4.0教程4.x 成仙之路》](https://www.bilibili.com/video/av41546218/?p=1)


---
《Webpack4入门手册（上）（共 18 章）》到这里结束。 

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