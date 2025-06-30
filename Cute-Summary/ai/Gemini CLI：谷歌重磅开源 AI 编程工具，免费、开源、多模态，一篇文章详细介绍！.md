![](https://cdn.nlark.com/yuque/0/2025/png/186051/1750904049803-0e758f47-b619-414d-80db-8288dc3d520a.png)

就在昨晚，谷歌正式推出了 Gemini CLI 开源 AI 编程工具，**不仅开源免费，还支持多模态**，狠狠对标了 Claude Code。

Gemini CLI 直接将 Gemini 2.5 Pro 强大的 AI 能力直接融入到开发者熟悉的命令行终端中，同时可以使用谷歌最新发布的视频模型  Veo 和图像模型 Imagen，还集成了 MCP、谷歌搜索、自定义自动化等众多实用功能，简直太方便了。

> GitHub 地址：[https://github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1750897947052-559ce487-5b1f-4c12-8420-c7fe3a38c892.png)

## 一、使用方式

使用 Gemini CLI 非常简单，只需满足以下前提条件：电脑上**安装了 Node.js 18 或更高版本**。然后按照以下步骤操作：

1. **安装 Gemini CLI**：在终端中执行以下命令进行安装

```plain
npx https://github.com/google-gemini/gemini-cli
```

或者

```plain
npm install -g @google/gemini-cli
```

2. **运行 Gemini CLI**：在终端中执行以下命令运行

```plain
gemini
```

3. **选择主题并授权**：首次运行时，选择一个主题，然后登录个人谷歌账号进行授权，即可开始使用。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1750904711964-e453f576-e2e9-466b-ad62-27dadfebf701.png)

如果需要使用特定模型，或者免费额度不够用，可以**去 Google AI Studio 生成一个 API Key**，通过环境变量配置：

```plain
export GEMINI_API_KEY="你的apikey"
```

> Google AI Studio：[https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

4. 开始使用：登录完成后，输入 gemini 就可以开始正常使用。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1750905006153-b3ca1ae5-3015-43e5-8210-aea3971d6a00.png)

## 二、核心功能

### 1.强大的 Gemini 2.5 Pro 模型

Gemini CLI 内置谷歌 Gemini 2.5 Pro 模型，支持**高达 100 万个 token 的上下文窗口**，开发者可以将整个中大型项目的代码库都交给它处理，进行分析架构、梳理逻辑、大规模重构，都能搞定。

### 2.免费且额度充足

开发者只需**使用个人谷歌账号登录**，即可免费使用 Gemini CLI，**免费额度包括每分钟 60 次请求、每天 1000 次请求**，这在业内属于最高水平，几乎不会遇到限制。

### 3.多模态 AI 能力融合

Gemini CLI 不仅支持**文本交互**，还能调用谷歌的多种 AI 模型，实现**多模态内容的生成**。如 Imagen 生成图片、Veo 生成视频。

### 4.与谷歌搜索实时联网

Gemini CLI 支持谷歌搜索实时联网，能够**为模型提供外部上下文**。开发者在使用过程中可以直接从网络上获取最新的信息，让 AI 的回答更具时效性和准确性。

### 5.支持 MCP 和扩展

Gemini CLI 内置**支持模型上下文协议（MCP）**，极大地扩展了智能体的能力。开发者可以根据自己的需求添加数千个功能，实现更强大的自动化和集成。

### 6.可自定义提示词和指令

开发者可以自定义提示词和指令，让 Gemini 更好地适应个人或团队的工作流。例如，可以设置 Gemini 在特定情况下自动执行某些操作，或者在处理特定类型的文件时采用不同的策略。

### 7.非交互式调用与自动化集成

Gemini CLI 可以在脚本中非交互式调用，实现**任务的自动化和与现有工作流程的无缝集成**。例如，开发者可以设置智能体在每天特定时间自动执行某些任务，如生成报告、发布内容等。

## 三、开源介绍

Gemini CLI 采用  Apache 2.0 许可证完全开源，GitHub 仓库地址：[https://github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1750898251454-7274a0c5-c87b-4759-9855-a14878d285b0.png)

开发者可以：

1. 查看源代码，了解其工作原理
2. 验证安全性，确保没有后门
3. 报告错误、建议功能、贡献代码，参与项目改进
4. 根据需求自由定制

Google 欢迎全球开发者参与 Gemini CLI 项目，报告 bug、提出功能建议、改进安全实践。

## 四、内置 CLI 命令

Gemini CLI 内置丰富的命令可以使用，详细可以查阅：[https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1750898552211-e6ce3512-fa07-4b31-9e62-25f10777bda3.png)

然后在对话框中使用即可：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1750905100882-53e7ec72-877f-4fa2-af50-4c6b6963505c.png)

## 五、CLI 配置介绍

Gemini CLI 提供了多种配置其行为的方法，包括环境变量、命令行参数和设置文件。详细可以查阅：[https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1750901606860-40acdd92-59c1-47d0-bf29-18f368ff985f.png)

## 六、故障排查指南

Gemini CLI 官方也提供了一份详细的常见问题的解决方案和调试方式，详细可以查阅：[https://github.com/google-gemini/gemini-cli/blob/main/docs/troubleshooting.md](https://github.com/google-gemini/gemini-cli/blob/main/docs/troubleshooting.md)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1750898622418-830fc821-ae5e-444d-b357-539478661a24.png)
