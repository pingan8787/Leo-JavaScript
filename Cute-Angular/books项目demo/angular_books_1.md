## 本文目录
* **一、项目起步**
* **二、编写路由组件**
* 三、编写页面组件   
  * 1.编写单一组件
  * 2.模拟数据
  * 3.编写主从组件
* 四、编写服务
  * 1.为什么需要服务
  * 2.编写服务
* 五、引入RxJS
  * 1.关于RxJS
  * 2.引入RxJS
  * 3.改造数据获取方式
* 六、改造组件
  * 1.添加历史记录组件
  * 2.添加和删除历史记录
* 七、HTTP改造
  * 1.引入HTTP
  * 2.通过HTTP请求数据
  * 3.通过HTTP修改数据
  * 4.通过HTTP增加数据
  * 5.通过HTTP删除数据
  * 6.通过HTTP查找数据
* 八、结语



这个入门项目是我学习完[Angular 英雄指南教程](https://angular.cn/tutorial)后，自己手写的一个练习项目，一步一步来，最终的[项目源码可以这里查看](https://github.com/pingan8787/Leo-JavaScript/tree/master/Angular/books%E9%A1%B9%E7%9B%AEdemo/books_angular)，大佬们请指点啦。    

推荐两个Angular学习网站：   
1. [Angular 中文网](https://angular.cn/)   
2. [Angular 修仙之路](http://www.semlinker.com/)   

还有呢，我没怎么关注到样式，所以样式会有点丑，主要都放在核心逻辑中了。   
**最终实现：**    
* 首页书本列表数据展示
* 各个页面静态/动态路由跳转
* 本地模拟数据服务
* 书本数据的增删改查
* 父子组件通信
* 常用指令使用和介绍

![图片结果](https://user-gold-cdn.xitu.io/2019/2/23/1691828f7d7ff8f7?w=895&h=847&f=png&s=101062)

后面我将把这个系列的文章，收录到我的[【CuteJavaScript】](http://js.pingan8787.com)中，里面有整理了**ES6/7/8/9知识点**和**重温JS基础系列**文章。   

那么，快跟我一步步来完成这个入门项目吧。

## 零、Angular安装
Angular 需要 `Node.js` 的 `8.x` 或 `10.x` 版本。    
检查你的`Node.js`版本，请在终端/控制台窗口中运行 `node -v` 命令。    
要想安装` Node.js`，请访问 nodejs.org。   

1. 安装Angular CLI   

```bash
npm install -g @angular/cli
```

2. 常用命令

后续用到会详细介绍这些命令。

* 启动服务，并打开新窗口
```bash
ng serve --open
# --open 可简写 -o
```

* 创建新组件
```bash
ng generate component books
# generate 可简写 g
```

* 创建新服务
```bash
ng generate service books
```

* 创建路由模块
```bash
ng generate module app-routing --flat --module=app
```

* 其他   
另外Angular CLI还有很多的命令提供，详细可以查阅官方文档 [Angular CLI 命令](https://angular.cn/cli)。

最后搭建完是这样：    

![图片创建](https://user-gold-cdn.xitu.io/2019/2/23/1691828f7c418b79?w=579&h=631&f=png&s=29117)

## 一、项目起步
1. 创建项目    
```bash
ng new books
cd books
```

2. 创建所需的两个页面组件  
```bash
ng g component index
ng g component detail
```
`g`是`generate`的简写。   


## 二、编写路由组件
这里为了项目结构先起来，所以先简单配置一下路由，后面路由会调整，如果遇到什么不懂，可以查看[Angular 路由与导航](https://angular.cn/guide/router)。  

1. 安装**路由模块**    
```bash
ng g module app-routing --flat --module=app
```
**知识点：**   
`--flat` 把这个文件放进了 `src/app` 中，而不是单独的目录中。   
`--module=app` 告诉 CLI 把它注册到 `AppModule` 的 `imports` 数组中。   

2. 引入**路由模块**    
```js
// app-routing.module.ts  
import { RouterModule, Routes } from '@angular/router';
```
3. 导出**路由模块**的指令  

这里需要添加一个 `@NgModule.exports` 数组，并传入`RouterModule`，导出 `RouterModule` 让路由器的相关指令可以在 `AppModule` 中的组件中使用。   
```js
// app-routing.module.ts  
@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [RouterModule]
})
```

4. 添加定义路由    

这里添加路由的时候，记得将所需要指向的组件也引入进来，这里我们需要引入两个页面的组件：   
```js
// app-routing.module.ts  
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
```
然后将我们所需要的路由定义在`routes`变量中，类型是我们引入的`Routes`：    
```js
// app-routing.module.ts  
const routes: Routes = [
  { path: '', redirectTo:'/index', pathMatch:'full' },    // 1
  { path: 'index', component: IndexComponent},            // 2
  { path: 'detail/:id', component: DetailComponent},      // 3 
]
```
**知识点**：     
`angular`的路由接收两个参数：   
* `path`：用于匹配浏览器地址栏中 `URL` 的字符串。   
* `component`：当导航到此路由时，路由器展示的组件名称。   

**第1行代码**：   
作为路由系统的默认路由，当所有路由都不匹配的话，就会重定向到这个路由，并展示对应的组件。   
**第2行代码**：    
正常情况下的路由配置。   
**第3行代码**：    
配置的是携带参数的路由，在路由`/`后，用 `:` 拼接参数名来实现，**获取这个参数的值的方法后面会介绍**。

另外，我们还可以这么传递参数，直接将数据通过路由传入，后面还会介绍：   
```js
{ path: 'pathname', component: DemoComponent, data: { title: 'pingan8787' } },
```

5. 添加路由监视   

配置好路由还不能使用，需要一个监视路由变化的工具，这时候需要把`RouterModule`添加到 `@NgModule.imports` 数组中，并用 `routes` 来配置它。   
这里只需要调用` imports `数组中的 `RouterModule.forRoot()` 函数就行了，就像这样：   
```js
// app-routing.module.ts  
imports: [ RouterModule.forRoot(routes) ],
```

6. 添加路由出口   

所谓的路由出口，就是路由所对应的组件展示的地方，接下来我们在`app.component.html`内容中，添加`<router-outlet></router-outlet>`：   
```html
<!-- app.component.html -->
<div>
  <h1> 欢迎来到我的个人书屋! </h1>
  <router-outlet></router-outlet>
</div>
```
这里的`<router-outlet></router-outlet>`就是我们路由输出的地方，也是组件展示的地方，简单理解就是，它会告诉路由器要在哪里显示路由的视图。   

7. 添加路由链接   

所谓的路由链接，就是出发路由跳转事件的地方，比如一个按钮，一张图片等，我们还是在`app.component.html`中，使用`<a routerLink="/path"></a>`添加3个按钮：   
```html
<!-- app.component.html -->
<div>
  <h1> 欢迎来到我的个人书屋! </h1>
  <a routerLink="">重定向</a> | 
  <a routerLink="/index">打开首页</a> | 
  <a routerLink="/detail/1">打开书本详情</a>
  <router-outlet></router-outlet>
</div>
```
这边3个按钮的路由，我们将上面定义的3种路由，传入到`routerLink`参数中，现在就项目就可以实现页面跳转了。    

另外，这里还可以传入一个可选参数`routerLinkActive="className"`，表示当这个`<a>`标签激活的时候显示的样式，值是一个字符串，为样式的类名：   
```html
<a routerLink="/index" routerLinkActive="activeClass">打开首页</a> | 
```

8. 获取带参数路由的参数    

在第7步中，我们点击 **打开书本详情** 按钮中，在路由中带了参数，这时候我们需要这么来获取这个参数：    
* 先导出模块`ActivatedRoute`和`Location`：   
```js
// detail.component.ts
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
```
* 再注入到构造函数中，并将值作为私有变量：    
```js
// detail.component.ts
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }
  ngOnInit() {}
}
```
**知识点：**      
`ActivatedRoute` 保存该 `DetailComponent` 实例的路由信息。可以从这个组件获取URL中的路由参数和其他数据。    
`Location` 是一个 `Angular` 的服务，用来与浏览器打交道。后续会使用它来导航回上一个视图。    

* 提取路由参数：  

这里声明`getDetail`方法，提取路由参数，并`ngOnInit`**生命周期钩子方法**在中执行。    
```js
// detail.component.ts
ngOnInit() {
    this.getDetail()
}
getDetail(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`此课本的id是${id}`)
}
```
**知识点**：    
`route.snapshot` 是一个路由信息的**静态快照**，抓取自组件刚刚创建完毕之后。       
`paramMap` 是一个URL中路由所携带的参数值的对象。"id"对应的值就是要获取的书本的 id。     
**注意**：   
路由参数总会是字符串。这里我们使用 (+) 操作符，将字符串转换成数字。     

现在在浏览器上刷新下页面，再点击 **打开书本详情** 按钮，可以看到控制台输出了` 此课本的id是1 `的结果。   
到这一步，我们算是把路由配置完成了，接下来可以开始做页面的逻辑了。    

**本部分内容到这结束**

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|JS小册|js.pingan8787.com|
|微信公众号|前端自习课|


![前端自习课](https://user-gold-cdn.xitu.io/2019/2/16/168f49f0238191ca?w=1078&h=647&f=png&s=282515)
