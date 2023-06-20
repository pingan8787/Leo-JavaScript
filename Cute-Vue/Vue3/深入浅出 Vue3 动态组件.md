[动态组件](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components)是 Vue3 中非常重要的一个组件类型，它可以让我们在不同的场景下灵活地渲染不同的组件。

## ✨ 快速上手

使用动态组件非常简单，我们只需要在模板中使用 `<component>` 标签，并通过设置组件的`is` 属性来指定要渲染的组件。例如：

```html
<component :is="currentComponent"></component>
```

其中，`currentComponent` 是一个变量，它的值可以是以下 2 种：

- 已注册的组件名，或 HTML 标签名称
- 导入的组件对象

下面这张图会更清晰：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1687270585027-a48cb302-bef7-4a0c-abda-42d03a52f3a9.png#averageHue=%23fef8ea&clientId=u74015bfa-8e92-4&from=paste&height=904&id=ue309bd6a&originHeight=904&originWidth=2304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=242600&status=done&style=none&taskId=ubf2ecf6d-eda4-4ea0-9d0b-9ad35c3717c&title=&width=2304)

## 🚀 使用场景

灵活运用 Vue3 的动态组件功能，能够帮助我们满足动态性和灵活性的需求，这里列举几个常见的使用场景：

1. **条件渲染**

根据不同条件加载组件，如根据用户权限加载权限组件或根据用户选择加载不同的组件。

2. **动态表单**

根据表单类型或步骤动态渲染相关组件，避免加载整个表单，只加载与当前状态相关的部分。

3. **模态框和弹出窗口**

通过动态组件实现模态框和弹出窗口内容，根据触发条件或用户操作动态加载相应内容。

4. **复用和扩展组件**

使用动态组件轻松复用和扩展现有组件，通过替换动态组件实现不同展现和行为。

5. **路由视图切换**

在路由器中使用动态组件实现动态路由视图切换，根据路由路径加载相应组件，实现无缝页面切换。

6. **可配置的组件选择**

低代码平台提供可视化界面配置应用程序组件，动态组件用于根据用户配置选择和加载特定组件，快速生成定制化应用程序。

## 🎬 使用示例

接下来通过 5 个使用示例，帮助大家更好的理解 Vue3 动态组件的使用：

### 1. 动态组件切换

当我们需要根据不同的条件来渲染不同的组件。这时，我们可以使用 `v-if` 和 `v-else`指令来实现条件渲染。例如：

```html
<component v-if="showComponentA" :is="'ComponentA'"></component>
<component v-else :is="'ComponentB'"></component>

<!-- 代码简化 -->
<component :is="showComponentA ? 'ComponentA' : 'ComponentB'"></component>
```

在这个示例中，根据 `showComponentA` 的值来决定渲染 `<ComponentA>` 还是 `<ComponentB>`。

### 2. 动态组件的过渡效果

为了让动态组件的切换更加平滑，我们可以为添加过渡效果（包括入场和离场的过渡动画）。我们可以使用 Vue 内置的 `[<transition>](https://vuejs.org/guide/built-ins/transition.html)` 组件和过渡类名，来实现过渡效果。

```html
<template>
  <div>
    <transition name="fade">
      <component :is="currentComponent"></component>
    </transition>
  </div>
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
```

在这个示例中，通过为 `<transition>` 组件指定`name` 属性名称为"`fade`"的过渡类名，我们可以在 CSS 中定义该名称对应的过渡效果，为动态组件添加淡入淡出的过渡效果和持续时间。
`<transition>` 组件动画的触发条件可以是下面任意一种：

- 由 `v-if` 所触发的切换
- 由 `v-show` 所触发的切换
- 由特殊元素 `<component>` 切换的动态组件
- 改变特殊的 `key` 属性

### 3. 动态组件的传递数据

在父组件和动态组件之间传递数据也非常简单，父组件可以通过 `v-bind` 指令将数据传递给动态组件，例如：

```html
<component :is="currentComponent" :prop1="value1" :prop2="value2"></component>
```

在这个示例中，通过 `:prop1="value1" :prop2="value2"`向组件 `currentComponent`传递了 `value1`和 `value2`的数据。
在动态组件中，我们可以使用 `defineProps` 来接收这些数据，以 `<script setup>`为例：

```html
<script setup lang="ts">
  const props = defineProps<{
    prop1: string;
    prop2: string;
  }>();
</script>
```

### 4. 使用组件对象作为 is 属性的参数

在实际业务中，我们可能需要根据用户选择的不同选项来展示不同的表单组件。例如，用户可以选择注册类型（个人或企业），然后我们需要显示相应的表单组件。
我们需要通过定义 `pages` 对象，将不同页面类型和组件进行绑定。

```vue
<script setup lang="ts">
import { ref, type Component } from "vue";
import Company from "./Company.vue";
import Personal from "./Personal.vue";

const pages: Record<string, Component> = {
  company: Company,
  personal: Personal,
};
const currentPage = ref<Component>(pages.company);
const changePage = (page: string) => {
  currentPage.value = pages[page];
};
</script>

<template>
  <h3><a @click.stop="changePage('company')">Company</a></h3>
  <h3><a @click.stop="changePage('personal')">Personal</a></h3>
  <div style="border: 1px solid #000">
    <h2>From Content:</h2>
    <component :is="currentPage"></component>
  </div>
</template>
```

在这个示例代码中，`<component :is="currentPage"></component>`渲染组件，在切换页面时修改 `currentPage`，从而实现组件切换，用户通过点击底下 `Company`或 `Personal`切换不同的表单进行显示。

### 5. 使用组件名作为 is 属性的参数

我们需要将需要使用的组件进行全局注册，然后在 `<component :is="currentPage"></component>`中使用组件名即可。
首先在 main.ts 中使用 `app.component(组件名, 组件对象)`全局注册组件，全局注册的组件可以在任何组件模版中直接使用：

```typescript
// main.ts
import { createApp } from "vue";
import Company from "./components/Company.vue";
import Personal from "./components/Personal.vue";

import App from "./App.vue";

const app = createApp(App);
app.component("demo-company", Company);
app.component("demo-personal", Personal);

app.mount("#app");
```

然后在需要使用动态的组件页面中使用组件即可：

```vue
<script setup lang="ts">
import { ref } from "vue";

const currentPage = ref<string>("demo-company");
const changePage = (page: string) => {
  currentPage.value = page;
};
</script>

<template>
  <h3><a @click.stop="changePage('demo-company')">Company</a></h3>
  <h3><a @click.stop="changePage('demo-personal')">Personal</a></h3>
  <div style="border: 1px solid #000">
    <h2>Content:</h2>
    <component :is="currentPage"></component>
  </div>
</template>
```

## ❓ 常见问题

当使用 Vue3 的动态组件时，下面介绍 5 个常见问题的示例代码和解决方案，并使用 `<script setup>` 和 TypeScript 语法演示：

### 1. 组件名的动态更新

```vue
<script setup lang="ts">
import { ref } from "vue";

const currentPage = ref<string>("demo-company");
const changePage = (page: string) => {
  currentPage.value = page;
};
</script>

<template>
  <h3><a @click.stop="changePage('demo-company')">Company</a></h3>
  <h3><a @click.stop="changePage('demo-personal')">Personal</a></h3>
  <div style="border: 1px solid #000">
    <h2>Content:</h2>
    <component :is="currentPage"></component>
  </div>
</template>
```

在这个示例中，使用了 `ref` 来创建响应式数据 `currentPage`，并且默认值为 "`demo-company`"，当调用 `changePage()` 方法时，将组件名更新为对应的组件名称，Vue 会自动销毁旧的组件实例并创建新的组件实例。

### 2. 组件销毁与缓存

```vue
<template>
  <keep-alive>
    <component :is="componentName"></component>
  </keep-alive>
</template>

<script setup lang="ts">
import { ref } from "vue";
const componentName = ref("ComponentA");
</script>
```

由于组件切换时，被切换的组件会被销毁，因此可以使用 Vue 内置的 `[<keep-alive>](https://vuejs.org/guide/built-ins/keep-alive.html)` 组件包裹动态组件，以实现组件的缓存，避免重复创建和销毁。

### 3. 组件之间的通信

```vue
<template>
  <div>
    <component
      :is="componentName"
      :data="componentData"
      @event="handleEvent"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const componentName = ref("ComponentA");
const componentData = reactive({});

const handleEvent = (data: any) => {
  // 处理从动态组件触发的事件
};
</script>
```

通过传递 `data` 属性和监听 `event` 事件，实现动态组件与父组件之间的通信。使用 `reactive` 包裹对象 `componentData`，使其成为响应式数据。

### 4. 异步组件加载

当我们不使用全局注册的组件或者提前导入组件时，可以使用异步加载组件的方式实现动态组件的功能。

```vue
<template>
  <div>
    <component :is="componentName" v-if="componentLoaded"></component>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const componentName = ref(null);
const componentLoaded = ref(false);

onMounted(async () => {
  // 异步加载组件
  const module = await import("./ComponentA.vue");
  componentName.value = module.default;
  componentLoaded.value = true;
});
</script>
```

通过 `import` 异步加载组件，在组件加载完成后再进行渲染。使用 `ref` 来创建响应式数据`componentName` 和 `componentLoaded`。

### 5. 确保相关全局组件已经注册

在使用动态组件之前，如果是需要使用全局组件，则要确保相关的组件已经在全局注册。

```typescript
// main.ts
// 省略其他代码
// 需要先注册
app.component("demo-company", Company);
app.component("demo-personal", Personal);

app.mount("#app");
```

通过在 `mian.ts`入口文件，全局注册了 `'demo-company'` 和 `'demo-personal'`组件。

## 🔍 总结

动态组件是 Vue 中非常重要的一个组件类型，它可以让我们在不同的场景下灵活地渲染不同的组件。通过本文的介绍，相信大家已经掌握了动态组件的基本概念、使用方法、条件渲染、过渡效果和数据传递等方面的知识。

## 📚 学习资源

如果您想深入学习 Vue3，可以参考以下学习资源：

- [Vue 官方文档](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components)
- [Vue Mastery 课程](https://www.vuemastery.com/courses/advanced-components/dynamic-components)
- [基于 CSS 的过渡效果](https://vuejs.org/guide/built-ins/transition.html#css-based-transitions)
