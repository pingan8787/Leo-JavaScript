## 1、Attribute
`Attribute`是`HTML`上设置的属性，在`HTML`中**显式**地设置，或者通过`setAttribute()`方法设置。   
```html
<input type='text' id='txt' a=b />
```
比如这样一段`HTML`代码，实际上它有三个`attribute`属性，我们可以打印出来看看：  
```js
var a = document.getElementById('txt');
console.log(a.attributes);
```

![img1](https://images2015.cnblogs.com/blog/675542/201509/675542-20150906164922029-2117616374.png)

对于`Attribute`而言，它有三个常用的方法`setAttribute()`、`getAttribute()`以及`removeAttribute()`：   
```js
var a = document.getElementById('txt');
a.setAttribute('value', 'test');
console.log(a.getAttribute('a')); // b
a.removeAttribute('a');
console.log(a.getAttribute('a')); // null
```

对于用`setAttribute()`和`removeAttribute()`方法设置和删除的属性来说，会实时地反映在`html`页面的代码上。`Attribute`的属性值只能是字符串，属性键大小写不敏感，比如：   
```html
<input type='text' id='txt' a=b A='c'/>
```
可以打开控制台看看代码的html结构（A被自动隐去了）。   

可以说，如果想要获取一个DOM元素的`attribute`属性值，只要打开控制台看看该DOM标签的`html`代码，任何时候`attribute`值和`html`标签内设置的属性值都是同步的。     

## 2、Property
`Property`则比`Attribute`复杂一点。  

DOM是`JavaScrip`t里的对象，`Property`是DOM中的属性，它的属性值主要通过点运算符来获取和改变。这个对象实现了很多属性（`property`）：'`value`'，'`className`'等，以及一些方法`getAttribute`，`setAttribute`等，它也可以和其他的JavaScript对象一样**添加自定义的属性以及方法**。`property`的值可以是**任何的数据类型**，对大小写敏感，自定义的`property`不会出现在html代码中，只存在js中。      


还是示例代码，他的property属性值有哪些？
 
```html
<input type='text' id='txt' a=b />
<script type="text/javascript">
    var a = document.getElementById('txt');
    console.log(a.type); // text
    console.log(a.id); // txt
    console.log(a.a); // undefined
    console.log(a.title); // ''
</script>
```

我们在html页面的input元素中设置了a属性，但是在`property`中却是访问不到的；相反我们没有在html页面中设置的`title`，访问它却没有反映`undefined`！

这是怎么回事？   

因为所有的HTML元素都由`HTMLElement`类型表示，`HTMLElement`类型直接继承自`Element`并添加了一些属性，每个HTML元素都有下面的这5个标准特性：`id`，`title`，`lang`，`dir`，`className`（在DOM中以`property`方式操作这几个特性会同步到html标签中）。

所以即使在html中没有指定`id`、`title`等，也会默认赋予一个空串，通过property属性（点操作符）可以访问。而除此之外在html中设置的其他属性是不能通过`Property`访问到的（`attribute`特有的属性）。

如果把DOM元素看成是一个普通的Object对象，那么property就是一个以名值对(`name='value'`)的形式存放在Object中的属性。要添加和删除`property`也简单多了，和普通的对象没啥分别：   
```js
var a = document.getElementById('txt');
a.age = 10;
console.log(a.age); // 10
delete a.age;
console.log(a.age); // undefined
```
除了`id`、`title`等5个属性（`property`）外（每个element元素都有），个别的元素还有特别的属性，比如input元素有`name`，a元素有`href`等等。   

## 3、Attribute vs Property

既然说有些属性既能通过`attribute`访问修改，也能通过`property`，那么有什么值得注意的地方呢？  

之所以`attribute`和`property`容易混倄在一起的原因是，很多`attribute`节点还有一个相对应的`property`属性，比如div元素的`id`和`class`既是`attribute`，也有对应的`property`（id和className），不管使用哪种方法都可以**访问和修改**，如果在TAG对这些属性进行赋值，那么这些值就会作为初始值赋给DOM的同名property。


* **input元素的value**

input元素的`value`属性是一大坑爹处，看下面代码：

```js
var a = document.getElementById('txt');
a.setAttribute('value', 'test');
console.log(a.value); // test

a.value = 'change';
console.log(a.getAttribute('value')); // test
```

用**点操作符**改变`value`值，并不会更新`attribute`的`value`值；而相反用`attribute`更新`value`值，却会反映到`property`上...坑吧，谁规定的！

* **表单元素**  

DOM元素一些默认常见的`attribute`节点都有与之对应的`property`属性，比较特殊的是一些值为`Boolean类型`的`property`，如一些表单元素。对于这些特殊的`attribute`节点，只要存在该节点，对应的`property`的值就为`true`，如：  
```html
<input type='radio' checked='checked' id='radio'>
<script>
  var radio = document.getElementById('radio');
  console.log(radio.getAttribute('checked')); // 'check'
  console.log(radio.checked); // true
</script>
```
disabled类似。

* **href**

两者对于`href`的获取也有不同之处，`attribute`取到的是实际设置的值（相对路径），而`property`取得的是绝对路径：   

```html
<a href='a.html' id='web'> </a>
<script>
  var radio = document.getElementById('web');
  console.log(web.getAttribute('href')); // 'a.html' 
  console.log(web.href); // 绝度路径
</script>
```

## 4、总结
`Attribute`属性在`html`上设置，会反应在`html`代码上，两者**同步**；而`Property`属性则可以看做是DOM对象的键值对，用**点操作符**对它们进行操作。   

实际编程中，基本上的DOM操作都是使用`property`的点操作符。

只有两种情况不得不使用`attribute`：  

* 1. 自定义HTML Attribute，因为它不能同步到DOM property上

* 2. 访问内置的HTML标签的`Attribute`，这些`attribute`不能从`property`上同步过来，比如`input标签`的`value`值（可以用来检验input值是否变化）


## 5、参考
* [JavaScript中的property和attribute的区别](https://www.jianshu.com/p/rRssiL)

* [返本求源——DOM元素的特性与属性](http://www.cnblogs.com/dojo-lzz/p/4781563.html)