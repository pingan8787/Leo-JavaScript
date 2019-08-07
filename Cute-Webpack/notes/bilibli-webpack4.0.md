## webpack 4.0 B站教程整理

> [webpack 4.0 教程  bilibili](https://www.bilibili.com/video/av41546218/?p=1)

本教程没有太去介绍一些概念的问题了，在代码编写过程中，我会加上分析解释的介绍。

### 一、 快速入门 demo

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


### 四、 webpack的sass添加c3前缀和sourcemap的处理

### 四. webpack的sass添加c3前缀和sourcemap的处理

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