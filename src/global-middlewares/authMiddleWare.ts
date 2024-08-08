import {Response, Request, NextFunction} from 'express'
import jwt from "jsonwebtoken";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";
import {usersQueryRepositories} from "../features/users/user-query-repository";
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['authorization']) {
        return res.sendStatus(401)
    }
    const token = req.headers['authorization'].split(" ")[1]
    const userId = await jwtService.getUserByIdToken(token)
    if(userId){
        req.user = await usersQueryRepositories.getUserById(userId)
        return next()
    }
    return res.sendStatus(401)
}