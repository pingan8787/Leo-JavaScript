在开发组件库或者插件，经常会需要进行全局异常处理，从而实现：

- 全局统一处理异常；
- 为开发者提示错误信息；
- 方案降级处理等等。

那么如何实现上面功能呢？
本文先简单实现一个异常处理方法，然后结合 Vue3 源码中的实现详细介绍，最后总结实现异常处理的几个核心。

> 本文 Vue3 版本为 3.0.11

## 一、前端常见异常
对于前端来说，常见的异常比较多，比如：

- JS 语法异常；
- Ajax 请求异常；
- 静态资源加载异常；
- Promise 异常；
- iframe 异常；
- 等等

对于这些异常如何处理，可以阅读这两篇文章：

- [《你不知道的前端异常处理》](https://mp.weixin.qq.com/s/St5szyXiT20StNURTaxMcg)
- [《如何优雅处理前端异常？》](http://jartto.wang/2018/11/20/js-exception-handling/)

最常用的比如：
### 1. window.onerror
通过 `window.onerror`[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror)可知，当 JS 运行时发生错误（包括语法错误），触发 `window.onerror()`：
```javascript
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：',{message, source, lineno, colno, error});
}
```
函数参数：

- message：错误信息（字符串）。可用于HTML `onerror=""`处理程序中的 `event`。
- source：发生错误的脚本URL（字符串）
- lineno：发生错误的行号（数字）
- colno：发生错误的列号（数字）
- error：[Error对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)（对象）

若该函数返回true，则阻止执行默认事件处理函数。

### 2.  try...catch 异常处理
另外，我们也经常会使用 `try...catch` [语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)处理异常：
```javascript
try {
  // do something
} catch (error) {
  console.error(error);
}
```
更多处理方式，可以阅读前面推荐的文章。

### 3. 思考
大家可以思考下，自己在业务开发过程中，是否也是经常要处理这些错误情况？
那么像 Vue3 这样复杂的库，是否也是到处通过 `try...catch`来处理异常呢？
接下来一起看看。
## 二、实现简单的全局异常处理
在开发插件或库时，我们可以通过 `try...catch`封装一个全局异常处理方法，将需要执行的方法作为参数传入，调用方只要关心调用结果，而无需知道该全局异常处理方法内部逻辑。
大致使用方法如下：
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
测试一下：
```javascript
const f1 = () => {
    console.log('[f1 running]')
    throw new Error('[f1 error!]')
}

errorHandling(f1);
/*
 输出：
 [f1 running]
Error: [f1 error!]
    at f1 (/Users/wangpingan/leo/www/node/www/a.js:14:11)
    at errorHandling (/Users/wangpingan/leo/www/node/www/a.js:4:39)
    at Object.<anonymous> (/Users/wangpingan/leo/www/node/www/a.js:17:1)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47
*/
```
可以看到，当需要为方法做异常处理时，只要将该方法作为参数传入即可。
但是上面示例跟实际业务开发的逻辑差得有点多，实际业务中，我们经常会遇到方法的嵌套调用，那么我们试一下：
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
  输出：
  [f1 running]
  [f2 running]
  [f3 running]
  Error: [f3 error!]
    at f3 (/Users/wangpingan/leo/www/node/www/a.js:24:11)
    at f2 (/Users/wangpingan/leo/www/node/www/a.js:19:5)
    at f1 (/Users/wangpingan/leo/www/node/www/a.js:14:5)
    at errorHandling (/Users/wangpingan/leo/www/node/www/a.js:4:39)
    at Object.<anonymous> (/Users/wangpingan/leo/www/node/www/a.js:27:1)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
*/
```
这样也是没问题的。那么接下来就是在 `errorHandling`方法的 `catch`分支实现对应异常处理即可。
接下来看看 Vue3 源码中是如何处理的？
## 三、Vue3 如何实现异常处理
理解完上面示例，接下来看看在 Vue3 源码中是如何实现异常处理的，其实现起来也是很简单。
### 1. 实现异常处理方法
在 `errorHandling.ts` 文件中定义了 `callWithErrorHandling`和 `callWithAsyncErrorHandling`两个处理全局异常的方法。
顾名思义，这两个方法分别处理：

- `callWithErrorHandling`：处理同步方法的异常；
- `callWithAsyncErrorHandling`：处理异步方法的异常。

使用方式如下：
```typescript
callWithAsyncErrorHandling(
  handler,
  instance,
  ErrorCodes.COMPONENT_EVENT_HANDLER,
  args
)
```
代码实现大致如下：
```typescript
// packages/runtime-core/src/errorHandling.ts

// 处理同步方法的异常
export function callWithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn(); // 调用原方法
  } catch (err) {
    handleError(err, instance, type)
  }
  return res
}

// 处理异步方法的异常
export function callWithAsyncErrorHandling(
  fn: Function | Function[],
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
): any[] {
  // 省略其他代码
  const res = callWithErrorHandling(fn, instance, type, args)
  if (res && isPromise(res)) {
    res.catch(err => {
      handleError(err, instance, type)
    })
  }
  // 省略其他代码
}
```
`callWithErrorHandling`方法处理的逻辑比较简单，通过简单的 `try...catch` 做一层封装。
而 `callWithAsyncErrorHandling` 方法就比较巧妙，通过将需要执行的方法传入 `callWithErrorHandling`方法处理，并将其结果通过 `.catch`方法进行处理。

### 2. 处理异常
在上面代码中，遇到报错的情况，都会通过 `handleError()`处理异常。其实现大致如下：
```typescript
// packages/runtime-core/src/errorHandling.ts

// 异常处理方法
export function handleError(
  err: unknown,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  throwInDev = true
) {
  // 省略其他代码
  logError(err, type, contextVNode, throwInDev)
}

function logError(
  err: unknown,
  type: ErrorTypes,
  contextVNode: VNode | null,
  throwInDev = true
) {
  // 省略其他代码
  console.error(err)
}
```
保留核心处理逻辑之后，可以看到这边处理也是相当简单，直接通过 `console.error(err)`输出错误内容。

### 3. 配置 errorHandler 自定义异常处理函数
在使用 Vue3 时，也支持**指定自定义异常处理函数**，来处理**组件渲染函数**和**侦听器执行期间**抛出的未捕获错误。这个处理函数被调用时，可获取错误信息和相应的应用实例。
文档参考：《[errorHandler](https://v3.cn.vuejs.org/api/application-config.html#errorhandler)》
使用方法如下，在项目 `main.js`文件中配置：
```javascript
// src/main.js

app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}
```
那么 `errorHandler()`是何时执行的呢？我们继续看看源码中 `handleError()` 的内容，可以发现：
```javascript
// packages/runtime-core/src/errorHandling.ts

export function handleError(
  err: unknown,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  throwInDev = true
) {
  const contextVNode = instance ? instance.vnode : null
  if (instance) {
    // 省略其他代码
    // 读取 errorHandler 配置项
    const appErrorHandler = instance.appContext.config.errorHandler
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        ErrorCodes.APP_ERROR_HANDLER,
        [err, exposedInstance, errorInfo]
      )
      return
    }
  }
  logError(err, type, contextVNode, throwInDev)
}
```
通过 `instance.appContext.config.errorHandler`取到全局配置的自定义错误处理函数，存在时则执行，当然，这边也是通过前面定义的 `callWithErrorHandling`来调用。
​
### 4. 调用 errorCaptured 生命周期钩子
在使用 Vue3 的时候，也可以通过 `errorCaptured`生命周期钩子来**捕获来自后代组件的错误**。
文档参考：《[errorCaptured](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#errorcaptured)》
入参如下：
```javascript
(err: Error, instance: Component, info: string) => ?boolean
```
此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。
此钩子可以返回 `false`以**阻止该错误继续向上传播。**
有兴趣的同学可以通过文档，**查看具体的错误传播规则**。
使用方法如下，父组件监听 `onErrorCaptured`生命周期（示例代码使用 Vue3 setup 语法）：
```vue
<template>
  <Message></Message>
</template>
<script setup>
// App.vue  
import { onErrorCaptured } from 'vue';
  
import Message from './components/Message.vue'
  
onErrorCaptured(function(err, instance, info){
  console.log('[errorCaptured]', err, instance, info)
})
</script>
```
子组件如下：
```vue
<template>
  <button @click="sendMessage">发送消息</button>
</template>

<script setup>
// Message.vue
const sendMessage = () => {
  throw new Error('[test onErrorCaptured]')
}
</script>
```
当点击「发送消息」按钮，控制台便输出错误：
```javascript
[errorCaptured] Error: [test onErrorCaptured]
    at Proxy.sendMessage (Message.vue:36:15)
    at _createElementVNode.onClick._cache.<computed>._cache.<computed> (Message.vue:3:39)
    at callWithErrorHandling (runtime-core.esm-bundler.js:6706:22)
    at callWithAsyncErrorHandling (runtime-core.esm-bundler.js:6715:21)
    at HTMLButtonElement.invoker (runtime-dom.esm-bundler.js:350:13) Proxy {sendMessage: ƒ, …} native event handler
```
可以看到 `onErrorCaptured`生命周期钩子正常执行，并输出子组件 `Message.vue`内的异常。

那么这个又是如何实现呢？还是看 `errorHandling.ts` 中的 `handleError()` 方法：
```typescript
// packages/runtime-core/src/errorHandling.ts

export function handleError(
  err: unknown,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  throwInDev = true
) {
  const contextVNode = instance ? instance.vnode : null
  if (instance) {
    let cur = instance.parent
    // the exposed instance is the render proxy to keep it consistent with 2.x
    const exposedInstance = instance.proxy
    // in production the hook receives only the error code
    const errorInfo = __DEV__ ? ErrorTypeStrings[type] : type
    while (cur) {
      const errorCapturedHooks = cur.ec // ①取出组件配置的 errorCaptured 生命周期方法
      if (errorCapturedHooks) {
        // ②循环执行 errorCaptured 中的每个 Hook
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (
            errorCapturedHooks[i](err, exposedInstance, errorInfo) === false
          ) {
            return
          }
        }
      }
      cur = cur.parent
    }
    // 省略其他代码
  }
  logError(err, type, contextVNode, throwInDev)
}

```
这边会先获取 `instance.parent`作为当前处理的组件实例进行递归，每次将取出组件配置的 `errorCaptured` 生命周期方法的数组并循环调用其每一个钩子，然后再取出当前组件的父组件作为参数，最后继续递归调用下去。
​
### 5. 实现错误码和错误消息
Vue3 还为异常定义了错误码和错误信息，在不同的错误情况有不同的错误码和错误信息，让我们能很方便定位到发生异常的地方。
错误码和错误信息如下：
```typescript
// packages/runtime-core/src/errorHandling.ts

export const enum ErrorCodes {
  SETUP_FUNCTION,
  RENDER_FUNCTION,
  WATCH_GETTER,
  WATCH_CALLBACK,
  // ... 省略其他
}

export const ErrorTypeStrings: Record<number | string, string> = {
  // 省略其他
  [LifecycleHooks.RENDER_TRACKED]: 'renderTracked hook',
  [LifecycleHooks.RENDER_TRIGGERED]: 'renderTriggered hook',
  [ErrorCodes.SETUP_FUNCTION]: 'setup function',
  [ErrorCodes.RENDER_FUNCTION]: 'render function',
  // 省略其他
  [ErrorCodes.SCHEDULER]:
    'scheduler flush. This is likely a Vue internals bug. ' +
    'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next'
}
```
当不同错误情况，根据错误码 `ErrorCodes`来获取 `ErrorTypeStrings`错误信息进行提示：
```typescript
// packages/runtime-core/src/errorHandling.ts

function logError(
  err: unknown,
  type: ErrorTypes,
  contextVNode: VNode | null,
  throwInDev = true
) {
  if (__DEV__) {
    const info = ErrorTypeStrings[type]
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`)
    // 省略其他
  } else {
    console.error(err)
  }
}
```

### 6. 实现 Tree Shaking
关于 Vue3 实现 Tree Shaking 的介绍，可以看我之前写的[高效实现框架和 JS 库瘦身](https://juejin.cn/post/7069412445789356068)。
其中，`logError` 方法中就使用到了：
```typescript
// packages/runtime-core/src/errorHandling.ts

function logError(
  err: unknown,
  type: ErrorTypes,
  contextVNode: VNode | null,
  throwInDev = true
) {
  if (__DEV__) {
    // 省略其他
  } else {
    console.error(err)
  }
}
```
当编译成 production 环境后，`__DEV__`分支的代码不会被打包进去，从而优化包的体积。
## 四、总结
到上面一部分，我们就差不多搞清楚 Vue3 中全局异常处理的核心逻辑了。我们在开发自己的错误处理方法时，也可以考虑这几个核心点：

1. 支持同步和异步的异常处理；
1. 设置业务错误码、业务错误信息；
1. 支持自定义错误处理方法；
1. 支持开发环境错误提示；
5. 支持 Tree Shaking。

这几点在你设计插件的时候，都可以考虑进去的~