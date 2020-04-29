## 一、介绍
现在的网络上已经有各样关于 **ECMAScript** 规范介绍和分析的文章，而我自己重新学习一遍这些规范，整理出这么一份笔记，比较精简，主要内容涵盖**ES6**、**ES7**、**ES8**、**ES9**，后续会增加**面试题**，**框架入门**等笔记，欢迎吐槽交流。  
这份资料的**ES6部分**将会参考阮一峰老师的 [ECMAScript6入门](http://es6.ruanyifeng.com/) ，精简和整理出快速实用的内容。  
另外**ES7/ES8/ES9**则会从网络综合参考和整理。     

**ES全称ECMAScript**:  
目前JavaScript使用的ECMAScript版本为[ECMAScript-262](https://www.ecma-international.org/ecma-262/)。

| ECMAScript版本 | 发布时间 | 新增特性 |
| ------ | ------ | ------ |
| ECMAScript 2009(ES5) | 	2009年11月 | 扩展了Object、Array、Function的功能等 |
| ECMAScript 2015(ES6) | 	2015年6月 | 类，模块化，箭头函数，函数参数默认值等 |
| ECMAScript 2016(ES7) | 	2016年3月 | includes，指数操作符 |
| ECMAScript 2017(ES8) | 	2017年6月 | sync/await，Object.values()，Object.entries()，String padding等 | 


## 三、关于作者
[![博客](http://images.pingan8787.com/icon_my1.png)](http://www.pingan8787.com)
[![语雀](http://images.pingan8787.com/assets/icon_26_yuque.png)](https://www.yuque.com/wangpingan/cute-frontend)
[![知乎](http://images.pingan8787.com/icon_zhihu1.png)](https://zhuanlan.zhihu.com/cute-javascript)
[![掘金](http://images.pingan8787.com/icon_juejin2.png)](https://juejin.im/user/586fc337a22b9d0058807d53/posts)
[![思否](http://images.pingan8787.com/icon_sf1.png)](https://segmentfault.com/blog/pingan8787)
[![CSDN](http://images.pingan8787.com/icon_csdn1.png)](https://blog.csdn.net/qq_36380426)
[![简书](http://images.pingan8787.com/icon_jianshu1.png)](https://www.jianshu.com/u/2ec5d94afd60)


完整知识库，请查看我的【**语雀知识库**】，阅读体验更好。[💌跳转~](https://www.yuque.com/wangpingan/cute-frontend)

## 二、目录
- [1. ES6](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.1 let 和 const命令](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.2 变量的解构赋值](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.3 字符串的拓展](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.4 正则的拓展](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.5 数值的拓展](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.6 函数的拓展](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.7 数组的拓展](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.8 对象的拓展](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.9 Symbol](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.10 Set和Map数据结构](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.11 Proxy](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.12 Promise对象](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.13 Iterator和 for...of循环](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.14 Generator函数和应用](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.15 Class语法和继承](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
    - [1.16 Module语法和加载实现](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/1.ES6.md)
- [2. ES7](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/2.ES7.md)
    - [2.1 Array.prototype.includes()方法](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/2.ES7.md)
    - [2.2 指数操作符(**)](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/2.ES7.md)
- [3. ES8](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/3.ES8.md)
    - [3.1 async函数](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/3.ES8.md)
    - [3.2 Promise.prototype.finally()](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/3.ES8.md)
    - [3.3 Object.values()，Object.entries()](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/3.ES8.md)
    - [3.4 Object.getOwnPropertyDescriptors()](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/3.ES8.md)
    - [3.5 字符串填充 padStart和padEnd](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/3.ES8.md)
    - [3.6 函数参数列表与调用中的尾部逗号](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/3.ES8.md)
    - [3.7 共享内存与原子操作](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/3.ES8.md)
- [4. ES9](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/4.ES9.md)
    - [4.1 对象的拓展运算符](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/4.ES9.md)
    - [4.2 正则表达式 s 修饰符](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/4.ES9.md)
    - [4.3 异步遍历器](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-JavaScript/Cute-ES/4.ES9.md)


![bg](http://images.pingan8787.com/2019_07_12guild_page.png)  