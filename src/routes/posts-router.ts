import {Router} from "express";
import {getController} from "../features/posts/controllers/getController";
import {postController} from "../features/posts/controllers/postController";
import {titleValidator} from "../features/posts/middlewares/titleValidator";
import {shortDescriptionValidator} from "../features/posts/middlewares/shortDescriptionValidator";
import {contentValidator} from "../features/posts/middlewares/contentValidator";
import {blogIdValidator} from "../features/posts/middlewares/blogIdValidator";
import {inputCheckErrorsMiddleware} from "../global-middlewares/globalMiddleWare";
import {adminMiddleWare} from "../global-middlewares/adminMiddleWare";
import {getByIdController} from "../features/posts/controllers/getByIdController";
import {putByIdContoller} from "../features/posts/controllers/putByIdContoller";
import {deletePostById} from "../features/posts/controllers/deleteByIdContoller";

export const postsRouter = Router()

postsRouter.get("/",  getController)
postsRouter.post("/",  adminMiddleWare, titleValidator, shortDescriptionValidator, contentValidator, blogIdValidator, inputCheckErrorsMiddleware, postController)
postsRouter.get("/:id",getByIdController )
postsRouter.put("/:id", adminMiddleWare, titleValidator, shortDescriptionValidator, contentValidator, blogIdValidator, inputCheckErrorsMiddleware, putByIdContoller)
postsRouter.delete("/:id",adminMiddleWare,  deletePostById)