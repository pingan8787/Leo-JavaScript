/**
 * DEMO1
 */

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

/**
 * DEMO2
 */
interface Strategy {
    authenticate(...args: any): any;
  }
  
  class Authenticator {
    strategy: any;
    constructor() {
      this.strategy = null;
    }
  
    setStrategy(strategy: any) {
      this.strategy = strategy;
    }
  
    authenticate(...args: any) {
      if (!this.strategy) {
        console.log('尚未设置认证策略');
        return;
      }
      return this.strategy.authenticate(...args);
    }
  }
  
  class WechatStrategy implements Strategy {
    authenticate(wechatToken: string) {
      if (wechatToken !== '123') {
        console.log('无效的微信用户');
        return;
      }
      console.log('微信认证成功');
    }
  }
  
  class LocalStrategy implements Strategy {
    authenticate(username: string, password: string) {
      if (username !== 'abao' && password !== '123') {
        console.log('账号或密码错误');
        return;
      }
      console.log('账号和密码认证成功');
    }
  }
  
  const auth = new Authenticator();
  
  auth.setStrategy(new WechatStrategy());
  auth.authenticate('123456');
  
  auth.setStrategy(new LocalStrategy());
  auth.authenticate('abao', '123');