
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

1. 获取所有 users 

```
GET /api/users
```

2. 获取指定 id 的 users

```
GET /api/users/100
```

3. 新建一条 users 记录

```
POST /api/users
```

4. 更新一条 users 记录

```
PUT /api/users/100
```

5. 删除一条 users 记录

```
DELETE /api/users/100
```

6. 获取一个 users 的所有消费账单

```
GET  /api/users/100/bill
```

7. 获取一个 user 指定时间的消费账单

```
GET  /api/users/100/bill?from=201910&to=201911
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

### 2. 获取用户列表

这一步我们会创建 RESTful API 中的 **/users**，使用 GET 来**读取用户的信息列表**：

```js
// index.js
const express = require('express');
const app = express();
const fs = require("fs");

// 定义 读取用户的信息列表 的接口
app.get('/users', (req, res) => {
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

这一步我们会创建 RESTful API 中的 **/users**，使用 POST 来**添加用户记录**：

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
app.post('/users', (req, res) => {
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

这一步我们在 RESTful API 中的 URI 后面加上 **/users/:id**，使用 GET 来**获取指定用户详情**：

```js
// index.js
// 省略之前文件 只展示需要实现的接口

// 定义 获取指定用户详情 的接口
app.get('/users/:id', (req, res) => {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
       data = JSON.parse( data );
       const user = data["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})
```

### 5. 删除指定用户

这一步我们会创建 RESTful API 中的 **/users**，使用 DELETE 来**删除指定用户**：

```js
// index.js
// 省略之前文件 只展示需要实现的接口

// mock 一条要删除的用户id
const id = 2;

app.delete('/users', (req, res) => {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
       data = JSON.parse( data );
       delete data["user" + id];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})
```

## 四、REST 最佳实践

### 1. URL 设计

#### 1.1 "动词 + 宾语"的操作指令结构

客户端发出的数据操作指令都是"**动词 + 宾语**"的结构。

如上面提到的，`GET /user` 这个命令，`GET` 是动词，`/user` 是宾语。根据 HTTP 规范，动词一律大写。

动词通常有以下五种 HTTP 方法：

GET：读取（Read）
POST：新建（Create）
PUT：更新（Update）
PATCH：更新（Update），通常是部分更新
DELETE：删除（Delete）

#### 1.2 宾语必须是名词
宾语就是 API 的 URL，是 HTTP 动词作用的对象。它应该是名词，不能是动词。

比如，`/users` 是正确的，因为 URL 是名词，而下面就都是错误的了：
```
/getUsers
/createUsers
/deleteUsers
```

#### 1.3 建议复数 URL

因为 URL 是名词，没有单复数的限制，但是还是建议如果是一个集合，就使用复数形式。如 `GET /users` 来读取所有用户列表。

#### 1.4 避免多级 URL 

避免在多层级资源时，使用多级 URL。常见案例如**获取某位用户的购买过的某一类商品**:

```
GET /users/100/product/120
```

这种 URL 语意不明，也不利拓展，建议只有第一级，其他级别用查询字符串来表达：

```
GET /users/100?product=120
```

### 2. 准确的状态码表示

HTTP 五大类状态码有100多种，每一种状态码都有标准的（或者约定的）解释，客户端只需查看状态码，就可以判断出发生了什么情况，所以服务器应该返回尽可能精确的状态码。

这边列举几个经常使用的状态码介绍：

* **303 See Other**：表示参考另一个 URL。

* **400 Bad Request**：服务器不理解客户端的请求，未做任何处理。

* **401 Unauthorized**：用户未提供身份验证凭据，或者没有通过身份验证。

* **403 Forbidden**：用户通过了身份验证，但是不具有访问资源所需的权限。

* **404 Not Found**：所请求的资源不存在，或不可用。

* **405 Method Not Allowed**：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。

* **410 Gone**：所请求的资源已从这个地址转移，不再可用。

* **415 Unsupported Media Type**：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。

* **422 Unprocessable Entity**：客户端上传的附件无法处理，导致请求失败。

* **429 Too Many Requests**：客户端的请求次数超过限额。

* **500 Internal Server Error**：客户端请求有效，服务器处理时发生了意外。

* **503 Service Unavailable**：服务器无法处理请求，一般用于网站维护状态。

### 3. 服务端响应

#### 3.1 应该返回 JSON 对象
  
API 返回的数据格式应该是 JSON 一个对象。

#### 3.2 发生错误时，不要返回 200 状态码

在发生错误时，如果还返回 200 状态码，前端需要解析返回数据才知道错误信息，这样实际上取消了状态码，是不恰当的。

正确的做法应该是在错误时，返回对应错误状态码，并将错误信息返回：

```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Invalid payoad.",
  "detail": {
     "surname": "This field is required."
  }
}
```



## 参考资料

1. [《维基百科 - 表现层状态转换》](https://zh.wikipedia.org/wiki/%E8%A1%A8%E7%8E%B0%E5%B1%82%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2)
2. [《RESTful风格的springMVC》](https://blog.csdn.net/wy5612087/article/details/52149249)
3. [《Node.js RESTful API》](https://www.runoob.com/nodejs/nodejs-restful-api.html)
4. [《RESTful API 最佳实践》](https://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html)

## 关于我

> 本文首发在 [pingan8787个人博客](http://www.pingan8787.com)，如需转载请联系本人。

|Author|王平安|
|---|---|
|E-mail|pingan8787@qq.com|
|博  客|www.pingan8787.com|
|微  信|pingan8787|
|每日文章推荐|https://github.com/pingan8787/Leo_Reading/issues|
|ES小册|js.pingan8787.com|

##  微信公众号
![bg](http://images.pingan8787.com/blog/2019_10_24guild_page.png)  
