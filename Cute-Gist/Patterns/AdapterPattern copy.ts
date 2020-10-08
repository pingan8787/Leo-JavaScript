/**
 * DEMO1: 类适配器实现
 */
interface Target {
    request(): void;
}

// 角色：被适配者
class Adaptee {
    constructor() { }
    public specificRequest(): void {
        console.log("被适配者方法被执行！");
    }
}

// 角色：适配器
class Adapter extends Adaptee implements Target {
    constructor() {
        super();
    }
    public request(): void {
        super.specificRequest();
    }
}
const target: Target = new Adapter();
target.request();
// 被适配者方法被执行！


/**
 * DEMO2 对象适配器实现
 */
interface Target {
    request(): void;
}

// 角色：被适配者
class Adaptee {
    constructor() { }
    public specificRequest(): void {
        console.log("被适配者方法被执行！");
    }
}

// 角色：适配器
class Adapter implements Target {
    private adaptee: Adaptee;
    constructor(adaptee: Adaptee) {
        this.adaptee = adaptee;
    }
    public request(): void {
        this.adaptee.specificRequest();
    }
}
const target: Target = new Adapter(new Adaptee());
target.request();
// 被适配者方法被执行！


/**
 * DEMO3 接口适配器实现
 */
interface Adaptee {
    operation1(): void;
    operation2(): void;
}

abstract class AbsAdapter implements Adaptee {
    public operation1(): void { };
    public operation2(): void { };
}

class UseClass extends AbsAdapter {
    public operation1(): void { };  // 重写需要适配的方法
}