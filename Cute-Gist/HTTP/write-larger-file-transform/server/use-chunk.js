const fs = require("fs");
const http = require("http");

const buffer = fs.readFileSync(__dirname + "/big-file.txt");
const lines = buffer.toString("utf-8").split("\n");
const chunks = chunk(lines, 10);

function chunk(arr, len) {
  let chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

// 省略数据分块代码
http
    .createServer(async function (req, res) {
        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8",
            "Transfer-Encoding": "chunked",
            "Access-Control-Allow-Origin": "*",
        });
        for (let index = 0; index < chunks.length; index++) {
            setTimeout(() => {
                let content = chunks[index].join("&");
                res.write(`${content.length.toString(16)}\r\n${content}\r\n`);
            }, index * 1000);
        }
        setTimeout(() => {
            res.end();
        }, chunks.length * 1000);
    })
    .listen(3000, () => {
        console.log("app starting at port 3000");
    });