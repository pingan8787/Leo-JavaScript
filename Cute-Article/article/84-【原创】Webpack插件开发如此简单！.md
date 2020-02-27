> 本文使用的[**Webpack-Quickly-Starter**](https://github.com/pingan8787/Webpack-Quickly-Starter)快速搭建 Webpack4 本地学习环境。  
> 建议多阅读 Webpack 文档《[**Writing a Plugin**](https://webpack.js.org/contribute/writing-a-plugin/)》章节，学习开发简单插件。


本文将带你一起开发你的第一个 Webpack 插件，从 Webpack 配置工程师，迈向 Webpack 开发工程师！<br />做自己的轮子，让别人用去吧。

完整代码存放在：[https://github.com/pingan8787/script-timestamp-webpack-plugin](https://github.com/pingan8787/script-timestamp-webpack-plugin)

![](https://user-gold-cdn.xitu.io/2020/2/24/1707463e4ec11bce?w=800&h=400&f=png&s=30184)

## 一、背景介绍
本文灵感源自业务中的经验总结，**不怕神一样的产品，只怕一根筋的开发**。

在项目打包遇到问题：“当项目托管到 CDN 平台，希望实现项目中的 index.js 不被缓存”。因为我们需要修改 `index.js` 中的内容，不想用户被缓存。

思考一阵，有这么几种思路：

1. 在 CDN 平台中过滤该文件的缓存设置；
1. 查找 DOM 元素，修改该 `script` 标签的 `src` 值，并添加时时间戳；
1. 打包时动态创建 `script` 标签引入文件，并添加时时间戳。

（聪明的你还有其他方法，欢迎讨论）

思路分析：

1. 显然修改 CDN 设置的话，治标不治本；
1. 在模版文件中，添加 `script` 标签，执行获取 Webpack 自动添加的 `script` 标签并为其 `src` 值添加时间戳。但事实是还没等你修改完， js 文件已经加载完毕，所以放弃
1. 需要在 `index.html` 生成之前，修改 js 文件的路径，并添加时间戳。

于是我准备使用第三种方式，在 `index.html` 生成之前完成下面修改：<br />![image.png](https://user-gold-cdn.xitu.io/2020/2/24/170745f867efcd61?w=951&h=328&f=png&s=86717)

问题简单，实际还是想试试开发 Webpack Plugin。

## 二、基础知识
Webpack 使用阶段式的构建回调，开发者可以引入它们自己的行为到 Webpack 构建流程中。<br />在开发之前，需要了解以下 Webpack 相关概念：

### 2.1 Webpack 插件组成
在自定义插件之前，我们需要了解，一个 Webpack 插件由哪些构成，下面摘抄文档：

- 一个具名 JavaScript 函数；
- 在它的原型上定义 apply 方法；
- 指定一个触及到 Webpack 本身的[事件钩子](https://webpack.docschina.org/api/compiler-hooks/)；
- 操作 Webpack 内部的实例特定数据；
- 在实现功能后调用 Webpack 提供的 callback。 

### 2.2 Webpack 插件基本架构
插件由一个构造函数实例化出来。构造函数定义 `apply` 方法，在安装插件时，`apply` 方法会被 Webpack `compiler` 调用一次。`apply` 方法可以接收一个 Webpack `compiler `对象的引用，从而可以在回调函数中访问到 `compiler` 对象。

官方文档提供一个简单的插件结构：

```javascript
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Hello World Plugin', (
      stats /* 在 hook 被触及时，会将 stats 作为参数传入。 */
    ) => {
      console.log('Hello World!');
    });
  }
}
module.exports = HelloWorldPlugin;
```

使用插件：

```javascript
// webpack.config.js
var HelloWorldPlugin = require('hello-world');

module.exports = {
  // ... 这里是其他配置 ...
  plugins: [new HelloWorldPlugin({ options: true })]
};
```

### 2.3 HtmlWebpackPlugin 介绍
> HtmlWebpackPlugin 简化了 HTML 文件的创建，以便为你的 Webpack 包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。

插件的基本作用概括：**生成 HTML 文件**。

`html-webapck-plugin` 插件**两个主要作用：**

- 为 HTML 文件引入外部资源（如 `script` / `link` ）动态添加每次编译后的 hash，防止引用文件的缓存问题；
- 动态创建 HTML 入口文件，如单页应用的 `index.html `文件。

`html-webapck-plugin` 插件**原理介绍：**

- 读取 Webpack 中 `entry` 配置的相关入口 `chunk` 和 `extract-text-webpack-plugin` 插件抽取的 CSS 样式；
- 将样式插入到插件提供的 `template` 或 `templateContent` 配置指定的模版文件中；
- 插入方式是：通过 `link` 标签引入样式，通过 `script` 标签引入脚本文件；

## 三、开发流程
本文开发的 **自动添加时间戳引用脚本文件（SetScriptTimestampPlugin）** 插件实现的原理：通过 **HtmlWebpackPlugin** 生成 HTML 文件前，将模版文件**预留位置替换成脚本**，脚本中执行自动添加时间戳来引用脚本文件。

### 3.1 插件运行机制
![SetScriptTimestampPlugin 运行机制.png](https://user-gold-cdn.xitu.io/2020/2/24/170745f8681eb3b6?w=2244&h=1604&f=png&s=269681)

### 3.2 初始化插件文件
新建 `SetScriptTimestampPlugin.js`  文件，并参考官方文档中插件的基本结构，初始化插件代码：

```javascript
// SetScriptTimestampPlugin.js

class SetScriptTimestampPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('SetScriptTimestampPlugin',
     (compilation, callback) => {
      console.log('SetScriptTimestampPlugin!');
    });
  }
}
module.exports = SetScriptTimestampPlugin;
```

`apply` 方法为插件原型方法，接收 `compiler` 作为参数。

### 3.3 选择插件触发时机
选择插件触发时机，其实是选择插件触发的 compiler 钩子（即何时触发插件）。<br />Webpack 提供钩子有很多，这里简单介绍几个，完整具体可参考文档《[Compiler Hooks](https://webpack.js.org/api/compiler-hooks/)》：

- `entryOption` : 在 webpack 选项中的 `entry` 配置项 处理过之后，执行插件。
- `afterPlugins` : 设置完初始插件之后，执行插件。
- `compilation` : 编译创建之后，生成文件之前，执行插件。。
- `emit` : 生成资源到 `output` 目录之前。
- `done` : 编译完成。

我们插件应该是要在 HTML 输出之前，动态添加 `script` 标签，所以我们选择钩入 `compilation` 阶段，代码修改：

```diff
// SetScriptTimestampPlugin.js

class SetScriptTimestampPlugin {
  apply(compiler) {
-   compiler.hooks.done.tap('SetScriptTimestampPlugin',
+   compiler.hooks.compilation.tap('SetScriptTimestampPlugin', 
      (compilation, callback) => {
      console.log('SetScriptTimestampPlugin!');
    });
  }
}
module.exports = SetScriptTimestampPlugin;
```

在 `compiler.hooks` 下指定**事件钩子函数**，便会触发钩子时，执行回调函数。<br />Webpack 提供三种触发钩子的方法：

- `tap` ：以**同步方式**触发钩子；
- `tapAsync` ：以**异步方式**触发钩子；
- `tapPromise` ：以**异步方式**触发钩子，返回 Promise；

这三种方式能选择的钩子方法也不同，由于 `compilation` 是 `SyncHook` 同步钩子，所以采用 `tap` 触发方式。<br />`tap` 方法接收两个参数：插件名称和回调函数。

### 3.4 添加插件替换入口
我们原理上是将模版文件中，指定替换入口，再替换成需要执行的脚本。

![image.png](https://user-gold-cdn.xitu.io/2020/2/24/170745f8680672ef?w=947&h=340&f=png&s=83858)

所以我们在模版文件 `template.html` 中添加 `<!--SetScriptTimestampPlugin inset script-->` 作为标识替换入口：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webpack 插件开发入门</title>
</head>
<body>
  	<!-- other code -->
    <!--SetScriptTimestampPlugin inset script-->
</body>
</html>
```

### 3.5 编写插件逻辑
到这一步，才开始编写插件的逻辑。<br />从上一步中，我们知道在 `tap` 第二个参数是个回调函数，并且这个回调函数有两个参数： `compilation` 和 `callback` 。

`compilation` 继承于`compiler`，包含 `compiler` 所有内容（也有 Webpack 的 `options`），而且也有 `plugin` 函数接入任务点。

```javascript
// SetScriptTimestampPlugin.js

class SetScriptTimestampPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('SetScriptTimestampPlugin', 
      (compilation, callback) => {
      	// 插件逻辑 调用compilation提供的plugin方法
        compilation.plugin(
          "html-webpack-plugin-before-html-processing",
          function(htmlPluginData, callback) {
            // 读取并修改 script 上 src 列表
            let jsScr = htmlPluginData.assets.js[0];
            htmlPluginData.assets.js = [];
            let result = `
                <script>
                    let scriptDOM = document.createElement("script");
                    let jsScr = "./${jsScr}";
                    scriptDOM.src = jsScr + "?" + new Date().getTime();
                    document.body.appendChild(scriptDOM)
                </script>
            `;
            let resultHTML = htmlPluginData.html.replace(
              "<!--SetScriptTimestampPlugin inset script-->", result
            );
            // 返回修改后的结果
            htmlPluginData.html = resultHTML;
          }
        );
      }
    );
  }
}
module.exports = SetScriptTimestampPlugin;
```

在上面插件逻辑中，具体做了这些事：

1. **执行 **`compilation.plugin`**  方法，并传入两个参数：插件事件和回调方法。**

所谓“插件事件”即插件所提供的一些事件，用于监听插件状态，这里列举几个 `html-webpack-plugin` 提供的事件（完整可查看《[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)》）：<br />Async:

- `html-webpack-plugin-before-html-generation`
- `html-webpack-plugin-before-html-processing`
- `html-webpack-plugin-alter-asset-tags`

Sync:

- `html-webpack-plugin-alter-chunks`

2. **获取脚本文件名称列表并清空。**

在回调方法中，通过 `htmlPluginData.assets.js` 获取需要通过 `script` 引入的脚本文件名称列表，拷贝一份，并清空原有列表。

![image.png](https://user-gold-cdn.xitu.io/2020/2/24/170745f86a2d7bbe?w=334&h=93&f=png&s=27216)

3. **编写替换逻辑。**

替换逻辑即：动态创建一个 `script` 标签，将其 `src` 值设置为上一步读取到的脚本文件名，并在后面拼接 **时间戳** 作为参数。

4. **插入替换逻辑。**

通过 `htmlPluginData.html` 可以获取到模版文件的字符串输出，我们只需要将模版字符串中替换入口 `<!--SetScriptTimestampPlugin inset script-->` 替换成我们上一步编写的替换逻辑即可。

5. **返回HTML文件。**

最后将修改后的 HTML 字符串，赋值给原来的 `htmlPluginData.html` 达到修改效果。

### 3.5 使用插件
自定义插件使用方式，与其他插件一致，在 `plugins` 数组中实例化：

```javascript
// webpack.config.js

const SetScriptTimestampPlugin = require("./SetScriptTimestampPlugin.js");
module.exports = {
	// ... 省略其他配置
  plugins: [
  	// ... 省略其他插件
    new SetScriptTimestampPlugin()  
  ]
}
```

到这一步，我们已经实现需求“当项目托管到 CDN 平台，希望实现项目中的 index.js 不被缓存”。<br />![image.png](https://user-gold-cdn.xitu.io/2020/2/24/170745f86a7fdfd0?w=467&h=291&f=png&s=44616)

## 四、案例拓展
这里以之前 **SetScriptTimestampPlugin** 插件为例子，继续拓展。

### 4.1 读取插件配置参数
每个插件本质是一个类，跟一个类实例化相同，可以在实例化时传入配置参数，在构造函数中操作：

```javascript
// SetScriptTimestampPlugin.js

class SetScriptTimestampPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    console.log(this.options.filename); // "index.js"
    // ... 省略其他代码
  }
}
module.exports = SetScriptTimestampPlugin;
```

使用时：

```javascript
// webpack.config.js

const SetScriptTimestampPlugin = require("./SetScriptTimestampPlugin.js");
module.exports = {
	// ... 省略其他配置
  plugins: [
  	// ... 省略其他插件
    new SetScriptTimestampPlugin({
    	filename: "index.js"
    })  
  ]
}
```

### 4.2 添加多脚本文件的时间戳
如果我们此时需要同时修改多个脚本文件的时间戳，也只需要将参数类型和执行脚本做下调整。<br />具体修改脚本，这里不具体展开，篇幅有限，可以自行思考实现咯~<br />这里展示使用插件时的参数：

```javascript
// webpack.config.js

const SetScriptTimestampPlugin = require("./SetScriptTimestampPlugin.js");
module.exports = {
	// ... 省略其他配置
  plugins: [
  	// ... 省略其他插件
    new SetScriptTimestampPlugin({
    	filename: ["index.js", "boundle.js", "pingan.js"]
    })  
  ]
}
```

生成结果：

```html
<script src="./index.js?1582425467655"></script>
<script src="./boundle.js?1582425467655"></script>
<script src="./pingan.js?1582425467655"></script>
```

## 五、总结
本文通用自定义 Webpack 插件来实现日常一些比较棘手的需求。主要为大家介绍了 Webpack 插件的基本组成和简单架构，也介绍了 HtmlWebpackPlugin 插件。并通过这些基础知识，完成了一个 HTML 文本替换插件，最后通过两个场景来拓展插件使用范围。

最后，关于 Webpack 插件开发，还有更多知识可以学习，建议多看看官方文档《[Writing a Plugin](https://webpack.js.org/contribute/writing-a-plugin/)》进行学习。

本文纯属个人经验总结，如有异议，欢迎指点。

## 参考文档

1. 《[Writing a Plugin](https://webpack.js.org/contribute/writing-a-plugin/)》
1. 《[HtmlWebpackPlugin - Webpack](https://webpack.js.org/plugins/html-webpack-plugin/)》
1. 《[扩展 HtmlwebpackPlugin 插入自定义的脚本](https://www.cnblogs.com/mjian/p/9250095.html)》

## 关于我

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|

## 微信公众号
![bg](https://user-gold-cdn.xitu.io/2020/2/22/1706bb1ea5f680ae?w=885&h=445&f=png&s=80093)  