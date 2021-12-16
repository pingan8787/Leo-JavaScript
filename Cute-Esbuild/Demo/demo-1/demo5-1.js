// demo5.js
var net = require("net");
var sever = net.createServer(function(connection) {
  connection.on("end", function() {
  });
  connection.on("data", function(data) {
    console.log("\u670D\u52A1\u7AEF\uFF1A\u6536\u5230\u5BA2\u6237\u7AEF\u53D1\u9001\u6570\u636E\u4E3A" + data.toString());
  });
  connection.write("response hello");
});
sever.listen(8080, function() {
});
