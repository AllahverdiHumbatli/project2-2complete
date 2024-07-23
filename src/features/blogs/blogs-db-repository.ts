import {blogCollection} from "../../db/mongo-db";
import {ObjectId, OptionalId} from "mongodb";
import {BlogDBType} from "../../types";


export const blogsRepositories = {

    async postBlog(newBlog:BlogDBType){
        const res = await blogCollection.insertOne(newBlog)
        return  res.insertedId.toString()
    },
    async updateById(id:string, name:string, description: string, websiteUrl: string){
        const result =  await blogCollection.updateOne({_id: new ObjectId(id)}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})
        if(result.matchedCount === 1){
            return true
        }
        return false
        //
    },
    async deleteById(id: string){
        const result = await blogCollection.deleteOne({_id: new ObjectId(id)})
        if(result.deletedCount === 1 ){ return true }
        return false
    }

}