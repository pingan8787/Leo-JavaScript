![image.png](https://blog.pingan8787.com/typescript/20220417/cover.jpg)

本文会和大家详细介绍 TypeScript 中的映射类型（Mapped Type），看完本文你将学到以下知识点：

- 数学中的映射和 TS 中的映射类型的关系；
- TS 中映射类型的应用；
- TS 中映射类型修饰符的应用；

接下来会先从「数学中的映射」开始介绍。

> **本文使用到的 TypeScript 版本为 v4.6.2**。

如果你对 TypeScript 还不熟悉，可以看下面几篇资料：

1. [一份不可多得的 TS 学习指南（1.8W字）](https://juejin.cn/post/6872111128135073806)
2. [了不起的 TypeScript 入门教程](https://juejin.cn/post/6844904182843965453)

## 一、什么是映射？

> 在学习 TypeScript 类型系统时，尽量多和数学中的集合类比学习，比如 TypeScript 中的联合类型，类似数学中的并集等。

在数学中，映射是指**两个元素的集合之间元素相互对应的关系**，比如下图：

![image.png](https://blog.pingan8787.com/typescript/20220417/2.png)
（来源：[https://baike.baidu.com/item/%E6%98%A0%E5%B0%84/20402621](https://baike.baidu.com/item/%E6%98%A0%E5%B0%84/20402621)）

可以将映射理解为函数，如上图，当我们需要将集合 A 的元素转换为集合 B 的元素，可以通过 `f`函数做映射，比如将集合 A 的元素 `1`对应到集合 B 中的元素 `2`。 
这样就能很好的实现映射过程的**复用**。

## 二、TypeScript 中的映射类型是什么？

### 1. 概念介绍

TypeScript 中的映射类型和数学中的映射类似，能够将一个集合的元素转换为新集合的元素，只是 **TypeScript 映射类型是将一个类型映射成另一个类型**。

在我们实际开发中，经常会需要一个类型的所有属性转换为可选类型，这时候你可以直接使用 TypeScript 中的 `Partial`工具类型：

```typescript
type User = {
  name: string;
  location: string;
  age: number;
}

type User2 = Partial<User>;
/*
  User2 的类型：
  
  type User2 = {
      name?: string | undefined;
      location?: string | undefined;
      age?: number | undefined;
  }
*/
```

这样我们就实现了将 `User`类型映射成 `User2`类型，并且将 `User`类型中的所有属性转为可选类型。

![image.png](https://blog.pingan8787.com/typescript/20220417/1.png)

### 2. 实现方法
TypeScript 映射类型的语法如下：
```typescript
type TypeName<Type> = {
  [Property in keyof Type]: boolean;
};
```
我们既然可以通过 `Partial`工具类型非常简单的实现**将指定类型的所有属性转换为可选类型**，那其内容原理又是如何？

我们可以在编辑器中，将鼠标悬停在 `Partial`名称上面，可以看到编辑器提示如下：

![image.png](https://blog.pingan8787.com/typescript/20220417/3.png)

拆解一下其中每个部分：

- `type Partial<T>`：定义一个类型别名 `Partial`和泛型 `T`；
- `keyof T`：通过 `keyof`操作符获取泛型 `T`中所有 `key`，返回一个联合类型（如果不清楚什么是联合类型，可以理解为一个数组）；

```typescript
type User = {
  name: string;
  location: string;
  age: number;
}

type KeyOfUser = keyof User; // "name" | "location" | "age"
```

- `in`：类似 JS 中 `for...in`中的 `in`，用来遍历目标类型的公开属性名；
- `T[P]`：是个索引访问类型（也称查找类型），获取泛型 `T`中 `P`类型，类似 JS 中的访问对象的方式；
- `?:`将类型值设置为可选类型；
- `{ [P in keyof T] ?: T[P] | undefined}`：遍历 `keyof T`返回的联合类型，并定义用 `P`变量接收，其每次遍历返回的值为可选类型的 `T[P]`。

这样就实现了 `Partial`工具类型，这种操作方法非常重要，是后面进行 TypeScript 类型体操的重要基础。
> 关于类型体操的练习，有兴趣可以看看这篇文章：   
> 《这 30 道 TS 练习题，你能答对几道？》[https://juejin.cn/post/7009046640308781063](https://juejin.cn/post/7009046640308781063)

## 三、映射类型的应用
TypeScript 映射类型经常用来复用一些对类型的操作过程，比如 TypeScript 目前支持的 21 种工具类型，将我们常用的一些类型操作定义成这些工具类型，方便开发者复用这些类型。

> 所有已支持的工具类型可以看下官方文档：   
> [https://www.typescriptlang.org/docs/handbook/utility-types.html](https://www.typescriptlang.org/docs/handbook/utility-types.html)


下面我们挑几个常用的工具类型，看下其实现过程中是如何使用映射类型的。
> 在学习 TypeScript 过程中，推荐多在官方的 Playground 练习和学习：   
> [https://www.typescriptlang.org/zh/play](https://www.typescriptlang.org/zh/play)

### 1. Required 必选属性
用来**将类型的所有属性设置为必选属性**。

实现如下：
```typescript
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```
使用方式：
```typescript
type User = {
  name?: string;
  location?: string;
  age?: number;
}

type User2 = Required<User>;
/*
  type User2 = {
      name: string;
      location: string;
      age: number;
  }
*/

const user: User2 = {
  name: 'pingan8787',
  age: 18
}
/*
  报错：
  Property 'location' is missing in type '{ name: string; age: number; }'
  but required in type 'Required<User>'.
*/
```
这边的 `-?`符号可以暂时理解为“将可选属性转换为必选属性”，下一节会详细介绍这些符号。

### 2. Readonly 只读属性

用来**将所有属性的类型设置为只读类型**，即不能重新分配类型。

实现如下：
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}
```
使用方式：
```typescript
type User = {
  name?: string;
  location?: string;
  age?: number;
}

type User2 = Readonly<User>;
/*
  type User2 = {
      readonly name?: string | undefined;
      readonly location?: string | undefined;
      readonly age?: number | undefined;
  }
*/

const user: User2 = {
  name: 'pingan8787',
  age: 18
}

user.age = 20;
/*
  报错：
  Cannot assign to 'age' because it is a read-only property.
*/
```
### 3. Pick 选择指定属性
用来**从指定类型中选择指定属性并返回**。

实现如下：
```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}
```
使用如下：
```typescript
type User = {
  name?: string;
  location?: string;
  age?: number;
}

type User2 = Pick<User, 'name' | 'age'>;
/*
  type User2 = {
      name?: string | undefined;
      age?: number | undefined;
  }
*/

const user1: User2 = {
  name: 'pingan8787',
  age: 18
}

const user2: User2 = {
  name: 'pingan8787',
  location: 'xiamen', // 报错
  age: 18
}
/*
  报错
  Type '{ name: string; location: string; age: number; }' is not assignable to type 'User2'.
  Object literal may only specify known properties, and 'location' does not exist in type 'User2'.
*/
```
### 4. Omit 忽略指定属性
作用类似与 `Pick`工具类型相反，可以**从指定类型中忽略指定的属性**并返回。

实现如下：
```typescript
type Omit<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]: T[P];
}
```
使用方式：
```typescript
type User = {
  name?: string;
  location?: string;
  age?: number;
}

type User2 = Omit<User, 'name' | 'age'>;
/*
  type User2 = {
      location?: string | undefined;
  }
*/

const user1: User2 = {
  location: 'xiamen',
}

const user2: User2 = {
  name: 'pingan8787', // 报错
  location: 'xiamen'
}
/*
  报错：
  Type '{ name: string; location: string; }' is not assignable to type 'User2'.
  Object literal may only specify known properties, and 'name' does not exist in type 'User2'.
*/
```
### 5. Exclude 从联合类型中排除指定类型
用来**从指定的联合类型中排除指定类型**。

实现如下：
```typescript
type Exclude<T, U> = T extends U ? never : T;
```
使用方式：
```typescript
type User = {
  name?: string;
  location?: string;
  age?: number;
}

type User2 = Exclude<keyof User, 'name'>;
/*
  type User2 = "location" | "age"
*/

const user1: User2 = 'age';
const user2: User2 = 'location';
const user3: User2 = 'name';  // 报错
/*
  报错：
  Type '"name"' is not assignable to type 'User2'.
*/
```
## 四、映射修饰符的应用
在自定义映射类型的时候，我们可以使用两个映射类型的修饰符来实现我们的需求：

- `readonly`修饰符：将指定属性设置为**只读类型**；
- `?`修饰符：将指定属性设置为**可选类型**；

前面介绍 `Readonly`和 `Partial`工具类型的时候已经使用到：
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}

type Partial<T> = {
  [P in keyof T]?: T[P] | undefined;
}
```
当然，也可以对修饰符进行操作：

- `+`添加修饰符（默认使用）；
- `-`删除修饰符；

比如：
```typescript
type Required<T> = {
    [P in keyof T]-?: T[P]; // 通过 - 删除 ? 修饰符
};
```
也可以放在前面使用：
```typescript
type NoReadonly<T> = {
  -readonly [P in keyof T]: T[P]; // 通过 - 删除 readonly 修饰符
}
```
## 五、总结
本文从数学中的映射作为切入点，详细介绍 TypeScript 映射类型（Mapped Type）并介绍映射类型的应用和修饰符的应用。

在学习 TypeScript 类型系统时，尽量多和数学中的集合类比学习，比如 TypeScript 中的联合类型，类似数学中的并集等。

学好映射类型，是接下来做类型体操中非常重要的基础~~
## 参考资料

1. TypeScript 文档-映射类型：[https://www.typescriptlang.org/docs/handbook/2/mapped-types.html](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
1. TypeScript 工具类型： [https://www.typescriptlang.org/docs/handbook/utility-types.html](https://www.typescriptlang.org/docs/handbook/utility-types.html)
