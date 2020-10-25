// 参考文章：https://blog.csdn.net/kuangshp128/article/details/98489691

// 类装饰器
function classDecorator(target: any) {
    console.log(target)
    return class extends target {
        public age: number = 15;
        say() {
            console.log("hello leo!")
        }
    }
}

@classDecorator
class Leo {
    public name: string = 'leo';
}

let leo = new Leo();
console.log(leo.age); //15
leo.say(); //  "hello leo!" 

// 类装饰器工厂
function classDecorator2(params: any) {
    return function (target: any) {
        target.prototype.desc = params
    }
}

@classDecorator2("hello leo!")
class Leo2 {
}

let leo2 = new Leo2()
console.log(leo2.desc); // "hello leo!" 

// 方法装饰器 - 拦截方法执行
function funDecorator(params: any, key: any, descriptor: any) {
    let method = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
        args = args.map(it => it + 1);
        method.apply(this, args);
    }
}

class Leo3 {
    @funDecorator
    say(n1: number, n2: number) {
        console.log(n1, n2)
    }
}
// let leo3 = new Leo3();
// leo3.say(11,22); // 12,  23 


// 参数装饰器
function funParams(params: any) {
    return function (target: any, key: any, index: any) {
        console.log(target, key, index)
        target.name = 'leo'
    }
}

class Leo4 {
    say(@funParams(3) n1: number) {
        console.log(n1)
    }
}
let leo4 = new Leo4()
leo4.say(11); // 11 
console.log(leo4.name) // "leo" 
