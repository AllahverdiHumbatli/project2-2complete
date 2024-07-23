import {blogCollection, postCollection} from "../../db/mongo-db";
import {ObjectId, OptionalId} from "mongodb";
import {BlogDBType, PostDBType} from "../../types";


export const postQueryRepository = {
    async getPosts(query: any) {
        try {
            // собственно запрос в бд (может быть вынесено во вспомогательный метод)
            const items = await postCollection
                .find({})
                .sort(query.sortBy, query.sortDirection) //сюда передаются строки
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray() as any[] /*SomePostType[]*/

            const totalCount = await postCollection.countDocuments({})
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: items.map(post => ({
                    id: post._id.toString(),
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                    blogName: post.blogName,
                    createdAt: post.createdAt
                }))
            }
        } catch (e) {
            console.log(e)
            return {error: 'some error'}
        }

    },
    async getPostById(id: string) {
        const res = await postCollection.findOne({_id: new ObjectId(id)})
        console.log("рес из монго", res)
        if (res) {
            return {
                id: res._id.toString(), // Преобразование ObjectId в строку
                title: res.title,
                shortDescription: res.shortDescription,
                content: res.content,
                blogId: res.blogId,
                blogName: res.blogName,
                createdAt: res.createdAt
            }

        }
        return
    },
    async getAllPostsForOneBlog(query: any, blogId: string) {

        const search = query.searchNameTerm
            ? {title: {$regex: query.searchNameTerm, $options: 'i'}}
            : {}
        const filter = {
            blogId,
            // _id: {$in: [new ObjectId(someStringId), ...]}
            ...search,
        }
        console.log(filter)
        try {
            // собственно запрос в бд (может быть вынесено во вспомогательный метод)
            const items = await postCollection
                .find(filter)
                .sort(query.sortBy, query.sortDirection) //сюда передаются строки
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray() as any[] /*SomePostType[]*/

            // подсчёт элементов (может быть вынесено во вспомогательный метод)
            const totalCount = await postCollection.countDocuments(filter)

            // формирование ответа в нужном формате (может быть вынесено во вспомогательный метод)
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: items.map(post => ({
                    id: post._id.toString(),
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                    blogName: post.blogName,
                    createdAt: post.createdAt
                }))
            }
        } catch (e) {
            console.log(e)
            return {error: 'some error'}
        }
    }
}


