最近用过 DeepSeek 的朋友应该都被 DeepSeek R1 模型给惊艳到了，效果很不错，今天 DeepSeek 官方也发布了最佳 R1 模型设置和文件上传提示词，帮助大家获得最佳体验。

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739535769298-ea901c58-5b75-475d-a1ab-393579b73c2e.png)

接下来和 Chris 一起看看：

## 一、R1 模型最佳配置
官方推荐的 R1 模型配置如下：

+ 不要使用系统提示词
+ Temperature 参数 0.6：可以防止无休止的重复和不连贯的输出，确保回答既不过于随机也不过于死板。

在 ChatBox 中可以这样配置：

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739537612417-c2442a12-d7b5-42fa-a1e3-8e69ab84878c.png)

## 二、官方搜索和文件上传提示词
官方提示词内容有点长，但拆分一下，主要包含下面几部分：

+ 对于文件上传

<font style="color:rgba(0, 0, 0, 0.9);">DeepSeek 建议用户按照模板创建提示，其中</font>`<font style="color:rgba(0, 0, 0, 0.9);">{file_name}</font>`<font style="color:rgba(0, 0, 0, 0.9);">、</font>`<font style="color:rgba(0, 0, 0, 0.9);">{file_content}</font>`<font style="color:rgba(0, 0, 0, 0.9);"> 和 </font>`<font style="color:rgba(0, 0, 0, 0.9);">{question}</font>`<font style="color:rgba(0, 0, 0, 0.9);"> 是参数。</font>

```javascript
file_template = \
"""[file name]: {file_name}
[file content begin]
{file_content}
[file content end]
{question}"""
```

+ 对于网页搜索

参数包括 `{search_results}`、`{cur_data}` 和 `{question}` 。

+ 对于中文搜索

提示词如下:

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739536485338-29cf9a0a-d4a6-4283-ad43-3876fca0ee88.png)

+ 对于英文搜索

提示词如下:

![](https://cdn.nlark.com/yuque/0/2025/png/186051/1739536519487-edcd41cc-540a-440e-8842-a2a47c76625d.png)

完整提示词可以查看：[https://github.com/deepseek-ai/DeepSeek-R1/pull/399/files](https://github.com/deepseek-ai/DeepSeek-R1/pull/399/files)



## 三、缓解 R1 模型绕过思考的方法
官方建议强制模型在每次输出的开始都使用`"<think>\n"`作为起始。下面是官方的详细回复：

> 我们观察到 DeepSeek-R1 系列模型在回应某些查询时倾向于绕过思维模式（即输出"<think>\n\n</think>"），这可能会对模型的表现产生负面影响。
>
> 为了确保模型进行充分的推理，我们建议强制模型在每次输出的开始都使用"<think>\n"作为起始。
>



DeepSeek 这才是真的 Open。

