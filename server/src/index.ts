import express, { Request, Response } from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import dataRoutes from './routes/dataRoutes.js'

const app = express()
const port = 5000
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

app.locals.io = io

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
})

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json())

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server' })
})

app.use('/api', dataRoutes)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})