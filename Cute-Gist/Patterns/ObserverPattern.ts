// ObserverPattern.ts
// 详细介绍 https://juejin.im/post/6862112623417098248

interface Subject {
    addObserver: (observer: Observer) => void;
    deleteObserver: (observer: Observer) => void;
    notifyObservers: () => void;
}

interface Observer {
    notify: () => void;
}

class ConcreteSubject implements Subject {
    private observers: Observer[] = [];

    public addObserver(observer: Observer): void {
        console.log(observer, " is pushed~~");
        this.observers.push(observer);
    }

    public deleteObserver(observer: Observer): void {
        console.log(observer, " have deleted~~");
        const idx: number = this.observers.indexOf(observer);
        ~idx && this.observers.splice(idx, 1);
    }

    public notifyObservers(): void {
        console.log("notify all the observers ", this.observers);
        this.observers.forEach(observer => {
            // 调用 notify 方法时可以携带指定参数
            observer.notify();
        });
    }
}

class ConcreteObserver implements Observer {
    constructor(private name: string) { }

    notify(): void {
        // 可以处理其他逻辑
        console.log(`${this.name} has been notified.`);
    }
}

function useObserver(): void {
    const subject: Subject = new ConcreteSubject();
    const Leo = new ConcreteObserver("Leo");
    const Robin = new ConcreteObserver("Robin");
    const Pual = new ConcreteObserver("Pual");
    const Lisa = new ConcreteObserver("Lisa");

    subject.addObserver(Leo);
    subject.addObserver(Robin);
    subject.addObserver(Pual);
    subject.addObserver(Lisa);
    subject.notifyObservers();

    subject.deleteObserver(Pual);
    subject.deleteObserver(Lisa);
    subject.notifyObservers();
}

useObserver();
