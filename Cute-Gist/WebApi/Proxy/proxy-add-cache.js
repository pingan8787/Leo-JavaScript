const memoize = fn => {
    return new Proxy(fn, {
        cache: new Map(),
        apply(target, thisArg, argsList){
            const currentCache = this.cache;
            let cacheKey = argsList.toString();
            if(!currentCache.has(cacheKey)) {
                currentCache.set(cacheKey, target.apply(thisArg, argsList));
            }
            return currentCache.get(cacheKey);
        }
    })
}

// 测试代码
const fibonacci = n => (n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
const memoizedFibonacci = memoize(fibonacci);

for (let i = 0; i < 100; i++) fibonacci(30); // ~5000ms
for (let i = 0; i < 100; i++) memoizedFibonacci(30); // ~50ms