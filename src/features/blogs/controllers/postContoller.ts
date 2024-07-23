import {Request, Response} from 'express'
import {blogsRepositories} from "../blogs-db-repository";
import {blogsService} from "../../../domain/blogs-service";
export const postContoller = async (req: Request, res: Response) => {
      console.log(req.body)
    const newBlog = await blogsService.postBlog(req.body.name, req.body.description, req.body.websiteUrl)
    res.status(201).send(newBlog)
}