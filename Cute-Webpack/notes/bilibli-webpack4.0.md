## webpack 4.0 B站教程整理

> [webpack 4.0 教程  bilibili](https://www.bilibili.com/video/av41546218/?p=1)

本教程没有太去介绍一些概念的问题了，在代码编写过程中，我会加上分析解释的介绍。

### 一、 快速入门 demo

#### 1. 项目初始化

新建文件夹 `leo`:
```bash
mkdir leo
```

进入文件夹 `cd leo`:
```bash
cd leo
```

然后本地安装 `webpack` 和 `webpack-cli` （在 Webpack 4.0以后需要单独安装）：

```bash
npm i -D webpack webpack-cli
```

初始化项目结构：
```
+ ├─package.json
+ ├─dist          // 存放最终打包的文件
+ │  └─index.html
+ ├─src           // 存放入口文件等开发文件
+ │  └─index.js
+ ├─webpack.config.js  // webpack的配置文件
```

安装 `lodash`：
```bash
npm i -S lodash
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

#### 2. 打包测试

开始第一次打包任务：   

```bash
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

打包成功后，会保存在 `dist` 目录中。

现在在 `dist/index.html` 中引入打包后的 `main.js`，打开浏览器测试：

```html
<script src="./main.js"></script>
```


### 二、 webpack 处理 css 模块

这一部分，我们开始学着使用 `webpack` 去处理 `css` 相关的模块。

#### 1. 修改代码

在项目 `src` 目录中，新建 `style` 文件夹，并新建 `index.css` 文件：
```
  ├─package.json
  ├─dist          // 存放最终打包的文件
  │  └─index.html
  ├─src           // 存放入口文件等开发文件
  │  ├─index.js
+ │  └─style
+ │     └─index.css
  ├─webpack.config.js  // webpack的配置文件
```

并在 `index.css` 文件给我们新建的 `div` 元素添加 class ：

```css
// src/style/index.css

.box{
    color: red;
}
```

接着在 `index.js` 的新建元素方法中，添加 `class` 为 `box`，这样新建的元素就带有 `box` 的 `class` 属性：

```js
// src/index.js
import _ from 'lodash';
import './style/index.css';// 引入样式文件

function createElement(){
    let div = document.createElement('div');
    div.innerHTML = _.join(['my', 'name', 'is', 'leo'], '');
    div.className = 'box';
    return div;
}
document.body.appendChild(createElement());
```

**注意：**

这里使用 `import './style/index.css';` 引入我们的样式文件，是没办法解析使用，这时我们需要在 `webpack` 中使用到第三方 `loader` 插件，这里我们使用：   

* `css-loader` ： 用于处理 `css` 文件，使得能在 js 文件中引入使用；
* `style-loader` ： 用于将 `css` 文件注入到 `index.html` 中的 `<style>` 标签上；

#### 2. 安装配置插件

首先通过 `npm` 去安装这两个插件：

```bash
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

这段代码中，`test` 的值表示**需要匹配的模块后缀名**，`use` 则表示对应**处理的 loader 插件名称**（处理顺序是从右往左）。

#### 3. 打包测试

```bash
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

然后打开 `index.html` 可以看见，文本样式已经变成红色，并且 `css` 代码已经添加到 `<style>` 标签上。

![webpack01](http://images.pingan8787.com/webpack01.png)


### 三、 webpack 的模块和处理 sass

在这一节中，我们会介绍 `weboack` 中关于模块的一些概念，并且会介绍在上一节基础上，如何去处理 `sass` 文件。

#### 1. webpack 模块介绍

这里介绍的模块（module）是指 `webpack.config.js` 文件中的 `module` 配置，它决定了如何处理项目中的不同类型模块。

比如上一节介绍的，使用 `style-loader` 、 ` css-loader` 两个插件去处理 `css` 文件。   

webpack 模块支持如下语句：

* ES2015 `import` 语句；
* CommonJS `require()` 语句；
* AMD `define` 和 `require` 语句；
* `css/sass/less` 文件中 `@import` 语句；
* 样式 `(url(...))` 或者 HTML 文件 `(<img src=...>)` 中的图片链接 `(image url)`；

这里建议使用 `ES2015` 的引入方法，毕竟这是标准。

另外，所有的 [webpack 配置选项](https://www.webpackjs.com/configuration/) 可以在中文官网查看，我们入门只学习常用模块。

#### 2. 常用模块 module.noParse

值的类型：`RegExp | [RegExp] | function`

防止 webpack 解析那些符合匹配条件的文件，忽略的文件夹中不应该含有 `import`、`require`、`define`的调用，或任何其他导入机制，忽略的 library 可以提高构建效率。

```js
// webpack.config.js

module: {
  noParse: function(content){
    return /jquery|lodash/.test(content);
  }
}
```







### 四、 webpack的sass添加c3前缀和sourcemap的处理

1. 开启 `sourceMap`   

```js
// webpack.config.js

module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options:{
            sourceMap: true
          }
        }
      ]
    }
  ]
}
```
2. 使用` PostCSS` 处理 `loader`（附带：添加 `CSS3` 前缀）

`PostCSS` 用来做 `CSS` 预处理，用途：为 `CSS` 属性添加浅醉，样式格式校验（`stylelint`），提前使用 `CSS `新特性，实现 `CSS `模块化，防止 `CSS` 样式冲突。

以使用 `PostCSS` 添加前缀为例：

```shell
npm i D postcss-loader autoprefixer
```
另外还有：

* `postcss-cssnext` 可以让我们使用 `CSS4 `的样式，并能配合 `autoprefixer` 进行浏览器部分兼容的补全，还支持嵌套语法。

* `precss` 如果只需要使用嵌套，可以用它。

* `postcss-import` 让我们可以在`@import` CSS文件的时候让 `webpack` 监听并编译。

更多插件可以看 `postcss-loader` 的 github 官网介绍。

```js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',{
                    loader: 'css-loader',
                    options:{
                        sourceMap: true
                    }
                },{
                    loader: 'postcss-loader',
                    options:{
                        ident:'postcss',
                        plugins: loader => {
                            require('autoprefixer')({ browsers: ['> 0.15% in CN']})
                        }
                    }
                }
            ]
        }
    ]
}
```