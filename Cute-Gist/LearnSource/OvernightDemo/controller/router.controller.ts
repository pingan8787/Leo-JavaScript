import express, { Router, Application, Request, Response, NextFunction } from "express";

class RouterController {
    router: Router = express.Router();
    app: Application = express();
    constructor() { this.addControllers()};
    public getController = (): Router => this.router;
    public addControllers(): void {
        this.router.get("/:id", this.get);
    }
    public get (req: Request, res: Response, next: NextFunction){
        res.send("hello leo!")
        next();
    }
}

export default RouterController;