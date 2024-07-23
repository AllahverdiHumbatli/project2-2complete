import {Request, Response} from 'express'
import {postRepositories} from "../post-db-repository";
import {postCollection} from "../../../db/mongo-db";
import {postsService} from "../../../domain/posts-service";

export const getByIdController = async (req: Request, res: Response) => {
    const post = await postsService.getPostById(req.params.id);
    if (post) {
        res.status(200).send(post);
        return
    }
    res.sendStatus(404)
    return
}