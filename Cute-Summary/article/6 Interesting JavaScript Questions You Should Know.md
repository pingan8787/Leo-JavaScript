As the primary development language for front-end developers, JavaScript itself has a relatively simple syntax and a well-developed ecosystem, which is gaining more and more influence in the community.

In our development process using JavaScript, we often encounter all kinds of strange problems that make us feel headache.

I have compiled 6 common and interesting questions to share with you.

Inspiration comes from [WTFJS] (https://github.com/denysdovhan/wtfjs).

### 1. A strange `try...catch`

❓ Problem

What does executing the following code return? `2` or `3`?

```javascript
(() => {
  try {
    return 2;
  } finally {
    return 3;
  }
})();
```

💡 Answer

The answer is `3`. Why is that?

This is because in the 'try...catch...finally` statements, the `finally` clause is executed whether or not an exception is thrown.

In addition, if an exception is thrown, the statement in the `finally` clause is executed even if there is no `catch` clause to handle the exception.

📚 Reference

- [MDN try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

### 2. `[]` and `null` are objects

❓ Problem

What does the next three lines of code return?

```javascript
typeof [];
typeof null;

null instanceof Object;
```

💡 Answer

The result is:

```javascript
typeof []; // -> 'object'
typeof null; // -> 'object'

null instanceof Object; // false
```

The `typeof` operator returns a string that must conform to [Table 37: The typeof operator returns the value](https://262.ecma-international.org/12.0/#table-typeof-operator-results).

It returns the string `'object'` for `null`, normal, standard specific, and nonstandard specific objects that do not implement [[Call]].

```javascript
console.log(typeof 42);
// expected output: "number"

console.log(typeof '@Chris1993');
// expected output: "string"

console.log(typeof true);
// expected output: "boolean"

console.log(typeof undeclaredVariable);
// expected output: "undefined"
```

However, you can check the type of the object using the `toString` method.

```javascript
Object.prototype.toString.call([]);
// -> '[object Array]'

Object.prototype.toString.call(new Date());
// -> '[object Date]'

Object.prototype.toString.call(null);
// -> '[object Null]'
```

📚 Reference

- [MDN typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

### 3. The Arrow function expressions return undefined

❓ Problem

Why did the function `f2` return `undefined`?

```javascript
let f1 = () => '@Chris1993';
f1(); // -> '@Chris1993'

let f2 = () => {};
f2(); // -> undefined
```

💡 Answer

We thought we should return `{}`, but why did return `undefined`, in fact, because the arrow function returns `{}` is part of the Arrow function expressions syntax, we write a test case can see:

```javascript
let f2 = () => {
    return '@Chris1993'
};
f2(); // -> '@Chris1993'
```

So the `f2` function above returns `undefined`.

of course, if you want to return an `{}` object, you can just put `{}` it inside the parentheses:

```javascript
let f2 = () => ({});
f2(); // -> {}
```

### 4. Can the function be executed using backquotes?

❓ Problem

Is there any other way to call a function other than the following?

```javascript
function f(...args) {
  return args;
}

f(1, 2, 3); // -> [ 1, 2, 3 ]
```

Of course, we can use **backquotes** to call:

```javascript
f`Hello string ${'@Chris1993'}, Hello boolean ${false}, Hello array ${[1, 2, 3]}`;
/*
[
    ["Hello string ",  ", Hello boolean ", ", Hello array ", ""],
    "@Chris1993",
    false,
    [1, 2, 3]
]
*/
```

💡 Answer

This looks amazing in appearance, but in fact, is [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). This is an advanced form of template string, a labeled template string.

In the example code above: the `f` function is the tag of a template literal, and the tag can be used to parse the template string. The first argument to the label function contains an array of string values. The remaining parameters are expression dependent.

📚 Reference

- [MDN Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)。

### 5. Tags in JavaScript?

❓ Problem

What does the following code execution output?

```javascript
foo: {
  console.log("Hello");
  break foo;
  console.log("@Chris1993");
}
```

💡 Answer

The answer is yes, it returns the string `Hello`. Since `foo` is recognized as a label, then execute the following `console.log("Hello")`, and then execute `break foo` to break execution.

We often use labeled statements together with `break` and `continue` statements to end or continue a loop:

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

📚 Reference
- [MDN label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)

### 6. `{}{}` is undefined

❓ Problem

Write them in the console. They will return the value defined in the last object.

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

💡 Answer

When inspecting each `{}`, they returns undefined. If you inspect `{foo: 'bar'}{}`, you will find `{foo: 'bar'}` is `'bar'`.

There are two meanings for `{}`: an object or a block. For example, the `{}` in `() => {}` means block. So we need to use `() => ({})` to return an object.

Let's use `{foo: 'bar'}` as a block. Write this snippet in your console:

```javascript
if (true) {
  foo: "bar";
} // -> 'bar'
```

Surprisingly, it behaviors the same! You can guess here that `{foo: 'bar'}{}` is a block.👏

Welcome to follow me, I will share more useful content😄 ~

Happy coding! ❤️
