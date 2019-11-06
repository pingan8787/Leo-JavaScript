这是第四周的练习题，五一放假结束，该收拾好状态啦。    

下面是之前分享的链接：   
* 1.[每周一练 之 数据结构与算法（Stack）](https://juejin.im/post/5cb2df0c5188251aca7340a0)   
* 2.[每周一练 之 数据结构与算法（LinkedList）](https://juejin.im/post/5cbdbb1af265da036d79bb35)   
* 3.[每周一练 之 数据结构与算法（Queue）](https://juejin.im/post/5cc3cbaaf265da03a85ac7f8)   

> 欢迎关注我的 [个人主页](https://github.com/pingan8787) &&  [个人博客](http://www.pingan8787.com/) && [个人知识库](http://js.pingan8787.com/) && 微信公众号“前端自习课”


**本周练习内容：数据结构与算法 —— Set**   

这些都是数据结构与算法，一部分方法是团队其他成员实现的，一部分我自己做的，有什么其他实现方法或错误，欢迎各位大佬指点，感谢。   

## 一、集合是什么？与它相关数学概念有哪些   

---
解题：   
**1.集合定义：**    
**集合（Set）**是一种包含不同元素的数据结构。集合中的元素称为**成员**，集合最重要的两个特点：  
* 集合中的成员是无序；
* 集合中不存在相同成员；

即：无序且唯一。

**2.集合相关的数学概念：**  
集合的概念，如数学中一个由大于或等于0的整数组成的自然数集合， `N = { 0, 1, 2, ...}`。    
还有如**空集**，表示不包含任何元素的集合。    
并且也有并集，交集，差集等操作。    


## 二、请实现一个集合，并实现以下方法   

`add(value)`：向集合添加一个新的项。   
`delete(value)`：从集合移除一个值。   
`has(value)`：如果值在集合中，返回 true，否则返回 false。   
`clear()`：移除集合中的所有项。   
`size()`：返回集合所包含元素的数量。与数组的 length 属性类似。   
`values()`：返回一个包含集合中所有值的数组。   

---
解题：   
```js
class Sets {
    constructor(){
        this.items = {}
    }
    has(value){
        // return value in this.items
        return this.items.hasOwnProperty(value)
    }
    add(value){
        if(!this.has(value)) {
            this.items[value] = value
            return true
        }
        return false
    }
    delete(value){
        if(!this.has(value)){
            delete this.items[value]
            return true
        }
        return false
    }
    clear(){
        this.items = {}
    }
    size(){
        const values = this.values()
        return values.length
    }
    values(){
        return Object.keys(this.items)
    }
}
```

## 三、请实现集合的并集、交集、差集、子集操作   
* **并集（union）**：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。   
* **交集（intersection）**：对于给定的两个集合，返回一个包含两个集合中共用元素的新集合。   
* **差集（difference）**：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。   
* **子集（subset）**：验证一个给定集合是否是另一个集合的子集。   

---
解题：   
```js
/**
 * union 并集
 * @param {Object} otherSet 其他集合
 */
Sets.prototype.union = function(otherSet){
    let result = new Sets(),
        current = this.values(),
        other = otherSet.values()
    for(let i = 0; i < current.length; i++){
        result.add(current[i])
    }
    for(let i = 0; i < other.length; i++){
        result.add(other[i])
    }
    return result
}


/**
 * intersection 交集
 * @param {Object} otherSet 其他集合
 */
Sets.prototype.intersection = function(otherSet){
    let result = new Sets(),
        current = this.values()
    for(let i = 0; i < current.length; i++){
        if(otherSet.has(current[i])){
            result.add(current[i])
        }
    }
    return result
}


/**
 * difference 差集
 * @param {Object} otherSet 其他集合
 */
Sets.prototype.difference = function(otherSet){
    let result = new Sets(),
        current = this.values()
    for(let i = 0; i < current.length; i++){
        if(!otherSet.has(current[i])){
            result.add(current[i])
        }
    }
    return result
}



/**
 * subset 子集
 * @param {Object} otherSet 其他集合
 */
Sets.prototype.subset = function(otherSet){
    let result = new Sets(),
        current = this.values()

    if(this.size() > otherSet.size()) return false
    for(let i = 0; i < current.length; i++){
        if(!otherSet.has(current[i])){
            return false
        }
    }
    return true
}
```

## 四、给定两个数组，编写一个 intersection() 函数来计算它们的交集   


使用示例如下：
```js
const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2];
const nums3 = [4, 9, 5];
const nums4 = [9, 4, 9, 8, 4];

intersection(nums1, nums2); // [2]
intersection(nums3, nums4); // [9, 4]
```

**提示：输出结果中的每个元素是唯一的，可以不考虑输出结果的顺序。**   

---
解题：   
```js
function intersection(arr1, arr2){
    if(!Array.isArray(arr1) || !Array.isArray(arr2)) return []
    let create = function(arr){
        let sets = new Sets()
        arr.map(item => sets.add(item))
        return sets
    }
    let Sets1 = create(arr1)
    let Sets2 = create(arr2)
    let result = Sets1.intersection(Sets2)
    return  result.values()
}
```

## 五、给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集      

使用示例如下：
```js
const nums = [1, 2, 3];
subsets(nums);
// 输出以下结果：
[
  [3],
  [1],
  [2],
  [1, 2, 3],
  [1, 3],
  [2, 3],
  [1, 2],
  []
]
```
来源：[leetcode 78.集合](https://leetcode-cn.com/problems/subsets/)   

---
解题：   

**目前网络上的最优解：**   
```js
function subsets(nums){
    if(!nums || !Array.isArray(nums)) return []
    
    function diff (num, vec) {
        let tmp = vec.slice(0)
        result.push(tmp)
        for (let i = num; i < len; i++) {
            vec.push(nums[i])
            diff(i + 1, vec)
            vec.splice(-1)
        }
    }

    const len = nums.length
    let arr = [], result = []
    diff(0, arr)
    return result
}
```

**穷举法：**   
```js
function subsets(nums){
    if(!nums || !Array.isArray(nums)) return []

    let result = [[]],
        len = nums.length
    if(len === 0) return result 
    for(let i = 0; i < len; i++){
        let l = result.length
        let num = nums[i]
        let array = [num]
        for(let j = 0; j < l; j++){
            let tmparray = result[j].concat(array)
            result.push(tmparray)
        }
    }
    return result
}
```

## 下周预告
下周将练习**Dictionary 和 HashTable** 的题目。

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|

## 微信公众号
![bg](http://images.pingan8787.com/2019_07_12guild_page.png)  