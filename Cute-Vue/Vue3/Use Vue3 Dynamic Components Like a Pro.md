[Dynamic Component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components) is a very important component type in Vue3, which gives us the flexibility to render different components in different scenarios.

## ✨ Quick start

Using Dynamic Components is very simple, we just need to use the `<component>` tag in our template and specify the component to be rendered by setting the `is` attribute of the component. For example:

```html
<component :is="currentComponent"></component>
```

The `currentComponent` in this sample code is a variable that can have the following 2 values:

- The name of the registered component, or the HTML tag name
- Imported component object

You can better understand this by looking at this image:

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1687270585027-a48cb302-bef7-4a0c-abda-42d03a52f3a9.png#averageHue=%23fef8ea&clientId=u74015bfa-8e92-4&from=paste&height=904&id=ue309bd6a&originHeight=904&originWidth=2304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=242600&status=done&style=none&taskId=ubf2ecf6d-eda4-4ea0-9d0b-9ad35c3717c&title=&width=2304)

## 🚀 Where to use

Flexible use of Vue3's dynamic component features can help us meet the needs of dynamism and flexibility, and are more often used in these places:

1. **Conditional Rendering**

Use different conditions to load different components, such as loading permission components based on user permissions or loading different components based on user selection. 2.

2. **Dynamic Forms**

Dynamically render related components based on form types or steps, avoid loading the whole form and load only the parts related to the current state.

3. **Modal Boxes and Popups**

Use Dynamic Components to implement modal boxes and popups to dynamically load the corresponding content based on trigger conditions or user actions.

4. **Reuse and Extend Components**

Easily reuse and extend existing components with Dynamic Components, and achieve different presentation and behavior by replacing Dynamic Components.

5. **Route View Switching**

Use Dynamic Components in the router to achieve dynamic routing view switching and load the corresponding components according to the routing path to achieve seamless page switching.

6. **Configurable component selection**

The low-code platform provides a visual interface to configure application components, and Dynamic Components are used to select and load specific components based on user configuration to quickly generate customized applications.

## 🎬 Usage Examples

Here I will help you better understand the use of Vue3 Dynamic Components through 5 usage examples:

### 1. Dynamic component switching

When we need to render different components based on different conditions. In this case, we can use the `v-if` and `v-else` directives to achieve conditional rendering. For example:

```html
<component v-if="showComponentA" :is="'ComponentA'"></component>
<component v-else :is="'ComponentB'"></component>

<!-- Code Simplification -->
<component :is="showComponentA ? 'ComponentA' : 'ComponentB'"></component>
```

In this example, the decision to render `<ComponentA>` or `<ComponentB>` is based on the value of `showComponentA`.

### 2. Transition effects for Dynamic Components

To make dynamic component transitions smoother, we can add transition effects (including entry and exit transition animations). We can use Vue's built-in `[<transition>](https://vuejs.org/guide/built-ins/transition.html)` component and transition class name to implement the transition effect.

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

In this example, by specifying a transition class name with the `name` attribute name "`fade`" for the `<transition>` component, we can define the transition effect corresponding to that name in CSS, adding a fade-in and fade-out transition effect and duration to the dynamic component.
The `<transition>` component animation can be triggered by any of the following conditions:

- A transition triggered by `v-if`
- Transitions triggered by `v-show`
- Dynamic components switched by a special element `<component>`
- Changing the special `key` attribute

### 3. Passing data between Dynamic Components

Passing data between a parent component and a dynamic component is also very simple. The parent component can pass data to the dynamic component using the `v-bind` directive, example:

```html
<component :is="currentComponent" :prop1="value1" :prop2="value2"></component>
```

In this example, the data `value1` and `value2` are passed to the component `currentComponent` via `:prop1="value1" :prop2="value2"`.
In a dynamic component, we can use `defineProps` to receive this data, using `<script setup>` as an example:

```html
<script setup lang="ts">
  const props = defineProps<{
    prop1: string;
    prop2: string;
  }>();
</script>
```

### 4. Using Component Objects as Parameters to the is Property

In real business, we may need to display different form components according to different options selected by the user. For example, the user can choose the registration type (personal or business) and then we need to display the corresponding form component.
We need to bind the different page types to the components by defining the `pages` object.

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

In this sample code, `<component :is="currentPage"></component>` renders the component, modifying `currentPage` when switching pages so that the component switches and the user switches to display a different form by clicking on `Company` or `Personal` underneath.

### 5. Using the component name as a parameter to the is property

We need to register the component we want to use globally and then use the component name in `<component :is="currentPage"></component>`.
First register the component globally in main.ts with `app.component(component name, component object)`, and the globally registered component can be used directly in any component template: `app.component(component name, component object)`:

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

Then just use the component in the page that needs to use the dynamic component:

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

## ❓ FAQ

Let's learn sample code and solutions to 5 common problems when using Vue3 Dynamic Components, using `<script setup>` and TypeScript syntax to demonstrate:

### 1. Dynamic update of component names

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

In this example, `ref` is used to create the responsive data `currentPage` and the default value is "`demo-company`". When the `changePage()` method is called to update the component name to the corresponding component name, Vue will automatically destroy the old component instance and create a new one.

### 2. Component destruction and caching

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

Since the switched component will be destroyed when the component is switched, you can use Vue's built-in `[<keep-alive>](https://vuejs.org/guide/built-ins/keep-alive.html)` component to wrap Dynamic Components to achieve caching of components and avoid repeated creation and destruction.

### 3. Communication between Components

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
  // Handle events triggered from Dynamic Components
};
</script>
```

Communicate between Dynamic Components and parent components by passing `data` properties and listening for `event` events. Use the `reactive` wrapper object `componentData` to make it responsive.

### 4. Asynchronous Component loading

When we don't use globally registered components or import components in advance, we can use asynchronous loading of components to implement Dynamic Components.

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
  // Asynchronous loading of components
  const module = await import("./ComponentA.vue");
  componentName.value = module.default;
  componentLoaded.value = true;
});
</script>
```

Load components asynchronously via `import` and render them after they are loaded. Use `ref` to create responsive data `componentName` and `componentLoaded`.

### 5. Ensure that relevant global components are registered

Before using a dynamic component, if it is required to use a global component, make sure that the relevant component is globally registered.

```typescript
// main.ts
// Omit other codes
// need to register first
app.component("demo-company", Company);
app.component("demo-personal", Personal);

app.mount("#app");
```

The `'demo-company'` and `'demo-personal'` components are globally registered through the `mian.ts` entry file.

## 🔍 Summary

Dynamic component is a very important component type in Vue, it allows us to render different components flexibly in different scenarios. Through the introduction of this article, I believe you have mastered the basic concepts, usage, conditional rendering, transition effects and data passing of Dynamic Components.

## 📚 Learning Resources

If you want to learn Vue3 in depth, you can refer to the following learning resources:

- [Vue.js](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components)
- [Vue Mastery](https://www.vuemastery.com/courses/advanced-components/dynamic-components)

> If you like to this article, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more!
