今天 Chris 给大家推荐的工具是**商汤商量大模型**，全面对标 GPT-4 Turbo，支持 **AI 对话**、**图片理解**、**代码编写**、**文档总结**等，快来一起看看吧。

> 🌟 工具名称：商汤商量大模型  
> 🌐 使用环境：无需梯子 🪜，国内轻松访问  
> 🔗 工具地址：[https://chat.sensetime.com/wb](https://chat.sensetime.com/wb)

## 一、工具介绍 🛠️

**商量大模型**是由商汤科技研发的一款基于自然语言处理技术的人工智能大语言模型，具备超凡的语言理解、生成能力，将科技与人文相互交融。  
作为高效聊天助手，它能秒解复杂问题，提供定制化建议，还能辅助创作一流文本，具备不断学习进化的特性，是一款多功能的 AI 助手。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1714050614017-3a433218-f876-494f-872c-ae32bd154f5e.png#averageHue=%23e6e8f6&clientId=u6d1513a4-7c80-4&from=ui&id=ub3ce7709&originHeight=1874&originWidth=3574&originalType=binary&ratio=2&rotation=0&showTitle=false&size=868663&status=done&style=none&taskId=u55417cfc-d6af-48b2-9b6d-239e4200180&title=)

商量大模型目前主要分为“**商量-对话大模型 5.0**”和“**商量-文档大模型 Preview**”两部分，接下来 Chris 逐一详细为大家介绍。

## 二、对话大模型 5.0 🚀

**商量-对话大模型 5.0** 支持“**语言对话**”和“**多模态对话**”两种方式，使用户能够与 AI 进行自然而流畅的对话。无论是日常咨询、学术探讨还是职业问题，或是对图像的理解、数学问题的求解、编程代码的编写，它都能提供精准的支持。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1714051152102-38a8c3b3-8d92-448e-9939-e9cdb74a4d4d.png#averageHue=%23c5e5e3&clientId=u6d1513a4-7c80-4&from=ui&id=u6ebf063c&originHeight=1822&originWidth=3394&originalType=binary&ratio=2&rotation=0&showTitle=false&size=736207&status=done&style=none&taskId=u2fb204c6-d562-4e7e-ac4d-03c92eb5d4f&title=)

### 1.语言对话模式

在语言对话模式中，我们可以自由提问各种问题，比如 Chris 最喜欢拿弱智吧神题目进行提问：

> **【提问】**简单回答下面问题：为什么我爸妈结婚的时候没邀请我参加婚礼？  
> **【回答】**你爸妈结婚的时候没有邀请你参加婚礼，主要是因为在他们结婚的时候，你还没有出生。婚礼通常是庆祝两个人决定共度一生的特殊时刻，而宾客通常包括双方的家庭成员、朋友和亲近的人。由于你在他们结婚时还未存在，因此没有被邀请参加他们的婚礼。这是非常自然的情况，因为孩子是在父母结婚后才会有的。当你出生后，你就成为了他们家庭的重要一员，参与和庆祝家庭生活中的其他重要时刻。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1714051566872-0c13a78d-abc3-4481-9e18-63c49283cc81.png#averageHue=%23eef4f5&clientId=u6d1513a4-7c80-4&from=ui&id=uaa3b9edd&originHeight=1826&originWidth=3390&originalType=binary&ratio=2&rotation=0&showTitle=false&size=947156&status=done&style=none&taskId=uffcd3dc6-fec4-401b-9475-0e110863f84&title=)

Chris 还测试了其他几个弱智吧问题，回答效果都还不错。当然还可以解决代码问题，Chris 还增加了一些其他要求：

> **【提问】**使用 JavaScript 实现网页文本朗读功能，直接提供代码，无需介绍过程

回答结果如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Text-to-Speech Example</title>
  </head>
  <body>
    <textarea
      id="textToRead"
      rows="10"
      cols="50"
      placeholder="Enter text to be read aloud here..."
    ></textarea>
    <button id="readButton">Read Aloud</button>
    <script>
      document
        .getElementById("readButton")
        .addEventListener("click", function () {
          const textToRead = document.getElementById("textToRead").value;
          const utterance = new SpeechSynthesisUtterance(textToRead);
          utterance.lang = "en-US"; // 设置语言，这里用的是英语
          speechSynthesis.speak(utterance); // 开始朗读
        });
    </script>
  </body>
</html>
```

Chris 测试了下代码，可以正常执行，还是挺满意的～当然，其他如文案写作、文本翻译、生活百科、人文历史等功能，大家可以自行体验。

> 注意：Chris 发现商量目前无法阅读网页链接的内容，希望后面能够支持～

### 2.多模态功对话模式

在多模态对话中，商量可以理解图片内容、解决数学问题还是编写代码，并且图片限制条件如下：

> 1. 支持上传 png\jpg\jpeg 类型的图片；
> 2. 单次对话最多上传 10 个文件，每个文件不超过 10M；
> 3. 图片最小分辨率 224\*224，最大分辨率 13000\*13000；

Chris 上传了一张花的图片让商量理解并介绍这朵花，回答效果不错：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1714052388644-1e800dde-3fb9-4bca-adcd-2326c94eab7b.png#averageHue=%23e5ebed&clientId=u6d1513a4-7c80-4&from=ui&id=uf2d6a147&originHeight=1826&originWidth=3392&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2088518&status=done&style=none&taskId=u554f72cf-430f-41c3-806a-50c62511f42&title=)

## 三、文档大模型 Preview 🔍

**商量-文档大模型** 支持用户上传文档，与文档进行总结、提问等。

> 仅支持上传 10 个文件（单个不超过 10MB），格式支持 pdf、doc、docx、epub、mobi、txt 等

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1714053120261-54de484d-b20f-49b6-a2e8-c935d459456c.png#averageHue=%23eff4f6&clientId=u6d1513a4-7c80-4&from=ui&id=uad6b3371&originHeight=1742&originWidth=3786&originalType=binary&ratio=2&rotation=0&showTitle=false&size=511938&status=done&style=none&taskId=ud92ae5ca-644b-46cd-a6af-b713cbbcfc7&title=)

接下来 Chris 《[2023 年度汇总：50+ 优秀 AI 工具推荐](https://mp.weixin.qq.com/s/m8DfTBZutCAruuj2tINA4g)》文档上传到商量中，并提问，回答内容准确。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1714053678157-fca97afb-0e46-40ad-a8c8-23b25117b313.png#averageHue=%23c9e7c4&clientId=u6d1513a4-7c80-4&from=ui&id=u876ce903&originHeight=1752&originWidth=3438&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1036296&status=done&style=none&taskId=uc10c2de3-204f-48d2-ad6e-00a12bc7c48&title=)

当然，大家可以多上传一些文档试试，但是目前支持文档数量和大小局限比较大，不错效果还可以。

## 四、收费情况 💰

目前商汤商量大模型可以完全免费使用，当然商量大模型还支持 API 调用，详情可以查看官方文档中心：[https://platform.sensenova.cn/doc](https://platform.sensenova.cn/doc)

## 五、总结 📝

商量大模型是一款优秀的大语言模型，具备文本生成、代码编写、图片理解、文档总结等能力，全面对标 GPT-4 Turbo。商量大模型分为对话大模型 5.0 和文档大模型 Preview，支持多模态交互和多种文件格式，目前完全免费使用。
