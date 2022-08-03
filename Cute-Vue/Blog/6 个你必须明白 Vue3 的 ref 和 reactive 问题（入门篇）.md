Vue3 为开发者提供 `ref`和 `reactive`两个 API 来实现响应式数据，这也是我们使用 Vue3 开发项目中经常用到的两个 API。

本文从入门角度和大家介绍这两个 API，如果有错误，欢迎一起讨论学习~

> **本文演示代码是基于 Vue3 setup 语法。**

在入门阶段，我们需要掌握的是「是什么」、「怎么用」、「有什么注意」，基本就差不多了。

## 1. reactive API 如何使用？

`reactive`方法用来创建响应式对象，它接收一个对象/数组参数，返回对象的响应式副本，当该对象的属性值发生变化，会自动更新使用该对象的地方。

下面以分别以**对象**和**数组**作为参数演示：

```typescript
import { reactive } from 'vue'

let reactiveObj = reactive({ name : 'Chris1993' });
let setReactiveObj = () => {
  reactiveObj.name = 'Hello Chris1993';
}

let reactiveArr = reactive(['a', 'b', 'c', 'd']);
let setReactiveArr = () => {
  reactiveArr[1] = 'Hello Chris1993';
}
```

模版内容如下：

```html
<template>
  <h2>Vue3 reactive API Base</h2>
  <div>
    Object:{{reactiveObj.name}} 
    <span @click="setReactiveObj">Update</span>
  </div>
  <div>
    Array:{{reactiveArr}} 
    <span @click="setReactiveArr">Update</span>
  </div>
</template>
```

此时页面展示如下：

![reactive](https://images.pingan8787.com/images/20220803/image1.png)

当我们分别点击 `Update`按钮后，可以看到数据变化后，视图上内容也一起更新了：

![reactive](https://images.pingan8787.com/images/20220803/image2.png)

## 2. ref API 如何使用？

`ref` 的作用就是将一个**原始数据类型**（primitive data type）转换成一个带有**响应式特性**的数据类型，原始数据类型共有7个，分别是：`String`/ `Number` /`BigInt` /`Boolean` /`Symbol` /`Null` /`Undefined`。

`ref`的值在 JS/TS 中读取和修改时，需要使用 `.value`获取，在模版中读取是，不需要使用 `.value`。

下面以分别以**字符串**和**对象**作为参数演示：

```typescript
import { ref } from 'vue'

let refValue = ref('Chris1993');
let setRefValue = () => {
  refValue.value = 'Hello Chris1993';
}
let refObj = ref({ name : 'Chris1993' });
let setRefObj = () => {
  refObj.value.name = 'Hello Chris1993';
}
```

模版内容如下：

```html
<template>
  <h2>Vue3 ref API Base</h2>
  <div>
    String:{{refValue}} 
    <span @click="setRefValue">Update</span>
  </div>
  <div>
    Object:{{refObj.name}}
    <span @click="setRefObj">Update</span>
  </div>
</template>
```

此时页面展示如下：

![ref](https://images.pingan8787.com/images/20220803/image3.png)

当我们分别点击 `Update`按钮后，可以看到数据变化后，视图内容也一起更新了：

![ref](https://images.pingan8787.com/images/20220803/image4.png)

## 3. reactive 可以用在深层对象或数组吗？

答案是**可以的**，`reactive`是基于 [ES2015 Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 实现的，它的响应式是整个对象的所有嵌套层级。

下面以分别以**对象**和**数组**作为参数演示：

```typescript
import { reactive } from 'vue'

let reactiveDeepObj = reactive({
  user: {name : 'Chris1993'}
});
let setReactiveDeepObj = () => {
  reactiveDeepObj.user.name = 'Hello Chris1993';
}

let reactiveDeepArr = reactive(['a', ['a1', 'a2', 'a3'], 'c', 'd']);
let setReactiveDeepArr = () => {
  reactiveDeepArr[1][1] = 'Hello Chris1993';
}
```

模版内容如下：

```html
<template>
  <h2>Vue3 reactive deep API Base</h2>
  <div>
    Object:{{reactiveDeepObj.user.name}}
    <span @click="setReactiveDeepObj">Update</span>
  </div>
  <div>
    Array:{{reactiveDeepArr}}
    <span @click="setReactiveDeepArr">Update</span>
  </div>
</template>
```

此时页面展示如下：

![reactive](https://images.pingan8787.com/images/20220803/image5.png)

当我们分别点击 `Update`按钮后，可以看到数据变化后，视图上内容也一起更新了：

![reactive](https://images.pingan8787.com/images/20220803/image6.png)

## 4. reactive 返回值和源对象相等吗？

答案是**不相等的**，因为`reactive`是基于 [ES2015 Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 实现的，返回结果是个 proxy 对象。

测试代码：

```typescript
let reactiveSource = { name: 'Chris1993' };
let reactiveData = reactive(reactiveSource);

console.log(reactiveSource === reactiveData);
// false

console.log(reactiveSource);
// {name: 'Chris1993'}

console.log(reactiveData);
// Reactive<{name: 'Chris1993'}>
```

## 5. TypeScript 如何写 ref 和 reactive 参数类型？

在使用 TypeScript 写 ref / reactive 参数类型时，可以根据  ref / reactive  接口类型来实现具体的类型：

```typescript
function ref<T>(value: T): Ref<T>

function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

将前面实例代码改造一下：

```typescript
import { ref } from 'vue'

let refValue = ref<string>('Chris1993');
// refValue 类型为： Ref<string>
let setRefValue = () => {
  refValue.value = 'Hello Chris1993'; // ok!
  refValue.value = 1993; // error!
}

// reactive也类似
let reactiveValue = reactive<{name: string}>({name: 'Chris1993'});
```

## 6. 把 ref 值作为 reactive 参数会怎么样？

当我们已有一个 `ref`对象，需要使用在 `reactive`对象中，会发生什么呢？

假设：

```typescript
let name = ref('Chris1993');
let nameReactive = reactive({name})
```

我们可以做下列操作：

```typescript
let name = ref('Chris1993');
let nameReactive = reactive({name})
console.log(name.value === nameReactive.name); // true

name.value = 'Hello Chris1993';
console.log(name.value);        // Hello Chris1993
console.log(nameReactive.name); // Hello Chris1993

nameReactive.name = 'Hi Chris1993';
console.log(name.value);        // Hi Chris1993
console.log(nameReactive.name); // Hi Chris1993
```

这是因为 `reactive`将会对所有深层的 `refs`进行解包，并且保持 `ref`的响应式。

当通过赋值方式将 `ref`分配给 `reactive`属性时，`ref`也会自动被解包：

```typescript
let name = ref('Chris1993');
let nameReactive = reactive({})
nameReactive.name = name;

console.log(name.value);        // Chris1993
console.log(nameReactive.name); // Chris1993
console.log(name.value === nameReactive.name); // true
```

## 7. 总结

本文主要从入门角度和大家介绍`reactive`/ `ref`两个 API 的使用方式区别，还有使用过程中的几个问题。

简单总结一下：

- `reactive` 一般用于对象/数组类型的数据，都不需要使用 `.value`；
- `ref`一般用于基础数据类型的数据，在 JS 中读取和修改时，需要使用 `.value`，在模版中使用时则不需要；
- `reactive` 可以修改深层属性值，并保持响应；
- `reactive` 返回值和源对象不同；
- `reactive`的属性值可以是 `ref`值；

下一篇将和大家分享精通篇，欢迎大家期待。
