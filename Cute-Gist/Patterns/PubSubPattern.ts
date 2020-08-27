// 详细 https://juejin.im/post/6862803836781002760

interface Publisher {
    subscriber: string;
    data: any;
}

interface EventChannel {
    on: (subscriber: string, callback: () => void) => void;
    off: (subscriber: string, callback: () => void) => void;
    emit: (subscriber: string, data: any) => void;
}

interface Subscriber {
    subscriber: string;
    callback: () => void;
}

class ConcreteEventChannel implements EventChannel {
    // 初始化订阅者对象
    private subjects: { [key: string]: Function[] } = {};

    // 实现添加订阅事件
    public on(subscriber: string, callback: () => void): void {
        console.log(`收到订阅信息，订阅事件：${subscriber}`);
        if (!this.subjects[subscriber]) {
            this.subjects[subscriber] = [];
        }
        this.subjects[subscriber].push(callback);
    };

    // 实现取消订阅事件
    public off(subscriber: string, callback: () => void): void {
        console.log(`收到取消订阅请求，需要取消的订阅事件：${subscriber}`);
        if (callback === null) {
            this.subjects[subscriber] = [];
        } else {
            const index: number = this.subjects[subscriber].indexOf(callback);
            ~index && this.subjects[subscriber].splice(index, 1);
        }
    };

    // 实现发布订阅事件
    public emit(subscriber: string, data = null): void {
        console.log(`收到发布者信息，执行订阅事件：${subscriber}`);
        this.subjects[subscriber].forEach(item => item(data));
    };
}

class ConcretePublisher implements Publisher {
    public subscriber: string = "";
    public data: any;
    constructor(subscriber: string, data: any) {
        this.subscriber = subscriber;
        this.data = data;
    }
}

class ConcreteSubscriber implements Subscriber {
    public subscriber: string = "";
    constructor(subscriber: string, callback: () => void) {
        this.subscriber = subscriber;
        this.callback = callback;
    }
    public callback(): void { };
}


/* 运行示例 */
const pingan8787 = new ConcreteSubscriber(
    "running",
    () => {
        console.log("订阅者 pingan8787 订阅事件成功！执行回调~");
    }
);

const leo = new ConcreteSubscriber(
    "swimming",
    () => {
        console.log("订阅者 leo 订阅事件成功！执行回调~");
    }
);

const lisa = new ConcreteSubscriber(
    "swimming",
    () => {
        console.log("订阅者 lisa 订阅事件成功！执行回调~");
    }
);

const pual = new ConcretePublisher(
    "swimming",
    { message: "pual 发布消息~" }
);

const eventBus = new ConcreteEventChannel();
eventBus.on(pingan8787.subscriber, pingan8787.callback);
eventBus.on(leo.subscriber, leo.callback);
eventBus.on(lisa.subscriber, lisa.callback);

// 发布者 pual 发布 "swimming"相关的事件
eventBus.emit(pual.subscriber, pual.data);
eventBus.off(lisa.subscriber, lisa.callback);
eventBus.emit(pual.subscriber, pual.data);

/*
输出结果：
[LOG]: 收到订阅信息，订阅事件：running
[LOG]: 收到订阅信息，订阅事件：swimming
[LOG]: 收到订阅信息，订阅事件：swimming
[LOG]: 收到发布者信息，执行订阅事件：swimming
[LOG]: 订阅者 leo 订阅事件成功！执行回调~
[LOG]: 订阅者 lisa 订阅事件成功！执行回调~
[LOG]: 收到取消订阅请求，需要取消的订阅事件：swimming
[LOG]: 收到发布者信息，执行订阅事件：swimming
[LOG]: 订阅者 leo 订阅事件成功！执行回调~
*/