## 🏝 1. 快速入门

### 1.1 概念介绍

[History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 是 HTML5 规范中的一部分，它提供了一组与浏览器历史记录交互的方法和属性。通过 History 对象，我们可以访问和操作浏览器历史记录栈，包括当前 URL 、前进和后退等操作。
在使用 History API 时，我们会频繁使用以下几个核心方法：

- `pushState(state, title, url)`: 将一个新的状态（state）和 URL 压入历史记录栈中，并且不会导致页面刷新。`state` 可以是任何可序列化的 JavaScript 对象，`title` 是一个可选参数，`url` 是新的链接地址。
- `replaceState(state, title, url)`: 与`pushState()`类似，但是替换当前历史记录栈中的当前条目，而不是添加一个新的。
- `go(delta)`: 在历史记录栈中相对于当前页面进行导航，`delta` 表示相对当前页面的偏移量，可以为正数（前进）或负数（后退）。

### 1.2 作用和使用场景

History API 的主要作用是实现无需页面刷新的导航和状态管理。它为前端开发人员提供了更多的控制权，可以创建更流畅、更动态的用户体验。
一些常见的使用场景包括：

- **前端路由**

通过 History API 可以实现 SPA（单页应用）的前端路由，使页面在 URL 变化时更新部分内容而不刷新整个页面，提供更快速、无缝的页面切换体验。

- **历史记录导航**

通过使用 `pushState()` 和 `replaceState()` 方法，我们可以动态地修改 URL，同时保留用户的浏览历史记录，使用户能够使用浏览器的前进和后退按钮导航页面。

- **无限滚动**

在无限滚动的页面中，当用户滚动到页面底部时，可以使用 History API 加载更多内容，而无需刷新整个页面。

## 🎨 2. 如何使用

要使用 History API，我们可以直接通过浏览器的全局对象`window.history`来访问相关方法和属性。下面是一个简单的例子，演示如何使用`pushState()`方法添加一个新的历史记录条目：

```javascript
// 在历史记录中添加一个新的条目
window.history.pushState({ page: "home" }, "Home", "/home");
```

上述代码将在历史记录栈中添加一个新的条目，状态对象为`{ page: "home" }`，标题为"`Home`"，URL 为"`/home`"。这样，我们可以在不刷新页面的情况下，改变 URL 并将相应的状态保存到历史记录中。
类似地，我们也可以使用`replaceState()`方法来替换当前的历史记录条目：

```javascript
// 替换当前的历史记录条目
window.history.replaceState({ page: "about" }, "About", "/about");
```

这个示例代码将替换当前的历史记录条目，状态对象为`{ page: "about" }`，标题为"`About`"，URL 为"`/about`"。这样，当前的历史记录将被更新，**但浏览器不会重新加载页面**。
除了这个方法，还可以使用`go()`方法在历史记录中进行导航：

```javascript
// 前进一个页面
window.history.go(1);

// 后退一个页面
window.history.go(-1);
```

这个示例代码分别将浏览器的历史记录前进或后退一个页面。

## 🧭 3. 实际应用

History API 可以用于许多场景，接下来我们通过以下 3 个示例，介绍如何在实际项目中使用 History API。

### 3.1 单页应用导航

在一个单页应用中，我们可以使用 History API 来实现页面之间的导航。下面的示例展示了如何通过点击导航链接切换页面，而无需刷新整个页面。

```javascript
// 导航到指定页面
function navigateTo(page) {
  // 使用pushState方法切换页面，并更新URL和状态
  window.history.pushState({ page }, page, `/${page}`);

  // 根据页面类型加载相应的内容
  loadPageContent(page);
}

// 监听popstate事件，当用户点击前进或后退按钮时执行相应操作
window.addEventListener("popstate", function (event) {
  // 从event.state中获取页面信息
  const page = event.state.page;

  // 根据页面类型加载相应的内容
  loadPageContent(page);
});

// 加载页面内容
function loadPageContent(page) {
  // 根据page加载对应的页面内容
  // 这里可以使用Ajax或其他技术来获取页面内容，并将其插入到DOM中
  // 省略具体实现细节
}

// 初始加载默认页面
navigateTo("home");
```

在上述示例中，`navigateTo()`函数用于**切换页面**，通过调用`pushState()`方法来**更新 URL 和状态**，并调用`loadPageContent()`函数来**加载相应的页面内容**。
`popstate` 事件监听器用于捕捉用户点击前进或后退按钮的操作，并根据历史记录中保存的页面信息重新加载页面内容。

### 3.2 模态框历史记录管理

在一个使用模态框（Modal）的应用中，我们可以使用 History API 来管理模态框的打开和关闭历史记录。下面的示例展示了如何通过 History API 来实现模态框的历史记录管理。

```javascript
const modal = document.getElementById("modal");

// 打开模态框
function openModal() {
  modal.style.display = "block";
  window.history.pushState({ modalOpen: true }, "", "#modal");
}

// 关闭模态框
function closeModal() {
  modal.style.display = "none";
  window.history.pushState({ modalOpen: false }, "", window.location.pathname);
}

// 监听popstate事件，当用户点击前进或后退按钮时执行相应操作
window.addEventListener("popstate", function (event) {
  const modalOpen = event.state.modalOpen;

  if (modalOpen) {
    openModal();
  } else {
    closeModal();
  }
});

// 初始状态
const initialState = { modalOpen: false };

// 监听模态框打开按钮的点击事件
document.getElementById("open-button").addEventListener("click", function () {
  openModal();
});

// 监听模态框关闭按钮的点击事件
document.getElementById("close-button").addEventListener("click", function () {
  closeModal();
});

// 初始化
if (window.location.hash === "#modal") {
  openModal();
} else {
  window.history.replaceState(initialState, "", window.location.pathname);
}
```

在上述示例中，通过调用 `pushState()` 方法更新 URL 和状态来记录模态框的打开和关闭历史。
在`popstate` 事件监听器中，根据历史记录中保存的模态框状态，决定是打开模态框还是关闭模态框。
初始状态和页面加载时的状态通过 `replaceState()` 方法设置。

### 3.3 动态内容加载

History API 也可以用于实现动态内容加载，例如在一个博客应用中通过点击文章链接来加载文章内容，而无需刷新整个页面。下面的示例展示了如何使用 History API 来实现**动态内容加载**。

```javascript
// 导航到指定文章页面
function navigateToArticle(articleId) {
  // 使用pushState方法切换页面，并更新URL和状态
  window.history.pushState(
    { articleId },
    `Article ${articleId}`,
    `/articles/${articleId}`
  );

  // 加载文章内容
  loadArticleContent(articleId);
}

// 监听popstate事件，当用户点击前进或后退按钮时执行相应操作
window.addEventListener("popstate", function (event) {
  // 从event.state中获取文章ID
  const articleId = event.state.articleId;

  // 加载文章内容
  loadArticleContent(articleId);
});

// 加载文章内容
function loadArticleContent(articleId) {
  // 根据articleId加载对应的文章内容
  // 这里可以使用Ajax或其他技术来获取文章内容，并将其插入到DOM中
  // 省略具体实现细节
}

// 监听文章链接的点击事件
document.querySelectorAll(".article-link").forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const articleId = this.dataset.articleId;
    navigateToArticle(articleId);
  });
});

// 初始加载默认文章
const initialArticleId = 1;
navigateToArticle(initialArticleId);
```

在上述示例中，通过调用 `pushState()` 方法更新 URL 和状态来记录文章页面的历史。在 `popstate` 事件监听器中，根据历史记录中保存的文章 ID，加载相应的文章内容。
通过监听文章链接的点击事件，通过调用 `navigateToArticle()` 函数来实现点击文章链接时的页面切换和内容加载。
这些示例演示了如何在实际应用中使用 History API 来实现导航、模态框管理和动态内容加载等功能。

## 📋 4. 兼容性和优缺点

### 4.1 兼容性

以下是 History API 的兼容性列表，包含了主流浏览器及其支持的最低版本：

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Opera ✅
- IE 10+✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1686201565413-48a43b84-490a-450e-89aa-10215a011311.png#averageHue=%23d6c7ad&clientId=u0166fc66-9601-4&from=paste&height=590&id=u84c3a0bb&originHeight=590&originWidth=1437&originalType=binary&ratio=1&rotation=0&showTitle=false&size=71265&status=done&style=none&taskId=ud52473c5-f166-4970-8388-5c0b7a954ae&title=&width=1437)
也可以在 [caniuse.com](https://caniuse.com/?search=History%20API) 上查看具体的兼容性信息。

### 4.2 优缺点

History API 为前端开发人员提供了更多的控制权和创造力，但它也有一些优缺点需要考虑：
优点：

- 实现无刷新的前端路由和页面导航。
- 允许用户使用浏览器的前进和后退按钮导航页面。
- 可以创建更流畅、更动态的用户体验。

缺点：

- 兼容性问题：不同浏览器对 History API 的支持可能不同。
- 需要在代码中处理 `popstate` 事件，以便在用户点击前进或后退按钮时更新页面内容。

### 4.3 工具推荐

在开发中，我们可以借助一些工具来简化使用 History API 的过程。以下是一些推荐的工具：

1. [React Router](https://github.com/remix-run/react-router): 50.5K ⭐，一个用于在 React 应用中实现前端路由的库，提供了方便的路由管理和导航功能。React Router is a lightweight, fully-featured routing library for the React JavaScript library. React Router runs everywhere that React runs; on the web, on the server (using node.js), and on React Native.
2. [Vue Router](https://github.com/vuejs/vue-router):19K ⭐，一个用于在 Vue 应用中实现前端路由的库，提供了类似 React Router 的功能。Vue Router is the official router for [Vue.js](http://vuejs.org/). It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze.
3. [History.js](https://github.com/browserstate/history.js):10.8K ⭐， 一个用于处理兼容性问题的 JavaScript 库，提供了一致的 History API 封装。
4. [page.js](https://github.com/visionmedia/page.js): 7.6K ⭐， 一个简单易用的 JavaScript 路由库，无需依赖其他库，适用于浏览器环境，使用 History API 进行导航。Tiny Express-inspired client-side router.
5. [Navigo](https://github.com/krasimir/navigo): 2.6K ⭐， 一个轻量级的 JavaScript 路由库，适用于小型项目和快速原型开发。A simple vanilla JavaScript router.

使用这些工具可以提高我们在使用 History API 时的开发效率和代码质量。

## 🎯 5. 使用建议和注意事项

在使用 History API 时，以下是一些使用建议和注意事项：

- **谨慎操作历史记录**

使用 `pushState()` 和 `replaceState()` 方法时，避免频繁地添加和替换历史记录条目，以免造成用户体验上的混乱。

- **处理 popstate 事件**

当用户点击前进或后退按钮时，确保在代码中处理 `popstate` 事件，以便在历史记录变化时更新页面内容。

- **兼容性处理**

考虑不同浏览器对 History API 的兼容性差异，并根据需要使用兼容性工具或 Polyfill 库来解决兼容性问题。

- **考虑 SEO**

使用 History API 实现前端路由时，要注意对搜索引擎优化（SEO）的影响。确保网页内容可以被搜索引擎爬虫正确索引。

## 🍭 6. 总结

History API 是一组用于操作浏览器历史记录的 JavaScript API，它为我们提供了无需刷新页面的前端导航和状态管理功能。通过使用 History API，我们可以实现前端路由、浏览历史导航和无刷新加载内容等交互效果，提升用户体验。

## 📚 7. 拓展阅读

- [MDN Web Docs - History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [Using the HTML5 History API](https://css-tricks.com/using-the-html5-history-api/)
- [Creating a Single-Page App in React using React Router](https://www.taniarascia.com/using-react-router-spa/)
