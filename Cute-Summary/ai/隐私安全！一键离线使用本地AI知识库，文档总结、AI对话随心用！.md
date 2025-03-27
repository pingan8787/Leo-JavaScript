大家好，我是 Chris，今天详细和大家介绍如何在离线情况，使用 WiseMindAI 本地 AI 功能，比如文档总结、AI 对话、知识卡片等功能。

> 往期回顾：《[WiseMindAI：一款 AI 智能学习助手](https://mp.weixin.qq.com/s/FmvGxFPKNjhAwD7M2OTaHw)》
>
> 官方网址：[https://wisemind-ai.com/](https://wisemind-ai.com/)

这次 Chris 还录制了视频详细介绍，大家可以根据自己需求查看。

## 一、背景介绍

WiseMind AI 是一款 AI 驱动的本地 AI 知识库软件，数据完全本地化，安全可靠，支持丰富文档类型、AI 大语言模型和实用的 AI 插件。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742551046627-a85c8a5b-5683-432d-8b48-9876c7987613.png)

本地 AI 知识库的好处在于：

- **安全放心**： 你的数据就像锁在自家保险箱里，谁也拿不走。
- **快速响应**： 不用联网，直接就能用，速度快得像闪电。
- **量身定制**： 可以根据你的需求进行训练，成为你的专属助手。
- **省钱省力**： 不用花大价钱买云服务，自己就能搞定。

特别是一些特殊行业，比如金融、医疗、科研等行业的敏感文档，不方便直接使用在线的 AI 服务，避免隐私泄露。

## 二、使用介绍

WiseMindAI 中，需要配置下面两个基础大模型：

1. **通用模型**：将会用于做文档总结、对话、生成知识卡片等功能。
2. **Embedding 模型**：将会用来做文档数据分析，之后会用在文档对话中。

只要配置这两个大模型后，就能在 WiseMindAI 中离线使用文档总结、AI 对话、知识卡片等功能。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742553926410-431ed719-c509-435a-a071-4157afa92ef9.png)

如果需要离线的话，就需要在本地部署这两种模型，目前 WiseMindAI 接入的是 Ollama，本地环境可以通过 Ollama 部署所需要的大模型。

> Ollama 地址：[https://ollama.com/](https://ollama.com/)

### 1.下载 Ollama

首先打开 [https://ollama.com/download](https://ollama.com/download) 按照当前系统下载对于 Ollama，然后一键安装即可。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742554132138-b3012902-067d-4417-82ce-5f322ceda6d0.png)

安装完成后，打开终端命令行工具，输入 ollama 然后回车，如果正常显示帮助信息，则表示安装成功，可以继续下一步。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742554200677-4989d1e6-ad8c-44b5-901e-156289631707.png)

### 2.下载模型

前面提到的 WiseMindAI 需要配置通用模型和 Embedding 模型，接下来可以在 Ollama 模型页面 [https://ollama.com/search](https://ollama.com/search) 找到合适的模型下载即可。

比如 Chris 找到最近比较火的 deepseek-r1 模型：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742554322025-3331861b-637c-4cac-be1d-ed95c8ac10ca.png)

点击，打开详情，然后选择模型大小，点击复制安装命令即可。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742554381047-4c201065-ba42-4bf3-8cfa-f1e71c8edaf4.png)

将命令复制到前面的终端命令行工具，回车即可开始安装：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742554484842-0f8764b0-a7f4-4510-9813-698d49ffed7c.png)

等到下载完成之后，就能开始使用了。大家可以使用相同方式下载 Embedding 模型，只要先在顶部菜单，切换到 Embedding 分类即可。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742554551451-f046038c-726f-411a-b809-26e977497e93.png)

### 3.配置模型

当模型都下载完成后，就可以回到 WiseMindAI 的设置弹框，在对应位置数据前面下载好的模型名称即可：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742554630692-c0742715-4263-4a36-be76-5fb89ac08521.png)

### 4.使用 WiseMindAI

所有配置工作都完成后，接下来就可以正常使用 WiseMindAI 了：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742554712893-0c8a67d9-8d15-4267-ad85-8d81b886ff9e.png)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1742554760306-a61d766c-63e3-4941-ba62-75f70860d87a.png)

## 总结

本文简单介绍了如何离线使用 WiseMindAI 的核心功能，保证所有数据的安全，当然，文章介绍的 Ollama 安装的模型，也可以使用在其他 AI 客户端软件，比如 ChatBox、Cherry Studio 等等。
