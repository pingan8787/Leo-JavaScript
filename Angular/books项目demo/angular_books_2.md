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
