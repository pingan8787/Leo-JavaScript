### 介绍
这里整理了一些常用的js简写代码，有空多看多用，也能提升代码逼格。

### 初级
#### 1、三目运算
```
//  未简写：
let x = 10;
let leo;
if(x>0){
    leo = 'hello'
}else{
    leo = 'bad'
}

//  简写：
let x = 10;
let leo = x>0?'hello':'bad';
```

#### 2、循环语句
```
//  未简写
for(let i=0;i<all.length;i++)

//  简写：
for(let k in all)
```

#### 3、声明变量
```
//  未简写
let x ;
let y = 1;
let z = 3;

//  简写：
let x,y-1,z=3;
```

#### 4、if语句
```
//  未简写
if(leo == true)

//  简写：
if(leo)
```

#### 5、十进制数
可以使用科学计数法来代替较大的数据，如可以将 `10000000` 简写为 `1e7`。
```
//  未简写
for(let i = 0;i<10000000;i++){}

//  简写：
for(let i = 0;i<1e7;i++){}
```

#### 6、多行字符串
```
//  未简写
const leo = 'leo is good boy\n\t'
    +  'hahaha\n\t'
    +  'end!'

//  简写：
const leo = `leo is good boy
        hahaha
        end!
    `
```

### 高级
#### 1、变量赋值
当将一个变量的值赋给另一个变量时，首先需要确保原值不是 null、未定义的或空值。  
可以通过编写一个包含多个条件的判断语句来实现：  
```
//  未简写
if (a1 !== null || a1 !== undefined || a1 !== '') {
     let a2 = a1;
}

//  简写：
const a2 = a1 || 'new'
```

#### 2、默认值赋值
如果预期参数是 null 或未定义，则不需要写六行代码来分配默认值。  
我们可以只使用一个简短的逻辑运算符，只用一行代码就能完成相同的操作。
```
//  未简写
let dbHost;
if (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} else {
  dbHost = 'localhost';
}

//  简写：
const dbHost = process.env.DB_HOST || 'localhost';
```

#### 3、对象属性
如果属性名与 key 名相同，则可以使用简写。   
```
//  未简写
const obj = { x:x, y:y };

//  简写：
const obj = { x, y };
```

#### 4、箭头函数
```
//  未简写
function sayHello(name) {
  console.log('Hello', name);
}
 
setTimeout(function() {
  console.log('Loaded')
}, 2000);
 
list.forEach(function(item) {
  console.log(item);
});

//  简写：
sayHello = name => console.log('Hello', name);
setTimeout(() => console.log('Loaded'), 2000);
list.forEach(item => console.log(item));
```

#### 5、隐式返回值
只有一个语句的箭头函数，可以隐式返回结果（函数必须省略括号（{ }），以便省略返回关键字）。  
要返回多行语句（例如对象文本），需要使用（）而不是{ }来包裹函数体。这样可以确保代码以单个语句的形式进行求值。
```
//  未简写
function calcCircumference(diameter) {
  return Math.PI * diameter
}

//  简写：
calcCircumference = diameter => (
  Math.PI * diameter;
)
```

#### 6、默认参数值
可以使用 if 语句来定义函数参数的默认值。ES6 中规定了可以在函数声明中定义默认值。
```
//  未简写
function volume(l, w, h) {
  if (w === undefined)
    w = 3;
  if (h === undefined)
    h = 4;
  return l * w * h;
}

//  简写：
volume = (l, w = 3, h = 4 ) => (l * w * h);
volume(2) //output: 24
```

#### 7、模板字符串
```
//  未简写
const welcome = 'You have logged in as ' + first + ' ' + last + '.'
const db = 'http://' + host + ':' + port + '/' + database;

//  简写：
const welcome = `You have logged in as ${first} ${last}`;
const db = `http://${host}:${port}/${database}`;
```

#### 8、解构赋值
解构赋值是一种表达式，用于从数组或对象中快速提取属性值，并赋给定义的变量。
```
//  未简写
const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');
const store = this.props.store;
const form = this.props.form;
const loading = this.props.loading;
const errors = this.props.errors;
const entity = this.props.entity;

//  简写：
import { observable, action, runInAction } from 'mobx';
const { store, form, loading, errors, entity } = this.props;

//  甚至可以指定自己的变量名：
const { store, form, loading, errors, entity:contact } = this.props;
```

#### 9、展开运算符
使用展开运算符可以替换某些数组函数。
```
//  未简写
// joining arrays
const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);
// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice()

//  简写：
// joining arrays
const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]
// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = [...arr];
```
和 `concat()` 功能不同的是，用户可以使用扩展运算符在任何一个数组中插入另一个数组。
```
const odd = [1, 3, 5 ];
const nums = [2, ...odd, 4 , 6];
```
也可以将展开运算符和 ES6 解构符号结合使用：
```
const { a, b, ...z } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a)    // 1
console.log(b)    // 2
console.log(z)    // { c: 3, d: 4 }
```

#### 10、强制参数
默认情况下，如果不向函数参数传值，那么 JavaScript 会将函数参数设置为未定义。其它一些语言则会发出警告或错误。  
要执行参数分配，可以使用if语句抛出未定义的错误，或者可以利用“强制参数”。
```
//  未简写
function foo(bar) {
  if(bar === undefined) {
    throw new Error('Missing parameter!');
  }
  return bar;
}

//  简写：
mandatory = () => {
  throw new Error('Missing parameter!');
}
foo = (bar = mandatory( )) => {
  return bar;
}
```


#### 11、Array.find
如果你曾经编写过普通 `JavaScript` 中的 `find` 函数，那么你可能使用了 `for` 循环。  
在 `ES6` 中，介绍了一种名为 `find()` 的新数组函数，可以实现 `for` 循环的简写。
```
//  未简写
const pets = [
  { type: 'Dog', name: 'Max'},
  { type: 'Cat', name: 'Karl'},
  { type: 'Dog', name: 'Tommy'},
]
function findDog(name) {
  for(let i = 0; i<pets.length; ++i) {
    if(pets[i].type === 'Dog' && pets[i].name === name) {
      return pets[i];
    }
  }
}

//  简写：
pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }
```

#### 12、双位操作符
位操作符是 JavaScript 初级教程的基本知识点，但是我们却不常使用位操作符。  
因为在不处理二进制的情况下，没有人愿意使用 `1` 和 `0`。
但是双位操作符却有一个很实用的案例。你可以使用双位操作符来替代 `Math.floor()`。
双否定位操作符的优势在于它执行相同的操作运行速度更快。
```
//  未简写
Math.floor(4.9) === 4  //true

//  简写：
~~4.9 === 4  //true
```