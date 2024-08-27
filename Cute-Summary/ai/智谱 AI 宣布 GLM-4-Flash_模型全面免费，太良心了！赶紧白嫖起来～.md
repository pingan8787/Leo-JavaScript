就在今天，**智谱 AI **旗下的大模型开放平台宣布 **GLM-4-Flash 全面免费**，并且该**模型的微调也开启了限时免费活动**。

> 体验地址：[https://zhipuaishengchan.datasink.sensorsdata.cn/t/CA](https://zhipuaishengchan.datasink.sensorsdata.cn/t/CA)

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724737287641-6d01fda8-3d44-4cdb-84da-0aab926d1d18.png#averageHue=%2398e3d2&clientId=uc212a828-badd-4&from=paste&height=996&id=uacb887e7&originHeight=1992&originWidth=3802&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1505052&status=done&style=none&taskId=u3639d0b5-9b5f-4e46-acd4-bf746ee5028&title=&width=1901)

智谱 AI 将 **GLM-4-Flash 完全免费给用户使用**，对于**小公司或个人**来说非常不错，模型小、响应快，Chris 也可以基于此模型开发自己的产品啦～

## 一、GLM-4-Flash 介绍

**GLM-4-Flash 模型**是智谱 AI 第一个**免费**的大模型 API，速度极快，可以用在**文章创作**、**代码调试**、**代码生成**、**知识库问答**、**PPT 助手**、**思维导图生成**等场景。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724554872808-fcc6e5d6-f763-43a9-88b9-2e857b6936c5.png#averageHue=%23e3e5f1&clientId=u3aaed18e-1e19-4&from=paste&height=1824&id=u72db0f21&originHeight=1824&originWidth=3270&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1252545&status=done&style=none&taskId=ubeffa056-189f-402b-a8ae-c9c84e8613c&title=&width=3270)

**GLM-4-Flash 模型**的优势在于：

- **强大的推理能力**：支持 **128K 上下文推理**和**多语言处理**；
- **极快的生成速度**：生成速度大约在 72.14 token/s，约等于 115 字符/s；
- **支持函数调用**：其函数调用能力与 GPT-4 相当；
- **支持网页检索**：能够实时访问天气、新闻等信息。

## 二、GLM-4-Flash 使用

> 首先大家需要创建一个 API Key，后续都会使用这个 API Key 来使用 GLM-4-Flash 模型。  
> 网址：[https://bigmodel.cn/usercenter/apikeys](https://bigmodel.cn/usercenter/apikeys)

接下来 Chris 介绍下如何使用 GLM-4-Flash，主要包括非开发者和开发者的角度：

### 1.非开发者如何使用

非开发者可以借助一些第三方 AI 客户端（如 ChatBox、ChatAll 等），**通过配置 API Key 方式使用 GLM-4-Flash 模型**，非常简单，Chris 以 ChatBox 为例演示：

> ChatBox 官网：[https://chatboxai.app/](https://chatboxai.app/)

首先点击“**设置**”按钮，选择“**添加自定义提供方**”：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724555561946-291982d6-15a0-47b8-98db-250ee31a786a.png#averageHue=%23797876&clientId=u3aaed18e-1e19-4&from=paste&height=1840&id=u75a8fb0e&originHeight=1840&originWidth=2676&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1095278&status=done&style=none&taskId=u50a51237-2071-4b03-8434-e53371e251c&title=&width=2676)

然后填写模型提供方的配置信息，大家可以按照下面配置：

- **名称**：可以随便写个名称，方便知道找到这个配置；
- **API 域名**：填写 [https://open.bigmodel.cn](https://open.bigmodel.cn) 即可；
- **API 路径**：填写 /api/paas/v4/chat/completions 即可；
- **API 密钥**：填写前面创建的 API Key 即可；
- **模型**：填写“GLM-4-Flash”即可。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724555746306-4e123894-8fb4-442c-ad59-3fc5eab9df9f.png#averageHue=%23797876&clientId=u3aaed18e-1e19-4&from=paste&height=1854&id=uf6d3ac2c&originHeight=1854&originWidth=2680&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1131384&status=done&style=none&taskId=u659d32bd-b3c8-4dd9-a2f2-90f912056ab&title=&width=2680)

配置完成后，就可以在对话框中进行测试，如果 GLM-4-Flash 能够正常响应，就表示配置成功：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724556289775-b5407d01-60d3-4f6d-a87d-cd96ab67b767.png#averageHue=%23ede8e0&clientId=u60c83fc1-dfc7-4&from=paste&height=1840&id=ue96a25b9&originHeight=1840&originWidth=2676&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1177022&status=done&style=none&taskId=u6f38b96e-7edd-44f1-8dbc-44d79a9af0f&title=&width=2676)

接下来就可以自由使用了。

### 2.开发者如何使用

开发者同样可以轻松的将 GLM-4-Flash 模型集成到自己的应用中。开发者在模型体验页面中，点击“**查看代码**”，然后“**复制代码**”，再将代码中添加自己的 API Key：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724557678906-860c93c8-e9cb-497d-803c-1b45e9ce6d4e.png#averageHue=%23588352&clientId=u60c83fc1-dfc7-4&from=paste&height=1826&id=ub22b63dd&originHeight=1826&originWidth=3278&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1318032&status=done&style=none&taskId=ub084c9eb-9a47-4066-81b4-c91060c26ca&title=&width=3278)

上面是 Python 代码，对于其他语言也可以直接使用 HTTP 请求的方式对接，详细的对接方式和参数说明，可以查看官方接口文档：

> API 接口文档：[https://open.bigmodel.cn/dev/api#glm-4](https://open.bigmodel.cn/dev/api#glm-4)

下面是使用 JavaScript 示例代码：

```javascript
const apiKey = "<你的apikey>";
const url = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

const data = {
  model: "glm-4",
  messages: [{ role: "user", content: "你好" }],
};

fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

也可以参考下面 curl 请求：

```javascript
curl --location 'https://open.bigmodel.cn/api/paas/v4/chat/completions' \
--header 'Authorization: Bearer <你的apikey>' \
--header 'Content-Type: application/json' \
--data '{
    "model": "glm-4",
    "messages": [
        {
            "role": "user",
            "content": "你好"
        }
    ]
}'
```

如果要使用 GLM-4-Flash 的工具，比如**网页检索**、**知识库检索**、**函数调用**等，需要在请求参数 `tools`中配置。

## 三、场景示例

通过前面两种方式，大家就可以使用上免费版的 GLM-4-Flash 模型了，接下来看下 GLM-4-Flash 在常用场景中表现如何：

### 1.知识问答

**知识问答是比较常用的一种场景**，Chris 以最近非常火爆的“黑神话：悟空”为例进行提问，问题如下：

```javascript
介绍一下黑神话悟空，为什么这么火？
```

可以看到 GLM-4-Flash 给出了**非常新的回答**，这样就能快速了解一些最新问题：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724576075205-eebc5e72-1623-4adf-9bcf-f2941f03f861.png#averageHue=%23eba597&clientId=udf9a30c7-55f1-4&from=paste&height=1360&id=u43ddc68d&originHeight=1360&originWidth=2278&originalType=binary&ratio=1&rotation=0&showTitle=false&size=741057&status=done&style=none&taskId=ucd4de5d5-5dd8-40a3-8052-34cec8d1ce0&title=&width=2278)

### 2.文章创作

GLM-4-Flash 根据输入的标题、主题、风格等要求生成文章，可以很好的提高写作效率和质量，比如以鲁迅体写一则西游记故事：

```javascript
## Goals
请用鲁迅体写一段 400 字左右的西游记故事，讲述取经四人的小故事。

## Output Format
鲁迅体风格经常使用短语、短句进行叙述
如："我大抵是..."、"没由来的"、"横竖都...."、"一个...，另一个...,"、"黯黯然看着.."
```

生成的文章内容，还是符合 Chris 的要求的：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724569969207-65f4626b-38fe-43aa-a24e-7c02033cacbc.png#averageHue=%23f1f1f1&clientId=udf9a30c7-55f1-4&from=paste&height=1092&id=u186bc86f&originHeight=1092&originWidth=2044&originalType=binary&ratio=1&rotation=0&showTitle=false&size=566423&status=done&style=none&taskId=u068b3938-e8e4-41a5-9980-8fadb1fbe38&title=&width=2044)

### 3.思维导图生成器

GLM-4-Flash 模型能够**创建并预览 Mermaid 格式的思维导图**，有效辅助我们梳理知识点。例如，生成“西游记核心人物关系”的思维导图：

```javascript
# Role: 思维导图生成器
## Goals
使用Mermaid格式生成一个展示西游记核心人物关系的思维导图。

## Constrains
保持西游记核心人物，确保思维导图的清晰性和连贯性，准确使用Mermaid语法，不使用书名号。

## Skills
精通Mermaid语法，理解西游记内容，能够将复杂思想组织成层次结构。

## Output Format
Mermaid语法的思维导图。

## Workflow
分析西游记核心人物的关系，将其结构化成适合思维导图的层次格式，将结构转换成Mermaid语法。
```

生成结果如下，非常直观：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724570503225-ceb1998d-9278-4ed4-8e2b-770881804055.png#averageHue=%23f6f4f3&clientId=udf9a30c7-55f1-4&from=paste&height=1362&id=u5f58f920&originHeight=1362&originWidth=2220&originalType=binary&ratio=1&rotation=0&showTitle=false&size=586051&status=done&style=none&taskId=uaa75f361-6a67-4faf-998c-da4769be0a0&title=&width=2220)

### 4.代码调试助手

GLM-4-Flash 模型具备**理解代码**的能力，并能够进行**代码调试**，提出**改进建议**。此外，它还能提供修改后的代码：

```javascript
#  Role: 代码调试助手 : 帮助用户找到并解决代码中的错误

## Constrains
保持用户原有代码的意图和结构，不引入新的错误。

## Skills
- 理解并分析代码逻辑
- 识别常见的编程错误
- 提供实用的调试技巧

## Workflow:
1. 读取并理解用户提供的代码和问题描述。
2. 分析代码，找出可能的错误或问题。
3. 提供具体的中文调试建议和步骤。
4. 确保建议简洁明了，易于执行。

需要检查和改进的代码：
const apiKey = '<你的apikey>';
const url = 'https://open.bigmodel.cn/api/paas/v4/chat/completions;
const data = {
  model: "glm-4"
};
```

很明显，GLM-4-Flash 发现代码中的问题，并进行改正：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724570788574-87a9c358-87db-469c-9275-c4988d1bb983.png#averageHue=%23503c1d&clientId=udf9a30c7-55f1-4&from=paste&height=1370&id=u3c33ce5c&originHeight=1370&originWidth=2242&originalType=binary&ratio=1&rotation=0&showTitle=false&size=734414&status=done&style=none&taskId=u3a2e954e-151e-4809-b51c-f0db18854e9&title=&width=2242)

### 5.实时查询

GLM-4-Flash 模型具备**实时信息检索和总结**的功能，极大地便利了需要频繁查找信息的用户。例如，Chris 可以轻松查询最近 10 条国内 AI 领域的重要新闻：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1724679660631-d8de2eaa-9eb2-409e-9d06-a9306ac77b75.png#averageHue=%23ecae9a&clientId=udf9a30c7-55f1-4&from=paste&height=1698&id=u5973511f&originHeight=1698&originWidth=2610&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1034506&status=done&style=none&taskId=u2a54a5bc-cdfe-4d20-a9ee-f862031a15a&title=&width=2610)

以上简单介绍了几个常见使用场景，更多使用常见大家可以自行体验。

## 四、总结

Chris 体验下来，觉得智谱 AI 这次推出的 GLM-4-Flash 免费模型非常不错，很**适合一些小公司及个人用户**，可以按照自己的需求来**选择合适的模型**，或者**微调自己的模型**。
大家有需要的话，也记得抓紧薅起来啦～

点击下方“阅读原文”即可体验！
