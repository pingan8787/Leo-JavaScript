import TestHooks from './test-hooks';
import myExample from './test-hooks-2';

export default {
  input: 'data:text/javascript, base64 xasdf ',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'index'
  },
  plugins: [
    // TestHooks(),
    myExample(),
  ]
}