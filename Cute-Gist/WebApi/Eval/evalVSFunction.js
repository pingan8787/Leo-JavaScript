/*
    本示例主要用来对比 eval 和 Function 对作用域链的影响
    结论：eval 影响到作用于链，而 Function 类似沙盒，无论在哪里执行，都只能看到全局作用域
*/

(function() {
    let a = '123';
    eval("a = 4; console.log(a)");
    console.log('[eval result]',a)
})();

(function() {
    let a = '123';
    Function("console.log(a)")();
    console.log('[Function result]',a)
})();