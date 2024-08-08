import {NextFunction, Request, Response} from "express";
import {commentsService} from "../../../domain/comments-service";
import {commentsQueryRepositories} from "../../comments/comments-query-repository";
import {postQueryRepository} from "../post-query-repository";

export const postCommentContoller = async (req: Request, res: Response, next: NextFunction) => {
    console.log(1)

    const isPostExist =  await postQueryRepository.getPostById(req.params.id)
    if(isPostExist) {
    const newCommentId = await commentsService.createComment(req.body.content, req.user.id, req.user.login, req.params.id)
        const newComment = await commentsQueryRepositories.getCommentById(newCommentId)
        if(newComment){
            res.status(201).send(newComment)
            return
        }
        return
    }
    return res.sendStatus(404)
}
