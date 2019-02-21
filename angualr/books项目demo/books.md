## 本文目录
* 一、项目起步
* 二、编写路由组件
* 三、编写页面组件   
  * 1.编写单一组件
  * 2.模拟数据
  * 3.编写主从组件
* 四、编写服务
  * 1.为什么需要服务
  * 2.编写服务
* 五、引入RxJS改造项目
  * 1.关于RxJS
  * 2.改造数据获取方式

## 零、Angular安装
Angular 需要 `Node.js` 的 `8.x` 或 `10.x` 版本。    
检查你的`Node.js`版本，请在终端/控制台窗口中运行 node -v 命令。    
要想安装 Node.js，请访问 nodejs.org。   

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


## 四、编写服务
截止到这部分，我们的`BooksComponent`组件获取和显示的都是本地模拟的数据。   
接下来我们要开始对这些进行重构，让聚焦于为它的视图提供支持，这也让它更容易使用模拟服务进行单元测试。    

### 1.为什么需要服务
我们不应该让组件来直接获取或保存数据，它们应该聚焦于展示数据，而数据访问的工作交给其他服务来做。   
这里我们需要创建一个名为`BooksService`的服务，让我们应用中所有的类都使用它来获取书本列表的数据，使用的时候，只需要将它通过Angular的**依赖注入机制**注入到需要用的组件的构造函数中。    

**知识点：**   
服务可以实现多个不同组件之间信息共享，后面我们还会将它注入到两个地方：   
`BooksService`中，使用该服务发送消息。   
`IndexService`中，使用该服务来展示消息。   

接下来我们使用命令行，创建`BooksService `：  
```bash
ng g service books
```
在生成的`books.service.ts`文件中：   
```js
// books.service.ts
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
```
新导入了`@Injectable`装饰器，是为了让`BooksService`提供一个可注入的服务，并且它还可以拥有自己的待注入的依赖，简单理解就是**如果你的服务需要依赖，那么你就需要导入它**。   
并且它接收该服务的元数据对象。    

### 2.编写服务
接下来我们开始编写`books.service.ts`服务。    

* 导入服务所需组件

这里我们导入`Books`和`BookList`，并添加一个`getBooks`方法来返回所有书本的数据，并且还需要添加一个`getBooks`方法来返回指定id的书本信息:   
```js
// index.component.ts
import { Books } from './books';
import { BookList } from './mock-books';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor() { }
  getBookList(): Books[] {
    return BookList;
  }
  getBook(id: number): Books{
    return BookList.find(book => book.id === id)
  }
}
```
在我们使用这个服务之前，需要先注册该服务，因为我们在使用`ng g service books`命令创建服务时，CLI已经默认为我们添加了注册了，这是方法就是上面代码中的：   
```js
providedIn: 'root'
```
表示将我们的服务注册在**根注入器**上，这样我们就可以把这个服务注入到任何享用的类上了。   

* 修改`IndexComponent`   

先删除`BookList`的引入，并修改`books`属性的定义：   

```js
// index.component.ts
import { BooksService } from '../books.service';
export class IndexComponent implements OnInit {
  books : Books[];
  ngOnInit() {}
}
```
然后注入我们的`BooksService`服务，需要先往构造函数中添加一个私有的`booksservice`，使用注入的`BooksService`作为类型，理解成一个注入点：   
```js
// index.component.ts
constructor(private booksservice: BooksService) { }
```

之后我们需要添加一个`getBooks`方法来获取这些书本数据，并在生命周期函数`ngOnInit`中调用：    
```js
export class IndexComponent implements OnInit {
  ngOnInit() {
    this.getBooks();
  }
  getBooks(): void{
    this.books = this.booksservice.getBookList();
  }
}
```

* 修改`DetailComponent`   
我们先改造书本详情页的HTML结构：   
```html
<!-- detail.component.html -->
<div *ngIf="books" class="detail">
  <h3>《{{books.title}}》介绍</h3>
  <div>
    <img src="{{books.url}}">
  </div>
  <p>书本标题: {{books.title}}</p>
  <p>书本作者: {{books.author}}</p>
  <p>书本id: {{books.id}}</p>
</div>
<div *ngIf="!books" class="detail">
  <h3>暂无信息</h3>
</div>
```
**知识点**：   
这里使用了`*ngIf`指令，当条件为`true`则显示其HTML内容。

```js
// detail.component.ts
import { Books } from '../books';
import { BooksService } from '../books.service';
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private booksservice: BooksService  // 引入BooksService服务
  ) { }

  books: Books;  // 定义books类型
  ngOnInit() {
    this.getDetail()
  }
  getDetail(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.getBooks(id);
  }
  getBooks(id: number): void {
    this.books = this.booksservice.getBook(id);
  }
}
```
这段代码，主要定义了`getBooks`方法，当刚进入页面时，将书本`id`传入`getBooks`方法，去`BooksService`去获取对应id的书本信息，并复制给变量`books`，然后展示到页面。   

改造之后，我们的页面显示依旧正常。   

![图片3-2](http://images.pingan8787.com/angular_books_3_2.png)

但是我们要知道，这背后的逻辑已经改变了。   

## 五、引入RxJS改造项目
### 1.关于RxJS
这里简单介绍关键概念，具体可以查看 [RxJS 官网](https://RxJS.dev/)，也可以参考 [浅析Angular之RxJS](https://www.jianshu.com/p/36d85f8cafdd)。    

#### 什么是RxJS

RxJS全称`Reactive Extensions for JavaScript`，中文意思: JavaScript的响应式扩展。   
RxJS主要是提供一种更加强大和优雅的方式，来利用响应式编程的模式，实现JavaScript的异步编程。   

#### RxJS优点

* 纯净性；   
* 流动性；    

#### RxJS核心概念

RxJS 是基于观察者模式和迭代器模式以函数式编程思维来实现的。RxJS 中含有两个基本概念：`Observables` 与 `Observer`。    
`Observables` 作为被观察者，是一个值或事件的流集合；而 `Observer` 则作为观察者，根据 `Observables` 进行处理。它们之间的订阅发布关系(观察者模式) 如下：        
**订阅**：`Observer` 通过 `Observable` 提供的 `subscribe()` 方法订阅 `Observable`。   
**发布**：`Observable` 通过回调 `next` 方法向 `Observer` 发布事件。   

———— 来源[Angular修仙之路 RxJS Observable](http://www.semlinker.com/rxjs-observable/) 

另外这里列出来一些核心，具体还是看官网咯，并且下面使用到的时候会具体介绍。   
* `Observable` (可观察对象): 表示一个概念，这个概念是一个可调用的未来值或事件的集合。   
* `Observer`(观察者): 一个回调函数的集合，它知道如何去监听由 `Observable` 提供的值。    
* `Subscription` (订阅): 表示 `Observable` 的执行，主要用于取消 `Observable` 的执行。    
* `Operators` (操作符): 采用函数式编程风格的纯函数 (`pure function`)，使用像 `map`、`filter`、`concat`、`flatMap` 等这样的操作符来处理集合。   
* `Subject` (主体): 相当于 `EventEmitter`，并且是将值或事件多路推送给多个 `Observer` 的唯一方式。   
* `Schedulers` (调度器): 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 `setTimeout` 或` requestAnimationFrame `或其他。   

### 2.引入RxJS
在我们的真实应用中，我们必须要等到服务器响应后，我们才能获取到数据，因此这天生就需要用异步思维来操作。   

由于Angular中已经自带RxJS，所以我们只要在需要使用的时候，引入即可使用：   

### 3.改造数据获取方式
了解完RxJS的一些概念后，我们开始改造下这些书本的数据获取方式。   

* 改造`BooksService`   

首先我们从 RxJS 中导入 `Observable` 和 `of` 符号：   
```js
// books.service.ts
import { Observable, of } from 'rxjs';
```
**知识点**：   
`Observable`:  观察者模式中的观察者，具体可以参考 [Angular修仙之路 RxJS Observable](http://www.semlinker.com/rxjs-observable/)    
`of`:  用来获取观察者拿到的数据，通常是一个`Observable`。   

然后修改`getBookList`方法
```js
// books.service.ts
getBookList(): Observable<Books[]> {
  return of(BookList);
}
```
这里 `of(BookList)` 返回一个` Observable<Books[]>`，它会发出单个值，这个值就是这些模拟书本的数组。   

* 改造`IndexComponent`   

这里也要修改`getBooks`方法，使用`subscribe`去订阅服务返回回来的值：    
```js
// index.component.ts
getBooks(): void{
  this.booksservice.getBookList()
    .subscribe(books => this.books = books);
}
```