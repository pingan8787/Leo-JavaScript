const fs = require('fs');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: './dist/bundle.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    path.resolve('./loader/a-loader'),
                    path.resolve('./loader/b-loader'),
                ]
            }
        ]
    }
}