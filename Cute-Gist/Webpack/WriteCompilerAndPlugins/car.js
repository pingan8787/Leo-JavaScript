const { SyncHook, AsyncParallelHook } = require("tapable");
class User {
	constructor() {
		this.hooks = {
			leoHook: new SyncHook(),
			pinganHook: new SyncHook(["arg"]),
			robinHook: new AsyncParallelHook(["robin1", "robin2", "robin3"])
		};
	}
}

const myUser = new User();
myUser.hooks.leoHook.tap("leoHookPlugin", () => console.log("leoHookPlugin"));
myUser.hooks.pinganHook.tap("pinganHookPlugin", arg => console.log("pinganHookPlugin:", arg));
myUser.hooks.robinHook.tapPromise("robinHookPlugin", (arg1, arg2, arg3) => {
	return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("robinHookPlugin tapPromise: ", arg1, arg2, arg3);
            resolve();
        }, 1000);
    })
});

myUser.hooks.leoHook.call();
myUser.hooks.pinganHook.call(99);
myUser.hooks.robinHook.promise("leo1", "leo2", "leo3").then(
    () => {
        console.log("robinHook success~");
    },
    err => {
        console.log("robinHook error:", err);
    }
)