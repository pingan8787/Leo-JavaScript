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
仅去重： 
```
let arr = [1,2,2,3,4,1,2,5,6,5];
let new_arr1 = new Set(arr);       // {Set} {1,2,3,4,5,6}
let new_arr2 = [...new Set(arr)];  // {Array} [1,2,3,4,5,6]
```
去重加排序   
```
let new_arr4 = [...new Set(arr1)].sort(function(a,b){return a-b});    // {Array} [1,2,3,4,5,6]
// 或者写成：let new_arr4 = Array.from(new Set(newArr)).sort(function(a,b){return a-b})
let new_arr5 = [...new Set(arr1)].sort(function(a,b){return b-a});    // {Array} [6,5,4,3,2,1]
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

### 13、判断是否是邮箱地址
参数：{String} str  
返回：{Boolean}  
```
function isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}
isEmail('aa.bb.cc');     // false
isEmail('aa@bb.cc');     // true
isEmail('aa.bb@cc');     // false
```

### 14、判断是否为身份证号
参数：{String|Number} str  
返回：{Boolean}  
```
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}
```

### 15、判断是否为手机号
参数：{String|Number} str  
返回：{Boolean}  
```
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}
```

### 16、判断是否为URL地址
参数：{String} str  
返回：{Boolean}  
```
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}
```

### 17、现金转大写
参数：{Number} str  
返回：{String}  
```
function digitUppercase(n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};
```

### 18、回到页面顶端
方法一：用 `<a href="#"></a>`  
方法二：
```
function backtop(){
    window.scrollTo(0,0)
}
```

### 19、ES7/8新特性
#### Array.prototype.includes()方法
`includes()` 的作用，是查找一个值在不在数组里，若在，则返回 `true` ，反之返回 `false` 。 基本用法：  
```
['a', 'b', 'c'].includes('a')         // true
['a', 'b', 'c'].includes('d')         // false
```
`Array.prototype.includes()` 方法接收两个参数：要搜索的值和搜索的开始索引。  
当第二个参数被传入时，该方法会从索引处开始往后搜索（默认索引值为0）。若搜索值在数组中存在则返回 `true` ，否则返回 `false` 。 且看下面示例：    
```
['a', 'b', 'c', 'd'].includes('b')     // true
['a', 'b', 'c', 'd'].includes('b', 1)  // true
['a', 'b', 'c', 'd'].includes('b', 2)  // false
```
那么，我们会联想到ES6里数组的另一个方法indexOf，下面的示例代码是等效的：  
```
['a', 'b', 'c'].includes('a')          //true
['a', 'b', 'c'].indexOf('a') > -1      //true
```


### 20、常用的直接取整方法
#### 1、parseInt()  
直接取整就是舍去小数部分。
```
arseInt("2015nov"),    //2015
parseInt(""),          //NaN
parseInt("0xA"),       //10(十六进制)
parseInt(20.15),       //20
parseInt(-20.15),      //-20
parseInt("070");       //56(八进制数)
```
#### 2、Math.trunc()  
Math.trunc() 方法会将数字的小数部分去掉，只保留整数部分。IE不支持。
```
Math.trunc(13.37)      // 13
Math.trunc(42.84)      // 42
Math.trunc(0.123)      //  0
Math.trunc(-0.123)     // -0
Math.trunc("-1.123")   // -1
Math.trunc(NaN)        // NaN
Math.trunc("foo")      // NaN
Math.trunc()           // NaN
```
#### 3、~~number
双波浪线 `~~ `操作符也被称为 `“双按位非”` 操作符。常可代替 `Math.trunc()` 的更快的方法。  
```
console.log(~~47.11)   // -> 47
console.log(~~1.9999)  // -> 1
console.log(~~3)       // -> 3
console.log(~~[])      // -> 0
console.log(~~NaN)     // -> 0
console.log(~~null)    // -> 0
```
#### 4、number|0
`|` (按位或) 对每一对比特位执行或（OR）操作。
```
console.log(20.15|0);           // -> 20
console.log((-20.15)|0);        // -> -20
console.log(3000000000.15|0);   // -> -1294967296
```
#### 5、number^0
`^` (按位异或)，对每一对比特位执行异或（XOR）操作。
```
console.log(20.15^0);           // -> 20
console.log((-20.15)^0);        // -> -20
console.log(3000000000.15^0);   // -> -1294967296
```
#### 6、number<<0
`<<` (左移) 操作符会将第一个操作数向左移动指定的位数。向左被移出的位被丢弃，右侧用 0 补充。
``` 
console.log(20.15 < < 0);       // -> 20
console.log((-20.15) < < 0);    //-20
console.log(3000000000.15<<0);  // -> -1294967296
```

### 21、舍入舍去取整
#### 1、四舍五入 Math.round(number)
Math.round() 是 Math 对象中的一个方法，将数值四舍五入为最接近的整数。
```
console.log(Math.round(20.1));   // -> 20
console.log(Math.round(20.5));   // -> 21
console.log(Math.round(20.9));   // -> 21
console.log(Math.round(-20.1));  // -> -20
console.log(Math.round(-20.5));  // -> -20 注意这里是-20而不是-21
console.log(Math.round(-20.9));  // -> -21
```
#### 2、向下取整 Math.floor(number)
Math.floor()这个方法取向下最接近的整数。
```
console.log(Math.floor(20.1));   // -> 20
console.log(Math.floor(20.5));   // -> 20
console.log(Math.floor(20.9));   // -> 20
console.log(Math.floor(-20.1));  // -> -21
console.log(Math.floor(-20.5));  // -> -21
console.log(Math.floor(-20.9));  // -> -21
```
#### 3、向上取整 Math.ceil(number)
Math.ceil()这个方法取向上最接近的整数。
```
console.log(Math.ceil(20.1));   // -> 21
console.log(Math.ceil(20.5));   // -> 21
console.log(Math.ceil(20.9));   // -> 21
console.log(Math.ceil(-20.1));  // -> -20
console.log(Math.ceil(-20.5));  // -> -20
console.log(Math.ceil(-20.9));  // -> -20
```

###  持续更新中···