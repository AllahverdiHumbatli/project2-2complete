import {blogsRepositories} from "../features/blogs/blogs-db-repository";
import {BlogDBType} from "../types";


export const blogsService = {
    async postBlog(name: string, description: string, websiteUrl: string) {

        const newBlog = {
             name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return await blogsRepositories.postBlog(newBlog)

    },

    async updateById(id: string, name: string, description: string, websiteUrl: string) {
        return await blogsRepositories.updateById(id, name, description, websiteUrl)
    },
    async deleteById(id: string) {
        return await blogsRepositories.deleteById(id)
    }
}