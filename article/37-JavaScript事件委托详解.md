> [阅读原文](http://www.codeceo.com/javascript-event-commission.html)  

## 基本概念

事件委托，通俗地来讲，就是把一个元素响应事件（click、focus……）的函数委托到另一个元素；  

一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。  

举个例子，比如一个宿舍的同学同时快递到了，一种方法就是他们都傻傻地一个个去领取，还有一种方法就是把这件事情委托给宿舍长，让一个人出去拿好所有快递，然后再根据收件人一一分发给每个宿舍同学；  

在这里，取快递就是一个事件，每个同学指的是需要响应事件的 DOM 元素，而出去统一领取快递的宿舍长就是代理的元素，所以真正绑定事件的是这个元素，按照收件人分发快递的过程就是在事件执行中，需要判断当前响应的事件应该匹配到被代理元素中的哪一个或者哪几个。  

## 事件冒泡
前面提到 DOM 中事件委托的实现是利用事件冒泡的机制，那么事件冒泡是什么呢？  

在 `document.addEventListener` 的时候我们可以设置事件模型：事件冒泡、事件捕获，一般来说都是用事件冒泡的模型；  
![事件冒泡](http://static.codeceo.com/images/2017/04/v2-716a278ff4bcc2aca259d4ca7018cba3_b.png)  
如上图所示，事件模型是指分为三个阶段：  
> 捕获阶段：在事件冒泡的模型中，捕获阶段不会响应任何事件；  
> 目标阶段：目标阶段就是指事件响应到触发事件的最底层元素上；  
> 冒泡阶段：冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节点），事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；

## 事件委托的优点  
### 1. 减少内存消耗
试想一下，若果我们有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件；  
```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
// ...... 代表中间还有未知数个 li
```
如果给每个列表项一一都绑定一个函数，那对于内存消耗是非常大的，效率上需要消耗很多性能；  

因此，比较好的方法就是把这个点击事件绑定到他的父层，也就是 `ul` 上，然后在执行事件的时候再去匹配判断目标元素；  

所以事件委托可以减少大量的内存消耗，节约效率。  

### 2. 动态绑定事件
比如上述的例子中列表项就几个，我们给每个列表项都绑定了事件；  

在很多时候，我们需要通过 AJAX 或者用户操作动态的增加或者去除列表项元素，那么在每一次改变的时候都需要重新给新增的元素绑定事件，给即将删去的元素解绑事件；  

如果用了事件委托就没有这种麻烦了，因为事件是绑定在父层的，和目标元素的增减是没有关系的，执行到目标元素是在真正响应执行事件函数的过程中去匹配的；  

所以使用事件在动态绑定事件的情况下是可以减少很多重复工作的。  

## jQuery 中的事件委托
jQuery 中的事件委托相信很多人都用过，它主要这几种方法来实现：  
> $.on: 基本用法: $('.parent').on('click', 'a', function () { console.log('click event on tag a'); })，它是 .parent 元素之下的 a 元素的事件代理到 $('.parent') 之上，只要在这个元素上有点击事件，就会自动寻找到 .parent 元素下的 a 元素，然后响应事件；  
> $.delegate: 基本用法: $('.parent').delegate('a', 'click', function () { console.log('click event on tag a'); })，同上，并且还有相对应的 $.delegate 来删除代理的事件；  
> $.live: 基本使用方法: $('a', $('.parent')).live('click', function () { console.log('click event on tag a'); })，同上，然而如果没有传入父层元素 $(.parent)，那事件会默认委托到 $(document) 上；(已废除)  

## 实现功能
### 基本实现
比如我们有这样的一个 `HTML` 片段：  
```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
// ...... 代表中间还有未知数个 li
```
我们来实现把 #list 下的 li 元素的事件代理委托到它的父层元素也就是 `#list` 上：  
```javascript
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
  // 兼容性处理
  var event = e || window.event;
  var target = event.target || event.srcElement;
  // 判断是否匹配目标元素
  if (target.nodeName.toLocaleLowerCase === 'LI') {
    console.log('the content is: ', target.innerHTML);
  }
});
```
在上述代码中， `target` 元素则是在 `#list` 元素之下具体被点击的元素，然后通过判断 `target` 的一些属性（比如：`nodeName`，`id` 等等）可以更精确地匹配到某一类 `#list li` 元素之上；  

### 使用 Element.matches 精确匹配  
如果改变下 `HTML` 成：  
```html
<ul id="list">
  <li className="class-1">item 1</li>
  <li>item 2</li>
  <li className="class-1">item 3</li>
  ......
  <li>item n</li>
</ul>
// ...... 代表中间还有未知数个 li
```

这里，我们想把` #list` 元素下的 `li` 元素（并且它的 `class` 为 `class-1`）的点击事件委托代理到 `#list` 之上；  

如果通过上述的方法我们还需要在 `if (target.nodeName.toLocaleLowerCase === "li")` 判断之中在加入一个判断 `target.nodeName.className === "class-1"`；  

但是如果想像 `CSS` 选择其般做更加灵活的匹配的话，上面的判断未免就太多了，并且很难做到灵活性，这里可以使用 `Element.matches `API 来匹配；  

`Element.matches` API 的基本使用方法: `Element.matches(selectorString)`，`selectorString` 既是 `CSS` 那样的选择器规则，比如本例中可以使用 `target.matches('li.class-1')`，他会返回一个布尔值，如果 `target` 元素是标签 `li` 并且它的类是 `class-1` ，那么就会返回 `true`，否则返回 `false`；  

当然它的兼容性还有一些问题，需要 `IE9` 及以上的现代化浏览器版本；  

我们可以使用 `Polyfill` 来解决兼容性上的问题：  
```javascript
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;            
    };
}
```

加上 `Element.matches` 之后就可以来实现我们的需求了：  

```javascript
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;            
    };
}
document.getElementById('list').addEventListener('click', function (e) {
  // 兼容性处理
  var event = e || window.event;
  var target = event.target || event.srcElement;
  if (target.matches('li.class-1')) {
    console.log('the content is: ', target.innerHTML);
  }
});
```

## 函数封装
在应对更多场景上我们可以把事件代理的功能封装成一个公用函数，这样就可以重复利用了。  

结合上面的例子来实现一个函数 `eventDelegate`，它接受四个参数：  

> `[String]` 一个选择器字符串用于过滤需要实现代理的父层元素，既事件需要被真正绑定之上；  
> `[String]` 一个选择器字符串用于过滤触发事件的选择器元素的后代，既我们需要被代理事件的元素；  
> `[String]` 一个或多个用空格分隔的事件类型和可选的命名空间，如 `click` 或` keydown.click` ;  
> `[Function]` 需要代理事件响应的函数；

这里就有几个关键点：  
> 对于父层代理的元素可能有多个，需要一一绑定事件；  
> 对于绑定的事件类型可能有多个，需要一一绑定事件；  
> 在处理匹配被代理的元素之中需要考虑到兼容性问题；  
> 在执行所绑定的函数的时候需要传入正确的参数以及考虑到 this 的问题；  

```javascript
function eventDelegate (parentSelector, targetSelector, events, foo) {
  // 触发执行的函数
  function triFunction (e) {
    // 兼容性处理
    var event = e || window.event;
    var target = event.target || event.srcElement;
    // 处理 matches 的兼容性
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;            
        };
    }
    // 判断是否匹配到我们所需要的元素上
    if (target.matches(targetSelector)) {
      // 执行绑定的函数，注意 this
      foo.call(target, Array.prototype.slice.call(arguments));
    }
  }
  // 如果有多个事件的话需要全部一一绑定事件
  events.split('.').forEach(function (evt) {
    // 多个父层元素的话也需要一一绑定
    Array.prototype.slice.call(document.querySelectorAll(parentSelector)).forEach(function ($p) {
      $p.addEventListener(evt, triFunction);
    });
  });
}
```