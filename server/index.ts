import express, { Request, Response } from 'express'
import cors from 'cors'
import dataRoutes from './routes/dataRoutes'

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server' })
})

app.use('/api', dataRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})