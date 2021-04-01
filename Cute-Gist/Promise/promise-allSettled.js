/*
该Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。

当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个promise的结果时，通常使用它。

相比之下，Promise.all() 更适合彼此相互依赖或者在其中任何一个reject时立即结束。

不支持 IE
*/

const promiseAllSettled = promises => {
    return Promise.all(
        promises.map(promise => {
            const p = Promise.resolve(promise);
            p.then(value => { status: 'fulfilled', value })
             .catch(reason => { status: 'rejected', reason })
        })
    )
}


/**
 * 测试用例来自 MDN
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
 */
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));

promiseAllSettled([promise1, promise2]).
  then((results) => results.forEach((result) => console.log(result.status)));
