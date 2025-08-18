今天 OpenAI 在推特上发布了“使用 GPT-5 编程的6个小技巧”，Chris 将内容翻译成中文，分享给大家参考下：

> 官方推文：[https://x.com/OpenAIDevs/status/1956438999364768225](https://x.com/OpenAIDevs/status/1956438999364768225)
>
> OpenAI 提示词指南：[https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide](https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide)
>

## 1. 保持精确，避免冲突信息
新的 GPT-5 模型在指令跟随方面显著提升，但副作用是：

如果你的 **.cursor/rules** 或 **AGENTS.md** 文件中存在模糊或冲突的指令，模型可能会难以正确执行。

## 2. 使用合适的推理力度
GPT-5 总会在解决问题时进行一定程度的推理。

+ 对于复杂任务，请使用 **高推理力度**（high reasoning effort）。
+ 如果你发现模型在处理简单任务时“想太多”，请明确任务需求，或者指定使用 **中等/低推理力度**。

## 3. 使用类 XML 语法组织指令
在 Cursor 的实践中，使用类 **XML** 的语法结构能为模型提供更清晰的上下文。

例如，你可以写出编码规范：

```plain
<code_editing_rules>
  <guiding_principles>
    - 每个组件都应是模块化的、可复用的  
    - ...
  </guiding_principles>
  <frontend_stack_defaults>
    - 样式: TailwindCSS  
  </frontend_stack_defaults>
</code_editing_rules>
```

## 4. 避免过于强硬的语言
以往你可能会写：

+ “一定要非常详细地收集信息”
+ “确保在回答之前掌握完整背景”

但在 GPT-5 上，这类语言可能会 **适得其反** ——模型可能过度收集上下文或重复确认。

## 5. 给模型留有规划和自我反思空间
如果你在做 **从零到一** 的应用开发，允许模型先进行自我反思会更有帮助。例如：

```plain
<self_reflection>
  - 首先，花时间制定一个清晰的评分标准（rubric），直到你确信它合理  
  - 然后，深入思考“什么是世界级的一次成型应用”，并将思考落实到 5-7 个维度  
  - 这份 rubric 仅供模型内部使用，不要展示给用户  
  - 最终，基于 rubric 不断思考和迭代解决方案。如果输出结果没有在所有维度上达到高分，就重新开始  
</self_reflection>
```

## 6. 控制模型在编程时的“积极性”
GPT-5 默认会在上下文收集上表现得非常积极。你可以通过提示词来控制：

+ 给出工具使用预算
+ 指定在何时需要详细、何时简化
+ 是否允许并行发现 / 工具调用
+ 是否要中途频繁与用户确认

例如：

```plain
<persistence>
  - 不要反复向用户确认或澄清假设  
  - 遇到不确定时，先做最合理的假设并继续执行  
  - 在完成后，把这些假设记录下来供用户参考  
</persistence>
```



更多细节，大家可以查看：

+ OpenAI 提示词指南：[https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide](https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide)
+ OpenAI 提示词优化器：[https://platform.openai.com/chat/edit?models=gpt-5&optimize=true](https://platform.openai.com/chat/edit?models=gpt-5&optimize=true)



