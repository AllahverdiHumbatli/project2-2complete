import {ObjectId} from "mongodb";

export type BlogDBType = {
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean

}
export type PostDBType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}
export type UserDBType= {
    _id?: ObjectId,
    login: string,
    email: string,
    createdAt: string,
    passwordHash: string
}