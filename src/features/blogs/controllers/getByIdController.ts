import {Request, Response} from 'express'
import {blogsRepositories} from "../blogs-db-repository";
import {blogsService} from "../../../domain/blogs-service";
import {blogsQueryRepositories, } from "../blogs-query-repository";


export const getBlogById = async (req: Request, res: Response) => {
    console.log('id: ', req.params.id)
    let blog = await blogsQueryRepositories.getById(req.params.id)
    if (blog) {
        res.status(200).send(blog)
        return
    }
    res.sendStatus(404)
    return
}