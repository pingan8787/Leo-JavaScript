const fs = require("fs");
const zlib = require("zlib");
const http = require("http");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const gzip = util.promisify(zlib.gzip);

const server = http.createServer(async (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8",
    });
    const buffer = await readFile(__dirname + "/big-file.txt");
    const gzipData = await gzip(buffer);
    res.write(gzipData);
    res.end();
});

server.listen(3000, () => {
    console.log("app starting at port 3000");
});