const express = require('express')
const app = express()
const port = 1000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.get("/test_jsonp", (req, res) => {
    let { callback } = req.query; // 根据业务使用不同 callback 名称
    res.set('Content-Type', 'text/javascript')
    res.send(`${callback}("hello!jsonp!")`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})