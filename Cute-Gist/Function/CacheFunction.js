const add = (a, b) => a + b;

const withCache = fn => {
    let cache = {};
    return (...args) => {
        const key = args.map(JSON.stringify).join('_');
        if(cache[key]){
            console.log(`内存中读取到 ${key}`)
            return cache[key];
        }
        const result = fn.apply(null, args);
        cache[key] = result;
        return result;
    }
}

const withCacheAdd = withCache(add);

const r = withCacheAdd(12, 13);
const q = withCacheAdd(2, 3) + withCacheAdd(12, 13);
console.log("r:", r, q)