const express = require('express')
const path = require('path')
const cors = require('cors')
const gamesInfoRoutes = require('./routes/gamesinfo')

const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api', gamesInfoRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
