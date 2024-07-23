import {usersService} from "../../../domain/users-service";
import {Request, Response} from 'express'
import {postsService} from "../../../domain/posts-service";
import {usersQueryRepositories} from "../user-query-repository";

export const postUser = async (req: Request, res: Response) => {
    const newUserId = await usersService.createUser(req.body.login, req.body.email, req.body.password)
    if(Array.isArray(newUserId)){
        res.status(400).send({ errorsMessages: [ newUserId[0] ] })
        return
    }
    const result = await usersQueryRepositories.getUserById(newUserId)
    if(result) {
        res.status(201).send(result)
    }
}