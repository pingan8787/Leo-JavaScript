> [阅读原文](https://mp.weixin.qq.com/s/t9qWv_-DZK8mVfa-T0AFWQ)


## 一、打包多页面应用

所谓打包多页面，就是同时打包出多个 html 页面，打包多页面也是使用 `html-webpack-plugin`，只不过，在引入插件的时候是创建多个插件对象，因为一个 `html-webpack-plugin` 插件对象只能打包出一个 html 页面。如:

```js
module.exports = {
    entry: {
        index: "./src/index.js", // 指定打包输出的chunk名为index
        foo: "./src/foo.js" // 指定打包输出的chunk名为foo
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // 要打包输出哪个文件，可以使用相对路径
            filename: "index.html", // 打包输出后该html文件的名称
            chunks: ["index"] // 数组元素为chunk名称，即entry属性值为对象的时候指定的名称，index页面只引入index.js
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html", // 要打包输出哪个文件，可以使用相对路径
            filename: "foo.html", // 打包输出后该html文件的名称
            chunks: ["foo"] // 数组元素为chunk名称，即entry属性值为对象的时候指定的名称，foo页面只引入foo.js
        }),
    ]
}
```

打包多页面时，关键在于 `chunks` 属性的配置，因为在没有配置 `chunks` 属性的情况下，打包输出的 `index.html` 和 `foo.html` 都会同时引入 `index.js` 和` foo.js`。

所以必须配置 `chunks` 属性，来指定打包输出后的 html 文件中要引入的输出模块，数组的元素为 `entry` 属性值为对象的时候指定的 `chunk` 名，如上配置，才能实现，`index.html` 只引入 `index.js`，`foo.html` 只引入 `foo.js` 文件


## 二、配置 source-map

source-map 就是源码映射，主要是为了方便代码调试，因为我们打包上线后的代码会被压缩等处理，导致所有代码都被压缩成了一行，如果代码中出现错误，那么浏览器只会提示出错位置在第一行，这样我们无法真正知道出错地方在源码中的具体位置。webpack 提供了一个 devtool 属性来配置源码映射。

```js
let foo = 1;
console.lg(`console对象的方法名log写成了lg`); // 源文件第二行出错

index.js:1 Uncaught TypeError: console.lg is not a function
    at Object.<anonymous> (index.js:1)
    at o (index.js:1)
    at Object.<anonymous> (index.js:1)
    at o (index.js:1)
    at index.js:1
    at index.js:1
```

源码中出错的位置明明是第二行代码，而浏览器中提示的错误确实在第一行，所以如果代码很复杂的情况下，我们就无法找到出错的具体位置

`devtool` 常见的有 6 种配置:

* 1、source-map:

这种模式会产生一个 .map 文件，出错了会提示具体的行和列，文件里面保留了打包后的文件与原始文件之间的映射关系，打包输出文件中会指向生成的 `.map` 文件，告诉 js 引擎源码在哪里，由于源码与 .map 文件分离，所以需要浏览器发送请求去获取 .map 文件,常用于生产环境，如:

```js
//# sourceMappingURL=index.js.map
```

* 2、eval: 

这种模式打包速度最快，不会生成 `.map `文件，会使用 `eval `将模块包裹，在末尾加入 `sourceURL `，常用于开发环境，如:

```
//# sourceURL=webpack:///./src/index.js
```

* 3、eval-source-map: 

每个 module 会通过 `eval()` 来执行，并且生成一个 DataUrl 形式的 `SourceMap` (即 base64 编码形式内嵌到 eval 语句末尾), 但是不会生成 `.map` 文件，可以减少网络请求*，但是打包文件会非常大*。

```js
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6WyJmb28iLCJjb25zb2xlIiwibGciXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLEdBQUcsR0FBRyxDQUFWO0FBQ0FDLE9BQU8sQ0FBQ0MsRUFBUix1RSxDQUFxQyIsImZpbGUiOiIuL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBmb28gPSAxO1xuY29uc29sZS5sZyhgY29uc29sZeWvueixoeeahOaWueazleWQjWxvZ+WGmeaIkOS6hmxnYCk7IC8vIOa6kOaWh+S7tuesrOS6jOihjOWHuumUmVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=webpack-internal:///./src/index.js
```

* 4、cheap-source-map:

 加上 cheap，就只会提示到第几行报错，少了列信息提示，同时不会对引入的库做映射，可以提高打包性能，但是会产生 `.map` 文件。

* 5、cheap-module-source-map: 

和 cheap-source-map 相比，加上了 module，就会对引入的库做映射，并且也会产生 `.map` 文件，用于生产环境。

* 6、cheap-module-eval-source-map: 

常用于开发环境，使用 `cheap` 模式可以大幅提高 `souremap` 生成的效率，加上 module 同时会对引入的库做映射，eval 提高打包构建速度，并且不会产生 .map 文件减少网络请求。

凡是带 eval 的模式都不能用于生产环境，因为其不会产生 .map 文件，会导致打包后的文件变得非常大。通常我们并不关心列信息，所以都会使用 cheap 模式，但是我们也还是需要对第三方库做映射，以便精准找到错误的位置。

## 三、watch 和 watchOptions 配置

webpack 可以**监听文件变化**，当它们修改后会重新编译，如果需要开启该功能，那么需要将 `watch` 设置为 `true`，具体监听配置通过 `watchOptions` 进行相应的设置。

```js
module.exports = {
    watch: true,
    watchOptions: {
        poll: 1000, // 每隔一秒轮询一次文件是否发生变化
        aggregateTimeout: 1000, // 当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里
        ignored: /node_modules/ // 排除一些文件的监听
    }
}
```

## 四、三个常见小插件的使用

* 1、clean-webpack-plugin: 

其作用就是每次打包前先先将输出目录中的内容进行清空，然后再将打包输出的文件输出到输出目录中。

```js
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    plugins: [
        new CleanWebpackPlugin() // 打包前清空输出目录
    ]
}
```

需要注意的是，`require("clean-webpack-plugin)` 的结果是一个对象而不是类，这个对象中的 `CleanWebpackPlugin` 属性才是一个类，我们就是用这个类去创建插件对象。

* 2、copy-webpack-plugin: 

其作用就是打包的时候带上一些 `readMe.md`、`history.md` 等等一起输出到输出目录中。

```js
module.exports = {
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "./readMe.md", // 将项目根目录下的readMe.md文件一起拷贝到输出目录中
                to: "" // 属性值为空字符串则表示是输出目录
            }
        ])
    ]
}
111

* 3、BannerPlugin: 

其作用就是在打包输出的 js 文件的头部添加一些文字注释，比如版权说明等等，`BannerPlugin` 是 `webpack` 内置的插件，如:

```js
module.exports = {
    plugins: [
        new webpack.BannerPlugin("Copyright © 2019") // 在js文件头部添加版权说明
    ]
}
```

## 五、webpack 跨域问题

为什么 webpack 会存在跨域问题？因为 webpack 打包的是前端代码，其最终会被部署到前端服务器上，而前后端代码通常部署在不同的服务器上，即使是部署在同一个服务器上，所使用的端口也是不一样的，当前端代码通过 ajax 等手段向后端服务器获取数据的时候，由于前后端代码不在同一个域中，故存在跨域问题。



比如，我们通过 `webpack` 的 `devServer` 来运行部署我们的前端应用代码，`devServer` 启动在 `8080` 端口上，而前端应用代码中会通过 ajax 请求后端数据，后端服务器启动在 `3000` 端口上。

```js
// index.js

const xhr = new XMLHttpRequest();
// xhr.open("get", "http://localhost:3000/api/test"); // 由于跨域问题无法直接访问到http://localhost:3000下的资源
xhr.open("get", "/api/test"); // 本来是要访问http://localhost:3000/api/test
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        console.log(xhr.responseText);
    }
}
xhr.send();
```

由于前端代码是运行在浏览器中的，如果在前端代码中直接通过 ajax 向`http://localhost:3000/api/test` 发起请求获取数据，那么由于浏览器同源策略的影响，会存在跨域的问题，所以必须访问 `/api/test`。但是这样访问又会出现 404 问题，因为其实访问的是 `http://localhost:8080/api/test`，`8080` 服务器上是没有该资源的，解决办法就是通过 devServer 配置一个代理服务器

```js
module.exports = {
    devServer: {
        proxy: {
            "/api": "http://localhost:3000" // 路径以/api开头则代理到localhost:3000上
        }
    }
}
```

访问 `http://localhost:8080/api/test `

就会被代理到http://localhost:3000/api/test 上，proxy 还支持路径的重写，如果 3000 端口服务器上并没有 /api/test 路径，只有 /test 路径，那么就可以对路径进行重写，将 /api 替换掉

```js
module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {"/api": ""} // 将/api替换掉
            }
        }
    }
}
````

访问 `http://localhost:8080/api/test `

就会被代理到 `http://localhost:3000/test` 上



如果前端只是想 `mock` 一些数据，并不需要真正的去访问后台服务器，那么我们可以通过 `devServer` 提供的 `before` 钩子函数获取到内置的服务器对象进行处理请求，这个内置的服务器对象就是 webpack 的 `devServer` 即 `8080` 端口的 `server`，因为是在同一个服务器中请求数据所以也不会出现跨域问题。


```js
before(app) { // 此app即webpack的devServer
            app.get("/api/test", (req, res, next) => {
                res.json({name: "even"});
            })
        }
```

我们还可以不通过 `webpack` 提供的 `devServer` 来启动 `webpack`，而是使用自己服务器来启动 `webapck。`

```js
const express = require("express");
const app = express();
const webpack = require("webpack"); // 引入webpack
const config = require("./webpack.config.js"); // 引入配置文件
const compiler = webpack(config); // 创建webpack的编译器
const middleWare = require("webpack-dev-middleware"); //引入webpack的中间件
app.use(middleWare(compiler)); // 将compiler编译器交给中间件处理
app.get("/api/test", (req, res, next) => {
    res.json({name: "lhb"});
});
app.listen(3000);
```

通过自定义服务器启动 webpack，这样 webpack 中的前端代码请求数据就和服务器的资源在同一个域中了。

## 六、resolve 配置

`resolve` 用于配置模块的解析相关参数的，其属性值为一个对象。

* 1、modules: 

告诉 webpack 解析模块时应该搜索的目录，即 `require` 或 `import` 模块的时候，只写模块名的时候，到哪里去找，其属性值为数组，因为可配置多个模块搜索路径，其搜索路径必须为绝对路径，比如，`src` 目录下面有一个 `foo.js` 文件和 `index.js` 文件:

```js
// index.js

const foo = require("./foo"); // 必须写全foo.js模块的路径
// const foo = require("foo"); // resolve.modules中配置了模块解析路径为.src目录，则可用只写foo即可搜索到foo.js模块
console.log(foo);

module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, "./src/"), "node_modules"]
    },
}
```

由于 `resolve.modules` 中配置了` ./src` 目录作为模块的搜索目录，所以 `index.js` 中可以只写模块名即可搜索到` foo.js` 模块

* 2、alias: 

用于给路径或者文件取别名，当 `import` 或者 `require` 的模块的路径非常长时，我们可以给该模块的路径或者整个路径名+文件名都设置成一个别名，然后直接引入别名即可找到该模块，比如，有一个模块位置非常深

```js
// const foo = require("./a/b/c/foo"); // foo.js在./src/a/b/c/foo.js
// const foo = require("foo"); // foo被映射成了./src/a/b/c/foo.js文件
const foo = require("bar/foo.js"); // bar被映射成了./src/a/b/c/路径
console.log(foo);


module.exports = {
    resolve: {
        alias: {
            "foo": path.resolve(__dirname, "./src/a/b/c/foo.js"),
            "bar": path.resolve(__dirname, "./src/a/b/c/")
        }
    },
}
```


需要注意的就是，`alias` 可以映射文件也可以映射路径


* 3、mainFields: 

我们的 `package.json` 中可以有多个字段，用于决定优先使用哪个字段来导入模块，比如 `bootstrap` 模块中含有 js 也含有 css，其 `package.json `文件中 main 字段对应的是"`dist/js/bootstrap`"，style 字段中对应的是"`dist/css/bootstrap.css`",我们可以通过设置 `mainFields` 字段来改变默认引入，如:

```js
module.exports = {
    resolve: {
        mainFields: ["style", "main"]
    },
}
```

* 4、extensions: 

用于设置引入模块的时候，如果没有写模块后缀名，webpack 会自动添加后缀去查找，`extensions `就是用于设置自动添加后缀的顺序，如:

```js
module.exports = {
    resolve: {
        extensions: ["js", "vue"]
    },
}
```

如果项目中引入了 foo 模块，`require("./foo")`,其会优先找 `./foo.js`, 如果没有找到 `./foo.js` 则会去找 `./foo.vue` 文件

## 七、设置环境变量

设置环境变量需要用到 webpack 提供的一个内置插件 `DefinePlugin` 插件，其作用是将一个字符串值设置为全局变量，如:

```js
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            DEV_MODE: JSON.stringify('development') // 将'development'设置为全局变量DEV_MODE
        }),
    ]
}
```

这样配置之后任何一个模块中都可以直接使用 `DEV_MODE` 变量了，并且其值为'`development`',与 `ProvidePlugin` 有点相似，`ProvidePlugin `是将一个模块注入到所有模块中，实现模块不需要引入即可直接使用。

## 八、webpack 优化

* 1、noParse: 

该配置是作为 module 的一个属性值，即不解析某些模块，所谓不解析，就是不去分析某个模块中的依赖关系，即不去管某个文件是否 import(依赖)了某个文件，对于一些独立的库，比如 jquery，其根本不存在依赖关系，jquery 不会去引入其他的库(要根据自己对某个模块的了解去判断是否要解析该模块)，所以我们可以让 webpack 不去解析 jquery 的依赖关系，提高打包速度，如:

```js
module.exports = {
    module: {
        noParse:/jquery/,//不去解析jquery中的依赖库
    }
}
```

`noParse` 是 `module` 配置中的一个属性，其属性值为一个正则表达式，填入不被解析的模块名称。


为了更清楚的展示 `noParse` 的作用，假设我们在入口文件 `index.js` 中引入 `bar.js` 模块，同时这个 `bar.js` 模块中也引入了 `foo.js` 模块，`foo.js` 不再依赖其他模块了，那么在不使用 `noParse` 的情况下，webpack 打包的时候，会先去分析 `index.js` 模块，发现其引入了 `bar.js` 模块，然后接着分析 `bar.js` 模块，发现其引入了 `foo.js` 模块，接着分析 `foo.js` 模块。

```shell
Entrypoint index = index.js
[./src/bar.js] 55 bytes {index} [built]
[./src/foo.js] 21 bytes {index} [built]
[./src/index.js] 81 bytes {index} [built]
```

而此时如果使用了 `noParse: /bar/`，那么 webpack 打包的时候，会先去分析 `index.js` 模块，发现其引入了 `bar.js` 模块，但是由于 `noParse` 的作用，将不再继续解析 `bar.js` 模块了，即不会去分析 `bar.js` 中引入的 `foo.js` 模块了。

```shell
Entrypoint index = index.js
[./src/bar.js] 55 bytes {index} [built]
[./src/index.js] 81 bytes {index} [built]
```
* 2、exclude: 

在 `loader` 中使用 `exclude` 排除对某些目录中的文件处理，即引入指定目录下的文件时候，不使用对应的 `loader` 进行处理，`exclude` 是 `loader `配置中的一个属性，属性值为正则表达式，如:

```js
module.exports = {
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: ["@babel/plugin-transform-runtime"]
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    }
}
```

* 3、使用 IgnorePlugin 

来忽略某个模块中某些目录中的模块引用，比如在引入某个模块的时候，该模块会引入大量的语言包，而我们不会用到那么多语言包，如果都打包进项目中，那么就会影响打包速度和最终包的大小，然后再引入需要使用的语言包即可，如:

项目根目录下有一个 time 包，其中有一个 lang 包，lang 包中包含了各种语言输出对应时间的 js 文件，time 包下的 index.js 会引入 lang 包下所有的 js 文件，那么当我们引入 time 模块的时候，就会将 lang 包下的所有 js 文件都打包进去，添加如下配置:

```js
const webpack = require("webpack");
module.exports = {
    plugins: [
        new webpack.IgnorePlugin(/lang/, /time/)
    ]
}
```

引入 time 模块的时候，如果 time 模块中引入了其中的 lang 模块中的内容，那么就忽略掉，即不引入 lang 模块中的内容，需要注意的是，这 `/time/ `只是匹配文件夹和 time 模块的具体目录位置无关，即只要是引入了目录名为 time 中的内容就会生效。

* 4、使用 HappyPack：

由于在打包过程中有大量的文件需要交个 loader 进行处理，包括解析和转换等操作，而由于 js 是单线程的，所以这些文件只能一个一个地处理，而 HappyPack 的工作原理就是充分发挥 CPU 的多核功能，将任务分解给多个子进程去并发执行，子进程处理完后再将结果发送给主进程，happypack 主要起到一个任务劫持的作用，在创建 HappyPack 实例的时候要传入对应文件的 loader，即 use 部分，loader 配置中将使用经过 HappyPack 包装后的 loader 进行处理，如:

```js
const HappyPack = require("happypack"); // 安装并引入happypack模块
module.exports = {
    plugins: [
        new HappyPack({ // 这里对处理css文件的loader进行包装
            id: "css",// 之前的loader根据具体的id进行引入
            use: ["style-loader","css-loader"],
            threads: 5 // 设置开启的进程数
        })
    ],
    module: {
        rules: [
            {
                test: /.css$/, // 匹配以.css结尾的文件
                use: ["happypack/loader?id=css"] //根据happypack实例中配置的id引入包装后的laoder，这里的happyPack的h可以大写也可以小写
            }
        ]
    }
}
```

webpack 要打包的文件非常多的时候才需要使用 happypack 进行优化，因为开启多进程也是需要耗时间的，所以文件少的时候，使用 happypack 返回更耗时


* 5、抽离公共模块: 

对于多入口情况，如果某个或某些模块，被两个以上文件所依赖，那么可以将这个模块单独抽离出来，不需要将这些公共的代码都打包进每个输出文件中，这样会造成代码的重复和流量的浪费，即如果有两个入口文件 index.js 和 other.js，它们都依赖了 foo.js，那么如果不抽离公共模块，那么 foo.js 中的代码都会打包进最终输出的 index.js 和 other.js 中去，即有两份 foo.js 了。抽离公共模块也很简单，直接在 optimization 中配置即可，如:

```js
module.exports = {
     splitChunks: { // 分割代码块，即抽离公共模块
         cacheGroups: { // 缓存组
             common: { // 组名为common可自定义
                    chunks: "initial",
                    minSize: 0, // 文件大小为0字节以上才抽离
                    minChunks: 2, // 被引用过两次才抽离
                    name: "common/foo", // 定义抽离出的文件的名称
             }
         }
     }
}
```

这样就会将公共的 foo.js 模块抽离到 common 目录下 foo.js 中了，但是如果我们也有多个文件依赖了第三方模块如 jquery，如果按以上配置，那么 jquery 也会被打包进 foo.js 中，会导致代码混乱，所以我们希望将 jquery 单独抽出来，即与 foo.js 分开，我们可以复制一份以上配置，并通过设置抽离代码权重的方式来实现，即优先抽离出 jquery，如:

```js
module.exports = {
     splitChunks: { // 分割代码块，即抽离公共模块
         cacheGroups: { // 缓存组
             common: { // 组名为common可自定义
                    chunks: "initial",
                    minSize: 0, // 文件大小为0字节以上才抽离
                    minChunks: 2, // 被引用过两次才抽离
                    name: "common/foo", // 定义抽离出的文件的名称
             },
             verdor: {
                    test: /node_modules/,
                    priority: 1, // 设置打包权重，即优先抽离第三方模块
                    chunks: "initial",
                    minSize: 0, // 文件大小为0字节以上才抽离
                    minChunks: 2, // 被引用过两次才抽离
                    name: "common/jquery", // 定义抽离出的文件的名称
                }
         }
     }
}
```

这样就会在 common 目录下同时抽离出 foo.js 和 jquery.js 了，需要注意的是，代码的抽离必须是该模块没有被排除打包，即该模块会被打包进输出 bundle 中，如果第三方模块已经通过 externals 排除打包，则以上 vendor 配置无效。

* 6、按需加载，

即在需要使用的时候才打包输出，webpack 提供了 import() 方法，传入要动态加载的模块，来动态加载指定的模块，当 webpack 遇到 import()语句的时候，不会立即去加载该模块，而是在用到该模块的时候，再去加载，也就是说打包的时候会一起打包出来，但是在浏览器中加载的时候并不会立即加载，而是等到用到的时候再去加载，比如，点击按钮后才会加载某个模块，如:

```js
const button = document.createElement("button");
button.innerText = "点我"
button.addEventListener("click", () => { // 点击按钮后加载foo.js
    import("./foo").then((res) => { // import()返回的是一个Promise对象
        console.log(res);
    });
});
document.body.appendChild(button);
```

从中可以看到，`import()` 返回的是一个 `Promise` 对象，其主要就是利用 JSONP 实现动态加载，返回的 `res` 结果不同的` export` 方式会有不同，如果使用的 `module.exports` 输出，那么返回的` res` 就是 `module.exports` 输出的结果；如果使用的是 ES6 模块输出，即 `export default` 输出，那么返回的 res 结果就是 `res.default`，如:


// ES6模块输出，res结果为

```js
{default: "foo", __esModule: true, Symbol(Symbol.toStringTag): "Module"}
```

* 7、开启模块热更新: 

模块热更新可以做到在不刷新网页的情况下，更新修改的模块，只编译变化的模块，而不用全部模块重新打包，大大提高开发效率，在未开启热更新的情况下，每次修改了模块，都会重新打包。

要开启模块热更新，那么只需要在 devServer 配置中添加 hot:true 即可。当然仅仅开启模块热更新是不够的，我们需要做一些类似监听的操作，当监听的模块发生变化的时候，重新加载该模块并执行，如:

```js
module.exports = {
    devServer: {
        hot: true // 开启热更新
    }
}
----------


import foo from "./foo";
console.log(foo);
if (module.hot) {
    module.hot.accept("./foo", () => { // 监听到foo模块发生变化的时候
        const foo =  require("./foo"); // 重新引入该模块并执行
        console.log(foo);
    });
}
```

如果不使用 `module.hot.accept` 监听，那么当修改 foo 模块的时候还是会刷新页面的。

