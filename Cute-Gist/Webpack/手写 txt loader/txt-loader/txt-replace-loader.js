const { getOptions } = require("loader-utils");

const word = ["刀","枪","棍"];

module.exports = function(source, map, meta) {
    console.log('[txt-replace-loader][normal loader]', source)
    const { tags = '**' } = getOptions(this);
    word.forEach(w => source = source.replace(w, tags))
    source = '====[txt-replace-loader][start]====' + source + '====[txt-replace-loader][end]====';
    return source;
}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    // console.log('[txt-replace-loader][pitch loader]', remainingRequest, precedingRequest, data)
};