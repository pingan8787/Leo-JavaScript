const loaderHandler = (config, source) => {
    const { rules = [] } = config?.module;
    let curSource = source;
    rules.length > 0 && rules.forEach(rule => {
        const { test = /\.js$/, use } = rule;
        // TODO 完善判断后缀名的逻辑，这边暂时拿不到文件路径，得再看看
        // const regExpRule = new RegExp(test);
        // if(regExpRule.test(path)) return rule;

        // TODO 处理第一种配置方式 test + use
        if(use && Array.isArray(use)){
            use.forEach(path => {
                const loader = require(path);
                if(loader.pitch){
                    // TODO 处理 pitching loader

                }else{
                    // 处理 normal loader
                    curSource = loader(curSource);
                }
            })
        }
    })
    return curSource;
}

module.exports = {
    loaderHandler
}