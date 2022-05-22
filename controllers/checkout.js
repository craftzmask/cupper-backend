const checkoutRouter = require('express').Router()
const Restaurant = require('../models/restaurant')
const user = require('../models/user')

checkoutRouter.post('/', async (request, response) => {
  const { place_id } = request.body
  
  const restaurant = await Restaurant.findOne({ place_id })
  if (restaurant === null) {
    return response.status(404).json({
      error: "The restaurant doesn't exist"
    })
  }
  

  if (request.user.place_id !== place_id) {
    return response.status(400).json({
      error: "The restaurant must be the same as checked in"
    })
  }

  const indexUser = restaurant.numberOfPeople.indexOf(request.user._id.toString())
  restaurant.numberOfPeople.splice(indexUser, 1)

  const savedRestaurant = await restaurant.save()
  
  request.user.place_id = ''
  await request.user.save()

  response.json(savedRestaurant)
})

module.exports = checkoutRouter
