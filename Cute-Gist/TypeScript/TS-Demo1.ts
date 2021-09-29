// Type Alias（类型别名）
type Point = {
    x: number;
    y: number;
  };
  
  // 接口
  interface Person {
    name: {
      firstName: string;
      lastName: string;
    };
    age: number;
  }
  
  // 扩展原有的接口
  interface NamedPoint extends Point {
    name: string;
  }
  
  const xname = "x";
  // 'xname' refers to a value, but is being used as a type here. Did you mean 'typeof xname'
  type XTName = "x";
  type XT = Point[XTName];
  
  let p1 = {
    x: 0,
    y: 0,
  };
  
  let p3 = {
    x: 0,
    y: 0,
    z: 0,
  };
  
  p1 = p3;
  
  // Structural Type System
  class A {}
  class B {}
  
  let a: A = new B();
  let b: B = new A();
  
  // Union Type
  // 由两个或两个以上的类型组成，变量的类型只能是多个中其中的一个
  type AB = "A" | "B";
  type AZ = "A" | "B" | "C" | "D";
  
  // Lookup Type
  type XType = Point["x"];
  type FType = Person["name"]["firstName"];
  
  type People = Array<Person>;
  type PersonAlias = People[0];
  
  // Mapped Type
  // sub(add(2,3),1)
  // Type Computed
  type MyPartial<T> = {
    [K in keyof T]?: T[K];
  };
  type MyRequired<T> = {
    [K in keyof T]?: T[K];
  };
  type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
  };
  type PartialPoint = MyReadonly<MyRequired<MyPartial<Point>>>;
  type PartialPerson = MyReadonly<Person>;
  
  let p2: NamedPoint = {
    name: "center",
    x: 100,
    y: 100,
  };
  
  type AType = string[];
  // keyof 返回的是一个联合类型
  type ArrayKeys = keyof AType;
  
  // Index Type
  type Obs = {
    [n: string]: boolean;
  };
  
  type Obn = {
    [n: number]: boolean;
  };
  
  // 0
  // "0"
  // type ObsKeys = string | number
  type ObsKeys = keyof Obs;
  // type ObnKeys = number
  type ObnKeys = keyof Obn;
  
  // typeof p2 === "object" && typeof p2.x === "number" && typeof p2.y === "number"
  p1 = p2;
  
  // typeof p1 === "object" && typeof p1.x === "number" && typeof p1.y === "number" && typeof p1.name === "string"
  p2 = p1;
  
  // <T>：定义泛型变量，可以定义多个，每个变量之间使用逗号作为分隔
  // 相比函数参数列表的区别是（a, b, c）<A, B, C>，T => Type, U, Args
  // add(2, 3); add(3, 4)
  // const add = (a, b) => a + b
  // TypeName<T>：工厂函数，这个工厂函数的作用是生成类型，输入的类型，类型变量
  type TypeName<T> = T extends string
    ? "string"
    : T extends number
    ? "number"
    : T extends boolean // boolean => true | false => true extends true | fasle
    ? "boolean"
    : T extends undefined
    ? "undefined"
    : T extends Function
    ? "function"
    : "object";
  
  // "a" 字面量类型
  // type MyBoolean = true | false
  type T0 = TypeName<string>; // "string"
  type T1 = TypeName<"a">; // "string"
  type T2 = TypeName<true>; // "boolean"
  type T3 = TypeName<() => void>; // "function"
  type T4 = TypeName<string[]>; // "object"
  
  // 分布条件类型
  // T extends U ? X : Y
  // A | B | C for T is resolved as (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
  // TypeName<string> | TypeName<(() => void)> => "string" | "function"
  type T10 = TypeName<string | (() => void)>; // "string" | "function"
  // TypeName<string> | TypeName<string[]> | TypeName<undefined>
  type T12 = TypeName<string | string[] | undefined>; // "string" | "object" | "undefined"
  type T11 = TypeName<string[] | number[]>; // "object"
  
  type BoxedValue<T> = { value: T };
  type BoxedArray<T> = { array: T[] };
  type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;
  
  // type T20 = { value: string; }
  type T20 = Boxed<string>; // BoxedValue<string>;
  type T21 = Boxed<number[]>; // BoxedArray<number>;
  type T22 = Boxed<string | number[]>; // BoxedValue<string> | BoxedArray<number>;
  