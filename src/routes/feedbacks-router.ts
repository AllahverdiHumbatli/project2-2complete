import {Router} from "express";
import {getCommentById} from "../features/comments/contollers/getCommentById";
import {authMiddleware} from "../global-middlewares/authMiddleWare";
import {contentValidatorForComment} from "../features/comments/middlewares/contentValidator";
import {inputCheckErrorsMiddleware} from "../global-middlewares/globalMiddleWare";
import {uptadeCommentById} from "../features/comments/contollers/putByIdContoller";
import {deleteCommentById} from "../features/comments/contollers/deleteCommentById";

export const feedbacksRouter = Router()

feedbacksRouter.get("/:id", getCommentById)
feedbacksRouter.put("/:id", authMiddleware, contentValidatorForComment, inputCheckErrorsMiddleware, uptadeCommentById)
feedbacksRouter.delete("/:id", authMiddleware, deleteCommentById )