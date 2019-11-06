![封面](https://user-gold-cdn.xitu.io/2019/4/27/16a5cd3f25400f0f?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1)

这是第二周的练习题，这里补充下咯，五一节马上就要到了，自己的计划先安排上了，开发一个有趣的玩意儿。    

下面是之前分享的链接：   
* 1.[每周一练 之 数据结构与算法（Stack）](https://juejin.im/post/5cb2df0c5188251aca7340a0)   
* 2.[每周一练 之 数据结构与算法（LinkedList）](https://juejin.im/post/5cbdbb1af265da036d79bb35)   

> 欢迎关注我的 [个人主页](https://github.com/pingan8787) &&  [个人博客](http://www.pingan8787.com/) && [个人知识库](http://js.pingan8787.com/) && 微信公众号“前端自习课”


**本周练习内容：数据结构与算法 —— Queue**   

这些都是数据结构与算法，一部分方法是团队其他成员实现的，一部分我自己做的，有什么其他实现方法或错误，欢迎各位大佬指点，感谢。   


## 一、队列有什么特点，生活中有什么例子?

----
解题：  
**1.概念介绍**   
> 队列，又称为伫列（queue），是先进先出（FIFO, First-In-First-Out）的线性表。在具体应用中通常用链表或者数组来实现。队列只允许在后端（称为rear）进行插入操作，在前端（称为front）进行删除操作。  ——《维基百科》

队列特点：**先进先出**操作。   
生活中的案例：常见的排队，在电影院也好，排队结账也是，排在第一位的人会先接受服务。     

**2.与堆栈区别**    
队列的操作方式和堆栈类似，唯一的区别在于**队列只允许新数据在后端进行添加。**


## 二、请实现一个队列，并实现以下方法：

* `enqueue(element)`：向队列尾部添加一个新的项。  
* `dequeue()`：移除队列的第一项，并返回被移除的元素。  
* `front()`：返回队列中第一个元素 —— 最先被添加，也将是最先被移除的元素。队列不做任何变动 (不移除元素，只返回元素信息 —— 与 `Stack` 类的 `peek` 方法类似)。  
* `tail()`：返回队列中的最后一个元素，队列不做任何变动。  
* `isEmpty()`：如果栈没有任何元素就返回 `true`，否则返回 `false`。  
* `size()`：返回队列包含的的元素个数，与数组的 `length` 属性类似。  
* `print()`：打印队列中的元素。  


**提示：Web 端优先使用 ES6 以上的语法实现。**   

----
解题：  

```js
 /**
  * 2. 实现一个队列
  */
class Queue {
    constructor (){
        this.items = []
    }
    // enqueue(element)：向队列尾部添加一个新的项。
    enqueue( element ){
        this.items.push(element)
    }
    // dequeue()：移除队列的第一项，并返回被移除的元素。
    dequeue (){
        return this.items.shift() 
    }
    // front()：返回队列中第一个元素 —— 最先被添加，也将是最先被移除的元素。队列不做任何变动 (不移除元素，只返回元素信息 —— 与 Stack 类的 peek 方法类似)。
    front (){
        return this.items[0]
    }
    // tail()：返回队列中的最后一个元素，队列不做任何变动。
    tail (){
        return this.items[this.items.length-1]
    }
    // isEmpty()：如果栈没有任何元素就返回 true，否则返回 false。
    isEmpty (){
        return this.items.length === 0
    }
    // size()：返回队列包含的的元素个数，与数组的 length 属性类似。
    size (){
        return this.items.length
    }
    // print()：打印队列中的元素。
    print (){
        console.log(this.items.toString())
    }
}
```


## 三、使用队列计算斐波那契数列的第 n 项。

斐波那契数列（Fibonacci sequence），又称黄金分割数列、因数学家列昂纳多·斐波那契（Leonardoda Fibonacci）以兔子繁殖为例子而引入，故又称为“兔子数列”，指的是这样一个数列：    
```
1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233，377，610...
```

在数学上，斐波那契数列以如下被以递推的方法定义：**F(1)=1，F(2)=1, F(n)=F(n-1)+F(n-2)（n>=3，n∈N*）**，即**前两项固定为 1**，**后面的项为前两项之和**，依次向后。在现代物理、准晶体结构、化学等领域，斐波纳契数列都有直接的应用。    

使用示例如下：
```js
fibonacci(5); --> 5
fibonacci(9); --> 34
fibonacci(14); --> 377
```

---
解题：   

**解题方法1：**   
```js
/**
 * 3. 使用队列计算斐波那契数列的第 n 项。
 * 前两项固定为 1，后面的项为前两项之和，依次向后。
 * @param {Number} num 
 */

function fibonacci (num){
    if(isNaN(num) || num < 0 || num === 0) return 0
    // // 1. 直接
    // let n1 = 1, n2 = 1, sum
    // for(let i = 3; i <= num; i++){
    //     sum = n1 + n2
    //     n1 = n2
    //     n2 = sum
    // }
    // // 2. 队列 考虑小于等于2
    // let arr = [], sum
    // num === 1 && (arr = [1])
    // num >= 2 && (arr = [1, 1])
    // for(let i = 3; i <= num; i ++){
    //     sum = arr[i-2] + arr[i-3]
    //     arr.push(sum)
    // }
    // // 3.队列 进出队列
    let queue = [], sum;
    for(let i = 1; i <= num; i ++){
        if(i <=2 ){
            queue.push(1)
        }else{
            sum = queue[0] + queue[1]
            queue.push(sum)
            queue.shift()
        }
    }
    return sum
}
```

**解题方法2：**   
```js
function fibonacci(n) {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(1);
    
    let index = 0;
    while(index < n - 2) {
        index += 1;
        // 出队列一个元素
        const delItem = queue.dequeue();
        // 获取头部值
        const headItem = queue.front();
        const nextItem = delItem + headItem;
        queue.enqueue(nextItem);
    }
    return queue.tail();  
}
console.log(fibonacci(9)); // 34
```


## 四、实现优先队列 PriorityQueue。

现实中优先队列的例子很多，比如机场登机的顺序，头等舱和商务舱乘客优先级高于经济舱乘客。又如在银行中办理业务时，VIP 客户的优先级高于普通客户。要实现一个优先队列，有两种方式：

1. 设置优先级，然后在正确的位置添加元素。   
2. 用入列操作添加元素，然后按照优先级移除它们。  


**本题要求使用第一种方式来实现优先队列，数值越小优先级越高，若优先级相同时，先入队的元素，排在前面。**

使用示例如下：
```js
let priorityQueue = new PriorityQueue();
priorityQueue.enqueue("leo", 2);
priorityQueue.enqueue("pingan", 1);
priorityQueue.enqueue("robin", 1);
priorityQueue.print();
// pingan - 1
// robin - 1
// leo - 2
```

---
解题：   

**解题方法1：**   
```js
class PriorityQueue {
  constructor() {
    this._items = [];
  }
  
  enqueue(element, priority) {
        let queueElement = {
            element
            priority
        };

      if (this.isEmpty()) {
        this._items.push(queueElement);
      } else {
        let added = false;
        for (var i = 0; i < this.size(); i++) {
          if (queueElement.priority < this._items[i].priority) {
            this.items.splice(i, 0, queueElement);
            added = true;
            break ;
          }
        }
    
        if (!added) {
          this._items.push(queueElement);
        }
      }
  }

  print() {
      var strArr = [];
      strArr = this._items.map(function (item) {
        return `${item.element}->${item.priority}`;
      });
    
      console.log(strArr.toString()); 
      }
}
```

**解题方法2：**   
```js
/**
 * 4. 实现优先队列
 */

class PriorityQueue {
    constructor (){
        this.items = []
    }
    enqueue (element, priority){
        let ele = {element, priority}
        let isAdded = false
        for(let i = 0; i < this.items.length; i++){
            if(ele.priority < this.items[i].priority){
                this.items.splice(i, 0, ele)
                isAdded = true
                break
            }
        }
        !isAdded && this.items.push(ele)
    }
    print (){
        for(let i = 0; i < this.items.length; i++){
            let {element, priority} = this.items[i]
            console.log(`${element} - ${priority}`)
        }
    }
}
let leo = new PriorityQueue()
leo.enqueue("leo", 2);
leo.enqueue("leo1", 1);
leo.enqueue("leo2", 1);
console.log(leo)
```

## 五、用队列实现栈。

利用两个队列实现栈，栈的特点是后进先出，可以让元素入队 `q1`，留下队尾元素让其他元素出队，暂存到 `q2` 中，再让 `q1` 中剩下的元素出队，即最后进的最先出来。    


**提示：入栈和出栈都在 q1 中完成，q2 只作为临时中转空间。**

---
解题：   
```js
/**
 * 5. 队列实现栈
 */
class Myqueue {
    constructor (){
        this.items = []
    }
    enqueue (element){
        this.items.push(element)
    }
    dequeue (){
        return this.items.shift()
    }
}
class Mystack {
    constructor (){
        this.q1 = new myQueue()
        this.q2 = new myQueue()
    }
    push (element){
        this.q1.enqueue(element)
        this.q2.items = []
        let len = this.q1.items.length
        while(len > 0){
            this.q2.enqueue(this.q1.items[len-1])
            len --
        }
    }
    pop (){
        let result = this.q2.dequeue()
        let len = this.q2.items.length
        this.q1.items = []
        while(len > 0){
            this.q1.enqueue(this.q2.items[len-1])
            len --
        }
        return result
    }
    print (){
        console.log(this.q1.items.toString())
    }
}
```

**这里也可以直接使用第二题定义的Queue来实现：**   
```js
class QueueStack {
  constructor() {
    this.queue = new Queue();
  }

  push(item) {
    this.queue.enqueue(item);
  }

  pop() {
    // 向队列末尾追加 队列长度-1 次，后弹出队列头部
    for(let i = 1; i < this.queue.size(); i += 1) {
      this.queue.enqueue(this.queue.dequeue());
    }
    return this.queue.dequeue();
  }

  peek() {
    return this.queue.tail();
  }
}
```

## 下周预告
下周将练习**集合（Set）** 的题目，五一要到咯，也要好好做自己一个项目了。

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|

## 微信公众号
![bg](http://images.pingan8787.com/2019_07_12guild_page.png)  