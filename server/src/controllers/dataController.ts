import { Request, Response } from 'express'
import { Server } from 'socket.io'
import db from '../data/dataStore.js'
import { User } from '@shared/types/User.js'

type CreateUserBody = {
  UserName: string
}

type DeleteUserBody = {
  UserID: number
}

const getSocketServer = (req: Request): Server | undefined => {
  return req.app.locals.io as Server | undefined
}

export const getUsers = (req: Request, res: Response) => {
  try {
    const users = db.prepare("SELECT * FROM Users").all() as User[]
    res.json(users)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export const addUsers = (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  try {
    const { UserName } = req.body

    if (!UserName) {
      return res.status(400).json({ error: "UserName required" })
    }

    const result = db
      .prepare("INSERT INTO Users (UserName) VALUES (?)")
      .run(UserName)

    const newUser = db
      .prepare("SELECT * FROM Users WHERE UserID = ?")
      .get(result.lastInsertRowid) as User | undefined

    const io = getSocketServer(req)
    if (io && newUser) {
      io.emit('newUser', newUser)
    }

    res.json({ success: true, user: newUser })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteUsers = (req: Request<{}, {}, DeleteUserBody>, res: Response) => {
  try {
    const { UserID } = req.body

    const result = db
      .prepare("DELETE FROM Users WHERE UserID = ?")
      .run(UserID)

    const io = getSocketServer(req)
    if (io && result.changes > 0) {
      io.emit('deleteUser', UserID)
    }

    res.json({ success: true, deleted: result.changes, userId: UserID })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}