import {blogCollection, userCollection} from "../../db/mongo-db";
import {UserDBType} from "../../types";
import {ObjectId, OptionalId} from "mongodb";
export const usersQueryRepositories = {
   mapToOutOutPut(user: UserDBType){
      return {
         id: user._id?.toString() ,
         login: user.login,
         email: user.email,
         createdAt: user.createdAt
      }
   },
   async getUsers(query: any) {
      const searchLogin = query.searchLoginTerm
          ? {login: {$regex: query.searchLoginTerm, $options: 'i'}}
          : {}
      const searchEmail = query.searchEmailTerm
          ? {email: {$regex: query.searchEmailTerm, $options: 'i'}}
          : {}
      const filter = {
         ...searchLogin,
         ...searchEmail,
      }
      console.log("фильтр", filter)
      try {
         const totalCount = await userCollection.countDocuments({$or: [searchLogin, searchEmail]})
         const items = await userCollection
             .find({$or: [searchLogin, searchEmail]})
             .sort(query.sortBy, query.sortDirection) //сюда передаются строки
             .skip((query.pageNumber - 1) * query.pageSize)
             .limit(query.pageSize)
             .toArray() as any[] /*SomePostType[]*/


         // формирование ответа в нужном формате (может быть вынесено во вспомогательный метод)
         return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: items.map(this.mapToOutOutPut)
         }
      } catch (e) {
         console.log(e)
         return {error: 'some error'}
      }
   },
   async getUserById(id: string) {
      const res = await userCollection.findOne({ _id: new ObjectId(id) })
      if(res){
         return this.mapToOutOutPut(res)
      }
      return false
   }
}