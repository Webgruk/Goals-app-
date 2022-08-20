const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const colors = require('colors')
require('dotenv').config()

const goalRoutes = require('./routes/goalRoutes')
const connectDB = require('./config/db')

const port = process.env.PORT || 4000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', goalRoutes)
app.use(errorHandler)
app.listen(port, () => console.log(`server started on ${port}`))
