import {Router} from "express";
import {adminMiddleWare} from "../global-middlewares/adminMiddleWare";
import {loginValidator} from "../features/users/middlewares/loginValidator";
import {passwordValidator} from "../features/users/middlewares/passwordValidator";
import {postUser} from "../features/users/contollers/postContoller";
import {inputCheckErrorsMiddleware} from "../global-middlewares/globalMiddleWare";
import {emailValidator} from "../features/users/middlewares/emailValidator";
import {getUsers} from "../features/users/contollers/getController";
import {deleteUserById} from "../features/users/contollers/deleteByIdController";

export const usersRouter = Router()

usersRouter.get('/', adminMiddleWare, getUsers )
usersRouter.post('/',adminMiddleWare, loginValidator, passwordValidator, emailValidator, inputCheckErrorsMiddleware, postUser )
usersRouter.delete('/:id', adminMiddleWare, deleteUserById)
