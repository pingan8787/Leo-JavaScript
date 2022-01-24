let graph = require("rollup-plugin-graph");
let graphOptions = {prune: true};

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'index'
  },
  plugins: [
    graph(graphOptions)
  ]
}