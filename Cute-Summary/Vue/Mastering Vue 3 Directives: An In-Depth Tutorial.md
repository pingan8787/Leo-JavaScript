[Vue.js](https://vuejs.org/) provides a rich set of directives to simplify the work of developers. In addition to Built-in Directives, Vue.js also supports Custom directive, which allow developers to extend the Vue.js directive library according to their needs. Vue.js 3.x has some improvements in Custom directive compared to Vue.js 2.x. This article will introduce how to use Custom directive in Vue.js 3.x.

## ❓ What are Custom directive?

### 1. Introduction

In Vue.js, directives are special properties prefixed with `v-`. What it does is **perform some behavior immediately when the element it binds to is inserted into the DOM**.
There are many Built-in Directives in Vue.js, such as:

- `v-model`: creates **bidirectional data binding** on form elements;
- `v-show`: toggles the display CSS property of an element based on the `true` or `false` value of an expression;
- `v-if`: renders or destroys an element based on the `true` or `false` value of the expression;
- `v-for`: renders a list based on an array.

These directives allow us to manipulate the DOM more declaratively, hiding complex DOM manipulation logic.
In addition to the Built-in Directives, Vue.js also allows us to register [Custom directive](https://vuejs.org/guide/reusability/custom-directives.html). Custom directive **allow us to apply custom behavior** to rendered DOM elements.

### 2. Basic Usage

Take the Global Custom directive as an example, it is registered by the global method `app.directive(name, options)` and applied in the template using the `v-` prefix.
The `directive() ` method takes two parameters.

- `name`: the name of the directive, e.g. `focus`;
- `options`: the directive configuration object, which contains the **hook function** for the directive.

The following is an example of a Custom directive, `v-focus`, which is created by first creating the `v-focus` directive:

```javascript
const app = createApp({});
app.directive("focus", {
  // When the bound element is inserted into the DOM ......
  mounted(el) {
    // Focusing elements
    el.focus();
  },
});
```

Then use in the template:

```html
<input v-focus />
```

When an input box is mounted to the DOM, it will automatically get the focus.

A directive definition object can provide several hook functions (all optional):

```typescript
const myDirective = {
  // called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode, prevVnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode, prevVnode) {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(el, binding, vnode, prevVnode) {},
  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // called after the parent component and
  // all of its children have updated
  updated(el, binding, vnode, prevVnode) {},
  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // called when the parent component is unmounted
  unmounted(el, binding, vnode, prevVnode) {},
};
```

Directive hooks are passed these arguments:

- `el`: the element the directive is bound to. This can be used to directly manipulate the DOM.
- `binding`：An object containing `value`, `oldValue`, `arg`, `modifiers`, `instance`, and `dir` attributes.
- `vnode`: the underlying VNode representing the bound element.
- `prevNode`: the VNode representing the bound element from the previous render. Only available in the `beforeUpdate` and `updated` hooks.

For a detailed description of the parameters, see the document "[Hook Arguments](https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks)".

## 🗂️ Classification

### 1. Classification by Directive registration method

Custom directive can be classified by **registration method**: **Global Directive** and **Local Directive**.

- **Global Directive**

Globally registered directives can be **used in any component of the application** and are usually registered on Vue `app` instance via `directive()`:

```typescript
const app = createApp({});
app.directive("focus", {
  // When the bound element is inserted into the DOM ......
  mounted(el) {
    // Focusing elements
    el.focus();
  },
});
```

- **Local Directive**

Locally registered directives can only be used **in the component they are registered with** in the component configuration object:

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

### 2. Classification by Directive implementation method

Custom directive can be classified by **implementation method**: **Object Directive** and **Function Directive**.

- **Object Directive**

Object Directive are implemented as objects and provide additional options and lifecycle methods::

```typescript
const app = createApp({});
app.directive("focus", {
  // When the bound element is inserted into the DOM ......
  mounted(el) {
    // Focusing elements
    el.focus();
  },
});
```

In the source code inside the interface type definition:

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

- **Function Directive**

The Function Directive is a simplified form of the Object Directive, which is simpler to use and is suitable for scenarios where only a few operations need to be performed.

Usually the same behavior is needed only for `mounted` and `updated`, but no other hooks are needed. In this case the directive can be defined directly with a function:

```typescript
app.directive("color", (el, binding) => {
  // This will be called on both `mounted` and `updated`
  el.style.color = binding.value;
});
```

In the source code inside the interface type definition:

```typescript
export type FunctionDirective<T = any, V = any> = DirectiveHook<T, any, V>;

export type DirectiveHook<T = any, Prev = VNode<any, T> | null, V = any> = (
  el: T,
  binding: DirectiveBinding<V>,
  vnode: VNode<any, T>,
  prevVNode: Prev
) => void;
```

## ⚠️ Tips and Best Practices

When using Custom Ddirectives, there are a number of issues to keep in mind:

1. When a directive takes multiple arguments, pass a JS object literal

```javascript
<div v-demo="{ color: 'white', text: 'hello!' }"></div>;

app.directive("demo", (el, binding) => {
  console.log(binding.value.color); // => "white"
  console.log(binding.value.text); // => "hello!"
});
```

2. Not recommended to use Custom Ddirectives on Components

Because the component may contain multiple root nodes, unlike `attribute`, the directive cannot be passed to a different element via `v-bind="$attrs"`.

```html
<MyComponent v-demo="test" />
```

```html
<!-- template of MyComponent -->
<div>
  <!-- v-demo directive will be applied here -->
  <span>My component content</span>
</div>
```

3. The second parameter of the Custom directive supports an object configuration

When defining a directive, the first argument accepts an object that contains the directive hook function in addition to the directive name, which is different from Vue2 and requires attention.

```javascript
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
```

4. Command hooks are called multiple times on elements rendered by `v-for`

```vue
<ul>
  <li v-for="item in list" v-focus>
</ul>
```

The hook function of the `focus` directive is called multiple times with each `li` element as an argument.

5. The `v-on` modifier `.native` is no longer supported

The editor prompts a warning "`'.native' modifier on 'v-on' directive is deprecated.`"

```html
<!-- will generate a warning, the .native modifier is deprecated -->
<input @click.native="doSomething" />
```

Use `@click` directly in Vue3 to listen to native events.

## 💡 Usage Examples

The following are 3 examples of usage:

### v-preview

Implement **image preview** with the `v-preview` Custom directive.

Directive implementation:

```typescript
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

Registration Custom directive:

```javascript
import { createApp } from "vue";
import vPreview from "./directives/vPreview";
import App from "./App.vue";
const app = createApp(App);

app.directive("preview", vPreview);

app.mount("#app");
```

Use the Custom directive:

```html
<div class="img-preview-container">
  <img v-for="src in imgSrcs" :src="src" v-preview />
</div>
```

When mousing over the `img` element, a preview of the corresponding image is displayed according to its `src`. When the mouse is moved out, the image preview will disappear. This `v-preview` Custom directive allows us to quickly implement the interactive effect of the image preview.

The directive shows and hides the image preview by listening to the `mouseenter` and `mouseleave` events, and uses the `closest` method to get the parent container of the `img` element and add the preview image to it.

### 2. v-uppercase

The `v-uppercase` Custom directive enables **automatic conversion of text to uppercase**.

Directive implementation:

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

Registration Custom directive:

```typescript
import { createApp } from "vue";
import vUppercase from "./directives/vUppercase";
import App from "./App.vue";
const app = createApp(App);

app.directive("uppercase", vUppercase);

app.mount("#app");
```

Use the Custom directive:

```vue
<p v-uppercase>hello</p>
```

The text "HELLO" is displayed on the page. The `v-uppercase` Custom directive calls the `toUpperCase()` method in the `created` and `update` hooks to convert the text to uppercase and update the `innerHTML`.

### 3. v-resize

The `v-resize` Custom directive enables **listening for window width changes** and executing callback methods.

Directive implementation:

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

Registration Custom directive:

```typescript
import { createApp } from "vue";
import vResize from "./directives/vResize";
import App from "./App.vue";
const app = createApp(App);

app.directive("resize", vResize);

app.mount("#app");
```

Use the Custom directive:

```vue
<script setup lang="ts">
const onResize = (width) => {
  console.log(width);
};
</script>

<template>
  <div v-resize="onResize">Width</div>
</template>
```

The `v-resize` Custom directive calls the bound callback function when the window size changes and passes in the `offsetWidth` value of the element. In the method `onResize`, we can handle the new width `width` of the element accordingly, e.g:

- adjusting the style
- call the API to re-fetch data
- rearrange the page, etc.

These directives are relatively simple, but they are very widely used in real projects.

- `v-scroll` scrolling event directive;
- `v-mouseenter` / `v-mouseleave` mouse-in/out event directives;
- `v-longpress` long press event directive;

This can be very helpful to simplify our code and improve development efficiency.

## 🖌️ How to use in the rendering function

### 1. Introduction

To use Custom directive in the Vue3 rendering function, you need to use the [`withDirectives()`](https://vuejs.org/api/render-function.html#withdirectives) function, which has the following function signature:

```typescript
function withDirectives(
  vnode: VNode, // Elements that need to be bound with custom instructions
  directives: DirectiveArguments
): VNode;

// Custom array of directives, array form: [directive, value, argument, modifiers]
// The tail element of the array can be omitted if not needed.
type DirectiveArguments = Array<
  | [Directive]
  | [Directive, any]
  | [Directive, any, string]
  | [Directive, any, string, DirectiveModifiers]
>;
```

Use the Custom directive:

```typescript
import { h, withDirectives } from "vue";

// A Custom directive
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

### 2. Usage Examples

Take the `v-focus` Custom directive as an example, you can implement it as follows:

1. Import `withDirectives` and Custom directive functions:

```javascript
import { withDirectives } from "vue";
import { focus } from "./directives";
```

2. Use the `withDirectives()` function in the render function and pass the arguments in order:

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

The `vnode` in this sample code is a virtual node for the `input` element, `focus` is a function of the `v-focus` Custom directive, and `true` is an array of parameters passed to the Custom directive to indicate automatic focus after the element is inserted into the document.

## 📚 Summary

This article introduced the basic usage of Custom directive in Vue.js 3.x, including the definition and registration of custom directive functions, parameters in directive functions, and hook functions. Custom directives are a very important extension to the Vue.js framework, allowing developers to customize directives to simplify and improve development efficiency according to their needs.

I hope this article will help you learn Vue.js Custom directive.

## 📖 Learning materials

Here are some learning materials that I personally think are good for Vue3 Custom directive:

1. [Vue.js: Custom directive](https://vuejs.org/guide/reusability/custom-directives.html)

The official Vue.js documentation is the best primer for learning Vue.js Custom directive, including aspects of custom directive definitions, registration and hook functions, as well as some examples of real-world applications.

2. [Vue Mastery: Vue 3 Custom directive](https://www.vuemastery.com/courses/vue-3-essentials/custom-directives)

Vue Mastery is an excellent online education platform for Vue.js, and their Vue 3 Custom directive course is a great resource for learning how to use and practice Custom directive in Vue.js 3.x.

3. [Vue 3 Directives: A Comprehensive Guide In Depth](https://www.sciredev.com/blog/vue-3-directives-guide-in-depth)

This article starts with the basics of directives, introduces the use of built-in and Custom directive in Vue.js, and illustrates the role and usage of directives through practical application scenarios and examples.

> If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
