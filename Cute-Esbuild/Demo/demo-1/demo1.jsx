// npx esbuild demo1.jsx --bundle --outfile=demo1.js
// jsx 打包成 js
import * as React from "react";
import * as Server from "react-dom/server";

let Greet = () => <h1>你好，世界！</h1>;
console.log(Server.renderToString(<Greet />));
