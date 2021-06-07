const Koa = require("koa");
const cors = require("@koa/cors");
const serve = require("koa-static");
const range = require('koa-range');

const app = new Koa();

// 注册中间件
app.use(cors()); // 注册CORS中间件
app.use(range); // 注册范围请求中间件
app.use(serve(".")); // 注册静态资源中间件

app.listen(3000, () => {
  console.log("app starting at port 3000");
});