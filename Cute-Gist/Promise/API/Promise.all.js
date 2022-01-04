// 普通使用
const p1 = new Promise((resolve, reject) => {
    resolve([1,2,3]);
})

const p2 = new Promise((resolve, reject) => {
    resolve([4,5,6]);
    // reject('p2 reject');
})

const p3 = new Promise((resolve, reject) => {
    resolve([7,8,9]);
})

const p = Promise.all([p1, p2, p3]);

p.then(data => {
    console.log('[data]',data)
}).catch(err => {
    console.log('[err]',err)
})

// 参数的 Promise 自己定义 catch，则 Promise.all 的 catch 方法不执行

const p4 = new Promise((resolve, reject) => {
    reject([7,8,9]);
}).catch(err => {
    console.log('[p4 err]',err)
})

const po1 = Promise.all([p1, p2, p3]);

po1.then(data => {
    console.log('[data]',data)
}).catch(err => {
    console.log('[po1 err]',err)
})