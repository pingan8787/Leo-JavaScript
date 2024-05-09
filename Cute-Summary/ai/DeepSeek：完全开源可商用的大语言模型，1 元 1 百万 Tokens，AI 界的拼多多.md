今天 Chris 给大家推荐的工具是 DeepSeek，一款完全开源可商用的大语言模型，1 元 100 万 Tokens， 堪称 AI 界的拼多多，快来一起看看吧。

> 🌟 工具名称：DeepSeek AI  
> 🌐 使用环境：无需梯子  
> 🔗 工具地址：[https://www.deepseek.com](https://www.deepseek.com/zh)  
> 📦 Github 仓库：[https://github.com/deepseek-ai](https://github.com/deepseek-ai)  
> 🖥 开放平台：[https://platform.deepseek.com/](https://platform.deepseek.com/)

## 一、工具介绍 🛠️

DeepSeek 是一款由 DeepSeek AI 公司**开源的混合专家（MoE）语言模型**，**训练成本更低**、**推理更高效**，**完全开源**，可以免费提供商业用途。  
最近推出的 DeepSeek-V2 模型参数量更是达到了惊人的 236B，每个 token 激活 21B 参数，支持长达 128K token 的上下文长度，性能直逼 GPT-4-Turbo，而价格仅为其**近百分之一**。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1715260915435-6f102fd8-2173-4a8b-a968-345654abe028.png#averageHue=%23dfe8f8&clientId=u3a1d883e-37eb-4&from=paste&height=1804&id=u57fadbbe&originHeight=1804&originWidth=3406&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2393588&status=done&style=none&taskId=ubbfaf7ee-ba18-4b41-9083-8a8659a1748&title=&width=3406)
DeepSeek 的 DeepSeek-V2 综合能力在目前大模型主流榜单中，均表现出色：

1. **中文综合能力开源模型中最强**：与 GPT-4-Turbo，文心 4.0 等闭源模型在评测中处于同一梯队。
2. **英文综合能力处于第一梯队**：英文综合能力与最强的开源模型 LLaMA3-70B 处于同一梯队，超过最强 MoE 开源模型 Mixtral8x22B。
3. **知识、数学、推理、编程等榜单结果位居前列**
4. **开源模型支持 128K 上下文，对话官网/API 支持 32K 上下文**

## 二、快速上手 🚀

DeepSeek 提供了多种接入方式，包括 **AI 对话**、**API 接口**、**模型下载**等，方便用户快速集成和使用。  
Chris 接下来介绍如何使用**AI 对话**：

### 1.打开 AI 对话

首先从官网点击“开始对话”，进入详情。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1715261247978-4515b4ec-bdae-4884-9a66-6f83c9ca3f33.png#averageHue=%23dfe7f8&clientId=u3a1d883e-37eb-4&from=paste&height=1804&id=ub9b2c000&originHeight=1804&originWidth=3418&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2433743&status=done&style=none&taskId=ufeefa983-a6b6-4842-8901-be48a6a602d&title=&width=3418)

### 2.开始对话

在对话页面中，便可以发送各种问题进行聊天，Chris 以弱智吧经典问题进行测试，还可以，没翻车：

> Prompt：空腹能吃饭吗？  
> Result：空腹当然可以吃饭。实际上，“空腹”这个词通常指的是胃里没有食物的状态，这时候吃饭就是补充能量和营养的过程。当我们长时间没有进食，比如早晨起床后，胃里通常是空的，这时候吃早餐就是典型的空腹吃饭。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1715261554384-915687fa-a08e-434b-853b-0c8bb233b2bc.png#averageHue=%23d5a96f&clientId=u3a1d883e-37eb-4&from=paste&height=1804&id=ue9c2c23f&originHeight=1804&originWidth=3436&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1150937&status=done&style=none&taskId=u7b1b1de8-51e8-4d40-a75f-d5e8bc3e3ab&title=&width=3436)

Chris 分享几个弱智吧问题，大家可以自行测试：

> - 请问孕妇打人算群殴吗？
> - 雷公电母放的是直流电还是交流电？
> - 午餐肉，我可以晚上吃吗？
> - 香菇掉厕所了还能叫香菇吗？
> - 玉皇大帝住的是平流层还是对流层？
> - 变形金刚买保险是买车险还是人险？
> - 每天吃一粒感冒药，还会感冒吗？
> - 鲁迅有可能被周树人打吗？

## 三、核心功能 🔍

接下来介绍一些 DeepSeek 的核心功能：

### 1.代码助手

DeepSeek 提供的“**通用对话**”和“**代码助手**”两个功能，“**通用对话**”就是前面介绍了的，“**代码助手**”可以提问任何代码相关问题，比如：“如何理解 Vue3 响应式原理”，回答的结果没有偏差。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1715262254737-ef2d9016-3fbf-45b2-9a81-364ad616ba7a.png#averageHue=%23d5a96d&clientId=u3a1d883e-37eb-4&from=paste&height=1794&id=ub7691b1f&originHeight=1794&originWidth=3426&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1376821&status=done&style=none&taskId=ub98fdaf9-7d16-46c8-985d-72dfdb3e25c&title=&width=3426)

再写一个有点点复杂的表单页面：

> Prompt：使用 HTML + CSS + JavaScript 实现一个表单页面，页面中包含账号密码输入框，需要保证账号必须是英文，密码必须包含英文和数字，验证不通过需要提醒。

生成的代码在浏览器上运行，也是没啥问题，符合 Chris 的要求。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1715262673187-693b949d-37c3-45e1-9d31-5ad0e70e893b.png#averageHue=%23c28c4d&clientId=u3a1d883e-37eb-4&from=paste&height=1790&id=u244f585c&originHeight=1790&originWidth=3428&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1138851&status=done&style=none&taskId=u4f53dad2-ca99-4403-80d1-670f9728b1a&title=&width=3428)

### 2.完全开源

在 DeepSeek 在仓库 [https://github.com/deepseek-ai](https://github.com/deepseek-ai) 中开源了多个项目，包括 DeepSeek-VL、DeepSeek-Coder、DeepSeek-LLM、DeepSeek-MoE 等。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1715262800851-9095b065-ed04-4d0d-b1ad-88d383f5b6b6.png#averageHue=%239b8e77&clientId=u3a1d883e-37eb-4&from=paste&height=1796&id=u3b47a5a4&originHeight=1796&originWidth=3396&originalType=binary&ratio=1&rotation=0&showTitle=false&size=930289&status=done&style=none&taskId=u0b6fd1ec-28e2-48c9-96e1-f3d1c5fc66f&title=&width=3396)

### 3.API 开放平台

DeepSeek 支持 API 开放平台，地址：[https://platform.deepseek.com/](https://platform.deepseek.com/)，并提供了详细的 API 对接文档。

另外，**DeepSeek API 使用与 OpenAI 兼容的 API 格式**，通过修改配置，大家可以使用 OpenAI SDK 来访问 DeepSeek API，或使用与 OpenAI API 兼容的软件。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1715263094327-1646e44e-8a0c-4838-ab22-b7a2faa84362.png#averageHue=%230c0c0c&clientId=u3a1d883e-37eb-4&from=paste&height=1566&id=uf31725b5&originHeight=1566&originWidth=3164&originalType=binary&ratio=1&rotation=0&showTitle=false&size=337594&status=done&style=none&taskId=u3ddcfb3b-f90a-4160-81d9-98c44a3cc0e&title=&width=3164)

## 四、收费情况 💰

DeepSeek **网页版对话完全免费**，API 调用的收费情况如下：

- 1 元人民币（约 0.14 美元）/100 万输入 tokens
- 2 元人民币（约 0. 28 美元）/100 万输出 tokens

这个价格适用 deepseek-chat 和 deepseek-coder 两个模型，

- deepseek-chat 模型：擅长**通用对话任务**，上下文长度为 32K
- deepseek-coder 模型：擅长处理**编程任务**，上下文长度为 16K

这个价格可以说是非常便宜！ 对比其他 AI 模型的收费情况：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1715263956359-208b19ad-af16-444e-8272-21e3a5d74f43.png#averageHue=%23dfdbd2&clientId=u3a1d883e-37eb-4&from=paste&height=1742&id=u23dc4646&originHeight=1742&originWidth=2876&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1458226&status=done&style=none&taskId=u6823d727-ba71-4822-9e21-e5a91d24500&title=&width=2876)

## 五、总结 📝

DeepSeek-V2 是一款性能卓越且价格合理的 AI 语言模型，它的开源策略和高效的推理能力，为广大开发者和企业提供了一个经济实惠的选择。  
Chris 推荐有兴趣的朋友可以尝试使用 DeepSeek。
