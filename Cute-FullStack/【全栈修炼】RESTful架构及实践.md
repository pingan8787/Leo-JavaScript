
![RESTful API](http://images.pingan8787.com/blog/RESTful.png)

## 一、概念介绍

### 1. REST 概念
REST：（Representational State Transfer）即**表现层状态转换**，定义了**资源**的通用访问格式，是一种网络应用程序的**设计风格**和**开发方式**。

在概念中，需要理解以下几个名称：

1. 资源（Resource）

即**服务器上获取到的东西任何资源**，一条用户记录，一个用户的密码，一张图片等等都是。

2. 资源的表述（Representation）

即**资源格式**，是 HTML、XML、JSON、纯文本、图片等等，可以用各种各样的格式来表述你获取到的资源。

3. 状态转移（State Transfer）

即**URL定位资源**，用 HTTP 动词（GET,POST,DELETE,DETC）描述操作。操作是动词，资源是名词。

4. 统一接口（Uniform Interface）

即通过统一的接口对资源进行操作。

### 2. REST 特点

REST 通常基于使用 `HTTP` ， `URI` ，和 `XML` 以及 `HTML` 这些现有的广泛流行的协议和标准，每一种 URI 代表一种资源。

REST 通常使用 `JSON` 数据格式。

REST 基本架构的四个方法：

* **GET** - 用于**获取数据**

* **PUT** - 用于**更新或添加数据**

* **DELETE** - 用于**删除数据**

* **POST** - 用于**添加数据**

下面会通过一个场景介绍。

### 3. REST 优点

* 可更高效利用缓存来提高响应速度
* 通讯本身的无状态性可以让不同的服务器的处理一系列请求中的不同请求，提高服务器的扩展性
* 浏览器即可作为客户端，简化软件需求
* 相对于其他叠加在HTTP协议之上的机制，REST的软件依赖性更小
* 不需要额外的资源发现机制
* 在软件技术演进中的长期的兼容性更好

## 二、实例介绍

REST 定义了资源的通用访问格式，接下来一个消费者为实例，介绍 RESTful API 定义：

1. 获取所有 user 

```
GET /api/user
```

2. 获取指定 id 的 user

```
GET /api/user/100
```

3. 新建一条 user 记录

```
POST /api/user
```

4. 更新一条 user 记录

```
PUT /api/user/100
```

5. 删除一条 user 记录

```
DELETE /api/user/100
```

6. 获取一个 user 的所有消费账单

```
GET  /api/user/100/bill
```

7. 获取一个 user 指定时间的消费账单

```
GET  /api/user/100/bill?from=201910&to=201911
```

以上其中 RESTful 风格 API 几乎包含常见业务情况。

## 三、Nodejs 实现 RESTful API

### 1. 初始化 mock 数据

本案例使用 mock 数据来演示，如下：

```json
{
   "user1" : {
      "name" : "leo",
      "password" : "123456",
      "profession" : "teacher",
      "id": 1
   },
   "user2" : {
      "name" : "pingan8787",
      "password" : "654321",
      "profession" : "librarian",
      "id": 2
   },
   "user3" : {
      "name" : "robin",
      "password" : "888888",
      "profession" : "clerk",
      "id": 3
   }
}
```

我们将实现以下 RESTful API ：

![RESTful API](http://images.pingan8787.com/blog/RESTful-API-1.png)

### 2. 获取用户列表

这一步我们会创建 RESTful API 中的 **listUsers**，用来**读取用户的信息列表**：

```js
// index.js
const express = require('express');
const app = express();
const fs = require("fs");

// 定义 读取用户的信息列表 的接口
app.get('/listUsers', (req, res) => {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
       console.log( data );
       res.end( data );
   });
})

const server = app.listen(8081, function () {
    const {address, port} = server.address();
    console.log("server run in: http://%s:%s", address, port);
})
```

### 3. 添加用户

这一步我们会创建 RESTful API 中的 **addUser**，用来**添加用户记录**：

```js
// index.js
// 省略之前文件 只展示需要实现的接口

// mock 一条要新增的数据
const user = {
   "user4" : {
      "name" : "pingan",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

// 定义 添加用户记录 的接口
app.get('/addUser', (req, res) => {
   // 读取已存在的数据
   fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})
```

### 4. 获取用户详情

这一步我们在 RESTful API 中的 URI 后面加上 **:id**，用来**获取指定用户详情**：

```js
// index.js
// 省略之前文件 只展示需要实现的接口

// 定义 获取指定用户详情 的接口
app.get('/:id', (req, res) => {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
       data = JSON.parse( data );
       var user = data["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})
```

### 5. 删除指定用户

这一步我们会创建 RESTful API 中的 **deleteUser**，用来**删除指定用户**：

```js
// index.js
// 省略之前文件 只展示需要实现的接口

// mock 一条要删除的用户id
const id = 2;

app.get('/deleteUser', (req, res) => {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
       data = JSON.parse( data );
       delete data["user" + id];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})
```


## 参考资料

1. [《维基百科 - 表现层状态转换》](https://zh.wikipedia.org/wiki/%E8%A1%A8%E7%8E%B0%E5%B1%82%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2)
2. [《RESTful风格的springMVC》](https://blog.csdn.net/wy5612087/article/details/52149249)
3. [《Node.js RESTful API》](https://www.runoob.com/nodejs/nodejs-restful-api.html)