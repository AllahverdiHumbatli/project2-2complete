import {NextFunction, Request, Response} from 'express'

import {postsService} from "../../../domain/posts-service";

export const postController = async (req: Request, res: Response, next: NextFunction) => {

    const newPost = await postsService.postPOST(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)

    res.status(201).send(newPost);
    return


}
