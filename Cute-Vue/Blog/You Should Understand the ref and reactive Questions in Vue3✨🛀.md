Vue3 provides developers with two APIs `ref` and `reactive` to implement responsive data, which are also the two APIs that we often use in Vue3 development projects.

This article introduces these two APIs from an introductory perspective. If there are errors, please discuss and learn together~

> The demo code in this article is based on Vue3 setup syntax.

In the beginner stage, what we need to master is the "what", "how to use" and "points to pay attention" of these two APIs.

## 1. How to use reactive API?

The `reactive` method is used to create a reactive object. It takes an object/array parameter and returns a reactive copy of the object. When the property value of the object changes, it will automatically update the place where the object is used.

Test with **object** and **array** as parameters:

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

Template content:

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

Contents of the page:

![reactive](https://images.pingan8787.com/images/20220803/image1.png)

When we click the `Update` button respectively, we can see that after the data changes, the content on the view is also updated together:

![reactive](https://images.pingan8787.com/images/20220803/image2.png)

## 2. How to use the ref API?

The function of `ref` is to convert a **primitive data type** (primitive data type) into a data type with **responsive features**. There are 7 primitive data types, namely: `String`/ `Number` / `BigInt` / `Boolean` / `Symbol` / `Null` / `Undefined`.

When the value of `ref` is read and modified in JS/TS, you need to use `.value` to get it, and when it is read in the template, you don't need to use `.value`.

Test with **string** and **object** as parameters:

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

Template content:

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

Contents of the page:

![ref](https://images.pingan8787.com/images/20220803/image3.png)

When we click the `Update` button respectively, we can see that after the data changes, the content on the view is also updated together:

![ref](https://images.pingan8787.com/images/20220803/image4.png)

## 3. Can reactive be used on deep objects or arrays?

The answer is **yes**, `reactive` is implemented based on [ES2015 Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), it The responsiveness is all nesting levels of the whole object.

Test with **object** and **array** as parameters:

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

Template content:

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

Contents of the page:

![reactive](https://images.pingan8787.com/images/20220803/image5.png)

When we click the `Update` button respectively, we can see that after the data changes, the content on the view is also updated together:

![reactive](https://images.pingan8787.com/images/20220803/image6.png)

## 4. Is the reactive return value equal to the source object?

The answer is **not equal** because `reactive` is implemented based on [ES2015 Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) , the return result is a proxy object.

Test code:

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

## 5. How does TypeScript write ref and reactive parameter types?

When using TypeScript to write ref / reactive parameter types, you can implement specific types according to the ref / reactive interface type:

```typescript
function ref<T>(value: T): Ref<T>

function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

Modify the previous example code:

```typescript
import { ref } from 'vue'

let refValue = ref<string>('Chris1993');

let setRefValue = () => {
  refValue.value = 'Hello Chris1993'; // ok!
  refValue.value = 1993; // error!
}

let reactiveValue = reactive<{name: string}>({name: 'Chris1993'});
```

## 6. What about ref values as reactive parameters?

What happens when we already have a `ref` object and need to use it in a `reactive` object?

Suppose:

```typescript
let name = ref('Chris1993');
let nameReactive = reactive({name})
```

We can also do this:

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

This is because `reactive` will unpack all deep `refs` and keep `ref` reactive.

When `ref` is assigned to a `reactive` property by assignment, `ref` is also automatically unpacked:

```typescript
let name = ref('Chris1993');
let nameReactive = reactive({})
nameReactive.name = name;

console.log(name.value);        // Chris1993
console.log(nameReactive.name); // Chris1993
console.log(name.value === nameReactive.name); // true
```

## 7. Summary

This article mainly introduces the difference between the usage of `reactive`/ `ref` API from the perspective of getting started, as well as several problems in the use process.

To briefly summarize:

- `reactive` is generally used for object/array type data, no need to use `.value`;
- `ref` is generally used for data of basic data types. When reading and modifying in JS, you need to use `.value`, but not when using it in templates;
- `reactive` can modify deep property values and remain responsive;
- `reactive` return value is different from the source object;
- `reactive` attribute value can be `ref` value;

The next article will share the mastery with you, and you are welcome to look forward to it.