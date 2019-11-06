最近公司内部在开始做前端技术的技术分享，每周一个主题的 **每周一练**，以**基础知识**为主，感觉挺棒的，跟着团队的大佬们学习和复习一些知识，新人也可以多学习一些知识，也把团队内部学习氛围营造起来。   

我接下来会开始把每周一练的题目和知识整理一下，便于思考和巩固，就像今天这篇开始。    

学习的道路，很漫长，要坚持，希望大家都能掌握自己喜欢的技术，和自己需要的技术。   

> 欢迎查看我的 [个人主页](https://github.com/pingan8787) &&  [个人博客](http://www.pingan8787.com/) && [个人知识库](http://js.pingan8787.com/) && 微信公众号“前端自习课”

**本周练习内容：数据结构与算法 —— Stack**   

这些都是数据结构与算法，一部分方法是团队其他成员实现的，一部分我自己做的，有什么其他实现方法或错误，欢迎各位大佬指点，感谢。   

## 一、栈有什么特点，生活中有什么例子?
* 栈( stack )又称**堆栈**，是一种后进先出的**有序集合**，其中一端为栈顶，另一端为栈底，添加元素（称为压栈/入栈或进栈）时，将新元素压入栈顶，删除元素（称为出栈或退栈）时，将栈底元素删除并返回被删除元素。
* 特点：**先进后出，后进先出**。
* 例子：一叠书、一叠盘子。

![栈](http://images.pingan8787.com/20190702add.png)

## 二、实现一个栈，并实现下面方法
* `push(element)`：添加一个新元素到栈顶。  
* `pop()`：移除栈顶的元素，同时返回被移除的元素。  
* `peek()`：返回栈顶的元素，不对栈做任何修改 (这个方法不会移除栈顶的元素，仅仅返回它)。  
* `isEmpty()`：如果栈没有任何元素就返回 `true`，否则返回 `false`。  
* `clear()`：移除栈里面的所有元素。  
* `size()`：返回栈里的元素个数。这个方法与数组的 `length` 属性类似。  

**方法1：ES6实现**   
```js
class Stack {
    constructor (){
        this.items = []
    }
    push( element ){
        this.items.push(element)
    }
    pop(){
        return this.items.pop()
    }
    peek(){
        return this.items[this.items.length - 1]
    }
    isEmpty(){
        return this.items.length === 0
    }
    clear(){
        this.items = []
    }
    size(){
        return this.items.length
    }
}
```
上面实现的方式虽然简单，但是内部 `items` 属性是公共的，为了满足面向对象变成私有性的原则，我们应该让 `items` 作为私有属性，因此我们可以使用 ES6 中 `Symbol` 或 `WeakMap` 来实现：    

**方法2：使用 ES6 的 Symbol 基本数据类型实现**   
知识点复习：[ES6 中的 Symbol 介绍](http://es6.ruanyifeng.com/#docs/symbol)    
```js
const _items = Symbol()
class Stack {
    constructor (){
        this[_items] = []
    }
    push (element){
        this[_items].push(element)
    }
    // 剩下方法和第一种实现的差不多，这里省略
    // 只要把前面方法中的 this.items 更改为 this[_items]
}
```

**方法3：使用 ES6 的 WeakMap 实现**   
知识点复习：[ES6 中的 WeakMap 介绍](http://es6.ruanyifeng.com/#docs/set-map#WeakMap)    
```js
const items = new WeakMap()
class Stack {
    constructor (){
        items.set(this, [])
    }
    push (element){
        let item = items.get(this)
        item.push(element)
    }
    // 剩下方法和第一种实现的差不多，这里省略
    // 只要把前面方法中的获取 this.items 的方式，更改为 items.get(this) 获取
}
```

## 三、编写一个函数，实现十进制转二进制   
题目意思很简单，就是十进制转二进制，但是在实际工作开发中，我们更愿意实现的是任意进制转任意进制，不过呢，我们还是以解决问题为首要目标呀。   

当然，业务需求可以直接使用 `toString(2)` 方法，但是为了练习，咱还是不这么用咯。

**方法1：使用前面定义的 Stack 类**   
这里使用前面题目中定义的 `Stack` 类。   
```js
/**
 * 十进制转换为二进制
 * @param {Number} bit 
 */
function bitset (bit){
    if(bit == 0) return '0'
    if(!/^[0-9]+.?[0-9]*$/.test(bit)){
        return new Error('请输入正确的数值！')
    }

    let stack = new Stack(), result = ''
    while (bit > 0){
        stack.push(bit % 2)
        bit = Math.floor(bit / 2)
    }
    while (!stack.isEmpty()){
        result += stack.pop().toString()
    }
    return result

}
```

**方法2：简单实现**   
下面这个方法，其实不太好，因为没有怎么用到这次要练习的**栈**方法，哈哈。
```js
/**
 * 十进制转换为二进制
 * @param {Number} bit 
 */
function bitset (bit){
    if(bit == 0) return '0'
    if(!/^[0-9]+.?[0-9]*$/.test(bit)){
        return new Error('请输入正确的数值！')
    }

    let arr = []
    while(bit > 0){
        arr.push(bit % 2)
        bit = Math.floor(bit / 2)
    }
    return arr.reverse().join('')
}
```
另外可以参考：[wikiHow - 从十进制转换为二进制](https://zh.wikihow.com/%E4%BB%8E%E5%8D%81%E8%BF%9B%E5%88%B6%E8%BD%AC%E6%8D%A2%E4%B8%BA%E4%BA%8C%E8%BF%9B%E5%88%B6)。    


## 四、编写一个函数，实现检验圆括号顺序的有效性
主要目的就是：该函数接收一个**圆括号字符串**，判断里面的括号顺序是否有效，如果有效则返回 `true` 反之 `false`。   
如：   
* `(`   -> `false`
* `()`  -> `true`
* `(()` -> `false`
* `())` -> `false`
* `())` -> `false`
* `(((()()))())` -> `true`

这个题目实现的主要方法是：遍历字符串，先排除错误情况，然后将 `(` 入栈保存，将 `)` 入栈匹配前一个元素是否是 `(` ，如果是，则 `pop()` 前一个元素 `(`，如果不是，则 `push()` 这个 `)` 入栈，最终查看栈是否为空，若是则检验成功，否则失败。   

**方法1：使用前面定义的 Stack 类**   
这里使用前面题目中定义的 `Stack` 类。   
```js
/**
 * 检验圆括号顺序的有效性
 * @param {String} str 
 */
function validParentheses (str){
    if(!str || str.length === 0 || str[0] === ')') return false

    let stack = new Stack()
    str.split('').forEach(char => {
        let status = stack.peek() === '(' && char === ')'
        status ? stack.pop() : stack.push(char)
    })
    return stack.isEmpty()
}
```


**方法2：出入栈操作**   
```js
/**
 * 检验圆括号顺序的有效性
 * @param {String} str 
 */
function validParentheses (str){
    if(!str || str.length === 0 || str[0] === ')') return false

    let arr = []
    for(let i = 0; i < str.length ; i++){
        str[i] === '(' ? arr.push(str[i]) : arr.pop()
    }
    return arr.length === 0
}
```

## 五、改造题二，添加一个 min 函数来获得栈中最小元素

|步骤|数据栈|辅助栈|最小值|
|---|---|---|---|
|1.push 3|3|0|3|
|2.push 4|3, 4|0, 0|3|
|3.push 2|3, 4, 2|0, 0, 2|2|
|4.push 1|3, 4, 2 ,1|0, 0, 2, 3|1|
|5.pop	|3, 4, 2|0, 0, 2|2|
|6.pop	|3, 4|0, 0|3|
|7.push	|3, 4 ,0|0, 0, 2|0|

使用示例如下：
```js
let stack = new Stack();
stack.push(3);
console.log('After push 3, Min item is', stack.min());
stack.push(4);
console.log('After push 4, Min item is', stack.min());
stack.push(2);
console.log('After push 2, Min item is', stack.min());
stack.push(1);
console.log('After push 1, Min item is', stack.min());
stack.pop();
console.log('After pop, Min item is', stack.min());
stack.pop();
console.log('After pop, Min item is', stack.min());
stack.push(0);
console.log('After push 0, Min item is', stack.min());
```

**提示：利用辅助栈（Web 端可利用数组），每次对栈 push/pop 元素时，也同时更新辅助栈（存储最小元素的位置）**   

**方法1：小操作**   
```js
class Stack {
  constructor() {
    this.items = [];
    this.minIndexStack = [];
  }

  push(element) {
    this.items.push(element);
    let minLen = this.minIndexStack.length;
    let minItemIndex = this.minIndexStack[minLen - 1];
    if(minLen === 0 || this.items[minItemIndex] > item) {
      this.minIndexStack.push(this.items.length - 1);
    } else {
      this.minIndexStack.push(minItemIndex);
    }
  }

  pop() {
    this.minIndexStack.pop();
    return this.items.pop();
  }
  
  min() {
    let len = this.minIndexStack.length;
    return (len > 0 && this.items[this.minIndexStack[len - 1]]) || 0;
  }

  peek() {
    return this.items[this.items.length - 1];
  }
  
  // 省略其它方法
}
```


**方法2：与方法1中push实现的差异**   
```js
class Stack {
    constructor (){
        this.items = [] // 数据栈
        this.arr = []   // 辅助栈
    }
    push( element ){
        this.items.push(element)
        let min = Math.min(...this.items)
        this.arr.push( min === element ? this.size() - 1 : 0)
    }
    pop(){
        this.arr.pop()
        return this.items.pop()
    }
    peek(){
        return this.items[this.items.length - 1]
    }
    isEmpty(){
        return this.items.length === 1
    }
    clear(){
        this.items = []
    }
    size(){
        return this.items.length
    }
    min (){
        let last = this.arr[this.arr.length - 1]
        return this.items[last]
    }
}
```

## 下周预告
下周将练习**队列（Queue）** 的题目，开始翻起算法书籍学习咯。



|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|

## 微信公众号
![bg](http://images.pingan8787.com/2019_07_12guild_page.png)  