import express from 'express'
import { getUsers, addUsers, deleteUsers, updateUsers } from '../controllers/dataController.js'

const router = express.Router()

router.get('/users', getUsers)
router.post('/users', addUsers)
router.delete('/users', deleteUsers)
router.put('/users', updateUsers)

export default router