interface Strategy<T> {
    execute(data: T): T
}

class Leo1ConcreteStrategy implements Strategy<number> {
    public execute(data: number): number {
        console.log("Leo1ConcreteStrategy data:", data);
        return data * 2;
    }
}

class Leo2ConcreteStrategy implements Strategy<number> {
    public execute(data: number): number {
        console.log("Leo2ConcreteStrategy data:", data);
        return data * 10;
    }
}

class Context {
    private strategy!: Strategy<any>;

    public setStrategy(strategy: Strategy<any>) {
        this.strategy = strategy;
    }

    public doSomething(data: number): number {
        return this.strategy.execute(data);
    }
}

const context = new Context();
context.setStrategy(new Leo1ConcreteStrategy());
console.log(context.doSomething(10))

context.setStrategy(new Leo2ConcreteStrategy());
console.log(context.doSomething(100))