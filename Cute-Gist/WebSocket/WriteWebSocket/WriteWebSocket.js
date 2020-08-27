const http = require("http");
const port = 18888;

const crypto = require("crypto");
const MAGIC_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

function generateAcceptValue(secWsKey) {
  return crypto
    .createHash("sha1")
    .update(secWsKey + MAGIC_KEY, "utf8")
    .digest("base64");
}


const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8"});
    res.end("一起来手写 WebSocket！");
})

server.on("upgrade", (req, socket) => {
    // 示例暂时只支持 WebSocket 协议，其他则返回 400
    if(req.headers["upgrade"] !== "websocket"){
        socket.end("HTTP/1.1 400 Bad Request");
        return;
    }

    // 读取客户端提供的 Sec-WebSocket-Key
    const secKey = req.headers["Sec-WebSocket-Key"];
    // 使用 SHA-1 算法来生成 Sec-WebSocket-Accept
    const hash = generateAcceptValue(secKey);
    // 设置HTTP响应头
    const responseHeaders = [
      "HTTP/1.1 101 Web Socket Protocol Handshake",
      "Upgrade: WebSocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${hash}`,
    ];
    // 返回握手请求的响应信息
    socket.write(responseHeaders.join("\r\n") + "\r\n\r\n");
})

server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);