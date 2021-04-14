// 文章地址：https://mp.weixin.qq.com/s/yWOPoef9ixuSBWApZQhjIg

Promise.all = function (iterators) {
    return new Promise((resolve, reject) => {
        if (!iterators || iterators.length === 0) {
            resolve([]);
        } else {
            let count = 0; // 计数器，用于判断所有任务是否执行完成
            let result = []; // 结果数组
            for (let i = 0; i < iterators.length; i++) {
                // 考虑到iterators[i]可能是普通对象，则统一包装为Promise对象
                Promise.resolve(iterators[i]).then(
                    (data) => {
                        result[i] = data; // 按顺序保存对应的结果
                        // 当所有任务都执行完成后，再统一返回结果
                        if (++count === iterators.length) {
                            resolve(result);
                        }
                    },
                    (err) => {
                        reject(err); // 任何一个Promise对象执行失败，则调用reject()方法
                        return;
                    }
                );
            }
        }
    });
};