module.exports = function (source, map, meta) {
    console.log('sync loader!')
    
    /* 方式 1：直接 return 处理后的 source */
    /*
        return handler(source);
    */

    /* 方式 2：调用 this.callback 后，直接 return */
    const handler = s => s + `console.log('--sync--start--')`;
    this.callback(null, handler(source), map, meta);
    return;
}