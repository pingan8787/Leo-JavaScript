module.exports = source => {
    console.log('module A')
    source = source + "//---hello---"
    return source;
}