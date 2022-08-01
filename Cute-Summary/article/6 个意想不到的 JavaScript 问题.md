作为前端开发工程师，JavaScript 是我们的主要开发语言，它本身语法比较简单，并且生态系统也非常完善，在社区的影响力越来越大。

在我们使用过程中，经常会遇到各种奇怪的问题，让我们经常摸不着头脑。

本文灵感来自 [wtfjs](https://github.com/denysdovhan/wtfjs)，整理了 6 个比较常见并且很有意思的问题。

### 1. 奇怪的 `try..catch`

❓问题

下面代码执行后将返回什么？`2` 还是 `3`？

```javascript
(() => {
  try {
    return 2;
  } finally {
    return 3;
  }
})();
```

💡解答

答案是 `3`，这是为什么呢？这是因为在 `try...catch...finally` 语句中，无论是否抛出异常 `finally` 子句都会执行。此外，如果抛出异常，即使没有 `catch` 子句处理异常，`finally` 子句中的语句也会执行。

📚参考
- [MDN try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

### 2. `[]` 和 `null` 都是对象

❓问题

下面 3 行代码返回结果是什么？

```javascript
typeof [];
typeof null;

null instanceof Object;
```

💡解答

返回结果是这样的：

```javascript
typeof []; // -> 'object'
typeof null; // -> 'object'

null instanceof Object; // false
```

`typeof` 操作符返回一个字符串，且必须符合 [Table 37: typeof 操作符 返回值](https://262.ecma-international.org/12.0/#table-typeof-operator-results)。对于没有实现 `[[Call]]` 的 `null`、普通对象、标准特异对象和非标准特异对象，它返回字符串 `'object'`。

```javascript
console.log(typeof 42);
// expected output: "number"

console.log(typeof '前端自习课');
// expected output: "string"

console.log(typeof true);
// expected output: "boolean"

console.log(typeof undeclaredVariable);
// expected output: "undefined"
```

但是，你可以使用 `toString` 方法检查对象的类型。

```javascript
Object.prototype.toString.call([]);
// -> '[object Array]'

Object.prototype.toString.call(new Date());
// -> '[object Date]'

Object.prototype.toString.call(null);
// -> '[object Null]'
```

📚参考
- [MDN typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

### 3. 箭头函数返回 `undefined`

❓问题

函数 `f2` 执行后为什么返回了 `undefined`？

```javascript
let f1 = () => '前端自习课';
f1(); // -> '前端自习课'

let f2 = () => {};
f2(); // -> undefined
```

💡解答

我们第一眼感觉应该是返回 `{}`，可是却返回了 `undefined`，这本质原因是因为箭头函数返回的 `{}` 是箭头函数语法的一部分，我们写一个测试用例就能看出来：

```javascript
let f2 = () => {
    return '前端自习课'
};
f2(); // -> '前端自习课'
```

因此上面 `f2` 函数返回的是 `undefined`，当然，如果需要返回一个 `{}` 对象也是可以的，只需要使用括号将返回值包裹起来：

```javascript
let f2 = () => ({});
f2(); // -> undefined
```

### 4. 还能使用反引号执行函数？

❓问题

调用函数除了下面的方式，还有其他方式吗？

```javascript
function f(...args) {
  return args;
}

f(1, 2, 3); // -> [ 1, 2, 3 ]
```

当然还有啦，我们可以使用**反引号**调用：
```javascript
f`Hello string ${'前端自习课'}, Hello boolean ${false}, Hello array ${[1, 2, 3]}`;
/*
[
    ["Hello string ",  ", Hello boolean ", ", Hello array ", ""],
    "前端自习课",
    false,
    [1, 2, 3]
]
*/
```

💡解答

这个看着很神奇的样子，但是实际上用的是[模版字符串](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)。这是一种高级形式的模版字符串，是带标签的模版字符串。

上面示例代码中：`f` 函数是模版字面量的标签，标签可以用函数解析模板字符串。标签函数的第一个参数包含一个字符串值的数组。其余的参数与表达式相关。

📚参考

- [MDN 模版字符串](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)。

### 5. JavaScript 中也有标签？

❓问题

下面这种写法会有问题吗？

```javascript
foo: {
  console.log("Hello");
  break foo;
  console.log("前端自习课");
}
```

💡解答

答案是没问题，会返回 `Hello` 的字符串。因为 `foo` 被识别为一个标签，然后执行后面 `console.log("Hello")`，然后执行 `break foo` 中断执行。

我们经常会使用带标签的语句和 `break`/`continue` 语句一起使用，从而实现结束或继续循环：

```javascript
let str = '';

loop1:
for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue loop1;
  }
  str = str + i;
}

console.log(str);
// expected output: "0234"
```

📚参考
- [MDN label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)


### 6. `{}{}` 是 `undefined`

❓问题

我们可以在控制台测试下面代码。类似这样的结构会返回最后定义的对象中的值。

```javascript
{}{}; // -> undefined
{}{}{}; // -> undefined
{}{}{}{}; // -> undefined
{foo: 'bar'}{}; // -> 'bar'
{}{foo: 'bar'}; // -> 'bar'
{}{foo: 'bar'}{}; // -> 'bar'
{a: 'b'}{c:' d'}{}; // -> 'd'
{a: 'b', c: 'd'}{}; // > SyntaxError: Unexpected token ':'
({}{}); // > SyntaxError: Unexpected token '{'
```

💡解答

当解析到 `{}` 会返回 `undefined`，而解析 `{foo: 'bar'}{}` 时，表达式 `{foo: 'bar'}` 返回 `'bar'`。

这里的 `{}` 有两重含义：表示**对象**，或表示**代码块**。

例如，在 `() => {}` 中的 `{}` 表示**代码块**。所以我们必须加上括号：`() => ({})` 才能让它正确地返回一个对象。

因此，我们现在将 `{foo: 'bar'}` 当作**代码块**使用，则可以在终端中这样写：

```javascript
if (true) {
  foo: "bar";
} // -> 'bar'
```
啊哈，一样的结果！所以 `{foo: 'bar'}{}` 中的花括号就是表示**代码块**。

欢迎关注我，我将分享更多有用的内容~