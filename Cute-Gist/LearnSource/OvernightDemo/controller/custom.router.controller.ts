import { Request, Response } from 'express';
import { Controller, Get, Put } from '@overnightjs/core';

@Controller("api/users")
class RouterController {
    @Get(":id")
    private get(req:Request, res:Response): any{
        res.send("hello leo!")
    }
}


export default RouterController;