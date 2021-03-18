![snabbdom-cover](https://images.pingan8787.com/Vue/Snabbdom/cover.png)

近几年随着 React、Vue 等前端框架不断兴起，Virtual DOM 概念也越来越火，被用到越来越多的框架、库中。Virtual DOM 是基于真实 DOM 的一层抽象，用简单的 JS 对象描述真实 DOM。本文要介绍的 [Snabbdom](https://github.com/snabbdom/snabbdom) 就是 Virtual DOM 的一种简单实现，并且 Vue 的 Virtual DOM 也参考了 Snabbdom 实现方式。

对于想要深入学习 Vue Virtual DOM 的朋友，建议先学习 Snabbdom，对理解 Vue 会很有帮助，并且其核心代码 200 多行。

**本文挑选 Snabbdom 模块系统作为主要核心点介绍，其他内容可以查阅官方文档**[《Snabbdom》](https://github.com/snabbdom/snabbdom)。

![snabbdom-cover](https://images.pingan8787.com/Vue/Snabbdom/snabbdom-cover.png)

## 一、Snabbdom 是什么
Snabbdom 是一个专注于简单性、模块化、强大特性和性能的虚拟 DOM 库。其中有几个核心特性：

1. 核心代码 200 行，并且提供丰富的测试用例；
2. **拥有强大模块系统，并且支持模块拓展和灵活组合；**
3. 在每个 VNode 和全局模块上，都有丰富的钩子，可以在 Diff 和 Patch 阶段使用。

接下来从一个简单示例来体验一下 Snabbdom。
### 1. 快速上手
安装 Snabbdom： 
```bash
npm install snabbdom -D
```
接着新建 index.html，设置入口元素：
```html
<div id="app"></div>
```
然后新建 demo1.js 文件，并使用 Snabbdom 提供的函数：
```javascript
// demo1.js
import { h } from 'snabbdom/src/package/h'
import { init } from 'snabbdom/src/package/init'

const patch = init([])
let vnode = h('div#app', 'Hello Leo')
const app = document.getElementById('app')
patch(app, vnode)
```
这样就实现一个简单示例，在浏览器打开 index.html，页面将显示 “Hello Leo” 文本。
![img-1.png](https://images.pingan8787.com/Vue/Snabbdom/img-1.png)


接下来，我会以 [snabbdom-demo](https://github.com/zyycode/snabbdom-demo) 项目作为学习示例，从简单示例到模块系统使用的示例，深入学习和分析 Snabbdom 源码，重点分析 Snabbdom 模块系统。
## 二、Snabbdom-demo 分析
[Snabbdom-demo](https://github.com/zyycode/snabbdom-demo) 项目中的三个演示代码，为我们展示如何从简单到深入 Snabbdom。
首先克隆仓库并安装：
```bash
$ git clone https://github.com/zyycode/snabbdom-demo.git
$ npm install
```
虽然本项目没有 README.md 文件，但项目目录比较直观，我们可以轻松的从 src 目录找到这三个示例代码的文件：

- 01-basicusage.js
- 02-basicusage.js
- **03-modules.js  -> 本文核心介绍**



接着在 index.html 中引入想要学习的代码文件，默认 `<script src="./src/01-basicusage.js"></script>`  ，通过 package.json 可知启动命令并启动项目：
```bash
$ npm run dev
```


### 1. 简单示例分析
**当我们要研究一个库或框架等比较复杂的项目，可以通过官方提供的简单示例代码进行分析**，我们这里选择该项目中最简单的 01-basicusage.js 代码进行分析，其代码如下：
```javascript
// src/01-basicusage.js

import { h } from 'snabbdom/src/package/h'
import { init } from 'snabbdom/src/package/init'

const patch = init([])

let vnode = h('div#container.cls', 'Hello World')
const app = document.getElementById('app') // 入口元素

const oldVNode = patch(app, vnode)

// 假设时刻
vnode = h('div', 'Hello Snabbdom')
patch(oldVNode, vnode)
```
运行项目以后，可以看到页面展示了“Hello Snabbdom”文本，这里你会觉得奇怪，**前面的 “Hello World” 文本去哪了**？

![img-2.png](https://images.pingan8787.com/Vue/Snabbdom/img-2.png)

原因很简单，我们把 demo 中的下面两行代码注释后，页面便显示文本是 “Hello World”：
```typescript
vnode = h('div', 'Hello Snabbdom')
patch(oldVNode, vnode)
```
这里我们可以猜测 `patch()` 函数可以将 VNode 渲染到页面。更进一步可以理解为，这边第一个执行 `patch()` 函数为**首次渲染**，第二次执行 `patch()` 函数为**更新操作**。

![img-3.png](https://images.pingan8787.com/Vue/Snabbdom/img-3.png)

### 2. VNode 介绍
这里可能会有小伙伴疑惑，示例中的 VNode 是什么？这里简单解释下：

> VNode，该对象用于描述节点的信息，它的全称是虚拟节点（virtual node）。与 “虚拟节点” 相关联的另一个概念是 “虚拟 DOM”，它是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。“虚拟 DOM” 由 VNode 组成的。
> —— 全栈修仙之路 《Vue 3.0 进阶之 VNode 探秘》

其实 VNode 就是一个 JS 对象，在 Snabbdom 中是这么定义 VNode 的类型：
```typescript
export interface VNode {
  sel: string | undefined; // selector的缩写
  data: VNodeData | undefined; // 下面VNodeData接口的内容
  children: Array<VNode | string> | undefined; // 子节点
  elm: Node | undefined; // element的缩写，存储了真实的HTMLElement
  text: string | undefined; // 如果是文本节点，则存储text
  key: Key | undefined; // 节点的key，在做列表时很有用
}

export interface VNodeData {
  props?: Props
  attrs?: Attrs
  class?: Classes
  style?: VNodeStyle
  dataset?: Dataset
  on?: On
  hero?: Hero
  attachData?: AttachData
  hook?: Hooks
  key?: Key
  ns?: string // for SVGs
  fn?: () => VNode // for thunks
  args?: any[] // for thunks
  [key: string]: any // for any other 3rd party module
}
```
在 VNode 对象中含描述节点选择器 `sel` 字段、节点数据 `data` 字段、节点所包含的子节点 `children` 字段等。


在这个 demo 中，我们似乎并没有看到模块系统相关的代码，没事，因为这是最简单的示例，下一节会详细介绍。


> 我们在学习一个函数时，可以重点了解该函数的“入参”和“出参”，大致就能判断该函数的作用。



从这个 demo 主要执行过程可以看出，主要用到有三个函数： `init()` / `patch()` / `h()` ，它们到底做什么用的呢？我们分析一下 Snabbdom 源码中这三个函数的入参和出参情况：
### 3. init() 函数分析
`init()` 函数被定义在 `package/init.ts` 文件中：
```typescript
// node_modules/snabbdom/src/package/init.ts

export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI) {
	// 省略其他代码
}
```
其参数类型如下：
```typescript
function init(modules: Array<Partial<Module>>, domApi?: DOMAPI): (oldVnode: VNode | Element, vnode: VNode) => VNode

export type Module = Partial<{
  pre: PreHook
  create: CreateHook
  update: UpdateHook
  destroy: DestroyHook
  remove: RemoveHook
  post: PostHook
}>
  
export interface DOMAPI {
  createElement: (tagName: any) => HTMLElement
  createElementNS: (namespaceURI: string, qualifiedName: string) => Element
  createTextNode: (text: string) => Text
  createComment: (text: string) => Comment
  insertBefore: (parentNode: Node, newNode: Node, referenceNode: Node | null) => void
  removeChild: (node: Node, child: Node) => void
  appendChild: (node: Node, child: Node) => void
  parentNode: (node: Node) => Node | null
  nextSibling: (node: Node) => Node | null
  tagName: (elm: Element) => string
  setTextContent: (node: Node, text: string | null) => void
  getTextContent: (node: Node) => string | null
  isElement: (node: Node) => node is Element
  isText: (node: Node) => node is Text
  isComment: (node: Node) => node is Comment
}
```


`init()` 函数接收一个模块数组 `modules` 和可选的 `domApi` 对象作为参数，返回一个函数，即 `patch()` 函数。
`domApi` 对象的接口包含了很多 DOM 操作的方法。
这里的 `modules` 参数本文将重点介绍。


### 4. patch() 函数分析
`init()` 函数返回了一个 `patch()` 函数，其类型为：
```typescript
// node_modules/snabbdom/src/package/init.ts

patch(oldVnode: VNode | Element, vnode: VNode) => VNode
```
`patch()` 函数接收两个 VNode 对象作为参数，并返回一个新 VNode。


### 5. h() 函数分析
`h()` 函数被定义在 `package/h.ts` 文件中：
```typescript
// node_modules/snabbdom/src/package/h.ts

export function h(sel: string): VNode
export function h(sel: string, data: VNodeData | null): VNode
export function h(sel: string, children: VNodeChildren): VNode
export function h(sel: string, data: VNodeData | null, children: VNodeChildren): VNode
export function h (sel: any, b?: any, c?: any): VNode{
	// 省略其他代码
}
```
`h()` 函数接收多种参数，其中必须有一个 `sel` 参数，**作用是将节点内容挂载到该容器中**，并返回一个新 VNode。


### 6. 小结

通过前面介绍，我们在回过头看看这个 demo 的代码，大致调用流程如下：

![img-4.png](https://images.pingan8787.com/Vue/Snabbdom/img-4.png)

## 三、深入 Snabbdom 模块系统
学习完前面这些基础知识后，我们已经知道 Snabbdom 使用方式，并且知道其中三个核心方法入参出参情况和大致作用，接下来开始看本文核心 Snabbdom 模块系统。


### 1. Modules 介绍

Snabbdom 模块系统是 Snabbdom 提供的一套**可拓展**、**可灵活组合**的模块系统，用来为 Snabbdom 提供操作 VNode 时的各种模块支持，如我们组建需要处理 style 则引入对应的 styleModule，需要处理事件，则引入 eventListenersModule 既可，这样就达到灵活组合，可以支持按需引入的效果。

Snabbdom 模块系统的特点可以概括为：支持按需引入、独立管理、职责单一、方便组合复用、可维护性强。

当然 Snabbdom 模块系统还有其他内置模块：

| 模块名称 | 模块功能 | 示例代码 |
| :---: | :---: | :---: |
| attributesModule | 为 DOM 元素设置属性，在属性添加和更新时使用 `setAttribute` 方法。 | `h('a', { attrs: { href: '/foo' } }, 'Go to Foo')` |
| classModule | 用来动态设置和切换 DOM 元素上的 class 名称。 | `h('a', { class: { active: true, selected: false } }, 'Toggle')` |
| datasetModule | 为 DOM 元素设置自定义数据属性（`data- *`）。然后可以使用 [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) 属性访问它们。 | `h('button', { dataset: { action: 'reset' } }, 'Reset')` |
| eventListenersModule | 为 DOM 元素绑定事件监听器。 | `h('div', { on: { click: clickHandler } })` |
| propsModule | 为 DOM 元素设置属性，如果同时使用 attributesModule，则会被 attributesModule 覆盖。 | `h('a', { props: { href: '/foo' } }, 'Go to Foo')` |
| styleModule | 为 DOM 元素设置 CSS 属性。 | `h('span', {style: { color: '#c0ffee'}}, 'Say my name')` |

### 2. Hooks 介绍
Hooks 也称钩子，是 DOM 节点生命周期的一种方法。Snabbdom 提供丰富的钩子选择。模块既使用钩子来扩展 Snabbdom，也在普通代码中使用钩子，用来在 DOM 节点生命周期中执行任意代码。


这里大致介绍一下所有的 Hooks：



| 钩子名称 | 触发时机 | 回调参数 |
| :---: | :---: | :---: |
| `pre` | patch 阶段开始。 | none |
| `init` | 已添加一个 VNode。 | `vnode` |
| `create` | 基于 VNode 创建了一个 DOM 元素。 | `emptyVnode, vnode` |
| `insert` | 一个元素已添加到 DOM 元素中。 | `vnode` |
| `prepatch` | 一个元素即将进入 patch 阶段。 | `oldVnode, vnode` |
| `update` | 一个元素开始更新。 | `oldVnode, vnode` |
| `postpatch` | 一个元素完成 patch 阶段。 | `oldVnode, vnode` |
| `destroy` | 一个元素直接或间接被删除。 | `vnode` |
| `remove` | 一个元素直接从 DOM 元素中删除。 | `vnode, removeCallback` |
| `post` | patch 阶段结束。 | none |

模块中可以使用这些钩子：`pre`, `create`, `update`, `destroy`, `remove`, `post`。
单个元素可以使用这些钩子：`init`, `create`, `insert`, `prepatch`, `update`, `postpatch`, `destroy`, `remove`。

Snabbdom 是这么定义钩子的：
```typescript
// snabbdom/src/package/hooks.ts

export type PreHook = () => any
export type InitHook = (vNode: VNode) => any
export type CreateHook = (emptyVNode: VNode, vNode: VNode) => any
export type InsertHook = (vNode: VNode) => any
export type PrePatchHook = (oldVNode: VNode, vNode: VNode) => any
export type UpdateHook = (oldVNode: VNode, vNode: VNode) => any
export type PostPatchHook = (oldVNode: VNode, vNode: VNode) => any
export type DestroyHook = (vNode: VNode) => any
export type RemoveHook = (vNode: VNode, removeCallback: () => void) => any
export type PostHook = () => any

export interface Hooks {
  pre?: PreHook
  init?: InitHook
  create?: CreateHook
  insert?: InsertHook
  prepatch?: PrePatchHook
  update?: UpdateHook
  postpatch?: PostPatchHook
  destroy?: DestroyHook
  remove?: RemoveHook
  post?: PostHook
}
```


接下来我们通过 03-modules.js 文件的示例代码，我们需要**样式处理**和**事件操作，**因此引入这两个模块，并进行**灵活组合**：
```javascript
// src/03-modules.js

import { h } from 'snabbdom/src/package/h'
import { init } from 'snabbdom/src/package/init'

// 1. 导入模块
import { styleModule } from 'snabbdom/src/package/modules/style'
import { eventListenersModule } from 'snabbdom/src/package/modules/eventlisteners'

// 2. 注册模块
const patch = init([ styleModule, eventListenersModule ])

// 3. 使用 h() 函数的第二个参数传入模块需要的数据（对象）
let vnode = h('div', {
  style: { backgroundColor: '#4fc08d', color: '#35495d' },
  on: { click: eventHandler }
}, [
  h('h1', 'Hello Snabbdom'),
  h('p', 'This is p tag')
])

function eventHandler() {
  console.log('clicked.')
}

const app = document.getElementById('app')
patch(app, vnode)
```
上面代码中，引入了 styleModule 和 eventListenersModule 两个模块，并且作为参数组合，传入 `init()` 函数中。
此时我们可以看到页面上显示的内容已经有包含样式，并且点击事件也能正常输出日志 `'clicked.'` ：

![img-5.png](https://images.pingan8787.com/Vue/Snabbdom/img-5.png)


这里我们看下 styleModule 模块源码，把代码精简一下：
```typescript
// snabbdom/src/package/modules/style.ts

function updateStyle (oldVnode: VNode, vnode: VNode): void {
	// 省略其他代码
}

function forceReflow () {
  // 省略其他代码
}

function applyDestroyStyle (vnode: VNode): void {
  // 省略其他代码
}

function applyRemoveStyle (vnode: VNode, rm: () => void): void {
  // 省略其他代码
}

export const styleModule: Module = {
  pre: forceReflow,
  create: updateStyle,
  update: updateStyle,
  destroy: applyDestroyStyle,
  remove: applyRemoveStyle
}
```
在看看  eventListenersModule 模块源码：
```typescript
// snabbdom/src/package/modules/eventlisteners.ts

function updateEventListeners (oldVnode: VNode, vnode?: VNode): void {
	// 省略其他代码
}

export const eventListenersModule: Module = {
  create: updateEventListeners,
  update: updateEventListeners,
  destroy: updateEventListeners
}
```
明显可以看出，两个模块返回的都是个对象，并且每个属性为一种钩子，如 `pre/create` 等，值为对应的处理函数，每个处理函数有统一的入参。


继续看下 styleModule 中，样式是如何绑定上去的。这里分析它的 `updateStyle` 方法，因为元素创建（create 钩子）和元素更新（update 钩子）阶段都是通过这个方法处理：
```typescript
// snabbdom/src/package/modules/style.ts

function updateStyle (oldVnode: VNode, vnode: VNode): void {
  var cur: any
  var name: string
  var elm = vnode.elm
  var oldStyle = (oldVnode.data as VNodeData).style
  var style = (vnode.data as VNodeData).style

  if (!oldStyle && !style) return
  if (oldStyle === style) return
  
  // 1. 设置新旧 style 默认值
  oldStyle = oldStyle || {}
  style = style || {}
  var oldHasDel = 'delayed' in oldStyle

  // 2. 比较新旧 style
  for (name in oldStyle) {
    if (!style[name]) {
      if (name[0] === '-' && name[1] === '-') {
        (elm as any).style.removeProperty(name)
      } else {
        (elm as any).style[name] = ''
      }
    }
  }
  for (name in style) {
    cur = style[name]
    if (name === 'delayed' && style.delayed) {
      // 省略部分代码
    } else if (name !== 'remove' && cur !== oldStyle[name]) {
      if (name[0] === '-' && name[1] === '-') {
        (elm as any).style.setProperty(name, cur)
      } else {
        // 3. 设置新 style 到元素
        (elm as any).style[name] = cur
      }
    }
  }
}
```


### 3. init() 分析
接着我们看下 `init()` 函数内部如何处理这些 Module。


首先在 init.ts 文件中，可以看到声明了默认支持的 Hooks 钩子列表：
```typescript
// snabbdom/src/package/init.ts

const hooks: Array<keyof Module> = ['create', 'update', 'remove', 'destroy', 'pre', 'post']
```


接着看 `hooks` 是如何使用的：
```typescript
// snabbdom/src/package/init.ts

export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI) {
  let i: number
  let j: number
  const cbs: ModuleHooks = {  // 创建 cbs 对象，用于收集 module 中的 hook
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: []
  }
	// 收集 module 中的 hook，并保存在 cbs 中
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      const hook = modules[j][hooks[i]]
      if (hook !== undefined) {
        (cbs[hooks[i]] as any[]).push(hook)
      }
    }
  }
	// 省略其他代码，稍后介绍
}
```
上面代码中，创建 `hooks` 变量用来声明默认支持的 Hooks 钩子，在 `init()` 函数中，创建 `cbs` 对象，通过两层循环，保存每个 module 中的 hook 函数到 `cbs` 对象的指定钩子中。


通过断点可以看到这是 demo 中，`cbs` 对象是下面这个样子：

![img-6.png](https://images.pingan8787.com/Vue/Snabbdom/img-6.png)


这里 `cbs` 对象收集了每个 module 中的 Hooks 处理函数，保存到对应 Hooks 数组中。比如这里的 `create` 钩子中保存了 `updateStyle` 函数和 `updateEventListeners` 函数。

![img-7.png](https://images.pingan8787.com/Vue/Snabbdom/img-7.png)

到这里， `init()` 函数已经保存好所有 module 的 Hooks 处理函数，接下来就要看看 `init()` 函数返回的 `patch()` 函数，这里面将用到前面保存好的 `cbs` 对象。


### 4. patch() 分析
`init()` 函数中最终返回一个 `patch()` 函数，这边形成一个闭包，闭包里面可以使用到 `init()` 函数作用域定义的变量和方法，因此在 `patch()` 函数中能使用 `cbs` 对象。


`patch()` 函数会在不同时机点（可以参照前面的 Hooks 介绍），遍历 `cbs` 对象中不同 Hooks 处理函数列表。
```typescript
// snabbdom/src/package/init.ts

export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI) {
	// 省略其他代码
  return function patch (oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node
    const insertedVnodeQueue: VNodeQueue = []
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()  // [Hooks]遍历 pre Hooks 处理函数列表

    if (!isVnode(oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode) // 当 oldVnode 参数不是 VNode 则创建一个空的 VNode
    }

    if (sameVnode(oldVnode, vnode)) {  // 当两个 VNode 为同一个 VNode，则进行比较和更新
      patchVnode(oldVnode, vnode, insertedVnodeQueue)
    } else {
      createElm(vnode, insertedVnodeQueue) // 当两个 VNode 不同，则创建新元素

      if (parent !== null) {  // 当该 oldVnode 有父节点，则插入该节点，然后移除原来节点
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))
        removeVnodes(parent, [oldVnode], 0, 0)
      }
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()  // [Hooks]遍历 post Hooks 处理函数列表
    return vnode
  }
}
```
`patchVnode()` 函数定义如下：
```typescript
  function patchVnode (oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
    // 省略其他代码
    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)  // [Hooks]遍历 update Hooks 处理函数列表
    }
  }
```
`createVnode()` 函数定义如下：
```typescript
  function createElm (vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    // 省略其他代码
    const sel = vnode.sel
    if (sel === '!') {
      // 省略其他代码
    } else if (sel !== undefined) {
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode)  // [Hooks]遍历 create Hooks 处理函数列表
      const hook = vnode.data!.hook
    }
    return vnode.elm
  }
```
`removeNodes()` 函数定义如下：
```typescript
  function removeVnodes (parentElm: Node,vnodes: VNode[],startIdx: number,endIdx: number): void {
    // 省略其他代码
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (ch != null) {
        rm = createRmCb(ch.elm!, listeners)
        for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm) // [Hooks]遍历 remove Hooks 处理函数列表
      }
    }
  }
```
这部分代码跳转较多，总结一下这个过程，如下图：

![img-8.png](https://images.pingan8787.com/Vue/Snabbdom/img-8.png)


## 四、自定义 Snabbdom 模块
前面我们介绍了 Snabbdom 模块系统是如何收集 Hooks 并保存下来，然后在不同时机点执行不同的 Hooks。


在 Snabbdom 中，所有模块独立在 `src/package/modules` 下，使用的时候可以灵活组合，也方便做解耦和跨平台，并且所有 Module 返回的对象中每个 Hooks 类型如下：
```typescript
// snabbdom/src/package/init.ts

export type Module = Partial<{
  pre: PreHook
  create: CreateHook
  update: UpdateHook
  destroy: DestroyHook
  remove: RemoveHook
  post: PostHook
}>

// snabbdom/src/package/hooks.ts
export type PreHook = () => any
export type CreateHook = (emptyVNode: VNode, vNode: VNode) => any
export type UpdateHook = (oldVNode: VNode, vNode: VNode) => any
export type DestroyHook = (vNode: VNode) => any
export type RemoveHook = (vNode: VNode, removeCallback: () => void) => any
export type PostHook = () => any
```
因此，**如果开发者需要自定义模块，只需实现不同 Hooks 并导出即可。**


接下来我们实现一个简单的模块 **replaceTagModule**，用来**将节点文本自动过滤掉 HTML 标签**。


### 1. 初始化代码
考虑到方便调试，我们直接在 `node_modules/snabbdom/src/package/modules/` 目录中新建 replaceTag.ts 文件，然后写个最简单的 demo 框架：
```typescript
import { VNode, VNodeData } from '../vnode'
import { Module } from './module'

const replaceTagPre = () => {
    console.log("run replaceTagPre!")
}

const updateReplaceTag = (oldVnode: VNode, vnode: VNode): void => {
    console.log("run updateReplaceTag!", oldVnode, vnode)
}

const removeReplaceTag = (vnode: VNode): void => {
    console.log("run removeReplaceTag!", vnode)
}

export const replaceTagModule: Module = {
    pre: replaceTagPre,
    create: updateReplaceTag,
    update: updateReplaceTag,
    remove: removeReplaceTag
}
```
接下来引入到 03-modules.js 代码中，并简化下代码：
```typescript
import { h } from 'snabbdom/src/package/h'
import { init } from 'snabbdom/src/package/init'

// 1. 导入模块
import { styleModule } from 'snabbdom/src/package/modules/style'
import { eventListenersModule } from 'snabbdom/src/package/modules/eventlisteners'
import { replaceTagModule } from 'snabbdom/src/package/modules/replaceTag';

// 2. 注册模块
const patch = init([
  styleModule,
  eventListenersModule,
  replaceTagModule
])

// 3. 使用 h() 函数的第二个参数传入模块需要的数据（对象）
let vnode = h('div', '<h1>Hello Leo</h1>')

const app = document.getElementById('app')
const oldVNode = patch(app, vnode)

let newVNode = h('div', '<div>Hello Leo</div>')

patch(oldVNode, newVNode)
```
刷新浏览器，就可以看到 replaceTagModule 的每个钩子都被正常执行：

![img-9.png](https://images.pingan8787.com/Vue/Snabbdom/img-9.png)

### 2. 实现 updateReplaceTag() 函数
我们删除掉多余代码，接下来实现 `updateReplaceTag()` 函数，当 vnode 创建和更新时，都会调用该方法。
```typescript
import { VNode, VNodeData } from '../vnode'
import { Module } from './module'

const regFunction = str => str && str.replace(/\<|\>|\//g, "");

const updateReplaceTag = (oldVnode: VNode, vnode: VNode): void => {
    const oldVnodeReplace = regFunction(oldVnode.text);
    const vnodeReplace = regFunction(vnode.text);
    if(oldVnodeReplace === vnodeReplace) return;
    vnode.text = vnodeReplace;
}

export const replaceTagModule: Module = {
    create: updateReplaceTag,
    update: updateReplaceTag,
}
  
```
在 `updateReplaceTag()` 函数中，比较新旧 vnode 的文本内容是否一致，如果一致则直接返回，否则将新的 vnode 的替换后的文本设置到 vnode 的 text 属性，完成更新。


其中有个细节：
```typescript
vnode.text = vnodeReplace;
```
这里直接对 `vnode.text` 进行赋值，页面上的内容也随之发生变化。这是因为 `vnode` 是个响应式对象，通过调用其 `setter` 方法，会触发响应式更新，这样就实现页面内容更新。


于是我们看到页面内容中的 HTML 标签被清空了。

![img-10.png](https://images.pingan8787.com/Vue/Snabbdom/img-10.png)

### 3. 小结
这个小节中，我们实现一个简单的 `replaceTagModule` 模块，体验了一下 Snabbdom 模块灵活组合的特点，当我们需要自定义某些模块时，便可以按照 Snabbdom 的模块开发方式，开发自定义模块，然后通过 Snabbdom 的 `init()` 函数注入模块即可。


我们再回顾一下 Snabbdom 模块系统特点：支持按需引入、独立管理、职责单一、方便组合复用、可维护性强。


## 五、通用模块生命周期模型
下面我将前面 Snabbdom 的模块系统，抽象为一个通用模块生命周期模型，其中包含三个核心层：

1. 模块定义层

在本层可以按照模块开发规范，自定义各种模块。

2. 模块应用层

一般是在业务开发层或组件层中，用来导入模块。

3. 模块初始化层

一般是在开发的模块系统的插件中，提供初始化函数（init 函数），执行初始化函数会遍历每个 Hooks，并执行对应处理函数列表的每个函数。


抽象后的模型如下：

![image.png](https://images.pingan8787.com/Vue/Snabbdom/img-11.png)

在使用 Module 的时候就可以灵活组合搭配使用啦，在模块初始化层，就会做好调用。

## 六、总结
本文主要以 Snabbdom-demo 仓库为学习示例，学习了 Snabbdom 运行流程和 Snabbdom 模块系统的运行流程，还通过手写一个简单的 Snabbdom 模块，带大家领略一下 Snabbdom 模块的魅力，最后为大家总结了一个通用模块插件模型。


大家好好掌握 Snabbdom 对理解 Vue 会很有帮助。
