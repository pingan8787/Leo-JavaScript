## 学习笔记

视频地址  [https://www.bilibili.com/video/av38379328](https://www.bilibili.com/video/av38379328/?p=3)

视频地址  [https://www.bilibili.com/video/av77006938](https://www.bilibili.com/video/av77006938)

### 1. 数据类型

- 定义未赋值，设置默认值

```javascript
let a:number | undefined;
a;// undefined

a = 3;
a; // 3
```

- 定义数组

```javascript
// 方式1
let arr: string[] = ["aa", "bb"];

// 方式2
let arr:Array<String> = ["aa", "bb"];
```

- 定义枚举

```javascript
enum Flag {
  SUCCESS= 1, 
  ERROR= 2
};
let leo:Flag = Flag.ERROR;
```

```javascript
enum Color {BLUE , RED, 'ORANGE'}
let c:Color = Color.BLUE
c; // 1
```

如果标识没有赋值 则它的值就是下标

```javascript
enum Color {BLUE , RED = 3, 'ORANGE'}
let c:Color = Color.RED
c; // 3
```

常量枚举：在编译阶段被移除。<br />使用场景：当我们不需要一个对象，而需要一个对象的值的时候。<br />好处：减少编译环境的代码。

```javascript
const enum Month {
    Jan, Feb, Mar
}
let month = [Month.Jan, Month.Feb, Month. Mar]
// 下面是 编译结果  非常简洁
var month = [0 /* Jan */, 1 /* Feb */, 2 /* Mar */];
```

- 定义 void 类型，没有返回值

```javascript
function fun():void {
}
// 不能使用undefined  如果没有显式 return 语句的话，是默认返回 undefined。
function fun():undefined {
}
```

- 定义 `never` 类型

包括 `null` 和 `undefined` 类型，是其他类型的子类型，代表从不会出现的值。<br />用 `never` 声明的变量只能用 `never` 类型的值所赋值。

```javascript
let a:never;
a = 11; // err
```

### 2. 函数

- 可选参数

必须定义在参数最后一个

```javascript
function fun(name:string, age?:number){
  // ....
}
```

- 剩余参数

三点运算符

```javascript
function fun(...res:number[]):number{
  // ....
}
```

- 函数重载

```javascript
function fun(name:string){
  // ....
}
```

```javascript
function fun(age:number){
  // ....
}
```

这时候 `fun` 方法传入 2 个参数，重载不会覆盖。

### 3. 类

#### 3.1 概念介绍

**类成员的属性都是实例属性**，而不是原型属性。而**类成员的方法都是实例原型的方法**。

```javascript
class Dog {
    constructor(name: string) {
        this.name = name;
    }
    name: string
    run(){}
}
console.log(Dog.prototype); // { run: f, constructor: f }
let dog = new Dog("wangwang");
console.log(dog); // Dog {name: "wangwang"}
```
**类成员的方法编译后：**<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/186051/1583162100948-828f87af-1909-4f30-a0e6-284c9b0f4522.png#align=left&display=inline&height=421&name=image.png&originHeight=421&originWidth=1021&size=66918&status=done&style=none&width=1021)<br />另外，实例的属性必须有初始值，或者在构造函数中被初始化：

```javascript
class Dog {

    // 第一种方式
    constructor(name: string) {
        this.name = name;
    }
    name: string

    // 第二种方式
    constructor(name: string) { }
    name: string = "dog"

    // 第三种方式
    constructor(name: string) { }
    name?: string
}
console.log(Dog.prototype); // { run: f, constructor: f }
let dog = new Dog("wangwang");
console.log(dog); // Dog {name: "wangwang"}
```

#### 3.2 实例方法和静态方法

以 jquery 为例：

```javascript
// 静态方法 直接使用
$.get(....)

// 实例方法 需要先实例化
$('.dom').css(....)
```

ts 中静态方法：

```javascript
class Per {
  static leo = "hi"
  static print () {
     console.log(Per.leo)  
  }
}
// 使用静态属性
Per.leo
// 使用静态方法
Per.print()
```
静态属性和静态方法转换后：<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/186051/1583161841182-5f1b873a-9ac0-4e49-a214-d37715a164ae.png#align=left&display=inline&height=407&name=image.png&originHeight=407&originWidth=1076&size=80938&status=done&style=none&width=1076)

<a name="307b7520"></a>
#### 3.3 类的继承

```javascript
class Husky extends Dog {
    constructor(name: string, color: string) {
        super(name) // 必须调用 super 继承父类
        this.color = color;
    }
    color: string
}
```

五种修饰符：

- `public` ： 对所有成员可见；
- `private` ：私有成员，只能在类里面调用，不能被类的实例调用，也不能被子类调用；
- `protected` : 受保护成员，只能在类和子类中访问，不能在类的实例访问；
- `readonly` ： 只读属性，不能被更改，并且需要初始化；
- `static` : 类的静态成员，只能通过类名来调用，不能通过类的实例调用。

**构造函数中的参数也可以使用修饰符，作用是将参数自动变为实例的属性，就可以省略在类中的定义。**

```javascript
class Husky extends Dog {
    constructor(name: string, public color: string) {
        super(name) // 必须调用 super 继承父类
        this.color = color;
    }
}
```

#### 3.4 抽象类

**它提供其他类继承的基类，只能被继承，不能被实例化的类**。 [https://www.tslang.cn/docs/handbook/classes.html](https://www.tslang.cn/docs/handbook/classes.html)

`abstract` 关键字是用于定义**抽象类**和在抽象类内部定义**抽象方法**。

```javascript
abstract class Animal {}
// let animal = new Animal() ; // 报错 无法创建抽象类的实例
class Dog extends Animal {} ; //可以
```

还有这个案例：

```javascript
// 抽象类必须有抽象方法
// 抽象方法必须在抽象类中
abstract class A {
  public name: string
  constructor(name:string){
    this.name = name
  }
  abstract eat (){ console.log('吃···') }
}

// 抽象类的子类必须实现抽象类里面的抽象方法
class B extends A {
  constructor(name:string){
    super(name)
  }
  eat (){
    return this.name + '哈哈哈'
  }
}
let aa = new B(' hello ')
```

**好处**：抽离一些事务的共性，有利于代码的复用和拓展。也可以实现多态。<br />**多态**：父类定义方法，子类各自实现。

```javascript
abstract class Animal {
    eat() {  console.log("eat") }
    abstract sleep(): void; // 抽象类中定义抽象方法，子类中去实现
}

class Dog extends Animal {
    constructor(name: string) {
        super();
        this.name = name;
    }
    name: string;
    sleep() {
        console.log("sleep"); // 子类实现父类定义的抽象方法
    }
}; //可以
let dog = new Dog("wang");
dog.eat(); // eat
dog.sleep(); // sleep
```

### 4. 接口

行为和动作的规范，对批量方法进行约束。

- 属性类型接口

```javascript
interface Name {
  fName: string; // 必须
  sName?: string; // 可选
}
function F(name:Name){
    console.log(name.fName, name.sName)
}
```

- 函数类型接口

```javascript
interface f{
    (key: string, value: string): string
}
let md5:f = function(key: string, value: string): string{
    return key + value
}
```

- 可索引接口 （约束数组、对象）

如字符串索引签名 ，含义：用任意类型的字符串索引List，会获得对应类型的值。

```javascript
interface Arr {
    [index: number]: string
}
let a: Arr = ["aa", "bb"]

interface Obj {
    [index: string]: string
}
let o: Obj = {
    aa: 'aaa',
    bb: 'bbb'
}
```

需要注意：**数字类型的签名返回值，必须是字符串类型的前面返回值的子集**。因为 JS 会进行类型转换。

```javascript
interface Names {
    // 正确
    [x: string]: string
    [z: number]: string

    // 错误
    [x: string]: string
    [z: number]: number

    // 正确
    [x: string]: any
    [z: number]: number
}
```

- 类类型接口

`implements`  实现后面的接口。

```javascript
interface C {
    name: string;
    fun(str: string):void;
}

class P implements C {
    name: string
    constructor(name: string){
        this.name = name
    }
   fun(){
    console.log(this.name + 'in here~')
   }
}
let aa = new P('leo')
```

- 接口拓展

接口继承其他接口。

```javascript
interface A {
    fun1():void;
}
interface B extends A{
    fun2():void;
}
class C implements B {
    public name: string;
    constructor(name: string){
        this.name = name
    }
    fun1(){ console.log(this.name) }
    fun2(){ console.log(this.name) }
}

let p = new C()
p.fun1('leo')
```

一个接口可以继承多个接口:

```javascript
interface E extends A, B {
    sideLength: number;
}
```

### 5. 泛型

简单理解：泛型就是解决类、接口和方法的复用性，以及对不特定数据类型的支持。<br />可以使用泛型来创建可重用的组件，一个组件支持多种类型的数据。

#### 5.1 泛型函数

- 普通写法：

```javascript
// 只能返回一种类型
function fun1 (name: string): string{
    return name; 
}

// 可以返回多种类型 
// 使用 any  则放弃使用类型检查
function fun2 (name: any): any {
    return name; 
}
```

- 使用泛型：

由于如果使用 `any` 可能出现可以传入 `string` 返回 `number` ，所以需要使用泛型，使得传入参数和返回类型参数一致。

`T` 表示泛型，具体什么类型是调用这个方法的时候决定的。

```javascript
function fun3<T>(name: T): T{
    return name;
}
fun3<number>(123); // 调用方法的时候决定
fun3<string>('123');
```

也可以这么写：

```javascript
type Log = <T>(value: T) => T;
let myLog: Log = log;
```

#### 5.2 泛型类

```javascript
class C<T>{
    public list:T[] = [];
    fun1(name: T):void{
        this.list.push(name)
    }
    fun2():T{
        return this.list[0]
    }
}

let a1 = new C<number>()
```

#### 5.3 泛型接口

- 方法1：

```javascript
interface Config{
    <T>(name: T): T;
}
let getData : Config = function<T>(name: T): T{ return name; }

getData<number>(123);
getData<string>('aaa');
```

- 方法2：

```javascript
interface Config{
    (name: T): T;
}
function getData<T>(name: T): T{ return name; }

let fun1: Config<string> = getData;
fun1('aaa')
```

还可以这样：

```javascript
interface Log<T> {  // 约束了整个接口，使用时就需要指定类型
    (value: T) : T
}
let myLog: Log<number> = log
// 也可以指定默认类型
interface Log<T = string> {
    (value: T) : T
}
let myLog: Log = log
```

#### 5.4 把类作为参数类型的泛型类

- 以前将类作为参数类型，可以检查参数是否类型符合

```javascript
class User{
    name: string | undefined;
    pwd: string | undefined;
}
class Db {
    add(data: User): boolean{ return true }
}
let dd = new Data();
dd.name = "aaa";
dd.pwd = "1233";

let D = new Db()
D.add(dd);
```

- 把类作为参数类型的泛型类

```javascript
class Db<T>{
    add(data: T): boolean{ return true }
}
class Data{
    name: string | undefined;
    pwd: string | undefined;
}

let dd = new Data();
dd.name = "aaa";
dd.pwd = "1233";

let D = new Db<Data>()
D.add(dd);
```

#### 5.5 泛型约束

```javascript
interface Length {
    length: number
}
function log<T extends Length>(value: T): T{
    console.log(value,  value.length)
    return value
}
log([1])
log("123")
log({length:1})
```

### 6. 模块

`export` 暴露模块， `import` 导入模块。

- 方式1

```javascript
// 1.js
export fun(){}
export let a = 1

// 2.js
import { fun, a  } from './1.js'
fun()
```

- 方式2

```javascript
// 1.js
fun(){}
let a = 1
export { fun, a }

// 2.js
import { fun, a as ha  } from './1.js' // 将 a 重命名为 ha
fun()
```

- 方式3 默认导出

```javascript
// 1.js
export default fun (){}

// 2.js
import fun from './1.js'
```

### 7. 命名空间

在模块内部，用于组织代码，避免命名冲突。

使用 `namespace` 关键字作为划分，将指定的代码放到命名空间中，并使用 `export` 暴露其中变量和方法（类似将命名空间当做模块），调用的时候，需要使用 **空间名称** 来获取对应变量方法。

```javascript
namespace A{
    interface Leo{
        name: string
    }
    export let aa = 1;
    // ....
}
namespace B{
    interface Leo{
        name: string
    }
    export let aa = 2;
    // ....
}

console.log(A.aa) // 1
console.log(B.aa) // 2
```

### 8. 装饰器

是一种特殊类型的声明，能够被附加到类生命，方法，属性或参数上，可以修改类的行为。

常见：类装饰器，属性装饰器，方法装饰器，参数装饰器。

装饰器写法：普通装饰器（无法传参），装饰器工厂（可传参）

#### 8.1 普通装饰器（无法传参）

```javascript
// 类装饰器
function myClass(params: any){
    // params 当前类
    params.prototype.url = 'www.xxx.com'
    params.prototype.fun1 =function (){
        console.log('fun')
    }
}

@myClass
class FunClass{
    constructor(){ }
    fun(){ }
}
let a: any = new FunClass()
a.url; //  'www.xxx.com'
a.fun1(); // 'fun'
```

#### 8.2 装饰器工厂（可传参）

```javascript
// 类装饰器
function myClass(params: string){
    // params 传入参数
    // target 当前类
    return function (target: any){
        console.log(params, target)
        target.prototype.url = params
    }
}

@myClass('www.xxx.com')
class FunClass{
    constructor(){ }
    fun(){ }
}
let a: any = new FunClass()
```

#### 8.3 重载构造函数

用来修改当前类的构造函数，属性和方法。

```javascript
// 类装饰器
function myClass(target: any){
    // target 当前类
    return class extends target{
        link : any = 'bbbbbb'
    fun1(){
        console.log('-----' + this.link)
    }
    }
}

@myClass
class FunClass{
    public link : string | undefined;
    constructor(){
        this.link = 'aaaaaaaaaaaa'
    }
    fun(){
        console.log(this.link)
    }
}
let a: any = new FunClass()
a.fun1(); //  '-----bbbbbb'
```

#### 8.4 属性装饰器

```javascript
// 类装饰器
function myClass(params: string){
    return function (target: any){
    }
}

// 属性装饰器
function myAttr(params: any){
    return  function (target:any , attr:any){
        // target 当前类原型对象 ， attr 当前属性
        target[attr] = params
    }
}

@myClass('www.xxx.com')
class FunClass{
    @myAttr('leo')
    public link : any | undefined
    constructor(){ }
    fun(){ console.log(this.link) }
}
let a: any = new FunClass()
a.fun(); //  'leo'
```

#### 8.5 方法装饰器

用来监视、修改或替换方法的定义。<br />方法装饰会在运行时，传入三个参数：

- 对于静态方法来说是类的构造函数，对于实例方法是类的原型对象。
- 方法的名称。
- 方法的属性描述符。

```javascript
function logMethod(params: any){
    return function(target:any, methodName:any, desc:any){
        console.log(target, methodName, desc)
        // 拓展原型方法和属性
        target.url = 'www.baidu.com'
        target.leo = function(){
            console.log('hi leo~~~')
        }
        // 修改原型方法 eg将参数转换成 string 类型
        let old = desc.value;
        desc.value = function(...args:any[]){
            args = args.map(val => String(val))
            console.log(args)
            old.apply(this,args)
        }
    }
}
class Myclass {
    public url: any | undefined;
    constructor(){}
    @logMethod('hi leo')
    getData(){
        console.log('this.url',this.url)
    }
}
let my:any = new Myclass()
console.log(my.url)
my.leo()
my.getData(123,'aaa')
```

#### 8.6 方法参数装饰器

方法参数装饰器表达式会在运行时当做函数被调用，可以使用参数装饰器为**类的原型**添加一些元素数据。

方法装饰会在运行时，也是传入三个参数，和**方法装饰器**一样。

```javascript
function logMethod(params: any){
    return function(target:any, methodName:any, paramsIndex:any){
        console.log(params, target, methodName, paramsIndex)
        target.url = 'www.baidu.com'
    }
}
class Myclass {
    public url: any | undefined;
    constructor(){}
   
    getData( @logMethod('uuid') uuid:any){
        console.log('this.uuid',uuid)
    }
}

let my:any = new Myclass()
my.getData(123)
console.log(my.url)
```

#### 8.7 装饰器执行顺序

属性装饰器 - 方法装饰器 - 方法参数装饰器 - 类装饰器

多个相同类型装饰器，会从下开始执行，比如：

```javascript
@fun1('b')
@fun2('a')
class Hello {}
```

则先执行装饰器 `fun2` 再执行装饰器 `fun1` 。
