学习时间：2020.05.26

学习章节：[《你不知道的 WeakMap》](https://juejin.im/post/5ecd1ad3e51d45784c52db73)

# 一、主要知识点

原文主要复习了“JavaScript垃圾回收机制”，“Map/WeakMap区别”和“WeakMap 属性和方法”。这很好弥补被我忽视的知识点。

另外，我们可以通过原文，以相同方式再去学 Set/WeakSet，效果会更好，本文后面也会介绍到。

**总结开始，先看原文大纲：**

![image.png](http://images.pingan8787.com/blog/you-dont-know-WeakMap/xmind.png)

在开始介绍 WeakMap 之前，先复习一遍 JavaScript 中垃圾回收机制，这跟后面的 WeakMap/WeakSet 关系较大。

## 1. 垃圾回收机制
[垃圾回收（Garbage Collection，缩写为GC）](https://zh.wikipedia.org/zh-hans/%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6_(%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%B8))是一种自动的存储器管理机制。当某个程序占用的一部分内存空间不再被这个程序访问时，这个程序会借助垃圾回收算法向操作系统归还这部分内存空间。垃圾回收器可以减轻程序员的负担，也减少程序中的错误。垃圾回收最早起源于LISP语言。
目前许多语言如Smalltalk、Java、C#和D语言都支持垃圾回收器，我们熟知的 JavaScript 具有自动垃圾回收机制。

**在 JavaScript 中，原始类型的数据被分配到栈空间中，引用类型的数据会被分配到堆空间中**。

### 1.1 栈空间中的垃圾回收
当函数 `showName` 调用完成后，通过下移 [ESP（Extended Stack Pointer）](https://baike.baidu.com/item/esp/35173)指针，来销毁 `showName` 函数，之后调用其他函数时，将覆盖掉旧内存，存放另一个函数的执行上下文，实现垃圾回收。
![image.png](http://images.pingan8787.com/blog/you-dont-know-WeakMap/ESP.png)
图片来自《浏览器工作原理与实践》

### 1.2 堆空间中的垃圾回收
堆中数据垃圾回收策略的基础是：[**代际假说**（The Generational Hypothesis）](https://plumbr.io/handbook/garbage-collection-in-java/generational-hypothesis)。即：

1. 大部分对象在内存中存在时间极短，很多对象很快就不可访问。
1. 不死的对象将活得更久。

这两个特点不仅仅适用于 JavaScript，同样适用于大多数的动态语言，如 Java、Python 等。

V8 引擎将堆空间分为**新生代**（存放生存**时间短**的对象）和**老生代**（存放生存**时间长**的对象）两个区域，并使用不同的垃圾回收器。

- 副垃圾回收器，主要负责新生代的垃圾回收。
- 主垃圾回收器，主要负责老生代的垃圾回收。

不管是哪种垃圾回收器，都使用相同垃圾回收流程：**标记活动对象和非活动对象，回收非活动对象的内存，最后内存整理**。
#### 1.2.1 副垃圾回收器
使用 Scavenge 算法处理，将新生代空间对半分为两个区域，一个对象区域，一个空闲区域。
![image.png](http://images.pingan8787.com/blog/you-dont-know-WeakMap/Scavenge.png)
图片来自《浏览器工作原理与实践》

执行流程：

- 新对象存在在**对象区域**，当对象区域将要写满时，执行一次垃圾回收；
- 垃圾回收过程中，首先对对象区域中的垃圾做标记，然后副垃圾回收器将存活的对象复制并有序排列到空闲区域，相当于完成内存整理。
- 复制完成后，将对象区域和空闲区域翻转，完成垃圾回收操作，这也让新生代中两块区域无限重复使用。

当然，这也存在一些问题：若复制操作的数据较大则影响清理效率。

JavaScript 引擎的解决方式是：将新生代区域设置得比较小，并采用对象晋升策略（经过两次回收仍存活的对象，会被移动到老生区），避免因为新生代区域较小引起存活对象装满整个区域的问题。

#### 1.2.2 主垃圾回收器
分为：**标记 - 清除（Mark-Sweep）算法**，和**标记 - 整理（Mark-Compact）算法**。

**a)标记 - 清除（Mark-Sweep）算法**
**过程**：

- 标记过程：从一组根元素开始遍历整个元素，能到达的元素为活动对象，反之为垃圾数据；
- 清除过程：清理被标记的数据，并产生大量碎片内存。（缺点：导致大对象无法分配到足够的连续内存）

![image.png](http://images.pingan8787.com/blog/you-dont-know-WeakMap/Mark-Sweep.png)
图片来自《浏览器工作原理与实践》


**b)标记 - 整理（Mark-Compact）算法**
**过程**：

- 标记过程：从一组根元素开始遍历整个元素，能到达的元素为活动对象，反之为垃圾数据；
- 整理过程：将所有存活的对象，向一段移动，然后清除端边界以外的内容。

![image.png](http://images.pingan8787.com/blog/you-dont-know-WeakMap/Mark-Compact.png)
图片来自《浏览器工作原理与实践》

### 1.3 拓展阅读
1.[《图解Java 垃圾回收机制》](https://blog.csdn.net/justloveyou_/article/details/71216049)
2.[《MDN 内存管理》](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)


## 2. Map VS WeakMap
### 2.1 Map 和 WeakMap 主要区别
`WeakMap` 结构与 `Map` 结构类似，也是用于生成键值对的集合。

区别：

- `Map`  对象的键可以是任何类型，但 `WeakMap`  对象中的键只能是对象引用（ `null` 除外）；
```javascript
const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key
```

- `WeakMap`  不能包含无引用的对象，否则会被自动清除出集合（垃圾回收机制）；
- `WeakMap`  对象没有 `size` 属性，是不可枚举的，无法获取集合的大小。
```javascript
const map = new WeakMap();
const user1 = {name: 'leo'};
const user2 = {name: 'pingan'};
map.set(user1, 'good~');
map.set(user2, 'hello');
map.map(item => console.log(item))
//Uncaught TypeError: map.map is not a function
```

### 2.2 Map 缺点和 WeakMap 优点
1.赋值和搜索操作都是 O(n) 的时间复杂度，因为这两个操作都需要遍历全部整个数组来进行匹配。

2.可能会导致内存泄漏，因为数组会一直引用着每个键和值。

相比之下， `WeakMap`  持有的是每个键对象的 “弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行。 原生 `WeakMap ` 的结构是特殊且有效的，其用于映射的 key 只有在其没有被回收时才是有效的。


### 2.3 Map 和 WeakMap 垃圾回收对比
当数据量越大，则垃圾回收效果越明显。

通过命令行执行 `node --expose-gc weakmap.js` 查看对比效果。

其中 `--expose-gc` 参数表示允许手动执行垃圾回收机制。
```javascript
// weakmap.js
const objNum = 10 * 1024 * 1024;
const useType = 1; // 修改 useType 值来测试Map和WeakMap
const curType = useType == 1 ?"【Map】" : "【WeakMap】";
let arr = new Array(objNum);

function usageSize() {
    const used = process.memoryUsage().heapUsed;
    return Math.round((used / 1024 / 1024) * 100) / 100 + "M";
}

if (useType == 1) {
    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    const map = new Map();
    map.set(arr, 1);

    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    arr = null;
    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    console.log("=====")
} else {
    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    const map = new WeakMap();

    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    arr = null;
    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    console.log("=====")
}
```


## 3. WeakMap介绍和应用
### 3.1 WeakMap 介绍
`WeakMap`  对象是一组键/值对的集合，其中的键是 **弱引用** 的。

**WeakMap 的 key 只能是 Object 类型**。

**原始数据类型是不能作为 key 的（比如 Symbol）**。

`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

具体属性和方法介绍，可查看 《[MDN WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)》。

### 3.2 WeakMap 应用
原文中介绍了“通过 WeakMap 缓存计算结果”和“在 WeakMap 中保留私有数据”两种应用场景。

另外还有一种比较常见的场景：**以 DOM节点作为键名的场景**。

**场景1：当我们想要为DOM添加数据时，可使用 `WeakMap` 。**

好处在于，当DOM元素移除时，对应 WeakMap 记录也会自动移除：

```html
<div id="WeakMap"></div>
```

```javascript
const wm = new WeakMap();
const weakMap = document.getElementById('WeakMap');
wm.set(weakMap, 'some information');
wm.get(weakMap) //"some information"
```
**场景2：当我们想要为DOM元素添加事件监听时，可使用 `WeakMap` 。**
```html
<button id="button1">按钮1</button>
<button id="button2">按钮2</button>
```
```javascript
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const handler1 = () => {  console.log("button1 被点击") };
const handler2 = () => {  console.log("button2 被点击") };

// 代码1
button1.addEventListener('click', handler1, false);
button2.addEventListener('click', handler2, false);
 
// 代码2
const listener = new WeakMap();
 
listener.set(button1, handler1);
listener.set(button2, handler2);
 
button1.addEventListener('click', listener.get(button1), false);
button2.addEventListener('click', listener.get(button2), false);
```
代码2比起代码1的好处是：由于监听函数是放在 WeakMap 里面，

则一旦 DOM 对象button1 / button2消失，与它绑定的监听函数handler1和handler2 也会自动消失。

# 二、拓展知识
## 1. 拓展 Set/WeakSet
### 1.1 Set 和 WeakSet 主要区别
`WeakSet`  结构与 `Set` 类似，也是不重复的值的集合。

区别：

- `WeakSet` 的成员只能是对象，而不能是其他类型的值；
```javascript
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set
```

- `WeakSet`  中的对象都是弱引用，即垃圾回收机制不考虑 `WeakSet`  对该对象的引用;
- `WeakSet`  对象没有 `size` 属性，是不可枚举的，无法获取集合的大小。


### 1.2 Set/WeakSet 垃圾回收对比
通过命令行执行 `node --expose-gc weakset.js` 查看对比效果。
```javascript
// weakset.js
const objNum = 5000 * 1024;
const useType = 1;
const curType = useType == 1 ?"【Set】" : "【WeakSet】";
let obj = [];
for (let k = 0; k < objNum; k++) {
    obj[k] = {}
}

function usageSize() {
    const used = process.memoryUsage().heapUsed;
    return Math.round((used / 1024 / 1024) * 100) / 100 + "M";
}

if (useType == 1) {
    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    const sets = new Set([...obj]);

    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    obj = null;
    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    console.log("=====")
} else {
    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    const sets = new WeakSet(obj);

    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    obj = null;
    global.gc();
    console.log(objNum + '个' + curType + '占用内存：' + usageSize());

    console.log("=====")
}
```


# 三、总结
本文首先复习了《你不知道的 WeakMap》中核心知识点，重新回顾了“垃圾回收机制”，“Map VS WeakMap”和“WeakMap 介绍和应用”，最后延伸复习了“Set/WeakSet”相关知识点。

在实际业务开发中，最好也能考虑垃圾回收机制的合理使用，这也是提升产品性能的一个非常常用的方式。


|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|
|语雀知识库|[Cute-FrontEnd](https://www.yuque.com/wangpingan/cute-frontend)|

![bg](http://images.pingan8787.com/2019_07_12guild_page.png)