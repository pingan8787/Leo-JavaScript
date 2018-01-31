> 中文官方文档 [Webpack 3.10.0 ](https://doc.webpack-china.org/concepts/)

# 介绍
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
更多`entry`配置项，查看 [入口起点](https://doc.webpack-china.org/concepts/entry-points) 了解。  

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
更多`output`配置项，查看 [输出](https://doc.webpack-china.org/configuration/output) 了解。  

## 3、loader
`loader` 作用是将所有文件类型转换成webpack能处理的有效模块，然后就可以通过webpack将文件打包。  
本质上，webpack loader将所有类型文件转换成应用程序的依赖图可以直接引用的模块。  
** 特殊 ** 只有webpack支持 `import` 导入任何类型模块，如 `.css`,`.vue` 等文件。  
`webpack` 配置 `loader`的两个目标：  
  * 1.识别需要对应 `loader` 处理的文件。(使用`test`属性)  
  * 2.转换文件使其能够添加到依赖图并最终添加到 `bunlde` 中。(使用`use`属性)