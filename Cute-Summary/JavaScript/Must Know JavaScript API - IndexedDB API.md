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

## 🏝 1. What is IndexedDB API

### 1.1 Introduction

[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) is an underlying API for storing large amounts of structured data (including files/binary data) on the client side.

In contrast to [Web Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage_API), which is suitable for storing smaller amounts of data, IndexedDB is very suitable for storing large amounts of structured data.

### 1.2 Use Case

The primary role of IndexedDB is to allow developers to store large amounts of structured data persistently on the client side. It is suitable for many usage scenarios, including

- Offline applications: Because IndexedDB can store data on the client side and has powerful query capabilities, offline applications can be implemented, allowing applications to run and provide functionality even when offline.
- Caching data: By storing data in IndexedDB, data can be read locally on subsequent page loads, reducing requests to remote servers and improving application performance.
- Large-scale data storage: If you need to store large amounts of structured data on the client side, such as logs, user data, etc., IndexedDB is a viable option.

## 🎨 2. How to use

In this section, we will describe in detail how to use the IndexedDB API to perform data storage and retrieval operations.

### 2.1 Properties and Methods

The following are some common methods and objects of the IndexedDB API:

- `indexedDB.open(databaseName, version)`: Opens or creates an IndexedDB database.
- `database.createObjectStore(storeName, options)`: Creates an object store.
- `store.add(data)`: Adds data to the object store.
- `store.get(key)`: Retrieve data based on the key.
- `store.put(data)`: Update or add data.
- `store.delete(key)`: Deletes data according to the key.
- `store.index(indexName)`: Get index object for high performance search of data.

A detailed API description and usage examples can be found in the Mozilla Developer Network's [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB) documentation.
The following is a quick start example of using the JavaScript IndexedDB API:

```javascript
// Open or create a database
const request = indexedDB.open("myDatabase", 1);

// Callback function when the database is opened or created successfully
request.onsuccess = function (event) {
  const db = event.target.result;
  console.log("Database is open");

  // Perform database operations here, such as storing data, fetching data, etc.
};

// Callback function when database opening or creation fails
request.onerror = function (event) {
  console.error("Database opening or creation failure", event.target.errorCode);
};

// Callback function when the database version needs to be upgraded
request.onupgradeneeded = function (event) {
  const db = event.target.result;
  console.log("Database needs to be upgraded");

  // Create object storage space
  const objectStore = db.createObjectStore("myObjectStore", { keyPath: "id" });

  // Add Index
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("email", "email", { unique: true });

  console.log("Database upgrade completed");
};
```

## 🧭 3. Examples

The following are three examples of practical usage scenarios for newcomers.

### 3.1 Storing user preferences

IndexedDB can be used to store user preferences, such as user language preferences, theme styles, etc. The following is an example:

```javascript
const DB_NAME = "myDatabase";
const DB_VERSION = 1;
const STORE_NAME = "settings";

const request = window.indexedDB.open(DB_NAME, DB_VERSION);

request.onerror = function (event) {
  console.log("Database error: " + event.target.errorCode);
};

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "id" });
};

request.onsuccess = function (event) {
  const db = event.target.result;

  // Storing User Preferences
  const transaction = db.transaction([STORE_NAME], "readwrite");
  const objectStore = transaction.objectStore(STORE_NAME);
  objectStore.put({ id: "language", value: "en" });
  objectStore.put({ id: "theme", value: "dark" });

  // Read user preferences
  const request = objectStore.get("language");
  request.onsuccess = function (event) {
    const language = event.target.result.value;
    console.log("Language:", language);
  };
};
```

- First open an IndexedDB database named "myDatabase" with version 1.
- If the database is opened successfully, then an object store named "settings" is created.
- In the onsuccess event, create a read/write transaction and open the "settings" object store, then store the user preferences in the object store.
- Finally, the user's language preferences are retrieved from the "settings" object store and printed out.

### 3.2 Offline Caching

IndexedDB can be used to implement offline caching, caching the resources needed for a website locally so that they can still be accessed when offline. The following is an example:

```javascript
const CACHE_NAME = "myCache";
const CACHE_VERSION = 1;
const CACHE_URLS = ["/index.html", "/style.css", "/script.js"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME + "-" + CACHE_VERSION).then(function (cache) {
      return cache.addAll(CACHE_URLS);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (response) {
        caches.open(CACHE_NAME + "-" + CACHE_VERSION).then(function (cache) {
          cache.put(event.request, response);
        });

        return response.clone();
      });
    })
  );
});
```

- In the install event, a cache named "myCache" + version number is opened and the requested resource is added to the cache.
- In the fetch event, if the requested resource exists in the cache, the requested resource is returned directly from the cache.
- If the requested resource is not in the cache, the resource is fetched from the network, added to the cache, and returned to the page.

### 3.3 Data Visualization

IndexedDB can be used to store large amounts of data and support complex query operations, so it can be used to visualize data. The following is an example:

```javascript
const DB_NAME = "myDatabase";
const DB_VERSION = 1;
const STORE_NAME = "data";

const request = window.indexedDB.open(DB_NAME, DB_VERSION);

request.onerror = function (event) {
  console.log("Database error: " + event.target.errorCode);
};

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "id" });
  objectStore.createIndex("date", "date");
};

request.onsuccess = function (event) {
  const db = event.target.result;

  // Storage Data
  const transaction = db.transaction([STORE_NAME], "readwrite");
  const objectStore = transaction.objectStore(STORE_NAME);

  const data = [
    { id: 1, date: "2022-01-01", value: 100 },
    { id: 2, date: "2022-01-02", value: 200 },
    { id: 3, date: "2022-01-03", value: 300 },
  ];

  data.forEach(function (item) {
    objectStore.put(item);
  });

  // Query Data
  const index = objectStore.index("date");
  const range = IDBKeyRange.bound("2022-01-01", "2022-01-03");
  const request = index.openCursor(range);

  request.onsuccess = function (event) {
    const cursor = event.target.result;
    if (cursor) {
      console.log(cursor.value);
      cursor.continue();
    }
  };
};
```

- First open an IndexedDB database named "myDatabase" with version 1.
- If the database is opened successfully, then create an object store named "data" and create an index on "date".
- In the onsuccess event, create a read/write transaction and open the "data" object store, then store the data in that object store.
- Finally, the data in the "data" object store is queried for the specified date range and printed out.

## 📋 4. Compatibility and advantages and disadvantages

### 4.1 Compatibility

These are the minimum versions of major browsers supported by the IndexedDB API:

- Chrome 11+✅
- Firefox 4+✅
- Safari 7.1+✅
- Edge 12+✅
- Opera 15+✅
- Internet Explorer 10+✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1684919122744-6aa991df-54a8-48cd-9b9a-ab55e8812939.png#averageHue=%23d6c6ad&clientId=u6cfe5da3-f52e-4&from=paste&height=727&id=u623e74be&originHeight=727&originWidth=1457&originalType=binary&ratio=1&rotation=0&showTitle=false&size=137563&status=done&style=none&taskId=ub97daa28-0a7b-41d1-a43d-3e656158d6a&title=&width=1457)

You can find details at [caniuse.com](https://caniuse.com/?search=IndexedDB).

### 4.2 Pros and Cons

The benefits of IndexedDB include:

- Supports storing large amounts of structured data, suitable for application scenarios that require storing large-scale data.
- Powerful query capability to easily retrieve and filter data.
- Can be run offline, providing support for offline applications.

Disadvantages of IndexedDB include:

- Steeper learning curve, requiring more development work compared to other storage solutions, such as Web Storage.
- Compatibility differences and the need to perform compatibility checks at the point of use.

### 4.3 Tool Recommendations

1. [localForage](https://github.com/localForage/localForage)：22.2K ⭐, 💾 Offline storage, improved. Wraps IndexedDB, WebSQL, or localStorage using a simple but powerful API.
2. [PouchDB](https://github.com/pouchdb/pouchdb)：15.7K ⭐, 🐨 - PouchDB is a pocket-sized database.
3. [Dexie.js](https://github.com/dfahlander/Dexie.js)：9.3K ⭐, A Minimalistic Wrapper for IndexedDB.
4. [idb](https://github.com/jakearchibald/idb)：5.3K ⭐, IndexedDB, but with promises.

## 🎯 5. Usage suggestions and considerations

When using the IndexedDB API, you should be aware of the following points:

### 5.1 Suggestions for use

1. When designing the IndexedDB database, you should try to store different types of data in different object stores for better data management and querying. 2.
   For the data that needs to be queried frequently, indexes should be created in the object store to query the data faster. 3.
   When reading data, you should try to use cursors to read data more efficiently. 4.
2. When using the IndexedDB API, you should try to avoid using synchronous operations to avoid blocking the main browser thread.

### 5.2 Precautions

1. The IndexedDB API **does not support cross-domain access**, so it can only be used under the same domain.
2. The IndexedDB API **does not support SQL query statements**, so you need to use complex cursor query operations to query data.
3. The size of IndexedDB database **is limited by browser settings**, so you need to pay attention to database size and performance issues.
4. The way of using IndexedDB API is very different from traditional relational database, so you need to spend some time to understand and learn.

## 🍭 6. Summary

IndexedDB is an underlying API for storing large amounts of structured data on the client side, and this article introduces its concepts, usage scenarios, and how to use it for data storage and retrieval operations. It also discusses its compatibility, advantages and disadvantages, and recommends several tools related to IndexedDB. We hope this article will help you better understand and apply IndexedDB.

## 📚 7. Extensions

- [IndexedDB API - Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Using IndexedDB - Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

If you like to learn JavaScript, you can follow me on [Medium](https://medium.com/@Chris1993) or [Twitter](https://twitter.com/Chris1993Coding) to read more about JavaScript!
