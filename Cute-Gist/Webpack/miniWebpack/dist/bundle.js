
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

module.exports = // import info from "./info.js";
// console.log(info);
console.log(123); //---hello------world---
                },
                {}
            ],
        })
    