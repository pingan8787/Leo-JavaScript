/**
 * 
 * Promise.race(iterable) 方法返回一个 promise，
 * 一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
 */
const promiseRace = promises => {
    return new Promise((resolve, reject) => {
        if (!promises || promises.length == 0) resolve('');
        for (let item of promises) {
            const p = Promise.resolve(item);
            p.then(data => resolve(data))
                .catch(error => reject(error));
        }
    })
}


/**
 * 测试用例来自 MDN
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
 */
const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
});

promiseRace([promise1, promise2]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
});