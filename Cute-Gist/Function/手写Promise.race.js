// 文章地址：https://mp.weixin.qq.com/s/yWOPoef9ixuSBWApZQhjIg

Promise.race = function (iterators) {
    return new Promise((resolve, reject) => {
        for (const iter of iterators) {
            Promise.resolve(iter)
                .then((res) => {
                    resolve(res);
                })
                .catch((e) => {
                    reject(e);
                });
        }
    });
};