import {PostDBType} from "../types";
import {postRepositories} from "../features/posts/post-db-repository";
import {blogsRepositories} from "../features/blogs/blogs-db-repository";

// type Pagination = { pageNumber: number; pageSize: number; sortBy: string; sortDirection: string; }
// type ParPagination = Partial<Pagination>
// type I = Required<ParPagination>
// type a = {a : string}
// type b = {b : number}
// type c = a & b


export const postsService = {
    async getPosts(sanitizedQuery:{pageNumber: number, pageSize: number, sortBy: string, sortDirection: string})  {
        return await postRepositories.getPosts(sanitizedQuery);

    },

    // todo generics =  dynamic typization
    async postPOST(title: string, shortDescription: string, content: string, blogId: string) {
        const newPost = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: Math.random().toString(36).substring(2, 9),
            createdAt: new Date().toISOString(),
        }
        return await postRepositories.postPOST(newPost)
    }
    ,
    async postPOSTByBlogId(title: string, shortDescription: string, content: string, blogId: string) {
        const isBlogExists = await blogsRepositories.getById(blogId)
        console.log(isBlogExists)
        if(isBlogExists){
            const newPost = {
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: Math.random().toString(36).substring(2, 9),
                createdAt: new Date().toISOString(),
            }
            return await postRepositories.postPOST(newPost)
        }
        return false


    },
    async getPostById(id: string) {
       return postRepositories.getPostById(id)
    },
    async uptadePostById(id: string, title: string, shortDescription: string, content: string, blogId: string) {
       return postRepositories.uptadePostById(id, title, shortDescription, content, blogId)
    },
    async deletePostById(id: string) {
        return postRepositories.deletePostById(id)
    },
    async getAllPostsForBlog(query: { pageNumber: number; pageSize: number; sortBy: string; sortDirection: string; searchNameTerm: string | null; },id: string) {
        return postRepositories.getAllPostsForOneBlog(query, id)
    }
}

