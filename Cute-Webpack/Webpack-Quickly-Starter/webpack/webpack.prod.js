const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const config = require('./webpack.config.js');

const prodConfig = {
    mode: 'production',
    output: {
        filename: 'index.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new OptimizeCssAssetsPlugin({}),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        })
    ]
}
module.exports = merge(config, prodConfig);