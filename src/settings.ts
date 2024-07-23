import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env

export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 4001,
    PATH: {
        VIDEOS: '/videos',
    },
    MONGO_URL: 'mongodb+srv://alhumbatli:MkwYkNm74tq061Ew@cluster0.sguyj66.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    SECRET_KEY: "YOURSECRETKEYGOESHERE",
    DB_NAME: "blogsAndPosts",
    BLOG_COLLECTION_NAME: 'blogCollection',
    POST_COLLECTION_NAME: 'postCollection',
    USER_COLLECTION_NAME: 'userCollection',
}