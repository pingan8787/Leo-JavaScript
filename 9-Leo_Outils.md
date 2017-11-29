### 一、介绍
慢慢将自己积累的常用业务代码整理起来，以后经验丰富再回头修改完善，而且平常也会用得到。

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


###  持续更新中···