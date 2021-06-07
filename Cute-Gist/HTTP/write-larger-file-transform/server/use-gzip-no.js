const fs = require("fs");
const http = require("http");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const server = http.createServer(async (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8",
    });
    const buffer = await readFile(__dirname + "/big-file.txt");
    res.write(buffer);
    res.end();
});

server.listen(3000, () => {
    console.log("app starting at port 3000");
});