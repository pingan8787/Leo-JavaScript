## 1-开启定位错误文件的具体地方
```javascript
// webpack.config.js
module.exports = {
    devtool:"inline-source-map", // 帮助将报错内容具体定位到某个文件的某几行。
}
```

## 2-观察者模式 （类似热更新） 需刷新浏览器
```javascript
// package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch"  // 开启观察者模式
},
```
运行  
```
npm run watch
```
缺点：需要刷新浏览器，才可以看到修改后的实际效果。  

## 3-观察者模式 （类似热更新）不需刷新浏览器
使用 `webpack-dev-server` 开启简单web服务器，实现实时加载。  
安装：  
```
npm install --save-dev webpack-dev-server
```
修改配置：  
```javascript
// webpack.config.js
module.exports = {
    devServer:{
        contentBase:"./dist" // 开启实时刷新服务
    },
}
// 默认 localhost:8080 在dist目录下
```
设置直接运行开发服务器：  
```javascript
// package.json
"scripts": {
    "start": "webpack-dev-server --open",
}
```
模块热替换  https://doc.webpack-china.org/guides/hot-module-replacement  

## 4-自动将处理后的文件发布到服务器上
使用 `webpack-dev-middleware` 中间件容器，这里使用 `webpack-dev-middleware` 和 `express server` 演示：  
安装`express`和`webpack-dev-middleware`：
```
npm install --save-dev express webpack-dev-middleware
```
配置webpack：   
```javascript
// webpack.config.js
module.exports = {
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist'),
        publicPath: '/' // 在服务器脚本用到 确保文件资源能在localhost:3000下正常访问
    },
}
```
设置`express`服务：
在根目录添加 `server.js` 
```javascript
// server.js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler,{
    publicPath: config.output.publicPath
}))

// Server the files on port 3000
app.listen(3000,function(){
    console.log('测试案例服务器开启，端口号 3000')
})
// 然后在package.json 添加npm script
```
添加 `npm script` 到 `package.json` :
```javascript
// package.json
"scripts": {
    "server":"node server.js"
}
```
`npm run server` 运行

## 5-精简输出（删除未引用得代码）
如删除项目中未引用的`export`或`import`的代码：  
安装`UglifyJSPlugin`：  
```
npm install --save-dev uglifyjs-webpack-plugin
```
引用：  
```javascript
// webpack.config.js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports={
    ...
    plugins:[
        new UglifyJSPlugin()
    ]
}
```



> 最后更新时间：2018.01.31