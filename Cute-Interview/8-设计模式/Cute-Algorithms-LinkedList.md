这是第三周的练习题，原本应该先发第二周的，因为周末的时候，我的母亲大人来看望她的宝贝儿子，哈哈，我得带她看看厦门这座美丽的城市呀。    

这两天我抓紧整理下第二周的题目和答案，下面我把之前的也列出来：     
* 1.[每周一练 之 数据结构与算法（Stack）](https://juejin.im/post/5cb2df0c5188251aca7340a0)   

> 欢迎关注我的 [个人主页](https://github.com/pingan8787) &&  [个人博客](http://www.pingan8787.com/) && [个人知识库](http://js.pingan8787.com/) && 微信公众号“前端自习课”



**本周练习内容：数据结构与算法 —— LinkedList**   

这些都是数据结构与算法，一部分方法是团队其他成员实现的，一部分我自己做的，有什么其他实现方法或错误，欢迎各位大佬指点，感谢。   


## 一、链表是什么？与数组有什么区别？生活中有什么案例？
----
解析：   
概念参考阅读 [链表 —— 维基百科](https://zh.wikipedia.org/wiki/%E9%93%BE%E8%A1%A8)  

**1.概念：**   

链表（Linked list）是一种上一个元素的引用指向下一个元素的存储结构，链表通过指针来连接元素与元素；   

链表是线性表的一种，所谓的线性表包含顺序线性表和链表，顺序线性表是用数组实现的，在内存中有顺序排列，通过改变数组大小实现。而链表不是用顺序实现的，用指针实现，在内存中不连续。意思就是说，链表就是**将一系列不连续的内存联系起来**，将那种碎片内存进行合理的利用，解决空间的问题。     

所以，链表允许插入和删除表上任意位置上的节点，但是不允许随即存取。链表有很多种不同的类型：**单向链表**、**双向链表**及**循环链表**。   

**2.与数组的区别：**   
* 相同：   
两种结构均**可实现数据的顺序存储**，构造出来的模型呈**线性结构**。   

* 不同：   
链表是**链式的存储结构**；数组是**顺序的存储结构**。   
链表通过**指针**来连接元素与元素，数组则是把所有元素按**次序**依次存储。 

链表的插入删除元素相对数组较为简单，不需要移动元素，且较为容易实现长度扩充，但是寻找某个元素较为困难。   

数组寻找某个元素较为简单，但插入与删除比较复杂，由于最大长度需要再编程一开始时指定，故当达到最大长度时，扩充长度不如链表方便。   
   

**数组和链表一些操作的时间复杂度对比：**   
数组：   
* 查找复杂度：O(1)   
* 添加/删除复杂度：O(n)   

链表：   
* 查找复杂度：O(n)  
* 添加/删除复杂度：O(1)   

**3.生活中的案例：**   
火车，是由一些列车厢连接起来；   
寻宝游戏，每个线索都是下一个线索地点的指针。   

## 二、请实现一个链表，并实现以下方法
* `append(element)`：向列表尾部添加一个新的元素。   
* `insert(position, element)`：向列表指定位置插入一个新的元素。   
* `remove(element)`：从列表中移除并返回特定元素（若有多个相同元素则取第一次出现的情况）。   
* `indexOf(element)`：返回元素在列表的索引（若有多个相同元素则取第一次出现的情况），如果列表中没有该元素则返回 `-1`。
* `removeAt(position)`：从列表中，移除并返回特定位置的一项。   
* `isEmpty()`：如果列表不含任何元素，返回 `true`，否则返回 `false`。  
* `size()`：返回列表中元素个数，与数组的 `length` 属性类似。
* `toString()`：由于列表项使用 `Node` 类，需要重写继承自 JavaScript 对象默认的 `toString()` 方法，让其只输出元素的值。   
**提示：Web 端优先使用 ES6 以上的语法实现。**   

----
解析：   

```js
class Node {
    constructor(element){
        this.element = element
        this.next = null
    }
}
class LinkedList {
    constructor(){
        this.length = 0
        this.head = null
    }
    /**
     * 添加元素（末尾添加）
     * @param {*} element 添加的元素
     */
    append(element){
        let node = new Node(element)
        if(!this.head){
            this.head = node
        }else{
            let current = this.head
            // 查找最后一项
            while(current.next){
                current = current.next
            }
            // 将最后一下的next赋值为node，实现追加元素
            current.next = node
        }
        this.length ++
    }
    /**
     * 添加元素（指定位置）
     * @param {Number} position 添加的位置
     * @param {*} element  添加的元素
     */
    insert(position, element){
        if(position >= 0 && position <= this.length){
            let node = new Node(element),
                index = 0,
                previous = null
            if(position === 0){
                node.next = this.head
                this.head = node
            }else{
                let current = this.head
                while(index++ < position){
                    previous = current
                    current = current.next
                }
                previous.next = node
                node.next = current
            }
            this.length ++
        }
    }
    /**
     * 删除元素
     * @param {*} element 删除的元素
     * @return {*}  被删除的元素
     */
    remove(element){
        let current = this.head,
            previous = null
        if(element === this.head.element){
            this.head = current.next
        }else{
            while(current.next && current.element !== element){
                previous = current
                current = current.next
            }
            previous.next = current.next
            this.length --
            return current.element
        }
    }
    /**
     * 删除元素（指定位置）
     * @param {Number} position 删除元素的位置
     * @return {*}  被删除的元素
     */
    removeAt(position){
        if(position >= 0 && position <= this.length){
            let current = this.head,
                index = 0,
                previous = null
            if(position === 0){ // 删除第一项
                this.head = current.next
            }else{
                while(index++ < position){
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }
            this.length --
            return current.element
        }
    }
    /**
     * 查找指定元素的位置
     * @param {*} element 查找的元素
     * @return {Number} 查找的元素的下标
     */
    indexOf(element){
        let current = this.head, 
            index = 0
        while(current.next && current.element !== element){
            current = current.next
            index ++
        }
        return index === 0 ? -1 : index
    }
    /**
     * 链表是否为空
     * @return {Boolean}
     */
    isEmpty(){
        return this.length === 0
    }
    /**
     * 链表的长度
     * @return {Number}
     */
    size(){
        return this.length
    }
    /**
     * 将链表转成字符串
     * @return {String}
     */
    toString(){
        let current = this.head,
            arr = new Array()
        while(current.next){
            arr.push(current.element)
            current = current.next
        }
        arr.push(current.element)
        return arr.toString()
    }
}

let leo = new LinkedList()
leo.append(3)
leo.append(6)
leo.append(9)
console.log(leo.length)
console.log(leo.head)
leo.remove(6)
console.log(leo.length)
console.log(leo.head)
console.log(leo.toString())
```

## 三、实现反转链表
用链表的方式，输出一个反转后的单链表。    

示例:   
```js
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
// input
let head = {
    'val': 1,'next': {
        'val': 2,'next': {
            'val': 3,'next': {
                'val': 4,'next': {
                    'val': 5,
                    'next': null
                }
            }
        }
    }
};
reverseList(head)

// output
head = {
    'val': 5,'next': {
        'val': 4,'next': {
            'val': 3,'next': {
                'val': 2,'next': {
                    'val': 1,
                    'next': null
                }
            }
        }
    }
};
```

**解题思路1.使用迭代：**   
在遍历列表时，将当前节点的 `next` 指针改为**指向前一个元素**。由于节点没有引用其上一个节点，因此必须**先存储其前一个元素**。在更改引用之前，还需要另一个指针来存储下一个节点。**不要忘记在最后返回新的头引用**！

**解题思路2.使用递归：**   
通过递归修改 `head.next.next` 和 `head.next` 指针来实现。   


----
解析：   
题目出自：[Leetcode 206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

介绍两种常用方法：

**1.使用迭代：**   
在遍历列表时，将当前节点的 `next` 指针改为**指向前一个元素**。由于节点没有引用其上一个节点，因此必须**先存储其前一个元素**。在更改引用之前，还需要另一个指针来存储下一个节点。**不要忘记在最后返回新的头引用**！
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let reverseList = function(head) {
    let pre = null, curr = head
    while (curr) {
        next = curr.next
        curr.next = pre
        pre = curr
        curr = next
    }
    return pre
};
```
**复杂度分析**    

**时间复杂度**：`O(n)`。 假设 `n` 是列表的长度，时间复杂度是 `O(n)`。    
**空间复杂度**：`O(1)`。    


**2.使用递归：**  

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let reverseList = function(head) {
    if(head == null || head.next == null) return head
    let pre = reverseList(head.next)
    head.next.next = head
    head.next = null
    return pre
};
```
**复杂度分析**

**时间复杂度**：`O(n)`。 假设 `n` 是列表的长度，那么时间复杂度为 `O(n)`。   
**空间复杂度**：`O(n)`。 由于使用递归，将会使用隐式栈空间。递归深度可能会达到 `n` 层。    


## 四、判断链表是否有环
设计一个函数 `hasCycle`，接收一个链表作为参数，判断链表中是否有环。   
为了表示给定链表中的环，我们使用整数 `pos` 来表示**链表尾**连接到**链表中的位置**（索引从 `0` 开始）。 如果 `pos` 是 `-1`，则在该链表中没有环。    

![linkedlist-cycle](http://images.pingan8787.com/linkedlist-cycle.png)

需要注意的是，不可能存在多个环，最多只有一个。  

**示例 1：**   
```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```
![示例 1](http://images.pingan8787.com/20190702add1.png)

**示例 2：**   
```
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```
![示例 2](http://images.pingan8787.com/20190702add2.png)

**示例 3：**   
```
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```
![示例 3](http://images.pingan8787.com/20190702add3.png)



**解题思路1.判断是否有 null：**   
一直遍历下去，如果遍历到 `null` 则表示没有环，否则有环，但是考虑到性能问题，最好给定一段时间作为限制，超过时间就不要继续遍历。   

**解题思路2.标记法：**   
也是要遍历每个节点，并在遍历的节点添加标记，如果后面遍历过程中，遇到有这个标记的节点，即表示有环，反之没有环。   

**解题思路3.使用双指针（龟兔赛跑式）：**   
设置2个指针，一个 `快指针` 每次走 2 步，`慢指针` 每次走 1 步，如果没有环的情况，最后这两个指针不会相遇，如果有环，会相遇。   

----
解析：   
题目出自：[Leetcode 141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

**1.断是否有 null**
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
let hasCycle = function(head) {
    while(head){
        if(head.value == null) return true
        head.value = null
        head = head.next
    }
    return false
}
```

**2.标记法**   
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
let hasCycle = function(head) {
    let node = head
    while(node){
        if(node.isVisit){
            return true
        }else{
            node.isVisit = true
        }
        node = node.next
    }
    return false
};
```

**3.使用双指针**   
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
let hasCycle = function(head) {
    if(head == null || head.next == null) return false
    let slow = head, fast = head.next
    while(slow != fast){
        if(fast == null || fast.next == null) return false
        slow = slow.next  // 慢指针每次走1步
        fast = fast.next.next // 快指针每次走1补
    }
    return true
};
```


## 五、实现两两交换链表中的节点
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。   

**你不能只是单纯的改变节点内部的值**，而是需要实际的进行节点交换。    
 
**示例:**   
```
给定 1->2->3->4, 你应该返回 2->1->4->3.
给定 1->2->3->4->5, 你应该返回 2->1->4->3->5.
```

**解题思路1.使用迭代：**   
和**反转链表**类似，关键在于有三个指针，分别指向前后和当前节点，而不同在于两两交换后，移动节点的步长为2，需要注意。   

**解题思路2.使用递归：**   
这里也可以使用递归，也可以参考**反转链表**的问题，终止条件是递归到链表为空，或者只剩下一个元素没得交换了，才终止。   

----
解析：   
题目出自：[Leetcode 24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

介绍两种常用方法：

**1.使用迭代：**   
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let swapPairs = function (head){
    if(!head) return null
    let arr = []
    while(head){
        let next = head.next
        head.next = null
        arr.push(head)
        head = next
    }

    for(let i = 0; i < arr.length; i += 2){
        let [a, b] = [arr[i], arr[i + 1]]
        if(!b) continue
        [arr[i], arr[i + 1]] = [b, a]
    }

    for(let i = 0; i < arr.length - 1; i ++){
        arr[i].next = arr[i + 1]
    }
    return arr[0]
}
```

**2.使用递归：**   
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

let swapPairs = function (head){
    if(head == null || head.next ==null) return head
    let next = head.next
    head.next = swapPairs(next.next)
    next.next = head
    return next
}
```


|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|

## 微信公众号
![bg](http://images.pingan8787.com/2019_07_12guild_page.png)  