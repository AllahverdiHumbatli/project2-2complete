import {blogsRepositories} from "../features/blogs/blogs-db-repository";
import {BlogDBType} from "../types";


export const blogsService = {
    async getBlogs(query: { pageNumber: number; pageSize: number; sortBy: string; sortDirection: string; searchNameTerm: string | null; }) {
        return await blogsRepositories.getBlogs(query);
    },
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
    async getById(id: string) {
        // return db.blogs.find(blog => blog.id === id)
        return await blogsRepositories.getById(id)

    },
    async updateById(id: string, name: string, description: string, websiteUrl: string) {
        return await blogsRepositories.updateById(id, name, description, websiteUrl)
    },
    async deleteById(id: string) {
        return await blogsRepositories.deleteById(id)

    }
}