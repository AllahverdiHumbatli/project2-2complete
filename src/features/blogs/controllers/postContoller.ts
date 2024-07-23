import {Request, Response} from 'express'
import {blogsRepositories} from "../blogs-db-repository";
import {blogsService} from "../../../domain/blogs-service";
import {blogsQueryRepositories} from "../blogs-query-repository";
export const postContoller = async (req: Request, res: Response) => {
      console.log(req.body)
    const newBlogId = await blogsService.postBlog(req.body.name, req.body.description, req.body.websiteUrl)
    const createdBlog = await blogsQueryRepositories.getById(newBlogId)
    res.status(201).send(createdBlog)
}