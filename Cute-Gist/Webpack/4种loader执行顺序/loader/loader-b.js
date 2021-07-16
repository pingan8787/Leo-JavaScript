module.exports = source => {
    console.log('module B')
    return source;
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('pitch B')
};