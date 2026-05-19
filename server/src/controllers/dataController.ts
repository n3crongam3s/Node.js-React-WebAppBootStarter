import { Request, Response } from 'express'
import pool from '../data/dataStore.js'
import type { User } from '@shared/types/User.js'
import { io } from '../index.js'
import { prisma } from "../lib/prisma.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany()
    res.json(result as User[])
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

export const addUsers = async (
  req: Request<{}, {}, { UserName: string , PasswordHash: string }>,
  res: Response
) => {
  try {
    const { UserName, PasswordHash } = req.body

    const result = await prisma.user.create({
      data: {
        UserName,
        PasswordHash,
      },
    })

    io.emit('newUser', result) // Emit new user data to all connected clients

    res.json({ success: true, user: result })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

export const deleteUsers = async (
  req: Request<{}, {}, { UserID: number }>,
  res: Response
) => {
  try {
    const { UserID } = req.body

    const result = await prisma.user.deleteMany({
      where: {
        UserID: UserID
      }
    })

    io.emit('deleteUser', UserID) // Emit deleted user ID to all connected clients

    res.json({ success: true, deleted: result })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

export const updateUsers = async (
  req: Request<{}, {}, { UserID: number, UserName: string, PasswordHash: string }>,
  res: Response
) => {
  try {
    const { UserID, UserName, PasswordHash } = req.body 

    const result = await prisma.user.update({
      where: {
        UserID: UserID
      },
      data: {
        UserName,
        PasswordHash
      }
    })

    io.emit('updateUser', result) // Emit updated user data to all connected clients

    res.json({ success: true, user: result })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
