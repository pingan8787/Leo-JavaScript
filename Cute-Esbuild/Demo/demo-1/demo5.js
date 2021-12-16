// esbuild demo5.js --bundle --outfile=demo5-1.js --platform=node --target=node10.4
// 打包 node 环境
// --platform=node 指定 node 环境
// --target=node10.4 指定 node 版本

var net = require('net')
var sever=net.createServer(function(connection){
    //客户端关闭连接执行的事件
  connection.on('end',function(){
    //   console.log('客户端关闭连接')
  })
  connection.on('data',function(data){
    console.log('服务端：收到客户端发送数据为'+data.toString())
})
//给客户端响应的数据
  connection.write('response hello')
})
sever.listen(8080,function(){
    // console.log('监听端口')
})