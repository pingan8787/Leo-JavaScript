let express = require("express");
let app = express();

app.get("/test_jsonp", (req, res) => {
    let { callback } = req.query;
    res.send(`${callback}("hello!leo!")`);
});

app.listen(1000);