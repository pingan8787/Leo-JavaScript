/**
 * 
Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，
返回一个Promise实例。
这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。
reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。
 */

const promiseAll = promises => {
    return new Promise((resolve, reject) => {
        if (!promises || promises.length == 0) resolve([]);
        let count = 0, result = [];
        for (let i = 0; i < promises.length; i++) {
            const p = Promise.resolve(promises[i]);
            p.then(data => {
                result[i] = data;
                if (++count === promises.length) {
                    resolve(result);
                }
            })
                .catch(error => reject(error));
        }
    })
}

/**
 * 测试用例来自 MDN
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 */

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});
const promise4 = new Promise((resolve, reject) => {
    setTimeout(reject, 200, 'err');
});

promiseAll([promise1, promise2, promise3]).then((values) => {
    console.log(values);
});