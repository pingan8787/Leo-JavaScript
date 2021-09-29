type Head<T extends any[]> = T extends [] ? never : T[0]
type FirstElement = Head<[1,2, 3]>;

// inference=> infer，定义一个类型变量
type Tail<T extends any[]> = T extends [head: any, ...tail: infer Rest] ? Rest : never;
type Tails = Tail<[1,2, 3]>;

// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
type Fn = (a: number, b: number) => number
type RFn = ReturnType<Fn>

type Length<T extends any[]> = T["length"]
type Size = Length<[1,2, 3]>;

type NaiveFlat<T extends any[]> = {
  [P in keyof T]: T[P] extends any[] ? T[P][number] : T[P]
}[number]

// "0", "1", "2"
// 测试用例：
// number: 0 | 1 | 2 | 3 | ....
type Native = [['a'], ['b', 'c'], ['d']]
// 0 -> ['a']
type E = ['b', 'c'][number]
type First = Native[0]
// 1- > ['b', 'c']
type Second = Native[1]
// 2- > ['d']
type Third = Native[2]
type NativeKeys = keyof Native

type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// "a" | "b" | "c" | "d"

type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepFlat<T extends any[]> = {
 [K in keyof T]: T[K] extends any[] ? DeepFlat<T[K]> : T[K]
}[number]
type DeepTestResult = DeepFlat<Deep>  

// Structual Type System
// 类型兼容性
type Point = {
  x: number;
  y: number;
}

class A { 
  constructor(public name: string) {}
}

class B {
  constructor(public name: string) {}
}

let a: A = new B("TS")

// TS check
// typeof p === "object" && typeof p.x === "number" && typeof p.y === "number" 
let point: Point = { x: 1, y: 2 }

// typeof p === "object" && typeof p.x === "number" && typeof p.y === "number" && typeof p.name === "string"
let namedPoint: NamedPoint = { x: 1, y: 2, name: "point"}
point = namedPoint
// namedPoint = point

type NamedPoint = Simplify<Point & {
  name: string
}>

type Simplify<T> = {
  [P in keyof T]: T[P]
}

type User = {
  id: number;
  kind: string;
};

// T assignable User
// NamedPoint is assignable Point
function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T', 
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    ...u,
    id: u.id,
    kind: 'customer'
  }
}
