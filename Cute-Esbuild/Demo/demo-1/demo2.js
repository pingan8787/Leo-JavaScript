// npx esbuild demo2.js --bundle --outfile=demo2-1.js --loader:.js=jsx
// js 文件中使用 jsx
import * as React from "react";
import * as Server from "react-dom/server";

let Greet = () => <h1>你好，世界！</h1>;
console.log(Server.renderToString(<Greet />));
