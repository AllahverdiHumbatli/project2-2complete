import {Request, Response} from "express";
import {usersQueryRepositories} from "../user-query-repository";

export const getCurrentUserData =  async (req: Request, res: Response) => {
    const currentUserData = await usersQueryRepositories.getCurrentUser(req.user.id)
    if(currentUserData){
        res.status(200).send(currentUserData)
        return
    }
    res.sendStatus(401)
    return
}
