在 TypeScript 开发中，tsconfig.json 是个不可或缺的配置文件，它是我们在 TS 项目中最常见的配置文件，那么你真的了解这个文件吗？它里面都有哪些优秀配置？如何配置一个合理的 tsconfig.json 文件？本文将全面带大家一起详细了解 tsconfig.json 的各项配置。<br />
<br />小弟能力有限，欢迎各位大佬指点~~<br />
<br />本文将从以下几个方面全面介绍 tsconfig.json 文件：<br />![了不起的 tsconfig.json 指南.png](http://images.pingan8787.com/tsconfig-json/tsconfig-json-guide.png)
<a name="UZ7GF"></a>
## 一、tsconfig.json 简介
<a name="bANbi"></a>
### 1. 什么是 tsconfig.json
TypeScript 使用 tsconfig.json 文件作为其配置文件，当一个目录中存在 tsconfig.json 文件，则认为该目录为 TypeScript 项目的根目录。<br />通常 tsconfig.json 文件主要包含两部分内容：**指定待编译文件**和**定义编译选项**。<br />
<br />从《[TypeScript编译器的配置文件的JSON模式](http://json.schemastore.org/tsconfig)》可知，目前 tsconfig.json 文件有以下几个顶层属性：

- compileOnSave
- compilerOptions
- exclude
- extends
- files
- include
- references
- typeAcquisition


<br />文章后面会详细介绍一些常用属性配置。<br />

<a name="EIEcP"></a>
### 2. 为什么使用 tsconfig.json
通常我们可以使用 `tsc` 命令来编译少量 TypeScript 文件：
```bash
/*
  参数介绍：
  --outFile // 编译后生成的文件名称
  --target  // 指定ECMAScript目标版本
  --module  // 指定生成哪个模块系统代码
  index.ts  // 源文件
*/
$ tsc --outFile leo.js --target es3 --module amd index.ts
```
但如果实际开发的项目，很少是只有单个文件，当我们需要编译整个项目时，就可以使用 tsconfig.json 文件，将需要使用到的配置都写进 tsconfig.json 文件，**这样就不用每次编译都手动输入配置，另外也方便团队协作开发**。<br />

<a name="u7L2g"></a>
## 二、使用 tsconfig.json
目前使用 tsconfig.json 有2种操作：
<a name="Kshqd"></a>
### 1. 初始化 tsconfig.json
在初始化操作，也有 2 种方式：

1. 手动在项目根目录（或其他）创建 tsconfig.json 文件并填写配置；
1. 通过 `tsc --init` 初始化 tsconfig.json 文件。



<a name="7PAhG"></a>
### 2. 指定需要编译的目录
**在不指定输入文件的情况下**执行 `tsc` 命令，默认从当前目录开始编译，编译所有 `.ts` 文件，并且从当前目录开始查找 tsconfig.json 文件，并逐级向上级目录搜索。
```bash
$ tsc
```
另外也可以为 `tsc` 命令指定参数 `--project` 或 `-p` 指定需要编译的目录，该目录需要包含一个 tsconfig.json 文件，如：
```bash
/*
  文件目录：
  ├─src/
  │  ├─index.ts
  │  └─tsconfig.json
  ├─package.json
*/
$ tsc --project src
```
**注意，tsc 的命令行选项具有优先级，会覆盖 tsconfig.json 中的同名选项。**<br />
<br />更多 tsc 编译选项，可查看[《编译选项》](https://www.tslang.cn/docs/handbook/compiler-options.html)章节。<br />

<a name="pn9rO"></a>
## 三、使用示例
这个章节，我们将通过本地一个小项目 `learnTsconfig` 来学着实现一个简单配置。<br />当前开发环境：windows / node 10.15.1 / TypeScript3.9<br />

<a name="hqWeO"></a>
### 1. 初始化 learnTsconfig 项目
执行下面命令：
```bash
$ mkdir learnTsconfig
$ cd .\learnTsconfig\
$ mkdir src
$ new-item index.ts
```
并且我们为 index.ts 文件写一些简单代码：
```typescript
// 返回当前版本号
function getVersion(version:string = "1.0.0"): string{
    return version;
}

console.log(getVersion("1.0.1"))
```

我们将获得这么一个目录结构：

```bash
  └─src/
     └─index.ts
```


<a name="TNpbL"></a>
### 2. 初始化 tsconfig.json 文件
在 learnTsconfig 根目录执行：
```bash
$ tsc --init
```


<a name="I03ph"></a>
### 3. 修改 tsconfig.json 文件
我们设置几个常见配置项：
```json
{
  "compilerOptions": {
    "target": "ES5",             // 目标语言的版本
    "module": "commonjs",        // 指定生成代码的模板标准
    "noImplicitAny": true,       // 不允许隐式的 any 类型
    "removeComments": true,      // 删除注释 
    "preserveConstEnums": true,  // 保留 const 和 enum 声明
    "sourceMap": true            // 生成目标文件的sourceMap文件
  },
  "files": [   // 指定待编译文件
    "./src/index.ts"  
  ]
}
```
其中需要注意一点：<br /> `files` 配置项值是一个**数组**，用来指定了待编译文件，即**入口文件**。<br />当入口文件依赖其他文件时，不需要将被依赖文件也指定到 `files` 中，因为**编译器会自动将所有的依赖文件归纳为编译对象**，即 `index.ts` 依赖 `user.ts` 时，不需要在 `files` 中指定 `user.ts` ， `user.ts` 会自动纳入待编译文件。<br />

<a name="5HN4m"></a>
### 4. 执行编译
配置完成后，我们可以在命令行执行 `tsc` 命令，执行编译完成后，我们可以得到一个 `index.js` 文件和一个 `index.js.map` 文件，证明我们编译成功，其中 `index.js` 文件内容如下：
```javascript
function getVersion(version) {
    if (version === void 0) { version = "1.0.0"; }
    return version;
}
console.log(getVersion("1.0.1"));
//# sourceMappingURL=index.js.map
```
可以看出，tsconfig.json 中的 `removeComments` 配置生效了，将我们添加的注释代码移除了。<br />
<br />到这一步，就完成了这个简单的示例，接下来会基于这个示例代码，讲解《七、常见配置示例》。<br />

<a name="IgQ8Z"></a>
## 四、tsconfig.json 文件结构介绍
<a name="r62H3"></a>
### 1. 按顶层属性分类
在 tsconfig.json 文件中按照**顶层属性**，分为以下几类：<br />![tsconfig.json 文件结构（顶层属性）.png](http://images.pingan8787.com/tsconfig-json/tsconfig-json-1.png)

![了不起的 tsconfig.json 指南.png](http://images.pingan8787.com/tsconfig-json/tsconfig-json-3.png)

<a name="0vZYp"></a>
### 2. 按功能分类
![tsconfig.json 文件结构（功能）.png](http://images.pingan8787.com/tsconfig-json/tsconfig-json-2.png)<br />

<a name="S64EK"></a>
## 五、tsconfig.json 配置介绍
<a name="pq3yO"></a>
### 1. compileOnSave
`compileOnSave` 属性作用是**设置保存文件的时候自动编译，但需要编译器支持**。
```json
{
	// ...
  "compileOnSave": false,
}
```
<a name="HWUeW"></a>
### 2. compilerOptions
`compilerOptions` 属性作用是**配置编译选项**。<br />若 `compilerOptions` 属性被忽略，则编译器会使用默认值，可以查看[《官方完整的编译选项列表》](https://www.typescriptlang.org/docs/handbook/compiler-options.html)。<br />编译选项配置非常繁杂，有很多配置，这里只列出常用的配置。
```json
{
  // ...
  "compilerOptions": {
    "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
    "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
    "diagnostics": true, // 打印诊断信息 
    "target": "ES5", // 目标语言的版本
    "module": "CommonJS", // 生成代码的模板标准
    "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
    "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
    "allowJS": true, // 允许编译器编译JS，JSX文件
    "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
    "outDir": "./dist", // 指定输出目录
    "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
    "declaration": true, // 生成声明文件，开启后会自动生成声明文件
    "declarationDir": "./file", // 指定生成声明文件存放目录
    "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
    "sourceMap": true, // 生成目标文件的sourceMap文件
    "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
    "declarationMap": true, // 为声明文件生成sourceMap
    "typeRoots": [], // 声明文件目录，默认时node_modules/@types
    "types": [], // 加载的声明文件包
    "removeComments":true, // 删除注释 
    "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
    "noEmitOnError": true, // 发送错误时不输出任何文件
    "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
    "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
    "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
    "strict": true, // 开启所有严格的类型检查
    "alwaysStrict": true, // 在代码中注入'use strict'
    "noImplicitAny": true, // 不允许隐式的any类型
    "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
    "strictFunctionTypes": true, // 不允许函数参数双向协变
    "strictPropertyInitialization": true, // 类的实例属性必须初始化
    "strictBindCallApply": true, // 严格的bind/call/apply检查
    "noImplicitThis": true, // 不允许this有隐式的any类型
    "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
    "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
    "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
    "noImplicitReturns": true, //每个分支都会有返回值
    "esModuleInterop": true, // 允许export=导出，由import from 导入
    "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
    "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { // 路径映射，相对于baseUrl
      // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
      "jquery": ["node_modules/jquery/dist/jquery.min.js"]
    },
    "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
    "listEmittedFiles": true, // 打印输出文件
    "listFiles": true// 打印编译的文件(包括引用的声明文件)
  }
}
```
<a name="wn91k"></a>
### 3. exclude
`exclude` 属性作用是**指定编译器需要排除的文件或文件夹。**<br />默认排除 `node_modules` 文件夹下文件。
```json
{
	// ...
  "exclude": [
    "src/lib" // 排除src目录下的lib文件夹下的文件不会编译
  ]
}
```
和 `include` 属性一样，支持 glob 通配符：

- `*` 匹配0或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录



<a name="hzeaX"></a>
### 4. extends
`extends` 属性作用是**引入其他配置文件，继承配置**。<br />默认包含当前目录和子目录下所有 TypeScript 文件。
```json
{
	// ...
  // 把基础配置抽离成tsconfig.base.json文件，然后引入
	"extends": "./tsconfig.base.json"
}
```


<a name="XOcZH"></a>
### 5. files
`files` 属性作用是**指定需要编译的单个文件列表**。<br />默认包含当前目录和子目录下所有 TypeScript 文件。
```json
{
	// ...
  "files": [
    // 指定编译文件是src目录下的leo.ts文件
    "scr/leo.ts"
  ]
}
```


<a name="coAd0"></a>
### 6. include
`include` 属性作用是**指定编译需要编译的文件或目录**。
```json
{
	// ...
  "include": [
    // "scr" // 会编译src目录下的所有文件，包括子目录
    // "scr/*" // 只会编译scr一级目录下的文件
    "scr/*/*" // 只会编译scr二级目录下的文件
  ]
}
```


<a name="PonUH"></a>
### 7. references
`references` 属性作用是**指定工程引用依赖。**<br />在项目开发中，有时候我们为了方便将前端项目和后端`node`项目放在同一个目录下开发，两个项目依赖同一个配置文件和通用文件，但我们希望前后端项目进行灵活的分别打包，那么我们可以进行如下配置：
```json
{
	// ...
  "references": [ // 指定依赖的工程
     {"path": "./common"}
  ]
}
```


<a name="9RACD"></a>
### 8. typeAcquisition
`typeAcquisition` 属性作用是**设置自动引入库类型定义文件(.d.ts)相关。**<br />包含 3 个子属性：

- `enable`  : 布尔类型，是否开启自动引入库类型定义文件(.d.ts)，默认为 false；
- `include`  : 数组类型，允许自动引入的库名，如：["jquery", "lodash"]；
- `exculde`  : 数组类型，排除的库名。
```json
{
	// ...
  "typeAcquisition": {
    "enable": false,
    "exclude": ["jquery"],
    "include": ["jest"]
  }
}
```


<a name="QqaRt"></a>
## 六、常见配置示例
本部分内容中，我们找了几个实际开发中比较常见的配置，当然，还有很多配置需要自己摸索哟~~

<a name="SzLQ8"></a>
### 1. 移除代码中注释
tsconfig.json：
```json
{
  "compilerOptions": {
    "removeComments": true,
  }
}
```
编译前：
```typescript
// 返回当前版本号
function getVersion(version:string = "1.0.0"): string{
    return version;
}
console.log(getVersion("1.0.1"))
```
编译结果：
```javascript
function getVersion(version) {
    if (version === void 0) { version = "1.0.0"; }
    return version;
}
console.log(getVersion("1.0.1"));
```
<a name="m3sdZ"></a>
### 2. 开启null、undefined检测
tsconfig.json：
```json
{
    "compilerOptions": {
        "strictNullChecks": true
    },
}
```
修改 `index.ts` 文件内容：
```typescript
const leo;
leo = new Pingan('leo','hello');
```

<br />这时候编辑器也会提示错误信息，执行 `tsc` 后，控制台报错：
```bash
src/index.ts:9:11 - error TS2304: Cannot find name 'Pingan'.

9 leo = new Pingan('leo','hello');

Found 1 error.
```


<a name="2kSjd"></a>
### 3. 配置复用
通过 `extends` 属性实现配置复用，即一个配置文件可以继承另一个文件的配置属性。<br />比如，建立一个基础的配置文件 `configs/base.json` ：
```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```
在`tsconfig.json` 就可以引用这个文件的配置了：
```json
{
  "extends": "./configs/base",
  "files": [
    "main.ts",
    "supplemental.ts"
  ]
}
```
<a name="shRlR"></a>
### 4. 生成枚举的映射代码
在默认情况下，使用 `const` 修饰符后，枚举不会生成映射代码。<br />如下，我们可以看出：使用 `const` 修饰符后，编译器不会生成任何 `RequestMethod` 枚举的任何映射代码，在其他地方使用时，内联每个成员的值，节省很大开销。
```typescript
const enum RequestMethod {
  Get,
  Post,
  Put,
  Delete
}

let methods = [
  RequestMethod.Get,
  RequestMethod.Post
]
```
编译结果：
```javascript
"use strict";
let methods = [
    0 /* Get */,
    1 /* Post */
];
```
当然，我们希望生成映射代码时，也可以设置 `tsconfig.json` 中的配置，设置 `preserveConstEnums` 编译器选项为 `true` ：
```json
{
  "compilerOptions": {
    "target": "es5",
    "preserveConstEnums": true
  }
}
```

<br />最后编译结果变成：
```javascript
"use strict";
var RequestMethod;
(function (RequestMethod) {
    RequestMethod[RequestMethod["Get"] = 0] = "Get";
    RequestMethod[RequestMethod["Post"] = 1] = "Post";
    RequestMethod[RequestMethod["Put"] = 2] = "Put";
    RequestMethod[RequestMethod["Delete"] = 3] = "Delete";
})(RequestMethod || (RequestMethod = {}));
let methods = [
    0 /* Get */,
    1 /* Post */
];
```
<a name="AxJpb"></a>
### 5. 关闭 this 类型注解提示
通过下面代码编译后会报错：
```typescript
const button = document.querySelector("button");
button?.addEventListener("click", handleClick);
function handleClick(this) {
 console.log("Clicked!");
 this.removeEventListener("click", handleClick);
}
```

<br />报错内容：
```bash
src/index.ts:10:22 - error TS7006: Parameter 'this' implicitly has an 'any' type.
10 function handleClick(this) {
Found 1 error.
```

<br />这是因为 `this` 隐式具有 `any` 类型，如果没有指定类型注解，编译器会提示“"this" 隐式具有类型 "any"，因为它没有类型注释。”。<br />
<br />解决方法有2种：

1. 指定 this 类型，如本代码中为 `HTMLElement` 类型：

`HTMLElement` 接口表示所有的 HTML 元素。一些HTML元素直接实现了 `HTMLElement` 接口，其它的间接实现`HTMLElement`接口。<br />关于[ HTMLElement ](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement)可查看详细。<br />

2. 使用 `--noImplicitThis` 配置项： 


<br />在 TS2.0 还增加一个新的编译选项： `--noImplicitThis`，表示当 `this` 表达式值为 `any` 类型时生成一个错误信息。我们设置为 `true` 后就能正常编译。
```json
{
  "compilerOptions": {
    "noImplicitThis": true
  }
}
```
<a name="vPiTf"></a>
## 七、Webpack/React 中使用示例
<a name="9l17W"></a>
### 1. 配置编译 ES6 代码，JSX 文件
创建测试项目 webpack-demo，结构如下：
```bash
webpack-demo/
  |- package.json
  |- tsconfig.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- index.js
    |- index.ts
  |- /node_modules
```
安装 TypeScript 和 ts-loader：
```bash
$ npm install --save-dev typescript ts-loader
```
配置 tsconfig.json，支持 JSX，并将 TypeScript 编译为 ES5：
```diff
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
+   "module": "es6",
+   "target": "es5",
+   "jsx": "react",
    "allowJs": true
  }
}
```
还需要配置 webpack.config.js，使其能够处理 TypeScript 代码，这里主要在 `rules` 中添加 `ts-loader` ：
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```


<a name="uSzYa"></a>
### 2. 配置 source map
想要启用 source map，我们必须配置 TypeScript，以将内联的 source map 输出到编译后的 JavaScript 文件中。<br />只需要在 tsconfig.json 中配置 sourceMap 属性：
```diff
  {
    "compilerOptions": {
      "outDir": "./dist/",
+     "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es5",
      "jsx": "react",
      "allowJs": true
    }
  }
```
然后配置 webpack.config.js 文件，让 webpack 提取 source map，并内联到最终的 bundle 中：

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
+   devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```
<a name="jIliq"></a>
## 八、总结
本文较全面介绍了 tsconfig.json 文件的知识，从“什么是 tsconfig.js 文件”开始，一步步带领大家全面认识 tsconfig.json 文件。<br />文中通过一个简单 learnTsconfig 项目，让大家知道项目中如何使用 tsconfig.json 文件。在后续文章中，我们将这么多的配置项进行分类学习。最后通过几个常见配置示例，解决我们开发中遇到的几个常见问题。<br />
<br />当然，本文篇幅有限，无法针对每个属性进行深入介绍，这就需要大家在实际开发中，多去尝试和使用啦~<br />

<a name="HIZQm"></a>
## 九、学习和参考资料

<br />1.[《Intro to the TSConfig Reference》](https://www.typescriptlang.org/tsconfig) <br />2.[《tsconfig.json》](https://www.tslang.cn/docs/handbook/tsconfig-json.html) <br />3.[《TypeScript编译器的配置文件的JSON模式》](http://json.schemastore.org/tsconfig)<br />4.[《详解TypeScript项目中的tsconfig.json配置》](https://www.jianshu.com/p/0383bbd61a6b) <br />5.[《官方完整的编译选项列表》](https://www.typescriptlang.org/docs/handbook/compiler-options.html)<br />

## 关于我
|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|
|语雀知识库|[Cute-FrontEnd](https://www.yuque.com/wangpingan/cute-frontend)|

![bg](http://images.pingan8787.com/2019_07_12guild_page.png)  