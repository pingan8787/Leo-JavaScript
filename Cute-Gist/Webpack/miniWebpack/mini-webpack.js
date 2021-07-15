const fs = require('fs');
const miniWebpack = require('./mini-webpack.config');
const { bundleHandler } = require('./mini-webpack-utils/bundle');
const { loaderHandler } = require('./mini-webpack-utils/loader-handler');


const run = () => {
    const { output } = miniWebpack;
    const result = bundleHandler(miniWebpack);
    loaderHandler(miniWebpack, result);
    fs.writeFileSync(output, result);
}

run();