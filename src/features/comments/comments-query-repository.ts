import {blogCollection, feedBackCollection, postCollection} from "../../db/mongo-db";
import {ObjectId, OptionalId} from "mongodb";
import {FeedBackType} from "../../types";
export const commentsQueryRepositories = {
    async getCommentById(id: string) {
            const res = await feedBackCollection.findOne({_id: new ObjectId(id)})
            if(res){
                return {
                    id: res._id.toString(),
                    content: res.content,
                    commentatorInfo: {
                        userId: res.commentatorInfo.userId,
                        userLogin: res.commentatorInfo.userLogin,
                    },
                    createdAt: res.createdAt
                }
            }
            return false
    },
    async getCommentsForPost(sanitizedQuery: any, postId: string) {
            try {
                // собственно запрос в бд (может быть вынесено во вспомогательный метод)
                const items  = await feedBackCollection
                    .find({postID: postId})
                    .sort(sanitizedQuery.sortBy, sanitizedQuery.sortDirection) //сюда передаются строки
                    .skip((sanitizedQuery.pageNumber - 1) * sanitizedQuery.pageSize)
                    .limit(sanitizedQuery.pageSize)
                    .toArray() as any[] /*SomePostType[]*/

                const totalCount = await feedBackCollection.countDocuments({postID: postId})

                return {
                    pagesCount: Math.ceil(totalCount / sanitizedQuery.pageSize),
                    page: sanitizedQuery.pageNumber,
                    pageSize: sanitizedQuery.pageSize,
                    totalCount: totalCount,
                    items: items.map(comment => ({
                        id: comment._id.toString(),
                        content: comment.content,
                        commentatorInfo: {
                            userId: comment.commentatorInfo.userId,
                            userLogin: comment.commentatorInfo.userLogin,
                        },
                        createdAt: comment.createdAt
                    }))
                }
            } catch (e) {
                console.log(e)
                return {error: 'some error'}
            }


    }

}