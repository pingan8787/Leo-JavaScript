TypeScript 5.1 在 5.0 发布后不久就发布了测试版，但测试版不代表最终正式版。

官方原文  [Announcing TypeScript 5.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-5-1-beta/) 中提供了完整的更新内容，以下是我梳理的 TypeScript 5.1 主要更新内容：

1. 改进了函数返回值类型 `undefined` 的类型推断
2. `Getter` 和 `Setter` 现在支持设置不同的类型
3. 自动补全 JSDoc `@param` 标签的代码片段
4. TypeScript 5.1 至少需要运行在 `ES2020` 和 `Node.js 14.17` 的运行时环境中

想要尝鲜的朋友，可以通过 npm 快速安装最新测试版：

```shell
npm install -D typescript@beta
```

## 1. 改进函数返回值类型 undefined 的类型推断

在 JavaScript 中，函数如果没有返回值，会自动返回 `undefined`。

```js
// no return
const test = () => {}
test();  // undefined
```

在早期版本的 TypeScript 中，只有返回值类型为 `void` 和 `any` 的函数可以没有 `return` 语句，即使你清楚这个函数返回值是 `undefined`，你也需要至少有一个 `return` 语句。

```typescript
//  ✅ return 'void'
const t1 = () => {}

//  ✅ 'void' doesn't need a return statement
const t2 = (): void => {}

// ✅  'any' doesn't need a return statement
const t3 = (): any => {}

// ❌ A function whose declared type is neither 'void' nor 'any' must return a value.
const t4 = (): undefined => {}
```

当你希望函数返回 `undefined`，你可以有 2 种方式：

1. 使用 `return undefined` 语句；

2. 使用 `return` 语句并且定义返回值类型为 `undefined`。

```typescript
declare function fun(f: () => undefined): undefined;

// ❌ Argument of type '() => void' is not assignable to parameter of type '() => undefined'.
fun(() => {})

// ❌ A function whose declared type is neither 'void' nor 'any' must return a value.
fun((): undefined => {})

// ❌ Argument of type '() => void' is not assignable to parameter of type '() => undefined'.
fun(() => {
    return;
})

// ✅ 
fun(() => {
    return undefined;
});

// ✅ 
fun((): undefined => {
    return;
});
```

为了解决这种困惑，TypeScript 5.1 支持允许函数返回 `undefined` 时不需要 `return` 语句。

```typescript
// ✅ TypeScript 5.1!
const f1 = (): undefined => {}

// ✅ TypeScript 5.1!
f2((): undefined => {})
```

## 2. Getter 和 Setter 支持设置不同类型

在 TypeScript 4.3 允许为 `Getter` 和 `Setter` 指定不同类型。

```typescript
interface Serializer {
  set value(v: string | number | boolean);
  get value(): string;
}

declare let box: Serializer;

// ✅ Allows writing a 'boolean'
box.value = true;

// ✅ Comes out as a 'string'
console.log(box.value.toUpperCase());

// ❌ Property 'toFixed' does not exist on type 'string'.
console.log(box.value.toFixed());
```

最初，我们要求 `get` 类型必须是 `set` 类型的子类型，这种写法很有效。

```typescript
box.value = box.value;
```

但是，很多现有 API 的 `Getter` 和 `Setter` 之间存在完全不相关的类型。例如，DOM 和 `CSSStyleRule` API 中的 style 属性。每个样式规则都有一个 `CSSStyleDeclaration` 类型的 `style` 属性，但你只能使用字符串修改它。

TypeScript 5.1 支持为 `Getter` 和 `Setter` 设置不同类型:

```typescript
interface CSSStyleRule {
  // ...

  /** Always reads as a `CSSStyleDeclaration` */
  get style(): CSSStyleDeclaration;

  /** Can only write a `string` here. */
  set style(newValue: string);

  // ...
}
```

也支持下面这样使用：

```typescript
class SafeBox {
  #value: string | undefined;

  // Only accepts strings!
  set value(newValue: string) {}

  // Must check for 'undefined'!
  get value(): string | undefined {
    return this.#value;
  }
}
```

实际上，这类似于在 `--exactOptionalProperties` 下检查可选属性的方式。

## 3. 自动补全 JSDoc @param 标签的代码片段

TypeScript 5.1 支持在 TypeScript 和 JavaScript 文件中输入 @param 标记时的代码片段完成。帮助我们在编写代码文档或在 JavaScript 中添加 JSDoc 类型时快速生成对应注释信息。

![](https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2023/04/paramTagSnippets-5-1-1.gif)

## 4. 最低运行时要求：ES2020 和 Node.js 14.17

TypeScript 5.1 支持 ECMAScript 2020 新特性，因此需要在较新的 Node.js 运行环境下使用，至少需要 Node.js 14.17 版本以上。旧版 Node.js 可能导致 `tsc.js` 或 `tsserver.js` 运行错误。

```shell
node_modules/typescript/lib/tsserver.js:2406
  for (let i = startIndex ?? 0; i < array.length; i++) {
                           ^
SyntaxError: Unexpected token '?'
    at wrapSafe (internal/modules/cjs/loader.js:915:16)
    at Module._compile (internal/modules/cjs/loader.js:963:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12)
    at internal/main/run_main_module.js:17:47
```

## 总结

TypeScript 5.1 目前还在测试阶段，预计会在接下来的几周内发布候选版本和最终稳定版本。如果你对 TpeScript 感兴趣，可以安装测试版尝试体验一下。