今天 Chris 给大家推荐的工具是 Bolt，一款可以非常棒的 AI 全栈 Web 开发工具，快来一起看看吧。

> 🌟 工具名称：Bolt
> 🌐 使用环境：需要梯子 🪜
> 🔗 工具地址：[https://bolt.new/](https://bolt.new/)
> 📦 开源仓库：[https://github.com/stackblitz/bolt.new](https://github.com/stackblitz/bolt.new)

## 一、工具介绍 🛠️

Bolt 是由 StackBlitz 推出的基于浏览器的 AI 全栈 Web 开发工具，无需本地设置即可进行提示、运行、编辑和部署**全栈应用程序**，对**中文支持很友好**。

Bolt 能够在浏览器运行 Node.js 环境，支持 Astro、Vite、Next.js、Nuxt.js ，还有 Vue、React、Svelte 等前端框架，可以通过对话完成**项目创建、开发和部署的完整流程**，并支持通过 URL 分享。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728443760831-0d89dcd5-265c-421d-8b83-7d3bf83aec11.png)

## 二、快速上手 🚀

Bolt 可以让非技术人员通过对话形式，快速创建并上线自己的网站。接下来和 Chris 一起创建个简单博客试试。

### 1.输入提示词

登录 Bolt 后，在首页输入框中，输入提示词，**描述需要制作的网页大概信息**，比如 Chris 想做一个博客，提示词如下：

> 根据下面内容创建一个博客站点，使用 Vue3+TS，需要支持：
>
> 1.支持切换主题：明亮主题，黑暗主题，像素主题，iOS 主题
>
> 2.主题色为浅蓝色；
>
> 3.核心页面包括：主页，文章列表，文章详情，投稿页面，关于页面
>
> 4.文章详情页包括：文章标题，发布时间，作者名称，文章分类等
>
> 参考内容：
>
> 「AI 工具派」是一个专注于分享各类优秀 AI 工具和前沿 AI 资讯的自媒体平台，至今已发布超过 80+ 篇原创文章。🎖️ 使命是：「探索最新 AI 工具，发现 AI 带来的无限可能性」！

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728452912968-49abbe99-ce15-4fff-9b5a-687a43095820.png)

### 2.等待生成代码

接下来只要等待 Bolt 一步步完成代码生成即可，期间我们可以看到 Bolt 是如何一步步实现的：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728452653817-7bb4d2c1-541c-4bd4-8f5e-96007f5d7fac.png)

### 3.创建完成

等待 Bolt 创建所有代码后，即可在右侧预览网页效果，还可以在左侧输入框中，通过提示词让 Bolt 对网页进行修改。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728453184596-f28d1e7e-0264-4dc3-b04c-6f79dee47398.png)

### 4.一键部署网站

当页面调整完成后，即可点击页面右上角“Deploy”**一键部署网站**。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728453300337-aaa62db4-c944-439b-b5d7-ac7e8d95e669.png)

当部署完成后，Bolt 会返回线上地址，Chris 部署的地址为：[https://dazzling-brigadeiros-c2d8b2.netlify.app/](https://dazzling-brigadeiros-c2d8b2.netlify.app/)

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728453482397-75ceaec7-6822-4ba6-bbd4-6fa42cd94662.png)

## 三、核心功能 🔍

### 1.流畅自然的开发体验

Bolt 提供了**通过对话方式**进行项目开发，用户可以**随时对网页进行修改**，期间无需写任何代码，非常流畅自然。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728480652659-7b71cb73-a2f0-4260-b176-bb9b7e6765f4.png)

### 2.支持修改项目代码

Bolt 会为当前生成的网站创建一个项目，包含**所有的代码文件**，用户可以点击右上角“**Open in StackBlitz**”，打开 StackBlitz 在线编辑器，**运行和修改项目代码**。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728480827765-bed137ec-9d10-4d88-86cf-0a0f15d52b05.png)

当然，也支持项目导出等操作，还可以从 StackBlitz 在线编辑器打开到 Bolt，太赞了。

### 3.详细的代码过程介绍

Bolt 跟其他 AI 编程工具一样，会把生成的代码进行详细介绍，对于开发人员来说，非常直观，好理解：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728481182889-305accbb-d782-4844-9a80-a6f32d9a8b3b.png)

### 4.自动导入 Github 项目

Bolt 也支持在 github 仓库地址前面增加`https://bolt.new/`，直接导入该项目到 Bolt，比如：

- 原本仓库地址为：https://github.com/pingan8787/awesome-ai-tools
- 修改后：**https://bolt.new/**github.com/pingan8787/awesome-ai-tools

即可导入，对于已有项目使用 Bolt 非常方便：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728479684712-4b4b5ec7-f5d8-40c6-8b2e-8254f25b929f.png)

### 5.支持上传附件

Bolt 还支持在对话框中上传附件（如图片等），作为对话上下文，这样就可以直接把 UI 设计稿直接上传给 Bolt 实现，非常方便 😄

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728481283501-b9346d7b-8a20-4b87-aee0-a2e70129f7d1.png)

### 6.自动修复错误

在项目运行过程中，如果出现 Bug，也可以让 Bolt 自行修改即可。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728471502594-b665de8d-147d-4f3a-8435-94b455dfcc9a.png)

## 四、收费情况 💰

目前 Bolt 提供**免费版**和**付费订阅**，其中免费版支持：

1. 由具有 20 万上下文窗口的 Sonnet 3.5 提供支持。
2. 全浏览器式集成开发环境。
3. 提供无限个公共项目和集合。
4. 可以打开并编辑公共的 GitHub repositories。
5. 每个项目最多可上传 1MB 的文件。
6. 有社区支持。

详细的收费情况参考官网介绍：[https://stackblitz.com/pricing](https://stackblitz.com/pricing)

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1728470895229-e7ef57a4-c99c-45c1-8c9b-3eb818768ef1.png)

## 五、总结 📝

Bolt 是 StackBlitz 推出的浏览器 AI 全栈开发工具，功能强大且对中文友好。非常符合 Chris 对 AI 编程助手的想象，大家感兴趣可以抓紧去体验啦～
