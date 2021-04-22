/**
 * API 名称：
 * Function
 * 
 * API 作用：
 * 每个 JavaScript 函数实际上都是一个 Function 对象。运行 (function(){}).constructor === Function // true 便可以得到这个结论。
 * 
 * 文档地址：
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
 * 
 * 语法：
 * new Function ([arg1[, arg2[, ...argN]],] functionBody)
 * 
 * 参数说明：
 * - arg1, arg2, ... argN
 *   被函数使用的参数的名称必须是合法命名的。参数名称是一个有效的JavaScript标识符的字符串，或者一个用逗号分隔的有效字符串的列表;例如“×”，“theValue”，或“a,b”。
 * - functionBody
 *   一个含有包括函数定义的 JavaScript 语句的字符串。
 * 
 * 说明：
 * Function 构造函数创建一个新的 Function 对象。
 * 直接调用此构造函数可用来动态创建函数。
 * 与 eval 相同：会有类似的安全问题和(相对较小的)性能问题
 * 与 eval 不同：Function 创建的函数只能在全局作用域中运行。
 */

const data = {
    name : "leo"
}

const name = new Function('data', 'console.log("hello " + data.name)');

console.log(name(data));

// 输出：hello leo
