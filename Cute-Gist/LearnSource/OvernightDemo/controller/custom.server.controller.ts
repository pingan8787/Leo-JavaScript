import { Server } from "@overnightjs/core";
import RouterController from "./custom.router.controller";


class ServerController extends Server {
    constructor() {
        super();
        super.addControllers(new RouterController());
    }
    public start(port?: number): void {
        this.app.listen(port, () => {
            console.log('启动成功，端口号：',port)});
    }
}

export default ServerController;

