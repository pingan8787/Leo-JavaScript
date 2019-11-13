CORS 和 CSRF 这两个名字长得实在太像了！

千万别混淆了，看完本文，你就清楚了。

开始介绍：

## 一、CORS 和 CSRF 概念

先看下图：

![CORS 和 CSRF 概念](CORS-CSRF-1.png)

两者概念完全不同，另外常常我们也会一起看到一个叫 XSS ，这里也一起介绍一下：

1. **CORS** ： Cross Origin Resourse-Sharing  跨站资源共享

2. **CSRF** ： Cross-Site Request Forgery  跨站请求伪造

3. **XSS** ： Cross Site Scrit 跨站脚本攻击（为与 CSS 区别，所以在安全领域叫 XSS）

## 二、CORS

> 跨来源资源共享（CORS），亦译为跨域资源共享，是一份浏览器技术的规范，提供了 Web 服务从不同网域传来沙盒脚本的方法，以避开浏览器的同源策略，是 JSONP 模式的现代版。与 JSONP 不同，CORS 除了 GET 请求方法以外也支持其他的 HTTP 请求。用 CORS 可以让网页设计师用一般的 XMLHttpRequest，这种方式的错误处理比 JSONP 要来的好。另一方面，JSONP 可以在不支持 CORS 的老旧浏览器上运作。现代的浏览器都支持 CORS。
—— [维基百科](https://zh.wikipedia.org/wiki/%E8%B7%A8%E4%BE%86%E6%BA%90%E8%B3%87%E6%BA%90%E5%85%B1%E4%BA%AB)

**核心知识：** CORS是一个W3C标准，它允许浏览器向跨源服务器，发出`XMLHttpRequest` 请求，从而克服 AJAX 只能同源使用的限制。


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