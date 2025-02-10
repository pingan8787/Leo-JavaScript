最近 DeepSeek 不仅在 AI 圈子内大火，还成功“出圈”，成为**全民热议的话题**，这非常好，**AI 技术正在走进了大众生活**，2025 年 AI 的普及将更加值得期待。Chris 也会持续为大家分享更多实用的 AI 工具！

但是，随着 DeepSeek 的爆火，服务器卡顿问题也频频出现，导致许多用户无法正常使用。在“AI工具派”社群中，不少小伙伴都在吐槽这一问题。为此，Chris 写了这篇，为大家提供一套完整的解决方案，包括：

1. 获取官方 API Key
2. 本地部署 DeepSeek
3. 优秀第三方 AI 客户端推荐

# 一、获取官方 API Key
> API Key：API Key 可以理解为一串密码，通过它可以直接访问 DeepSeek 的服务。
>

虽然使用官方 API Key 是最简单的方式，但由于服务器负载过高，卡顿问题依然存在。

大家可以访问 [https://platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) 创建一个 API Key，后续 Chris 会介绍如何使用。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739194463578-369cac41-be07-4a53-a8be-a5ef51704108.png)

需要注意的是，使用 API Key 会产生费用，但目前由于特殊原因，**官方暂停了充值服务**，建议后续再尝试。

# 二、本地部署 DeepSeek
为了解决服务器卡顿问题，Chris 推荐大家使用 Ollama 工具进行**本地部署**。Ollama 不仅支持 DeepSeek，**还可以运行其他多种 AI 模型**。

部署方式如下：

## 1.下载 Ollama
首先访问官方 [https://ollama.com/download](https://ollama.com/download)，根据你当前电脑的系统，下载对应版本的 Ollama，然后安装即可。

> <font style="color:#000000;">Ollama 是一个用于本地运行和管理 AI 模型的工具，通常用于与各种模型进行交互。</font>
>

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739194727229-79227ad2-143e-454c-9eb5-21cac3f57481.png)

你也可以在电脑上看到 Ollama 的图标，双击打开即可：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739195392290-10c4da4c-8efa-46ff-9003-2160279ebfa1.png)

## 2.下载 DeepSeek 模型
接下来需要打开电脑的终端命令行工具，输入命令 `ollama run deepseek-r1`， 默认安装 DeepSeek 7b 的模型。

> 命令行打开方式：
>
> 1.Windows 端：按下 Win+R 组合键，打开 “运行” 对话框，输入 “cmd” 或 “powershell”，点击 “确定” 或按下回车键即可打开相应命令行工具。
>
> 2.Mac 端： Command + 空格键打开 Spotlight 搜索“终端”打开即可。
>

接着就可以正常下载 DeepSeek 模型：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739195047494-a1a0229e-1557-4317-87f5-6f954a518e35.png)

## 3.测试 DeepSeek
下载完成后，直接在终端与 DeepSeek 对话，例如输入：“请介绍‘AI工具派’这个自媒体账号。”，然后等待 DeepSeek 思考并回复：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739195547593-aceb809d-e314-4132-8e7d-3d9a9287eeed.png)

<font style="color:#000000;">Chris 整理一些常用 Ollama 命令，使用时将 <model_name> 替换成具体模型名称即可：</font>

> 安装模型：ollama pull <model_name>
>
> 运行模型：ollama run <model_name>
>
> 删除模型：ollama rm <model_name>
>
> 所有安装的模型：ollama list
>

# 三、第三方 AI 客户端推荐
对于不熟悉命令行的用户，Chris 推荐以下 **3 款优秀的第三方 AI 客户端**，让 DeepSeek 的使用更加便捷：

1. ChatBox
2. CherryStudio
3. AnythingLLM

## 1.ChatBox
ChatBox 是<font style="color:#000000;">一款多平台 AI 客户端，支持文档、图片和代码处理，强调本地数据存储和隐私保护。</font>

> 官方网址：[https://chatboxai.app/](https://chatboxai.app/)
>

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739196624036-5542a17e-7445-43fb-9030-fd7f8db488ca.png)

安装后即可启动：

### 1.1 使用 DeepSeek API
首先点击左下角设置，然后操作如下：

1. 选择模型提供方为“DEEPSEEK API”
2. 填写前面复制的 API Key
3. 保存

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739196831460-e9e72777-1a32-4e3c-bb03-5a13f619392e.png)

### 1.2 使用 Ollama
首先点击左下角设置，然后操作如下：

1. 选择模型提供方为“OLLAMA API”
2. 填写 API 域名为：[http://localhost:11434](http://localhost:11434)
3. 选择之前安装的模型
4. 保存

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739196956882-5fd809fe-98ee-4e69-9583-c038d51779cf.png)

### 1.3 开始对话
接下来就可以正常对话了，并且 ChatBox 还支持**添加图片、文件、链接和联网查询**，非常方便。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739197313481-4c376cf6-6576-41c2-ad04-ad469da49b7f.png)

## 2.<font style="color:#000000;">CherryStudio</font>
<font style="color:#000000;">CherryStudio 是一款好用的 AI 客户端，支持多种大型语言模型的服务，提供直观的可视化界面和远程 API 接口，旨在降低对本地硬件的依赖，提升使用效率。</font>

> 官方网址：[https://cherry-ai.com/](https://cherry-ai.com/)
>

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739196635356-2423904a-6999-4dc1-bf99-d9f76afc36b6.png)

安装后即可启动：

### 2.1 使用 DeepSeek API
首先点击左下角设置，然后操作如下：

1. 点击“模型服务”
2. 点击“深度求索”
3. 在“API 密钥”填写前面复制的 API Key，底下添加“DeepSeek Reasoner模型”
4. 启用服务

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739197888004-de73ad04-6600-46c4-adb9-c094e32d221e.png)

然后还要设置默认模型为“DeepSeek Reasoner模型”即可：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739197939313-0b074bd7-496b-4a63-84f0-63a3bdb26143.png)

### 2.2 使用 Ollama
首先点击左下角设置，然后操作如下：

1. 点击“模型服务”
2. 点击“Ollama”
3. 在模型中，点击“管理”，添加前面安装的 DeepSeek 模型
4. 启用服务

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739198089716-f90beb74-58ad-4b35-9a37-35ff08071819.png)

### 2.3 开始对话
接下来就可以正常对话：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739198247304-52113dca-168a-4a31-a272-8d06fc9cac4f.png)

## <font style="color:#000000;">3.AnythingLLM</font>
<font style="color:#000000;">AnythingLLM 是一款支持本地部署的 AI 工具，允许用户在本地运行和管理大型语言模型，提供可视化界面，方便用户与模型进行交互。</font>

> 官方网址：[https://anythingllm.com/](https://anythingllm.com/)
>

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739196653757-023b8d16-6e74-49b9-bee9-2cc527f99065.png)

安装后即可启动：

### 3.1 使用 DeepSeek API
首先点击左下角设置，然后操作如下：

1. 点击“LLM 首选项”
2. 在“LLM 提供商”选择 DeepSeek
3. 在“API Key”填写前面复制的 API Key
4. 选择“deepseek-reasoner模型”
5. 保存

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739198410366-3597556e-e9d2-4b97-9586-478167f9013b.png)

### 3.2 使用 Ollama
首先点击左下角设置，然后操作如下：

1. 点击“LLM 首选项”
2. 在“LLM 提供商”选择 “Ollama”
3. 选择“deepseek-reasoner模型”
4. 保存

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739198527052-41113365-67b7-4c0d-82b3-b672b9851815.png)

### 3.配置工作区
Anything LLM 比其他工具多一个“设置工作区”的步骤，每个工作区可以使用不同模型，配置过程如下：

1. 点击“新工作区”创建
2. 点击工作区设置
3. 选择你使用的方式，比如 DeepSeek 或者 Ollama，Chris 这里使用 Ollama
4. 保存

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739198708732-f259e228-eb9c-4991-9b36-5a39673b4683.png)

### 3.4 开始对话
接下来就可以创建一个新对话，与 DeepSeek 正常对话：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739198838822-5f74f86d-c92b-4c0b-90f5-f3f1505b0a83.png)

# 四、总结
本文主要介绍了如何使用 DeepSeek API 和本地部署，并主要分析了 3 款优秀的第三方 AI 客户端，让大家能够更高效的使用 DeepSeek。当然还有很多此类软件，也欢迎大家补充。

希望在 2025 年，AI 能够更加普及，让更多人能够得到 AI 加持，发挥自己的创造力。

