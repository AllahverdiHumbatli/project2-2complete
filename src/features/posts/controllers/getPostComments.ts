import {Request, Response} from 'express'
import {commentsQueryRepositories} from "../../comments/comments-query-repository";
import {postQueryRepository} from "../post-query-repository";

const helper = (query: {[key: string]: string| undefined}) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection : 'desc'
    } }
export const getPostComments = async (req: Request, res: Response<any /*OutputVideoType[]*/>) => {
    const isPostExsist = await postQueryRepository.getPostById(req.params.id)
    if (!isPostExsist) {
        res.sendStatus(404);
        return
    }

    const sanitizedQuery = helper(req.query as {[key: string]: string| undefined})
    const allCommentsForPost =  await commentsQueryRepositories.getCommentsForPost(sanitizedQuery, req.params.id) //вопрос
    res.status(200).send(allCommentsForPost)
    return
};