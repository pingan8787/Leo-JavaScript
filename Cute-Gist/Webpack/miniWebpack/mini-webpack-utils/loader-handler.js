const loaderHandler = (config, source) => {
    const { rules = [] } = config?.module;
    const loaders = 
    rules.forEach(rule => {
        const { test, use } = rule;
        use.forEach(path => {
            const loader = require(path);
            const res = loader(source);
            console.log("loader:", loader, res)
        })
    })
}

module.exports = {
    loaderHandler
}