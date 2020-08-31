const {SyncHook, AsyncParallelHook} = require("tapable");

module.exports = class Compiler {
	constructor() {
		this.hooks = {
			leoHook: new SyncHook(),
			pinganHook: new SyncHook(["arg"]),
			robinHook: new AsyncParallelHook(["robin1", "robin2", "robin3"])
		};
    }
    run (){
        this.runLeo();
        this.runPingan(99);
        this.runRobin("leo1", "leo2", "leo3");
    }

    runLeo () {
        this.hooks.leoHook.call();
    }

    runPingan (num) {
        this.hooks.pinganHook.call(num);
    }

    runRobin (){
        this.hooks.robinHook.promise(...arguments).then(
            () => {
                console.log("robinHook success~");
            },
            err => {
                console.log("robinHook error:", err);
            }
        )
    }
}