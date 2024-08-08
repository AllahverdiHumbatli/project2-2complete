import {Request, Response} from "express";
import {commentsService} from "../../../domain/comments-service";
import {commentsQueryRepositories} from "../comments-query-repository";

export const uptadeCommentById = async (req: Request, res: Response) => {
    const isCommentExsist = await commentsQueryRepositories.getCommentById(req.params.id)
    if (!isCommentExsist) {
        res.sendStatus(404);
        return
    }
    const isOwner = await commentsService.isOwner(req.user.id)
    if(!isOwner){
        res.sendStatus(403);
        return
    }
    await commentsService.uptadeCommentById(req.params.id, req.body.content);
    return res.sendStatus(204);

}