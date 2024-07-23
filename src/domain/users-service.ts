import {body} from "express-validator"
import {usersDbRepository} from "../features/users/users-db-repository";
import {userCollection} from "../db/mongo-db";
import * as bcrypt from 'bcrypt'

 export const usersService = {
    async createUser(login: string, email: string, password: string) {
        let error:any = []
    const uniqueCheckForLogin = await userCollection.findOne({login: login})
        if(uniqueCheckForLogin){
            error.push({ message: 'login should be unique', field: 'login'})
        }
    const uniqueCheckForEmail = await userCollection.findOne({email: email})
        if(uniqueCheckForEmail){
            error.push({ message: 'email should be unique', field: 'email',})
        }
        if(error.length > 0) return error

         const passwordSalt = await bcrypt.genSalt(10);
         const passwordHash = await bcrypt.hash(password, passwordSalt);

        const newUser = {
            login: login,
            email: email,
            createdAt: new Date().toISOString(),
            passwordHash: passwordHash
        }
        return await usersDbRepository.createUser(newUser)
    },
   async  deleteById(id: string) {
       console.log("айдишка юзера в сервисе", id)
        return await usersDbRepository.deleteById(id)
   },
   async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersDbRepository.findByLoginOrEmail(loginOrEmail)
        if (!user){
            return false
        }
        const isCorrect = await bcrypt.compare(password, user.passwordHash)
       if (isCorrect){
           return true
       }
       return false

   }
 }