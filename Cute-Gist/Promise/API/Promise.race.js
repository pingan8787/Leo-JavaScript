// 普通使用
const p1 = new Promise((resolve, reject) => {
    // resolve([1,2,3]);
    // reject('p1 reject');
    setTimeout(function(){
        resolve([1,2,3]);
    }, 3000)
})

const p2 = new Promise((resolve, reject) => {
    resolve([4,5,6]);
    // reject('p2 reject');
})

const p3 = new Promise((resolve, reject) => {
    resolve([7,8,9]);
})

const p = Promise.race([p1, p2, p3]);

p.then(data => {
    console.log('[data]',data)
}).catch(err => {
    console.log('[err]',err)
})
// [data] [ 4, 5, 6 ]