import {Request, Response} from "express";
import {commentsQueryRepositories} from "../comments-query-repository";
import {commentsService} from "../../../domain/comments-service";

export const deleteCommentById = async (req: Request, res: Response) => {
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
    await commentsService.deleteCommentById(req.params.id);
    return res.sendStatus(204);

}