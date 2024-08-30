最近这几天智谱 AI 真是太炸裂了，短短几天更新非常多内容：

1. 语言基座模型 GLM-4-Plus
2. 文生图基座模型 CogView-3-Plus
3. 图像/视频理解基座模型 GLM-4V-Plus
4. 视频生成基座模型 CogVideoX
5. 「清言 APP」上线视频通话
6. GLM-4-Flash API 完全免费

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1725011859702-4e1cef4d-b47f-45a7-9337-1ea420ff6fe2.png#averageHue=%23c0d32f&clientId=u108efdf3-99f7-4&from=paste&id=uabc16c68&originHeight=383&originWidth=900&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ud032316e-9a98-42c9-aad0-f053759e595&title=)

## 背景介绍

今天 Chris 发现智谱 AI 为每个老用户赠送了“**老客回馈资源包**”，包含 **1000W Tokens**，**有效期 1 个月**！！

> 查询链接：[https://open.bigmodel.cn/finance/resourcepack](https://open.bigmodel.cn/finance/resourcepack)

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1725011995159-273c388f-3e3a-43f9-81b3-7931cc0ac1ea.png#averageHue=%23fcfcfc&clientId=u108efdf3-99f7-4&from=paste&height=669&id=ue0b8cc96&originHeight=1338&originWidth=3572&originalType=binary&ratio=2&rotation=0&showTitle=false&size=238063&status=done&style=none&taskId=udd568bc7-24c4-4e01-bb8a-f5d1e58ea5f&title=&width=1786)
此次赠送的资源包，适用于所有按 tokens 计费的基础模型推理，也就是说**连最新的 GLM-4-Plus 等模型都可以使用**，用不完根本用不完。

## 使用教程

### 1.创建 API Key

首先需要到 [https://open.bigmodel.cn/usercenter/apikeys](https://open.bigmodel.cn/usercenter/apikeys) 创建一个 API Key ，用来调用模型时使用。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1725012504796-21f1a1eb-d4d4-40f7-adb7-972026c82727.png#averageHue=%238d8a8b&clientId=u72b7735f-df86-4&from=paste&height=733&id=ub1ada11f&originHeight=1466&originWidth=3044&originalType=binary&ratio=2&rotation=0&showTitle=false&size=294455&status=done&style=none&taskId=u4018f696-122c-48c6-9e62-136b625a98c&title=&width=1522)

### 2.配置 API Key

对于普通用户，可以借助借助一些第三方 AI 客户端（如 ChatBox、ChatAll 等），**通过配置 API Key 方式使用模型**，非常简单，Chris 以 ChatBox 为例演示：

> ChatBox 官网：[https://chatboxai.app/](https://chatboxai.app/)

首先点击“**设置**”按钮，选择“**添加自定义提供方**”：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1725012323712-9036228c-eb4d-4d21-b8c3-87fce7617ef9.png#averageHue=%23a3a3a3&clientId=u72b7735f-df86-4&from=paste&height=875&id=u349f6d5b&originHeight=1750&originWidth=2786&originalType=binary&ratio=2&rotation=0&showTitle=false&size=357282&status=done&style=none&taskId=u9af08769-bbb3-40f2-8bb9-3907ae87d4b&title=&width=1393)

然后填写模型提供方的配置信息，大家可以按照下面配置：

- **名称**：可以随便写个名称，方便知道找到这个配置；
- **API 域名**：填写 [https://open.bigmodel.cn](https://open.bigmodel.cn) 即可；
- **API 路径**：填写 /api/paas/v4/chat/completions 即可；
- **API 密钥**：填写前面创建的 API Key 即可；
- **模型**：填写“GLM-4-Plus”即可，大家也可以使用其他模型。

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1725012391151-3772fcf9-9e5b-48ea-b8b2-4d9eeda99d7c.png#averageHue=%23aaaaaa&clientId=u72b7735f-df86-4&from=paste&height=875&id=u32dcdbe5&originHeight=1750&originWidth=2786&originalType=binary&ratio=2&rotation=0&showTitle=false&size=387733&status=done&style=none&taskId=u2bcafb83-ec01-450c-9aff-b06c6869cd7&title=&width=1393)

配置完成后，就可以在对话框中进行测试，如果 **GLM-4-Plus** 能够正常响应，就表示配置成功：

![](https://cdn.nlark.com/yuque/0/2024/png/186051/1725012768473-e2c42d57-d534-4e96-b31f-103e165c0c07.png#averageHue=%23fafaf9&clientId=u7000e361-aa57-4&from=paste&height=875&id=u22acf9c9&originHeight=1750&originWidth=2786&originalType=binary&ratio=2&rotation=0&showTitle=false&size=423998&status=done&style=none&taskId=u2b6f847c-65ab-440f-9be9-b7189f71edd&title=&width=1393)

最后，大家就可以尽情使用智谱 AI 啦。给智谱 AI 再次点赞！
