const path = require("path");
const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("@koa/router");
const StreamZip = require("node-stream-zip");

const app = new Koa();
const router = new Router();
const ZIP_HOME = path.join(__dirname, "zip");
const UnzipCaches = new Map();

router.get("/", async (ctx) => {
    ctx.body = "服务端在线解压ZIP文件示例（阿宝哥）";
});

router.get("/unzip/:name", async (ctx) => {
    const fileName = ctx.params.name;
    let filteredEntries;
    try {
        if (UnzipCaches.has(fileName)) {
            // 优先从缓存中获取
            filteredEntries = UnzipCaches.get(fileName);
        } else {
            const zip = new StreamZip.async({ file: path.join(ZIP_HOME, fileName) });
            const entries = await zip.entries();
            filteredEntries = Object.values(entries).map((entry) => {
                return {
                    name: entry.name,
                    size: entry.size,
                    dir: entry.isDirectory,
                };
            });
            await zip.close();
            UnzipCaches.set(fileName, filteredEntries);
        }
        ctx.body = {
            status: "success",
            entries: filteredEntries,
        };
    } catch (error) {
        ctx.body = {
            status: "error",
            msg: `在线解压${fileName}文件失败`,
        };
    }
});

router.get("/unzip/:name/entry", async (ctx) => {
    const fileName = ctx.params.name;
    const entryPath = ctx.query.path;
    try {
        const zip = new StreamZip.async({ file: path.join(ZIP_HOME, fileName) });
        const entryData = await zip.entryData(entryPath);
        await zip.close();
        ctx.body = {
            status: "success",
            entryData: entryData,
        };
    } catch (error) {
        console.dir(error);
        ctx.body = {
            status: "error",
            msg: `读取${fileName}中${entryPath}文件失败`,
        };
    }
});

// 注册中间件
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log("app starting at port 3000");
});