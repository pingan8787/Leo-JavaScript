const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let devConfig = {
    mode: 'development',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'), 
        compress: true,
        hot: true,
        overlay: true, 
        open:true,
        publicPath: '/',
        host: 'localhost',
        port: '1200',
        proxy: { 
            "/api": {
                target: "http://192.168.30.33:8080",
                pathRewrite: {
                    "^api": "/mock/api"
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.(sc|c|sa)ss$/,
            use: [
                'style-loader',
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        ident: "postcss",
                        sourceMap: true,
                        plugins: loader => [
                            require('autoprefixer')()
                        ]
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }]
    },
    plugins: [
        new BundleAnalyzerPlugin(), // 打印模块报表
        new webpack.NamedModulesPlugin(), // 更容易查看（patch）的以来
        new webpack.HotModuleReplacementPlugin() // 替换插件
    ]
}

module.exports = merge(common, devConfig)