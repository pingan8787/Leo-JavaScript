import express, { Request, Response } from 'express';
const app = express()

class UserRouterController {
    constructor(){
        this.setupController();
    }
    public setupController(){
        this.initController("/api/users", (req: Request, res: Response) => {
            res.send("hello user!")
        })
    }
    public initController(path: string, callback: (req: Request, res: Response) => any){
        app.get(path, callback)
    }

    private get(req:Request, res:Response): any{
        res.send("hello user!")
    }
    public start(port?: number): void {
        app.listen(port, () => {
            console.log('启动成功，端口号：',port)
        });
    }
}

export default UserRouterController;