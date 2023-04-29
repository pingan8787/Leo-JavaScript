Optimizing Vue.js application performance is a concern for every front-end developer.

In this article, I'm going to share 10 Vue.js optimization tips that you need to know for a beginner or intermediate front-end. I hope these tips will help you whether you're learning Vue.js or already using it in application development.

## 1. Set the `key` in `v-for`

> 🔗 Document Link:https://vuejs.org/api/built-in-directives.html#v-for

Using `key` in `v-for` is very important because it allows Vue to keep better track of the state and position of each element.

When the order of elements changes, not having a `key` causes performance degradation because Vue needs to regenerate the elements. To set `key` gracefully, you can extract a **unique attribute** from the data as the key value. Here is the sample code:

```vue
<template v-for="(item, index) in items" :key="item.id">
  <div>{{ item.title }}</div>
</template>
```

If there is no unique property like `item.id`, consider using `index` as the `key` value.

Note that you should not use `index` as the `key` value when you need to add or delete data, as this may cause exceptions to the page data.

## 2. Use `v-if` and `v-show` appropriately

> 🔗 Document Link:https://vuejs.org/guide/essentials/conditional.html#v-if-vs-v-show

Both `v-if` and `v-show` can control the display and hiding of elements, but they are used in different scenarios.

- `v-if` is suitable for scenarios where **frequent switching** is required, where the event listeners and child components within the component are destroyed and rebuilt;
- `v-show` is used in scenarios where **no frequent switching** is required, and is rendered regardless of the initial conditions, except that the CSS `display` property of the controlling element controls whether it is displayed or not;

Overall, `v-if` has a higher switching overhead, while `v-show` has a higher initial rendering overhead. Therefore, if frequent switching is required, `v-show` is preferable; if the binding conditions rarely change at runtime, `v-if` is more appropriate. Here is the sample code:

```vue
<!-- Use v-if -->
<template v-if="show">
  <div>{{ message }}</div>
</template>

<!-- Use v-show -->
<template>
  <div v-show="show">{{ message }}</div>
</template>
```

## 3. Use KeepAlive to cache component state as appropriate

> 🔗 Document Link:https://vuejs.org/guide/built-ins/keep-alive.html#keepalive

`KeepAlive` is a built-in component that caches the state of components to avoid duplicate rendering and improve page responsiveness. Caches removed component instances when switching dynamically between multiple components.

However, if `KeepAlive` is not used properly, it may lead to memory leaks and other problems. Therefore, when using `KeepAlive`, you need to be aware of its usage scenarios and destroy the cached components in a timely manner. Here is the sample code:

```vue
<template>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
</template>
```

In addition `KeepAlive` also supports configuring a `maximum number of cached instances` to limit the maximum number of component instances that can be cached. If the number of cached instances is about to exceed the specified maximum number, the cached instances that have not been accessed for the longest time will be destroyed to make room for new instances.

Here is the sample code:

```html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## 4. Timely destruction of events

> 🔗 Document Link:https://vuejs.org/api/composition-api-lifecycle.html#onbeforeunmount

Components that use **event listeners**, **timers** and **asynchronous operations** need to be destroyed in time to prevent memory leaks.

In Vue3, `setup` function is provided, and you can use `onBeforeUnmount` hook to destroy events and other resources. Here is the sample code:

```typescript
import { onBeforeUnmount } from "vue";

export default {
  setup() {
    let timer;
    const startTimer = () => {
      timer = setInterval(() => {
        console.log("timer is running");
      }, 1000);
    };
    const stopTimer = () => {
      clearInterval(timer);
    };
    onBeforeUnmount(() => {
      stopTimer();
    });
    return {
      startTimer,
      stopTimer,
    };
  },
};
```

## 5. Pay attention to volume optimization

Vue3 is relatively large and needs to be optimized for size. This can be achieved by configuring the packaging tool to package only the required modules, **introducing third-party libraries on demand**, etc.

Alternatively, you can use Tree Shaking-based optimization tools like PurgeCSS, Babel Minify and UglifyJS to further compress the code. Here is the sample code:

```typescript
// vue.config.js
module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: "~",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
};
```

## 6. Using EventBus for Business Decoupling

EventBus enables communication between components and decouples them from each other. You can also use global state management tools such as Vuex to achieve this.

When using EventBus, you need to pay attention to the naming of event names and try to avoid multiple components listening to the same event. Here is the sample code:

```typescript
// event-bus.js
import mitt from "mitt";

export const eventBus = mitt();

// component.js
export default {
  mounted() {
    eventBus.on("foo", this.handleFoo);
  },
  methods: {
    handleFoo() {
      // do something
    },
  },
  beforeUnmount() {
    eventBus.off("foo", this.handleFoo);
  },
};

// other-component.js
export default {
  mouted() {
    eventBus.emit("foo");
  },
};
```

## 7. Using dynamic components to solve the `if-else` overload problem

When the `if-else` logic is too complex, dynamic components can be used to implement it and avoid code bloat and readability degradation. The use of dynamic components can make the code more clearly organized, reuse components and avoid code redundancy. Here is the sample code:

```vue
<template>
  <component :is="componentName"></component>
</template>
<script>
import Foo from "./Foo.vue";
import Bar from "./Bar.vue";

export default {
  data() {
    return {
      componentName: "",
    };
  },
  mounted() {
    if (condition) {
      this.componentName = "Foo";
    } else {
      this.componentName = "Bar";
    }
  },
  components: {
    Foo,
    Bar,
  },
};
</script>
```

## 8. Delayed loading with asynchronous components

> 🔗 Document Link:https://vuejs.org/guide/components/async.html#async-components

Asynchronous components can achieve **delayed loading**, **reduced component loading time** and **improved page responsiveness**. Vue3 natively supports asynchronous component loading, which can be achieved using the `import()` syntax. Code examples are as follows:

```typescript
import { defineAsyncComponent } from "vue";

const AsyncComp = defineAsyncComponent(() => import("./Foo.vue"));
```

## 9. Computation reduction using `computed` and `watch`

> 🔗 Document Link: https://vuejs.org/api/reactivity-core.html

Using `computed` and `watch` can **reduce redundant rendering or repetitive computation**.

`computed` can **cache the results of computations**, so that when responsive data changes, only the dependent data is recomputed when it changes.
`watch` can **listen to changes in one or more responsive data sources and perform the corresponding actions** to avoid manually listening for data changes.

The following is sample code:

```vue
<template>
  <div>{{ fullName }}</div>
</template>
<script>
export default {
  data() {
    return {
      firstName: "John",
      lastName: "Doe",
    };
  },
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
  },
  watch: {
    firstName(newValue, oldValue) {
      console.log("firstName", newValue, oldValue);
    },
    lastName(newValue, oldValue) {
      console.log("lastName", newValue, oldValue);
    },
  },
};
</script>
```

## 10. Optimizing scope slots with v-slot

> 🔗 Document Link: https://vuejs.org/api/built-in-directives.html#v-slot

A **scope slot** (also known as a **named slot**) can pass data from a parent component to a child component and render the child component. However, when there is too much content in the scope slots, it may make the code difficult to maintain. Therefore, the `v-slot` syntax (called `slot-scope` in Vue2) can be used to optimize the scope slots.

`v-slot` allows the name of the scope slot to be defined in the template, thus making the code more explicit and easy to read. The following is sample code:

```html
<!-- In Vue 3 -->
<template>
  <my-component>
    <template v-slot:title="{ name }"> {{ name }}'s Title </template>
  </my-component>
</template>

<!-- In Vue 2 -->
<my-component>
  <template slot-scope="{ name }"> {{ name }}'s Title </template>
</my-component>
```

By using `v-slot`, we can specify the name and content of the scope slots in the template and avoid confusion of the components.

## Wrap-up

We hope the 10 optimization tips presented in this article will help readers better understand Vue.js and build more efficient and reliable web applications.
