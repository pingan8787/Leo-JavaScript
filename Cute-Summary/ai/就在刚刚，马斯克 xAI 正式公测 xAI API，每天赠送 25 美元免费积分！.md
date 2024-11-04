今天一大早，看到马斯克 xAI 正式公测 xAI API，并且每天赠送 25 美元免费积分，太良心了。Chris 也在自己的软件中第一时间集成。

Chris 课代表简单列举下 xAI API 核心内容：

- 主页地址：[http://console.x.ai/](http://console.x.ai/)
- 支持 128k token 上下文
- 支持**函数调用**（Function Call）
- 支持**自定义系统提示**
- 兼容 OpenAI 和 Anthropic SDK
- 截止 2024 年年底前**每月 25 美元的免费积分**

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1730761245611-6064c189-feb5-41eb-9c73-74cce3284e05.png)

需要注意的是：

- 如果之前已经购买了积分，现在将获得等值的额外免费积分
- 算起来其实是 11 月和 12 月赠送免费积分

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1730762308961-82063a04-7cad-4b0f-b4c2-3bffb2439dfe.png)

# 模型介绍

此次 xAI 推出的新 Grok 模型为 `grok-beta`，性能与 Grok 2 相当，但效率、速度和功能都有所提高，可用于各种任务，包括**生成和理解文本、代码和函数调用**。

# 快速使用

使用 xAI API 前，需要在 [https://console.x.ai/](https://console.x.ai/) 注册账号，然后按照下面方式使用：

> 后台地址：[https://console.x.ai/](https://console.x.ai/)
>
> 文档地址：[https://docs.x.ai/docs](https://docs.x.ai/docs)

## 1.创建 API 密钥

首先进入 xAI API 后台创建一个新 API 密钥，用来请求 xAI API，需要妥善保存好：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1730762617060-61d7eda8-8332-4710-8bdd-14ebd33a9efc.png)

## 2.使用 curl 接入

xAI API 支持多种接入方式，比如常见的 curl，测试代码如下：

```python
curl https://api.x.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -d '{
        "messages": [
            { role: "system", content: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy." },
            { role: "user", content: "详细介绍 AI 工具派" },
        ],
        "model": "grok-beta",
        "stream": false,
        "temperature": 0
      }'
```

并且还支持 REST API、gRPC API 或 SDK 与 xAI API 集成，因为 xAI API 与 OpenAI 和 Anthropic 兼容。

## 3.使用 OpenAI SDK 和 Anthropic SDK 接入

xAI API 提供与 OpenAI SDK 和 Anthropic SDK 的兼容性，开发者可以以最少的修改进行接入。开发者只需要把 `base_url` 改成`https://api.x.ai/v1`，即可通过 xAI API 密钥调用不同 Grok 模型。

### OpenAI SDK

#### JavaScript 使用

开发者可以将 OpenAI 客户端从 `openai` 导入到 Javascript 项目中，并更改 `baseURL` 和 API 密钥：

```javascript
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: "<api key>",
  baseURL: "https://api.x.ai/v1",
});

const completion = await openai.chat.completions.create({
  model: "grok-beta",
  messages: [
    {
      role: "system",
      content:
        "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
    },
    { role: "user", content: "详细介绍 AI 工具派" },
  ],
});

console.log(completion.choices[0].message);
```

#### Python 使用

开发者也可以使用 `openai` 库与 Python 应用中的 Grok API 进行交互。

```python
import os
from openai import OpenAI

XAI_API_KEY = os.getenv("XAI_API_KEY")
client = OpenAI(
    api_key=XAI_API_KEY,
    base_url="https://api.x.ai/v1",
)

completion = client.chat.completions.create(
    model="grok-beta",
    messages=[
        {"role": "system", "content": "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy."},
        {"role": "user", "content": "详细介绍 AI 工具派"},
    ],
)

print(completion.choices[0].message)
```

### Anthropic SDK

#### JavaScript 使用

开发者可以从 `@anthropic-ai/sdk` 导入 Anthropic SDK，并使用它通过 xAI API 密钥创建客户端实例。

```javascript
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: "<api key>",
  baseURL: "https://api.x.ai/",
});

const msg = await anthropic.messages.create({
  model: "grok-beta",
  max_tokens: 128,
  system:
    "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
  messages: [{ role: "user", content: "详细介绍 AI 工具派" }],
});

console.log(msg);
```

#### Python 使用

同样，在 Python 中，您可以使用 `Anthropic` 类创建客户端并向 Grok 模型发送消息：

```python
import os
from anthropic import Anthropic

XAI_API_KEY = os.getenv("XAI_API_KEY")
client = Anthropic(
    api_key=XAI_API_KEY,
    base_url="https://api.x.ai",
)
message = client.messages.create(
    model="grok-beta",
    max_tokens=128,
    system="You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
    messages: [ {role: "user", content: "详细介绍 AI 工具派"} ],
)
print(message.content)
```

###
