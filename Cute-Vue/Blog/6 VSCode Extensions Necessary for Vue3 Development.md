Today, I will share 6 VSCode extensions necessary for Vue3 development, which can be installed and used directly through the VSCode extension center.

If you find it helpful, please like and support it~

## 1. Volar

*🔥 1.53 million downloads+*

I believe that students who use VSCode to develop Vue2 must be familiar with the Vetur extension. As a VSCode extension supporting Vue2, its main function is to provide highlighting, syntax support and syntax detection for Vue single-file components.

With the release of the official version of Vue3, the Vue team officially recommends the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension to replace the Vetur extension, which not only supports Vue3 language highlighting, syntax detection, Also supports TypeScript and type checking based on [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc).

![](https://files.mdnice.com/user/5763/77517dc8-667c-41f6-9aa1-dd15ae86e67e.png)


Note when using:

1. First, disable the Vetur extension to avoid conflicts;
2. It is recommended to use `css`/`less`/`scss` as the language for `<style>`, because these are based on [vscode-css-language](https://github.com/microsoft/vscode-css-languageservice ) the service provides reliable language support;
3. If using `postcss`/`stylus`/`sass`, additional syntax highlighting extensions need to be installed. postcss uses [language-postcss](https://marketplace.visualstudio.com/items?itemName=cpylua.language-postcss), stylus uses [language-stylus](https://marketplace.visualstudio.com/items?itemName =sysoev.language-stylus) extension, sass uses [Sass](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) extension;
4. Volar does not contain ESLint and Prettier, while the official [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com /items?itemName=esbenp.prettier-vscode) extension supports Vue, so you need to install it yourself.

## 2. Vue VSCode Snippets

*🔥 1.52 million downloads+*

[Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets) extension aims to provide developers with the easiest and fastest way to generate Vue code snippets, through various shortcuts key to quickly generate various code snippets in `.vue` files. It is simply a must-have artifact for Vue3 development.

This extension supports: Volar, Vue2 and Vue3.

![](https://files.mdnice.com/user/5763/1ee85c86-16a1-4fdd-b26b-2adf71c6896d.png)


It is used as follows:

- Create a `.vue` file and enter `vbase` to prompt the generated template content:

![](https://files.mdnice.com/user/5763/e2c72470-1283-4acc-b22b-45696d39bc17.png)


- Type `vfor` to quickly generate a `v-for` command template:

![](https://files.mdnice.com/user/5763/eb8be205-52cf-45dc-a54d-229a47695441.png)


- Type `v3onmounted` to quickly generate the `onMounted` lifecycle function:

![](https://files.mdnice.com/user/5763/bb7f80b8-e0eb-4aab-a73b-2e21eb3a5586.png)


Others will not be demonstrated anymore. The functions are too powerful, and there are many commonly used shortcut keys. For details, you can check the [document](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets).

## 3. Auto Close Tag

*🔥 7.69 million downloads+*

The [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) extension is a great VS Code extension that has a big impact on productivity. As the name suggests, when we type the closing bracket in the closing tag, it will add the closing tag. It supports HTML, Handlebars, XML, PHP, Vue, JavaScript, Typescript, JSX and more.

![](https://files.mdnice.com/user/5763/bf489487-693d-4b6e-aabe-e87871bd1b35.png)


## 4. Vue Peek

*🔥 490k+ downloads*

[Vue Peek](https://marketplace.visualstudio.com/items?itemName=darofuzinato.vue-peek) Extension is used to expand the Vue code editing experience, allowing us to quickly jump to the files defined by components and modules.

![](https://files.mdnice.com/user/5763/53060a2c-a2e2-4b5f-98b0-5770c7246a76.png)


It is used as follows:

- Right-click the component label to jump to the component definition file:

![](https://files.mdnice.com/user/5763/bd8364a2-a5de-427c-9893-aa71dbfe6a74.png)


- Right-click the component label, and a pop-up window displays the file defined by the component:

![](https://files.mdnice.com/user/5763/aa7b19cf-2054-4ff5-8c47-b3bba8609d4b.png)


## 5. Vue Theme

*🔥 340k downloads+*

[Vue Theme](https://marketplace.visualstudio.com/items?itemName=mariorodeghiero.vue-theme) extension provides a good Vue theme, and also supports configuring different colors, which feels pretty good.

![](https://files.mdnice.com/user/5763/29ba2f96-e4e4-4836-8e59-850036a27b1c.png)


## 6. Vite

*🔥 89k+ downloads*

The [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) extension allows us to automatically start the development server after opening the project, allowing developers to preview and debug the application without leaving the editor . Support one-click to start, build and restart projects.



## Summarize

The 6 extensions shared today can be installed and used as needed.

I highly recommend Practical [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) and [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras. vue-vscode-snippets) These 2 extensions.
If you think it's good, please like and support. 👍

If you have a better extension, welcome to comment and share~🔥

✨follow me： https://dev.to/chris1993