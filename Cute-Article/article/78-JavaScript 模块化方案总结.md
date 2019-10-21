> [阅读原文](https://mp.weixin.qq.com/s/tJ2Y1INJjXxBgsOPypp-Fw)

本文包含两部分，第一部分通过简明的描述介绍什么是 `CommonJS`、`AMD`、`CMD`、`UMD`、`ES Module `以及它们的常见用法，第二部分则根据实际问题指出在正常的 `webpack` 构建过程中该如何指定打包配置中的模块化参数。

### JavaScript 模块化方案

模块化这个话题在 ES6 之前是不存在的，因此这也被诟病为早期 JavaScript 开发全局污染和依赖管理混乱问题的源头。这类历史渊源和发展概述在本文将不会提及，因此感兴趣可以自行搜索 JavaScript 发展史进行了解。

直接进入正题，我们来看看常见的模块化方案都有哪些以及他们都有哪些内容。

### 1. CommonJS
`CommonJS` 的一个模块就是一个脚本文件，通过执行该文件来加载模块。`CommonJS` 规范规定，每个模块内部，`module` 变量代表当前模块。这个变量是一个对象，它的 `exports` 属性（即 `module.exports`）是对外的接口。加载某个模块，其实是加载该模块的 `module.exports` 属性。

我们见过这样的模块引用：

```js
var myModule = require('module');
myModule.sayHello();
```

这是因为我们把模块的方法定义在了模块的属性上：
```js
// module.js
module.exports.sayHello = function() {
    console.log('Hello ');
};

// 如果这样写
module.exports = sayHello;

// 调用则需要改为
var sayHello = require('module');
sayHello();
```

`require` 命令**第一次加载该脚本时就会执行整个脚本**，然后在内存中生成一个对象（模块可以多次加载，但是在**第一次加载时才会运行，结果被缓存**），这个结果长成这样：

```js
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```

`Node.js` 的模块机制实现就是参照了 `CommonJS` 的标准。但是 `Node.js` 额外做了一件事，即为每个模块提供了一个 `exports` 变量，以指向 `module.exports`，这相当于在每个模块最开始，写有这么一行代码：

```js
var exports = module.exports;
```

CommonJS 模块的特点：

* 所有代码都运行在模块作用域，不会污染全局作用域。

* 独立性是模块的重要特点就，模块内部最好不与程序的其他部分直接交互。

* 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

* 模块加载的顺序，按照其在代码中出现的顺序。

### 2. AMD

`CommonJS` 规范很好，但是不适用于浏览器环境，于是有了 **AMD** 和 **CMD** 两种方案。**AMD** 全称 **Asynchronous Module Definition**，即异步模块定义。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。除了和 `CommonJS` 同步加载方式不同之外，**AMD** 在模块的定义与引用上也有所不同。

```js
define(id?, dependencies?, factory);
```
AMD 的模块引入由 define 方法来定义，在 define API 中：

* `id`：模块名称，或者模块加载器请求的指定脚本的名字；

* `dependencies`：是个定义中模块所依赖模块的数组，默认为 `["require", "exports", "module"]`，举个例子比较好理解，当我们创建一个名为 "`alpha`" 的模块，使用了`require`，`exports`，和名为 "`beta`" 的模块，需要如下书写（示例1）；

* `factory`：为模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值；

```js
// 示例1
define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
  exports.verb = function() {
    return beta.verb();
    // 或者
    return require("beta").verb();
  }
});
```

如果模块定义不存在依赖，那么可以直接定义对象：

```js
define({
  add: function(x, y){
    return x + y;
  }
});
```

而使用时我们依旧通过 require 关键字，它包含两个参数，第一个数组为要加载的模块，第二个参数为回调函数：
```js
require([module], callback);
```
举个例子：
```js
require(['math'], function (math) {
  math.add(2, 3);
});
```

### 3. CMD

CMD 全称为 **Common Module Definition**，是 `Sea.js` 所推广的一个模块化方案的输出。在 CMD define 的入参中，虽然也支持包含 **id**, **deps** 以及 **factory** 三个参数的形式，但推荐的是接受 `factory` 一个入参，然后在入参执行时，填入三个参数 `require`、`exports` 和 `module`：

```js
define(function(require, exports, module) {
  var a = require('./a');
  a.doSomething();
  var b = require('./b');
  b.doSomething();
  ...
})
```

通过执行该构造方法，可以得到模块向外提供的接口。在与 AMD 比较上存在两个主要的不同点（来自玉伯回答）：

* 对于依赖的模块，`AMD` 是提前执行，`CMD` 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible。

* CMD 推崇依赖就近，AMD 推崇依赖前置。

如果说的不清楚，那么我们直接看上面的代码用 AMD 该怎么写：

```js
define(['./a', './b'], function(a, b) {
  a.doSomething();
  b.doSomething();
  ...
})
```

### 4. UMD

UMD，全称 **Universal Module Definition**，即通用模块规范。既然 `CommonJs` 和 AMD 风格一样流行，那么需要一个可以统一浏览器端以及非浏览器端的模块化方案的规范。

直接来看看官方给出的 jQuery 模块如何用 UMD 定义的代码：

```js
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.jqueryPlugin = function () { return true; };
}));
```

UMD的实现很简单：

* 先判断是否支持 AMD（`define` 是否存在），存在则使用 AMD 方式加载模块；

* 再判断是否支持 **Node.js** 模块格式（`exports` 是否存在），存在则使用 **Node.js** 模块格式；

* 前两个都不存在，则将模块公开到全局（`window` 或` global`）；

### 5. ES Modules

当然，以上说的种种都是社区提供的方案，历史上，JavaScript 一直没有模块系统，直到 ES6 在语言标准的层面上，实现了它。其设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。**CommonJS** 和 **AMD** 模块，都只能在运行时确定这些东西。比如，`CommonJS` 模块就是对象，输入时必须查找对象属性。而 ES Modules 不是对象，而是通过 export 命令显式指定输出的代码。

ES Modules 的模块化能力由 `export` 和 `import` 组成，`export` 命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。我们可以这样定义一个模块：

```js
// 第一种方式
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// 第二种方式
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

然后再这样引入他们：

```js
import { firstName, lastName, year } from 'module';
import { firstName as newName } from 'module';
import * as moduleA from 'module';
```

除以上两种命令外，还有一个 `export default` 命令用于指定模块的默认输出（一个模块只能有一个默认输出）。如果使用了 `export default` 语法，在 `import` 时则可以任意命名。由于 `export default` 命令的本质是将后面的值，赋给 `default` 变量，所以也可以直接将一个值写在 `export default` 之后。当然，引用方式也存在多种：

```js
import { default as foo } from 'module';
import foo from 'module';
```

需要注意的是 Modules 会自动采用严格模式，且 import 命令具有提升效果，会提升到整个模块的头部，首先执行。

### webpack 打包输出配置

说完理论，来看看实际项目中遇到的问题。当我们开发完一个 JavaScript 模块必然要经历打包的流程，而在 `webpack` 配置中，通过指定 `output` 选项就可以告诉 `webpack` 如何输出 `bundle`, `asset` 以及其他载入的内容。那么如何实现不同环境可兼容的构建呢？

* `import`：通过 ES Modules 规范语法进入引入；

* 变量：作为一个全局变量，比如通过 `script` 标签来访问；

* `thi`s：通过 `this` 对象访问；

* `window`：在浏览器中通过 `window` 对象访问；

* `UMD`：在 `AMD` 或 `CommonJS` 通过 `require` 引入后访问；

* `output` 中有一个属性叫做 `libraryTarget`，被用来指定如何暴露你的模块的属性。你可以这样尝试赋值给一个变量或者指定对象的属性：

```js
// 加载完成后将模块赋值给一个指定变量（默认值）
{
  libraryTarget: 'var',
  ...
}

// 赋值为指定对象的一个属性，比如 `this` 或者 `window`
{
  libraryTarget: "this",
  // libraryTarget: "window",
  ...
}

// 同样的，若是指定 commonjs，那么便可以将模块分配给 exports，这也意味着可以用于 CommonJS 环境：
{
  libraryTarget: "commonjs",
  ...
}
```

如果需要更完整的模块化 `bundle`，以确保和各模块系统兼容，那么可以这样尝试：

```js
// 内容分配给 module.exports 对象，用于 CommonJS 环境
{
  libraryTarget: 'commonjs2',
  ...
}

// 暴露为 AMD 模块，通过特定属性引入
{
  libraryTarget: 'amd',
  ...
}

// 所有模块系统兼容的万金油，可以在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量
{
  libraryTarget: 'umd',
  ...
}
```

因此，如果只看 `output` 内容，那么我的一个 `webpack` 生产环境配置可以写成这样：

```js
module.exports = {
  output: {
    // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, "dist"),
    filename: 'index.js',
    library: 'hijiangtao',
    umdNamedDefine: true,
    libraryTarget: 'umd',
  },
}
```

![2019_07_12guild_page](http://images.pingan8787.com/2019_07_12guild_page.png)

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|JS小册|js.pingan8787.com|
