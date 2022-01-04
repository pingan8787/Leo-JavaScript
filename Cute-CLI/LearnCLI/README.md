## 执行 CLI 包的 3 种方式

### 1. node 执行

可以直接通过 `node node_modules/{packageName}/{entryFile}` 执行目录下的 js 文件。

### 2. npm scripts 命令

在项目 `package.json` 文件中配置 `scripts` 属性：

```json
// DefineDemo/package.json

{
  //...
  "scripts": {
    "leo": "node . --scripts",
  }
}
```

这样在项目根目录就可以直接通过 `npm run leo` 命令执行。

### 3. npx 命令

> 如果不清楚 npx 为何物，可以先阅读一下阮一峰老师 [npx 使用教程](https://www.ruanyifeng.com/blog/2019/02/npx.html)。

npx 是 Node.js 自带的模块，可以用来调用项目内部安装的模块。

在开发阶段，我们可以使用 [`npm link`](https://docs.npmjs.com/cli/v6/commands/npm-link/) 来为 CLI 包生成一个软链接。

只需 3 个步骤：
1. CLI 包的目录：配置 package.json 中 `name` 属性作为包名， `bin` 属性指定执行的入口文件；

```json
// DefineDemo/package.json

{
  //...
  "name": "leo",
  "bin": "./src/index.js"
}
```

2. CLI 包的目录：执行 `npm link`，将当前包添加到全局环境变量 path；

```bash
// DefineDemo
npm link
```

3. 使用包的目录：执行 `npm link {packageName}`，安装需要调试的 CLI 包。

```bash
// UseDemo
npm link leo
```

当 `npm link` 生成软链接以后，可以通过配置 [Shebang](https://zh.wikipedia.org/wiki/Shebang) 来定义执行方式。

如果使用 Shebang，会有下列 4 种情况：
1. 配置了 Shebang 的 js 文件：

```js
// ./DefineShebang/src/index.js
#!/usr/bin/env node

console.log(process.argv)
```

执行 `npx leo-shebang` 能够正常执行，并输出日志。

2. 没有配置 Shebang 的 js 文件：

```js
// ./DefineNoShebang/src/index.js

console.log(process.argv)
```

执行 `npx leo-no-shebang` 报错。

3. 配置了 Shebang 的非 js 文件：

```js
// ./DefineShebangText/src/index.js
#!/usr/bin/env node

console.log(process.argv)
```

执行 `npx leo-shebang-txt` 能够正常执行，并输出日志。

4. 没有配置 Shebang 的非 js 文件：

```js
// ./DefineNoShebangText/src/index.js

console.log(process.argv)
```

执行 `npx leo-no-shebang-txt` 报错。
