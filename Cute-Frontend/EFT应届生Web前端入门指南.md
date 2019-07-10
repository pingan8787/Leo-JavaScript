整理：王平安  
最近更新：2019.07.10   

## EFT应届生Web前端入门指南

> EFT：每个字母都相比前一个字母少一笔，我们团队的目标是所开发的“**产品**”能化繁为简，简约而不简单。   ——  宝哥

### 🎀学习建议

1. 边学边写，一定要练习；
2. 整理练习的代码，保存下来；
3. 优先熟悉每个标签的字母拼写，含义，请勿使用编辑器自动补全功能；
4. 适当翻阅感兴趣的知识，发挥想象；
5. 建议绘制自己的知识图谱；

### 🏳️‍🌈教程使用方法

1. 学习时，参考《[w3school教程](http://www.w3school.com.cn/)》，将自己对这个知识点的**理解 / 代码 / 思考**等，填下在每个知识点的下一行。

2. 隔天学习时，先花半小时或一小时，将前一天的知识**重新复习一遍**。

3. 将学习时写的代码，整理起来。

### 💻参考学习网站

1. [《w3school教程》](http://www.w3school.com.cn/)

2. [《火狐开发者社区 MDN》](https://developer.mozilla.org/zh-CN/docs/learn)

### 💡资源收集
#### 1. 学习网站
* [w3school](http://www.w3school.com.cn/) ---  入门知识网站
* [MDN 火狐开发者社区](
https://developer.mozilla.org/zh-CN/) ---  入门知识网站
* [慕课网](https://www.imooc.com/)  ---  视频学习网站
* [掘金](www.juejin.im)  ---  技术社区
* [segmentfault](https://segmentfault.com/) ---  技术社区

#### 2. 常用工具
* 微信  ---  日常沟通
* [语雀](https://www.yuque.com/)  ---  团队知识库
* 印象笔记  ---  个人笔记软件
* TeamViewer 14 --- 电脑远程桌面软件
* WPS ---  文档处理软件

#### 3. 开发工具
* Visual Studio Code  ---  前端最爱的编辑器
* Google Chrome  ---  前端最爱的浏览器
* git  ---  团队代码管理软件


### 一、页面结构层 HTML

可以先脑补下 Google 首页的结构怎么划分。   

**原图：**   

![google start](http://images.pingan8787.com/%E8%B0%B7%E6%AD%8C%E9%A6%96%E9%A1%B5%EF%BC%88%E5%8E%9F%E5%9B%BE%EF%BC%89.png)

**划分(每个人的想法不一定相同)：**   

![google end](http://images.pingan8787.com/D:%5C5-%E6%96%87%E6%A1%A3%5C%E5%9B%BE%E7%89%87%E8%B5%84%E6%96%99%5C%E4%BB%8B%E7%BB%8D%E8%B0%B7%E6%AD%8C%E9%A6%96%E9%A1%B5%EF%BC%88%E7%BB%93%E6%9E%84%20%E6%9C%80%E7%BB%88%EF%BC%89.png)

#### 1.1 HTML 基础

请在每一项下面补充你对这个**知识点的理解**或**简单示例代码**。

**📜必须掌握的一些名称：**   

* **HTML 页面骨架(非常重要)**
* HTML 文档
* HTML 元素
* HTML 标签 / 开始标签 / 结束标签
* HTML 属性 / 属性值
* HTML 常见属性(`id`, `class`, `style`, `title`)
* HTML 标签嵌套
* HTML 块级元素 / 行内元素

**📜必须掌握的一些标签：**   

* HTML 文本标题 / 段落
* HTML 文本链接
* HTML 文本格式化(粗体，斜体，删除字，`span`)
* HTML 图片
* HTML 注释
* HTML 有序 / 无序列表和嵌套列表
* HTML 其他标签(折行符，换行符)

**📄必须了解：**   

* HTML 内联框架
* HTML 脚本(属性)
* HTML 头部(`title` / `meta` / `link` / `base` / `script` / `style`)
* HTML 字符实体(`&lt;` / `&gt;` / `&nbsp;` ...)


**🔖先了解：**  

* HTML 布局
* HTML 响应式设计

#### 1.2 HTML 表格

**📜必须掌握：**   

* HTML 表格标签结构
* 绘制简单表格
* 设置表格属性（边框，表头）
* 设置跨行跨列单元格
* 设置单元格间隔，边距，背景颜色

#### 1.3 HTML 表单

**📜必须掌握：**   

* 表单结构
* `input` 元素输入类型 / 输入属性
* `textarea` 元素 - 多行文本输入
* `select` 元素 - 下拉列表
* `button` 元素 - 点击按钮
* 表单元素的属性
* 提交表单(🎈后面详细讲)

#### 1.4 HTML 其他知识

* 文件路径(相对路径/绝对路径)
* CSS 和 JS 脚本文件引入
* URL 格式

#### 1.5 简单项目

### 二、页面化妆师 CSS

#### 2.1 CSS 介绍

* CSS 概念
* CSS 如何使用（常见4种方式）
* CSS 语法和注意点

#### 2.2 CSS 基础

* CSS 基础选择器（派生 / id / 类 / 属性选择器）
* CSS 文本相关样式（文本颜色 / 字号 / 对齐方式...）
* CSS 列表 / 表格 / 轮廓样式
* CSS 框模型（概念 / 内边距 / 外边距 / 外边距合并）
* CSS 定位（绝对定位 / 相对定位 / 浮动）

#### 2.3 CSS 选择器

这部分选择器是《2.2 CSS 基础》中 **CSS 基础选择器** 章节的拓展：   

* CSS 选择器分组
* CSS 其他选择器（后代 / 子元素 / 相邻兄弟选择器）
* CSS 伪类 / 伪元素

#### 2.3 CSS 布局

> 学习网站： [《MDN - CSS 布局》](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout)

#### 2.4 CSS 高级

* CSS 对齐（多种方式 / 水平对齐 / 垂直对齐）
* CSS 尺寸（宽度 / 高度）
* CSS 导航栏（水平 / 垂直）
* CSS 图片透明
* CSS 分类（6种情况）


### 三、高级页面结构层 HTML5

* HTML5 介绍（概念 / 新特性）
* HTML5 多媒体（视频 / 音频）
* HTML5 画图（Canvas / SVG）
* HTML5 新表单（输入类型 / 元素 / 属性）


### 四、高级页面化妆师 CSS3

这部分内容，需要你将 CSS3 模块的**新属性** 和 **兼容性问题** 整理下来。   

* CSS3 介绍（主要模块）
* CSS3 边框（新属性 / 兼容问题）
* CSS3 背景（新属性 / 兼容问题）
* CSS3 文本效果（新属性 / 兼容问题）
* CSS3 转换（2D转换 / 3D转换）
* CSS3 过渡
* CSS3 动画
* CSS3 字体
* CSS3 单位（尺寸单位使用场景）

### 五、页面舞蹈师 JavaScript
> 学习建议：《[w3school教程](http://www.w3school.com.cn/)》 和 《[《Cute-JavaScript》](http://js.pingan8787.com/)》 对照学习。  

> 参考资料：《[JavaScript知识图谱](https://www.w3cschool.cn/javascript/javascript-skillmap.html)》


#### 5.1 JavaScript 介绍

* JS 概念
* JS 如何使用（常见4种方式）
* JS 注意点

#### 5.2 JavaScript 基础

* JS 语法(声明 / 赋值 / 注释 / 表达式 / 标识符)
* JS 数据类型
* JS 运算符(算术 / 关系 / 对象 / 逻辑 / 位 / 其他 运算符)
* JS 流程控制语句(循环语句 / 跳转语句 / 选择语句 / 异常处理语句)

#### 5.3 JavaScript 变量

* JS 变量声明(命名规则 / 变量类型)
* JS 变量作用域和作用域链
* JS 全局变量和局部变量

#### 5.4 JavaScript 数组 / 对象

* JS 数组定义(概念 / 创建 / 单维数组 / 多维数组)
* JS 数组基本操作(增 / 删 / 改 / 查 / 遍历 / 排序 / 转换)
* JS 对象定义(概念 / 创建 / 属性 / 值 / 方法)
* JS 对象基本操作(增 / 删 / 改 / 查 / 遍历)

#### 5.5 JavaScript 函数

* JS 函数作用
* JS 函数语法(定义 / 调用 / 返回)
* JS 函数参数(入参 / 出参 / 形参 / 实参)

#### 5.6 JavaScript DOM
* JS DOM 概念
* JS 获取 DOM 节点
* JS 操作 DOM 节点(创建 / 插入 / 替换 / 复制 / 删除)
* JS DOM 节点属性操作(获取属性 / 设置属性 / 删除属性)
* JS DOM 节点文本操作
* JS DOM 事件

#### 5.7 JavaScript BOM

暂时先了解：  

* JS BOM 概念
* JS BOM `navigator` 对象
* JS BOM `screen` 对象
* JS BOM `history` 对象
* JS BOM `location` 对象
* JS BOM `document` 对象


### 🎀学习小结

希望学完这些基础的你：  
手头会有**两份笔记**和**很多作业代码**；
脑海里有一片**前端小世界**；
还有更浓厚的**兴趣**；

还希望你：
能够整理好知识点，知识图谱，多复习，多写代码；
能够更上一层楼；


leo 2019/7/10（结）