你能想象一款 Chrome 插件，从构想到落地，全程由 AI 独立编写完成吗？

这款插件，就是这样诞生的，**一款 Chris 花了 2 小时，完全由 CodeX 进行 Vibe Coding 的插件**。  
没有写一行代码，由 AI 完成了所有逻辑设计、界面布局、交互细节与国际化配置。

## 🚀 image2prompt

> 背景：Chris 经常看到不错的图片，想生成类似效果的，并且使用自己文案的图片。

image2prompt 是一款**为创作者、设计师、AI 用户**准备的小工具，用来将网页中任意图片**一键生成 Prompt 提示词**。

当你在网页上看到一张不错的图片，只需把鼠标移上去，右下角就会出现一个小图标按钮 👇

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1762140716364-e8776f2d-bed6-463f-8696-bbf9e0ca996d.png)

点击它，插件会自动：

1. 把这张图片上传到选定的 AI 模型（默认 Gemini 2.5 Flash，也可以选择智谱 AI）；
2. 自动生成一段高质量提示词（Prompt）；
3. 自动复制到剪贴板（浏览器权限要开启）；
4. 自动跳转到你喜欢的 AI 平台（可选），复现这张图的风格。

## ⚙️ 支持功能

- 🧩 **模型选择**：目前支持 Gemini / 智谱 AI
- 🌏 **多语言生成**：支持 20 个国家语言
- 🖼️ **图片尺寸过滤**：只有大于设定尺寸（默认 256×256）的图片才会显示按钮
- 🎨 **自定义平台跳转**：支持设置默认平台（OpenAI / Gemini / StableDiffusion / 即梦 / 可灵 / 豆包 / 海螺 AI / 自定义）
- 💬 **提示词可配置**：你可以编辑提示词模板，用你自己的风格生成描述
- 📒 **生成历史**：你可以查看所有生成的历史
- 🧭 **国际化界面**：支持中英文切换
- 🪶 **轻量风格 UI**：参考 shadcnUI 设计，但完全自绘，不依赖第三方库
- 🔓 **完全开源、永久免费**

## 🌈 插件安装

本插件项目**完全开源免费使用**，地址：👉 [https://github.com/pingan8787/image2prompt](https://github.com/pingan8787/image2prompt)

下载完项目后，在 Chrome/Edge 浏览器拓展程序页 `chrome://extensions/` 或者 `edge://extensions/` 中开启“**开发者模式**”，然后**将整个项目拖拽进去**即可，也可以点击左上角“**加载未打包的拓展程序**”，选择项目文件夹。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1762140072712-e2c95b8d-747a-4502-9bfa-ced5cc13f0cc.png)

## 🍭 插件使用

使用插件之前，首先要在插件设置页配置 Gemini API Key 或者智谱 AI 的 API Key：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1762140249315-264858ba-74c6-4786-a6c6-ed8e0131999e.png)

其他配置可以按实际需求进行修改，配置完成后，在浏览器任意页面的图片右下角，会显示一个编辑按钮：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1762140721163-0c0b093a-03ea-496e-9ae5-27f48a7f316b.png)

点击按钮即可生成开始生成提示词，等待生成完成后，即可在页面左下角看到提示，并且**提示词自动复制到剪切板**。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1762140777314-baff1086-0bfa-468b-8bfb-94ae0a540811.png)

另外，你也可以在插件的设置页的“生成历史”，查看已经生成过的提示词：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1762142459202-f8345ff1-bac1-44f4-857f-a7aae2954940.png)

## 🌹 结语

image2prompt 是 Chris 使用 CodeX 纯 Vibe Coding 的一款浏览器插件，帮助我们在任何网页中随时生成图片的提示词，方便我们生成相似的图片。

有任何问题欢迎私聊或 issues 提交 [https://github.com/pingan8787/image2prompt/issues](https://github.com/pingan8787/image2prompt/issues)。

感兴趣的朋友赶紧体验一下啦，也可以基于这个项目进行 DIY ～
