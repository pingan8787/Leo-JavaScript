## 本文目录
* 一、项目起步
* 二、编写路由组件
* 三、编写页面组件   
  * 1.编写单一组件
  * 2.模拟数据
  * 3.编写主从组件
* 四、编写模拟服务
  * 1.编写模拟数据
  * 2.编写服务
* 五、引入Rxjx改造项目

## 安装过程省略

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
这里为了项目结构先起来，所以先简单配置一下路由，后面路由会调整：  

1. 安装**路由模块**    
```bash
ng g module app-routing --flat --module=app
```
`--flat` 把这个文件放进了 `src/app` 中，而不是单独的目录中。   
`--module=app` 告诉 CLI 把它注册到 `AppModule` 的 `imports` 数组中。   

2. 引入**路由模块**    
```js
// src/app/app-routing.module.ts  
import { RouterModule, Routes } from '@angular/router';
```
3. 导出**路由模块**的指令  

这里需要添加一个 `@NgModule.exports` 数组，并传入`RouterModule`，导出 `RouterModule` 让路由器的相关指令可以在 `AppModule` 中的组件中使用。   
```js
// src/app/app-routing.module.ts  
@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [RouterModule]
})
```

4. 添加定义路由    

这里添加路由的时候，记得将所需要指向的组件也引入进来，这里我们需要引入两个页面的组件：   
```js
// src/app/app-routing.module.ts  
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
```
然后将我们所需要的路由定义在`routes`变量中，类型是我们引入的`Routes`：    
```js
// src/app/app-routing.module.ts  
const routes: Routes = [
  { path: '', redirectTo:'/index', pathMatch:'full' },    // 1
  { path: 'index', component: IndexComponent},            // 2
  { path: 'detail/:id', component: DetailComponent},      // 3 
]
```
介绍下这段代码：   
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
// src/app/app-routing.module.ts  
imports: [ RouterModule.forRoot(routes) ],
```

6. 添加路由出口   

所谓的路由出口，就是路由所对应的组件展示的地方，接下来我们在`app.component.html`内容中，添加`<router-outlet></router-outlet>`：   
```html
<div>
  <h1> 欢迎来到我的个人书屋! </h1>
  <router-outlet></router-outlet>
</div>
```
这里的`<router-outlet></router-outlet>`就是我们路由输出的地方，也是组件展示的地方，简单理解就是，它会告诉路由器要在哪里显示路由的视图。   

7. 添加路由链接   

所谓的路由链接，就是出发路由跳转事件的地方，比如一个按钮，一张图片等，我们还是在`app.component.html`中，使用`<a routerLink="/path"></a>`添加3个按钮：   
```html
<div>
  <h1> 欢迎来到我的个人书屋! </h1>
  <a routerLink="">重定向</a> | 
  <a routerLink="/index">打开首页</a> | 
  <a routerLink="/detail/1">打开书本详情</a>
  <router-outlet></router-outlet>
</div>
```
这边3个按钮的路由，我们将上面定义的3种路由，传入到`routerLink`参数中，现在就项目就可以实现页面跳转了。    

另外，这里还可以传入一个参数`routerLinkActive="className"`，表示当这个`<a>`标签激活的时候显示的样式，值是一个字符串，为样式的类名：   
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
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }
  ngOnInit() {}
}
```
**代码解释**：    
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
**代码解释**：    
`route.snapshot` 是一个路由信息的**静态快照**，抓取自组件刚刚创建完毕之后。       
`paramMap` 是一个URL中路由所携带的参数值的对象。"id"对应的值就是要获取的书本的 id。     
**注意**：   
路由参数总会是字符串。这里我们使用 (+) 操作符，将字符串转换成数字。     


现在在浏览器上刷新下页面，再点击 ** 打开书本详情** 按钮，可以看到控制台输出了` 此课本的id是1 `的结果。   
到这一步，我们算是把路由配置完成了，接下来可以开始做页面的逻辑了。    


## 三、编写页面组件   
接下来开始编写页面组件，这里我们挑重点来写，一些布局的样式，后面可以看源码。   

### 1.编写单一组件
我们首先写一个书本信息的组件，代码如下：
```html
<!-- index.component.html -->
<div class="content">
  <div class="books_box">
    <!-- 单个课本 -->
    <div class="books_item" *ngFor="let item of [1,2,3,4,5,6,7,8,9,10]">
      <img class="cover" src="https://img3.doubanio.com/view/subject/m/public/s29988481.jpg">
      <div class="title"><a>像火焰像灰烬</a></div>
      <div class="author">程姬</div>
    </div>
  </div>
</div>
```
**知识点**：     
`*ngFor` 是一个 Angular 的复写器（repeater）指令，就像**angular1**中的`ng-for`和**vuejs**中的`v-for`。 它会为列表中的每项数据复写它的宿主元素。   
这时候可以看到页面变成下面这个样子：  
![图片3-1](http://images.pingan8787.com/angular_books_3_1.png)     


接下来我们要把写死在HTML上面的数据，抽到JS中：    

现在先新建一个`books.ts`文件来定义一个`Book`类，并添加`id`，`url`，`title`和`author`四个属性：  
```js
// src/app/books.ts
export class Book {
    id: number;
    url: string;
    title: string;
    author: string;
}
```
然后回到`index.component.ts`文件去引入它，并定义一个`books`属性，使用导入进来的`Book`类作为类型：   
```js
// index.component.ts
import { Book } from '../books';
export class IndexComponent implements OnInit {
  books: Book = {
    id: 1,
    url: 'https://img3.doubanio.com/view/subject/m/public/s29988481.jpg',
    title: '像火焰像灰烬',
    author: '程姬',
  }
}
```
然后再改造前面的组件文件`index.component.html`:   
```html
<!-- index.component.html -->
<div class="books_item" *ngFor="let item of [1,2,3,4,5,6,7,8,9,10]">
  <img class="cover" src="{{books.url}}" alt="{{books.id}}">
  <div class="title">
    <a>{{books.title}}</a>
  </div>
  <div class="author">{{books.author}}</div>
</div>
```

接着，我们再为每个课本添加一个点击事件，来实现点击封面图能查看大图的效果，现在`index.component.ts`中定义一个`getDetailImage`方法，并在`index.component.html`中绑定该方法：   
```js
// index.component.ts
export class IndexComponent implements OnInit {
  getDetailImage(books){
    alert(`正在查看id为${books.id}的大图！`);
  }
}
```
这边方法的具体实现，不写，不是本文重点。下面是增加点击事件的绑定：     
```html
<!-- index.component.html -->
<img class="cover" src="{{books.url}}" alt="{{books.id}}" (click)="getDetailImage(books)">
```
**知识点**：    
`(click)`是Angular用来绑定事件，它会让 Angular 监听这个` <img>` 元素的 `click` 事件。 当用户点击 `<img>` 时，Angular 就会执行表达式 `getDetailImage(books)`。    

再来，我们引入前面学到的**路由链接**指令来改造HTML：   
```html
<!-- index.component.html -->
<a routerLink="/detail/{{books.id}}">{{books.title}}</a>
```
这时候，我们在点击书本的标题，发现页面跳转到URL地址为`http://localhost:4200/detail/1`的页面，这就说明，我们页面的路由跳转也成功了~    

改造完成后，可以看到，页面显示的还是一样，接下来我们先这样放着，因为我们后面会进行数据模拟，和模拟服务器请求。    

我们就这样写好第一个单一组件，并且数据是从JS中读取的。   

### 2.模拟数据
这时候为了方便后面数据渲染，我们这里需要模拟一些本地数据，我们创建一个本地` mock-books.ts`文件来存放模拟的数据：    
```js
// app/mock-books.ts
import { Books } from './books';
export const BookList: Books[] = [
    {
        id: 1, 
        url: 'https://img3.doubanio.com/view/subject/m/public/s29988481.jpg',
        title: '像火焰像灰烬',
        author: '程姬',
    },
    // 省略其他9条
]
```
然后在`index.component.ts`中导入模拟的数据，并将原有的`books`值修改成导入的模拟数据`BookList`：    
```js
// index.component.ts
import { BookList } from '../mock-books';
books = BookList;
```
并将原本的`*ngFor`中修改成这样，绑定真正的数据：   
```html
<!-- index.component.html -->
<div class="books_item" *ngFor="let item of books">
  <img class="cover" src="{{item.url}}" alt="{{item.id}}">
  <div class="title">
    <a>{{item.title}}</a>
  </div>
  <div class="author">{{item.author}}</div>
</div>
```

### 3.编写主从组件
当我们写完一个单一组件后，我们会发现，如果我们把每个组件都写到同一个HTML文件中，这是很糟糕的事情，这样做有缺点：   
* 代码复用性差；（导致每次相同功能要重新写）   
* 代码难维护；（因为一个文件会非常长）
* 影响性能；（打开每个页面都要重复加载很多）

为了解决这个问题，我们这里就要开始使用真正的**组件化思维**，将通用常用组件抽离出来，通过参数传递来控制组件的不同业务形态。   
这便是我们接下来要写的主从组件。    

思考一下，我们这里现在能抽成组件作为公共代码的，就是这个单个书本的内容，因为每个书本的内容都一致，只是里面数据的差异，于是我们再新建一个组件：   
```bash
ng g component books
```
并将前面`index.component.html`中关于课本的代码剪切到`books.component.html`中来，然后删除掉`*ngFor`的内容，并将原本本地的变量`books`替换成`list`，这个变量我们等会会取到：   
```html
<!-- books.component.html -->
<div class="books_item">
  <img class="cover" src="{{list.url}}" alt="{{list.id}}" (click)="getDetailImage(list)">
  <div class="title">
    <a routerLink="/detail/{{list.id}}">{{list.title}}</a>
  </div>
  <div class="author">{{list.author}}</div>
</div>
```
再将这个组件，引用到它的父组件中，这里是要引用到`index.component.html`的组件中，并将前面的`*ngFor`再次传入`<app-books>`：   
```html
<div class="content">
  <div class="books_box">
    <app-books *ngFor="let item of books"></app-books>
  </div>
</div>
```

接下来要做的就是获取到`list`变量的值，显然这个值是要从外面组件传进来的，我们需要在`books.component.ts`引入前面定义的 `Books`类 和 `@Input() 装饰器`，还要添加一个带有 `@Input() 装饰器`的 `list` 属性，另外还要记得将`getDetailImage`方法也剪切过来：    
```js
// books.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Books } from '../books';

export class BooksComponent implements OnInit {
  @Input() list: Books;
  constructor() { }
  ngOnInit() {}
  getDetailImage(books){
    alert(`正在查看id为${books.id}的大图！`);
  }
}
```
`@Input() 装饰器`介绍具体可以查看 [手册](https://angular.cn/guide/template-syntax#inputs-outputs)   

我们要获取的 `list` 属性必须是一个带有` @Input() `装饰器的输入属性，因为外部的 `IndexComponent` 组件将会绑定到它。就像这样：   
```html
<app-books *ngFor="let list of books" [list]="item"></app-books>
```

**知识点**：   
`[list]="item"` 是 `Angular` 的**属性绑定**语法。这是一种**单向数据绑定**。从 `IndexComponent` 的 `item` 属性绑定到目标元素的 `list` 属性，并映射到了 `BooksComponent` 的 `list` 属性。

做到这里，我们已经将`BooksComponent`作为`IndexComponent`的子组件来引用了，在实际开发过程中，这样的父子组件关系，会用的非常多。    

写到这里，看看我们项目，还是一样正常在运行，只是现在项目中组件分工更加明确了。   

现在的效果图：    
![图片3-2](http://images.pingan8787.com/angular_books_3_2.png)