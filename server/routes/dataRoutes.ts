import express from 'express'
import { getUsers, addUsers, deleteUsers } from '../controllers/dataController'

const router = express.Router()

router.get('/users', getUsers)
router.post('/users', addUsers)
router.delete('/users', deleteUsers)

export default router