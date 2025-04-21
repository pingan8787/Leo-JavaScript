就在刚刚，OpenAI 发布了迄今为止 o 系列模型中最智能的 o3 和 o4-mini 模型，回答前会经过更长思考时间，让 ChatGPT 能力得到重大提升。

这两款模型不仅在语言处理上表现出色，更首次实现了对图像的深入理解与推理，显著提升了 ChatGPT 在复杂任务处理中的能力。比如**网络搜索**、**代码分析**、**视觉输入推理**、**生成图像**等。

## 使用方式

从今天起，ChatGPT Plus、Pro 和 Team 用户将在模型选择器中看到 o3、o4-mini 和 o4-mini-high，取代 o1、o3-mini 和 o3-mini-high。

ChatGPT Enterprise 和 Edu 用户将在一周后获得访问权限。预计将在几周后发布带有完整工具支持的 o3-pro。目前，Pro 用户仍可以在“更多模型”下通过模型选择器访问 o1-pro。

OpenAI o3 和 o4-mini 也通过 Chat Completions API 和 Responses API 向开发者开放。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1744848033895-54d01103-df1b-4c78-97a8-b7dc41b5e8e2.png)

图片来自：机器之心

## o3 模型

o3 模型是 OpenAI **目前最强大的推理模型**，在编程、数学、科学和视觉感知等领域表现非常好。该模型在多个基准测试中刷新纪录，包括 Codeforces、SWE-bench 和 MMMU 等。

与前代模型 o1 相比，o3 在处理复杂现实任务时重大错误率降低了 20%，特别**擅长分析图像、图表和图形等视觉任务**。

简单总结如下：

- **最强大的推理模型**：o3 是 OpenAI 最先进的推理模型，在代码、数学、科学、视觉感知等领域都表现出色。
- **强大的推理能力**：o3 能够进行深度推理，并生成详细和有洞察力的答案，解决更复杂的问题。
- **多模态推理**：o3 可以处理多模态输入，包括**图像**、**图表**和**图形**，并将其与文本信息结合进行分析。
- **工具使用**：o3 可以**使用 ChatGPT 中的所有工具**，例如搜索网络、分析文件、生成图像等，以支持其推理过程。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1744847854956-fbd30546-b9cd-42e5-8dec-bc55c0e2cce4.png)

## o4-mini 模型

o4-mini 是 OpenAI 推出的一款**轻量级模型**，专为**快速、低成本的推理任务设计**。尽管体积更小，但在数学、编程和视觉任务中表现出色，成为 2024 年和 2025 年 AIME 测试中的最佳模型。

与前代 o3-mini 相比，o4-mini 在非 STEM 任务和数据科学领域也有显著提升。其高效性使其支持更高的使用频率，适合需要大量推理的高吞吐量应用场景。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1744847840874-5b1a9623-b27c-4994-8126-ee8c902dbe09.png)

## 价格对比

o3 和 o4-mini 的 API 价格，相较于 o1，o3 在输入、缓存输入以及输出等各个方面的 API 价格均有所降低。而 o4-mini 与 o3-mini 相比，其 API 价格也在部分项目（如输入或输出等方面）实现了下调。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1744848387539-2f1e2e8c-127d-4901-ad5c-49f7204249d1.png)

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1744848460439-19e23450-5a3b-4bb2-812a-494b18fed573.png)

> 官方介绍：[https://openai.com/index/introducing-o3-and-o4-mini/](https://openai.com/index/introducing-o3-and-o4-mini/)
