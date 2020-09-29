import { Controller, Get, Server } from '@overnightjs/core';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
const port = 3000;

@Controller('users')
class UserController {
    @Get(':id')
    private get(req: Request, res: Response) {
        return res.send(`hello, your id is:${req.params.id}`)
    }
}


class ServerController extends Server {
    constructor() {
        super();
        this.app.use(bodyParser.json());
        super.addControllers(new UserController());
    }
    public start(port?: number): void {
        this.app.listen(port, () => {
            console.log('启动成功，端口号：',port)});
    }
}

const server = new ServerController();
server.start(port);