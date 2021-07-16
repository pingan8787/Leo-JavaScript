module.exports = function (source, map, meta) {
    console.log('module sync')
    const handler = s => s + `console.log('--sync--start--')`;
    this.callback(null, handler(source), map, meta);
    return;
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('pitch sync')
};