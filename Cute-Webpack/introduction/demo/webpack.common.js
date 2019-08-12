const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, 'src/')
    }
    // extensions: ['.js', '.ts', '.json'], // 默认可以省略后缀名
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_'
  },
  module: {
    noParse: function (content) {
      return /jquery|lodash/.test(content);
    },
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },{
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        include: [path.resolve(__dirname, 'src/')],
        use: [{
          loader: 'url-loader', // 根据图片大小，把图片转换成 base64
          options: {
            limit: 10000,
          },
        }, {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        }, ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [path.resolve(__dirname, 'src/')],
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "leo study!", // 生成的文件标题
      filename: "main.html", // 最终生成的文件名
      template: path.resolve(__dirname, 'src/index.html'), // 文件注入的模版
      minify: { // 压缩选项
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
        removeAttributeQuotes: true, // 移除双引号
      }
    }),
    new CleanWebpackPlugin()
  ],
}