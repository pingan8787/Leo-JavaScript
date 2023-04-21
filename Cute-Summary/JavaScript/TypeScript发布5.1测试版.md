在 TypeScript 5.0 发布没几天后，TypeScript 5.1 就来啦。

**测试版不代表最终正式版**。

完整的更新内容，大家可以阅读官方原文 [Announcing TypeScript 5.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-5-1-beta/)，本文主要介绍下面几个部分。

以下是 TypeScript 5.1 重要更新内容：

1. 改进函数返回值类型 undefined 的类型推断
2. Getter 和 Setter 支持设置不同类型
3. JSX 元素和 JJSX 标签类型之间的解耦类型检查
4. 命名的 JSX 属性
5. 在模块解析中咨询 typeRoots
6. JSX 标签的链接光标
7. @param JSDoc 标签的片段补全
8. 优化
9. 破坏性变化

想要尝鲜的朋友，可以通过 npm 快速安装最新测试版：

```shell
npm install -D typescript@beta
```

## 1. 改进函数返回值类型 undefined 的类型推断

在 JavaScript 中，如果一个函数在没有返回值的情况下结束运行，它将返回未定义的值。

```typescript
function foo() {
  // no return
}

// x = undefined
let x = foo();
```

但是，在早期版本的 TypeScript 中，只有返回值类型为 `void` 和 `any` 的函数可以完全没有 return 语句。这意味着即使你明确清楚这个函数返回值是 `undefined`，你也至少需要有一个返回语句。

```typescript
// ✅ 推断出 f1 返回类型为 void
function f1() {
  // no returns
}

// ✅ 返回值类型为 void 不需要 return 语句
function f2(): void {
  // no returns
}

// ✅ 返回值类型为 any 不需要 return 语句
function f3(): any {
  // no returns
}

// ❌ 错误
// 返回值类型不是 void 或 any return 语句
function f4(): undefined {
  // no returns
}
```

如果某些 API 希望函数返回 `undefined`，那么就需要至少有一个 `return undefined` 的语句，或者至少有一个 `return` 语句和定义返回值类型 `undefined`。

```typescript
declare function takesFunction(f: () => undefined): undefined;

// ❌ 错误
// Argument of type '() => void' is not assignable to parameter of type '() => undefined'.
takesFunction(() => {
  // no returns
});

// ❌ 错误
// A function whose declared type is neither 'void' nor 'any' must return a value.
takesFunction((): undefined => {
  // no returns
});

// ❌ 错误
// Argument of type '() => void' is not assignable to parameter of type '() => undefined'.
takesFunction(() => {
  return;
});

// ✅ 正常
takesFunction(() => {
  return undefined;
});

// ✅ 正常
takesFunction((): undefined => {
  return;
});
```

这种行为令人沮丧和困惑，尤其是在调用不受控制的函数时。理解对未定义函数推断 void、未定义返回函数是否需要 return 语句等之间的相互作用似乎是一种干扰。

首先，TypeScript 5.1 现在允许未定义的返回函数没有 return 语句。

```typescript
// ✅ Works in TypeScript 5.1!
function f4(): undefined {
  // no returns
}

// ✅ Works in TypeScript 5.1!
takesFunction((): undefined => {
  // no returns
});
```

其次，如果一个函数没有返回表达式，并且正在传递给一个期望返回未定义函数的函数，TypeScript 会推断该函数的返回类型是未定义的。

```typescript
// ✅ Works in TypeScript 5.1!
takesFunction(function f() {
  //                 ^ return type is undefined
  // no returns
});

// ✅ Works in TypeScript 5.1!
takesFunction(function f() {
  //                 ^ return type is undefined

  return;
});
```

为了解决另一个类似的问题，在 TypeScript 的—— noImpilitReturn 选项下，只返回未定义的函数现在有一个类似的 void 异常，因为并非每个代码路径都必须以显式返回结束。

```typescript
// ✅ Works in TypeScript 5.1 under '--noImplicitReturns'!
function f(): undefined {
  if (Math.random()) {
    // do some stuff...
    return;
  }
}
```

## 2. Getter 和 Setter 支持设置不同类型

TypeScript 4.3 允许为 get 和 set 访问器指定不同类型。

```typescript
interface Serializer {
  set value(v: string | number | boolean);
  get value(): string;
}

declare let box: Serializer;

// Allows writing a 'boolean'
box.value = true;

// Comes out as a 'string'
console.log(box.value.toUpperCase());

// Property 'toFixed' does not exist on type 'string'.
console.log(box.value.toFixed());
```

最初，我们要求 get 类型必须是 set 类型的子类型，这种写法很有效。

```typescript
box.value = box.value;
```

但是，有很多现有的和提出的 API 在它们的 getter 和 setter 之间具有完全不相关的类型。例如，考虑一个最常见的示例—— DOM 和 CSSStyleRuleAPI 中的 style 属性。每个样式规则都有一个样式属性，它是一个 CSSStyleDeclaration; 但是，如果尝试写入该属性，它将只能正确地使用字符串！

目前存在很多 Getter 和 Setter 类型不同的情况，比如 [CSSStyleRule](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule) API 中的 `style` 属性。

TypeScript 5.1 现在支持为 Getter 和 Setter 设置不同类型:

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

这还允许其他模式，如要求 set 访问器只接受“有效”数据，但指定如果某些底层状态尚未初始化，则 get 访问器可能返回未定义的数据。

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

实际上，这类似于在 ——exactOptionalProperties 下检查可选属性的方式。

```typescript

```
