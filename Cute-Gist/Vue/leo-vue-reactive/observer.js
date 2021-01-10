class Observer {
    constructor (data) {
        this.data = data;
        this.walk(data);
    }

    // [核心方法]将 data 对象转换为响应式对象，为每个 data 属性设置 getter 和 setter 方法
    walk (data) {
        if (typeof data !== 'object') return data;
        Object.keys(data).forEach( key => {
            this.defineReactive(data, key, data[key])
        })

    }

    // [核心方法]实现数据劫持
    defineReactive (obj, key, value) {
        this.walk(value);  // [核心过程]遍历 walk 方法，处理深层对象。
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                console.log('[getter]方法执行')
                Dep.target &&  dep.addSub(Dep.target)
                return value
            },
            set (newValue) {
                console.log('[setter]方法执行')
                if (value === newValue) return;
                // [核心过程]当设置的新值 newValue 为对象，则继续通过 walk 方法将其转换为响应式对象
                if (typeof newValue === 'object') this.walk(newValue);
                value = newValue;
                dep.notify(); // [核心过程]执行被观察者通知方法，通知所有观察者执行 update 更新
            }
        })
    }
}
