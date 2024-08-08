import {FeedBackType} from "../types";
import {commentsDbRepository} from "../features/comments/comments-db-repository";
import {commentsQueryRepositories} from "../features/comments/comments-query-repository";
import {feedBackCollection} from "../db/mongo-db";

export const commentsService  = {
    async createComment(commentText: string, userId: string, userLogin: string, postID: string) {
        const commentEntity :FeedBackType = {
            postID: postID,
            content: commentText,
            commentatorInfo: {
                userId: userId,
                userLogin: userLogin
            },
            createdAt:  new Date().toISOString()
        }
        return await commentsDbRepository.postComment(commentEntity);
    },
    async getCommentById(id: string){
        return await commentsQueryRepositories.getCommentById(id)
    },
    async uptadeCommentById(id: string, content: string){
        return await commentsDbRepository.uptadeCommentById(id, content)
    },
    async isOwner(userId: string) {
       return await commentsDbRepository.isOwner(userId)
},
    async deleteCommentById(userId: string) {
        return await commentsDbRepository.deleteCommentById(userId)
    }
}