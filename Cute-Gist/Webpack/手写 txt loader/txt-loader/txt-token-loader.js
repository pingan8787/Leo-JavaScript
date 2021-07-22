module.exports = source => {
    console.log('[txt-token-loader][normal loader]', source)
    source = '====[txt-token-loader][start]====' + source + '====[txt-token-loader][end]====';
    return source;
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('[txt-token-loader][pitch loader]', remainingRequest, precedingRequest, data)
};