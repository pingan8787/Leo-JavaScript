import express, { Application, Request, Response } from 'express';
import router from "../controller/app.router";
const app: Application= express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/api', router);

app.listen(3000, ()=> {
  console.log('Example app listening on port 3000!');
});