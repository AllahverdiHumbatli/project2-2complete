import {blogCollection, postCollection} from "../../db/mongo-db";
import {ObjectId, OptionalId} from "mongodb";
import {BlogDBType, PostDBType} from "../../types";


export const postRepositories = {

    async postPOST(newPost: PostDBType) {

        const res = await postCollection.insertOne(newPost)

        return {
            id: res.insertedId.toString(), // Преобразование ObjectId в строку
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            createdAt: newPost.createdAt,
        };

    },
    async uptadePostById(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const result = await postCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId
            }
        })

        if (result.matchedCount === 1) {
            return true
        }
        return false

    },
    async deletePostById(id: string) {
        const result = await postCollection.deleteOne({_id: new ObjectId(id)})
        if (result.deletedCount === 1) {
            return true
        }
        return false
    }
}


