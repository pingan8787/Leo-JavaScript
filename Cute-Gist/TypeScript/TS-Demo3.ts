
type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : never

type I0 = IsUnion<number>
type I1 = IsUnion<string | number>

let person = { name: "lolo", address: { a1: "XM", a2: "JM" }} as const
let s1 = "abc" as const
class People {
   name: string = "lolo"; 
}

type IsNever<T> =  [T] extends [never] ? true: false

type N01 = never extends never ? true : false

type N0 = IsNever<'1' | never>
type N1 = IsNever<'1'>
type N3 = IsNever<never>


let p1: People = new People
let p2: People = People

let p33: typeof People = new People
let p4: typeof People = People

type S12 = typeof s1
type Person = keyof typeof person

type O2 = {
   [x: string]: string 
}

type K2 = keyof O2
type K3 = keyof O3

type O3 = {
  [x: number]: string  
}

type A0 = keyof any
type A1 = keyof never

type T0 = `${any}`
type T1 = `${string}`
type T2 = `${number}`
type T3 = `${boolean}`
type T4 = `${42}`
type T5 = `${'a'}`

type StartWiths<T extends string, S extends string> = T extends `${S}${infer R}` ? R : never;
type S0 = StartWiths<"abc", "ab"> // true
type S1 = StartWiths<"acd", "ab"> // false

type Point = {
    x: number;
    y: number;
}

type O1 = {
   x: number;
   bar(): number 
}

type M0 = Method<O1>

type WithoutMethod<T extends object>  = {
   [P in keyof T as T[P] extends Function ? never : P]: T[P] 
}

type Method<T extends object>  = {
   [P in keyof T as T[P] extends Function ? P : never]: T[P] 
}

type GetterPoint = Getter<Point>

/**
 * type GetterPoint = {
 *   getX: () => number;
 *   getY: () => number;
 * }
 */
type Getter<T extends Point> = {
   [P in keyof T & string as `get${Uppercase<P>}`]: () => number 
}





type Filter<T extends any[], F, R extends any[] = []> = 
    T extends [infer H, ...infer L]
        ? 0 extends 1 & H  // any
            ? Filter<L, F, [...R, H]>
            : H extends F
                ? Filter<L, F, [...R, H]>
                : Filter<L, F, R>
        : R

// type Filter<T extends any[], F, R extends any[] = []> = 
//     T extends [infer H, ...infer L]
//         ?  H extends F
//             ? Filter<L, F, [...R, H]>
//             : Filter<L, F, R>
//         : R

// type Filter<T extends any[], F, R extends Array<any> = []> = T extends [infer H, ...infer L] 
//     ? F

type F0 = Filter<[6, "lolo", 7, "semlinker", false], number>; // [6, 7]
type F1 = Filter<["kakuqo", 2, ["ts"], "lolo"], string>; // ["kakuqo", "lolo"]
type F2 = Filter<[0, true, any, "abao"], string>; // [any, "abao"]


// type Split<T extends string, S extends string, R extends any[] = []> = 
//     T extends `${infer F}${S}${infer L}` 
//         ? Split<L, S, [...R, F]>
//         :  T extends string å
//             ? [...R, T]
//             : R 

// ['123', ...Split<'456, 789', ','>
//         ['456', ...Split<'789', ',']    
//               ['789']          
type Split<T extends string, D extends string> = 
   T extends `${infer Head}${D}${infer Rest}`
      ? [Head, ...Split<Rest, D>] : [T]

type SS1 = Split<'123', ','> 


type JOIN<T extends any[], S extends string, R extends string = ''> = 
    T extends [`${infer F}`, ...infer L] 
        ? JOIN<L, S, `${R}${F}${S}`>
        : R


type J0 = JOIN<['123', '456', '789'], '-'>
