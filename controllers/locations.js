const locationsRouter = require('express').Router()
const Location = require('../models/location')

locationsRouter.post('/', async (request, response) => {
  const { place_id } = request.body
  
  const location = await Location.findById(place_id)
  if (!location) {
    const locationObject = new Location({ place_id })
    const savedLocation = await locationObject.save()
    response.status(201).json(savedLocation)
  }
})

module.exports = locationsRouter