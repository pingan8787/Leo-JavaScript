// 文章介绍 https://juejin.im/post/6844904133519114253
// https://refactoringguru.cn/design-patterns/builder/typescript/example


/**
 * DEMO1
 */
interface Builder {
    buildPartA(): void;
    buildPartB(): void;
    buildPartC(): void;
    buildProduct() : void;
}

class ConcreteBuilder implements Builder {
  private product : Product;
  constructor(){
    this.reset();
  }

  public reset(): void{
    this.product = new Product();
  }

  public buildPartA(): void {
    this.product.parts.push('PartA');
  };
  public buildPartB(): void {
    this.product.parts.push('PartB');
  };
  public buildPartC(): void {
    this.product.parts.push('PartC');
  };
  public buildProduct(): Product{
    const result = this.product;
    this.reset();
    return result;
  }
}

class Product {
  public parts: string[] = [];
  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(', ')}\n`);
  }
}

class Director {
  private builder : Builder;
  public setBuilder(builder: Builder): void{
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.buildPartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.buildPartA();
    this.builder.buildPartB();
    this.builder.buildPartC();
  }
}


function clinetCode(director: Director){
  const builder = new ConcreteBuilder();
  director.setBuilder(builder);

  director.buildMinimalViableProduct();
  builder.buildProduct().listParts();

  director.buildFullFeaturedProduct();
  builder.buildProduct().listParts();

  builder.buildPartA();
  builder.buildPartB();
  builder.buildProduct().listParts();
}

const director = new Director();
clinetCode(director);


/**
 * DEMO2
 */
class Car {
  constructor(
    public engine: string,
    public chassis: string, 
    public body: string
  ) {}
}

class CarBuilder {
  engine!: string;  // 引擎
  chassis!: string; // 底盘
  body!: string;    // 车身

  addChassis(chassis: string) {
    this.chassis = chassis;
    return this;
  }

  addEngine(engine: string) {
    this.engine = engine;
    return this;
  }

  addBody(body: string) {
    this.body = body;
    return this;
  }

  build() {
    return new Car(this.engine, this.chassis, this.body);
  }
}