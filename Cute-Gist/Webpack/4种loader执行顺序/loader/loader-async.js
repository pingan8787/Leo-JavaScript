module.exports = function (source, map, meta) {
    console.log('module async')
    const callback = this.async();
    const p = new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve({name: 'leo'});
        }, 2);
    });
    p.then(data => {
        callback(null, data.toString(), map, meta);
    })
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('pitch async')
};