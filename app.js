const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const locationsRouter = require('./controllers/locations')
const checkinRouter = require('./controllers/checkin')
const checkoutRouter = require('./controllers/checkout')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/checkin', checkinRouter)
app.use('/api/checkout', checkoutRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

mongoose
  .connect(config.MONGODB_URI)
  .then(result => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

module.exports = app