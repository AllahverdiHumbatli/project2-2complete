import {Request, Response} from "express";
import {blogsService} from "../../../domain/blogs-service";
import {usersService} from "../../../domain/users-service";

export const checkLogin = async (req: Request, res: Response) => {
    if(typeof req.body.loginOrEmail !==  "string"){
        return res.status(400).send({
            "errorsMessages": [
                {
                    "message": "not string",
                    "field": "loginOrEmail"
                }
            ]
        });
    }
    if(typeof req.body.password !==  "string"){
        return res.status(400).send({
            "errorsMessages": [
                {
                    "message": "not string",
                    "field": "password"
                }
            ]
        });
    }
    const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password);
    if(checkResult){
        return res.sendStatus(204)
    }
    return res.sendStatus(401)
}