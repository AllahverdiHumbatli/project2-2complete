import {UserDBType} from "../types";
import jwt from 'jsonwebtoken';
import {SETTINGS} from "../settings";
import {ObjectId} from 'mongodb'
export const jwtService = {
    async createJWT(user: UserDBType){
    const token = await jwt.sign({userId: user._id}, SETTINGS.SECRET_KEY, {expiresIn: '2h'});
    return token
},
    async getUserByIdToken (token: string){
        try {
            const result: any = await jwt.verify(token, SETTINGS.SECRET_KEY);
            return result.userId.toString()
        }
        catch (error){
            return null
        }
}
}