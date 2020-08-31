interface Single {
    [key: string]: any
}
class Singleton {
    private constructor() { }
    private static instance: Single;

    public static getInstance(): Single {
        if (!this.instance) {
            this.instance = new Singleton();
        }
        return this.instance;
    }

    public singletonOperation(): void {
        console.log("hello Singleton Patterns!")
    }
}

const leo: Single = Singleton.getInstance();
console.log("leo:", leo)
leo.singletonOperation();