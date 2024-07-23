import {Request, Response} from 'express'

import {postsService} from "../../../domain/posts-service";
import {helper} from "../../blogs/controllers/getController";
import {blogsService} from "../../../domain/blogs-service";
import {blogsQueryRepositories} from "../../blogs/blogs-query-repository";
import {postQueryRepository} from "../post-query-repository";

export const getAllPostsForBlog = async (req: Request, res: Response<any /*OutputVideoType[]*/>) => {

    const sanitizedQuery = helper(req.query as {[key: string]: string| undefined})


    const blog = await blogsQueryRepositories.getById(req.params.id)
    if(!blog){
        res.sendStatus(404)
        return
    }

    const allPosts =  await postQueryRepository.getAllPostsForOneBlog(sanitizedQuery, req.params.id)
    console.log("all posts",allPosts)

        res.status(200).send(allPosts)
        return


};
