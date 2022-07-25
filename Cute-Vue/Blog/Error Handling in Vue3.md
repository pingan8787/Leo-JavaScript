Hi, I'm Chris and I'm a front-end development engineer.

This is the first article I wrote and I hope it will be helpful.

When developing component libraries or plug-ins, global error handling is often required to achieve these goals:


* Global unified handling of errors;
* Prompt error messages for developers;
* Program downgrade processing and so on.

How do you do that?

Next I will briefly implement an error handling method, and then introduce the implementation process of Vue3 source code.

> The Vue3 version of this article is 3.0.11

## 1. Common error handling

There are many common errors, such as:

* JS syntax errors;
* Ajax request errors;
* Static resource loading errors;
* Promise errors;
* iframe errors;
* ...

There are many other ways.

### 1.1 window.onerror

Whenever an error occurs while JS is running, the [`window.onerror()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/error_event) method is executed:

```javascript
window.onerror = function(message, source, lineno, colno, error) {
  console.log('error message:', {message, source, lineno, colno, error});
}
```

If this function returns true, execution of the default event handler is prevented.

### 1.2 try...catch errors handling

You can also handle errors through `try...catch`:

```javascript
try {
  // do something
} catch (error) {
  console.error(error);
}
```

I won't go into the details of other methods here.

### 1.3 Think

And if you think about it, Vue3 is also everywhere through `try...catch` to handle errors?

Let's see together.

## 2. Simple global error handling

When developing plug-ins or libraries, `try...catch` defines a global errors handling method that passes in the method to be executed as an argument. The user only cares about the result of the call, not the internal logic of the global errors handling method.

Such as:

```javascript
const errorHandling = (fn, args) => {
  let result;
  try{
    result = args ? fn(...args) : fn();
  } catch (error){
    console.error(error)
  }
  return result;
}
```

Try to run:

```javascript
const f1 = () => {
    console.log('[f1 running]')
    throw new Error('[f1 error!]')
}

errorHandling(f1);
/*
 output:
 [f1 running]
Error: [f1 error!]
    at f1 (/Users/Chris1993/www/a.js:14:11)
    at errorHandling (/Users/Chris1993/www/a.js:4:39)
    at Object.<anonymous> (/Users/Chris1993/www/a.js:17:1)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47
*/
```

When you need to handle an error, you simply pass this method as a parameter.

But this is too simple. In real business, we often encounter nested calls to methods. Let's try it:

```javascript
const f1 = () => {
    console.log('[f1]')
    f2();
}

const f2 = () => {
    console.log('[f2]')
    f3();
}

const f3 = () => {
    console.log('[f3]')
    throw new Error('[f3 error!]')
}

errorHandling(f1)
/*
  output:
  [f1 running]
  [f2 running]
  [f3 running]
  Error: [f3 error!]
    at f3 (/Users/Chris1993/www/a.js:24:11)
    at f2 (/Users/Chris1993/www/a.js:19:5)
    at f1 (/Users/Chris1993/www/a.js:14:5)
    at errorHandling (/Users/Chris1993/www/a.js:4:39)
    at Object.<anonymous> (/Users/Chris1993/www/a.js:27:1)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
*/
```

Nested calls can also work this way. Then you need to implement different errors handling logic in the `errorHandling` method.

Next, let's see how it is handled in the Vue3 source code?

## 3. Error Handling in Vue3

Vue3 is implemented in three steps: 

### Step 1: Implement error handling methods

Implement two methods to handle global errors in the `errorHandling.ts` file:

- `callWithErrorHandling`: Error handling synchronization method;
- `callWithAsyncErrorHandling`: Error handling asynchronous methods;

Usage:
 
```javascript
callWithAsyncErrorHandling(
  handler,
  instance,
  ErrorCodes.COMPONENT_EVENT_HANDLER,
  args
)
```

Source code implementation:
```javascript
// packages/runtime-core/src/errorHandling.ts

// Error handling synchronization method
export function callWithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn(); // Call the original method
  } catch (err) {
    handleError(err, instance, type)
  }
  return res
}

// Error handling asynchronous methods
export function callWithAsyncErrorHandling(
  fn: Function | Function[],
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
): any[] {
  // ...
  const res = callWithErrorHandling(fn, instance, type, args)
  if (res && isPromise(res)) {
    res.catch(err => {
      handleError(err, instance, type)
    })
  }
  // ...
}
```

The `callWithErrorHandling` method is simpler, with a simple `try...catch` makes a layer of packaging.

And `callWithAsyncErrorHandling` method is more interesting, will need to deal with the target method as parameters to `callWithErrorHandling`, on his return to the Promise of object. The catch method handling errors.

### Step 2: Handling errors

Next, implement the `handleError()` method:

```javascript
// packages/runtime-core/src/errorHandling.ts

// Handling errors
export function handleError(
  err: unknown,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  throwInDev = true
) {
  // ...
  logError(err, type, contextVNode, throwInDev)
}

function logError(
  err: unknown,
  type: ErrorTypes,
  contextVNode: VNode | null,
  throwInDev = true
) {
  // ...
  console.error(err)
}
```

Here we simply implement the `logError()` method and print the error content directly through `console.error(err)`.


### Step 3: Implement Tree Shaking

```javascript
// packages/runtime-core/src/errorHandling.ts

function logError(
  err: unknown,
  type: ErrorTypes,
  contextVNode: VNode | null,
  throwInDev = true
) {
  if (__DEV__) {
    // ...
  } else {
    console.error(err)
  }
}
```

When compiled into the production environment, the `__DEV__` branch code is not packaged, optimizing package size.

I hope I can clear your questions in your minds, and it will benefit you. If you are like it, don’t forget to clap. Stay tuned! :)