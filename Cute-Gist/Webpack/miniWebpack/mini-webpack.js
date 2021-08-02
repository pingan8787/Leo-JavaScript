const fs = require('fs');
const miniWebpack = require('./mini-webpack.config');
const { bundleHandler } = require('./mini-webpack-utils/bundle-handler');


const run = () => {
    const { output } = miniWebpack;
    const result = bundleHandler(miniWebpack);
    fs.writeFileSync(output, result);
}

run();