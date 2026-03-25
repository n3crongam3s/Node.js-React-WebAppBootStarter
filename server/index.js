const express = require('express')
const cors = require('cors')

const dataRoutes = require('./routes/dataRoutes')

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server' })
})

app.use('/api', dataRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
