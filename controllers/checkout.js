const checkoutRouter = require('express').Router()
const Location = require('../models/location')
const Restaurant = require('../models/restaurant')

checkoutRouter.post('/', async (request, response) => {
  const { place_id } = request.body

  const restaurant = await Restaurant.findById(place_id)
  if (restaurant === null) {
    return response.status(404).json({
      error: "The restaurant doesn't exist"
    })
  }

  const location = await Location.findOne({ place_id, user: request.user.id })
  if (location === null) {
    return response.status(404).json({
      error: "The location doesn't exist"
    })
  }
  await Location.findOneAndDelete({ user: request.user.id })
  
  const indexUser = restaurant.numberOfPeople.indexOf(user._id.toString())
  restaurant.numberOfPeople.splice(indexUser, 1)

  const savedRestaurant = await restaurant.save()
  response.json(savedRestaurant)
})

module.exports = checkoutRouter
