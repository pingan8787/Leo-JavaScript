const net = require("net");
const port = 8080;
const sever = net.createServer(connection => {
  connection.on("end", () => {
    console.log("客户端关闭连接");
  });
  connection.on("data", data => {
    console.log("服务端：收到客户端发送数据为");
    console.log("----------");
    console.log(data.toString());
    console.log("----------");
  });
  connection.write("返回响应结果");
});
sever.listen(port, () => {
  console.log("开始监听端口:" + port);
});
