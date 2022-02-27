"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pluginReplace = _interopRequireDefault(require("@rollup/plugin-replace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  input: 'index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs'
  },
  plugins: [(0, _pluginReplace["default"])({
    __DEV__: false
  })]
};
exports["default"] = _default;