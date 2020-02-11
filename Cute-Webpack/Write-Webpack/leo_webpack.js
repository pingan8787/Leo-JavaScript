const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

let moduleId = 0;

function createAssets(filename){
    const content = fs.readFileSync(filename, "utf-8");
    const ast = parser.parse(content, {
        sourceType: "module"
    })
    const dependencies = [];

    traverse(ast, {
        ImportDeclaration: ({node}) => {
            dependencies.push(node.source.value);
        }
    });

    const { code } = babel.transformFromAstSync(ast,null, {
        presets: ["@babel/preset-env"]
    });

    let id = moduleId++;
    return {
        id,
        filename,
        code,
        dependencies
    }
}

function createGraph(entry) {
    const mainAsset = createAssets("./src/index.js");
    const queue = [mainAsset];

    for(const asset of queue){
        const dirname = path.dirname(asset.filename);
        asset.mapping = {};
        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath);
            const child = createAssets(absolutePath);
            asset.mapping[relativePath] = child.id;
            queue.push(child);
        })
    }

    return queue;
}

function bundle(graph) {
    let modules = "";

    graph.forEach(item => {
        modules += `
            ${item.id}: [
                function (require, module, exports){
                    ${item.code}
                },
                ${JSON.stringify(item.mapping)}
            ],
        `
    })

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
    `
}

const graph = createGraph("./src/index.js");
const result = bundle(graph);
console.log(result)