[Node.js ](https://nodejs.org/)是一个基于[ Chrome V8](https://v8.dev/) 引擎的 JavaScript 运行时环境。
在我们日常开发中，Node.js 使用场景越来越多，大到服务端项目，小到开发工具脚本，所以掌握 Node.js 一些基础知识是非常有必要的。
今天主要聊一下 Node.js 中 LTS 和 Current 的区别和如何选择合适的版本。

## 一、版本介绍

在官网上可以看到 Node.js 有 LTS 系列和 Current 系列，分别对应不同的最新版本号。

![nodejs](https://images.pingan8787.com/images/20220730/nodejs1.png)
（本图来自：[Nodejs](https://nodejs.org/en/)）

Node.js 的版本号命名遵循[语义化版本](https://semver.org/)（Semantic Versioning），统一版本号表示规则，该规则规定了版本号如何表示，如何增加，如何进行比较，不同的版本号意味着什么。

版本格式：`主版本号.次版本号.修订号`

- 主版本号(major)：当你做了不兼容的 API 修改，
- 次版本号(minor)：当你做了向下兼容的功能性新增，可以理解为Feature版本，
- 修订号(patch)：当你做了向下兼容的问题修正，可以理解为Bug fix版本。

## 二、LTS 版本

LTS 版本全称 **Long Time Support**，即**长期支持版本**，重点在于稳定性和安全性，每个 LTS 版本的大版本号都是**偶数**，建议首次下载以及后续的每次升级都选择 LTS 版本，减少开发过程中出现的未知问题。
LTS 版本有 3 个阶段的生命周期：

| **生命周期** | **含义** | **说明** |
| --- | --- | --- |
| Active | 活跃阶段 | 每个从 Current 进入 LTS 的偶数版本，都会有 18 个月的时间被积极维护和升级。 |
| Maintenance | 维护阶段 | 活跃阶段达到 18 个月后，会进入为期 12 个月的维护阶段，期间只会进行错误修复和安全补丁。 |
| End of Life | 结束阶段 | 简称 EOL ，在维护阶段达到期限之后，该版本进入 EOL 阶段，将不再维护，也就是说，每个 LTS 版本最长会有 30 个月的维护时间，之后将不再进行维护。 |

版本的生命周期图（2022-2025）：

![nodejs](https://images.pingan8787.com/images/20220730/nodejs2.png)
（图片来自：[Node.js](https://nodejs.org/en/about/releases/)）

## 三、Current 版本

Current 即最新发布版本，该版本专注于必要功能的开发和现有 API 的完善，具有较短的寿命和更频繁的代码更新。
你可以在该版本体验到最新功能，也可以能遇到各种意想不到的问题和兼容性要处理。
通常 Current 版本会在每 6 个月发布一次大版本（特殊情况除外）：

- 每年 4 月份发布新的偶数版本；
- 每年 10 月份发布新的奇数版本。

![nodejs releases](https://images.pingan8787.com/images/20220730/nodejs3.png)
（图片来自：[Node.js releases](https://nodejs.org/en/download/releases/)）

详细的版本更新记录，可以查看[Node.js releases](https://nodejs.org/en/download/releases/)。

## 四、如何选择合适的版本？

- 使用 **LTS** 版本

一般用于生产环境，重点在于稳定，如果你需要稳定性并拥有复杂的生产环境（例如中型或大型企业），建议使用 **LTS** 版本。

- 使用 **Current** 版本

一般用于测试环境，如果你是为了尝试新的版本和新特性（比如 ECMAScript 新特性），或者能够在不干扰环境的情况下快速轻松地升级版本，建议使用 **Current** 版本。

## 五、总结

本文主要聊一下 Node.js 中 LTS 和 Current 的区别和如何选择合适的版本，在实际开发中，并不需要及时更新到最新版本，我们完全可以按照项目技术栈依赖的最低 Node.js 版本决定是否升级，如果条件允许，还是建议至少把大版本升级到最新的 LTS 版本。
