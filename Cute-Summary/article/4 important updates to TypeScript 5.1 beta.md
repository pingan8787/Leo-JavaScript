TypeScript 5.1 was released as a beta shortly after the release of 5.0, but a beta is not a final release. 

The official article [Announcing TypeScript 5.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-5-1-beta/) provides a full list of updates, and here is my rundown of the main updates to TypeScript 5.1:

1. Improving type inference for functions that return `undefined`;
2. `Getter` and `Setter` now support setting different types;
3. Auto-completion of code fragments for JSDoc `@param` tags;
4. TypeScript 5.1 needs to run in at least the `ES2020` and `Node.js 14.17` runtime environments;

For those who want to try it out, a quick install of the latest beta is available via npm at

Translated with www.DeepL.com/Translator (free version)

```shell
npm install -D typescript@beta
```

### 1. Improving type inference for functions that return undefined

In JavaScript, functions that do not return a value will automatically return `undefined`.

```js
// no return
const test = () => {}
test();  // undefined
```

In earlier versions of TypeScript, only functions with return values of type `void` and `any` could be used without a `return` statement, and you needed at least one `return` statement even if you knew that the function returned `undefined`.

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

When you want a function to return `undefined`, there are 2 ways you can do it:

1. use the `return undefined` statement;

2. use the `return` statement and define the return value type as `undefined`.

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

To resolve this confusion, TypeScript 5.1 supports allowing functions to return `undefined` without the `return` statement.

```typescript
// ✅ TypeScript 5.1!
const f1 = (): undefined => {}

// ✅ TypeScript 5.1!
f2((): undefined => {})
```

### 2. `Getter` and `Setter` now support setting different types

In TypeScript 4.3 it is allowed to specify different types for `Getter` and `Setter`.

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

Initially, we require that the `get` type must be a subtype of the `set` type, and this write-up works well.

```typescript
box.value = box.value;
```

However, many existing APIs have completely unrelated types between `Getter` and `Setter`. For example, the style property in the DOM and `CSSStyleRule` APIs. Each style rule has a `style` attribute of type `CSSStyleDeclaration`, but you can only modify it using strings.

TypeScript 5.1 supports setting different types for `Getter` and `Setter`.

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

The following uses are also supported:

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
In effect, this is similar to the way optional properties are checked under `-exactOptionalProperties`.

### 3. Auto-completion of code fragments for JSDoc `@param` tags

TypeScript 5.1 supports code fragment completion when entering `@param` tags in TypeScript and JavaScript files. This helps us to quickly generate the corresponding comment information when writing code documentation or adding JSDoc types to JavaScript.

![](https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2023/04/paramTagSnippets-5-1-1.gif)

### 4. TypeScript 5.1 needs to run in at least the `ES2020` and `Node.js 14.17` runtime environments

TypeScript 5.1 supports the new ECMAScript 2020 features and therefore needs to be used in a newer Node.js runtime environment, requiring at least Node.js version 14.17 or higher. Older versions of Node.js may cause `tsc.js` or `tsserver.js` to run incorrectly.

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

### Summary

TypeScript 5.1 is currently in beta, with a release candidate and a final stable version expected in the next few weeks. If you are interested in TpeScript, you can install the beta version and try it out.