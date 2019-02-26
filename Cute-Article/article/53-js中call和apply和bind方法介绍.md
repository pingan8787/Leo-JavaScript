在js中，所有的函数再被调用的时候都会默认传入两个参数，一个是`this`，还有一个是`arguments`。

在默认情况下this都是指**当前的调用函数的对象**。但是有时候我们需要**改变this的指向**，也就是说使函数可以被其他对象来调用，那么我们应该怎样做呢？这时候我们就可以使用`call`,`apply`和`bind`方法了。


## 1.call，apply和bind方法的由来
在js中所有的函数都是`Function`的实例，而且对于`Function`来说，它的原型即`Function.prototype`中含有很多东西，其中`call`,`apply`和`bind`方法就是`Function原型`中的方法，所以根据原型的规则，所有的函数都可以使用原型中属性和方法，所以来说，**对于所有的函数都可以使用call，apply和bind方法**。

简单一句话：`call`，`apply`和`bind`都是`Function原型`中的方法，而所有的函数都是`Function`的实例。

## 2.call，apply和bind方法的作用
简单描述：就是**改变this的指向**。对于这句话的解释，我们可以结合代码来理解。  

## 3.理解改变this的指向的含义
```js
function show(sex){
    console.log("普通函数"+sex);
}
var person={
    name:"aa",
    age:14
};
show.call(person,"男");
```

在上面的代码块中，我们可以看到`person`对象并没有`show`方法，但是我们可以通过`call`方法来实现`person对象`来调用`show方法`。所以这种情况我认为就是**改变了this的指向**。

同样的，`apply`和`bind`方法也可以实现上述的功能，那么它们三个有什么区别呢？

## 4.call,apply和bind的区别
它们在**功能上是没有区别**的，都是改变this的指向，它们的区别主要是在于方法的实现形式和参数传递上的不同  
* 1：`函数.call(对象,arg1,arg2....)`
* 2：`函数.apply(对象，[arg1,arg2,...])`
* 3：`var ss=函数.bind(对象,arg1,arg2,....)`

我们通过代码来更加明显的区别一下：
```js
function show(sex){
    console.log("普通函数"+sex);
}
var person={
    name:"aa",
    age:14
};
show.call(person,"男");
show.apply(person,["女"]);
//对于bind来说，用法更加的灵活
var ss=show.bind(person,"不明");
ss();
```

通过观察上面的代码，很明显的就可以得出它们三者的区别，仅仅是函数传递的不同以及bind方法可以更加的方便的使用。
