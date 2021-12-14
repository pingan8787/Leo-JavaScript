/**
 * 学习资料：
 * https://juejin.cn/post/6844904182843965453
 */

/**
 * 1. 类装饰器
 * declare type ClassDecorator = <TFunction extends Function>(
 *   target: TFunction
 * ) => TFunction | void;
 * 
 * @param target: TFunction - 被装饰的类 
 */
function Greeter(target: Function): void {
    target.prototype.greet = function (): void {
        console.log("Hello Leo!");
    };
}

@Greeter
class Greeting {
    constructor() { }
}

let myGreeting = new Greeting();
myGreeting.greet(); // Hello Leo!

/**
 * 类装饰器 - 支持传参
 */

function Greeter1(greeting: string) {
    return function (target: Function) {
        target.prototype.greet = function (): void {
            console.log(greeting);
        };
    };
}

@Greeter1("Hello TS!")
class Greeting1 {
    constructor() {
        // 内部实现
    }
}

let myGreeting1 = new Greeting1();
myGreeting1.greet(); // console output: 'Hello TS!';

/**
 * 2. 属性装饰器
 * declare type PropertyDecorator = (target:Object, 
 *  propertyKey: string | symbol ) => void;
 * @param target : Object - 被装饰的类
 * @param key : string | symbol - 被装饰类的属性名
 */
function logProperty(target: any, key: string) {
    delete target[key];

    const backingField = "_" + key;

    Object.defineProperty(target, backingField, {
        writable: true,
        enumerable: true,
        configurable: true
    });

    // property getter
    const getter = function (this: any) {
        const currVal = this[backingField];
        console.log(`Get: ${key} => ${currVal}`);
        return currVal;
    };

    // property setter
    const setter = function (this: any, newVal: any) {
        console.log(`Set: ${key} => ${newVal}`);
        this[backingField] = newVal;
    };

    // Create new property with getter and setter
    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

class Person {
    @logProperty
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const p1 = new Person("pingan8787");
p1.name = "leo";

/**
 * 3. 方法装饰器
 * declare type MethodDecorator = <T>(target:Object, propertyKey: string | symbol, 	 	
 *  descriptor: TypePropertyDescript<T>) => TypedPropertyDescriptor<T> | void;

 * @param target : Object - 被装饰的类
 * @param key : string | symbol - 方法名
 * @param descriptor : TypePropertyDescript - 属性描述符
 */
function LogOutput(target: Function, key: string, descriptor: any) {
    let originalMethod = descriptor.value;
    let newMethod = function (...args: any[]): any {
        let result: any = originalMethod.apply(this, args);
        if (!this.loggedOutput) {
            this.loggedOutput = new Array<any>();
        }
        this.loggedOutput.push({
            method: key,
            parameters: args,
            output: result,
            timestamp: new Date()
        });
        return result;
    };
    descriptor.value = newMethod;
}

class Calculator {
    @LogOutput
    double(num: number): number {
        return num * 2;
    }
}

let calc = new Calculator();
calc.double(11);
// console ouput: [{method: "double", output: 22, ...}]
console.log(calc.loggedOutput);


/**
 * 4. 参数装饰器
 * declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, 
 *  parameterIndex: number ) => void
 * @param target : Object - 被装饰的类
 * @param key : string | symbol - 方法名
 * @param parameterIndex : number - 方法中参数的索引值
 */
function Log(target: Function, key: string, parameterIndex: number) {
    let functionLogged = key || target.prototype.constructor.name;
    console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
      been decorated`);
}

class Greeter3 {
    greeting: string;
    constructor(@Log phrase: string) {
        this.greeting = phrase;
    }
}

  // console output: The parameter in position 0 
  // at Greeter3 has been decorated
