const md5 = require('md5');

module.exports = source => {
    console.log('[txt-md5-loader][normal loader]', source)
    source = '====[txt-md5-loader][start]====' + source + '====[txt-md5-loader][end]====';
    return `module.exports = '${md5(source)}'`;
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('[txt-md5-loader][pitch loader]', remainingRequest, precedingRequest, data)
};