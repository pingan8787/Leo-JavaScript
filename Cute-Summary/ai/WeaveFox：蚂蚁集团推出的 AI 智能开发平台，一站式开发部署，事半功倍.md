> 🌟 工具名称：WeaveFox
>
> 🔗 工具地址：[https://weavefox.cn](https://weavefox.cn)

## 一、工具介绍 🛠️

WeaveFox 是蚂蚁集团推出的一款 **AI 前端智能开发平台**。它能通过提示词**一键生成完整的前端项目**，或将设计图直接转换为高质量前端源代码，支持多种应用类型和技术栈，旨在提升前端开发效率与质量。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757077196574-6d2442d1-b869-49cd-a57d-e3c20669dbe2.png)

WeaveFox 的核心功能包括：

- **AI 生成项目**：根据需求描述自动生成项目。
- **设计图转代码**：将设计稿转换为前端代码。
- **意图生码**：通过自然语言描述生成代码片段。
- **丰富插件**：提供多种工具集成，提升开发体验。

> 产品手册：[https://www.yuque.com/weavefox](https://www.yuque.com/weavefox)
>
> B 站视频：[https://space.bilibili.com/3546816974948387](https://space.bilibili.com/3546816974948387)

## 二、快速上手 🚀

### 1.输入需求描述

WeaveFox 上手比较简单，用户只需输入需求，WeaveFox 即可开始生成。下面是 Chris 的提示词：

> 创建一个灵感收集网站，用来收集用户随时记录的灵感内容，灵感的类型为文本和链接，支持增删改查灵感，有一个酷炫的灵感列表页面。另外灵感还要支持生成一张好看的海报图，我用来分享到社群。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757077175064-2460feb9-5b7d-4263-9b8d-63ef52c48fd0.png)

### 2.需求确认

WeaveFox 会自动拆解需求，并**列出待用户确认的信息**，例如技术框架和需求细节。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757077289441-c4345a8a-0043-4abf-b970-86efcce3a8b7.png)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757077316109-cc2a1fe0-29ea-4f6e-8b71-95c2b24aa04e.png)

### 3.开始工作

确认后，WeaveFox 会规划任务，安排“产品设计专家”、“UI/UX 视觉设计专家”和“React 生码专家”等多个 AI 角色，**模拟实际开发流程来规划和执行任务**。在右侧，可以看到每个任务的实时完成情况。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757077415408-b6abe115-c3e3-421c-b413-e3f1eb421307.png)

### 4.生成完成

等待一段时间后，WeaveFox 会生成项目并提供预览。你可以**通过对话的方式，逐步优化项目**，甚至可以直接让 WeaveFox 处理遇到的 Bug，而且响应非常迅速。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757079541655-67fc0ab8-5237-448b-84aa-ed54cd3b6655.png)

## 三、核心功能 🔍

### 1.支持设计稿生成代码

WeaveFox 支持上传 **.jpg** 和 **.png** 格式的设计稿来生成代码，能够**实现像素级对齐**，并通过标注识别悬停、点击等隐藏交互行为。它还支持多种框架，如 React、Vue、Next.js，以及 Less/SCSS 等预处理。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757079633096-e505e78b-836f-4e4e-9d08-2a5b2f10b2e2.png)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757079655775-6d6e2256-e33a-4e50-93c1-e67aaabed890.png)

### 2.支持局部修改

生成代码后，你还可以进行灵活的调整，直接通过“局部修改”功能的“元素拾取工具”选中页面上的任何元素\*\*\*\*，进行像素级别的局部调整。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757078621824-33561b64-cf09-452a-9f79-791c05875390.png)

### 3.多种项目导出方式

为了无缝对接现有开发流程，WeaveFox 提供了多种代码导出方式：

1. 创建 GithubPR 提交
2. 使用命令行添加到代码库
3. 下载代码（Zip 包）

方便后续自定义修改代码。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757078928083-75ac0388-2ef3-4a56-bdc0-15254a8f77f4.png)

### 4.一键部署项目

快速分享和交付是提升整体效率的关键一环，WeaveFox 支持一键部署功能，你可以**将生成的网页快速部署，无需复杂的服务器配置，即可获得一个可公开访问的链接**。

> Chris 演示项目：[https://env-00jxgx2bystb-static.normal.cloudstatic.cn/BHFHAHJDIBu6uwf14Zda](https://env-00jxgx2bystb-static.normal.cloudstatic.cn/BHFHAHJDIBu6uwf14Zda)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757079833312-a1c859b3-d4d4-4a92-978c-b5e45efc581a.png)

### 5.多种生码智能体

WeaveFox 还提供了多种生码智能体，以满足更多开发场景的需求，目前支持：

1. **JS 转 TS**：JS 文件转 TS 文件
2. **AntV 图表专家**：意图生成 AntV 图表
3. **单测生成**：为 Node.js 和前端应用生成单元测试代码
4. **i18n 国际化**：国际化翻译

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757079010635-f5489340-c220-4f93-af4e-2a927ae39a8c.png)

### 6.支持多种插件

WeaveFox 还支持 Figma 插件、Chrome 插件、CLI 命令行工具、VSCode 插件等。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1757079138706-ade3e41e-cc92-4f1f-89c8-cb6988eb6231.png)

## 四、不适用的场景

WeaveFox 目前不适用于以下场景：

- **非高清图/草图**： 仅支持还原高清图片。
- **游戏及复杂交互**： 游戏、复杂动画等场景不适用，推荐使用 Galacean 等专业工具。
- **带标注的设计稿**： 标注会影响模型识别，不支持还原。
- **文本编辑器**： 文本编辑器、代码预览器等不适用，建议使用 CodeMirror 等组件。
- **原生组件调用**： 对于地址列表、系统键盘或调用原生相机等 UI，建议直接使用系统 API。

详细可以查看官方图文介绍：[https://www.yuque.com/weavefox/intro/not-support](https://www.yuque.com/weavefox/intro/not-support)

## 五、总结 📝

WeaveFox 是一款**强大的 AI 前端开发工**具，能够**通过提示词或设计稿快速生成高质量的前端项目**，显著提升开发效率。它不仅具备**灵活的局部修改和多种导出方式**，还支持丰富的插件和智能体，是现代前端开发不可或缺的利器。
