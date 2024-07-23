import {Request, Response} from 'express'

import {blogCollection, postCollection, userCollection} from "../db/mongo-db";

export const deleteAlldata = async (req: Request, res: Response) => {
   await blogCollection.deleteMany()
    await postCollection.deleteMany()
    await userCollection.deleteMany()
    res.sendStatus(204)
    return
}