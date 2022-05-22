const checkinRouter = require('express').Router()
const Restaurant = require('../models/restaurant')

checkinRouter.post('/', async (request, response) => {
  const { place_id } = request.body
  const user = request.user

  if (user.place_id && user.place_id !== '') {
    return response.status(403).json({
      error: "You cannot check-in more than 1 locations. Please check-out the previous location first"
    })
  }

  const restaurant = await Restaurant.findOne({ place_id })
  if (restaurant === null) {
    return response.status(404).json({
      error: "The restaurant doesn't exist"
    })
  }

  user.place_id = restaurant.place_id
  await user.save()

  restaurant.numberOfPeople.push(user._id.toString())
  const savedRestaurant = await restaurant.save()

  response.json(savedRestaurant)
})

module.exports = checkinRouter
