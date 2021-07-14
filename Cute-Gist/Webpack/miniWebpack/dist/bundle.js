
        (function(modules){
            function require(id){
                const [fn, mapping] = modules[id];
                function localRequire(relativePath){
                    return require(mapping[relativePath]);
                }

                const module = {
                    exports: {}
                }

                fn(localRequire, module, module.exports);

                return module.exports;
            }
            require(0);
        })({
            0: [
                function (require, module, exports){
                    "use strict";

var _info = _interopRequireDefault(require("./info.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_info["default"]);
                },
                {"./info.js":1}
            ],
        
            1: [
                function (require, module, exports){
                    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _const = require("./const.js");

var _default = {
  msg: 'hello ' + _const.NAME
};
exports["default"] = _default;
                },
                {"./const.js":2}
            ],
        
            2: [
                function (require, module, exports){
                    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAME = void 0;
var NAME = "平安";
exports.NAME = NAME;
                },
                {}
            ],
        })
    