import express from "express";
import { Server } from "@overnightjs/core";
import UserRouterController from "./server.controller";

class UserController extends Server {
    constructor() {
        super(true);
        this.setupControllers();
    }

    private setupControllers(): void {
        // const controllerInstances = [];
        // for (const name of Object.keys(controllers)) {
        //     const controller = (controllers as any)[name];
        //     if (typeof controller === 'function') {
        //         controllerInstances.push(new controller());
        //     }
        // }
        super.addControllers([UserRouterController]);
    }

    public start(port?: number): void {
        this.app.listen(port, () => {
            console.log('启动成功，端口号：',port)
        });
    }
}

export default UserController;