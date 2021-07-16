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
                test: /\.js$/,
                use:[
                    path.resolve('./loader/loader-a.js'),
                    path.resolve('./loader/loader-b.js'),
                    path.resolve('./loader/loader-c.js'),
                    path.resolve('./loader/loader-async.js'),
                    path.resolve('./loader/loader-pitch.js'),
                    path.resolve('./loader/loader-raw.js'),
                    path.resolve('./loader/loader-sync.js')
                ]
            }
        ]
    }
};