const fs = require("fs");

const writeStream = fs.createWriteStream(__dirname + "/big-file.txt");
for (let i = 0; i <= 1e5; i++) {
  writeStream.write(`${i} 我是阿宝哥，欢迎关注全栈修仙之路\n`, "utf8");
}

writeStream.end();