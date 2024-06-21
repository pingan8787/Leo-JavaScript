今天 OpenAI 竞争对手 Anthropic 发布了全新 AI 大模型 Claude 3.5 Sonnet，全量上线到网页版和 App 端，简直是太爆炸了。

官网地址：https://claude.ai/

目前 Claude 系列模型包括：

- **Haiku**：小杯，Claude 最快的模型，可以执行**轻量级**操作，速度领先行业。
- **Sonnet**：中杯，Claude 性能和速度的最佳组合，可**实现高效**、高吞吐量的任务。
- **Opus**：大杯，Claude 性能最高的模型，可以处理**复杂的分**析、具有许多步骤的较长任务以及高阶数学和编码任务。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1718927214463-a6274125-bcb2-4528-a1d9-999c78b2e7c6.png#averageHue=%23000000&clientId=u39bf8a5f-1f36-4&from=paste&height=400&id=u0a810381&originHeight=800&originWidth=995&originalType=binary&ratio=2&rotation=0&showTitle=false&size=58817&status=done&style=none&taskId=u86b8f1c0-acb6-4ea3-9b78-de27c4420ac&title=&width=497.5)

Anthropic 将在今年晚些时候发布 Claude 3.5 Haiku 和 Claude 3.5 Opus，完成 Claude 3.5 模型系列。

## 1.Claude 3.5 Sonnet 介绍

此次发布的 Claude 3.5 Sonnet 是 **Sonnet 模型的升级版**，介绍如下：

> Claude 3.5 Sonne 为研究生水平推理（GPQA）、本科水平知识（MMLU）和编码熟练程度（HumanEval）设定了新的行业基准。它在把握细微差别、幽默和复杂指令方面表现出显著的进步，并且在以自然、相关的语气编写高质量内容方面表现出色。

> Claude 3.5 Sonnet 运行速度是 Claude 3 Opus 的两倍。这种性能提升与经济高效的定价相结合，使 Claude 3.5 Sonnet 成为复杂任务的理想选择，例如上下文相关的客户支持和协调多步骤工作流程。

并且 Claude 3.5 Sonnet 在大多数测试中，都能超越 Claude3 Opus、GPT4-o、Gemini1.5 Pro 等。

![](https://cdn.nlark.com/yuque/0/2024/webp/186051/1718927698224-687d8d32-f7a4-4449-92fc-7b1422f44f9a.webp#averageHue=%23f8f8f8&clientId=u39bf8a5f-1f36-4&from=paste&id=ua7748c2f&originHeight=1894&originWidth=2200&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u9c463dd9-112f-44e4-a7ad-de376197acd&title=)

当然，Claude 3.5 Sonnet 的多模态视觉能力也得到很大提升，在标准视觉基准上超过了 Claude 3 Opus。不仅可以很好的进行视觉推理，比如解释图表和图形，还可以从不完美的图像中准确转录文本，更深层的理解内容。

![](https://cdn.nlark.com/yuque/0/2024/webp/186051/1718928194355-bcdbd45d-1e6e-4f58-acfa-6e06d780cff5.webp#averageHue=%23f8f7f7&clientId=u39bf8a5f-1f36-4&from=paste&id=u07a2952c&originHeight=1110&originWidth=2200&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ue06805ae-7f7a-4510-985a-b581c3975b7&title=)

Claude 3.5 Sonnet 在视觉数学推理 (MathVista)、科学图表理解 (AI2D)、图表问答、文档视觉问答 (ANLS)能够遥遥领先，而视觉问答（MMMU）方面仅落后 GPT-4o 一点点。

## 2.全新 Artifacts 对话交互

Artifacts 是一项**扩展用户与 Claude 互动方式**的新功能。当用户要求 Claude 生成**代码片段**、**文本或网站**等时，Artifacts 会在页面右侧打开一个新窗口，用来**实时查看和编辑 Claude 生成的代码**，还有执行结果，用起来非常方便。

启用 Artifact 方式如下：

1. 打开页面右上角，点击 Feature Preview 菜单；
2. 开启 Artifact。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1718929465444-aa28aabc-920b-4382-b2e5-75d6423838f0.png#averageHue=%23787875&clientId=u39bf8a5f-1f36-4&from=paste&height=1566&id=u77d28f6c&originHeight=1566&originWidth=2464&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1018452&status=done&style=none&taskId=ue819a428-a21f-423e-a427-e0ebc2be976&title=&width=2464)

接下来 Chris 让 Claude 实现下面需求：

> 使用 HTML + CSS + JS 实现一个博客页面

这时候，Artifacts 就会随着内容回复，出现在右侧：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1718926545122-740720ca-bf6c-44a7-b175-7b35a22426a6.png#averageHue=%239eded1&clientId=u39bf8a5f-1f36-4&from=paste&height=925&id=dI7mx&originHeight=1850&originWidth=3508&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2067778&status=done&style=none&taskId=u427d5e6c-13cb-4696-a936-77085e76eb9&title=&width=1754)

回答完成后，还可以直接查看代码执行的结果，Chris 实现的是一个博客主页，于是就可以在 Artifacts 直接看到博客主页的效果了：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1718928683864-098fb1e2-c905-44ea-adc0-b30f3a6fb1e3.png#averageHue=%23eeede9&clientId=u39bf8a5f-1f36-4&from=paste&height=1824&id=u4a115ff7&originHeight=1824&originWidth=3518&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1943130&status=done&style=none&taskId=u9336f94a-1302-40da-84a3-2bef526e50c&title=&width=3518)

接下来 Chris 又让 Claude 写个小游戏：

> 使用 JS 实现一个情人节主题的贪吃蛇游戏，使用爱心作为贪吃蛇的头，可以直接预览。

[](https://www.yuque.com/attachments/yuque/0/2024/mov/186051/1718929784530-42057a1b-f421-49ce-94e9-1cadc2277d8c.mov?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2024%2Fmov%2F186051%2F1718929784530-42057a1b-f421-49ce-94e9-1cadc2277d8c.mov%22%2C%22name%22%3A%22%E5%BD%95%E5%B1%8F2024-06-21%2008.26.32.mov%22%2C%22size%22%3A36834780%2C%22ext%22%3A%22mov%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22ue26f5577-c8a2-4368-8fda-5c481bfb3a7%22%2C%22taskType%22%3A%22upload%22%2C%22type%22%3A%22video%2Fquicktime%22%2C%22__spacing%22%3A%22both%22%2C%22id%22%3A%22ubbb96be3%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D)

简直太炸裂了！**这才是我们生成代码的理想交互**，边生成，边看执行结果。

## 3.Claude 3.5 Soneet 价格

升级后的 Claude 3.5 Sonnet 价格和 Claude 3 Sonnet 保持一致，即：

- 输入: $3 / 100 万 token
- 输出：$15 / 100 万 token

而 Claude 3 Opus 的价格为：

- 输入: $15 / 100 万 token
- 输出：$75 / 100 万 token

大家觉得 Claude 3.5 Sonnet 怎么样呢？
