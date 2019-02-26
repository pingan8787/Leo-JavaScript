在**jQuery**的`att`r与`prop`提到过在IE9之前版本中如果使用`property`不当会造成内存泄露问题，而且关于`Attribute`和`Property`的区别也让人十分头痛，在HTML5中添加了`data-*`的方式来**自定义属性**，所谓`data-*`实际上上就是`data-`前缀加上自定义的属性名，使用这样的结构可以进行数据存放。使用`data-*`可以**解决自定义属性混乱无管理的现状**。

### 1. 读写方式
`data-*`有两种设置方式，可以直接在`HTML元素标签`上书写：
```html
<div id="test" data-age="24">
    Click Here
</div>
```
其中的`data-age`就是一种自定义属性，当然我们也可以通过**JavaScript**来对其进行操作，**HTML5**中元素都会有一个`dataset`的属性，这是一个`DOMStringMap`类型的键值对集合：
```js
var test = document.getElementById('test');
test.dataset.my = 'Byron';
```
这样就为`div`添加了一个`data-my`的自定义属性，使用JavaScript操作`dataset`有两个需要注意的地方：  

- 1. 我们在**添加**或**读取**属性的时候需要去掉前缀`data-*`，像上面的例子我们没有使用`test.dataset.data-my = 'Byron';`的形式。

- 2. 如果属性名称中还包含连字符(`-`)，需要转成**驼峰命名**方式，但如果在CSS中使用选择器，我们需要使用连字符格式。

为刚才代码追加写内容： 
```html
<style type="text/css">
    [data-birth-date]{
        background-color: #0f0;
        width:100px;
        margin:20px;
    }
</style>
```

```js
test.dataset.birthDate = '19890615';
```
这样我们通过JavaScript设置了data-birth-date自定义属性，在CSS样式表为div添加了一些样式，看看效果

![图片1](http://p3nqtyvgo.bkt.clouddn.com/2018100601.png)

![图片2](http://p3nqtyvgo.bkt.clouddn.com/2018100602.png)

读取的时候也是通过`dataset`对象，使用”`.`”来获取属性，同样需要去掉`data-`前缀，连字符需要转化为驼峰命名

```js
var test = document.getElementById('test');
test.dataset.my = 'Byron';
test.dataset.birthDate = '19890615';
test.onclick = function () {
    alert(this.dataset.my + ' ' + this.dataset.age+' '+this.dataset.birthDate);
}
```
![图片3](http://p3nqtyvgo.bkt.clouddn.com/2018100603.png)

### 2. getAttribute/setAttribute
有些同学可能会问这和`getAttribute`/`setAttribute`除了命名有什么区别吗，我们来看一下：
```js
var test = document.getElementById('test');
test.dataset.birthDate = '19890615';
test.setAttribute('age', 25);
test.setAttribute('data-sex', 'male');

console.log(test.getAttribute('data-age')); //24
console.log(test.getAttribute('data-birth-date')); //19890516
console.log(test.dataset.age); //24
console.log(test.dataset.sex); //male
```

![图片4](http://p3nqtyvgo.bkt.clouddn.com/2018100604.png)

![图片5](http://p3nqtyvgo.bkt.clouddn.com/20181006045.png)


这样我们可以看出，两者都把属性设置到了`attribute上`（废话，要不人家能叫自定义属性），也就是说`getAttribute`/`setAttribute`可以操作所有的`dataset`内容，`dataset`内容只是`attribute`的一个子集，特殊就特殊在命名上了，但是`dataset`内只有带有`data-`前缀的属性（没有`age=25`那个）。

那么为什么我们还要用`data-*`呢，一个最大的好处是我们可以把所有自定义属性在`dataset`对象中统一管理，遍历啊神马的都哦很方便，而不至于零零散散了，所以用用还是不错的。

### 3. 浏览器兼容性
比较不好的消息就是`data-*`的浏览器兼容性情况十分不乐观。
* **Internet Explorer 11+**
* **Chrome 8+**
* **Firefox 6.0+**
* **Opera 11.10+**
* **Safari 6+**

其中IE11+简直就是亮瞎小伙伴的眼，看来要想全面使用此属性路漫漫其修远矣。

