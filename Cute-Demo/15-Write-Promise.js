// 参考文章：https://mengera88.github.io/2017/05/18/Promise%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90/

function MyPromise (fn){
    let state = 'pending', value = null, callbacks = [];
    this.then = function(onFulfilled, onRejected){
        console.log("MyPromise - then")
        return new MyPromise(function(resolve, reject){
            handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            })
        })
    }

    function handle(callback){
        console.log("MyPromise - handle")
        if(state === 'pending'){
            callbacks.push(callback);
            return this;
        }
        let cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected, ret;
        if(cb === null){
            cb = state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(value);
            return;
        }
        try {
            ret = cb(value);
            callback.resolve(ret);
        } catch (e) {
            callback.reject(e);
        } 
    }

    function resolve(newValue){
        // 若 then 参数也是 promise 方法
        console.log("MyPromise - resolve")
        if(newValue && (typeof newValue === 'object' || typeof newValue === 'function')){
            let then = newValue.then;
            if(typeof then === 'function'){
                then.call(newValue, resolve);
                return;
            }
        }
        value = newValue;
        state = 'fulfilled';
        execute();
    }
    function reject(reason){
        console.log("MyPromise - reject")
        state = "rejected";
        value = reason;
        execute();
    }
    function execute(){
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value);
            });
        }, 0);
    }

    fn(resolve, reject);
}

//例1
function getUserId() {
    return new MyPromise(function(resolve) {
        //异步请求
        console.log("异步请求")
            resolve("abc")
    })
}
getUserId().then(function(id) {
    console.log("then:", id)
})
