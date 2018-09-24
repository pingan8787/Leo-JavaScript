### 介绍
**Ajax**指`Asynchronous JavaScript and XML`（异步的 JavaScript 和 XML），最大的优点是在**不重新加载整个页面**的情况下，可以与服务器交换数据并更新部分网页内容。   

而实现的**原理基础**就是：网页DOM对象可以精确地对网页中的部分内容进行操作、XML作为单纯的数据存储载体使得客户端与服务器交换的只是网页内容的数据而没有网页样式等等的附属信息、`XMLHttpRequest`是与浏览器本身内置的`request`相互独立的与服务器交互的请求对象。  


网页应用Ajax与服务器交互的抽象过程如下图：   
![原理](https://images2015.cnblogs.com/blog/1018541/201612/1018541-20161202170336021-461606131.png)  


### 过程详解：
#### 步骤1： 
要使用**Ajax技术**，基础中的基础，就是要创建一个`XMLHttpRequest对象`，无它就没有异步传输的可能：   
```js
var xmlhttp;
if (window.XMLHttpRequest) { //检查浏览器的XMLHttpRequest属性，如果为真则支持XMLHttpRequest
// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
xmlhttp=new XMLHttpRequest(); 
} else {
// IE6, IE5 浏览器执行代码
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); 
}
```

**XMLHttpRequest对象的属性如下：**  
* **onreadystatechange**  每次状态改变所触发事件的事件处理程序。
* **responseText**     从服务器进程返回数据的字符串形式。
* **responseXML**    从服务器进程返回的DOM兼容的文档数据对象。
* **status **          从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）
* **status Text**       伴随状态码的字符串信息
* **readyState**       对象状态值
  0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）
  1 (初始化) 对象已建立，尚未调用send方法
  2 (发送数据) send方法已调用，但是当前的状态及http头未知
  3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过`responseBody`和`responseText`获取部分数据会出现错误，
  4 (完成) 数据接收完毕,此时可以通过通过`responseXml`和`responseText`获取完整的回应数据

但是，由于各浏览器之间存在差异，所以创建一个`XMLHttpRequest对象`可能需要不同的方法。这个差异主要体现在IE和其它浏览器之间。下面是一个比较标准的创建`XMLHttpRequest对象`的方法。  
```js
function CreateXmlHttp() {

    //非IE浏览器创建XmlHttpRequest对象
    if (window.XmlHttpRequest) {
        xmlhttp = new XmlHttpRequest();
    }

    //IE浏览器创建XmlHttpRequest对象
    if (window.ActiveXObject) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {
            try {
                xmlhttp = new ActiveXObject("msxml2.XMLHTTP");
            }
            catch (ex) { }
        }
    }
}

function Ustbwuyi() {

    var data = document.getElementById("username").value;
    CreateXmlHttp();
    if (!xmlhttp) {
        alert("创建xmlhttp对象异常！");
        return false;
    }

    xmlhttp.open("POST", url, false);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            document.getElementById("user1").innerHTML = "数据正在加载...";
            if (xmlhttp.status == 200) {
                document.write(xmlhttp.responseText);
            }
        }
    }
    xmlhttp.send();
}
```
如上所示，函数首先检查`XMLHttpRequest`的整体状态并且保证它已经完成（`readyStatus=4`），即数据已经发送完毕。然后根据服务器的设定询问请求状态，如果一切已经就绪（`status=200`），那么就执行下面需要的操作。

#### 步骤2：
在网页中为某些事件的响应绑定**异步操作**：通过上面创建的`xmlhttp对象`传输请求、携带数据。在发出请求前要先定义请求对象的method、要提交给服务器中哪个文件进行请求的处理、要携带哪些数据、是否异步。   

其中，与普通的request提交数据一样，这里也分两种方法：`GET`/`POST`  

```js
xmlhttp.open("GET","/try/ajax/demo_get2.php?fname=Henry&lname=Ford",true);
xmlhttp.send();
xmlhttp.open("POST","/try/ajax/demo_post2.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Henry&lname=Ford");
```

#### 步骤3：
服务器收到请求后，把附带的数据作为输入传给处理请求的文件，例如这里：把`fname=Henry&lname=Ford`作为输入，传给 ` /try/ajax/demo_get2.php ` 这个文件。
然后文件根据传入的数据做出处理，最终**返回结果**，通过`response对象`发回去。客户端根据`xmlhttp对象`来获取`response`内容，然后调用DOM对象根据`response`内容来局部修改网页内容。   

```js
xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState==4 && xmlhttp.status==200)//请求处理完毕且状态为成功
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    //用response内容来修改DOM中的元素的内容
    }
}
```

其中，`response的类型`有两种：**字符串类型**和**XML文本**。两种回应的不同提取如下：

`responseText 属性`返回字符串形式的响应：  
```js
document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
```

如果来自服务器的响应是 `XML`，需要作为` XML `对象进行解析，使用 `responseXML` ：
```js
xmlDoc=xmlhttp.responseXML; //获取服务器响应的XML文本并转换得到XMLDOM对象
txt="";
x=xmlDoc.getElementsByTagName("ARTIST");//通过XMLDOM对象调用方法来获取XML对象中的内容
for (i=0;i<x.length;i++) {
txt=txt + x[i].childNodes[0].nodeValue + "<br>"; }
 
document.getElementById("myDiv").innerHTML=txt;//把获取到的内容通过document对象更新到网页内容去
```