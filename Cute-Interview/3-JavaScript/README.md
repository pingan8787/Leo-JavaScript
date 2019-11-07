### 1. 怎么实现this对象的深拷贝

### 2. 如何解决跨域的问题

所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

**跨域解决方案**  
1. 通过jsonp跨域
2. document.domain + iframe跨域
3. location.hash + iframe
4. window.name + iframe跨域
5. postMessage跨域
6. 跨域资源共享（CORS）
7. nginx代理跨域
8. nodejs中间件代理跨域
9. WebSocket协议跨域

### 3. promise、async有什么区别

### 4. 介绍this各种情况

### 5. 介绍下Promise，内部实现，Promise有几个状态

### 6. bind、call、apply的区别

### 7. 介绍冒泡排序，选择排序，冒泡排序如何优化

### 8. 如何设计Promise.all()

### 9. 防抖和节流的区别

1. 节流

**节流（throttle）**：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
函数节流就是fps游戏的射速，就算一直按着鼠标射击，也只会在规定射速内射出子弹。

```js
function throttle(fun, delay) {
    let last, deferTimer
    return function (args) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function () {
                last = now
                fun.apply(that, _args)
            }, delay)
        }else {
            last = now
            fun.apply(that,_args)
        }
    }
}
```

2. 防抖

**防抖（debounce）**：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
函数防抖就是法师发技能的时候要读条，技能读条没完再按技能就会重新读条。

```js
function debounce(fun, delay) {
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}
```

### 10. 介绍各种异步方案

* 回调函数
* 事件监听
* 发布订阅模式
* Promise
* Generator (ES6)
* async (ES7)

### 11. JS里垃圾回收机制是什么，常用的是哪种，怎么处理的

### 12. [1, 2, 3, 4, 5]变成[1, 2, 3, a, b, 5]

### 13. 取数组的最大值（ES5、ES6）

### 14. 如何找0-5的随机数，95-99呢

### 15. some、every、find、filter、map、forEach有什么区别

### 16. 页面上有1万个button如何绑定事件

```html
<ul id="list">
    <li><button>1</button></li>
    <li><button>2</button></li>
    <li><button>3</button></li>
    <li><button>4</button></li>
</ul>
```

```js
var ulNode = document.getElementById("list");
    ulNode.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName.toUpperCase() == "LI") {
            alert(e.target.innerHTML);
        }
    }, false);
```

### 17. 手写数组扁平化函数/数组去重函数

### 18. new是怎么实现的

### 19. loadsh深拷贝实现原理

### 20. for..in 和 object.keys的区别

### 21. Promise 和 async/await 和 callback的区别

### 22. Promise有没有解决异步的问题

### 23. Promise和setTimeout的区别（Event Loop）

### 24. Set 和 Map 数据结构

https://juejin.im/entry/5a968ba56fb9a06340524128

https://muyiy.cn/question/js/4.html

简单介绍：

* ES6 提供了新的数据结构 `Set` 它类似于**数组**，但是成员的值都是**唯一**的，**没有重复的值**。

* ES6 提供了 `Map` 数据结构。它类似于**对象**，也是**键值对**的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，**Object 结构提供了“字符串—值”的对应**，**Map 结构提供了“值—值”的对应**，是一种更完善的 Hash 结构实现。

----
Set 和 Map 主要的应用场景在于 **数据重组** 和 **数据储存**。

Set 是一种叫做**集合**的数据结构，Map 是一种叫做**字典**的数据结构。

#### 1. Set

类似于数组，但成员是唯一且无序的，没有重复的值。

**Set 本身是一种构造函数，用来生成 Set 数据结构。**

```js
const s = new Set()
[1, 2, 3, 4, 3, 2, 1].forEach(x => s.add(x))

for (let i of s) {
    console.log(i)	// 1 2 3 4
}

// 去重数组的重复对象
let arr = [1, 2, 3, 2, 1, 1]
[... new Set(arr)]	// [1, 2, 3]
```

Set 对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用。

**注意：** 向 Set 加入值的时候，不会发生类型转换，所以 `5` 和 `"5"` 是两个不同的值。

```js
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}

let set1 = new Set()
set1.add(5)
set1.add('5')
console.log([...set1])	// [5, "5"]
```

Set 实例属性和方法：

* `constructor`： 构造函数   
* `size`：元素数量   
* `add(value)`：新增，相当于 array 里的 `push`   
* `delete(value)`：存在即删除集合中 `value`   
* `has(value)`：判断集合中是否存在 `value`   
* `clear()`：清空集合   

Set 实例遍历方法（遍历顺序为插入顺序）:

* `keys()`：返回一个包含集合中所有键的迭代器   
* `values()`：返回一个包含集合中所有值得迭代器   
* `entries()`：返回一个包含Set对象中所有元素得键值对迭代器   
* `forEach(callbackFn, thisArg)`：用于对集合成员执行 `callbackFn` 操作，如果提供了 `thisArg` 参数，回调中的 `this` 会是这个参数，没有返回值

```js
let set = new Set([1, 2, 3])
console.log(set.keys())	// SetIterator {1, 2, 3}
console.log(set.values())	// SetIterator {1, 2, 3}
console.log(set.entries())	// SetIterator {1, 2, 3}

for (let item of set.keys()) {
  console.log(item);
}	// 1	2	 3
for (let item of set.entries()) {
  console.log(item);
}	// [1, 1]	[2, 2]	[3, 3]

set.forEach((value, key) => {
    console.log(key + ' : ' + value)
})	// 1 : 1	2 : 2	3 : 3
console.log([...set])	// [1, 2, 3]
```

Set可以使用 map、filter 方法:

```js
let set = new Set([1, 2, 3])
set = new Set([...set].map(item => item * 2))
console.log([...set])	// [2, 4, 6]

set = new Set([...set].filter(item => (item >= 4)))
console.log([...set])	//[4, 6]
```

Set 很容易实现交集（Intersect）、并集（Union）、差集（Difference）：

```js
let set1 = new Set([1, 2, 3])
let set2 = new Set([4, 3, 2])

let intersect = new Set([...set1].filter(value => set2.has(value)))
let union = new Set([...set1, ...set2])
let difference = new Set([...set1].filter(value => !set2.has(value)))

console.log(intersect)	// Set {2, 3}
console.log(union)		// Set {1, 2, 3, 4}
console.log(difference)	// Set {1}
```

### 25. WeakMap 和 Map 的区别?

https://muyiy.cn/question/js/4.html

* `WeakMap` 结构与 `Map` 结构基本类似，唯一的区别是它只接受**对象**作为键名（ `null` 除外），不接受其他类型的值作为键名，而且**键名**所指向的对象，不计入垃圾回收机制。
* `WeakMap` 最大的好处是可以避免内存泄漏。一个仅被 `WeakMap` 作为 `key` 而引用的对象，会被垃圾回收器回收掉。
`WeakMap` 拥有和 `Map` 类似的 `set(key, value)` 、`get(key)`、`has(key)`、`delete(key) `和 `clear()` 方法, 没有任何与迭代有关的属性和方法。

### 26. WeakSet 和 WeakMap 的区别？

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 