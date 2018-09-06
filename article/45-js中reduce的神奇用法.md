最近经常在项目中经常看到别人用reduce处理数据，很是牛掰，很梦幻， 不如自己琢磨琢磨。先看w3c语法。
## w3c语法
```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue);
/*
total: 必需。初始值, 或者计算结束后的返回值。
currentValue： 必需。当前元素。
currentIndex： 可选。当前元素的索引；
arr： 可选。当前元素所属的数组对象。
initialValue: 可选。传递给函数的初始值，相当于total的初始值。
*/
```

## 常见用法

### 1.数组求和
```js
const arr = [12, 34, 23];
const sum = arr.reduce((total, num) => total + num);
// 设定初始值求和
const arr = [12, 34, 23];
const sum = arr.reduce((total, num) => total + num, 10); // 以10为初始值求和
// 对象数组求和
var result = [
{ subject: 'math', score: 88 },
{ subject: 'chinese', score: 95 },
{ subject: 'english', score: 80 }
];
const sum = result.reduce((prev, cur) => prev + cur.score, 0);
const sum = result.reduce((prev, cur) => prev + cur.score, -10); // 总分扣除10分
```

### 2.数组最大值
```js
const a = [23,123,342,12];
const max = a.reduce(function(pre,cur,inde,arr){return pre>cur?pre:cur;}); // 342
```

## 进阶用法

### 1.数组对象中的用法
```js
// 比如生成“老大、老二和老三”
const objArr = [{name: '老大'}, {name: '老二'}, {name: '老三'}];
const res = objArr.reduce((pre, cur, index, arr) => {
if (index === 0) {
return cur.name;
}
else if (index === (arr.length - 1)) {
return pre + '和' + cur.name;
}
else {
return pre + '、' + cur.name;
}
}, '');
```
### 2.求字符串中字母出现的次数
```js
const str = 'sfhjasfjgfasjuwqrqadqeiqsajsdaiwqdaklldflas-cmxzmnha';
const res = str.split('').reduce((prev, cur) => {prev[cur] ? prev[cur]++ : prev[cur] = 1; return prev;}, {});
```

### 3.数组转数组
```js
// 按照一定的规则转成数组
var arr1 = [2, 3, 4, 5, 6]; // 每个值的平方
var newarr = arr1.reduce((prev, cur) => {prev.push(cur * cur); return prev;}, []);
```

### 4.数组转对象
```js
// 按照id 取出stream
var streams = [{name: '技术', id: 1}, {name: '设计', id: 2}];
var obj = streams.reduce((prev, cur) => {prev[cur.id] = cur; return prev;}, {});
```

## 高级用法

### 1.多维的叠加执行操作
```js
// 各科成绩占比重不一样， 求结果
var result = [
{ subject: 'math', score: 88 },
{ subject: 'chinese', score: 95 },
{ subject: 'english', score: 80 }
];
var dis = {
math: 0.5,
chinese: 0.3,
english: 0.2
};
var res = result.reduce((prev, cur) => dis[cur.subject] * cur.score + prev, 0);

// 加大难度， 商品对应不同国家汇率不同，求总价格
var prices = [{price: 23}, {price: 45}, {price: 56}];
var rates = {
us: '6.5',
eu: '7.5',
};
var initialState = {usTotal:0, euTotal: 0};
var res = prices.reduce((prev1, cur1) => Object.keys(rates).reduce((prev2, cur2) => {
console.log(prev1, cur1, prev2, cur2);
prev1[`${cur2}Total`] += cur1.price * rates[cur2];
return prev1;
}, {}), initialState);

var manageReducers = function() {
return function(state, item) {
return Object.keys(rates).reduce((nextState, key) => {
state[`${key}Total`] += item.price * rates[key];
return state;
}, {});
}
};
var res1= prices.reduce(manageReducers(), initialState);
```

### 2.扁平一个多维数组
```js
var arr = [[1, 2, 8], [3, 4, 9], [5, 6, 10]];
var res = arr.reduce((x, y) => x.concat(y), []);
```

### 3.对象数组去重
```js
const hash = {};
chatlists = chatlists.reduce((obj, next: Object) => {
const hashId = `${next.topic}_${next.stream_id}`;
if (!hash[hashId]) {
hash[`${next.topic}_${next.stream_id}`] = true;
obj.push(next);
}
return obj;
}, []);
```
