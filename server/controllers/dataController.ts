import { Request, Response } from 'express'
import db from '../data/dataStore'
import { User } from '@shared/types/User'

type CreateUserBody = {
  UserName: string
}

type DeleteUserBody = {
  UserID: number
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

    res.json({ success: true, id: result.lastInsertRowid })
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

    res.json({ success: true, deleted: result.changes })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}