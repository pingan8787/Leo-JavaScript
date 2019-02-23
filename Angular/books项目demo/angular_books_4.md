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


## 六、改造组件
从这里开始，我们要使用RxJS来改造组件和添加新功能了，让整个项目更加完善。    

### 1.添加历史记录组件

* 创建`HistoryComponent`组件
```bash
ng g component hostory
```
然后在`app.component.html`文件夹中添加组件：   
```html
<!-- app.component.html -->
<app-history></app-history>
```

### 2.添加增删改查功能

这里我们要开始做书本的增删改查功能，需要先创建一个`HistoryService`服务，方便我们实现这几个功能：   

* 创建`HistoryService`服务
```bash
ng g service history
```
然后在生成的ts文件中，增加`add`和`clear`方法，`add`方法用来添加历史记录到`history`数组中，`clear`方法则是清空`history`数组：   
```js
// history.service.ts
export class HistoryService {
    history: string[] = [];
    add(history: string){
        this.history.push(history);
    }
    clear(){
        this.history = [];
    }
}
```

* 使用`HistoryService`服务

在将这个服务，注入到`BooksService`中，并改造`getBooks`方法：   
```js
// books.service.ts
import { HistoryService } from './history.service';
constructor(
    private historyservice: HistoryService
) { }
getBooks(): void{
    this.historyservice.add('请求书本数据')
    this.booksservice.getBookList()
        .subscribe(books => this.books = books);
}
```
也可以用相同方法，在`IndexComponent`中添加`访问首页书本列表`的记录。    
```js
// index.component.ts
import { HistoryService } from '../history.service';
constructor(
    private booksservice: BooksService,
    private historyservice: HistoryService
) { }
getBooks(): void{
    this.historyservice.add('访问首页书本列表');
    this.booksservice.getBookList()
        .subscribe(books => this.books = books);
}
```

接下来，将我们的`HistoryService`注入到`HistoryComponent`中，然后才能将历史数据显示到页面上：   
```js
// history.component.ts
import { HistoryService } from '../history.service';
export class HistoryComponent implements OnInit {
    constructor(private historyservice: HistoryService) { }
    ngOnInit() {}
}
```
```html
<!-- history.component.html -->
<div *ngIf="historyservice.history.length">
    <h2>操作历史：</h2>
    <div>
        <button class="clear"
        (click)="historyservice.clear()"
        >清除</button>
        <div *ngFor="let item of historyservice.history">{{item}}</div>
    </div>
</div>
```
**代码解释**：   
`*ngIf="historyservice.history.length"`，是为了防止还没有拿到历史数据，导致后面的报错。    
`(click)="historyservice.clear()"`, 绑定我们服务中的`clear`事件，实现清除缓存。   
`*ngFor="let item of historyservice.history"`，将我们的历史数据渲染到页面上。   


到了这一步，就能看到历史数据了，每次也换到首页，都会增加一条。    

![图片5-1](http://images.pingan8787.com/angular_books_5_1.png)

接下来，我们要在书本详情页也加上历史记录的统计，导入文件，注入服务，然后改造`getBooks`方法，实现历史记录的统计：   
```js
// detail.component.ts
import { HistoryService } from '../history.service';

export class DetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private booksservice: BooksService,
        private historyservice: HistoryService
    ) { }
    //...
    getBooks(id: number): void {
        this.books = this.booksservice.getBook(id);
        this.historyservice.add(`查看书本${this.books.title}，id为${this.books.id}`);
        console.log(this.books)
    }
}
```
![图片5-2](http://images.pingan8787.com/angular_books_5_2.png)

这时候就可以在历史记录中，看到这些操作的记录了，并且**清除**按钮也正常使用。   

## 七、HTTP改造
原本我只想写到上一章，但是想到，我们实际开发中，哪有什么本地数据，基本上数据都是要从服务端去请求，所以这边也有必要引入这一张，模拟实际的HTTP请求。   

### 1.引入HTTP
在这一章，我们使用Angular提供的 `HttpClient` 来添加一些数据持久化特性。   
然后实现对书本数据进行**获取，增加，修改，删除和查找**功能。 

`HttpClient`是Angular通过 HTTP 与远程服务器通讯的机制。    

这里我们为了让`HttpClient`在整个应用全局使用，所以将`HttpClient`导入到根模块`app.module.ts`中，然后把它加入 `@NgModule.imports` 数组：   
```js
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    //...
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    //...
})
```

这边我们使用 [内存 Web API（In-memory Web API） ](https://github.com/angular/in-memory-web-api)模拟出的远程数据服务器通讯。   
**注意：** 这个内存 Web API 模块与 Angular 中的 HTTP 模块无关。

通过下面命令来安装：   
```bash
npm install angular-in-memory-web-api --save
```
然后在`app.module.ts`中导入 `HttpClientInMemoryWebApiModule` 和 `InMemoryDataService` 类（后面创建）：   
```js
// app.module.ts
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
@NgModule({
    // ...
    imports: [
        // ...
        HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, {dataEncapsulation:false}
        )
    ],
    // ...
})
export class AppModule { }
```
**知识点：**   
`forRoot()` 配置方法接受一个 InMemoryDataService 类（初期的内存数据库）作为参数。   

然后我们要创建`InMemoryDataService`类：   
```bash
ng g service InMemoryData
```
并将生成的`in-memory-data.service.ts`修改为：   
```js
// in-memory-data.service.ts
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Books } from './books';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const books = [
      {
          id: 1, 
          url: 'https://img3.doubanio.com/view/subject/m/public/s29988481.jpg',
          title: '像火焰像灰烬',
          author: '程姬',
      },
      // 省略其他9条数据
    ];
    return {books};
  }
  constructor() { }
}
```

这里先总结`InMemoryDbService`所提供的RESTful API，后面都要用到：   
例如如果`url`是`api/books`，那么  
* 查询所有成员：以**GET**方法访问`api/books`    
* 查询某个成员：以**GET**方法访问`api/books/id`，比如`id`是`1`，那么访问`api/books/1`  
* 更新某个成员：以**PUT**方法访问`api/books/id`   
* 删除某个成员：以**DELETE**方法访问`api/books/id`    
* 增加一个成员：以**POST**方法访问`api/books`   


### 2.通过HTTP请求数据

现在要为接下来的网络请求做一些准备，先在`books.service.ts`中引入HTTP符号，然后注入`HttpClient`并改造：   
```js
// books.service.ts
import { HttpClient, HttpHeaders} from '@angular/common/http';
// ...
export class BooksService {
    constructor(
        private historyservice: HistoryService,
        private http: HttpClient
    ) { }
    private log(histories: string){
        this.historyservice.add(`正在执行：${histories}`)
    }
    private booksUrl = 'api/books'; // 提供一个API供调用
    // ...
}
```
这里我们还新增一个私有方法`log`和一个私有变量`booksUrl`。    

接下来我们要开始发起http请求数据，开始改造`getBookList`方法：   
```js
// books.service.ts
// ...
getBookList(): Observable<Books[]> {
    this.historyservice.add('请求书本数据')
    return this.http.get<Books[]>(this.booksUrl);
}
// ...
```
这里我们使用 `http.get` 替换了 `of`，其它没修改，但是应用仍然在正常工作，这是因为这两个函数都返回了 `Observable<Hero[]>`。   

实际开发中，我们还需要考虑到**请求的错误处理**，要捕获错误，我们就要使用 RxJS 的 `catchError()` 操作符来建立对 Observable 结果的处理管道（pipe）。   

我们引入`catchError `并改造原本`getBookList`方法：   

```js
// books.service.ts
getBookList(): Observable<Books[]> {
    this.historyservice.add('请求书本数据')
    return this.http.get<Books[]>(this.booksUrl).pipe(
        catchError(this.handleError<Books[]>('getHeroes', []))
    );
}
private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        this.log(`${operation} 失败: ${error.message}`); // 发出错误通知
        return of(result as T); // 返回空结果避免程序出错
    };
}
```
**知识点**：   
`.pipe()` 方法用来扩展 `Observable` 的结果。    
`catchError()` 操作符会拦截失败的 Observable。并把错误对象传给错误处理器，错误处理器会处理这个错误。    
`handleError()` 错误处理函数做了两件事，发出错误通知和返回空结果避免程序出错。   

这里还需要使用`tap`操作符改造`getBookList`方法，来窥探`Observable`数据流，它会查看`Observable`的值，然后我们使用`log`方法，记录一条历史记录。   
`tap` 回调不会改变这些值本身。   
```js
// books.service.ts
getBookList(): Observable<Books[]> {
    return this.http.get<Books[]>(this.booksUrl)
        .pipe(
            tap( _ => this.log('请求书本数据')),
            catchError(this.handleError<Books[]>('getHeroes', []))
        );
}
```

### 3.通过HTTP修改数据
这里我们需要在原来`DetailComponent`上面，添加一个输入框、保存按钮和返回按钮，就像这样：   
```html
<!-- detail.component.html -->
<!-- 前面代码省略 -->
<div>
    <h2>修改信息：</h2>
    <label>新标题：
        <input [(ngModel)]="books.title" placeholder="请输入新标题">
    </label>
    <button (click)="save()">保存</button>
    <button (click)="goBack()">返回</button>
</div>
```
这边切记一点，一定要在`app.module.ts`中引入 `FormsModule`模块，并在`@NgModule`的`imports`中引入，不然要报错了。 
```js
// app.module.ts
// ...
import { FormsModule } from '@angular/forms'; 
@NgModule({
    // ...
    imports: [
        // ...
        FormsModule
    ],
    // ...
})
```
`input`框绑定书本的标题`books.title`，而保存按钮绑定一个`save()`方法，这里还要实现这个方法：   
```js
// detail.component.ts
save(): void {
    this.historyservice.updateBooks(this.books)
        .subscribe(() => this.goBack());
}
goBack(): void {
    this.location.back();
}
```
这里通过调用`BooksService`的`updateBooks`方法，将当前修改后的书本信息修改到源数据中，这里我们需要去`books.service.ts`中添加`updateBooks`方法：   
```js
// books.service.ts
// ...
updateBooks(books: Books): Observable<any>{
    return this.http.put(this.booksUrl, books, httpOptions).pipe(
        tap(_ => this.log(`修改书本的id是${books.id}`)),
        catchError(this.handleError<Books>(`getBooks请求是id为${books.id}`))
    )
}
// ...
```
**知识点**：   
`HttpClient.put()` 方法接受三个参数：`URL 地址`、`要修改的数据`和`其他选项`。  
`httpOptions` 常量需要定义在`@Injectable`修饰器之前。   

现在，我们点击首页，选择一本书进入详情，修改标题然后保存，会发现，首页上这本书的名称也会跟着改变呢。这算是好了。     


### 4.通过HTTP增加数据
我们可以新增一个页面，并添加上路由和按钮：   
```bash
ng g component add
```
添加路由：     
```js
// app-routing.module.ts
// ...
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', redirectTo:'/index', pathMatch:'full' },
  { path: 'index', component: IndexComponent},
  { path: 'detail/:id', component: DetailComponent},
  { path: 'add', component: AddComponent},
]
```
添加路由入口：   
```html
<!-- app.component.html -->
<!-- 省略一些代码 -->
<a routerLink="/add">添加书本</a>
```
编辑添加书本的页面：    
```html
<!-- add.component.html -->
<div class="add">
    <h2>添加书本：</h2>
    <label>标题：
        <input [(ngModel)]="books.title" placeholder="请输入标题">
    </label>
    <label>作者：
        <input [(ngModel)]="books.author" placeholder="请输入作者">
    </label>
    <label>书本id：
        <input [(ngModel)]="books.id" placeholder="请输入书本id">
    </label>
    <label>封面地址：
        <input [(ngModel)]="books.url" placeholder="请输入封面地址">
    </label>
    <div><button (click)="add(books)">添加</button></div>
</div>
```
初始化添加书本的数据：   
```js
// add.component.ts
// ...
import { Books } from '../books';
import { BooksService } from '../books.service';
import { HistoryService } from '../history.service';
import { Location } from '@angular/common';
export class AddComponent implements OnInit {
    books: Books = {
        id: 0,
        url: '',
        title: '',
        author: ''
    }
    constructor(
        private location: Location,
        private booksservice: BooksService,
        private historyservice: HistoryService
    ) { }
    ngOnInit() {}
    add(books: Books): void{
        books.title = books.title.trim();
        books.author = books.author.trim();
        this.booksservice.addBooks(books)
        .subscribe( book => {
            this.historyservice.add(`新增书本${books.title}，id为${books.id}`);
            this.location.back();
        });
    }
}
```
然后在`books.service.ts`中添加`addBooks`方法，来添加一本书本的数据：   
```js
// books.service.ts
addBooks(books: Books): Observable<Books>{
    return this.http.post<Books>(this.booksUrl, books, httpOptions).pipe(
        tap((newBook: Books) => this.log(`新增书本的id为${newBook.id}`)),
        catchError(this.handleError<Books>('添加新书'))
    );
}
```


现在就可以正常添加书本啦。   

![图片5-3](http://images.pingan8787.com/angular_books_5_3.png)


### 5.通过HTTP删除数据
这里我们先为每个书本后面添加一个删除按钮，并绑定删除事件`delete`：   
```html
<!-- books.component.html -->
<!-- 省略一些代码 -->
<span class="delete" (click)="delete(list)">X</span>
```
```js
// books.component.ts
import { BooksService } from '../books.service';
export class BooksComponent implements OnInit {
  @Input() list: Books;
  constructor(
    private booksservice: BooksService
  ) { }
  // ...
  delete(books: Books): void {
    this.booksservice.deleteBooks(books)
      .subscribe();
  }
}
```
然后还要再`books.service.ts`中添加`deleteBooks`方法来删除：   
```js
// books.service.ts
deleteBooks(books: Books): Observable<Books>{
    const id = books.id;
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete<Books>(url, httpOptions).pipe(
        tap(_ => this.log(`删除书本${books.title}，id为${books.id}`)),
        catchError(this.handleError<Books>('删除书本'))
    );
}
```
这里需要在删除书本结束后，通知`IndexComponent`将数据列表中的这条数据删除，这里还需要再了解一下[Angular 父子组件数据通信](https://blog.csdn.net/u010730126/article/details/68080139)。   
然后我们在父组件`IndexComponent`上添加`change`事件监听，并传入本地的`funChange`：   
```html
<!-- index.component.html -->
<app-books *ngFor="let item of books" [list]="item"
    (change) = "funChange(item, $event)"
></app-books>
```
在对应的`index.component.ts`中添加`funChange`方法：   
```js
// index.component.ts
funChange(books, $event){
    this.books = this.books.filter(h => h.id !== books.id);
}
```

再来，我们在子组件`BooksComponent`上多导入`Output`和`EventEmitter`，并添加`@Output()`修饰器和调用`emit`：    
```js
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
export class BooksComponent implements OnInit {
    // ... 
    @Output()
    change = new EventEmitter()
    // ... 
    delete(books: Books): void {
        this.booksservice.deleteBooks(books)
        .subscribe(()=>{
            this.change.emit(books);
        });
    }
}
```
这样就实现了我们父子组件之间的事件传递啦，现在我们的页面还是正常运行，并且删除一条数据后，页面数据会更新。   


### 6.通过HTTP查找数据
还是在`books.service.ts`，我们添加一个方法`getBooks`，来实现通过ID来查找指定书本，因为我们是通过ID查找，所以返回的是单个数据，这里就是`Observable<Books>`类型：   
```js
// books.service.ts
getBooks(id: number): Observable<Books>{
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Books>(url).pipe(
        tap( _ => this.log(`请求书本的id为${id}`)),
        catchError(this.handleError<Books>(`getBooks请求是id为${id}`))
    )
}
```
注意，这里 `getBooks` 会返回 `Observable<Books>`，是一个可观察的单个对象，而不是一个可观察的对象数组。    


## 八、结语
这个项目其实很简单，但是我还是一步一步的写下来，一方面让自己更熟悉Angular，另一方面也是希望能帮助到更多朋友哈~
最终效果：    

![图片结果](http://images.pingan8787.com/angular_books_result.png)