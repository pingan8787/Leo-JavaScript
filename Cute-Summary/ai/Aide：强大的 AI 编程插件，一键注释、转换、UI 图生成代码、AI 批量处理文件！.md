今天 Chris 给大家推荐的工具是 **Aide**，一款非常强大 AI 辅助开发 VSCode 拓展，快来一起看看吧。

> 🌟 工具名称：Aide  
> 🔗 工具地址：[https://aide.nicepkg.cn](https://aide.nicepkg.cn/)  
> 📦 开源仓库：[https://github.com/nicepkg/aide](https://github.com/nicepkg/aide)

## 一、工具介绍 🛠️

Aide 是一款**开源免费并且强大**的 AI 辅助开发 VSCode 扩展，帮助开发者提升编码体验。

以下是 Aide 的亮点介绍：

- 📚**提高代码可读性**：一键为代码添加详细注释，提高可读性，而无需修改原始文件。
- 🔄 **轻松代码转换**：将代码在不同语言或框架之间转换，使理解不熟悉的代码或迁移项目变得更容易。
- 🔮 **神奇的智能粘贴**：粘贴时智能转换剪贴板内容，包括将设计截图转换为 UI 代码。简化跨语言、跨框架开发和设计到代码的工作流程。
- 📋 **高效批量处理**：轻松使用 AI 处理多个文件或文件夹，显著提高您的生产力。
- 🏷️ **智能变量重命名**：获取 AI 驱动的变量名建议及解释，帮助您为代码选择最佳名称。
- 🤖 **可自定义 AI 命令**：创建并执行自定义 AI 命令，实现与代码库的灵活交互。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1723073436576-ccc505b8-5d01-4737-9707-1d00f64cbcf3.png#averageHue=%2390d7c5&clientId=u14541190-a6ab-4&from=paste&height=1972&id=u0145c601&originHeight=1972&originWidth=3742&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1760388&status=done&style=none&taskId=u3a71e42e-f844-43eb-b3b8-80cc0327c3e&title=&width=3742)

Chris 体验下来，发现部分功能的实际效果，还是取决于大模型能力，比如智能粘贴。

## 二、快速配置 🚀

接下来看下如何快速配置 Aide：

### 1.安装 Aide

首先进入 VSCode 拓展商店，搜索并安装 Aide：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1723073870994-44786964-f464-425d-b4fc-38a7eb0a61cc.png#averageHue=%23214049&clientId=u14541190-a6ab-4&from=paste&height=1906&id=u08e11b61&originHeight=1906&originWidth=2954&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1544256&status=done&style=none&taskId=udfcbbb86-20b6-49fb-ac7b-a7c8550f51a&title=&width=2954)

### 2.设置 Aide 配置

接下里需要配置 Aide 大语言模型等配置项，**Aide 支持非常多种大语言模型**，大家可以自行选择。  
Chris 使用的是量大管饱且非常便宜的 DeepSeek 模型，只要配置如下：

- **Openai Base Url**：[https://api.deepseek.com/v1](https://api.deepseek.com/v1)
- **Openai Key**：Deepseek API Key
- **Openai Model**：deepseek-coder
  > 详细配置介绍：[https://aide.nicepkg.cn/zh/guide/use-another-llm/deepseek](https://aide.nicepkg.cn/zh/guide/use-another-llm/deepseek)

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1723074435987-251d302c-7372-4a06-aa95-502e0dad4c54.png#averageHue=%23284751&clientId=u14541190-a6ab-4&from=paste&height=1874&id=u9081155d&originHeight=1874&originWidth=2604&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1034163&status=done&style=none&taskId=ufce0b865-13cd-4e96-92fb-087057bac66&title=&width=2604)

配置完成后，接下来就可以使用 Aide 各种功能啦～

## 三、核心功能 🔍

Aide 的核心功能包括：

1. **智能代码查看器助手**：添加 AI 生成的注释，使您的代码更易理解。
2. **智能代码转换**：在 AI 的协助下，将代码从一种编程语言转换为另一种。
3. **智能粘贴**：粘贴到不同文件类型时，智能转换剪贴板内容。
4. **AI 批量处理文件**：根据您的特定需求，使用 AI 处理多个文件。
5. **批量复制文件为 AI 提示词**：一键将多个文件格式化为 AI 交互提示。
6. **智能重命名变量**：获取 AI 对变量名的建议，以提高代码清晰度。
7. **自定义命令提问 AI**：在选定的文件或文件夹上执行自定义 AI 命令。

接下来一起详细了解下：

### 1.智能代码查看器助手

使用 AI 为整个文件或选定的代码添加注释，使其易于阅读。

使用方法：

- 在编辑器中选择代码。
- 点击右上角的书本图标或右键选择 **✨ Aide: 代码查看器助手**。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1723075565821-2613d9b8-3519-4cfe-b8fb-1d147d71997c.png#averageHue=%2322414a&clientId=u14541190-a6ab-4&from=paste&height=1858&id=u97a15fef&originHeight=1858&originWidth=2570&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1302005&status=done&style=none&taskId=u62ec54c4-b33a-41f8-ba36-c3e23833311&title=&width=2570)

### 2.智能代码转换

使用 AI 将整个文件或选定的代码**从一种编程语言转换为另一种**。支持任何语言。大部份语言支持高亮。

使用方法：

- 在编辑器中选择代码。
- 点击右上角的纸张图标或右键选择 **✨ Aide: 代码转换**。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1723075753759-9638063b-2f52-4590-9363-824f9b8f4721.png#averageHue=%231e3e47&clientId=u14541190-a6ab-4&from=paste&height=1870&id=u0c7efa67&originHeight=1870&originWidth=2576&originalType=binary&ratio=2&rotation=0&showTitle=false&size=906716&status=done&style=none&taskId=u79f4304e-81ca-4f20-9d65-09fee95abc6&title=&width=2576)

### 3.智能粘贴

使用 AI 智能识别**剪贴板里的代码或者图片**并进行格式转换，然后粘贴到当前编辑器中。可以显著提高开发效率，特别是在处理跨语言或跨框架的代码转换时。

使用方法：

- 从其他地方复制代码到剪贴板。
- 鼠标放在编辑器中想要粘贴的位置。（这个位置会影响粘贴结果）
- 右键菜单选择 **✨ Aide: 智能粘贴**。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1723075898555-9751348b-a32c-4a50-b7cf-c78bd4024e54.png#averageHue=%2338545f&clientId=u14541190-a6ab-4&from=paste&height=1872&id=u4d707edb&originHeight=1872&originWidth=2596&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1059946&status=done&style=none&taskId=uf3ecdafe-0a55-4913-8467-7dc33b1424e&title=&width=2596)

### 4.AI 批量处理文件

使用 AI 将**选中的多个文件代码根据你的需求处理**，比如添加注释、代码转换等，但是不支持具体业务需求、拆分多文件。所有的处理**不会修改源文件**。

使用方法：

- 在资源管理器中选择文件或文件夹。(多选方法：按住 Ctrl 或 Cmd 并点击文件或文件夹)
- 右键选择 **✨ Aide: AI 批量处理文件**。
- 输入您的代码加工处理要求。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1723076345876-7a937c6a-f3e0-4a60-b610-dc8e7a506035.png#averageHue=%2336535c&clientId=u14541190-a6ab-4&from=paste&height=1878&id=u2a29ba20&originHeight=1878&originWidth=2584&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1101240&status=done&style=none&taskId=u4d8ea113-32d0-4e56-bb21-dbbeb573483&title=&width=2584)

### 5.批量复制文件为 AI 提示词

将选定文件的内容复制到剪贴板，并**格式化为 AI 提示词**，方便直接在其他大语言模型中使用。

使用方法：

- 在资源管理器中选择文件或文件夹。(多选方法：按住 Ctrl 或 Cmd 并点击文件或文件夹)
- 右键选择 **✨ Aide: 复制为 AI 提示词**。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1723076580155-832d12ee-ee4f-44aa-a806-15341d7ba82f.png#averageHue=%2337545c&clientId=u14541190-a6ab-4&from=paste&height=1856&id=ubacf1908&originHeight=1856&originWidth=2566&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1154012&status=done&style=none&taskId=u15106a6a-fa48-4437-8e6e-861864646ea&title=&width=2566)

### 6.智能重命名变量

使用 AI 给出几个可能的变量名建议以及解释，帮助您**更快地重命名变量**。

使用方法：

- 在编辑器中选择变量。
- 点击右键选择 **✨ Aide: 重命名变量**。
- 选择一个建议的变量名。

### 7.自定义命令提问 AI

基于选定的文件和用户输入准备并执行自定义 AI 命令。

使用方法：

- 在资源管理器中选择文件或文件夹。(多选方法：按住 Ctrl 或 Cmd 并点击文件或文件夹)
- 右键选择 **✨ Aide: 问 AI**。
- 按提示输入您的问题。

## 四、同类产品比较

Aide 与 Copilot/Codeium/AmazonQ 的区别：

- 🚫 **无冗余功能**：Aide 专注于独特的、互补的功能，而不是复制现有工具。
- ⚡ **注重效率**：Aide 每个功能都经过精心设计，以实现最佳用户体验和实际效用。
- 💪 **质量优先**：Aide 优先考虑效果好的功能，避免那些在实际使用中效果不佳的功能。
- 🔓 **开源**：用户可以自由查看和贡献我们的源代码。
- 🛠️ **可定制**：使用用户偏好的 AI 模型，包括本地模型。

## 五、收费情况 💰

Aide 完全免费，并且完全开源，使用 MIT 协议。使用时需要自行配置大语言模型即可。

## 六、总结 📝

今天 Chris 分享的 Aide，是一款开源免费并且强大的 AI 辅助开发 VSCode 扩展，帮助开发者提升编码体验。

其中智能粘贴功能非常有趣，可以将图片等直接粘贴并生成代码，思路非常不错，但是**实际效果还是取决于大模型能力**。
