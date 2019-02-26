#### 用变量接收ajax请求的返回值，方便在其他函数使用
这是在项目中遇到的问题，能力有限，便用这个方法解决，实际代码如下：

```
//api.js
export function GETHISTORY(data){
    let url = data.url;
    return data.that.$ajax({
        methods:'GET',
        url :url,
        async:true,
    ).then((response)=>{
        let result = response.data.reverse(); //将获取的开奖结果数据颠倒
        return result;
    })
}
```
这个函数实现的功能是，从远程url服务器上获取数据，通过`Promise`进行解耦，于是其他地方就能也通过`Promise`来获取`GETHISTORY`函数返回的结果。  
看代码：  
```
//main.vue
let that = this;//由于是用vue-cli构建的项目，用that保存当前作用域。
let historyData = {
    url:'http://www.qq.com',
    that:that,
}
GETHISTORY(historyData).then((data)=>{
    console.log(data);//可以获取ajax请求的值result
})
```
小弟初学，还不是很懂，忘各位指点。感谢！  
Promise学习网址：  
1.[ES6 - Promise 对象](https://segmentfault.com/a/1190000011742644)  
2.[阮一峰-ES6系列 Promise对象](http://es6.ruanyifeng.com/#docs/promise)  
