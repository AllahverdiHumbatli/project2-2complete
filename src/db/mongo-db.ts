import dotenv from 'dotenv'
import {SETTINGS} from "../settings";
import {MongoClient,Collection} from "mongodb";
import {BlogDBType, PostDBType, UserDBType} from "../types";

dotenv.config()

// ...

// получение доступа к бд
export const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const db = client.db();

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.POST_COLLECTION_NAME)
export const userCollection: Collection<UserDBType> = db.collection<UserDBType>(SETTINGS.USER_COLLECTION_NAME)

// проверка подключения к бд
export const connectToDB = async () => {
    try {
        await client.connect()
        console.log('connected to db')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}