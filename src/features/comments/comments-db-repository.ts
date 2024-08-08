import {FeedBackType} from "../../types";
import {blogCollection, feedBackCollection} from "../../db/mongo-db";
import {ObjectId, OptionalId} from "mongodb";


export const commentsDbRepository = {

    async postComment(commentEntity: FeedBackType){
        const res = await feedBackCollection.insertOne(commentEntity);
        return  res.insertedId.toString()
    },
    async uptadeCommentById(id: string, content: string){
     const uptadeComment = await feedBackCollection.updateOne({_id: new ObjectId(id)}, {$set: {content: content}});
        if(uptadeComment.matchedCount === 1){
            return true
        }
        return false
    },
    async isOwner(userId: string) {
        const isOwner = await feedBackCollection.findOne({"commentatorInfo.userId": userId})
        if(isOwner){
            return true
        }
        return false
    },
    async deleteCommentById(id: string){
        const result = await feedBackCollection.deleteOne({_id: new ObjectId(id)})
        if(result.deletedCount === 1 ){ return true }
        return false
    }
}
