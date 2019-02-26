> 中文官方文档 [Webpack 3.10.0 ](https://doc.webpack-china.org/concepts/)

# 一、概念介绍
本质上，`webpack` 是一个现代` JavaScript` 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 `bundle`。  
它是高度可配置的，但是，在开始前你需要先理解四个核心概念：    
  * 入口(entry)
  * 输出(output)
  * loader
  * 插件(plugins)

## 1、 入口(entry)
指定webpack从哪个模块开始构建项目，通过一下配置指定一个入口起点(或多个入口起点)，被处理到称之为  `bundles` 的文件中：  
```javascript
// webpack.config.js
module.exports = {
    entry: './path/to/my/entry/file.js'
}
```
更多`entry`配置项，查看 [入口起点 output](https://doc.webpack-china.org/concepts/entry-points) 了解。  

## 2、出口(output)
处理打包生成的 `bundles` 文件，如指定输出文件位置，文件名等。  
```javascript
// webpack.config.js
module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'test_name.bunlde.js'
    }
}
```
更多`output`配置项，查看 [输出 output](https://doc.webpack-china.org/configuration/output) 了解。  

## 3、loader
`loader` 作用是将所有文件类型转换成webpack能处理的有效模块，然后就可以通过webpack将文件打包。  
本质上，webpack loader将所有类型文件转换成应用程序的依赖图可以直接引用的模块。  
特殊: 只有webpack支持 `import` 导入任何类型模块，如 `.css`,`.vue` 等文件。  
`webpack` 配置 `loader`的两个目标：  
  * 1.识别需要对应 `loader` 处理的文件。(使用`test`属性)  
  * 2.转换文件使其能够添加到依赖图并最终添加到 `bunlde` 中。(使用`use`属性)

```javascript
// webpack.config.js
const path = require('path');
const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' } // test/use 两个属性是必须的
    ]
  }
}
module.exports = config;
```
更多`loaders`配置项，查看 [loaders](https://doc.webpack-china.org/concepts/loaders) 了解。  

## 4、插件(plugins)
使用插件可以执行范围更广的任务。通过 `require()` 引用后添加在 `plugins` 数组中。  
另外如果需要多次使用同一个插件，则使用 `new` 操作符来创建它的一个实例。  
```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```
更多`plugins`配置项，查看 [插件 plugins](https://doc.webpack-china.org/concepts/plugins) 了解。    
查看 [插件列表](https://doc.webpack-china.org/plugins)。    


# 二、入口起点(Entry Points)
webpack的 `entry` 属性不仅可以配置单个入口，还可以配置多个入口：

## 1、单个入口(简写)配置
用法：`entry: string|Array<string>`  
简单使用 ：  
```javascript
const config = {
  entry: './path/to/my/entry/file.js'  
};
module.exports = config;
```
`entry` 属性的单个入口配置方式：   
```javascript
const config = {
    entry:{
        main:'./path/to/my/entry/file.js'
    }
}
```
若向 `entry` 传入 `[文件路径(file path)数组]`，将创建 `多个主入口`，常常用在需要同时注入多个文件，并将它们的依赖导向(graph)到一个`chunk`时。  

## 2、多个入口(简写)配置
### 对象语法
用法：`entry: {[entryChunkName: string]: string|Array<string>}`  
```javascript
// webpack.config.js
webpack.config.js

const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```
虽然语法繁琐，但这是应用程序中定义入口的最可扩展的方式。   
>“可扩展的 webpack 配置”是指，可重用并且可以与其他配置组合使用。这是一种流行的技术，用于将关注点(concern)从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如 [webpack-merge](https://github.com/survivejs/webpack-merge)）将它们合并。   

### 常见场景
列出一些常见的入口配置和实际案例：  
#### (1)分离 应用程序(app) 和 第三方库(vendor) 入口
```javascript
// webpack.config.js
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
// webpack 从 app.js 和 vendors.js 开始构建，并且他们是完全分离互相独立
// 为了支持提供更佳 vendor 分离能力的 DllPlugin，考虑移除该场景。
```

#### (2)多页面应用程序
```javascript
// webpack.config.js
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
// 这样告诉 webpack 需要 3 个独立分离的依赖图
// 使用 CommonsChunkPlugin 为每个页面间的应用程序共享代码创建 bundle。
// 由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益。
// 根据经验：每个 HTML 文档只使用一个入口起点。 
```



> 最后更新日期：2018.01.31