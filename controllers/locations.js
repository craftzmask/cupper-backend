const locationsRouter = require('express').Router()
const Location = require('../models/location')

locationsRouter.post('/', async (request, response) => {
  const { place_id } = request.body

  const location = await Location.findById(place_id)
  if (!location) {
    const locationObject = new Location({
      _id: place_id,
      numberOfPeople: 0
    })

    const savedLocation = await locationObject.save()
    response.status(201).json(savedLocation)
  }
})

module.exports = locationsRouter