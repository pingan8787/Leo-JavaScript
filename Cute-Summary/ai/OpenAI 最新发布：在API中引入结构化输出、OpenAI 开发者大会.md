这周 OpenAI 可真活跃，Chris 还在吃昨天的瓜，今天 OpenAI 又发布了 2 条推文，简单总结就是：

- 在 API 中引入结构化输出
- OpenAI 开发者大会

接下来详细看看：

## 1.在 API 中引入结构化输出

> 详细可以查阅官网：[https://openai.com/index/introducing-structured-outputs-in-the-api/](https://openai.com/index/introducing-structured-outputs-in-the-api/)

### 1.1 背景介绍

去年 OpenAI 引入了 JSON 模式，用来让模型提高生成有效 JSON 输出的可靠性，但并**不能保证**模型的响应将符合特定的模式。因此此次 OpenAI 在 API 中引入结构化输出，**确保模型生成的输出与开发人员提供的 JSON 模式完全匹配的新功能**。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1722989308305-dba32bb1-3c50-41ef-a4ee-b165de5b7220.png#averageHue=%23111111&clientId=ua4baac95-1f08-4&from=paste&height=630&id=u385c2829&originHeight=630&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15769&status=done&style=none&taskId=ud3bfabaf-30be-456e-8c7f-93e1dc67614&title=&width=1200)

此次 OpenAI 还发布具有**结构化输出**的新模型 gpt-4o-2024-08-06，并且在对复杂 JSON 模式的评估中，新模型得分为 100%，相比之下，gpt-4-0613 得分不到 40%。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1722987509475-879aca6e-f226-4f3b-844c-2598fff1daa8.png#averageHue=%23f6e8dc&clientId=ua4baac95-1f08-4&from=paste&height=976&id=u064a0ba4&originHeight=976&originWidth=1718&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51126&status=done&style=none&taskId=ue792eeed-5ba1-483e-9222-2b2b2553867&title=&width=1718)

### 1.2 使用方式

目前有 2 种方式使用结构化输出，接下来结合代码示例简单介绍下：

1. **使用函数调用（Function calling）**

使用时，需要在请求参数 `tools`中定义 `strict: true` 使用，支持包括 gpt-4-0613 和 gpt-3.5-turbo-0613 及更高版本的模型。启用结构化输出后，模型输出将匹配提供的工具定义。

请求参数：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1722988049776-a5e3df8c-c5ff-40db-ae21-ea8f0377ffe6.png#averageHue=%23fcfbfa&clientId=ua4baac95-1f08-4&from=paste&height=1162&id=uc5bede45&originHeight=1162&originWidth=1484&originalType=binary&ratio=1&rotation=0&showTitle=false&size=167067&status=done&style=none&taskId=ue3e5ff5b-109c-461b-9b83-e7f56f1d3d7&title=&width=1484)
响应结果：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1722988076614-d195dfb6-8513-4b71-bcc4-9276ecfe0f4b.png#averageHue=%23fdfcfb&clientId=ua4baac95-1f08-4&from=paste&height=1170&id=u778b3b9f&originHeight=1170&originWidth=1496&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134548&status=done&style=none&taskId=u498da787-528e-44db-b8a2-226b9d05615&title=&width=1496)

2. **使用响应格式(response_format)**

使用时，开发者可以通过 `json_schema` 提供 JSON 模式添加 `response_format`参数使用结构化输出，这个功能支持今天发布的 gpt-4o-2024-08-06 和 gpt-4o-mini-2024-07-18 模型。

请求参数：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1722988505078-35f7e672-8898-4f94-bd24-dc2ccba7db18.png#averageHue=%23fcfcfc&clientId=ua4baac95-1f08-4&from=paste&height=1168&id=u87224597&originHeight=1168&originWidth=1526&originalType=binary&ratio=1&rotation=0&showTitle=false&size=188527&status=done&style=none&taskId=ua6b204b7-221b-4178-af20-3d52e85084c&title=&width=1526)

响应结果：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1722988516830-e42f49b8-2fe8-4bd4-ba13-c81ad0239304.png#averageHue=%23fcfbfb&clientId=ua4baac95-1f08-4&from=paste&height=910&id=uc9babdea&originHeight=910&originWidth=1532&originalType=binary&ratio=1&rotation=0&showTitle=false&size=100928&status=done&style=none&taskId=ud7b77035-c8c2-4c39-9910-cd3596daae9&title=&width=1532)

### 1.3 原生 SDK 支持

结构化输出还支持原生 SDK（Python 和 Node.js），通过 Pydantic 或 Zod 对象，SDK 会**将数据类型转换为受支持的 JSON 模式**，自动将 JSON 响应反序列化为类型化数据结构。

并且 SDK 也支持**函数调用**（Function calling）和**响应格式**(response_format)

> 详细演示代码，可以查阅官方示例：[https://openai.com/index/introducing-structured-outputs-in-the-api/](https://openai.com/index/introducing-structured-outputs-in-the-api/)。

## 2.OpenAI 开发者大会

一年一度的 OpenAI 开发者大会（OpenAI DevDay 2024），又要来啦！

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1722989320966-bffb397b-eda5-409a-8f13-4241bd93ea6d.png#averageHue=%23f2efee&clientId=ua4baac95-1f08-4&from=paste&height=675&id=u5e0c0e52&originHeight=675&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17985&status=done&style=none&taskId=uc0005b2e-7363-46c7-ac50-1ccc0d75c7c&title=&width=1200)
现在开发 3 场次报名：

- 旧金山，10 月 1 日
- 伦敦， 10 月 30 日
- 新加坡，11 月 21 日

报名地址：[https://openai.com/devday/](https://openai.com/devday/)
注意事项：

- 报名申请截止 8 月 15 日星期四；
- 报名成功，需要 450 美元；

活动包括：

- **Workshops**：分享关于 OpenAI 平台和 API 工具探索新的可能性；
- **分组会议**：由 AI 专家和社区成员住到，讨论模型定制、评估、可操纵性、扩展和各种其他主题；
- **Demo 演示**：与 OpenAI 产品和工程团队会面，了解 OpenAI 产品。
- **开发者活动**：看看开发者社区和顶级初创公司有意思的项目。
- **晚宴**：没啥。。
