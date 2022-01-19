import TestHooks from './test-hooks';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'index'
  },
  plugins: [TestHooks()]
}