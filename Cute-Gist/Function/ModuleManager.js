// 《JaVaScript中的模块》http://www.yexiaochen.com/JaVaScript%E4%B8%AD%E7%9A%84%E6%A8%A1%E5%9D%97/

/*
在《你不知道的 JavaScript》中，给出了模块模式因具备的两个必要条件：

1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

从中我们可以看到一个比较重要的一点，从函数调用所返回的只有数据属性而没有闭包函数的对象并不是真正的模块。
*/

// 1. 简单模块
const leoModule = ((name = 'module') => {
    let id = 1, moduleName = name;
    const getModuleId = () => console.log(`moduleId:${id}`);
    const getModuleName = () => console.log(`moduleName:${name}`);
    const setModuleName = name => moduleName = name;
    return {
        getModuleId, getModuleName, setModuleName
    }
})();

// console.log(leoModule.getModuleId())

// 2. 模块机制
const moduleManager = (() => {
    let modules = {};
    const imports = (name, deps, module) => {
        deps = deps.map(item => modules[item]);
        modules[name] = module(...deps);
    }
    const exports = name => name && modules[name];
    return {
        imports, exports
    }
})()

moduleManager.imports('leo', [], () => {
    const getName = name => console.log("name:", name);
    return { getName }
})

moduleManager.imports('robin', ['leo'], m => {
    let name = 'robin2';
    const getName = () => m.getName(name);
    return { getName };
})

const robin = moduleManager.exports("robin");
robin.getName();