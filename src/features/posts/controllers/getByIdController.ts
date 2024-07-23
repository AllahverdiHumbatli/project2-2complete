import {Request, Response} from 'express'
import {postRepositories} from "../post-db-repository";
import {postCollection} from "../../../db/mongo-db";
import {postsService} from "../../../domain/posts-service";
import {postQueryRepository} from "../post-query-repository";

export const getByIdController = async (req: Request, res: Response) => {
    const post = await postQueryRepository.getPostById(req.params.id);
    if (post) {
        res.status(200).send(post);
        return
    }
    res.sendStatus(404)
    return
}