const word = ["刀","枪","棍"];

module.exports = source => {
    console.log('[txt-replace-loader][normal loader]', source)
    word.forEach(w => source = source.replace(w, '**'))
    source = '====[txt-replace-loader][start]====' + source + '====[txt-replace-loader][end]====';
    return source;
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    // console.log('[txt-replace-loader][pitch loader]', remainingRequest, precedingRequest, data)
};