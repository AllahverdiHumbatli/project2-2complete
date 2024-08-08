import {Request, Response} from "express";
import {blogsService} from "../../../domain/blogs-service";
import {usersService} from "../../../domain/users-service";
import {jwtService} from "../../../application/jwt-service";

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
    const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password);
    if(user){
        const token = await jwtService.createJWT(user)
        return res.status(200).send({
            "accessToken": token
        })
    }

    return res.sendStatus(401)
}