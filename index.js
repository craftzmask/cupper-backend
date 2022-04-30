require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User  = require('./userSchema')

const app = express()

app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

app.get('/', (request, response) => {
  response.send(`
    <h1>Welcome to Cupper Backend</h1>
    <p><b>Login via:</b>   <i>http://localhost:3001/api/login</i></p>
    <p><b>Sign Up via:</b> <i>http://localhost:3001/api/users</i></p>
  `)
})

// Login
app.post('/api/login', async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, email: user.email, name: user.name })
})

// Sign Up new user
app.post('/api/users', async (request, response) => {
  const { email, name, password } = request.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return response.status(400).json({
      error: 'The email is already existed'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    email,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})