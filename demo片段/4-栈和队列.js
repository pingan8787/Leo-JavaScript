// 实现栈和队列的方法

// 1. 栈 LIFO
class Stack {
    constructor ( arr ){
        this.arr = arr;
    }
    // 1. 添加一个（或几个）新元素到栈顶。
    push( ele ){  
        this.arr.push( ele );
    }
    // 2. 移除栈顶的元素，同时返回被移除的元素
    pop ( ele ){
        return this.arr.pop();
    }
    // 3. 返回栈顶的元素，不对栈做任何修改
    peek () {
        return this.arr[0];
    }
    // 4. 如果栈里没有任何元素就返回true，否则返回false
    isEmpty () {
        return this.arr.length > 0 ? false : true;
    }
    // 5. 移除栈里的所有元素。
    clear () {
        this.arr = [];
    }
    // 6. 返回栈里的元素个数。
    size () {
        return this.arr.size;
    }
} 

// 2. 队列 FIFO
class Queue {
    constructor ( arr ){
        this.arr = arr;
    }
    // 1. 向队列尾部添加一个（或多个）新的项。
    enqueue ( ele ) {
        this.arr.unshift( ele );
    }
    // 2. 移除队列的第一（即排在队列最前面的）项，并返回被移除的元素。
    dequeue () {
        return this.arr.shift();
    }
    // 3. 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。
    // 队列不做任何变动（不移除元素，只返回元素信息——与Stack类的peek方法非常类似）。
    front () {
        return this.arr[0];
    }
    // 4. 如果队列中不包含任何元素，返回true，否则返回false。
    isEmpty () {
        return this.arr.length > 0 ? false : true;
    }
    // 5. 返回队列包含的元素个数，与数组的length属性类似。
    size () {
        return this.arr.length;
    }
}