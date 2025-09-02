> 🌟 工具名称：iFlow CLI
>
> 🔗 工具地址：[https://platform.iflow.cn/cli](https://platform.iflow.cn/cli)

## 一、工具介绍 🛠️

iFlow CLI 是星流 AI 团队开发的一款直接**在终端中运行的强大 AI 助手**，它能通过自然语言交互，流畅地**分析代码仓库**、**执行编程任务**，并**理解特定的上下文需求**。通过自动化处理从简单的文件操作到复杂的工作流程，极大提升开发者的工作效率。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756729847422-9612eab1-acb3-491f-a2dd-5fb5a2a0b752.png)

其核心亮点如下：

- **免费开放**：免费使用 Kimi K2、Qwen Coder、GLM 4.5 等顶尖 AI 模型。
- **灵活集成**：支持将 iFlow CLI 集成到自己熟悉的开发工具，实现工作流程的自动化。
- **智能体生态**：通过心流开放市场，快速扩展智能体，组建只属于你的 AI 团队。
- **自然语言交互**：直接用日常对话来操作，无论是代码开发还是生活助理。

另外 iFlow CLI 官方也整理了其与 Claude Code / Gemini CLI 的对比如下：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756736559440-6419ebfd-aae3-4358-84ca-c5a17263f2a3.png)

## 二、安装和配置 🚀

### 1.安装 iFlow CLI

iFlow CLI 提供了非常便捷的安装方式：

- 确保本地安装 Node.js 22 以上版本
- 在命令行工具执行 `npm i -g @iflow-ai/iflow-cli` 安装

如果安装过程遇到其他问题，可以查看官方详细：[https://platform.iflow.cn/cli/quickstart](https://platform.iflow.cn/cli/quickstart)

安装成功后会显示很大的 iFlow Logo 和使用教程：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756732157918-9f794687-e37b-4b88-b734-4cc95fdb5970.png)

### 2.获取 API Key

然后打开并登录 [https://iflow.cn/?open=setting](https://iflow.cn/?open=setting) ，在弹框中复制“API Key”：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756732288606-4acd1ad2-007b-45b6-80bf-d1f63249d3ca.png)

### 3.设置 API Key

<font style="color:rgb(25, 33, 61);">接着选择 iFlow 认证方式，然后将复制的 API Key 粘贴到终端中，回车即可配置完成：</font>

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756732364890-2a51cce2-6d8b-4739-bee3-1225750ab226.png)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756732416699-77723555-d635-4e82-aa91-8743a1f8bb95.png)

### 4.选择模型

最后一步就是选择模型，内置了 Qwen3-Coder、Kimi K2、GLM-4.5、DeepSeek-V3.1 等模型：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756732494293-18ab4764-12c9-4a0a-8367-5178b502d2c3.png)

## 三、项目开发 💻

接下来 Chris 让 iFlow CLI 使用 Qwen3-Corder 模型开发一个灵感收集网站，提示词如下：

> 开发一个灵感收集器网站,用户可以随时收集自己的灵感/网址/文本等内容,支持打标/搜索/分类,你需要分析这个需求需要用到的页面,然后进行开发.技术栈使用 Vue3+TS,组件库使用组件库://ui.shadcn.com/

这是 Chris 一直想做的小产品哈～就让 iFlow CLI 替我试试吧。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756733052712-2670c47b-761a-4d64-bee8-4b4717e42bd2.png)

接下来 iFlow CLI 就开始吭哧吭哧工作了，从任务分析、拆解到代码开发，接下来只要静静等待即可：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756733466301-30c95f60-a12c-426c-a747-1de2083ff304.png)

从 iFlow CLI 拆解出来的任务清单，可以看出还是很清晰的：

- 分析需求并确定所需页面
- 设计数据模型和功能模块
- 搭建 Vue3+TS 项目框架
- 集成 shadcn/vue 组件库
- 开发灵感收集核心功能
- 实现标签、搜索和分类功能
- 开发用户界面和交互
- 测试和优化网站功能

## 四、核心功能 🌈

### 1.四种运行模式

iFlow CLI 支持四种运行模式，使用时可以通过 Shift + Tab 快捷键进行切换：

- **Yolo**：模型拥有最高权限，执行操作零限制
- **Accepting Edits**：仅允许修改文件，安全可控
- **Plan Mode**：先规划任务步骤，再逐层执行
- **Default**：模型无任何权限

默认是直接使用 Yolo 模式。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756737471310-7ddb834f-ba30-4a5d-b471-7aad6939507d.png)

### 2.多模态处理

iFlow CLI 允许用户通过多种输入形式，包括支持文本、图片、文件引用等多种形式，让任何模型都能"理解"图片内容。

> 详细可以阅读：[https://platform.iflow.cn/cli/features/interactive](https://platform.iflow.cn/cli/features/interactive)

在对话框中粘贴一张图片后，对话框会显示 `[Image #1]` 格式的文本，就可以针对这张图片进行对话：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756737213495-193b0cfe-e29d-4c70-92c7-fa657dd8d57b.png)

### 3.支持 MCP 拓展

iFlow CLI 通过心流 MCP 市场，快速安装 MCP 到 iFlow CLI 中，并且所有的 MCP 都是经过安全认证，稳定性高。

在 MCP 市场找到需要的 MCP，跟着步骤安装即可：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756734782387-b3745fcd-5e0b-4038-96ad-952ce3b921f8.png)

使用时输入 `/mcp` 即可查看 MCP 支持的命令，比如使用 `/mcp list` 查看已安装的 MCP 工具：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756735739521-173758ee-4448-455c-87f5-f54b0d85c0bb.png)

### 4.多智能体协作

iFlow CLI 支持**多个智能体进行协作**，官方提供了很多专家级别的智能体可以选择，使用前可以在 [https://platform.iflow.cn/agents](https://platform.iflow.cn/agents) 中选择需要的智能体进行安装。

通过多个专家智能体可以为我们提供更加专业、更加准确的建议。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1756736062319-f92f581c-9e7e-4078-80bd-b9d89c8a4510.png)

## 五、使用场景 ☁️

前面我们重点介绍了 iFlow CLI 在编程开发中的强大功能，但它的应用远不止于此。接下来，Chris 将为大家展示更多 iFlow CLI 能够胜任的任务场景，希望能给大家一些启发。

- 📊 信息查询与规划

> > 帮我找到北京评分最高的餐厅，制定一个 3 天的美食之旅行程。
>
> > 搜索最新的 iPhone 价格对比，找到最具性价比的购买方案。

- 📁 文件管理

> > 将我桌面上的文件按文件类型整理到不同的文件夹中。
>
> > 批量下载这个网页上的所有图片，并按日期重命名。

- 📈 数据分析

> > 分析这个 Excel 表格中的销售数据，生成简单的图表。
>
> > 从这些 CSV 文件中提取客户信息，合并成统一的表格。

- 👨‍💻 开发支持

> > 分析这个系统的主要架构组件和模块依赖关系。
>
> > 我的请求后出现了空指针异常，请帮我找到问题原因。

- ⚙️ 工作流自动化

> > 创建一个脚本，定期将我的重要文件备份到云存储。
>
> > 编写一个程序，每天下载股票价格并发送邮件通知。

官方还有一些其他使用场景可以参考：[https://platform.iflow.cn/cli/scenarios](https://platform.iflow.cn/cli/scenarios)

## 六、总结 📝

iFlow CLI 是一款强大的终端 AI 助手，通过自然语言交互，帮助**开发者高效完成代码分析、编程开发等任务**。还免费提供 Kimi K2 等顶尖 AI 模型。除了编程，iFlow CLI 还能**胜任信息查询、文件管理、数据分析和工作流自动化等多种任务场景**。
