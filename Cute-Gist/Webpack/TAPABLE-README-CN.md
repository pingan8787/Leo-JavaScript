# Tapable

Tapable 包公开了许多 Hook 类，可用于为插件创建钩子。

``` javascript
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");
```

## 安装

``` shell
npm install --save tapable
```

## 使用

所有 Hook 构造函数都采用一个可选参数，即作为字符串的参数名称列表。

``` js
const hook = new SyncHook(["arg1", "arg2", "arg3"]);
```

最佳实践是在 `hooks` 属性中公开类的所有钩子：

``` js
class Car {
	constructor() {
		this.hooks = {
			accelerate: new SyncHook(["newSpeed"]),
			brake: new SyncHook(),
			calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
		};
	}

	/* ... */
}
```

其他人现在可以使用这些钩子：:

``` js
const myCar = new Car();

// Use the tap method to add a consument
myCar.hooks.brake.tap("WarningLampPlugin", () => warningLamp.on());
```

需要传递一个名称来标识 **插件** /**原因**。 

您可能会收到参数：

``` js
myCar.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));
```

对于同步钩子，使用 `tap` 函数是添加插件的唯一有效方法。异步钩子也支持异步插件：

``` js
myCar.hooks.calculateRoutes.tapPromise("GoogleMapsPlugin", (source, target, routesList) => {
	// return a promise
	return google.maps.findRoute(source, target).then(route => {
		routesList.add(route);
	});
});
myCar.hooks.calculateRoutes.tapAsync("BingMapsPlugin", (source, target, routesList, callback) => {
	bing.findRoute(source, target, (err, route) => {
		if(err) return callback(err);
		routesList.add(route);
		// call the callback
		callback();
	});
});

// You can still use sync plugins
myCar.hooks.calculateRoutes.tap("CachedRoutesPlugin", (source, target, routesList) => {
	const cachedRoute = cache.get(source, target);
	if(cachedRoute)
		routesList.add(cachedRoute);
})
```
声明这些钩子的类需要调用它们：

``` js
class Car {
	/**
	  * You won't get returned value from SyncHook or AsyncParallelHook,
	  * to do that, use SyncWaterfallHook and AsyncSeriesWaterfallHook respectively
	 **/

	setSpeed(newSpeed) {
		// following call returns undefined even when you returned values
		this.hooks.accelerate.call(newSpeed);
	}

	useNavigationSystemPromise(source, target) {
		const routesList = new List();
		return this.hooks.calculateRoutes.promise(source, target, routesList).then((res) => {
			// res is undefined for AsyncParallelHook
			return routesList.getRoutes();
		});
	}

	useNavigationSystemAsync(source, target, callback) {
		const routesList = new List();
		this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
			if(err) return callback(err);
			callback(null, routesList.getRoutes());
		});
	}
}
```

Hook 将以最有效的方式编译一个方法来运行你的插件。它根据以下条件生成代码：
* 已注册插件的数量(none, one, many)
* 注册插件的种类(sync, async, promise)
* 使用的调用方法(sync, async, promise)
* 参数的数量
* 是否使用拦截

这确保了最快的执行速度。

## Hook 类型

每个挂钩都可以使用一种或多种功能。它们的执行方式取决于钩子类型：

* Basic hook (名称中没有 “Waterfall”, “Bail” or “Loop”)。这个钩子简单地调用它连续点击的每个函数。

* __Waterfall__. waterfall （瀑布）钩子会连续调用每个被点击的函数。与基本钩子不同，它将每个函数的返回值传递给下一个函数。

* __Bail__. bail 钩子允许提前退出。当任何被点击的函数返回任何内容时，保释钩将停止执行剩余的函数。

* __Loop__. 当循环钩子中的插件返回非未定义值时，钩子将从第一个插件重新启动。它将循环直到所有插件都返回 undefined。

此外，钩子可以是同步的或异步的。为了反映这一点，有“Sync”、“AsyncSeries”和“AsyncParallel”钩子类：

* __Sync__. 同步钩子只能用同步函数（使用 `myHook.tap()`）来点击。
* 
* __AsyncSeries__. 异步系列挂钩可以与同步、基于回调和基于承诺的函数（使用 `myHook.tap()`、`myHook.tapAsync()`和`myHook.tapPromise()`）一起使用。他们连续调用每个异步方法。

* __AsyncParallel__. 异步并行钩子也可以与同步、基于回调和基于承诺的函数（使用`myHook.tap()`、`myHook.tapAsync()`和`myHook.tapPromise()`）一起使用。但是，它们并行运行每个异步方法。

钩子类型反映在它的类名中。例如，`AsyncSeriesWaterfallHook` 允许异步函数并串联运行它们，将每个函数的返回值传递给下一个函数。


## 拦截

所有 Hooks 都提供了额外的拦截 API：

``` js
myCar.hooks.calculateRoutes.intercept({
	call: (source, target, routesList) => {
		console.log("Starting to calculate routes");
	},
	register: (tapInfo) => {
		// tapInfo = { type: "promise", name: "GoogleMapsPlugin", fn: ... }
		console.log(`${tapInfo.name} is doing its job`);
		return tapInfo; // may return a new tapInfo object
	}
})
```

**call** :`(...args) => void`添加`call`到你的拦截器会在钩子被触发时触发。您可以访问 `hooks` 参数。

**tap**：`(tap: Tap) => void`添加`tap`到拦截器将在插件点击钩子时触发。提供的是`Tap`对象。Tap对象无法更改。

**loop**：`(...args) => void`添加`loop`到拦截器将触发循环钩子的每个循环。

**register**：`(tap: Tap) => Tap | undefined`添加`register`到您的拦截器将触发每个添加`Tap`并允许修改它。

## 上下文

插件和拦截器可以选择访问可选`context`对象，该对象可用于将任意值传递给后续插件和拦截器。

``` js
myCar.hooks.accelerate.intercept({
	context: true,
	tap: (context, tapInfo) => {
		// tapInfo = { type: "sync", name: "NoisePlugin", fn: ... }
		console.log(`${tapInfo.name} is doing it's job`);

		// `context` starts as an empty object if at least one plugin uses `context: true`.
		// If no plugins use `context: true`, then `context` is undefined.
		if (context) {
			// Arbitrary properties can be added to `context`, which plugins can then access.
			context.hasMuffler = true;
		}
	}
});

myCar.hooks.accelerate.tap({
	name: "NoisePlugin",
	context: true
}, (context, newSpeed) => {
	if (context && context.hasMuffler) {
		console.log("Silence...");
	} else {
		console.log("Vroom!");
	}
});
```

## HookMap

HookMap 是带有钩子的 Map 的辅助类

``` js
const keyedHook = new HookMap(key => new SyncHook(["arg"]))
```

``` js
keyedHook.for("some-key").tap("MyPlugin", (arg) => { /* ... */ });
keyedHook.for("some-key").tapAsync("MyPlugin", (arg, callback) => { /* ... */ });
keyedHook.for("some-key").tapPromise("MyPlugin", (arg) => { /* ... */ });
```

``` js
const hook = keyedHook.get("some-key");
if(hook !== undefined) {
	hook.callAsync("arg", err => { /* ... */ });
}
```

## Hook/HookMap 接口

Public:

``` ts
interface Hook {
	tap: (name: string | Tap, fn: (context?, ...args) => Result) => void,
	tapAsync: (name: string | Tap, fn: (context?, ...args, callback: (err, result: Result) => void) => void) => void,
	tapPromise: (name: string | Tap, fn: (context?, ...args) => Promise<Result>) => void,
	intercept: (interceptor: HookInterceptor) => void
}

interface HookInterceptor {
	call: (context?, ...args) => void,
	loop: (context?, ...args) => void,
	tap: (context?, tap: Tap) => void,
	register: (tap: Tap) => Tap,
	context: boolean
}

interface HookMap {
	for: (key: any) => Hook,
	intercept: (interceptor: HookMapInterceptor) => void
}

interface HookMapInterceptor {
	factory: (key: any, hook: Hook) => Hook
}

interface Tap {
	name: string,
	type: string
	fn: Function,
	stage: number,
	context: boolean,
	before?: string | Array
}
```

受保护（仅适用于包含钩子的类）：

``` ts
interface Hook {
	isUsed: () => boolean,
	call: (...args) => Result,
	promise: (...args) => Promise<Result>,
	callAsync: (...args, callback: (err, result: Result) => void) => void,
}

interface HookMap {
	get: (key: any) => Hook | undefined,
	for: (key: any) => Hook
}
```

## MultiHook

一个类似于 Hook 的辅助类，用于将点击重定向到多个其他钩子：

``` js
const { MultiHook } = require("tapable");

this.hooks.allHooks = new MultiHook([this.hooks.hookA, this.hooks.hookB]);
```
