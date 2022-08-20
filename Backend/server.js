const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')

require('dotenv').config()

const goalRoutes = require('./routes/goalRoutes')

const port = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', goalRoutes)
app.use(errorHandler)
app.listen(port, () => console.log(`server started on ${port}`))
