const MyPlugin = require("./MyPlugin");
const Compiler = require("./Compiler");

const leoPlugin = new MyPlugin();

// 类似 webpack.config.js 中配置的 plugins
const options = {
    plugins: [leoPlugin]
}

const  compiler = new Compiler();

for(const plugin of options.plugins) {
    if(typeof plugin === "function"){
        plugin.call(compiler, compiler);
    } else {
        plugin.apply(compiler);
    }
}

compiler.run();