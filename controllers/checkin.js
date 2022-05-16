const jwt = require('jsonwebtoken')
const checkinRouter = require('express').Router()
const Location = require('../models/location')

/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

*/
checkinRouter.post('/', async (request, response) => {
  const { place_id, numberOfPeople } = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const location = await Location.findById(place_id)
  if (location === null) {
    return response.status(404).json({
      error: "The place doesn't exist"
    })
  }

  location.numberOfPeople += numberOfPeople
  const savedLocation = await location.save()

  response.json(savedLocation)
})

module.exports = checkinRouter
