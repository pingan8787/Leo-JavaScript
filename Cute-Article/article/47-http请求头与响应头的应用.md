> [阅读原文](https://juejin.im/post/5b854ddef265da43635d9302)  

## Chap1 发现headers
当我们随便打开一个网址（比如大家经常拿来测试网络的百度）时，打开Network,会看到如下请求头，响应头：   
![图1](https://user-gold-cdn.xitu.io/2018/8/28/16580c211bbcc595?imageView2/0/w/1280/h/960/ignore-error/1)  
究竟这些headers都有什么用呢？ 咱们挨个探个究竟。  

## Chap2 headers用途

### 2.1 Content-Type
`Content-Type`表示请求头或响应头的内容类型。作为请求头时，利用它可以进行`body-parser`。    
Sooo~ What is body-parser?
body-parser是node常用的中间件，其作用是:  

> Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

即在处理数据之前用中间件对post请求体进行解析。
[body-parser](https://www.npmjs.com/package/body-parser)的例子为：  

下面的例子展示了如何给路由添加`body parser`。通常，这是在`express`中最为推荐的使用`body-parser`的方法。  
```js
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})
// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
})
```
`body-parser`核心源码为：  
```js
  // this uses a switch for static require analysis
  switch (parserName) {
    case 'json':
      parser = require('./lib/types/json')
      break
    case 'raw':
      parser = require('./lib/types/raw')
      break
    case 'text':
      parser = require('./lib/types/text')
      break
    case 'urlencoded':
      parser = require('./lib/types/urlencoded')
      break
  }
```
以`json`为例：  
```js
var contentType = require('content-type')
//...
/**
 * Get the charset of a request.
 *
 * @param {object} req
 * @api private
 */
function getCharset (req) {
  try {
    return (contentType.parse(req).parameters.charset || '').toLowerCase()
  } catch (e) {
    return undefined
  }
}
//...
// assert charset per RFC 7159 sec 8.1
var charset = getCharset(req) || 'utf-8'
if (charset.substr(0, 4) !== 'utf-') {
  debug('invalid charset')
  next(createError(415, 'unsupported charset "' + charset.toUpperCase() + '"', {
    charset: charset,
    type: 'charset.unsupported'
  }))
  return
}
```
可以看出：其背后工作原理就是通过分析请求头中的`Content-Type`的类型，根据不同的类型进行相应数据处理，我们自己模拟一下：  

step1: 先建立`server.js`:  
```js
 req.on('end',function (params) {
    let r = Buffer.concat(arr).toString();
    // body-parser  解析请求，根据不同的格式进行不同的解析
    if (req.headers['content-type'] === www.js){
      let querystring = require('querystring');
      r = querystring.parse(r); // a=1&b=2
      console.log(r,1);
    } else if (req.headers['content-type'] === 'application/json'){
      console.log(JSON.parse(r),2);
    } else{
      console.log(r,3);
    }
    res.end('end'); 
  })
```
step2: 客户端模拟请求：   
```js
let opts = {
  host:'localhost',
  port:3000,
  path:'/hello',
  headers:{
    'a':1,
    'Content-Type':'application/json',
    "Content-Length":7 //模拟的时候需要带上长度，不然客户端会当成没有传递数据
  }
}
let http = require('http');
let client = http.request(opts,function (res) {
  res.on('data',function (data) {
      console.log(data.toString());
  })
});
client.end("{\"a\":1}"); // 表示把请求发出去
```
step3: 测试。  
先启动server,再启动client，服务端收到按照`application/json`格式解析的数据： `{ a: 1 } 2`.`Content-Type`与`body-parser`之间的关系就先分析到这里了。后面我们接着看请求头。    

### 2.2 Range:bytes
请求头通过`Range:bytes`可以请求资源的某一部分。利用这个字段可模拟部分读取。如下：
```js
 http.createServer(function (req, res) {
    let range = req.headers['range'];
 }）
```
server:  
```js
let http = require('http');
let fs = require('fs');
let path = require('path');
// 当前要下载的文件的大小
let size = fs.statSync(path.join(__dirname, 'my.txt')).size;
let server = http.createServer(function (req, res) {
  let range = req.headers['range']; // 0-3
  if (range) {
    // 模拟请求 curl -v --header "Range:bytes=0-3" http://localhost:3000
    let [, start, end] = range.match(/(\d*)-(\d*)/);
    start = start ? Number(start) : 0;
    end = end ? Number(end) : size - 1; // 10个字节 size 10  （0-9）
    res.setHeader('Content-Range', `bytes ${start}-${end}/${size - 1}`);
    fs.createReadStream(path.join(__dirname, 'my.txt'), { start, end }).pipe(res);
  } else {
    // 会把文件的内容写给客户端
    fs.createReadStream(path.join(__dirname, 'my.txt')).pipe(res);
    //可读流可以通过pipe导到可写流
  }
});
server.listen(3000);
```
client:
```js
let opts = {
  host:'localhost',
  port:3000,
  headers:{}
}
let http = require('http');
let start = 0;
let fs = require('fs');
function download() {
  opts.headers.Range = `bytes=${start}-${start+3}`;
  start+=4;
  console.log(`start is ${start}`)
  let client = http.request(opts,function (res) {
      let total = res.headers['content-range'].split('/')[1];
      // console.log(half)
      res.on('data',function (data) {
        fs.appendFileSync('./download1.txt',data);
      });
      res.on('end',function () {
        setTimeout(() => {
          if ((!pause)&&(start < total))
            download();
        }, 1000);
      })
  });
  client.end();
}
download()
```
分段读取添加暂停功能，监听用户输入  
```js
let pause = false;
process.stdin.on('data',function (data) {
  if (data.toString().includes('p')){
    pause = true
  }else{
    pause = false;
    download()
  }
})
```
测试结果：
![图2](https://user-gold-cdn.xitu.io/2018/9/10/165c2355ff651d7d?imageView2/0/w/1280/h/960/ignore-error/1)

分段读取有以下好处：  

> 提高读取速度，多线程并行，分块读取
> 断点续传

模拟并行下载：  
```js
let halfFlag = 20
function download() {
  opts.headers.Range = `bytes=${start}-${start+3}`;
  start+=4;
  console.log(`start is ${start}`)
  let client = http.request(opts,function (res) {
      let total = res.headers['content-range'].split('/')[1];
	  let halfFlag = Math.floor(total/2)
      // console.log(half)
      res.on('data',function (data) {
        fs.appendFileSync('./download1.txt',data);
      });
      res.on('end',function () {
        setTimeout(() => {
          if ((!pause)&&(start < halfFlag))
            download();
        }, 1000);
      })
  });
  client.end();
}
let half = halfFlag

function downloadTwo() {
	opts.headers.Range = `bytes=${half}-${half+3}`;
	half+=4;
	console.log(`half is ${half}`)
	let client = http.request(opts,function (res) {
		let total = res.headers['content-range'].split('/')[1];
		res.on('data',function (data) {
			fs.appendFileSync('./download2.txt',data);
		});
		res.on('end',function () {
			setTimeout(() => {
				if (!pause&&half < total)
					downloadTwo();
			}, 1000);
		})
	});
	client.end();
}
download();
downloadTwo();
```
运行结果，会把原文件分成两部分下载到download1.txt和download2.txt。
测试：
![图3](https://user-gold-cdn.xitu.io/2018/9/10/165c23670c9165b8?imageView2/0/w/1280/h/960/ignore-error/1)  

理论上，这样的下载方式会比第一种方法节约一半的时间。但是实际中的文件下载怎样实现加速以及并行下载的，还有待考究。   

### 2.3 Cache-Control与Expires之强制缓存
Response Header响应头中`Cache-Control: max-age=1233`可以设置相对当前的时间的强制缓存，与它相关的`Expires`可以设置某个绝对时间点限定读取缓存的时间。  
模拟实现：  
```js
let url = require('url'); // 专门用来处理url路径的核心模块
// http://username:password@hostname:port/pathname?query
let server = http.createServer(async function (req,res) {
	console.log(req.url)
  let { pathname,query} = url.parse(req.url,true); 
  // true就是将query转化成对象
  let readPath = path.join(__dirname, 'public', pathname);
  try {
  let statObj = await stat(readPath);
  // 根客户端说 10s 内走缓存
  res.setHeader('Cache-Control','max-age=10');
  res.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString());
    // 10s之内的请求都会走cache 返回200， (from disk cache)不发生请求
    if (statObj.isDirectory()) {
      let p = path.join(readPath, 'index.html');
      await stat(p);
      // 如果当前目录下有html那么就返回这个文件
      fs.createReadStream(p).pipe(res);
    } else {
      fs.createReadStream(readPath).pipe(res);
    }
  }catch(e){
    res.statusCode = 404;
    res.end(`Not found`);
  }
}).listen(3000);
```
测试：
![图4](https://user-gold-cdn.xitu.io/2018/9/10/165c24917e9fcc8f?imageView2/0/w/1280/h/960/ignore-error/1)
10s内刷新：
![图4](https://user-gold-cdn.xitu.io/2018/9/10/165c2498b620d636?imageView2/0/w/1280/h/960/ignore-error/1)

### 2.4 对比缓存之Last-Modified和If-Modified-Since  
对比响应头Last-Modified and 与请求头If-Modified-Since，可以通过文件修改时间看文件是否修改，从而决定是重新请求还是走缓存。  
模拟如下：  
step1 不设置强制缓存 
```js
res.setHeader('Cache-Control','no-cache');
```
step2 应用文件修改时间比对是否修改，  
```js
res.setHeader('Last-Modified', statObj.ctime.toGMTString());
if (req.headers['if-modified-since'] === statObj.ctime.toGMTString()) {
    res.statusCode = 304;
    res.end();
    return; // 走缓存
}
fs.createReadStream(readPath).pipe(res);
```
测试：
![图6](https://user-gold-cdn.xitu.io/2018/9/10/165c25325aa08daf?imageView2/0/w/1280/h/960/ignore-error/1)

### 2.5 对比缓存之Etag和 If-None-Match
对比响应头:Etag 与请求头:If-None-Match，Etag和If-None-Match如果相等，即返回304。
etag如何添加?

> 根据文件内容,生成一个md5的摘要，给实体加一个标签。

这种方法虽然比较耗性能，但是能够更加精确的对比出文件是否进行了修改。依靠文件修改时间进行对比并不够准确。因为有时文件有改动Last-Modified发生了变化，但是文件的内容可能根本没有变化。所以这种方案要优于2.4.  

实现方法：
```js
let rs = fs.createReadStream(p);
let md5 = crypto.createHash('md5'); // 不能写完响应体再写头
let arr = [];
rs.on('data',function (data) {
    md5.update(data);
    arr.push(data);
});
```
设置Etag
```js
rs.on('end',function () {
let r = md5.digest('base64');
res.setHeader('Etag', r);
if (req.headers['if-none-match'] === r ){
    res.statusCode = 304;
    res.end();
    return;
}
res.end(Buffer.concat(arr));
})
```
测试：  
![图7](https://user-gold-cdn.xitu.io/2018/9/10/165c25456876367f?imageView2/0/w/1280/h/960/ignore-error/1)

### 2.6 Accept-Encoding
依靠请求头： `Accept-Encoding: gzip, deflate`, br告诉服务端可接受的数据格式。服务端返回后会把数据格式通过响应格式通过Content-Encoding来标记。
在客户端接受gzip的格式下，后端可通过文件压缩处理传递，提高性能。
node api中提供了[zlib](http://nodejs.cn/api/zlib.html#zlib_class_zlib_gzip)模块:  
> zlib模块提供通过 Gzip 和` Deflate/Inflate` 实现的压缩功能

下面我们来应用zlib与请求头`Accept-Encoding`来实现压缩功能。  
```js
let zlib = require('zlib');
let fs = require('fs');
let path = require('path');
function gzip(filePath) {
  let transform = zlib.createGzip();//转化流通过transform压缩，然后再写
  fs.createReadStream(filePath).pipe(transform).pipe(fs.createWriteStream(filePath+'.gz'));
}
gzip('2.txt')
```
解压：
```js
function gunzip(filePath) {
  let transform = zlib.createGunzip();
  fs.createReadStream(filePath).pipe(transform).pipe(fs.createWriteStream(path.basename(filePath,'.gz')));
}
```
`path.basename(filePath,'.gz')`用来去掉filePath文件名的后缀`.gz`。  
根据请求头接受的类型后端的具体操作 ：  
```js
if(req.url === '/download'){
    res.setHeader('Content-Disposition', 'attachment' )
    return fs.createReadStream(path.join(__dirname, '1.html')).pipe(res);
}
```

```js
let http = require('http');
let fs = require('fs');
let path = require('path');
let zlib = require('zlib');
http.createServer(function (req,res) {
  if(req.url === '/download'){
    res.setHeader('Content-Disposition', 'attachment' )
    return fs.createReadStream(path.join(__dirname, '1.html')).pipe(res);
  }
  let rule = req.headers['accept-encoding'];
  if(rule){
    if(rule.match(/\bgzip\b/)){
      res.setHeader('Content-Encoding','gzip');
      fs.createReadStream(path.join(__dirname, '1.html'))
      .pipe(zlib.createGzip())
      .pipe(res);
    } else if (rule.match(/\bdeflate\b/)){
      res.setHeader('Content-Encoding', 'deflate');
      fs.createReadStream(path.join(__dirname, '1.html'))
        .pipe(zlib.createDeflate())
        .pipe(res);
    }else{
      fs.createReadStream(path.join(__dirname, '1.html')).pipe(res);
    }
  }else{
    fs.createReadStream(path.join(__dirname, '1.html')).pipe(res);
  }
}).listen(3000);
```

test deflate:  
```docker
curl -v --header "Accept-Encoding:deflate" http://localhost:3000
* Rebuilt URL to: http://localhost:3000/
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
> Accept-Encoding:deflate
> 
< HTTP/1.1 200 OK
< Content-Encoding: deflate
< Date: Thu, 23 Aug 2018 03:01:13 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
```
test others:
```docker
curl -v --header "Accept-Encoding:nn" http://localhost:3000
* Rebuilt URL to: http://localhost:3000/
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.54.0
> Accept: */*
> Accept-Encoding:nn
> 
< HTTP/1.1 200 OK
< Date: Thu, 23 Aug 2018 03:02:51 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  你好
</body>

* Connection #0 to host localhost left intact
</html>%   
```
### 2.7 referer
![图8](https://user-gold-cdn.xitu.io/2018/9/10/165c268acf50a0af?imageView2/0/w/1280/h/960/ignore-error/1)  
referer表示请求文件的网址，请求时会携带。为了防止自己网站的文件被外网直接引用，可以通过比较referer，即请求的地址，与本地地址比较，设置防盗链。  
```js
let http =  require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
// 这是百度的服务器
let server = http.createServer(function (req,res) {
  let { pathname } = url.parse(req.url);
  let realPath = path.join(__dirname,pathname);
  fs.stat(realPath,function(err,statObj) {
    if(err){
      res.statusCode = 404;
      res.end();
    }else{
      let referer = req.headers['referer'] || req.headers['referred'];
      if(referer){
        let current = req.headers['host'] // 代表的是当前图片的地址
        referer = url.parse(referer).host // 引用图片的网址
        if (current === referer){
          fs.createReadStream(realPath).pipe(res);
        }else{
          fs.createReadStream(path.join(__dirname,'images/2.jpg')).pipe(res);
        }
      }else{
        fs.createReadStream(realPath).pipe(res);
      }
    }
  })
}).listen(3000);
```
### 2.8 Accept-Language
请求头：`Accept-Language: zh-CN,zh;q=0.9`  
多个语言用 ',' 分隔，权重用 '=' 表示',没有默认权重为1  

后端根据请求接受语言的权重一次查找，查找到就返回，找不到就用默认语言   
```js
let langs = {
  en:  'hello world',
  'zh-CN':'你好世界',
  zh:'你好',
  ja: 'こんにちは、世界'
}
let defualtLanguage = 'en'
// 多语言之服务端方案：来做 (浏览器会发一个头) 前端来做
// 通过url实现多语言
let http = require('http');
http.createServer(function (req,res) {
    let lan = req.headers['accept-language'];
    //[[zh,q=0.9],[zh-CN]] =>[{name:'zh-CN',q=1},{name:'zh',q:0.9}]
    if(lan){
      lan = lan.split(',');
      lan = lan.map(l=>{
        let [name,q] = l.split(';');
        q = q?Number(q.split('=')[1]):1 
        return {name,q}
      }).sort((a,b)=>b.q-a.q); // 排出 权重数组

      for(let i = 0 ;i <lan.length;i++){
        // 将每个人的名字 取出来
        let name= lan[i].name;
        if(langs[name]){ //去语言包查找 查找到就返回
          res.end(langs[name]);
          return;
        }
      }
      res.end(langs[defualtLanguage]); // 默认语言
    }else{
      res.end(langs[defualtLanguage]); // 默认语言
    }
}).listen(3000);
```
测试：  
![图8](https://user-gold-cdn.xitu.io/2018/9/10/165c27f5464f2978?imageView2/0/w/1280/h/960/ignore-error/1)

## 总结
请求头与响应头在前后端联调时会经常使用。了解了他们的妙用前后端配合会更加和谐顺畅~