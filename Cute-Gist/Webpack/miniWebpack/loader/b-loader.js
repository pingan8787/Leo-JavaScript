module.exports = source => {
    console.log('module B')
    source = source + "---world---"
    return "module.exports = " + source;
}