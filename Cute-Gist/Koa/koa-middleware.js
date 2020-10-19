class Koa {
    constructor() {
        this.middlewares = []
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    start({ req }) {
        const composed = composeMiddlewares(this.middlewares);
        const ctx = { req, res: undefined };
        return composed(ctx);
    }
}

function composeMiddlewares(middleware) {
    return function wrapMiddlewares(ctx) {
        let index = -1;
        function dispatch(i) {
            index = i;
            const fn = middleware[i];
            if (!fn) {
                return Promise.resolve();
            }
            return Promise.resolve(
                fn(ctx, () => dispatch(i + 1))
            )
        }
        return dispatch(0);
    }
}

const app = new Koa();
// 最外层 管控全局错误
app.use(async (ctx, next) => {
    try {
        // 这里的next包含了第二层以及第三层的运行
        await next();
    } catch (error) {
        console.log(`[koa error]: ${error.message}`);
    }
})

// 第二层 日志中间件
app.use(async (ctx, next) => {
    const { req } = ctx;
    console.log(`req is ${JSON.stringify(req)}`);
    await next();
    // next过后已经能拿到第三层写进ctx的数据了
    console.log(`res is ${JSON.stringify(ctx.res)}`);
});

// 第三层 核心服务中间件
// 在真实场景中 这一层一般用来构造真正需要返回的数据 写入ctx中
app.use(async (ctx, next) => {
    const { req } = ctx;
    console.log(`calculating the res of ${req}...`);
    const res = {
        code: 200,
        result: `req ${req} success`
    };
    // 写入ctx
    ctx.res = res;
    await next();
});

// 用来测试全局错误中间件
// 注释掉这一个中间件 服务才能正常响应
// app.use(async (ctx, next) => {
//     throw new Error("oops! error!");
// });

app.start({ req: "ssh" });