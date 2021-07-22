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
                use: [
                    'txt-md5-loader',
                    {
                        loader: 'txt-replace-loader',
                        options: {
                            tags: '+',
                            name: '++'
                        }
                    },
                    'txt-token-loader',
                ]
            }
        ],
    },
    resolveLoader: {
        modules: [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, "txt-loader"),
        ],
    },
};