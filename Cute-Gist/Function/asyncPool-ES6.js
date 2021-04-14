// 文章地址：https://mp.weixin.qq.com/s/yWOPoef9ixuSBWApZQhjIg

function asyncPool(poolLimit, array, iteratorFn) {
    let i = 0;
    const ret = []; // 存储所有的异步任务
    const executing = []; // 存储正在执行的异步任务
    const enqueue = function () {
        if (i === array.length) {
            return Promise.resolve();
        }
        const item = array[i++]; // 获取新的任务项
        const p = Promise.resolve().then(() => iteratorFn(item, array));
        ret.push(p);

        let r = Promise.resolve();

        // 当poolLimit值小于或等于总任务个数时，进行并发控制
        if (poolLimit <= array.length) {
            // 当任务完成后，从正在执行的任务数组中移除已完成的任务
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= poolLimit) {
                r = Promise.race(executing);
            }
        }

        // 正在执行任务列表 中较快的任务执行完成之后，才会从array数组中获取新的待办任务
        return r.then(() => enqueue());
    };
    return enqueue().then(() => Promise.all(ret));
}