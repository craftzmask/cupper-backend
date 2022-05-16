const topRouter = require('express').Router()
const Restaurant = require('../models/restaurant')

topRouter.get('/', async (request, response) => {
  const restaurants = await Restaurant.find({})
  const compare = (a, b) => b.rating - a.rating
  restaurants.sort(compare)
  response.json(restaurants.slice(0, 5))
})

module.exports = topRouter