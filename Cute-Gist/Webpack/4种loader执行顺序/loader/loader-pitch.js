module.exports = function (source, map, meta) {
    console.log('module pitch')
    return source;
}
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    console.log('pitch pitch')
    data.value = 42;
    return 'module.exports = require(' + JSON.stringify('-!' + remainingRequest) + ');';
  };