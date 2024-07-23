import {Request, Response} from 'express'

import {postsService} from "../../../domain/posts-service";
import {helper} from "../../blogs/controllers/getController";
import {blogsService} from "../../../domain/blogs-service";

export const getAllPostsForBlog = async (req: Request, res: Response<any /*OutputVideoType[]*/>) => {

    const sanitizedQuery = helper(req.query as {[key: string]: string| undefined})


    const blog = await blogsService.getById(req.params.id)
    if(!blog){
        res.sendStatus(404)
        return
    }

    const allPosts =  await postsService.getAllPostsForBlog(sanitizedQuery, req.params.id)
    console.log("all posts",allPosts)

        res.status(200).send(allPosts)
        return


};
