Welcome to the **Must Know JavaScript API** series, this series will learn the **JavaScript API** with you, so that you can be more proficient in using it like a senior engineer. Let's start learning together:

- [**Page Visibility API**](https://javascript.plainenglish.io/must-know-javascript-api-page-visibility-api-9f3e10439842)
- [**Broadcast Channel API**](https://javascript.plainenglish.io/must-know-javascript-api-broadcast-channel-api-f059860f9349)
- [**Resize Observer API**](https://javascript.plainenglish.io/must-know-javascript-api-resize-observer-api-9420aab1a74)
- [**Beacon API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-beacon-api-4abe0bee29ff)
- [**Clipboard API**](https://javascript.plainenglish.io/must-know-javascript-api-clipboard-api-22ac0861e27b)
- [**Fetch API**](https://javascript.plainenglish.io/must-know-javascript-api-fetch-api-11846c9a3b07)
- [**Performance API**](https://javascript.plainenglish.io/must-know-javascript-api-performance-api-85f7b8306b90)
- [**Storage API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-storage-api-2141f3066858)
- [**Fullscreen API**](https://javascript.plainenglish.io/must-know-javascript-api-fullscreen-api-64f0d4eff196)
- [**WebSockets API**](https://javascript.plainenglish.io/must-know-javascript-api-websockets-api-fd82719f256e)
- [**Geolocation API**](https://medium.com/@Chris1993/must-know-javascript-api-geolocation-api-f653f2d84b)
- [**IndexedDB API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-indexeddb-api-6e8c990f2c85)
- [**Intersection Observer API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-intersection-observer-api-3d00f4f3aa6d)
- [**Channel Messaging API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-channel-messaging-api-19631745673f)
- [**Drag and Drop API**](https://medium.com/bitsrc/must-know-javascript-api-drag-and-drop-api-1e3186b83be6)

## 🏝 1. Quick Start

### 1.1 Introduction

The [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) is part of the HTML5 specification, which provides a set of methods and properties for interacting with the browser history. Through the History object, we can access and manipulate the browser history stack, including operations such as the current URL, forward and backward.
When using the History API, we make frequent use of the following core methods:

- `pushState(state, title, url)`: Presses a new state (state) and URL into the history stack and does not cause the page to refresh. `state` can be any serializable JavaScript object, `title` is an optional parameter, and `url` is the new link address.
- `replaceState(state, title, url)`: Similar to `pushState()`, but replaces the current entry in the current history stack instead of adding a new one.
- `go(delta)`: Navigates in the history stack relative to the current page, `delta` indicates the offset relative to the current page, either positive (forward) or negative (backward).
-

### 1.2 Use Case

The primary role of the History API is to enable navigation and state management without page refreshes. It provides front-end developers with more control to create a smoother, more dynamic user experience.
Some common usage scenarios include:

- **front-end routing**

The History API enables front-end routing for SPA (single-page applications), allowing pages to update parts of their content as URLs change without refreshing the entire page, providing a faster and more seamless page switching experience.

- **History navigation**

Using the `pushState()` and `replaceState()` methods, we can dynamically modify URLs while preserving the user's browsing history, allowing users to navigate pages using the browser's forward and backward buttons.

- **Infinite Scrolling**

In an infinite scroll page, when the user scrolls to the bottom of the page, they can use the History API to load more content without refreshing the entire page.

## 🎨 2. How to use

To use the History API, we can access the relevant methods and properties directly through the browser's global object `window.history`. The following is a simple example demonstrating how to add a new history entry using the `pushState()` method:

```javascript
// Add a new entry to the history
window.history.pushState({ page: "home" }, "Home", "/home");
```

The above code will add a new entry to the history stack with a status object of `{ page: "home" }`, a title of ` Home`` and a URL of  `/home``. This way, we can change the URL and save the corresponding status to the history without refreshing the page.
Similarly, we can replace the current history entry using the `replaceState()` method:

```javascript
// Replaces the current history entry
window.history.replaceState({ page: "about" }, "About", "/about");
```

This sample code will replace the current history entry with a status object of `{ page: "about" }`, a title of `About` and a URL of `/about`. This way, the current history will be updated, **but the browser will not reload the page**.
In addition to this method, the `go()` method can also be used to navigate through the history: the

```javascript
// Go forward one page
window.history.go(1);

// Back a page
window.history.go(-1);
```

This sample code moves the browser's history forward or backward one page, respectively.

## 🧭 3. Examples

The History API can be used in a number of scenarios, so let's go through the following 3 examples of how to use the History API in a real project.

### 3.1 Single Page Application Navigation

In a single-page application, we can use the History API to navigate between pages. The following example shows how to switch pages by clicking on the navigation links without refreshing the whole page.

```javascript
// Navigate to the specified page
function navigateTo(page) {
  // Use the pushState method to switch pages and update the URL and state
  window.history.pushState({ page }, page, `/${page}`);

  // Load the appropriate content according to the page type
  loadPageContent(page);
}

// Listen to the popstate event and perform the corresponding action
// when the user clicks the forward or backward button
window.addEventListener("popstate", function (event) {
  // Get page information from event.state
  const page = event.state.page;

  // Load the appropriate content according to the page type
  loadPageContent(page);
});

// Load page content
function loadPageContent(page) {
  // Load the corresponding page content according to page
  // Here you can use Ajax or other techniques to get the page content and insert it into the DOM
  // Omit the implementation details
}

// Initially load the default page
navigateTo("home");
```

In this example, the `navigateTo()` function is used to **switch pages**, update the URL and state** by calling the `pushState()` method, and call the `loadPageContent()` function to **load the corresponding page content\*\*.
The `popstate` event listener is used to capture the user's click on the forward or back button and reload the page content based on the page information saved in the history.

### 3.2 Modal Box History Management

In an application that uses modal boxes, we can use the History API to manage the history of opening and closing modal boxes. The following example shows how to manage the history of a modal box through the History API.

```javascript
const modal = document.getElementById("modal");

// Open modal box
function openModal() {
  modal.style.display = "block";
  window.history.pushState({ modalOpen: true }, "", "#modal");
}

// Close modal box
function closeModal() {
  modal.style.display = "none";
  window.history.pushState({ modalOpen: false }, "", window.location.pathname);
}

// Listen to the popstate event and perform the corresponding action
// when the user clicks the forward or backward button
window.addEventListener("popstate", function (event) {
  const modalOpen = event.state.modalOpen;

  if (modalOpen) {
    openModal();
  } else {
    closeModal();
  }
});

// Initial state
const initialState = { modalOpen: false };

// Listen to the click event of the open button of the modal box
document.getElementById("open-button").addEventListener("click", function () {
  openModal();
});

// Listen to the click event of the close button of the modal box
document.getElementById("close-button").addEventListener("click", function () {
  closeModal();
});

// Initialization
if (window.location.hash === "#modal") {
  openModal();
} else {
  window.history.replaceState(initialState, "", window.location.pathname);
}
```

In this example, the opening and closing history of the modal box is recorded by calling the `pushState()` method to update the URL and state.
In the `popstate` event listener, the decision to open or close the modal box is made based on the modal box state stored in the history.
The initial state and the state at page load are set via the `replaceState()` method.

### 3.3 Dynamic content loading

The History API can also be used to implement dynamic content loading, for example in a blog application where the content of an article is loaded by clicking on the article link without refreshing the entire page. The following example shows how to use the History API to implement **dynamic content loading**.

```javascript
// Navigate to the specified article page
function navigateToArticle(articleId) {
  // Use the pushState method to switch pages and update the URL and state
  window.history.pushState(
    { articleId },
    `Article ${articleId}`,
    `/articles/${articleId}`
  );

  // Load article content
  loadArticleContent(articleId);
}

// Listen to the popstate event and perform the corresponding action
// when the user clicks the forward or backward button
window.addEventListener("popstate", function (event) {
  // Get the article ID from event.state
  const articleId = event.state.articleId;

  // Load article content
  loadArticleContent(articleId);
});

function loadArticleContent(articleId) {
  // Load the content of the corresponding article according to articleId
  // Here you can use Ajax or other techniques to get the article content and insert it into the DOM
  // Omit the implementation details
}

// Listen to the click event of the article link
document.querySelectorAll(".article-link").forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const articleId = this.dataset.articleId;
    navigateToArticle(articleId);
  });
});

// Initial loading of default articles
const initialArticleId = 1;
navigateToArticle(initialArticleId);
```

In this example, the history of the article page is recorded by calling the `pushState()` method to update the URL and state. In the `popstate` event listener, the corresponding article content is loaded based on the article ID saved in the history.
By listening to the article link click event, page switching and content loading when the article link is clicked is achieved by calling the `navigateToArticle()` function.
These examples demonstrate how the History API can be used in real-world applications for navigation, modal box management, and dynamic content loading.

## 📋 4. Compatibility and advantages and disadvantages

### 4.1 Compatibility

These are the compatibility lists for the History API, including the major browsers and the minimum versions they support:

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Opera ✅
- IE 10+✅

You can find details at [caniuse.com](https://caniuse.com/?search=History%20API).

### 4.2 Pros and Cons

The History API has the following Pros and Cons:

Pros:

- Enables refresh-free front-end routing and page navigation.
- Allows users to navigate pages using the browser's forward and backward buttons.
- Enables the creation of a smoother, more dynamic user experience

Cons:

- Compatibility issues: Different browsers may have different support for the History API.
- The `popstate` event needs to be handled in code to update the page content when the user clicks the forward or back button.

### 4.3 Tool Recommendations

1. [React Router](https://github.com/remix-run/react-router): 50.5K ⭐ React Router is a lightweight, fully-featured routing library for the React JavaScript library. React Router runs everywhere that React runs; on the web, on the server (using node.js), and on React Native.
2. [Vue Router](https://github.com/vuejs/vue-router):19K ⭐ React Router 的功能。Vue Router is the official router for [Vue.js](http://vuejs.org/). It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze.
3. [History.js](https://github.com/browserstate/history.js):10.8K ⭐ About
   History.js gracefully supports the HTML5 History/State APIs (pushState, replaceState, onPopState) in all browsers.
4. [page.js](https://github.com/visionmedia/page.js): 7.6K ⭐ Tiny Express-inspired client-side router.
5. [Navigo](https://github.com/krasimir/navigo): 2.6K ⭐ A simple vanilla JavaScript router.

## 🎯 5. Usage suggestions and considerations

- **Manipulate history with care**

When using the `pushState()` and `replaceState()` methods, avoid adding and replacing history entries frequently to avoid confusing the user experience.

- **Handle the popstate event**

Ensure that the `popstate` event is handled in code when the user clicks the forward or back button to update the page content when the history changes.

- **Compatibility handling**

Consider the differences in compatibility with the History API across browsers and use compatibility tools or the Polyfill library as needed to resolve compatibility issues.

- **Consider SEO**

When implementing front-end routing using the History API, be aware of the impact on search engine optimization (SEO). Ensure that web content can be properly indexed by search engine crawlers.

## 🍭 6. Summary

The History API is a set of JavaScript APIs for manipulating browser history, which provides us with front-end navigation and state management without refreshing the page. By using the History API, we can achieve interactive effects such as front-end routing, browsing history navigation and refresh-free loading of content to enhance user experience.

## 📚 7. Extensions

- [MDN Web Docs - History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [Using the HTML5 History API](https://css-tricks.com/using-the-html5-history-api/)
- [Creating a Single-Page App in React using React Router](https://www.taniarascia.com/using-react-router-spa/)

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
