// https://github.com/a1029563229/blogs/blob/master/Introduction/http/README.md
import http from './src/Http';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(200, JSON.stringify(req.httpMessage));
});

server.listen(8888, () => {
  console.log("server is listening in 8888...");
});