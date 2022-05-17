const checkinRouter = require('express').Router()
const Location = require('../models/location')
const Restaurant = require('../models/restaurant')

checkinRouter.post('/', async (request, response) => {
  const { place_id } = request.body
  const user = request.user

  const users = await Location.find({ user: user.id })
  if (users.length > 0) {
    return response.status(403).json({
      error: "You cannot check-in more than 1 locations. Please check-out the previous location first"
    })
  }

  const restaurant = await Restaurant.findById(place_id)
  if (restaurant === null) {
    return response.status(404).json({
      error: "The location doesn't exist"
    })
  }

  const location = new Location({
    place_id,
    user: user._id
  })

  await location.save()

  user.place_id = restaurant._id
  await user.save()

  restaurant.numberOfPeople.push(user._id.toString())
  const savedRestaurant = await restaurant.save()

  response.json(savedRestaurant)
})

module.exports = checkinRouter
