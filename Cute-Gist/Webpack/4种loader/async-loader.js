module.exports = function (source, map, meta) {
    console.log('async loader!')
    const callback = this.async();
    const p = new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve({name: 'leo'});
        },20000);
    });
    /* 方式1：返回单个值 */
    p.then(data => {
        callback(null, data.toString(), map, meta);
    })        
    /* 方法2：返回多个值，处理函数返回多个结果，作为 sourceMaps */
    /*
    p.then((data, sourceMaps) => {
        callback(null, data.toString(), sourceMaps, meta);
    })
    */
}