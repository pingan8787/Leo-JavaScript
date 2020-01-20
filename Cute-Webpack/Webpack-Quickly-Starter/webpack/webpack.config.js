const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    // 在这里配置 alias
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, '../src/')
        },
        extensions: [".js", ".json"]
    },
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [

            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(sc|c|sa)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                                require('autoprefixer')(),
                                // 这里可以使用更多配置，如上面提到的 postcss-cssnext 等
                                // require('postcss-cssnext')()
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                include: [path.resolve(__dirname, '../src/')],
                use: ["file-loader", {
                    loader: "image-webpack-loader",
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        optipng: {
                            enabled: false
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false
                        },
                        webp: {
                            quality: 75
                        }
                    }
                }, ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                include: [path.resolve(__dirname, '../src/')],
                use: ['file-loader']
            }
        ],
        noParse: content => /jquery|lodash/.test(content)
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            title: "Webpack-Starter Index Template", // 生成的文件标题
            filename: "index.html", // 最终生成的文件名
            template: "./src/index.html",
            minify: { // 压缩选项
                collapseWhitespace: true, // 移除空格
                removeComments: true, // 移除注释
                removeAttributeQuotes: true, // 移除双引号
            }
        }),
        new CleanWebpackPlugin()
    ]
}