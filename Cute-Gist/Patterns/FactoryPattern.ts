/**
 * 简单工厂模式
 * 核心：通过 if/else switch/case 来创建不同子类
 */
abstract class HuaweiPhone {
    abstract produce(): void;
}

class HuaweiP10 extends HuaweiPhone {
    produce(): void {
        console.log("生产华为 P10 手机。");
    }
}
class HuaweiP40 extends HuaweiPhone {
    produce(): void {
        console.log("生产华为 P40 手机。");
    }
}

class HuaweiFactory {
    public static producePhone(model: 'P10' | 'P40'): HuaweiPhone {
        if (model == 'P10') {
            return new HuaweiP10();
        } else {
            return new HuaweiP40();
        }
    }
}

const P10 = HuaweiFactory.producePhone('P10');
const P40 = HuaweiFactory.producePhone('P40');
P10.produce();
P40.produce();


/**
 * 工厂方法模式
 */
abstract class HuaweiPhone {
    abstract produce(): void;
}

class HuaweiP10 extends HuaweiPhone {
    produce(): void {
        console.log("生产华为 P10 手机。");
    }
}
class HuaweiP40 extends HuaweiPhone {
    produce(): void {
        console.log("生产华为 P40 手机。");
    }
}

abstract class HuaweiFactory {
    abstract producePhone(): HuaweiPhone;
}

class HuaweiP10Factory extends HuaweiFactory {
    public producePhone(): HuaweiPhone {
        return new HuaweiP10();
    }
}

class HuaweiP40Factory extends HuaweiFactory {
    public producePhone(): HuaweiPhone {
        return new HuaweiP40();
    }
}

const P10Factory = new HuaweiP10Factory();
const P40Factory = new HuaweiP40Factory();
const P10 = P10Factory.producePhone();
const P40 = P40Factory.producePhone();
P10.produce();
P40.produce();


/**
 * 抽象工厂模式
 */
abstract class HuaweiPhone {
    abstract produce(): void;
}

class HuaweiP10 extends HuaweiPhone {
    produce(): void {
        console.log("生产华为 P10 手机。");
    }
}
class HuaweiP40 extends HuaweiPhone {
    produce(): void {
        console.log("生产华为 P40 手机。");
    }
}

abstract class HuaweiFactory {
    abstract produceP10(): HuaweiPhone;
    abstract produceP40(): HuaweiPhone;
}

class ConcreteFactory extends HuaweiFactory {
    produceP10(): HuaweiPhone {
        return new HuaweiP10();
    }
    produceP40(): HuaweiPhone {
        return new HuaweiP40();
    }
}

const huaweiFactory = new ConcreteFactory();
const P10 = huaweiFactory.produceP10();
const P40 = huaweiFactory.produceP40();
P10.produce();
P40.produce();