> [阅读原文](http://mp.weixin.qq.com/s/LxdDsgPAGTx19T5BZnw6EQ)

该项目来自于 `Github` 用户 `Chalarangelo`，目前已在 `Github` 上获得了 `5000` 多Star，精心收集了多达 `48` 个有用的 `JavaScript` 代码片段，该用户的代码可以让程序员在 `30` 秒甚至更少的时间内理解这些经常用到的基础算法，来看看这些 JavaScript 代码都传达出了什么吧！  

## 1、Anagrams of string（带有重复项）
使用递归。对于给定字符串中的每个字母，为字母创建字谜。使用map()将字母与每部分字谜组合，然后使用reduce()将所有字谜组合到一个数组中，最基本情况是字符串长度等于2或1。
```
const anagrams = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce((acc, letter, i) =>
    acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
};
// anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
```

## 2、数组平均数
使用reduce()将每个值添加到累加器，初始值为0，总和除以数组长度。
```
const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
// average([1,2,3]) -> 2
```

## 3、大写每个单词的首字母
使用replace()匹配每个单词的第一个字符，并使用toUpperCase()来将其大写。
```
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
// capitalizeEveryWord('hello world!') -> 'Hello World!'
```

## 4、首字母大写
使用slice（0,1）和toUpperCase()大写第一个字母，slice（1）获取字符串的其余部分。 省略lowerRest参数以保持字符串的其余部分不变，或将其设置为true以转换为小写。（注意：这和上一个示例不是同一件事情）
```
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
// capitalize('myName', true) -> 'Myname'
```

## 5、检查回文
将字符串转换为toLowerCase()，并使用replace()从中删除非字母的字符。然后，将其转换为tolowerCase()，将（''）拆分为单独字符，reverse()，join（''），与原始的非反转字符串进行比较，然后将其转换为tolowerCase()。
```
const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g,'');
  return s === s.split('').reverse().join('');
}
// palindrome('taco cat') -> true
```

## 6、计数数组中值的出现次数
每次遇到数组中的特定值时，使用reduce()来递增计数器。
```
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3
```

## 7、当前URL
使用window.location.href来获取当前URL。
```
const currentUrl = _ => window.location.href;
// currentUrl() -> 'https://google.com'
```

## 8、Curry
使用递归。如果提供的参数（args）数量足够，则调用传递函数f，否则返回一个curried函数f。
```
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length
    ? fn(...args)
    : curry.bind(null, fn, arity, ...args);
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2
```

## 9、Deep flatten array
使用递归，使用reduce()来获取所有不是数组的元素，flatten每个元素都是数组。
```
const deepFlatten = arr =>
  arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
```

## 10、数组之间的区别
从b创建一个Set，然后在a上使用Array.filter()，只保留b中不包含的值。
```
const difference = (a, b) => { const s = new Set(b); return a.filter(x => !s.has(x)); };
// difference([1,2,3], [1,2]) -> [3]
```

## 11、两点之间的距离
使用Math.hypot()计算两点之间的欧几里德距离。
```
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
// distance(1,1, 2,3) -> 2.23606797749979
```

## 12、可以按数字整除
使用模运算符（％）来检查余数是否等于0。
```
const isDivisible = (dividend, divisor) => dividend % divisor === 0;
// isDivisible(6,3) -> true
```

## 13、转义正则表达式
使用replace()来转义特殊字符。
```
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// escapeRegExp('(test)') -> \\(test\\)
```

## 14、偶数或奇数
使用Math.abs()将逻辑扩展为负数，使用模（％）运算符进行检查。 如果数字是偶数，则返回true；如果数字是奇数，则返回false。
```
const isEven = num => num % 2 === 0;
// isEven(3) -> false
```

## 15、阶乘
使用递归。如果n小于或等于1，则返回1。否则返回n和n - 1的阶乘的乘积。
```
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
// factorial(6) -> 720
```

## 16、斐波那契数组生成器
创建一个特定长度的空数组，初始化前两个值（0和1）。使用Array.reduce()向数组中添加值，后面的一个数等于前面两个数相加之和（前两个除外）。
```
const fibonacci = n =>
  Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
// fibonacci(5) -> [0,1,1,2,3]
```

## 17、过滤数组中的非唯一值
将Array.filter()用于仅包含唯一值的数组。
```
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
```

## 18、Flatten数组
使用reduce()来获取数组中的所有元素，并使用concat()来使它们flatten。
```
const flatten = arr => arr.reduce((a, v) => a.concat(v), []);
// flatten([1,[2],3,4]) -> [1,2,3,4]
```

## 19、从数组中获取最大值
使用Math.max()与spread运算符（...）结合得到数组中的最大值。
```
const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10
```

## 20、从数组中获取最小值
使用Math.min()与spread运算符（...）结合得到数组中的最小值。
```
const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1
```

## 21、获取滚动位置
如果已定义，请使用pageXOffset和pageYOffset，否则使用scrollLeft和scrollTop，可以省略el来使用window的默认值。
```
const getScrollPos = (el = window) =>
  ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop});
// getScrollPos() -> {x: 0, y: 200}
```

## 22、最大公约数（GCD）
使用递归。基本情况是当y等于0时。在这种情况下，返回x。否则，返回y的GCD和x / y的其余部分。
```
const gcd = (x, y) => !y ? x : gcd(y, x % y);
// gcd (8, 36) -> 4
```

## 23、Head of list
返回ARR[0]
```
const head = arr => arr[0];
// head([1,2,3]) -> 1
```

## 24、list初始化
返回arr.slice（0，-1）
```
const initial = arr => arr.slice(0, -1);
// initial([1,2,3]) -> [1,2]
```

## 25、用range初始化数组
使用Array（end-start）创建所需长度的数组，使用map()来填充范围中的所需值，可以省略start使用默认值0。
```
const initializeArrayRange = (end, start = 0) =>
  Array.apply(null, Array(end - start)).map((v, i) => i + start);
// initializeArrayRange(5) -> [0,1,2,3,4]
```

## 26、用值初始化数组
使用Array（n）创建所需长度的数组，fill(v)以填充所需的值，可以忽略value使用默认值0。
```
const initializeArray = (n, value = 0) => Array(n).fill(value);
// initializeArray(5, 2) -> [2,2,2,2,2]
```

## 27、列表的最后
返回arr.slice（-1）[0]
```
const last = arr => arr.slice(-1)[0];
// last([1,2,3]) -> 3
```

## 28、测试功能所花费的时间
使用performance.now()获取函数的开始和结束时间，console.log()所花费的时间。第一个参数是函数名，随后的参数传递给函数。
```
const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};
// timeTaken(() => Math.pow(2, 10)) -> 1024
// (logged): timeTaken: 0.02099609375ms
```

## 29、来自键值对的对象
使用Array.reduce()来创建和组合键值对。
```
const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
// objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}
```

## 30、管道
使用Array.reduce()通过函数传递值。
```
const pipe = (...funcs) => arg => funcs.reduce((acc, func) => func(acc), arg);
// pipe(btoa, x => x.toUpperCase())("Test") -> "VGVZDA=="
```

## 31、Powerset
使用reduce()与map()结合来遍历元素，并将其组合成包含所有组合的数组。
```
const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
// powerset([1,2]) -> [[], [1], [2], [2,1]]
```

## 32、范围内的随机整数
使用Math.random()生成一个随机数并将其映射到所需的范围，使用Math.floor()使其成为一个整数。
```
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2
```

## 33、范围内的随机数
使用Math.random()生成一个随机值，使用乘法将其映射到所需的范围。
```
const randomInRange = (min, max) => Math.random() * (max - min) + min;
// randomInRange(2,10) -> 6.0211363285087005
```

## 34、随机化数组的顺序
使用sort()重新排序元素，利用Math.random()来随机排序。
```
const shuffle = arr => arr.sort(() => Math.random() - 0.5);
// shuffle([1,2,3]) -> [2,3,1]
```

## 35、重定向到URL
使用window.location.href或window.location.replace()重定向到url。 传递第二个参数来模拟链接点击（true - default）或HTTP重定向（false）。
```
const redirect = (url, asLink = true) =>
  asLink ? window.location.href = url : window.location.replace(url);
// redirect('https://google.com')
```

## 36、反转一个字符串
使用数组解构和Array.reverse()来颠倒字符串中的字符顺序。合并字符以使用join('')获取字符串。
```
const reverseString = str => [...str].reverse().join('');
// reverseString('foobar') -> 'raboof'
```

## 37、RGB到十六进制
使用按位左移运算符（<<）和toString（16），然后padStart（6，“0”）将给定的RGB参数转换为十六进制字符串以获得6位十六进制值。
```
const rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// rgbToHex(255, 165, 1) -> 'ffa501'
```

## 38、滚动到顶部
使用document.documentElement.scrollTop或document.body.scrollTop获取到顶部的距离。  
从顶部滚动一小部分距离。  
使用window.requestAnimationFrame()来滚动。  
```
const scrollToTop = _ => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
// scrollToTop()
```

## 39、随机数组值
使用Array.map()和Math.random()创建一个随机值的数组。使用Array.sort()根据随机值对原始数组的元素进行排序。

## 40、数组之间的相似性
使用filter()移除不是values的一部分值，使用includes()确定。
```
const similarity = (arr, values) => arr.filter(v => values.includes(v));
// similarity([1,2,3], [1,2,4]) -> [1,2]
```

## 41、按字符串排序（按字母顺序排列）
使用split（''）分割字符串，sort()使用localeCompare()，使用join（''）重新组合。
```
const sortCharactersInString = str =>
  str.split('').sort((a, b) => a.localeCompare(b)).join('');
// sortCharactersInString('cabbage') -> 'aabbceg'
```

## 42、数组总和
使用reduce()将每个值添加到累加器，初始化值为0。
```
const sum = arr => arr.reduce((acc, val) => acc + val, 0);
// sum([1,2,3,4]) -> 10
```

## 43、交换两个变量的值
使用数组解构来交换两个变量之间的值。
```
[varA, varB] = [varB, varA];
// [x, y] = [y, x]
```

## 44、列表的tail
返回arr.slice（1）
```
const tail = arr => arr.length > 1 ? arr.slice(1) : arr;
// tail([1,2,3]) -> [2,3]
// tail([1]) -> [1]
```

## 45、数组唯一值
使用ES6 Set和... rest操作符去掉所有重复值。
```
const unique = arr => [...new Set(arr)];
// unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
```

## 46、URL参数
使用match() 与适当的正则表达式来获得所有键值对，适当的map() 。使用Object.assign()和spread运算符（...）将所有键值对组合到一个对象中，将location.search作为参数传递给当前url。
```
const getUrlParameters = url =>
  url.match(/([^?=&]+)(=([^&]*))/g).reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  );
// getUrlParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
```

## 47、UUID生成器
使用crypto API生成符合RFC4122版本4的UUID。
```
const uuid = _ =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
// uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'
```

## 48、验证数字
使用！isNaN和parseFloat()来检查参数是否是一个数字，使用isFinite()来检查数字是否是有限的。
```
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
// validateNumber('10') -> true
```

翻译多有不准确之处，感兴趣的程序员可以自行到Github上查看英文原版。