![封面](https://user-gold-cdn.xitu.io/2019/4/27/16a5cd3f25400f0f?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1)

这是第五周的练习题，上周忘记发啦，这周是复习 **Dictionary 和 HashTable**。    

下面是之前分享的链接：   
* 1.[每周一练 之 数据结构与算法（Stack）](https://juejin.im/post/5cb2df0c5188251aca7340a0)   
* 2.[每周一练 之 数据结构与算法（LinkedList）](https://juejin.im/post/5cbdbb1af265da036d79bb35)   
* 3.[每周一练 之 数据结构与算法（Queue）](https://juejin.im/post/5cc3cbaaf265da03a85ac7f8)   
* 4.[每周一练 之 数据结构与算法（Set）](https://juejin.im/post/5cceee526fb9a0323a01c72e)   

> 欢迎关注我的 [个人主页](https://github.com/pingan8787) &&  [个人博客](http://www.pingan8787.com/) && [个人知识库](http://js.pingan8787.com/) && 微信公众号“前端自习课”


**本周练习内容：数据结构与算法 —— Dictionary 和 HashTable**   

这些都是数据结构与算法，一部分方法是团队其他成员实现的，一部分我自己做的，有什么其他实现方法或错误，欢迎各位大佬指点，感谢。   


## 一、字典和散列表的概念

1. 字典是什么？

2. 字典和集合有什么异同？

3. 什么是散列表和散列函数？

4. 散列表的特点是什么？

---
解析：   

1. 字典是什么？    

字典是一种以 **键-值对** 形式存储数据的数据格式，其中键名用来查询特定元素。

2. 字典和集合有什么异同？

相同：都是用来存储不同元素的数据格式；   
区别：集合是以 **值-值** 的数据格式存储，而字典是以 **键-值** 的数据格式存储。   

3. 什么是散列表和散列函数？

哈希表（`Hash table`，也叫散列表），是根据关键码值(·Key value·)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做**散列函数**，存放记录的数组叫做**散列表**。   

4. 散列表的特点是什么？

特点：数组和链接优点的结合，查询速度非常的快，几乎是O(1)的时间复杂度，并且插入和删除也容易。


## 二、请实现一个字典

`set(key,value)`：向字典中添加新元素。   
`delete(key)`：通过使用键值从字典中移除键值对应的值。   
`has(key)`：如果某个键值存在于这个字典中，则返回 true，否则返回 false。   
`get(key)`：使用键值查找对应的值并返回。   
`clear()`：删除字典中的所有元素。   
`size()`：返回字典包含的元素数量，与数组的 length 属性类似。   
`keys()`：将字典的所有键名以数组的形式返回。   
`values()`：将字典包含的所有数值以数组形式返回。   


使用示例：    

```js
let dictionary = new Dictionary();

dictionary.set("Gandalf", "gandalf@email.com");
dictionary.set("John", "johnsnow@email.com");
dictionary.set("Tyrion", "tyrion@email.com");

console.log(dictionary.has("Gandalf"));
console.log(dictionary.size());

console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get("Tyrion"));

dictionary.delete("John");

console.log(dictionary.keys());
console.log(dictionary.values());

```

**提示：Web 端优先使用 ES6 以上的语法实现。**   

---
解析：   
```js
// 二、请实现一个字典
class Dictionary {
    constructor(){
        this.items = []
    }
    /**
     * 向字典中添加新元素
     * @param {*} key 添加的键名
     * @param {*} value 添加的值
     */
    set (key, value) {
        if ( !key ) return new Error('请指定插入的key')
        this.items[key] = value
    }

    /**
     * 查询某个键值存在于这个字典
     * @param {*} key 查询的键名
     * @return {Boolean} 是否存在
     */
    has (key) {
        return key in this.items 
    }

    /**
     * 通过使用键值从字典中移除键值对应的值
     * @param {*} key 移除的键名
     * @return {Boolean} 是否移除成功
     */
    delete (key) {
        if(!key || !this.has(key)) return false
        delete this.items[key]
        return true
    }

    /**
     * 使用键值查找对应的值并返回
     * @param {*} key 查找的键名
     * @return {*} 查找的结果
     */
    get (key) {
        return this.has(key) ? this.items[key] : undefined
    }

    /**
     * 删除字典中的所有元素
     */
    clear () {
        this.items = {}
    }

    /**
     * 将字典的所有键名以数组的形式返回
     * @return {Array} 所有键名的数组
     */
    keys () {
        return Object.keys(this.items)
    }

    /**
     * 将字典的所有键值以数组的形式返回
     * @return {Array} 所有键值的数组
     */
    values () {
        let result = []
        for(let k in this.items){
            if(this.has[k]){
                result.push(this.items[k])
            }
        }
        return result
    }

    /**
     * 返回字典包含的元素数量
     * @return {Number} 元素数量
     */
    size () {
        const values = this.values()
        return values.length
    }
}
```

## 三、请实现一个散列表

`put(key,value)`：向散列表增加/更新一个新的项。   
`remove(key)`：根据键值从散列表中移除值。   
`get(key)`：根据键值检索到特定的值。   
`print()`：打印散列表中已保存的值。   


散列表内部的散列算法：

```js
function hashCode(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
}
```

使用示例：

```js
const hashTable = new HashTable();

hashTable.put("Gandalf", "gandalf@email.com");
hashTable.put("John", "johnsnow@email.com");
hashTable.put("Tyrion", "tyrion@email.com");
hashTable.print();
```

---
解析：   
```js
// 三、请实现一个散列表
class HashTable {
    constructor(){
        this.table = []
    }
    /**
     * 散列函数
     * @param {*} key 键名
     */
    hashCode(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
          hash += key.charCodeAt(i);
        }
        return hash % 37;
    }
    /**
     * 向散列表增加/更新一个新的项
     * @param {*} key 添加的键名
     * @param {*} value 添加的值
     */
    put (key, value) {
        let position = this.hashCode(key)
        this.table[position] = value
    }

    /**
     * 根据键值从散列表中移除值
     * @param {*} key 移除的键名
     * @return {Boolean} 是否成功移除
     */
    remove (key) {
        if ( !key ) return false
        let position = this.hashCode(key)
        this.table[position] = undefined
        return true
    }

    /**
     * 根据键值检索到特定的值
     * @param {*} key 查找的键名
     * @return {*} 查找的值
     */
    get (key) {
        let position = this.hashCode(key)
        return this.table[position]
    }

    /**
     * 打印散列表中已保存的值
     * @return {*} 散列表的值
     */
    print () {
        return this.table
    }
}
```

## 四、请利用之前已实现的链表，实现一个分离链接的散列表

分离链接是为散列表的每一个位置创建一个链表储存元素的方式来处理散列表中的冲突：

![separate-chaining.png](https://cdn.nlark.com/yuque/0/2019/png/102778/1556970090828-8bc73588-76b8-49c3-b39e-34928db5c5ae.png)


请实现新的散列表方法：

`put(key,value)`：将 `key 和 `value` 存在一个 `ValuePair` 对象中（即可定义一个包含 `key` 和 `value` 属性的 `ValuePair` 类），并将其加入对应位置的链表中。   

`get(key)`：返回键值对应的值，没有则返回 `undefined`。  

`remove(key)`：从散列表中移除键值对应的元素。  

`print()`：打印散列表中已保存的值。   


**提示：先找到元素储存位置所对应的链表，再找到对应的值。**   

```js
const hashTable = new HashTable();

hashTable.put("Gandalf", "gandalf@email.com");
hashTable.put("Tyrion", "tyrion@email.com");
hashTable.put("Aaron", "aaron@email.com");
hashTable.put("Ana", "ana@email.com");
hashTable.put("Mindy", "mindy@email.com");
hashTable.put("Paul", "paul@email.com");

hashTable.print();

console.log(hashTable.get("Tyrion"));
console.log(hashTable.get("Aaron"));

hashTable.remove("Tyrion");

hashTable.print();
```

---
解析：   
```js
// 链表的实现代码省略 可以查看之前的代码
let ValuePair = function (key, value){
    this.key = key
    this.value = value
    this.toString = function(){
        return `[${this.key} - ${this.value}]`
    }
}
class HashTable {
    constructor(){
        this.table = []
    }
    /**
     * 散列函数
     * @param {*} key 键名
     */
    hashCode(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
          hash += key.charCodeAt(i);
        }
        return hash % 37;
    }
    /**
     * 向散列表增加/更新一个新的项
     * @param {*} key 添加的键名
     * @param {*} value 添加的值
     */
    put (key, value) {
        let position = this.hashCode(key)
        if(this.table[position] == undefined){
            this.table[position] = new LinkedList()
        }
        this.table[position].append(new ValuePair(key, value))
    }

    /**
     * 根据键值从散列表中移除值
     * @param {*} key 移除的键名
     * @return {Boolean} 是否成功移除
     */
    remove (key) {
        let position = this.hashCode(key)
        if ( !key || this.table[position] === undefined ) return false
        let current = this.table[position].getHead()
        while(current.next){
            if(current.element.key === key){
                this.table[position].remove(current.element)
                if(this.table[position].isEmpty){
                    this.table[position] = undefined
                }
                return true
            }
            current = current.next
        }
    }

    /**
     * 根据键值检索到特定的值
     * @param {*} key 查找的键名
     * @return {*} 查找的值
     */
    get (key) {
        let position = this.hashCode(key)
        if(!key || this.table[position] === undefined) return undefined
        let current = this.table[position].getHead()
        while(current.next()){
            if(current.element.key === key){
                return current.element.value
            }
            current = current.next
        }
    }

    /**
     * 打印散列表中已保存的值
     * @return {*} 散列表的值
     */
    print () {
        return this.table
    }
}

```


## 五、实现一个线性探查的散列表


线性探查是解决散列表中冲突的另一种方法，当向表中某一个位置加入新元素的时候，如果索引为 `index` 的位置已经被占据了，就尝试 `index+1` 的位置。如果 `index+1` 的位置也被占据，就尝试 `index+2`，以此类推。

![separate-chaining.png](https://cdn.nlark.com/yuque/0/2019/png/102778/1556970188250-d9f8542a-5084-42e7-8bc7-ac57f52e537b.png)



请实现散列表：   

`put(key,value)`：将 `key` 和 `value` 存在一个 `ValuePair` 对象中（即可定义一个包含 `key` 和 `value` 属性的 `ValuePair` 类）并分配到散列表。    

`get(key)`：返回键值对应的值，没有则返回 `undefined`。   

`remove(key)`：从散列表中移除键值对应的元素。   


**提示：移除一个元素，只需要将其赋值为 undefined。**   


使用示例：
```js
const hashTable = new HashTable();

hashTable.put("Gandalf", "gandalf@email.com");
hashTable.put("Tyrion", "tyrion@email.com");
hashTable.put("Aaron", "aaron@email.com");
hashTable.put("Ana", "ana@email.com");
hashTable.put("Mindy", "mindy@email.com");
hashTable.put("Paul", "paul@email.com");

hashTable.print();

console.log(hashTable.get("Tyrion"));
console.log(hashTable.get("Aaron"));

hashTable.remove("Tyrion");

hashTable.print();
```
---
解析：   
```js
let ValuePair = function (key, value){
    this.key = key
    this.value = value
    this.toString = function(){
        return `[${this.key} - ${this.value}]`
    }
}
class HashTable {
    constructor(){
        this.table = []
    }
    /**
     * 散列函数
     * @param {*} key 键名
     */
    hashCode(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
          hash += key.charCodeAt(i);
        }
        return hash % 37;
    }
    /**
     * 向散列表增加/更新一个新的项
     * @param {*} key 添加的键名
     * @param {*} value 添加的值
     */
    put (key, value) {
        let position = this.hashCode(key)
        if(this.table[position] == undefined){
            this.table[position] = new ValuePair(key, value)
        }else{
            let index = ++position
            while(this.table[index] !== undefined){
                index ++
            }
            this.table[index] = new ValuePair(key, value)
        }
    }

    /**
     * 根据键值从散列表中移除值
     * @param {*} key 移除的键名
     * @return {Boolean} 是否成功移除
     */
    remove (key) {
        let position = this.hashCode(key)
        if( !key || this.table[position] === undefined ) return undefined
        if(this.table[position].key === key){
            this.table[index] = undefined
        }else{
            let index = ++position
            while(
                this.table[index] === undefined ||
                this.table[index].key !== key
            ){
                index ++
            }
            if(this.table[index].key === key){
                this.table[index] = undefined
            }
        }
    }

    /**
     * 根据键值检索到特定的值
     * @param {*} key 查找的键名
     * @return {*} 查找的值
     */
    get (key) {
        let position = this.hashCode(key)
        if( !key || this.table[position] === undefined ) return undefined
        if(this.table[position].key === key){
            return this.table[position].value
        }else{
            let index = ++position
            while(
                this.table[index] === undefined ||
                this.table[index].key !== key
            ){
                index ++
            }
            if(this.table[index].key === key){
                return this.table[index].value
            }
        }
    }

    /**
     * 打印散列表中已保存的值
     * @return {*} 散列表的值
     */
    print () {
        return this.table
    }
}
```

## 下周预告
下周将练习 **Tree** 的题目。

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|

## 微信公众号
![bg](http://images.pingan8787.com/2019_07_12guild_page.png)  