今天分享 6 个 Vue3 开发必备的 VSCode 拓展，可以直接用过 VSCode 的拓展中心直接安装使用。

如果有觉得有帮助，还请点赞 👍 支持一下~

## 1. Volar

_🔥 下载数 153 万+_

相信使用 VSCode 开发 Vue2 的同学一定对 Vetur 拓展不会陌生，作为 Vue2 配套的 VSCode 拓展，它的主要作用是对 Vue 单文件组件提供高亮、语法支持以及语法检测。

而随着 Vue3 正式版发布，Vue 团队官方推荐 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 拓展来代替 Vetur 拓展，不仅支持 Vue3 语言高亮、语法检测，还支持 TypeScript 和基于 [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc) 的类型检查功能。

![](https://files.mdnice.com/user/5763/77517dc8-667c-41f6-9aa1-dd15ae86e67e.png)

使用时需要注意：

1. 首先要禁用 Vetur 拓展，避免冲突；
2. 推荐使用 `css`/`less`/`scss` 作为 `<style>`的语言，因为这些基于 [vscode-css-language](https://github.com/microsoft/vscode-css-languageservice) 服务提供了可靠的语言支持；
3. 如果使用 `postcss`/`stylus`/`sass` 的话，需要安装额外的语法高亮扩展。postcss 使用 [language-postcss](https://marketplace.visualstudio.com/items?itemName=cpylua.language-postcss)，stylus 使用 [language-stylus](https://marketplace.visualstudio.com/items?itemName=sysoev.language-stylus) 拓展，sass 使用 [Sass](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) 拓展；
4. Volar 不包含 ESLint 和 Prettier，而官方的 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 和 [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 扩展支持 Vue，所以需要自行安装。

## 2. Vue VSCode Snippets

_🔥 下载数 152 万+_

[Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets) 拓展旨在为开发者提供最简单快速的生成 Vue 代码片段的方法，通过各种快捷键就可以在 `.vue`文件中快速生成各种代码片段。简直是 Vue3 开发必备神器。

该拓展支持：Volar、Vue2 和 Vue3。

![](https://files.mdnice.com/user/5763/1ee85c86-16a1-4fdd-b26b-2adf71c6896d.png)

使用方式如下：

- 新建一个 `.vue`文件，输入 `vbase`会提示生成的模版内容：

![](https://files.mdnice.com/user/5763/e2c72470-1283-4acc-b22b-45696d39bc17.png)

- 输入 `vfor`快速生成 `v-for`指令模版：

![](https://files.mdnice.com/user/5763/eb8be205-52cf-45dc-a54d-229a47695441.png)

- 输入 `v3onmounted`快速生成 `onMounted`生命周期函数：

![](https://files.mdnice.com/user/5763/bb7f80b8-e0eb-4aab-a73b-2e21eb3a5586.png)

其他就不再演示啦，功能实在太强大，常用快捷键非常多，具体可以查看[文档](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)。

## 3. Auto Close Tag

_🔥 下载数 769 万+_

[Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) 拓展是一个很好用的 VS Code 扩展，它对生产率有很大影响。顾名思义，当我们在结束标记中键入结束括号时，它将添加结束标记。它支持 HTML，Handlebars，XML，PHP，Vue，JavaScript，Typescript，JSX 等。

![](https://files.mdnice.com/user/5763/bf489487-693d-4b6e-aabe-e87871bd1b35.png)

## 4. Vue Peek

_🔥 下载数 49 万+_

[Vue Peek](https://marketplace.visualstudio.com/items?itemName=dariofuzinato.vue-peek) 拓展用来拓展 Vue 代码编辑的体验，可以让我们快速跳转到组件、模块定义的文件。

![](https://files.mdnice.com/user/5763/53060a2c-a2e2-4b5f-98b0-5770c7246a76.png)

使用方式如下：

- 右键组件标签，跳转到组件定义的文件：

![](https://files.mdnice.com/user/5763/bd8364a2-a5de-427c-9893-aa71dbfe6a74.png)

- 右键组件标签，弹窗显示组件定义的文件：

![](https://files.mdnice.com/user/5763/aa7b19cf-2054-4ff5-8c47-b3bba8609d4b.png)

## 5. Vue Theme

_🔥 下载数 34 万+_

[Vue Theme](https://marketplace.visualstudio.com/items?itemName=mariorodeghiero.vue-theme) 拓展提供了不错的 Vue 主题，还支持配置不同颜色，感觉还不错。

![](https://files.mdnice.com/user/5763/29ba2f96-e4e4-4836-8e59-850036a27b1c.png)

## 6. Vite

_🔥 下载数 8.9 万+_

[Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) 拓展可以让我们打开项目后，就能自动启动开发服务器，允许开发者无需离开编辑器即可预览和调试应用。支持一键启动、构建和重启项目。

## 总结

今天分享的 6 个拓展，大家可以按需安装使用。

我比较强烈推荐实用 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 和 [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets) 这 2 个拓展。
如果觉得不错，还请点赞支持。👍

大家有更好的拓展，欢迎评论分享~🔥

欢迎关注我的微信公众号“前端自习课”。
