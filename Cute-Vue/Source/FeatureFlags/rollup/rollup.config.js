import replace from '@rollup/plugin-replace';

export default {
    input: 'index.js',
    output: {
        file: './dist/index.js',
        format: 'cjs'
    },
    plugins: [
        replace({
            __DEV__: false
        })
    ]
};