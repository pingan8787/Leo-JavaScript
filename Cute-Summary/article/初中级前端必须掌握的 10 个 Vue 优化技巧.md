优化 Vue.js 应用性能是每个前端开发人员都需要关注的问题。本文我将分享 10 个初中级前端必须掌握的 Vue.js 优化技巧，无论您是正在学习 Vue.js，还是已经在应用开发中使用它，希望这些技巧都会对你的工作有所帮助。

## 1. 优雅的设置 v-for 中的 key

> 文档地址：https://vuejs.org/api/built-in-directives.html#v-for

在 `v-for` 中使用 `key` 是非常重要的，因为它可以让 Vue 更好地跟踪每个元素的状态和位置。

当元素的顺序发生变化时，没有 `key` 会导致性能下降，因为 Vue 需要重新生成元素。为了优雅地设置 `key`，可以从数据中提取一个**唯一属性**作为 key 值。下面是示例代码：

```vue
<template v-for="(item, index) in items" :key="item.id">
  <div>{{ item.title }}</div>
</template>
```

如果没有 `item.id` 这类唯一属性，可以考虑使用 `index` 作为 `key` 值。

需要注意的是，在需要做增加和删除数据这类操作时，尽量不要使用 `index` 作为 `key` 值，这会导致页面数据出现异常。

## 2. 合理的使用 v-if 和 v-show

> 文档地址：https://vuejs.org/guide/essentials/conditional.html#v-if-vs-v-show

`v-if` 和 `v-show` 都可以控制元素的显示和隐藏，但是它们的使用场景不同。

- `v-if` 适用于**需要频繁切换**的场景，切换时组件内事件监听和子组件都会被销毁并且重建；
- `v-show` 适用于**不需要频繁切换**的场景，无论初始条件如何，都会被渲染，只是控制元素的 CSS `display` 属性开控制是否显示；

总的来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 `v-show` 较好；如果在运行时绑定条件很少改变，则 `v-if` 会更合适。下面是示例代码：

```vue
<!-- 使用 v-if -->
<template v-if="show">
  <div>{{ message }}</div>
</template>

<!-- 使用 v-show -->
<template>
  <div v-show="show">{{ message }}</div>
</template>
```

## 3. 适当使用 KeepAlive 缓存组件状态

> 文档地址：https://vuejs.org/guide/built-ins/keep-alive.html#keepalive

`KeepAlive` 是一个内置组件，可以缓存组件的状态，避免重复渲染和提高页面响应速度。在多个组件间动态切换时缓存被移除的组件实例。

但是，如果不适当使用 `KeepAlive`，可能会导致内存泄漏和其他问题。因此，在使用 `KeepAlive` 时，需要注意其使用场景，并及时销毁缓存的组件。下面是示例代码：

```vue
<template>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
</template>
```

另外 `KeepAlive` 也支持配置「最大缓存实例数」，来限制可被缓存的最大组件实例数。如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。

下面是示例代码：

```html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## 4. 及时的销毁事件

> 文档地址：https://vuejs.org/api/composition-api-lifecycle.html#onbeforeunmount

在组件中使用了**事件监听器**、**定时器**和**异步操作**等，需要及时销毁防止出现内存泄漏。

在 Vue3 中，提供了 `setup` 函数，可以使用 `onBeforeUnmount` 钩子来销毁事件等资源。下面是示例代码：

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

## 5. 注意体积优化

Vue3 的体积比较大，需要注意优化体积。可以通过配置打包工具，只打包需要的模块，**按需引入第三方库**等方式来实现体积优化。

另外，可以使用基于 Tree Shaking 的优化工具，如 PurgeCSS、Babel Minify 和 UglifyJS 等，来进一步压缩代码。下面是示例代码：

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

## 6. 多利用 EventBus 进行业务解耦

EventBus 可以实现组件之间的通信，解耦组件之间的关系。主要使用事件的发布和订阅来实现，当然也可以使用全局状态管理工具，如 Vuex 来实现。

使用 EventBus 时，需要注意事件名称的命名、尽量避免多个组件监听同一事件等问题。下面是示例代码：

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

## 7. 动态组件解决 if-else 过多的问题

当 `if-else` 逻辑过于复杂时，可以使用动态组件来实现，避免代码的臃肿和可读性的下降。使用动态组件的方式可以使得代码组织更加清晰，可以复用组件并避免代码冗长。下面是示例代码：

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

## 8. 使用异步组件实现延迟加载

> 文档地址：https://vuejs.org/guide/components/async.html#async-components

异步组件可以实现**延迟加载**，**减少组件的加载时间**和**提高页面响应速度**。Vue3 原生支持异步组件的加载，可以使用 `import()` 语法来实现。代码示例如下：

```typescript
// 正常导入
import Foo from "./Foo.vue";

// 异步导入
import { defineAsyncComponent } from "vue";

const AsyncComp = defineAsyncComponent(() => import("./Foo.vue"));
```

## 9. 使用 computed 和 watch 减少多余的渲染或重复计算

> 文档地址： https://vuejs.org/api/reactivity-core.html

使用 `computed` 和 `watch` 可以**减少多余的渲染或重复计算**。

`computed` 可以**缓存计算结果**，当响应式数据变化时，只有依赖的数据发生变化时才会重新计算。
`watch` 可以**监听一个或多个响应式数据源变化并执行相应操作**，避免手动监听数据变化。

下面是示例代码：

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

## 10. 使用 v-slot 优化作用域插槽

> 文档地址： https://vuejs.org/api/built-in-directives.html#v-slot

**作用域插槽**（也称为**具名插槽**）可以将父组件的数据传递给子组件，并渲染子组件。但是，当作用域插槽内容过多时，可能会导致代码难以维护。因此，可以使用 `v-slot` 语法（Vue2 中称为 `slot-scope`）来优化作用域插槽。

`v-slot` 允许将作用域插槽的名称定义在模板中，从而使得代码更明确和易于阅读。下面是示例代码：

```html
<template>
  <my-component>
    <template v-slot:title="{ name }"> {{ name }}'s Title </template>
  </my-component>
</template>

<!-- Vue 2 中的语法 -->
<my-component>
  <template slot-scope="{ name }"> {{ name }}'s Title </template>
</my-component>
```

通过使用 `v-slot`，我们可以在模板中明确作用域插槽的名称和内容，避免了组件的混乱。

## 总结

希望本文介绍的 10 个优化技巧能够帮助读者更好地理解 Vue.js，从而构建出更加高效和可靠的 Web 应用程序。
