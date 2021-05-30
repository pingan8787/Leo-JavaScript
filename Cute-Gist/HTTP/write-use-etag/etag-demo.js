const Koa = require("koa");
const path = require("path");
const serve = require("koa-static");
const etag = require("koa-etag");
const conditional = require("koa-conditional-get");

const app = new Koa();

app.use(conditional()); // 使用条件请求的中间件
app.use(etag()); // 使用 etag 中间件
app.use( // 使用静态资源中间件
    serve(path.join(__dirname, "/public"), {
        maxage: 10 * 1000, // 设置缓存存储的最大周期，单位为秒
    })    
)

app.listen(3000, () => {
    console.log("服务已启动在3000端口")
})