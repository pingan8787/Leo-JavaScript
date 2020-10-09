class AbstractClass {
    public method1(): void { }
    public method2(): void { }
    public method3(): void { }
    public templateMethod(): void {
        console.log("模版方法被执行！");
        this.method1();
        this.method2();
        this.method3();
    }
}

class ConcreteClass extends AbstractClass {
    public method1(): void {
        console.log("method1 方法被执行！");
    }
    public method2(): void {
        console.log("method2 方法被执行！");
    }
    public method3(): void {
        console.log("method3 方法被执行！");
    }
}

const m: ConcreteClass = new ConcreteClass();
m.templateMethod()