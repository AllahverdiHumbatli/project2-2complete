import {Router} from "express";
import {getBlogsController} from "../features/blogs/controllers/getController";
import {postContoller} from "../features/blogs/controllers/postContoller";
import {descriptionValidator} from "../features/blogs/middlewares/blogValidator";
import {inputCheckErrorsMiddleware} from "../global-middlewares/globalMiddleWare";
import {nameValidator} from "../features/blogs/middlewares/nameValidator";
import {websyiteUrlValidator} from "../features/blogs/middlewares/websyiteUrlValidator";
import {adminMiddleWare} from "../global-middlewares/adminMiddleWare";
import {getBlogById} from "../features/blogs/controllers/getByIdController";
import {updateBlogById} from "../features/blogs/controllers/putByIdController";
import {deleteBlogById} from "../features/blogs/controllers/deleteBlogByIdController";
import {titleValidator} from "../features/posts/middlewares/titleValidator";
import {shortDescriptionValidator} from "../features/posts/middlewares/shortDescriptionValidator";
import {contentValidator} from "../features/posts/middlewares/contentValidator";
import {blogIdValidator} from "../features/posts/middlewares/blogIdValidator";
import {postController} from "../features/posts/controllers/postController";
import {postByIdController} from "../features/posts/controllers/postByIdContoller";
import {getAllPostsForBlog} from "../features/posts/controllers/getAllPostsForBlog";


export const blogsRouter = Router()

blogsRouter.get('/',  getBlogsController)
blogsRouter.post('/', adminMiddleWare, nameValidator, descriptionValidator,websyiteUrlValidator, inputCheckErrorsMiddleware, postContoller)
blogsRouter.get("/:id", getBlogById)
blogsRouter.put("/:id", adminMiddleWare, nameValidator, descriptionValidator,websyiteUrlValidator, inputCheckErrorsMiddleware, updateBlogById)
blogsRouter.delete("/:id", adminMiddleWare,  deleteBlogById )
blogsRouter.post("/:id/posts",adminMiddleWare, titleValidator, shortDescriptionValidator, contentValidator, inputCheckErrorsMiddleware, postByIdController )
blogsRouter.get("/:id/posts", getAllPostsForBlog)