module.exports = source => {
    console.log('module C')
    source = '/*' + source + '*/';
    return source;
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('pitch C')
};