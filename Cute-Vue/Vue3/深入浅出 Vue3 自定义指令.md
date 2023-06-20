[Vue.js](https://vuejs.org/) 提供了丰富的指令来简化开发者的工作。除了内置指令外，Vue.js 还支持自定义指令，开发者可以根据自己的需求扩展 Vue.js 的指令库。Vue.js 3.x 相较于 Vue.js 2.x 在自定义指令方面进行了一些改进，本文将介绍 Vue.js 3.x 中自定义指令的使用方法。

## ❓ 什么是自定义指令

### 1. 概念介绍

在 Vue.js 中，指令 (Directives) 是一种带有 `v-` 前缀的特殊属性。它的作用是**当其绑定的元素被插入到 DOM 中时，会立即执行一些行为**。
Vue.js 中有许多内置指令，比如:

- `v-model`：在表单元素上创建**双向数据绑定**；
- `v-show`：根据表达式之真假值，**切换元素的 display CSS 属性**；
- `v-if`：根据表达式之真假值**渲染或销毁元素**；
- `v-for`：基于一个数组来渲染一个列表。

这些指令让我们可以更加声明式地操作 DOM，隐藏复杂的 DOM 操控逻辑。
除了内置的指令，Vue.js 也允许我们注册[自定义指令](https://vuejs.org/guide/reusability/custom-directives.html)。自定义指令**允许我们在渲染的 DOM 元素上应用自定义的行为**。

### 2. 基础使用

以全局自定义指令为例，通过全局方法 `app.directive(name, options)` 进行注册，并使用 `v-` 前缀在模板中应用。
`directive() `方法接收两个参数:

- `name`：指令名称，如 `focus`；
- `options`：指令配置对象，其中包含**指令的钩子函数**。

下面以自定义指令 `v-focus`作为示例介绍，首先创建 `v-focus`指令：

```javascript
const app = createApp({});
app.directive("focus", {
  // 当绑定元素插入到 DOM 中时......
  mounted(el) {
    // 聚焦元素
    el.focus();
  },
});
```

然后在模板中使用：

```html
<input v-focus />
```

当输入框挂载到 DOM 时，它将自动获得焦点。
一个自定义指令定义对象可以提供以下**钩子函数**：

```typescript
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {},
};
```

每个钩子函数的参数包括：

- `el`：指令绑定到的元素。可以用于直接操作 DOM。
- `binding`：一个对象，包含`value`、`oldValue`、`arg`、`modifiers`、`instance`、`dir`属性。
- `vnode`：代表绑定元素的底层 VNode。
- `prevNode`：之前的渲染中代表指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

参数的详细介绍，可以查看文档《[Hook Arguments](https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks)》。

## 🗂️ 自定义指令分类

### 1. 按指令注册方式分类

自定义指令按**指令注册方式**可以分为：**全局指令**和**局部指令**。

- **全局指令**

全局注册的指令可以**在应用程序的任何组件中使用**，通常在 Vue 的 `app` 实例上通过 `directive()`进行注册：

```typescript
const app = createApp({});
app.directive("focus", {
  // 当绑定元素插入到 DOM 中时......
  mounted(el) {
    // 聚焦元素
    el.focus();
  },
});
```

- **局部指令**

局部注册的指令仅**在其注册的组件中可用**，通常在组件配置对象中进行注册：

```typescript
const Component = defineComponent({
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
  render() {
    const { directives } = this.$options;
    return [withDirectives(h("input"), [[directives.focus]])];
  },
});
```

### 2. 按指令实现方式分类

自定义指令按**指令实现方式**可以分为：**对象指令**和**函数指令**。

- **对象指令 ObjectDirective**

对象指令以对象形式实现，提供了更多的选项和生命周期方法：

```typescript
const app = createApp({});
app.directive("focus", {
  // 当绑定元素插入到 DOM 中时......
  mounted(el) {
    // 聚焦元素
    el.focus();
  },
});
```

在源码里面接口类型定义如下：

```typescript
export interface ObjectDirective<T = any, V = any> {
  created?: DirectiveHook<T, null, V>;
  beforeMount?: DirectiveHook<T, null, V>;
  mounted?: DirectiveHook<T, null, V>;
  beforeUpdate?: DirectiveHook<T, VNode<any, T>, V>;
  updated?: DirectiveHook<T, VNode<any, T>, V>;
  beforeUnmount?: DirectiveHook<T, null, V>;
  unmounted?: DirectiveHook<T, null, V>;
  getSSRProps?: SSRDirectiveHook;
}
```

- **函数指令 FunctionDirective**

函数指令是对象指令的简化形式，使用起来更加简单，适合于只需执行一些操作的场景。
通常仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下可以直接用一个函数来定义指令，如下所示：

```typescript
app.directive("color", (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value;
});
```

在源码里面接口类型定义如下：

```typescript
export type FunctionDirective<T = any, V = any> = DirectiveHook<T, any, V>;

export type DirectiveHook<T = any, Prev = VNode<any, T> | null, V = any> = (
  el: T,
  binding: DirectiveBinding<V>,
  vnode: VNode<any, T>,
  prevVNode: Prev
) => void;
```

## ⚠️ 注意事项

在使用自定义指令时，有一些注意事项需要牢记。这些包括指令命名的规则、指令的生命周期和钩子函数的执行顺序等。
以下是 5 个常见注意事项：

- 指令需要使用多个参数时，可以传递一个 JS 对象字面量

```javascript
<div v-demo="{ color: 'white', text: 'hello!' }"></div>;

app.directive("demo", (el, binding) => {
  console.log(binding.value.color); // => "white"
  console.log(binding.value.text); // => "hello!"
});
```

2. 不推荐在组件上使用自定义指令，因为组件可能含有多个根节点

和 `attribute` 不同，指令不能通过 `v-bind="$attrs"` 来传递给一个不同的元素。

```html
<MyComponent v-demo="test" />
```

```html
<!-- MyComponent 的模板 -->

<div>
  <!-- v-demo 指令会被应用在此处 -->
  <span>My component content</span>
</div>
```

3. 自定义指令第二个参数支持一个对象配置

定义指令时，第一个参数除了指令名称外，还接受一个对象，该对象包含指令钩子函数，这与 Vue2 不同，需要注意。

```javascript
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
```

4. 在 `v-for` 渲染的元素上，指令钩子多次调用

```vue
<ul>
  <li v-for="item in list" v-focus>
</ul>
```

`focus` 指令的钩子函数会以每个 `li` 元素为参数调用多次。

5. `v-on` 修饰符 `.native` 不再支持

编辑器会提示警告“`'.native' modifier on 'v-on' directive is deprecated.`”

```vue
<!-- 会产生警告, .native 修饰符已废除 -->
<input @click.native="doSomething">
```

在 Vue3 中直接使用 `@click` 即可监听原生事件。

## 💡 使用示例

接下来以 3 个使用示例做演示：

### v-preview

通过 `v-preview` 自定义指令，实现**图片预览功能**。
指令实现：

```typescript
// 指令实现
export default {
  mounted(el) {
    el.addEventListener("mouseenter", (e) => {
      const img = e.target;
      const src = img.src;
      const parent = img.closest(".img-preview-container");
      parent.style.position = "relative";
      const preview = document.createElement("div");
      preview.style.position = "absolute";
      preview.style.top = 0;
      preview.style.left = 0;
      preview.style.background = "url(" + src + ") no-repeat center center";
      preview.style.backgroundSize = "contain";
      preview.style.width = "100%";
      preview.style.height = "100%";
      parent.append(preview);
    });
    el.addEventListener("mouseleave", (e) => {
      const parent = e.target.closest(".img-preview-container");
      parent.style.position = "";
      const preview = parent.querySelector("div");
      preview.remove();
    });
  },
};
```

注册指令：

```javascript
import { createApp } from "vue";
import vPreview from "./directives/vPreview";
import App from "./App.vue";
const app = createApp(App);

// 注册指令
app.directive("preview", vPreview);

app.mount("#app");
```

使用指令：

```html
<div class="img-preview-container">
  <img v-for="src in imgSrcs" :src="src" v-preview />
</div>
```

当鼠标移入 `img` 元素时，会根据其 `src` 展示对应的图片预览。当鼠标移出时，图片预览会消失。这个 `v-preview` 自定义指令可以让我们快速实现图片预览的交互效果。
指令中通过监听 `mouseenter` 和 `mouseleave` 事件展示和隐藏图片预览，使用 `closest` 方法获取 `img` 元素的父容器，并在其上添加预览图片。

### 2. v-uppercase

通过 `v-uppercase` 自定义指令，实现**将文本自动转成大写功能**。
指令实现：

```typescript
export default {
  created(el, binding) {
    el.innerHTML = binding.value.toUpperCase();
  },
  update(el, binding) {
    el.innerHTML = binding.value.toUpperCase();
  },
};
```

注册指令：

```typescript
import { createApp } from "vue";
import vUppercase from "./directives/vUppercase";
import App from "./App.vue";
const app = createApp(App);

// 注册指令
app.directive("uppercase", vUppercase);

app.mount("#app");
```

使用指令：

```vue
<p v-uppercase>hello</p>
```

在页面上显示的是 “HELLO” 文本。`v-uppercase` 自定义指令在 `created` 和 `update` 钩子中调用了 `toUpperCase()` 方法将文本转换为大写，并更新 `innerHTML`。

### 3. v-resize

通过 `v-resize` 自定义指令，实现**监听窗口宽度变化**，执行回调方法的功能。
指令实现：

```javascript
export default {
  mounted(el, binding) {
    const callback = binding.value;
    window.addEventListener("resize", () => {
      callback(el.offsetWidth);
    });
  },
};
```

注册指令：

```typescript
import { createApp } from "vue";
import vResize from "./directives/vResize";
import App from "./App.vue";
const app = createApp(App);

// 注册指令
app.directive("resize", vResize);

app.mount("#app");
```

使用指令：

```vue
<script setup lang="ts">
const onResize = (width) => {
  console.log(width);
};
</script>

<template>
  <div v-resize="onResize">宽度</div>
</template>
```

`v-resize` 自定义指令会在窗口尺寸发生变化时，调用绑定的回调函数，并传入元素的 `offsetWidth` 值。在方法 `onResize` 中，我们可以根据元素的新的宽度 `width` 进行相应处理，例如：

- 调整样式
- 调用 API 重新获取数据
- 重新布局页面等

这些指令比较简单，但在实际项目中使用却非常广泛，我们可以运用相同思路编写其他常用的指令，例如:

- `v-scroll` 滚动事件指令；
- `v-mouseenter` / `v-mouseleave` 鼠标进入/离开事件指令；
- `v-longpress` 长按事件指令；

这可以很好的帮助我们简化代码并提高开发效率。

## 🖌️ 渲染函数中如何使用

### 1. 概念介绍

如果要在 Vue3 渲染函数中使用自定义指令，就需要使用 `[withDirectives](https://vuejs.org/api/render-function.html#withdirectives)`函数，其函数签名如下：

```typescript
function withDirectives(
  vnode: VNode, // 需要绑定自定义指令的元素
  directives: DirectiveArguments
): VNode;

// 自定义指令数组，数组形式：[Directive, value, argument, modifiers]
// 如果不需要，可以省略数组的尾元素。
type DirectiveArguments = Array<
  | [Directive]
  | [Directive, any]
  | [Directive, any, string]
  | [Directive, any, string, DirectiveModifiers]
>;
```

简单的使用示例：

```typescript
import { h, withDirectives } from "vue";

// 一个自定义指令
const pin = {
  mounted() {
    /* ... */
  },
  updated() {
    /* ... */
  },
};

// <div v-pin:top.animate="200"></div>
const vnode = withDirectives(h("div"), [[pin, 200, "top", { animate: true }]]);
```

### 2. 使用示例

以 `v-focus` 自定义指令为例，可以按照以下步骤实现：

1. 导入 `withDirectives` 和自定义指令函数：

```javascript
import { withDirectives } from "vue";
import { focus } from "./directives";
```

2. 在渲染函数中使用 `withDirectives` 函数，并按顺序传递参数：

```javascript
const vnode = h("input", {
  type: "text",
  modelValue: "example",
  onInput: (event) => {
    // ...
  },
});

const app = {
  render() {
    return withDirectives(vnode, [[focus, true]]);
  },
};
```

这个示例代码中的 `vnode` 是一个 `input` 元素的虚拟节点，`focus` 是 `v-focus` 自定义指令的函数，`true` 是传递给自定义指令的参数数组，表示在元素插入文档后自动聚焦。

## 📚 总结

本文介绍了 Vue.js 3.x 中自定义指令的基本使用方法，包括自定义指令函数的定义和注册、指令函数中的参数和钩子函数等内容。自定义指令是 Vue.js 框架的一个非常重要的扩展，开发者可以根据自己的需求自定义指令来简化开发工作、提高开发效率。
希望本文对您学习 Vue.js 自定义指令有所帮助。

## 📖 学习资料

以下是一些我个人认为不错 Vue3 自定义指令的学习资料：

1. [Vue.js 官方文档：自定义指令](https://vuejs.org/guide/reusability/custom-directives.html)

Vue.js 官方文档是学习 Vue.js 自定义指令的最佳入门资料，其中包括了自定义指令的定义、注册和钩子函数等方面的内容，以及一些实际应用的示例。

2. [Vue Mastery: Vue 3 Custom Directives](https://www.vuemastery.com/courses/vue-3-essentials/custom-directives)

Vue Mastery 是一个非常优秀的 Vue.js 在线教育平台，他们的 Vue 3 Custom Directives 课程是一份非常棒的学习资料，其中详细介绍了 Vue.js 3.x 中自定义指令的使用方法和实践技巧。

3. [Vue 3 Directives: A Comprehensive Guide In Depth](https://www.sciredev.com/blog/vue-3-directives-guide-in-depth)

介绍了 Vue.js 3.x 中指令的使用方法和实践技巧。该文章从指令的基础知识入手，详细介绍了 Vue.js 中内置指令和自定义指令的使用方法，并通过实际应用场景和示例来说明指令的作用和用法。
