const c1 = next => {
    console.log('[c1-1]');
    next();
    console.log('[c1-2]');
}

const c2 = next => {
    console.log('[c2-1]');
    next();
    console.log('[c2-2]');
}

const runCallbacks = cbs => {
    if(Array.isArray(cbs)){
        let idx = 0;
        const next = () => {
            const cb = cbs[idx++];
            typeof cb === 'function' && cb.call(cb, next);
        }
        next();
    }
}

runCallbacks([c1, c2]);
/**
 输出结果：
 [c1-1]
 [c1-2]
 [c2-2]
 [c2-1]
 */