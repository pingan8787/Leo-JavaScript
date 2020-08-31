const Compiler = require("./Compiler");

class MyPlugin {
    constructor(){

    }
    apply (compiler) {
        compiler.hooks.leoHook.tap("leoHookPlugin", () => console.log("leoHookPlugin"));
        compiler.hooks.pinganHook.tap("pinganHookPlugin", arg => console.log("pinganHookPlugin:", arg));
        compiler.hooks.robinHook.tapPromise("robinHookPlugin", (arg1, arg2, arg3) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("robinHookPlugin tapPromise: ", arg1, arg2, arg3);
                    resolve();
                }, 1000);
            })
        });
    }
}

module.exports = MyPlugin;