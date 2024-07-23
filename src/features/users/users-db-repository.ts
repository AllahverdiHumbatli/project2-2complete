import {UserDBType} from "../../types";
import {userCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";

export const usersDbRepository = {
     async createUser(newUser: UserDBType){
         const res = await userCollection.insertOne(newUser)
         return res.insertedId.toString()
    },
    async deleteById (userId: string){
        console.log("айдишка юзера в репе", userId)
         const res = await userCollection.deleteOne({_id: new ObjectId(userId)})
        return res.deletedCount === 1;

    },
    async findByLoginOrEmail(loginOrEmail: string){
        return await userCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
    }
}