## 🏝 1. 快速入门

### 1.1 概念介绍

[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) 是一个用于在客户端存储大量结构化数据（包括文件/二进制数据）的底层 API。相比于 [Web Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage_API) 适用于存储较小数据量的情况，IndexedDB 则非常适用于存储大量结构化数据。

### 1.2 作用和使用场景

IndexedDB 的主要作用是允许开发者在客户端持久化存储大量结构化数据。它适用于许多使用场景，包括：

- 离线应用程序：由于 IndexedDB 可以在客户端存储数据，并且具有强大的查询能力，因此可以实现离线应用程序，使应用程序在离线状态下仍然能够运行和提供功能。
- 缓存数据：通过将数据存储在 IndexedDB 中，可以在后续的页面加载中从本地读取数据，减少对远程服务器的请求，提高应用程序的性能。
- 大规模数据存储：如果你需要在客户端存储大量结构化数据，如日志、用户数据等，IndexedDB 是一个可行的选择。

## 🎨 2. 如何使用

在这一章节，我们将详细介绍如何使用 IndexedDB API 来进行数据的存储和检索操作。

### 2.1 属性和方法

以下是 IndexedDB API 的一些常用方法和对象：

- `indexedDB.open(databaseName, version)`: 打开或创建一个 IndexedDB 数据库。
- `database.createObjectStore(storeName, options)`: 创建一个对象存储空间。
- `store.add(data)`: 向对象存储空间添加数据。
- `store.get(key)`: 根据键检索数据。
- `store.put(data)`: 更新或添加数据。
- `store.delete(key)`: 根据键删除数据。
- `store.index(indexName)`: 获取索引对象，用于高性能搜索数据。

详细的 API 介绍和使用示例可以在 Mozilla Developer Network 的 [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB) 文档中找到。
以下是一个 JavaScript IndexedDB API 快速入门的使用示例：

```javascript
// 打开或创建数据库
const request = indexedDB.open("myDatabase", 1);

// 当数据库打开或创建成功时的回调函数
request.onsuccess = function (event) {
  const db = event.target.result;
  console.log("数据库已打开");

  // 在这里进行数据库操作，如存储数据、获取数据等
};

// 当数据库打开或创建失败时的回调函数
request.onerror = function (event) {
  console.error("数据库打开或创建失败", event.target.errorCode);
};

// 当数据库版本需要升级时的回调函数
request.onupgradeneeded = function (event) {
  const db = event.target.result;
  console.log("数据库需要升级");

  // 创建对象存储空间
  const objectStore = db.createObjectStore("myObjectStore", { keyPath: "id" });

  // 添加索引
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("email", "email", { unique: true });

  console.log("数据库升级完成");
};
```

## 🧭 3. 实际应用

以下是三个适合新人入门学习的实际使用场景示例:

### 3.1 存储用户偏好设置

IndexedDB 可以用来存储用户偏好设置，例如用户的语言偏好、主题样式等。下面是一个示例：

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

  // 存储用户偏好设置
  const transaction = db.transaction([STORE_NAME], "readwrite");
  const objectStore = transaction.objectStore(STORE_NAME);
  objectStore.put({ id: "language", value: "en" });
  objectStore.put({ id: "theme", value: "dark" });

  // 读取用户偏好设置
  const request = objectStore.get("language");
  request.onsuccess = function (event) {
    const language = event.target.result.value;
    console.log("Language:", language);
  };
};
```

代码解释:

- 首先打开一个名为 "myDatabase" 的 IndexedDB 数据库，版本号为 1。
- 如果数据库打开成功，那么创建一个名为 "settings" 的 object store。
- 在 onsuccess 事件中，创建一个读写事务并打开 "settings" object store，然后将用户偏好设置存储到该 object store 中。
- 最后，在 "settings" object store 中获取用户语言偏好并打印出来。

### 3.2 离线缓存

IndexedDB 可以用来实现离线缓存，将网站所需的资源缓存在本地，以便在离线时仍然能够访问这些资源。下面是一个示例：

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

代码解释:

- 在 install 事件中，打开一个名为 "myCache" + 版本号的缓存，并将所需的资源添加到缓存中。
- 在 fetch 事件中，如果请求的资源在缓存中存在，则直接返回缓存中的资源。
- 如果请求的资源不在缓存中，则从网络中获取该资源，并将该资源添加到缓存中，然后将该资源返回给页面。

### 3.3 数据可视化

IndexedDB 可以用来存储大量的数据，并且支持复杂的查询操作，因此可以用来实现数据可视化。下面是一个示例：

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

  // 存储数据
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

  // 查询数据
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

代码解释:

- 首先打开一个名为 "myDatabase" 的 IndexedDB 数据库，版本号为 1。
- 如果数据库打开成功，那么创建一个名为 "data" 的 object store，并在 "date" 上创建索引。
- 在 onsuccess 事件中，创建一个读写事务并打开 "data" object store，然后将数据存储到该 object store 中。
- 最后，在 "data" object store 中查询指定日期范围内的数据，并打印出来。

## 📋 4. 兼容性和优缺点

### 4.1 兼容性

以下是 IndexedDB API 的兼容性列表，包含了主流浏览器及其支持的最低版本：

- Chrome 11+✅
- Firefox 4+✅
- Safari 7.1+✅
- Edge 12+✅
- Opera 15+✅
- Internet Explorer 10+✅

![image.png](https://cdn.nlark.com/yuque/0/2023/png/186051/1684919122744-6aa991df-54a8-48cd-9b9a-ab55e8812939.png#averageHue=%23d6c6ad&clientId=u6cfe5da3-f52e-4&from=paste&height=727&id=u623e74be&originHeight=727&originWidth=1457&originalType=binary&ratio=1&rotation=0&showTitle=false&size=137563&status=done&style=none&taskId=ub97daa28-0a7b-41d1-a43d-3e656158d6a&title=&width=1457)
也可以在 [caniuse.com](https://caniuse.com/?search=IndexedDB) 上查看具体的兼容性信息。

### 4.2 优缺点

IndexedDB 的优点包括：

- 支持存储大量结构化数据，适用于需要存储大规模数据的应用场景。
- 具备强大的查询能力，可以方便地检索和过滤数据。
- 可以在离线状态下运行，为离线应用程序提供支持。

IndexedDB 的缺点包括：

- 学习曲线较陡峭，相对于其他存储方案，如 Web Storage，需要更多的开发工作。
- 兼容性存在差异，需要在使用时进行兼容性检查。

### 4.3 工具推荐

推荐一些与 IndexedDB 相关的工具，它们提供了简化 IndexedDB 开发的功能，并且在 GitHub 上有活跃的开发者社区支持。

1. [localForage](https://github.com/localForage/localForage)：22.2K ⭐， 一个简单的 JavaScript 库，提供了统一的 API，用于使用异步存储机制（如 IndexedDB、WebSQL、localStorage）进行数据存储。
2. [PouchDB](https://github.com/pouchdb/pouchdb)：15.7K ⭐， 一个支持离线存储和同步的 JavaScript 数据库，基于 IndexedDB 进行本地数据存储。
3. [Dexie.js](https://github.com/dfahlander/Dexie.js)：9.3K ⭐， 一个简单、优雅的 IndexedDB 封装库，提供了简化的 API，使 IndexedDB 更易用。
4. [idb](https://github.com/jakearchibald/idb)：5.3K ⭐， 一个简单的 IndexedDB 封装库，提供了简洁的 API，使 IndexedDB 的使用更加方便。

## 🎯 5. 使用建议和注意事项

以下是 IndexedDB 使用建议和注意事项：

### 5.1 使用建议

1. 在设计 IndexedDB 数据库时，应该尽量将不同类型的数据存储在不同的 object store 中，以便更好地管理和查询数据。
2. 对于需要频繁查询的数据，应该在 object store 中创建索引，以便更快地查询数据。
3. 在读取数据时，应该尽量使用游标，以便更有效地读取数据。
4. 在使用 IndexedDB API 时，应该尽量避免使用同步操作，以免阻塞浏览器主线程。

### 5.2 注意事项

1. IndexedDB API **不支持跨域访问**，因此只能在同一域名下使用。
2. IndexedDB API **不支持 SQL 查询语句**，因此需要使用复杂的游标查询操作来查询数据。
3. IndexedDB 数据库的**大小受到浏览器设置的限制**，因此需要注意数据库大小和性能问题。
4. IndexedDB API 的使用方式与传统的关系型数据库有很大的区别，因此需要花费一定的时间来理解和学习。

## 🍭 6. 总结

IndexedDB 是一个用于在客户端存储大量结构化数据的底层 API。本文介绍了它的概念、使用场景以及如何使用它进行数据存储和检索操作。还讨论了它的兼容性和优缺点，并推荐了几个与 IndexedDB 相关的工具。希望本文能够帮助你更好地理解和应用 IndexedDB。

## 📚 7. 拓展阅读

如果你对 IndexedDB 感兴趣，以下是一些额外的资源供你进一步学习：

- [IndexedDB API - Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Using IndexedDB - Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

请注意，以上提到的链接可能随时间而变化，建议在阅读时查看最新的文档。
