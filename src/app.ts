import express from 'express'
import cors from 'cors'
import { blogsRouter} from "./routes/blogs-router";
import { postsRouter} from "./routes/posts-router";
import {deleteAlldata} from "./globalDeteleMethod/deleteAll";
import {usersRouter} from "./routes/users-router";
import {checkLogin} from "./features/users/contollers/loginController";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

app.delete("/testing/all-data", deleteAlldata)
app.use("/blogs", blogsRouter)
app.use("/posts", postsRouter)
app.use('/users', usersRouter)
app.post('/auth/login', checkLogin)