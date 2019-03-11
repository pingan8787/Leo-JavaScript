Angular知识点整理，内容以Angular4实战课程中整理：   

1. 程序架构
* 组件：Angular基本构建块，是一段含业务逻辑和数据的html
* 服务：封装可重用的业务逻辑
* 指令：允许向html元素添加指定行为
* 模块：将不同部分组成一个单元


2. 组件相关概念
Component 必备：   
* 装饰器 @Component() 告知Angular如何处理类，它包含的值叫**元数据**，根据元数据来渲染和展示组件。 
@叫装饰器，@Component()叫组件元数据装饰器

* 模版 Template 
* 控制器 Controller 包含绝大多数页面逻辑

可选的可注入对象：   
* 输入属性 @Imports() 组件之间传递数据
* 提供器 providers  依赖注入
* 生命周期钩子 Lifecycle Hooks

可选的输出对象：  
* 输出属性 @Outputs 
* 样式表 styles 
* 动画 Animations 
* 生命周期钩子 Lifecycle Hooks 

@NgModule:   
* declatations  模块包含的内容，只能组件指令和管道
* imports 组件依赖的模块
* providers  模块提供的服务
* bootstrap  模块的主组件