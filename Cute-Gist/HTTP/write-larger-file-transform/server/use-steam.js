const fs = require("fs");
const zlib = require("zlib");
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/plain;charset=utf-8",
      "Content-Encoding": "gzip",
    });
    fs.createReadStream(__dirname + "/big-file.txt")
      .setEncoding("utf-8")
      .pipe(zlib.createGzip())
      .pipe(res);
  })
  .listen(3000, () => {
    console.log("app starting at port 3000");
  });