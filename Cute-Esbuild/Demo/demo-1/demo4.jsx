// esbuild demo4.jsx --bundle --outfile=demo4.js --minify --sourcemap --target=chrome58,firefox57,safari11,edge16
// --minify 开启压缩  --sourcemap 开启 sourceMap --target 指定浏览器版本
// jsx 打包成 js，并开启压缩，sourceMap 等
// 208.8kb => 27.5kb
import * as React from "react";
import * as Server from "react-dom/server";

let Greet = () => <h1>你好，世界！</h1>;
console.log(Server.renderToString(<Greet />));
