本地显卡不够、显存爆了、加载模型半天动不了？

Ollama 最近的「云模型」功能，可能正好能帮助到你。

## 一、Ollama 云模型是什么

如果你用过 Ollama，大概率是因为它能在本地跑各种大模型：

下载一个模型，用 `ollama run` 一敲，就能聊起来。

但问题也来了—— **模型太大了，本地电脑吃不消，**显存不够、风扇狂转、系统一卡一卡的。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1760493654898-5df46674-d291-4ed9-be3d-b94e7faa5656.png)

Ollama 新推出的云模型（Cloud Models）就是为了解决这个问题：

你还是用熟悉的命令，但模型不是在你电脑上跑的，而是在 Ollama 的云端跑完后，把结果传回来。

也就是说，**你能像本地一样用 Ollama，却能跑更大的模型。**

## 二、本地模式 vs 云模式

其实 Ollama 现在有两种运行方式：

| **模式**     | **本地模型（local）** | **云模型（cloud）**        |
| ------------ | --------------------- | -------------------------- |
| **运行位置** | 在你电脑上跑          | 在 Ollama 云端跑           |
| **算力需求** | 高，需要显卡支持      | 几乎不占本地资源           |
| **延迟**     | 很低                  | 会有点网络延迟             |
| **模型体积** | 受限于你电脑性能      | 想多大有多大（甚至上百 B） |
| **隐私性**   | 完全本地              | 数据需上传云端             |
| **成本**     | 免费（除了电费）      | 可能会按调用计费           |

一句话总结：

👉 **本地模型**：快，但受限于设备。

👉 **云模型**：灵活，不挑硬件。

## 三、支持的云模型

目前 Ollama 云端能用的模型都带 `-cloud` 后缀，目前仅支持：

- `deepseek-v3.1:671b-cloud`
- `gpt-oss:120b-cloud`
- `kimi-k2:1t-cloud`
- `qwen3-coder:480b-cloud`

这些名字后面都有个“-cloud”，代表模型在云端运行。

这些模型都是参数体量超大的模型，但你本地照样能用。

## 四、如何使用

其实用起来很简单，分三步就行 👇

### 步骤 1：登录账号

先登录 Ollama：

```plain
ollama signin
```

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1760493788992-a3c57f14-e525-4ee9-9742-03967552d7fc.png)

这里需要注意，需要把上面中的 `https://ollama.com/connect?name=.....`链接复制到浏览器打开，然后登录你的账号，确认授权：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1760494275168-4165dd26-9621-4094-a259-cbb4f1b3ef9e.png)

或者使用 API 时，把 Key 设置好：

```plain
export OLLAMA_API_KEY=你的密钥
```

获取 API Key： [https://ollama.com/settings/keys](https://ollama.com/settings/keys)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1760494412959-9d7a782e-fa06-476f-a3cb-92d4cecff053.png)

### 步骤 2：直接运行云模型

然后直接在终端运行模型，比如：

```plain
ollama run gpt-oss:120b-cloud
```

和本地模型几乎一样，只是这次在云端跑。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1760494196421-c926d1ee-332e-49ab-aad5-c1903f97b8a4.png)

### 步骤 3：用 API 调用（比如 Python）

想在自己的项目里接入也行。

示例代码如下：

```python
import os
from ollama import Client

client = Client(
    host="https://ollama.com",
    headers={'Authorization': 'Bearer ' + os.environ.get('OLLAMA_API_KEY')}
)

messages = [{'role': 'user', 'content': '为什么天空是蓝色的？'}]

for part in client.chat('gpt-oss:120b', messages=messages, stream=True):
    print(part['message']['content'], end='', flush=True)
```

就这样，你的本地脚本就能直接调用云端模型。

## 五、什么时候使用

Chris 这里帮你总结下：

✅ **用本地模型的情况：**

- 模型小，电脑能跑
- 想完全离线
- 不想上传任何数据

✅ **用云模型的情况：**

- 想跑大模型，电脑带不动
- 想省事，不折腾驱动和显卡
- 不介意稍微的网络延迟

很多人会两者结合：比如小任务用本地模型，大任务临时切云模型。更多介绍可以查看官网：[https://docs.ollama.com/cloud](https://docs.ollama.com/cloud)

## 六、使用注意

虽然云模型很方便，但也有一些要注意的：

1. **网络稳定很重要**：网络波动可能让调用中断，记得加重试机制。
2. **API Key 别泄露**：否则别人可能白嫖你的额度。
3. **费用问题**：官方现在还在预览期，可能未来会有计费。
4. **隐私数据要小心**：上传前记得脱敏。
5. **第一次会慢点**：云端模型有冷启动时间，多等几秒。

## 七、实战建议：从本地切换到云模型

假设你原本这样写的：

```plain
ollama run gpt-oss:20b
```

现在只要改成：

```plain
ollama run gpt-oss:120b-cloud
```

或者在代码里做个小判断 👇

```plain
model = "gpt-oss:120b-cloud" if use_cloud else "gpt-oss:20b"
```

这样就能随时切换运行模式，想本地跑就本地跑，想云跑就云跑。开发调试更灵活，也方便部署。

另外，在 Chris 开发的 AI 本地知识库软件 WiseMindAI 上，也即将支持 Ollama Cloud 模型了，预计 10 月底 v0.2.5 版本上线：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1760495733297-6400a79d-9944-4e9d-8d7b-77a55b8366f0.png)

## 八、收费情况

Ollama 的云服务包含小时和每日限制，以避免容量问题。目前支持免费和专业版订阅（20 美元），只是免费版的每日限制，官方还没有确定，目前可以免费使用：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1760495888411-05017e42-9b92-467e-9898-192ff7141c54.png)

## 总结

Ollama 的云模型功能，可以说是「**让你不买显卡，也能玩大模型**」，使用的时候：

- 调用方式跟本地一模一样；
- 不占本地算力；
- 能跑超大模型；
- 而且适合个人开发者和轻量部署。
