module.exports = source => {
    console.log('module A')
    return source;
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('pitch A')
};