const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const path = require('path')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const checkinRouter = require('./controllers/checkin')
const checkoutRouter = require('./controllers/checkout')
const restaurantsRouter = require('./controllers/restaurants')
const topRouter = require('./controllers/top')

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/checkin', middleware.userExtractor, checkinRouter)
app.use('/api/checkout', middleware.userExtractor, checkoutRouter)
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/top', topRouter)

app.get('/*', (req, res) => {
  res.sendFile('build/index.html', { root: __dirname })
});

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

mongoose
  .connect(config.MONGODB_URI)
  .then(result => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

module.exports = app