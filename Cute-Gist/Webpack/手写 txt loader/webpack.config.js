const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.txt$/,
                use:[
                    path.resolve('./txt-loader/txt-md5-loader.js'),
                    path.resolve('./txt-loader/txt-replace-loader.js'),
                    path.resolve('./txt-loader/txt-token-loader.js'),
                ]
            }
        ]
    }
};