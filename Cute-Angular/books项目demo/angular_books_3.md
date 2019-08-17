## 本文目录
* 一、[项目起步](https://juejin.im/post/5c70ae586fb9a049c64476a0)
* 二、[编写路由组件](https://juejin.im/post/5c70ae586fb9a049c64476a0)
* 三、[编写页面组件](https://juejin.im/post/5c70b48d6fb9a04a0b22cbce)   
  * 1.[编写单一组件](https://juejin.im/post/5c70b48d6fb9a04a0b22cbce)
  * 2.[模拟数据](https://juejin.im/post/5c70b48d6fb9a04a0b22cbce)
  * 3.[编写主从组件](https://juejin.im/post/5c70b48d6fb9a04a0b22cbce)
* 四、**编写服务**
  * 1.**为什么需要服务**
  * 2.**编写服务**
* 五、**引入RxJS**
  * 1.**关于RxJS**
  * 2.**引入RxJS**
  * 3.**改造数据获取方式**
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
由于原本直接赋值数据，在实际场景中是不可能这样同步的，所以这里`subscribe`函数，会在`Observable`发出数据以后，再把书本列表传到里面的回调函数，再复制给`books`属性。    
使用这种异步方式，当 `BooksService` 从远端服务器获取英雄数据时，不用担心还没拿到数据就执行后面。   

下一步，我们就要改造一下项目了。   

**本部分内容到这结束**

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|JS小册|js.pingan8787.com|
|微信公众号|前端自习课|


![前端自习课](https://camo.githubusercontent.com/7d890fb10cccf99c03dcf144e0e290357195ac44/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f322f31362f313638663439663032333831393163613f773d3130373826683d36343726663d706e6726733d323832353135)
