Welcome to the **Must Know JavaScript API** series, this series will learn the **JavaScript API** with you, so that you can be more proficient in using it like a senior engineer. Let's start learning together:

- [**Page Visibility API**](https://javascript.plainenglish.io/must-know-javascript-api-page-visibility-api-9f3e10439842)
- [**Broadcast Channel API**](https://javascript.plainenglish.io/must-know-javascript-api-broadcast-channel-api-f059860f9349)
- [**Resize Observer API**](https://javascript.plainenglish.io/must-know-javascript-api-resize-observer-api-9420aab1a74)
- [**Beacon API**](https://medium.com/javascript-in-plain-english/must-know-javascript-api-beacon-api-4abe0bee29ff)
- [**Clipboard API**](https://javascript.plainenglish.io/must-know-javascript-api-clipboard-api-22ac0861e27b)
- [**Fetch API**](https://javascript.plainenglish.io/must-know-javascript-api-fetch-api-11846c9a3b07)
- [**Performance API**](https://javascript.plainenglish.io/must-know-javascript-api-performance-api-85f7b8306b90)

## 🏝 1. What is Storage API

### 1.1 Introduction

The Web Storage API contains two sets of common methods: `localStorage` and `sessionStorage`. These methods allow developers to save and retrieve data in the browser.

- localStorage

is used for **persistent storage of data**, which remains in the user's browser, even if the user closes the browser or restarts the device.

- sessionStorage

Used for **temporary storage of data**, where data is only valid for the duration of the current session. When the user closes the browser tab or browser window, the data is deleted.

### 1.2 Use Case

The Web Storage API has many usage scenarios, such as

- Saving user preferences and settings
- Caching data to improve application performance
- Sharing data between different pages
- Implementing offline applications

## 🎨 2. How to use the Storage API

To use the Web Storage API, proceed as follows:

1. access the API through the `localStorage` or `sessionStorage` object;
2. use the `setItem(key, value)` method to store the key-value pair data into Web Storage;
3. use the `getItem(key)` method to get the value of a specific key. 4. use the `removeItem(key)` method to get the value of a specific key;
4. using the `removeItem(key)` method to delete the data for the specified key;
5. use the `clear()` method to clear the data in the entire Web Storage.

The following is a simple example code that demonstrates how to store and retrieve data using the Web Storage API:

```javascript
// Storing data
localStorage.setItem("username", "Chirs1993");
localStorage.setItem("email", "Chirs1993@example.com");

// Get the data
const username = localStorage.getItem("username");
const email = localStorage.getItem("email");

console.log(username); // output: Chirs1993
console.log(email); // output: Chirs1993@example.com
```

## 🧭 3. Examples of the Storage API

The following are 5 practical application scenarios:

### 3.1 Saving user preferences and settings

The Web Storage API is ideal for saving user preferences and settings. By saving the user's preferences in the local browser, you can provide a better user experience and restore their personalized settings the next time they visit the site.

```javascript
// Store user preferences
localStorage.setItem("theme", "dark");
localStorage.setItem("fontSize", "16px");

// Get user preferences
const theme = localStorage.getItem("theme");
const fontSize = localStorage.getItem("fontSize");
```

### 3.2 Caching data to improve application performance

By caching frequently used data to local storage, you can reduce requests to the server and improve the performance and responsiveness of your application.

```javascript
// Check if there is cached data in local storage
if (localStorage.getItem("cachedData")) {
  // Get the cached data from the local storage
  const data = JSON.parse(localStorage.getItem("cachedData"));
  // Use cached data
  // ...
} else {
  // Get the data from the server
  // ...
  // store the data in local storage
  localStorage.setItem("cachedData", JSON.stringify(data));
}
```

### 3.3 Sharing data between pages

The Web Storage API allows data to be shared between different pages in the same browser. This is useful for applications that need to pass information or share state across multiple pages.

To set up shared data on Page A:

```javascript
localStorage.setItem("sharedData", "Hello, World!");
```

Get shared data on Page B:

```javascript
const sharedData = localStorage.getItem("sharedData");
console.log(sharedData); // Output: "Hello, World!"
```

### 3.4 Storing Form Data

Using the Web Storage API, you can easily store and retrieve form data to enable automatic filling or restoring of form data.

```html
<input type="text" id="username" placeholder="Username" />
<input type="password" id="password" placeholder="Password" />

<button id="saveBtn">Save</button>
<button id="loadBtn">Load</button>
```

```javascript
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Save form data
saveBtn.addEventListener("click", () => {
  localStorage.setItem("username", usernameInput.value);
  localStorage.setItem("password", passwordInput.value);
}).

// Load the form data
loadBtn.addEventListener("click", () => {
  usernameInput.value = localStorage.getItem("username");
  passwordInput.value = localStorage.getItem("password");
}).
```

### 3.5 Remembering user login status

The Web Storage API can be used to remember the user's login status so that the user stays logged in when they visit the site again after closing the browser.

```javascript
// Store the user's login status to local storage after a successful login
localStorage.setItem("isLoggedIn", "true").

// Check if the login status exists in the local storage
const isLoggedIn = localStorage.getItem("isLoggedIn").

// Perform the appropriate action based on the logged in status
if (isLoggedIn === "true") {
  // The user is logged in, execute the corresponding logic
  // ...
} else {
  // The user is not logged in, execute the corresponding logic
  // ...
}
```

In the above example, when the user logs in successfully, we set the login status to 'true' and store it in the local store. Each time the user accesses the site, we get the login status from the local store and perform the appropriate actions based on the login status.

## 📋 4. Compatibility and advantages and disadvantages

### 4.1 Compatibility

The following is the compatibility of the Storage API on different browsers:

- Chrome: 4+ ✅
- Firefox: 3.5+ ✅
- Safari: 4+ ✅
- Internet Explorer: 8+ ✅
- Edge: 12+ ✅
- Opera: 10.50+ ✅
- iOS Safari: 3.2+ ✅
- Android Browser: 2.1+ ✅
- Chrome for Android: 18+ ✅

These version numbers indicate basic support for the Web Storage API. Please note that specific compatibility may change due to browser updates, so it is recommended that you refer to official documentation or other reliable resources for the latest compatibility information during development.

You can find details at [Can I use Web Storage](https://caniuse.com/?search=Storage).

### 4.2 Pros and Cons

The Web Storage API has the following advantages:

- **Easy to use**: It is very simple to use and only requires a few lines of code to store and retrieve data.
- **Persistent Storage**: Using `localStorage` allows data to be stored permanently, even if the user closes the browser.
- **Large capacity**: Web Storage offers a large storage capacity, usually around a few megabytes.

However, the Web Storage API also has some limitations and drawbacks:

- **String storage only**: Web Storage API can only store data of string type, if you need to store complex JavaScript objects, you need to perform serialization and deserialization operations.
- **Domain Restrictions**: The data of Web Storage API is associated with a specific domain name, and it is not possible to share data between different domains.

## 👍 5. Usage suggestions and considerations

When using the Web Storage API, the following are some suggestions and considerations:

- **Appropriate use of localStorage and sessionStorage**

Choose the appropriate storage mechanism according to your needs, use `localStorage` if you need to store data persistently, or use `sessionStorage` if you need to store data temporarily.

- **Data Security**

The data stored in the Web Storage API is stored in plaintext, so avoid storing sensitive information such as passwords or personally identifiable information.

- **Capacity Limits**

Although Web Storage offers a large storage capacity, it is still important to be careful not to abuse the storage space to avoid affecting browser performance and user experience.

- **Consider compatibility**

When using the Web Storage API, consider compatibility with different browsers and provide alternatives or use the Polyfill library to address compatibility issues as needed.

## 🍭 6. Summary

The Web Storage API helps developers manage data in the browser. By understanding its concepts, usage, and compatibility, advantages and disadvantages, developers can better leverage this API to meet the needs of their applications.

## 🎯 7. Extensions

If you are interested in the Web Storage API and would like to learn more about it, you can refer to the following materials:

- [MDN Web Storage API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

Detailed documentation on the Web Storage API from the Mozilla Developer Network, including API usage, examples, and references.

- [HTML5 Web Storage: Introduction and Examples](https://www.sitepoint.com/html5-web-storage)

An article on SitePoint that provides an introduction and sample code about the Web Storage API.

- [LocalForage](https://github.com/localForage/localForage)

A JavaScript library based on the Web Storage API that provides a simpler and unified data storage interface, and addresses some compatibility and security issues.

I hope this article has helped you understand and use the Web Storage API!

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
