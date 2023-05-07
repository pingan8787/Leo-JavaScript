作为一位 Web 前端工程师，JavaScript 中的 `try...catch` 是我们常用的特性之一。

`try...catch` 可以**捕获代码中的异常并防止应用程序崩溃**。但是`try...catch` 不仅仅是简单地捕获异常。本文我将分享 10 个有用的 `try...catch` 使用技巧，让你在处理异常时更加得心应手。

## 1. 捕获所有异常

如果你想捕获代码中所有可能的异常，可以使用一个不带参数的 `catch` 代码块。例如：

```javascript
try {
  // 可能会抛出异常的代码
} catch {
  // 处理所有异常的代码
}
```

这种方式会捕获所有异常，包括**语法错误**、**运行时错误**和**自定义错误**。但是，在生产环境中使用时，建议具体指定要捕获的异常类型，以便更好地诊断问题。

## 2. 捕获特定类型的异常

如果你只想捕获特定类型的异常，可以在 `catch` 代码块中使用条件语句。例如，以下代码块只会捕获 `TypeError` 异常：

```javascript
try {
  // 可能会抛出 TypeError 异常的代码
} catch (error) {
  if (error instanceof TypeError) {
    // 处理 TypeError 异常的代码
  }
}
```

你也可以使用 `switch` 语句来检查异常类型：

```javascript
try {
  // 可能会抛出异常的代码
} catch (error) {
  switch (error.constructor) {
    case TypeError:
      // 处理 TypeError 异常的代码
      break;
    case RangeError:
      // 处理 RangeError 异常的代码
      break;
    // ...
  }
}
```

## 3. 捕获异步异常

如果你使用了异步代码，你可能需要捕获异步代码中的异常。例如，以下代码块使用 `Promise` 来异步加载资源：

```javascript
try {
  const resource = await fetch("/resource");
  // 处理资源的代码
} catch (error) {
  // 处理异常的代码
}
```

如果在异步操作中发生异常，它会被传递到 `catch` 代码块中。但是，如果你没有使用 `try...catch` 来捕获异常，它将被视为未处理的异常。

## 4. 在 finally 代码块中清理资源

如果你使用了一些需要手动清理的资源（例如文件句柄或网络连接），可以在 `finally` 代码块中进行清理操作。无论 `try` 代码块中是否发生异常，`finally` 代码块中的代码都会执行。例如：

```javascript
let resource;
try {
  resource = acquireResource();
  // 处理资源的代码
} catch (error) {
  // 处理异常的代码
} finally {
  releaseResource(resource);
}
```

## 5. 抛出异常

`try...catch` 不仅可以捕获异常，还可以抛出异常。你可以使用 `throw` 语句在代码中手动抛出异常。例如：

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("除数不能为零");
  }
  return a / b;
}
```

如果在 `divide` 函数中 `b` 的值为 `0`，则会抛出一个包含错误消息的异常。你可以使用 `try...catch` 来捕获这个异常并执行相应的操作。

## 6. 在异常中传递额外信息

在抛出异常时，你可以传递一些额外的信息来帮助调试问题。例如：

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("除数不能为零", { a, b });
  }
  return a / b;
}
```

在这个例子中，异常对象包含了除数为零时的 `a` 和 `b` 的值。当你捕获这个异常时，你可以访问这些值并进行相应的操作。

## 7. 将异常重新抛出

有时，在处理异常时，你需要将异常重新抛出以便于更高层次的代码进行处理。你可以使用 `throw` 语句来重新抛出异常。例如：

```javascript
try {
  // 可能会抛出异常的代码
} catch (error) {
  // 处理异常的代码
  throw error;
}
```

在这个例子中，异常会被重新抛出并传递到调用函数中进行处理。

## 8. 捕获错误并忽略它们

有时，在调试代码时，你可能希望暂时忽略一些错误。你可以使用空的 `catch` 代码块来忽略异常。例如：

```javascript
try {
  // 可能会抛出异常的代码
} catch {
  // 忽略异常
}
```

但是，建议不要在生产环境中使用这种方式。在生产环境中忽略异常可能会导致代码无法预料的行为。

## 9. 使用 Promise.catch 方法

如果你使用 `Promise` 来处理异步代码，你可以使用 `Promise.catch` 方法来捕获异常。例如：

```javascript
fetch("/resource")
  .then((response) => response.json())
  .then((data) => {
    // 处理数据的代码
  })
  .catch((error) => {
    // 处理异常的代码
  });
```

在这个例子中，如果 `fetch` 或 `json` 方法返回异常，它们会被传递到 `catch` 方法中进行处理。

## 10. 使用 window.onerror

最后一个技巧是使用 `window.onerror` 来全局捕获异常。当页面中发生未处理的异常时，`window.onerror` 会被调用。你可以在 `window.onerror` 中记录异常信息，以便于在生产环境中诊断问题。例如：

```javascript
window.onerror = function handleError(message, source, lineno, colno, error) {
  // 记录异常信息
};
```

在这个例子中，当页面中发生异常时，`handleError` 函数会被调用，并将异常信息作为参数传递进来。你可以在这个函数中记录异常信息并将其发送到服务器以便于分析。

## 结论

在 JavaScript 中，`try...catch` 是一个强大的异常处理工具。它可以帮助你诊断和调试代码中的问题，并确保你的代码在运行时能够处理异常情况。通过掌握这 10 个使用技巧，你可以更好地使用 `try...catch` 并编写出更健壮的代码。
