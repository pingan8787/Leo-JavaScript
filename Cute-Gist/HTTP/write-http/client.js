const net = require('net')
const client = net.createConnection({ port: 8080 }, () => {
    // 'connect' 监听器
    console.log('已连接到服务器');
    client.write('你好世界!\r\n');
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
