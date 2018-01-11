这是一个demo，常常让我用来测试这个 `WebSocket` 是否能正常连接：

```
<html>
    <head>
        <title>socket测试</title>
        <meta charset="utf-8">
    </head>
    <style>
        #ci{border:1px solid blue;}
    </style>
    <body>
        <div id="ci"></div>
    </body>
    
    <script type="text/javascript">
        var wsServer = "ws://***.**.**.**:****";
        var websocket = new WebSocket(wsServer);
        websocket.onopen = function (evt) {
            console.log(evt)
            console.log("开始连接.");
        };

        websocket.onclose = function (evt) {
            console.log(evt)
            console.log("连接关闭");
        };

        websocket.onmessage = function (evt) {
            console.log(evt)
            console.log('接收数据: ' + evt.data);
        };

        websocket.onerror = function (evt, e) {
            console.log(evt)
            console.log('连接错误: ' + evt.data);
        };
    </script>
</html>

```