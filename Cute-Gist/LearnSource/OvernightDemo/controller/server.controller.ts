import express, { Application } from 'express';
import RouterController from "./router.controller";

class ServerController {
    app: Application = express();
    constructor(){this.addControllers()};
    public addControllers(){
        const Router = new RouterController().getController();
        this.app.use('/api/users', Router);
    }
    public start(port?: number): void {
        this.app.listen(port, () => {console.log('启动成功，端口号：',port)});
    }
}

export default ServerController;