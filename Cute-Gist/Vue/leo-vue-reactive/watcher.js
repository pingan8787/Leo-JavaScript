class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify(data) {
        this.subs.forEach(sub => sub.update(data));
    }
}
// 实现观察者类
class Watcher {
    constructor (vm, key, cb) {
        this.vm = vm;   // vm：表示当前实例
        this.key = key; // key：表示当前操作的数据名称
        this.cb = cb;   // cb：表示数据发生改变之后的回调

        Dep.target = this;
        this.oldValue = this.vm.$data[key]; // 保存变化的数据作为旧值，后续做判断是否更新
        Dep.target = null;
    }
    
    update () {
        console.log(`数据发生变化！`);
        let oldValue = this.oldValue;
        let newValue = this.vm.$data[this.key];
        if (oldValue != newValue) {  // 比较新旧值，发生变化才执行回调
            this.cb(newValue, oldValue);
        };
    }
}