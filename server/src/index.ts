import express, { Request, Response } from 'express'
import cors from 'cors'
import http from "http";
import { Server } from "socket.io";
import dataRoutes from './routes/dataRoutes.js'

const app = express()
const port = 5000
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.RENDER_API_URL, // 'http://localhost:5173', //for local development or just add on your .env file
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
})

app.use(cors({
  origin: process.env.RENDER_API_URL // 'http://localhost:5173' //for local development or just add on your .env file
}));
app.use(express.json())

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server' })
})

app.use('/api', dataRoutes)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export { io };