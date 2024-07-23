import {Request, Response} from 'express'

import {blogsRepositories} from "../blogs-db-repository";
import {blogsService} from "../../../domain/blogs-service";

export const helper = (query: {[key: string]: string| undefined}) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
    }
}

export const getBlogsController = async (req: Request, res: Response<any>)  => {
    const sanitizedQuery = helper(req.query as {[key: string]: string| undefined})
    const allBlogs = await blogsService.getBlogs(sanitizedQuery)
    res.status(200).send(allBlogs)
}