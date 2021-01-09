"use strict";
// 实现被观察者类
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
    constructor(cb) {
        this.cb = cb;
    }
    update(data) {
        this.cb(data);
        console.log(`数据发生变化！`);
    }
}

// 实现响应式类（最简单单层的对象，暂不考虑深层对象）
class Observer {
    constructor(node, data) {
        this.defineReactive(node, data)
    }

    // 实现数据劫持（核心方法）
    // 遍历 data 中所有的数据，都添加上 getter 和 setter 方法
    defineReactive(vm, obj) {
        //每一个属性都重新定义get、set
        for (let key in obj) {
            let value = obj[key];
            let dep = new Dep();
            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get() {
                    let watcher = new Watcher(v => vm.innerText = v);
                    dep.addSub(watcher);
                    return value;
                },
                set(newValue) {
                    value = newValue;
                    dep.notify(newValue);
                }
            })
        }
    }
}


// 初始化测试数据
let initData = {
    text: '你好，前端自习课',
    desc: '每日清晨，享受一篇前端优秀文章。'
};

const app = document.querySelector('#app');

// 步骤1：为测试数据转换为响应式对象
new Observer(app, initData);

// 步骤2：初始化页面文本内容
app.innerText = initData.text;

// 步骤3：绑定按钮事件，点击触发测试
document.querySelector('#update').addEventListener('click', function () {
    initData.text = `我们必须经常保持旧的记忆和新的希望。`;
    console.log(`当前时间：${new Date().toLocaleString()}`)
})
