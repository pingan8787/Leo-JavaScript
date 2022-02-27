"use strict";

var path = require('path');

var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  mode: 'production',
  plugins: [new webpack.DefinePlugin({
    __DEV__: JSON.stringify(false)
  })]
};