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
