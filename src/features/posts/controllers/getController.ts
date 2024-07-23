import {Request, Response} from 'express'

import {postsService} from "../../../domain/posts-service";

const helper = (query: {[key: string]: string| undefined}) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection : 'desc'
    } }
export const getController = async (req: Request, res: Response<any /*OutputVideoType[]*/>) => {
    const sanitizedQuery = helper(req.query as {[key: string]: string| undefined})

    const allPosts =  await postsService.getPosts(sanitizedQuery) //вопрос
    res.status(200).send(allPosts)
    return
};
