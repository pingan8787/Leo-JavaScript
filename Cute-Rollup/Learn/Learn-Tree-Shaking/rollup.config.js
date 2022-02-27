import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    // replace({
    //   'process.env.NODE_ENV': JSON.stringify('production'),
    //   __buildDate__: () => JSON.stringify(new Date()),
    //   __buildVersion: 15
    // })
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        __buildDate__: () => JSON.stringify(new Date()),
        __buildVersion: 15
      },
      /**
       * 当 true 时，则可以避免包含等号的内容被替换,比如：
        process.env.NODE_ENV = 'dee'
        if(process.env.NODE_ENV !== 'dev'){
            console.log(b)
        }
        为 true 时，process.env.NODE_ENV = 'dee' 就不会被替换
        为 false 时，process.env.NODE_ENV = 'dee' 会被替换成 'production' = 'dee'
       */
      preventAssignment: true 
    })
  ]
};