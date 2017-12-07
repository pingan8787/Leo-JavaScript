### 一、介绍
慢慢将自己积累的常用业务代码整理起来，以后经验丰富再回头修改完善，而且平常也会用得到。
还有一些是常用的API整理。

### 二、代码部分
此部分暂时部分顺序。


#### 1、金额转换
将类似 `12345` 元转换成 `1.23万` 元：
```
// 参数 ： num => 需要转换的金额
export function num2string(num) {
    if (num >= 10000 && num < 100000000) {
        return num = (num / 10000).toFixed(2) + '万';
    } else if (num >= 100000000) {
        return num = (num / 100000000).toFixed(2) + '亿';
    } else {
        return num
    }
}
```

### 2、获取第N天的日期
输入需要从今天往前推 `N` 天，即可获取那一天的时间，格式如 `2017-11-11`。  
如果需要修改时间 `连接符` 直接在代码修改。
```
// 参数 ： num => 需要前几天
export function getBeforeDate(num) {
    let n = num;
    let d = new Date();
    let year = d.getFullYear();
    let mon = d.getMonth() + 1;
    let day = d.getDate();
    if(day <= n) {
        if(mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
}
```
另外如果需要返回对象的话，只要将后面代码用 `new Date()` 转化或者写在函数里面也可以。   
如：  
```
let time = new Date(getBeforeDate(7));  // 返回七天前的时间对象。
```

### 3、转换数字为整十整百
实现效果如：  
传入 `'down'` 参数，返回格式如： `123.456 => 100` ；  
传入 `'up'` 参数，返回格式如： `123.456 => 200` ；  
这个是我在用 `Echarts` 绘制折线图，需要设置好坐标轴 `Label` 用到的。  
```
// 参数 ： data => 需要转换的数值 ，type => 转换类型   
export function setNumberToInt(data, type) {
    let num = data.toFixed(0).toString();
    if (type == 'down') {
        return +(num[0]) * 10 ** (num.length - 1);
    } else if (type == 'up') {
        return +(num[0] + 1) * 10 ** (num.length - 1);
    }
}
```

### 4、本地时间转换
就是官方API而已：
```
let a = new Date();
a ;                           // Wed Aug 16 2017 09:46:54 GMT+0800 (中国标准时间)
a.toLocaleDateString() ;      // "2017/8/16"
a.toLocaleTimeString() ;      // "上午9:46:54"
a.toLocaleString() ;          // "2017/8/16 上午9:46:54"
```

### 5、序列化对象
主要就是JSON类型和字符串的转换：  
```
// 参数 data => 需要转换的内容
JSON.stringify(data)          // JSON对象 => 字符串
JSON.parse(data)              // 字符串 => JSON对象
```

### 6、数组排序
使用 `sort()` 方法。   
```
var a= [ 'banana' , ' chree' , 'apple']; 
var b = [ 4,3,11,22];
a.sort();                     //按字母表排序
b.sort(function( a,b ){       // b = [3,4,11,22]  
     return a -b ;            // b-a 相反
})
```

### 7、简单求一个纯数字数组中最大最小值
```
Math.max.apply(null,[3,2,5,7]);
Math.min.apply(null,[3,2,5,7]);
```

### 8、获取某一天0点0分0秒
```
let d = new Date( 2017 , 12 , 01 )
```

### 9、获取并设置滚动条距顶部的距离
```
export function getScroll(){
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}
export function setScroll(value){
    window.scrollTo(0,value);
    return value;
}
```

### 10、判断一个对象是否是空对象
```
let c = {}
if(JSON.stringfy(c) == '{}'){
    console.log('这是空对象')
}
```

### 11、简单数组去重
这是 `ES6` 的新特性。  
```
let arr = [1,2,2,3,4,1,2,5,6,5];
let new_arr = [...new Set(arr)];
console.log(new_arr)  // [1,2,3,4,5,6]
```

### 12、获取某天0点0分0秒到第二天0点0分0秒
这是项目业务中用到的，用在查询数据库用户列表中所有今天注册用户的列表，也可以用在查询某一天，或某个时间段的内容。  
```
let today = '2017-12-07';
const zeroTime = new Date(today)
zeroTime.setHours(0)
zeroTime.setMinutes(0)
zeroTime.setSeconds(0)

const nextDayZeroTime = new Date(today)
nextDayZeroTime.setDate(nextDayZeroTime.getDate() + 1)
nextDayZeroTime.setHours(0)
nextDayZeroTime.setMinutes(0)
nextDayZeroTime.setSeconds(0)
   
console.log(zeroTime)              // Thu Dec 07 2017 00:00:00 GMT+0800 (中国标准时间)
console.log(nextDayZeroTime)       // Fri Dec 08 2017 00:00:00 GMT+0800 (中国标准时间)
```

###  持续更新中···