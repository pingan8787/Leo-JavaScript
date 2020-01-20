const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');

const devConfig = {
    mode: 'development',
    output: {
        filename: 'index.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        hot: true,
        overlay: true,
        open: true,
        publicPath: '/',
        host: 'localhost',
        port: '1200',
        // 有需要代理的话 启用该配置
        // proxy: { 
        //   "/api": { // 以 '/api' 开头的请求，会跳转到下面的 target 配置
        //     target: "http://192.168.30.33:8080",
        //     pathRewrite: {
        //       "^api": "/mock/api"
        //     }
        // }
    },
    devtool: 'inline-source-map',
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.NamedModulesPlugin(), // 更容易查看（patch）的以来
        new webpack.HotModuleReplacementPlugin() // 替换插件
    ]
}
module.exports = merge(config, devConfig);