const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require("@babel/traverse").default;
// 由于 traverse 采用的 ES Module 导出，我们通过 require 引入的话就加个 .default
const babel = require("@babel/core");
const { relative } = require('path');
const { loaderHandler } = require('./loader-handler');

let moduleId = 0;
const createAssets = (webpackConfig, filename) => {
    // 1.读取文件
    let content = fs.readFileSync(filename, 'utf-8');

    // 执行 loader 转换
    content = loaderHandler(webpackConfig, content);

    console.log(content)

    // 2.将文件流 buffer 转换为 ast
    const ast = parser.parse(content, {
        sourceType: 'module'
    });

    // 3.收集模块依赖的路径
    const dependencies = [];
    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            dependencies.push(node.source.value);
        }
    })
    
    // 4.将 ast 转换为浏览器可运行代码
    const { code } = babel.transformFromAstSync(ast, null, {
        presets: ['@babel/preset-env']
    });
    let id = moduleId++;
    return { id, filename, code, dependencies };
}

const createGraph = (webpackConfig) => {
    // 获取入口文件下的内容
    const { entry } = webpackConfig;
    const mainAssets = createAssets(webpackConfig, entry);
    const queue = [mainAssets];
    for (const asset of queue) {
        const dirname = path.dirname(asset.filename);
        asset.mapping = {};
        asset.dependencies.forEach(relativePath => {
            // 将文件相对路径转换为绝对路径
            const absolutePath = path.join(dirname, relativePath);
            const child = createAssets(webpackConfig, absolutePath);
            asset.mapping[relativePath] = child.id;
            queue.push(child);
        })
    }
    return queue;
}

const bundle = graph => {
    let modules = '';
    graph.forEach(item => {
        modules += `
            ${item.id}: [
                function (require, module, exports){
                    ${item.code}
                },
                ${JSON.stringify(item.mapping)}
            ],
        `
    });

    return `
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
        })({${modules}})
    `;

}

const bundleHandler = config => {
    const graph = createGraph(config);
    const result = bundle(graph);
    return result;
}

module.exports = {
    createAssets,
    createGraph,
    bundle,
    bundleHandler
}