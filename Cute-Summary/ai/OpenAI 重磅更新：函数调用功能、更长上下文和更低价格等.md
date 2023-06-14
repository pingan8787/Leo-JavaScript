![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1686699272337-148819d3-77ce-498d-a2d3-a45b07bc4567.png#averageHue=%233a013a&clientId=u94980313-18f9-4&from=paste&height=904&id=u8897157a&originHeight=904&originWidth=1499&originalType=binary&ratio=1&rotation=0&showTitle=false&size=435554&status=done&style=none&taskId=udeaffcb5-0369-4a35-b873-4f7e990175e&title=&width=1499)

今天 Open AI 发布了一堆重磅更新，Chris 为大家总结一下：

- 更加灵活可控制的新版 GPT-4 和 3.5 Turbo 模型
- 新的 16k 上下文 3.5 Turbo 模型（今天向所有人提供）
- Embeddings 和 GPT-3.5 Turbo 降价
- 新增 Chat Completions API 中的函数调用功能
- GPT-4 的 API 权限将开放给更多的人
- 多个模型即将弃用

看完更新内容 Chris 最大的感受就是**非常良心**，**加量减价**。

接下来一起详细看看，如果需要的话，你也可以查看[更新原文](https://openai.com/blog/function-calling-and-other-api-updates)：

## 1. 函数调用

开发人员现在可以向 **gpt-4-0613** 和 **gpt-3.5-turbo-0613** 发送所需要描述的函数，并让 GPT 模型智能地选择输出一个包含调用该函数所需参数的 JSON 对象。这是 GPT 能力更可靠地连接到外部工具和 API 的新方法。

这些模型已经针对检测何时需要调用函数(取决于用户的输入)进行了微调，并响应符合函数签名的 JSON。函数调用允许开发人员更可靠地从模型中获取结构化数据。例如，开发人员可以：

- 创建聊天机器人，通过调用外部工具(例如 ChatGPT 插件)回答问题

比如将问题“_给 Anya 发邮件，看她下周五是否想喝咖啡_”这样的查询转换为“`send_email(to: string, body: string)`”的函数调用方式，或者将问题“_波士顿的天气如何？_”转换为“`get_current_weather(location: string, unit: 'celsius' | 'fahrenheit')`”的函数调用方式。

- 将自然语言转换为 API 调用或数据库查询

比如将问题“_谁是我这个月的十大客户？_”转换为内部 API 调用，比如 `get_customers_by_revenue(start_date: string, end_date: string, limit: int)`，或者将问题“_Acme, Inc.上个月有多少订单？_”转换成 SQL 查询，使用`sql_query(query: string)`。

- 从文本中提取结构化数据

定义一个名为 `extract_people_data(people: [{name: string, birthday: string, location: string}])`的函数，就可以从维基百科文章中提取所有提到的人。

这些用例由 OpenAI 在 `/v1/chat/completions` 端点中的新 API 参数、`functions` 和 `function_call` 实现，使开发人员能够通过 JSON Schema 通过 JSON 描述函数，并可选地要求它调用特定函数。
如果开发者发现函数调用可以改进的话，可以使用 OpenAI 的[开发者文档](https://platform.openai.com/docs/guides/gpt/function-calling)并添加评估。

### 函数调用示例

这里以问题“_波士顿现在的天气怎么样？_”进行介绍，只需要通过 3 个步骤即可完成调用：

1. 使用函数和用户输入调用模型

请求报文：

```bash
curl https://api.openai.com/v1/chat/completions -u :$OPENAI_API_KEY -H 'Content-Type: application/json' -d '{
  "model": "gpt-3.5-turbo-0613",
  "messages": [
    {"role": "user", "content": "What is the weather like in Boston?"}
  ],
  "functions": [
    {
      "name": "get_current_weather",
      "description": "Get the current weather in a given location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA"
          },
          "unit": {
            "type": "string",
            "enum": ["celsius", "fahrenheit"]
          }
        },
        "required": ["location"]
      }
    }
  ]
}'
```

响应报文：

```bash
{
  "id": "chatcmpl-123",
  ...
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": null,
      "function_call": {
        "name": "get_current_weather",
        "arguments": "{ \"location\": \"Boston, MA\"}"
      }
    },
    "finish_reason": "function_call"
  }]
}
```

2. 使用模型响应调用 API

请求报文：

```bash
curl https://weatherapi.com/...
```

响应报文：

```bash
{ "temperature": 22, "unit": "celsius", "description": "Sunny" }
```

3. 将响应发送回模型以进行总结

请求报文：

```bash
curl https://api.openai.com/v1/chat/completions -u :$OPENAI_API_KEY -H 'Content-Type: application/json' -d '{
  "model": "gpt-3.5-turbo-0613",
  "messages": [
    {"role": "user", "content": "What is the weather like in Boston?"},
    {"role": "assistant", "content": null, "function_call": {"name": "get_current_weather", "arguments": "{ \"location\": \"Boston, MA\"}"}},
    {"role": "function", "name": "get_current_weather", "content": "{\"temperature\": "22", \"unit\": \"celsius\", \"description\": \"Sunny\"}"}
  ],
  "functions": [
    {
      "name": "get_current_weather",
      "description": "Get the current weather in a given location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA"
          },
          "unit": {
            "type": "string",
            "enum": ["celsius", "fahrenheit"]
          }
        },
        "required": ["location"]
      }
    }
  ]
}'
```

响应报文：

```bash
{
  "id": "chatcmpl-123",
  ...
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "The weather in Boston is currently sunny with a temperature of 22 degrees Celsius.",
    },
    "finish_reason": "stop"
  }]
}
```

4. 完成调用，返回回答内容“_波士顿目前天气晴朗，气温为 22 摄氏度。_”。

## 2. 新模型

### GPT-4 更新

- **gpt-4-0613** 版本包含一个更新和改进的模型，支持函数调用。
- **gpt-4-32k-0613** 版本与 **gpt-4-0613** 版本相同，但具有**更长的上下文长度**并且能**更好地理解更大的文本**。

接下来的几周内 OpenAI 将会邀请更多候补名单上的用户尝试 GPT-4，并希望最终完全取消等待名单。

### GPT-3.5 Turbo 更新

- **gpt-3.5-turbo-0613** 版本包含与 **GPT-4** 相同的**函数调用功能**，并且可以通过系统消息提供更可靠的引导能力，这两个功能使开发者能够更有效地引导模型的响应。
- **gpt-3.5-turbo-16k** 提供了 **gpt-3.5-turbo** 的四倍上下文长度，价格为 **$0.003/1K** 输入 token 和 **$0.004/1K** 输出 token。16k 上下文意味着该模型现在可以在单个请求中支持大约 20 页文本。

### 模型弃用

OpenAI 将开始升级和弃用在三月份宣布的初始版本的 gpt-4 和 gpt-3.5-turbo。在 6 月 27 日之前，使用稳定模型名称(**gpt-3.5-turbo**、**gpt-4** 和 **gpt-4-32k**)的应用程序将自动升级到上述新模型。
**gpt-3.5-turbo-0301**、**gpt-4-0314** 和 **gpt-4-32k-0314 **这些旧模型将于 9 月 13 日后无法使用，在此之后指定这些模型名称的请求将失败。

## 更低的定价

这些定价将从今天（2023.06.13）开始生效：

### Embeddings 定价

**text-embedding-ada-002 **是使用最广泛的嵌入模型。今天开始，其价格将降低了 75%，降至 **$0.0001/1K** token。

### GPT-3.5 Turbo 定价

**gpt-3.5-turbo** 是 OpenAI 最受欢迎的聊天模型，为数百万用户提供 ChatGPT 服务。今天开始，其价格将降低了 25%。开发人员现在可以使用该模型，仅需支付 `$0.0015/1K` 输入 token 和 **$0.002/1K** 输出 token，相当于每 1 美元大约可获得 700 页内容。
**gpt-3.5-turbo-16k** 将定价为 **$0.003/1K** 输入 token 和 **$0.004/1K** 输出 token。

以上就是 OpenAI 这次的重要更新内容，这让 Chris 更加期待不同应用场景使用这些最新模型和新功能了。
