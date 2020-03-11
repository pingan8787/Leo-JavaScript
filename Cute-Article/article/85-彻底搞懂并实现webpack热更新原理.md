原文地址：[https://segmentfault.com/a/1190000020310371](https://segmentfault.com/a/1190000020310371)

- [HMR是什么](https://segmentfault.com/a/1190000020310371#HMR%E6%98%AF%E4%BB%80%E4%B9%88)
  - [使用场景](https://segmentfault.com/a/1190000020310371#%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
- [配置使用HMR](https://segmentfault.com/a/1190000020310371#%E9%85%8D%E7%BD%AE%E4%BD%BF%E7%94%A8HMR)
  - [配置webpack](https://segmentfault.com/a/1190000020310371#%E9%85%8D%E7%BD%AEwebpack)
  - [解析webpack打包后的文件内容](https://segmentfault.com/a/1190000020310371#%E8%A7%A3%E6%9E%90webpack%E6%89%93%E5%8C%85%E5%90%8E%E7%9A%84%E6%96%87%E4%BB%B6%E5%86%85%E5%AE%B9)
  - [配置HMR](https://segmentfault.com/a/1190000020310371#%E9%85%8D%E7%BD%AEHMR)
- [HMR原理](https://segmentfault.com/a/1190000020310371#HMR%E5%8E%9F%E7%90%86)
- [debug服务端源码](https://segmentfault.com/a/1190000020310371#debug%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%BA%90%E7%A0%81)
  - [服务端简易实现](https://segmentfault.com/a/1190000020310371#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E7%AE%80%E6%98%93%E5%AE%9E%E7%8E%B0)
  - [服务端调试阶段](https://segmentfault.com/a/1190000020310371#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E8%B0%83%E8%AF%95%E9%98%B6%E6%AE%B5)
- [debug客户端源码](https://segmentfault.com/a/1190000020310371#debug%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%BA%90%E7%A0%81)
  - [客户端简易实现](https://segmentfault.com/a/1190000020310371#%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%AE%80%E6%98%93%E5%AE%9E%E7%8E%B0)
  - [客户端调试阶段](https://segmentfault.com/a/1190000020310371#%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%B0%83%E8%AF%95%E9%98%B6%E6%AE%B5)
- [问题](https://segmentfault.com/a/1190000020310371#%E9%97%AE%E9%A2%98)
- [总结](https://segmentfault.com/a/1190000020310371#%E6%80%BB%E7%BB%93)
<a name="item-2"></a>
## HMR是什么
`HMR`即`Hot Module Replacement`是指当你对代码修改并保存后，`webpack`将会对代码进行重新打包，并将改动的模块发送到浏览器端，浏览器用新的模块替换掉旧的模块，去实现局部更新页面而非整体刷新页面。接下来将从使用到实现一版简易功能带领大家深入浅出`HMR`。<br />文章首发于[@careteen/webpack-hmr](https://github.com/careteenL/webpack-hmr)，转载请注明来源即可。
<a name="item-2-1"></a>
### 使用场景
![](https://cdn.nlark.com/yuque/0/2020/jpeg/186051/1583939666973-5b57ede4-45d0-4e23-b722-ad85fcc78f1a.jpeg#align=left&display=inline&height=548&originHeight=548&originWidth=800&size=0&status=done&style=none&width=800)<br />如上图所示，一个注册页面包含`用户名`、`密码`、`邮箱`三个必填输入框，以及一个`提交`按钮，当你在调试`邮箱`模块改动了代码时，没做任何处理情况下是会刷新整个页面，频繁的改动代码会浪费你大量时间去重新填写内容。预期是保留`用户名`、`密码`的输入内容，而只替换`邮箱`这一模块。这一诉求就需要借助`webpack-dev-server`的热模块更新功能。<br />相对于`live reload`整体刷新页面的方案，`HMR`的优点在于可以保存应用的状态，提高开发效率。
<a name="item-3"></a>
## 配置使用HMR
<a name="item-3-2"></a>
### 配置webpack
首先借助`webpack`搭建项目

- 初识化项目并导入依赖
```bash
mkdir webpack-hmr && cd webpack-hmr
npm i -y
npm i -S webpack webpack-cli webpack-dev-server html-webpack-plugin
```

- 配置文件`webpack.config.js`
```javascript
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development', // 开发模式不压缩代码，方便调试
  entry: './src/index.js', // 入口文件
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}
```

- 新建`src/index.html`模板文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Webpack Hot Module Replacement</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

- 新建`src/index.js`入口文件编写简单逻辑
```javascript
var root = document.getElementById('root')
function render () {
  root.innerHTML = require('./content.js')
}
render()
```

- 新建依赖文件`src/content.js`导出字符供index渲染页面
```javascript
var ret = 'Hello Webpack Hot Module Replacement'
module.exports = ret
// export default ret
```

- 配置`package.json`
```javascript
"scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack"
  }
```

- 然后`npm run dev`即可启动项目
- 通过`npm run build`打包生成静态资源到`dist`目录

接下来先分析下`dist`目录中的文件
<a name="item-3-3"></a>
### 解析webpack打包后的文件内容

- webpack自己实现的一套commonjs规范讲解
- 区分commonjs和esmodule

dist目录结构
```
.
├── index.html
└── main.js
```
<a name="AsJuz"></a>
#### 其中`index.html`内容如下
```html
<!-- ... -->
<div id="root"></div>
<script type="text/javascript" src="main.js"></script></body>
<!-- ... -->
```
使用`html-webpack-plugin`插件将入口文件及其依赖通过`script`标签引入
<a name="Tf06E"></a>
#### 先对`main.js`内容去掉注释和无关内容进行分析
```javascript
(function (modules) { // webpackBootstrap
  // ...
})
({
  "./src/content.js":
    (function (module, exports) {
      eval("var ret = 'Hello Webpack Hot Module Replacement'\n\nmodule.exports = ret\n// export default ret\n\n");
    }),
  "./src/index.js": (function (module, exports, __webpack_require__) {
    eval("var root = document.getElementById('root')\nfunction render () {\n  root.innerHTML = __webpack_require__(/*! ./content.js */ \"./src/content.js\")\n}\nrender()\n\n\n");
  })
});
```
可见webpack打包后会产出一个自执行函数，其参数为一个对象
```javascript
"./src/content.js": (function (module, exports) {
  eval("...")
}
```
键为入口文件或依赖文件相对于根目录的相对路径，值则是一个函数，其中使用`eval`执行文件的内容字符。

- 再进入自执行函数体内，可见webpack自己实现了一套`commonjs`规范
```javascript
(function (modules) {
  // 模块缓存
  var installedModules = {};
  function __webpack_require__(moduleId) {
    // 判断是否有缓存
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 没有缓存则创建一个模块对象并将其放入缓存
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false, // 是否已加载
      exports: {}
    };
    // 执行模块函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // 将状态置为已加载
    module.l = true;
    // 返回模块对象
    return module.exports;
  }
  // ...
  // 加载入口文件
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
```
如果对上面> `commonjs`规范感兴趣可以前往我的另一篇文章> [手摸手带你实现commonjs规范](https://github.com/careteenL/blog/blob/master/src/20181201-node/module.md)
给出上面代码主要是先对webpack的产出文件混个眼熟，不要惧怕。其实任何一个不管多复杂的事物都是由更小更简单的东西组成，剖开它认识它爱上它。
<a name="item-3-4"></a>
### 配置HMR
接下来配置并感受一下热更新带来的便捷开发<br />`webpack.config.js`配置
```javascript
// ...
  devServer: {
    hot: true
  }
  // ...
```
`./src/index.js`配置
```javascript
// ...
if (module.hot) {
  module.hot.accept(['./content.js'], () => {
    render()
  })
}
```
当更改`./content.js`的内容并保存时，可以看到页面没有刷新，但是内容已经被替换了。<br />这对提高开发效率意义重大。接下来将一层层剖开它，认识它的实现原理。
<a name="item-4"></a>
## HMR原理
![](https://cdn.nlark.com/yuque/0/2020/jpeg/186051/1583939666081-f8da2fc1-bc9b-494d-9376-0c5a4c129876.jpeg#align=left&display=inline&height=1430&originHeight=1430&originWidth=2088&size=0&status=done&style=none&width=2088)<br />如上图所示，右侧`Server`端使用`webpack-dev-server`去启动本地服务，内部实现主要使用了`webpack`、`express`、`websocket`。

- 使用`express`启动本地服务，当浏览器访问资源时对此做响应。
- 服务端和客户端使用`websocket`实现长连接
- `webpack`监听源文件的变化，即当开发者保存文件时触发`webpack`的重新编译。
  - 每次编译都会生成`hash值`、`已改动模块的json文件`、`已改动模块代码的js文件`
  - 编译完成后通过`socket`向客户端推送当前编译的`hash戳`
- 客户端的`websocket`监听到有文件改动推送过来的`hash戳`，会和上一次对比
  - 一致则走缓存
  - 不一致则通过`ajax`和`jsonp`向服务端获取最新资源
- 使用`内存文件系统`去替换有修改的内容实现局部刷新

上图先只看个大概，下面将从服务端和客户端两个方面进行详细分析
<a name="item-5"></a>
## debug服务端源码
![](https://cdn.nlark.com/yuque/0/2020/jpeg/186051/1583939666100-67768253-890b-4e3f-abd3-8b313b9dcd75.jpeg#align=left&display=inline&height=1430&originHeight=1430&originWidth=2088&size=0&status=done&style=none&width=2088)<br />**现在也只需要关注上图的右侧服务端部分，左侧可以暂时忽略。下面步骤主要是debug服务端源码分析其详细思路，也给出了代码所处的具体位置，感兴趣的可以先行定位到下面的代码处设置断点，然后观察数据的变化情况。也可以先跳过阅读此步骤。**

1. 启动`webpack-dev-server`服务器，源代码地址[@webpack-dev-server/webpack-dev-server.js#L173](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/bin/webpack-dev-server.js#L173)
1. 创建webpack实例，源代码地址[@webpack-dev-server/webpack-dev-server.js#L89](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/bin/webpack-dev-server.js#L89)
1. 创建Server服务器，源代码地址[@webpack-dev-server/webpack-dev-server.js#L107](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/bin/webpack-dev-server.js#L107)
1. 添加webpack的done事件回调，源代码地址[@webpack-dev-server/Server.js#L122](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L122)
  1. 编译完成向客户端发送消息，源代码地址[@webpack-dev-server/Server.js#L184](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L184)
5. 创建express应用app，源代码地址[@webpack-dev-server/Server.js#L123](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L123)
5. 设置文件系统为内存文件系统，源代码地址[@webpack-dev-middleware/fs.js#L115](https://github.com/webpack/webpack-dev-middleware/blob/v3.7.0/lib/fs.js#L115)
5. 添加webpack-dev-middleware中间件，源代码地址[@webpack-dev-server/Server.js#L125](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L125)
  1. 中间件负责返回生成的文件，源代码地址[@webpack-dev-middleware/middleware.js#L20](https://github.com/webpack/webpack-dev-middleware/blob/v3.7.0/lib/middleware.js#L20)
8. 启动webpack编译，源代码地址[@webpack-dev-middleware/index.js#L51](https://github.com/webpack/webpack-dev-middleware/blob/v3.7.0/index.js#L51)
8. 创建http服务器并启动服务，源代码地址[@webpack-dev-server/Server.js#L135](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L135)
8. 使用sockjs在浏览器端和服务端之间建立一个 websocket 长连接，源代码地址[@webpack-dev-server/Server.js#L745](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L745)
  1. 创建socket服务器，源代码地址[@webpack-dev-server/SockJSServer.js#L34](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/servers/SockJSServer.js#L34)
<a name="item-5-5"></a>
### 服务端简易实现
上面是我通过debug得出dev-server运行流程比较核心的几个点，下面将其[抽象整合到一个文件中](https://github.com/careteenL/webpack-hmr/blob/master/dev-server.js)。
<a name="2zgyu"></a>
#### 启动webpack-dev-server服务器
先导入所有依赖
```javascript
const path = require('path') // 解析文件路径
const express = require('express') // 启动本地服务
const mime = require('mime') // 获取文件类型 实现一个静态服务器
const webpack = require('webpack') // 读取配置文件进行打包
const MemoryFileSystem = require('memory-fs') // 使用内存文件系统更快，文件生成在内存中而非真实文件
const config = require('./webpack.config') // 获取webpack配置文件
```
<a name="juOkB"></a>
#### 创建webpack实例
```javascript
const compiler = webpack(config)
```
compiler代表整个webpack编译任务，全局只有一个
<a name="zSNHn"></a>
#### 创建Server服务器
```javascript
class Server {
  constructor(compiler) {
    this.compiler = compiler
  }
  listen(port) {
    this.server.listen(port, () => {
      console.log(`服务器已经在${port}端口上启动了`)
    })
  }
}
let server = new Server(compiler)
server.listen(8000)
```
在后面是通过express来当启动服务的
<a name="1u6aE"></a>
#### 添加webpack的done事件回调
```javascript
constructor(compiler) {
    let sockets = []
    let lasthash
    compiler.hooks.done.tap('webpack-dev-server', (stats) => {
      lasthash = stats.hash
      // 每当新一个编译完成后都会向客户端发送消息
      sockets.forEach(socket => {
        socket.emit('hash', stats.hash) // 先向客户端发送最新的hash值
        socket.emit('ok') // 再向客户端发送一个ok
      })
    })
  }
```
`webpack`编译后提供提供了一系列钩子函数，以供插件能访问到它的各个生命周期节点，并对其打包内容做修改。`compiler.hooks.done`则是插件能修改其内容的最后一个节点。<br />编译完成通过`socket`向客户端发送消息，推送每次编译产生的`hash`。另外如果是热更新的话，还会产出二个补丁文件，里面描述了从上一次结果到这一次结果都有哪些chunk和模块发生了变化。<br />使用`let sockets = []`数组去存放当打开了多个Tab时每个Tab的`socket实例`。
<a name="xz9K1"></a>
#### 创建express应用app
```javascript
let app = new express()
```
<a name="szEAX"></a>
#### 设置文件系统为内存文件系统
```javascript
let fs = new MemoryFileSystem()
```
使用`MemoryFileSystem`将`compiler`的产出文件打包到内存中。
<a name="bUYUN"></a>
#### 添加webpack-dev-middleware中间件
```javascript
function middleware(req, res, next) {
    if (req.url === '/favicon.ico') {
      return res.sendStatus(404)
    }
    // /index.html   dist/index.html
    let filename = path.join(config.output.path, req.url.slice(1))
    let stat = fs.statSync(filename)
    if (stat.isFile()) { // 判断是否存在这个文件,如果在的话直接把这个读出来发给浏览器
      let content = fs.readFileSync(filename)
      let contentType = mime.getType(filename)
      res.setHeader('Content-Type', contentType)
      res.statusCode = res.statusCode || 200
      res.send(content)
    } else {
      return res.sendStatus(404)
    }
  }
  app.use(middleware)
```
使用expres启动了本地开发服务后，使用中间件去为其构造一个静态服务器，并使用了内存文件系统，使读取文件后存放到内存中，提高读写效率，最终返回生成的文件。
<a name="Vjj1z"></a>
#### 启动webpack编译
```javascript
compiler.watch({}, err => {
    console.log('又一次编译任务成功完成了')
  })
```
以监控的模式启动一次webpack编译，当编译成功之后执行回调
<a name="CLwCf"></a>
#### 创建http服务器并启动服务
```javascript
constructor(compiler) {
    // ...
    this.server = require('http').createServer(app)
    // ...
  }
  listen(port) {
    this.server.listen(port, () => {
      console.log(`服务器已经在${port}端口上启动了`)
    })
  }
```
<a name="2ghPp"></a>
#### 使用sockjs在浏览器端和服务端之间建立一个 websocket 长连接
```javascript
constructor(compiler) {
    // ...
    this.server = require('http').createServer(app)
    let io = require('socket.io')(this.server)
    io.on('connection', (socket) => {
      sockets.push(socket)
      socket.emit('hash', lastHash)
      socket.emit('ok')
    })
  }
```
启动一个 websocket服务器，然后等待连接来到，连接到来之后存进sockets池<br />当有文件改动，webpack重新编译时，向客户端推送`hash`和`ok`两个事件
<a name="item-5-6"></a>
### 服务端调试阶段
感兴趣的可以根据上面[debug服务端源码](https://segmentfault.com/a/1190000020310371#debug%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%BA%90%E7%A0%81)所带的源码位置，并在浏览器的调试模式下设置断点查看每个阶段的值。
```bash
node dev-server.js
```
使用我们自己编译的`dev-server.js`启动服务，可看到页面可以正常展示，但还没有实现热更新。<br />下面将调式客户端的源代码分析其实现流程。
<a name="item-6"></a>
## debug客户端源码
![](https://cdn.nlark.com/yuque/0/2020/jpeg/186051/1583939666119-c372f841-c5ce-41ac-835c-ec0dbaa8031c.jpeg#align=left&display=inline&height=1430&originHeight=1430&originWidth=2088&size=0&status=done&style=none&width=2088)<br />**现在也只需要关注上图的左侧客户端部分，右侧可以暂时忽略。下面步骤主要是debug客户端源码分析其详细思路，也给出了代码所处的具体位置，感兴趣的可以先行定位到下面的代码处设置断点，然后观察数据的变化情况。也可以先跳过阅读此步骤。**<br />debug客户端源码分析其详细思路

1. webpack-dev-server/client端会监听到此hash消息，源代码地址[@webpack-dev-server/index.js#L54](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/index.js#L54)
1. 客户端收到ok的消息后会执行reloadApp方法进行更新，源代码地址[index.js#L101](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/index.js#L101)
1. 在reloadApp中会进行判断，是否支持热更新，如果支持的话发射webpackHotUpdate事件，如果不支持则直接刷新浏览器，源代码地址[reloadApp.js#L7](https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/utils/reloadApp.js#L7)
1. 在webpack/hot/dev-server.js会监听webpackHotUpdate事件，源代码地址[dev-server.js#L55](https://github.com/webpack/webpack/blob/v4.39.1/hot/dev-server.js#L55)
1. 在check方法里会调用module.hot.check方法，源代码地址[dev-server.js#L13](https://github.com/webpack/webpack/blob/v4.39.1/hot/dev-server.js#L13)
1. HotModuleReplacement.runtime请求Manifest，源代码地址[HotModuleReplacement.runtime.js#L180](https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L180)
1. 它通过调用 JsonpMainTemplate.runtime的hotDownloadManifest方法，源代码地址[JsonpMainTemplate.runtime.js#L23](https://github.com/webpack/webpack/blob/v4.39.1/lib/web/JsonpMainTemplate.runtime.js#L23)
1. 调用JsonpMainTemplate.runtime的hotDownloadUpdateChunk方法通过JSONP请求获取到最新的模块代码，源代码地址[JsonpMainTemplate.runtime.js#L14](https://github.com/webpack/webpack/blob/v4.39.1/lib/web/JsonpMainTemplate.runtime.js#L14)
1. 补丁JS取回来后会调用JsonpMainTemplate.runtime.js的webpackHotUpdate方法，源代码地址[JsonpMainTemplate.runtime.js#L8](https://github.com/webpack/webpack/blob/v4.39.1/lib/web/JsonpMainTemplate.runtime.js#L8)
1. 然后会调用HotModuleReplacement.runtime.js的hotAddUpdateChunk方法动态更新模块代码，源代码地址[HotModuleReplacement.runtime.js#L222](https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L222)
1. 然后调用hotApply方法进行热更新，源代码地址[HotModuleReplacement.runtime.js#L257](https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L257)、[HotModuleReplacement.runtime.js#L278](https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L278)
<a name="item-6-7"></a>
### 客户端简易实现
上面是我通过debug得出dev-server运行流程比较核心的几个点，下面将其[抽象整合成一个文件](https://github.com/careteenL/webpack-hmr/blob/master/src/client.js)。
<a name="NUr0h"></a>
#### webpack-dev-server/client端会监听到此hash消息
在开发客户端功能之前，需要在`src/index.html`中引入`socket.io`
```html
<script src="/socket.io/socket.io.js"></script>
```
下面连接socket并接受消息
```javascript
let socket = io('/')
socket.on('connect', onConnected)
const onConnected = () => {
  console.log('客户端连接成功')
}
let hotCurrentHash // lastHash 上一次 hash值 
let currentHash // 这一次的hash值
socket.on('hash', (hash) => {
  currentHash = hash
})
```
将服务端webpack每次编译所产生`hash`进行缓存
<a name="uvtiH"></a>
#### 客户端收到ok的消息后会执行reloadApp方法进行更新
```javascript
socket.on('ok', () => {
  reloadApp(true)
})
```
<a name="ZbSqA"></a>
#### reloadApp中判断是否支持热更新
```javascript
// 当收到ok事件后，会重新刷新app
function reloadApp(hot) {
  if (hot) { // 如果hot为true 走热更新的逻辑
    hotEmitter.emit('webpackHotUpdate')
  } else { // 如果不支持热更新，则直接重新加载
    window.location.reload()
  }
}
```
在reloadApp中会进行判断，是否支持热更新，如果支持的话发射webpackHotUpdate事件，如果不支持则直接刷新浏览器。
<a name="KZYCi"></a>
#### 在webpack/hot/dev-server.js会监听webpackHotUpdate事件
首先需要一个发布订阅去绑定事件并在合适的时机触发。
```javascript
class Emitter {
  constructor() {
    this.listeners = {}
  }
  on(type, listener) {
    this.listeners[type] = listener
  }
  emit(type) {
    this.listeners[type] && this.listeners[type]()
  }
}
let hotEmitter = new Emitter()
hotEmitter.on('webpackHotUpdate', () => {
  if (!hotCurrentHash || hotCurrentHash == currentHash) {
    return hotCurrentHash = currentHash
  }
  hotCheck()
})
```
会判断是否为第一次进入页面和代码是否有更新。
上面的发布订阅较为简单，且只支持先发布后订阅功能。对于一些较为复杂的场景可能需要先订阅后发布，此时可以移步> [@careteen/event-emitter](https://github.com/careteenL/event-emitter)。其实现原理也挺简单，需要维护一个离线事件栈存放还没发布就订阅的事件，等到订阅时可以取出所有事件执行。
<a name="IOT6r"></a>
#### 在check方法里会调用module.hot.check方法
```javascript
function hotCheck() {
  hotDownloadManifest().then(update => {
    let chunkIds = Object.keys(update.c)
    chunkIds.forEach(chunkId => {
      hotDownloadUpdateChunk(chunkId)
    })
  })
}
```
上面也提到过webpack每次编译都会产生`hash值`、`已改动模块的json文件`、`已改动模块代码的js文件`，<br />此时先使用`ajax`请求`Manifest`即服务器这一次编译相对于上一次编译改变了哪些module和chunk。<br />然后再通过`jsonp`获取这些已改动的module和chunk的代码。
<a name="vjb3D"></a>
#### 调用hotDownloadManifest方法
```javascript
function hotDownloadManifest() {
  return new Promise(function (resolve) {
    let request = new XMLHttpRequest()
    //hot-update.json文件里存放着从上一次编译到这一次编译 取到差异
    let requestPath = '/' + hotCurrentHash + ".hot-update.json"
    request.open('GET', requestPath, true)
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        let update = JSON.parse(request.responseText)
        resolve(update)
      }
    }
    request.send()
  })
}
```
<a name="ndg3N"></a>
#### 调用hotDownloadUpdateChunk方法通过JSONP请求获取到最新的模块代码
```javascript
function hotDownloadUpdateChunk(chunkId) {
  let script = document.createElement('script')
  script.charset = 'utf-8'
  // /main.xxxx.hot-update.js
  script.src = '/' + chunkId + "." + hotCurrentHash + ".hot-update.js"
  document.head.appendChild(script)
}
```
这里解释下为什么使用`JSONP`获取而不直接利用`socket`获取最新代码？主要是因为`JSONP`获取的代码可以直接执行。
<a name="ztLF2"></a>
#### 调用webpackHotUpdate方法
当客户端把最新的代码拉到浏览之后
```javascript
window.webpackHotUpdate = function (chunkId, moreModules) {
  // 循环新拉来的模块
  for (let moduleId in moreModules) {
    // 从模块缓存中取到老的模块定义
    let oldModule = __webpack_require__.c[moduleId]
    // parents哪些模块引用这个模块 children这个模块引用了哪些模块
    // parents=['./src/index.js']
    let {
      parents,
      children
    } = oldModule
    // 更新缓存为最新代码 缓存进行更新
    let module = __webpack_require__.c[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
      parents,
      children,
      hot: window.hotCreateModule(moduleId)
    }
    moreModules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
    module.l = true // 状态变为加载就是给module.exports 赋值了
    parents.forEach(parent => {
      // parents=['./src/index.js']
      let parentModule = __webpack_require__.c[parent]
      // _acceptedDependencies={'./src/title.js',render}
      parentModule && parentModule.hot && parentModule.hot._acceptedDependencies[moduleId] && parentModule.hot._acceptedDependencies[moduleId]()
    })
    hotCurrentHash = currentHash
  }
}
```
<a name="nMRoh"></a>
#### hotCreateModule的实现
实现我们可以在业务代码中定义需要热更新的模块以及回调函数，将其存放在`hot._acceptedDependencies`中。
```javascript
window.hotCreateModule = function () {
  let hot = {
    _acceptedDependencies: {},
    dispose() {
      // 销毁老的元素
    },
    accept: function (deps, callback) {
      for (let i = 0; i < deps.length; i++) {
        // hot._acceptedDependencies={'./title': render}
        hot._acceptedDependencies[deps[i]] = callback
      }
    }
  }
  return hot
}
```
然后在`webpackHotUpdate`中进行调用
```javascript
parents.forEach(parent => {
      // parents=['./src/index.js']
      let parentModule = __webpack_require__.c[parent]
      // _acceptedDependencies={'./src/title.js',render}
      parentModule && parentModule.hot && parentModule.hot._acceptedDependencies[moduleId] && parentModule.hot._acceptedDependencies[moduleId]()
    })
```
最后调用hotApply方法进行热更新
<a name="item-6-8"></a>
### 客户端调试阶段
经过上述实现了一个基本版的HMR，可更改代码保存的同时查看浏览器并非整体刷新，而是局部更新代码进而更新视图。在涉及到大量表单的需求时大大提高了开发效率。
<a name="item-7"></a>
## 问题

- 如何实现commonjs规范？
感兴趣的可前往> [debug CommonJs规范](https://github.com/careteenL/blog/blob/master/src/20181201-node/module.md)了解其实现原理。

- webpack实现流程以及各个生命周期的作用是什么？
webpack主要借助了> `tapable`这个库所提供的一系列同步/异步钩子函数贯穿整个生命周期。> ![](https://cdn.nlark.com/yuque/0/2020/jpeg/186051/1583939666129-b464ba02-d967-42db-a140-2b8321df9985.jpeg#align=left&display=inline&height=4244&originHeight=4244&originWidth=4436&size=0&status=done&style=none&width=4436)基于此我实现了一版简易的> [webpack](https://github.com/careteenL/webpack)，源码100+行，食用时伴着注释很容易消化，感兴趣的可前往看个思路。

- 发布订阅的使用和实现，并且如何实现一个可先订阅后发布的机制？
上面也提到需要使用到发布订阅模式，且只支持先发布后订阅功能。对于一些较为复杂的场景可能需要先订阅后发布，此时可以移步> [@careteen/event-emitter](https://github.com/careteenL/event-emitter)。其实现原理也挺简单，需要维护一个离线事件栈存放还没发布就订阅的事件，等到订阅时可以取出所有事件执行。

- 为什么使用JSONP而不用socke通信获取更新过的代码？
因为通过socket通信获取的是一串字符串需要再做处理。而通过> `JSONP`获取的代码可以直接执行。
<a name="item-7-9"></a>
### 引用

- 珠峰架构课
- [模块热替换 - webpack官网](https://webpack.docschina.org/api/hot-module-replacement/#src/components/Sidebar/Sidebar.jsx)
