## 介绍

es-toolkit 是一款先进且具备高性能的现代化 JavaScript 实用工具库，其拥有较小的捆绑包规模以及强大的类型注解，同时还提供了一系列非常不错的函数，适合日常使用。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1720925070844-3f011871-005d-4019-8d89-7c9a43376927.png#averageHue=%23404a6c&clientId=u5ad0b3c2-7748-4&from=paste&height=627&id=u941ae7be&originHeight=627&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=988930&status=done&style=none&taskId=ud744b86e-62f4-4c5b-b4a5-6ac10433146&title=&width=1200)

相较于 lodash 等替代方案，es-toolkit 所提供的包体积显著减小（最多降低 97%），且运行时性能提升 2 - 3 倍。大部分功能是借助最新的 JavaScript 特性实现。

> 工具地址：[https://es-toolkit.slash.page/](https://es-toolkit.slash.page/)  
> 仓库地址：[https://github.com/toss/es-toolkit](https://github.com/toss/es-toolkit)

## 亮点和功能

es-toolkit 亮点包括：

- es-toolkit 提供多种现代实现的**日常实用函数**，如 debounce、delay、chunk、sum 和 pick。
- 设计时考虑了性能，es-toolkit 在现代 JavaScript 环境中**实现了 2-3 倍的性能提升**。
- es-toolkit 支持开箱即用，并且与其他库相比，可以**将 JavaScript 代码减少高达 97%**。
- es-toolkit 包含**内置的 TypeScript 支持**，提供直观且强大的类型。它还提供诸如 isNotNil 等有用的类型保护。
- es-toolkit 经过了**百分之百的测试覆盖率的实战检验**，确保其可靠性和稳健性。

es-toolkit 提供了一些常用功能：

- Array: 数组操作工具，如 uniq 和 difference。
- Function: 控制函数执行的工具，包括 debounce 和 throttle。
- Math: 数值操作工具，如 sum 和 round。
- Object: 操作 JavaScript 对象的工具，如 pick 和 omit。
- Predicate: 类型保护函数，如 isNotNil。
- Promise: 异步操作工具，如 delay。
- String: 字符串操作工具，如 snakeCase。

## 安装

es-toolkit 支持多种安装方式：

- **Node.js 安装**：支持 Node.js 18 及更高版本；

```shell
npm install es-toolkit
```

- **Deno 安装**：通过 JSR 安装到 Deno，需注意包名与 npm 不同；

```shell
deno add @es-toolkit/es-toolkit
```

- **Bun 安装**：也支持在 Bun 中的安装。

```shell
bun add es-toolkit
```

## 使用示例

```typescript
// import from '@es-toolkit/es-toolkit' in jsr.
import { debounce, chunk } from "es-toolkit";

const debouncedLog = debounce((message) => {
  console.log(message);
}, 300);

// 这个调用将会被防抖处理
debouncedLog("Hello, world!");

const array = [1, 2, 3, 4, 5, 6];
const chunkedArray = chunk(array, 2);

console.log(chunkedArray);
// 输出: [[1, 2], [3, 4], [5, 6]]s
```

## 包体积

凭借自身现代化的达成，es-toolkit 大大降低了其包的大小，和 lodash 等其他的库相较而言，能够减少差不多 97%呢。这就让 es-toolkit 在包的体积这一块变成了最有效的那个选项，当中有一些实用的函数，体积居然还不到 100 字节。  
下面是详细的对比：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1720925554493-e8560b00-8d63-45f9-b917-24ed6deeb7fd.png#averageHue=%23f4f4f6&clientId=u5ad0b3c2-7748-4&from=paste&height=716&id=u6ceed99b&originHeight=716&originWidth=1066&originalType=binary&ratio=1&rotation=0&showTitle=false&size=102575&status=done&style=none&taskId=u4dc5a934-f4f8-46ab-8e2d-fc171c85410&title=&width=1066)

## 性能

es-toolkit 在设计的时候着重考虑了性能方面，和类似于 lodash 的那些替代库相较而言，平均性能竟然提高了 2 倍。借由充分运用现代 JavaScript API ，有的函数甚至能够达成高达 11 倍的性能提升呢。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1720925642642-89cfd3d8-91ba-4f2c-a773-cd476e050614.png#averageHue=%23f2f2f4&clientId=u5ad0b3c2-7748-4&from=paste&height=948&id=u90b2dfc4&originHeight=948&originWidth=1138&originalType=binary&ratio=1&rotation=0&showTitle=false&size=167220&status=done&style=none&taskId=u585a3810-a863-442a-a552-9b1cb1e1cb0&title=&width=1138)

在 MacBook Pro 14-inch (M1 Max, 2021) 上进行了测试。
