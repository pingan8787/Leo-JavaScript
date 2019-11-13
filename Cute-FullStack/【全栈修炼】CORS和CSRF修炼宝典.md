CORS 和 CSRF 太容易混淆了，看完本文，你就清楚了。

## 一、CORS 和 CSRF 概念

先看下图：

![CORS 和 CSRF 概念](CORS-CSRF-1.png)

两者概念完全不同，另外常常我们也会看到 XSS ，这里一起介绍：

1. **CORS** ： Cross Origin Resourse-Sharing  跨站资源共享

2. **CSRF** ： Cross-Site Request Forgery  跨站请求伪造

3. **XSS** ： Cross Site Scrit 跨站脚本攻击（为与 CSS 区别，所以在安全领域叫 XSS）

## 二、CORS

### 1. 概念

> 跨来源资源共享（CORS），亦译为跨域资源共享，是一份浏览器技术的规范，提供了 Web 服务从不同网域传来沙盒脚本的方法，以避开浏览器的同源策略，是 JSONP 模式的现代版。与 JSONP 不同，CORS 除了 GET 请求方法以外也支持其他的 HTTP 请求。用 CORS 可以让网页设计师用一般的 XMLHttpRequest，这种方式的错误处理比 JSONP 要来的好。另一方面，JSONP 可以在不支持 CORS 的老旧浏览器上运作。现代的浏览器都支持 CORS。
—— [维基百科](https://zh.wikipedia.org/wiki/%E8%B7%A8%E4%BE%86%E6%BA%90%E8%B3%87%E6%BA%90%E5%85%B1%E4%BA%AB)

**核心知识：** CORS是一个W3C标准，它允许浏览器向跨源服务器，发出`XMLHttpRequest` 请求，从而克服 AJAX 只能同源使用的限制。

因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信，即为了解决**跨域问题**。

### 2. CORS 请求类型
 
浏览器将 CORS 请求分成两类：**简单请求**（simple request）和**非简单请求**（not-so-simple request）。

**简单请求**一般包括下面两种情况：

|情况|描述|
|---|---|
|请求方法|请求方法为：`HEAD` 或 `GET` 或 `POST`；|
|HTTP 头信息|HTTP 头信息不超出以下几种字段：`Accept`<br/>`Accept-Language`<br/>`Content-Language`<br/>`Last-Event-ID`<br/>`Content-Type`：只限于三个值 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`|

凡是不同时满足上面两个条件，就属于**非简单请求**。

### 3. 简单请求的 CORS 流程

当浏览器发现我们的 AJAX 请求是个**简单请求**，便会自动在**头信息**中，增加一个 `Origin` 字段。

`Origin` 字段用来说明本次请求的来源（包括**协议** + **域名** + **端口号**），服务端根据这个值来决定是否同意此次请求。

![简单请求的 CORS 流程](CORS-CSRF-2.png)

当 `Origin` 指定的源不在许可范围，服务器会返回一个正常的 HTTP 回应，但浏览器会在响应头中发现 `Access-Control-Allow-Origin` 字段，便抛出异常。


当 `Origin` 指定的源在许可范围，服务器返回的响应头中会多出几个头信息字段：

![简单请求的 CORS 流程](CORS-CSRF-3.png)

除了上面图中的头信息，一般会有以下三个相关头信息：

1. `Access-Control-Allow-Origin`

该字段是必须的。表示许可范围的域名，通常有两种值：**请求时 Origin 字段的值**或者 `*`（星号）表示任意域名。

2. `Access-Control-Allow-Credentials`

该字段可选。布尔值，表示是否允许在 CORS 请求之中发送 `Cookie` 。若不携带 `Cookie` 则不需要设置该字段。

当设置为 `true` 则  `Cookie` 包含在请求中，一起发送给服务器。还需要在 AJAX 请求中开启 `withCredentials` 属性，否则浏览器也不会发送 `Cookie` 。

```js
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

3. `Access-Control-Expose-Headers`

该字段可选。可以设置需要获取的字段。因为默认 CORS 请求时，`XMLHttpRequest` 对象的`getResponseHeader()`方法只能拿到以下 6 个基本字段：

`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。

### 4. 非简单请求的 CORS 流程

**非简单请求**情况如：请求方法是 **PUT** / **DELETE** 或者 `Content-Type:application/json` 类型的请求。

在非简单请求发出 CORS 请求时，会在正式通信之前增加一次 **“预检”请求（OPTIONS方法）**，来询问服务器，本次请求的域名是否在许可名单中，以及使用哪些头信息。

当 **“预检”请求** 通过以后，才会正式发起 AJAX 请求，否则报错。

#### 4.1 预检请求

```http
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
User-Agent: Mozilla/5.0...
...
```

**“预检”请求** 信息中包含两个特殊字段：

1. `Access-Control-Request-Method`

该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法，上例是 `PUT`。

2. `Access-Control-Request-Headers`

指定浏览器 CORS 请求额外发送的头信息字段，上例是 `X-Custom-Header`。

#### 4.2 预检响应

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Connection: Keep-Alive
...
```

当预检请求**通过**以后，在预检响应头中，会返回 `Access-Control-Allow-` 开头的信息，其中 `Access-Control-Allow-Origin` 表示许可范围，值也可以是 `*`。

当预检请求**拒绝**以后，在预检响应头中，不会返回 `Access-Control-Allow-` 开头的信息，并在控制台输出错误信息。

## 三、CSRF

> 跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。
—— [维基百科](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)

## 四、XSS

> 跨站脚本（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。
—— [维基百科](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)




## 参考文章

1. [《跨域资源共享 CORS 详解》](www.ruanyifeng.com/blog/2016/04/cors.html)
2. [《CSRF & CORS》](https://www.cnblogs.com/lailailai/p/4528092.html)
3. [《跨站脚本攻击—XSS》](https://segmentfault.com/a/1190000020402185)
4. [《前端安全系列（一）：如何防止XSS攻击？》](https://tech.meituan.com/2018/09/27/fe-security.html)