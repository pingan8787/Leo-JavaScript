今天 Chris 给大家推荐的工具是 AnyText，最近很火的一款可以解决 AI 文生图文字生成模糊问题的在线工具，快来一起看看吧。
> Demo地址（魔搭平台）：[https://modelscope.cn/studios/damo/studio_anytext/summary](https://modelscope.cn/studios/damo/studio_anytext/summary)
> Demo 地址（HF 平台）：[https://huggingface.co/spaces/modelscope/AnyText](https://huggingface.co/spaces/modelscope/AnyText)
> 论文地址：[https://arxiv.org/abs/2311.03054](https://arxiv.org/abs/2311.03054)
> 代码仓库：[https://github.com/tyxsspa/AnyText](https://github.com/tyxsspa/AnyText)

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1704503736052-1a9f12e5-e38e-4a02-91f3-0ad414d66b5e.png#averageHue=%23b8bab7&clientId=u4e840f11-346b-4&from=paste&id=u09381a57&originHeight=320&originWidth=768&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u79157b14-7eca-4e09-99aa-030dde4b179&title=)
## 一、工具介绍 🛠️
AnyText 是由阿里云达摩院推出的图片文字处理工具，可以将生成的文字添加到图片中。通过创新性的算法设计，可以支持中文、英语、日语、韩语等多语言的文字生成。    
AnyText 的出现，为电商海报、Logo设计、创意涂鸦、表情包等新型 AIGC 应用提供了可能性。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1704503861090-4fa8e1a0-18f5-4655-97f9-67fba09157ac.png#averageHue=%23b6bcab&clientId=u4e840f11-346b-4&from=paste&height=1598&id=u03aea497&originHeight=1598&originWidth=3072&originalType=binary&ratio=1&rotation=0&showTitle=false&size=644230&status=done&style=none&taskId=ubc63753e-917e-4228-bf70-c93e3e3f51b&title=&width=3072)
官方还提供了一些效果图：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1704504541702-ba7cd134-8ae1-458d-ba46-10556342b901.png#averageHue=%23a6b390&clientId=u0be70023-0127-4&from=paste&height=1542&id=uafdabb41&originHeight=1542&originWidth=1934&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3696446&status=done&style=none&taskId=u0417ff0c-6374-4da3-88ae-209de47f1c4&title=&width=1934)
![image.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1704504559117-48578a0a-6cd2-4ec4-8292-9483b236c599.png#averageHue=%23a8aa75&clientId=u0be70023-0127-4&from=paste&height=1542&id=u4d26d8f2&originHeight=1542&originWidth=1942&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3567904&status=done&style=none&taskId=ue0005588-92ac-418e-a61d-776bc873a65&title=&width=1942)
![image.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1704504570072-26238423-55a7-4d60-a7de-1167900a72fa.png#averageHue=%23b0b58b&clientId=u0be70023-0127-4&from=paste&height=1190&id=u558ebbc6&originHeight=1190&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2358620&status=done&style=none&taskId=u885b6e8e-d78f-4a6a-bcdd-a289a05726b&title=&width=1920)
## 二、快速上手 🚀
AnyText 支持两种使用模式：

- 🖼Text Generation(文字生成) 
- 🎨Text Editing(文字编辑)

接下来和 Chri 一起体验看看吧！
### 🖼 Text Generation(文字生成) 
文字生成模式，是**通过提示词生成图片和文本**，使用方式如下：

1. **输入提示词**

提示词需要包含图片描述和图片中文字的介绍，比如 Chris 使用提示词如下：**在足球场上，一位身穿 11 号球衣的球员，并且用红色字体印着“AI 工具派”文字**。

2. **选择生成方式**

也就是如何指定文字位置，分为：**手绘**、**拖框矩形**或**随机生成**三种，Chris 以手绘为例介绍。

3. **设置文本生成位置**

用来设置文本要生成的位置，手绘就是在下面画板绘制出大概位置。

4. **开始运行**

配置完成之后，就可以开始生成了。

5. **预览生成结果**

生成完成后，就可以在右侧看到图片预览，并且一次性生成 4 张，大家可以随意挑选预览。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1704505404753-25e73183-3ef9-4924-acba-11d448c7e612.png#averageHue=%236e8c6a&clientId=u0be70023-0127-4&from=paste&height=1770&id=u989d9c4e&originHeight=1770&originWidth=2920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2137951&status=done&style=none&taskId=u477651d9-b899-4a4a-8db9-03e310d9462&title=&width=2920)
### 🎨Text Editing(文字编辑)
文本编辑模式，是通过上传指定图片，设置提示词进行文字编辑，使用方式如下：

1. **输入提示词**

提示词描述图片中文字，比如 Chris 使用提示词如下：**一件红色球衣上面写了“AI工具派”**。

2. **上传图片**

上传你所要编辑文字的图片。

3. **设置文本位置**

在参考图中，绘制出大概位置。

4. **开始运行**

配置完成后就可以开始运行。

5. **预览生成结果**

生成完成后，即可查看。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1704507618430-642e5fbc-908a-4560-864c-30f0d4f7b904.png#averageHue=%23f2f3f8&clientId=u0be70023-0127-4&from=paste&height=1616&id=u2973dbe6&originHeight=1616&originWidth=3024&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2215899&status=done&style=none&taskId=u941e8476-96d6-48d3-b2f2-7db9fc11f66&title=&width=3024)
Chris 对生成效果还是满意的。
## 三、核心功能 🔍
当然 AnyText 还有一些其他功能，Chris 简单介绍一下：
### 1. 详细参数配置
AnyText 提供了非常详细的参数配置，让用户可以生成更准确的图片，配置包括：图片数、步数、宽度、高度、控制力度、CFG强度、种子数、DDIM、附加提示词、负向提示词等。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1704507949095-78961306-f77c-4c9b-ab3b-2f44a12d7f06.png#averageHue=%23d4d8d7&clientId=u0be70023-0127-4&from=paste&height=1666&id=u22c94155&originHeight=1666&originWidth=2952&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1560143&status=done&style=none&taskId=u345f24a7-552d-4074-b5ed-b85fa7f7c78&title=&width=2952)
### 2. 丰富的示例
AnyText 还为用户提供了很多示例，包括：提示词、原图、参考图等等参数的配置，大家可以参考试试。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1704508193697-064b456b-37c3-4426-94b7-fd654d404dcc.png#averageHue=%23575f5c&clientId=u0be70023-0127-4&from=paste&height=1146&id=u3308d307&originHeight=1146&originWidth=2954&originalType=binary&ratio=1&rotation=0&showTitle=false&size=613855&status=done&style=none&taskId=ud1839cd5-bcef-41d9-b3ca-703d9c90759&title=&width=2954)
## 四、收费情况 💰
目前完全免费体验。
## 五、总结 📝
AnyText是阿里云达摩院推出的一款图片文字处理工具，它可以在图片中生成和嵌入文字，支持中文、英语、日语、韩语等多语言。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/186051/1704509189459-c9cd767a-cbbe-4880-8524-2bbf7a3daacf.png#averageHue=%23b0cacb&clientId=u0be70023-0127-4&from=paste&height=698&id=u850b0f78&originHeight=698&originWidth=1462&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1227011&status=done&style=none&taskId=uaaf2e996-f25c-4b2e-aaad-019b5ebd928&title=&width=1462)
Chris 体验下来，AnyText 生成的效果并没有像官方示例那样，可能是 Chris 配置问题，文字效果一般，甚至还有错别字，并且文生图的效果也不是很理想，另外生成速度也有点感人。大家可以自行体验一番～～

相信随着技术发展，AnyText 会将这些问题解决掉，未来更好帮助大家。
