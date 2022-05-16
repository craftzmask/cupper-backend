const checkoutRouter = require('express').Router()
const Location = require('../models/location')

checkoutRouter.post('/', async (request, response) => {
  const { place_id, numberOfPeople } = request.body

  const location = await Location.findOne({ place_id, user: request.user.id })
  if (location === null) {
    return response.status(404).json({
      error: "The location doesn't exist"
    })
  }
  location.numberOfPeople -= numberOfPeople
  await Location.findOneAndDelete({ user: request.user.id })
  response.json(location)
})

module.exports = checkoutRouter
