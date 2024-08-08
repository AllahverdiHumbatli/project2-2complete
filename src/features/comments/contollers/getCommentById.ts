import {Request, Response} from "express";
import {commentsService} from "../../../domain/comments-service";

export const getCommentById =  async (req: Request, res: Response) => {
    const comment = await commentsService.getCommentById(req.params.id)
    if (!comment) {
        res.send(404);
        return
    }
    res.status(200).send(comment)
    return
}