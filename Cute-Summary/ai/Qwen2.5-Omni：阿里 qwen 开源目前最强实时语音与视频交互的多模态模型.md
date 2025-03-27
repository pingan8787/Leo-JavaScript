<font style="color:rgb(44, 44, 54);">就在昨晚，阿里巴巴通义实验室（Qwen）团队发布了</font>**Qwen2.5-Omni **<font style="color:rgb(44, 44, 54);">，这是</font>**<font style="color:rgb(44, 44, 54);">目前开源领域最强的端到端多模态模型</font>**<font style="color:rgb(44, 44, 54);">。</font>

**Qwen2.5-Omni **<font style="color:rgb(44, 44, 54);">模型</font>**<font style="color:rgb(44, 44, 54);">支持文本、音频、图像和视频输入，并能实时生成文本和语音响应</font>**<font style="color:rgb(44, 44, 54);">，突破了单一模态模型的局限性，为通用人工智能（AGI）的发展提供了全新方向。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1743032816574-51343d1c-4d10-4fe4-aa76-10a577d36bac.png)

## <font style="color:rgb(44, 44, 54);">核心创新：Thinker-Talker 架构</font>

<font style="color:rgb(44, 44, 54);">Qwen2.5-Omni 采用了全新的</font>**Thinker-Talker 架构 **<font style="color:rgb(44, 44, 54);">：</font>

- **Thinker **<font style="color:rgb(44, 44, 54);">：负责处理多模态输入（文本、音频、图像、视频），生成高级表示和文本。</font>
- **Talker **<font style="color:rgb(44, 44, 54);">：接收 Thinker 的输出，以流式方式生成高质量语音。</font>

<font style="color:rgb(44, 44, 54);">模型通过时间对齐的多模态 RoPE 技术解决了音视频同步问题，并支持分块输入与即时输出，实现实时交互。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1743032884469-9f9c3c32-c61e-414e-ae29-4a222de869b1.png)

## <font style="color:rgb(44, 44, 54);">性能表现：全面领先</font>

<font style="color:rgb(44, 44, 54);">Qwen2.5-Omni 在多项任务中表现出色：</font>

- **<font style="color:rgb(44, 44, 54);">单一模态任务</font>**<font style="color:rgb(44, 44, 54);">：语音识别（Common Voice）、翻译（CoVoST2）、音频理解（MMAU）、图像推理（MMMU、MMStar）、视频理解（MVBench）。</font>
- **<font style="color:rgb(44, 44, 54);">多模态融合任务</font>**<font style="color:rgb(44, 44, 54);">：在 OmniBench 等复杂任务中达到 SOTA 水平。</font>
- **<font style="color:rgb(44, 44, 54);">语音生成</font>**<font style="color:rgb(44, 44, 54);">：自然度和鲁棒性超越现有流式/非流式模型。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1743032909344-6422699f-5f07-415e-b230-5d4fb26f7751.png)

## <font style="color:rgb(44, 44, 54);">开源与体验</font>

<font style="color:rgb(44, 44, 54);">Qwen2.5-Omni 已开源至 Hugging Face、魔搭（ModelScope）等平台，论文同步发布。用户可通过 Qwen 官网 Demo（</font>[<font style="color:rgb(97, 92, 237);">https://chat.qwen.ai</font>](https://chat.qwen.ai/)<font style="color:rgb(44, 44, 54);">）亲身体验其强大功能。</font>

<font style="color:rgb(44, 44, 54);"></font>

- 官方网址：[https://chat.qwen.ai/](https://chat.qwen.ai/)
- 官方博客：[https://qwenlm.github.io/blog/qwen2.5-omni/](https://qwenlm.github.io/blog/qwen2.5-omni/)
- Github 仓库：[https://github.com/QwenLM/Qwen2.5-Omni](https://github.com/QwenLM/Qwen2.5-Omni)
- HuggingFace 地址：[https://huggingface.co/Qwen/Qwen2.5-Omni-7B](https://huggingface.co/Qwen/Qwen2.5-Omni-7B)
- 魔搭社区：[https://modelscope.cn/models/Qwen/Qwen2.5-Omni-7B](https://modelscope.cn/models/Qwen/Qwen2.5-Omni-7B)
- 论文：[https://github.com/QwenLM/Qwen2.5-Omni/blob/main/assets/Qwen2.5_Omni.pdf](https://github.com/QwenLM/Qwen2.5-Omni/blob/main/assets/Qwen2.5_Omni.pdf)
