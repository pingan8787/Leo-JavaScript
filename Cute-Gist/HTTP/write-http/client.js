const net = require('net')
const client = net.createConnection({ port: 8080 }, () => {
    // 'connect' 监听器
    console.log('已连接到服务器');
    client.write(`POST / HTTP/1.1\r\nContent-Type: application/json\r\nUser-Agent: PostmanRuntime/7.17.1\r\nAccept: */*\r\nCache-Control: no-cache\r\nPostman-Token: 5041de72-27c3-44c6-99e8-c04c306b11ef\r\nHost: localhost:8888\r\nAccept-Encoding: gzip, deflate\r\nContent-Length: 19\r\nConnection: keep-alive\r\n\r\n{name: "jack"}`
    );
});
//客户端收到服务端执行的事件
client.on('data', data => {
    console.log("客户端：收到服务端响应数据为");
    console.log("----------");
    console.log(data.toString());
    console.log("----------");
    client.end()
})
client.on('end', () => {
    console.log('已从服务器断开');
});
