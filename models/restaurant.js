const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
  _id: String,
  name: String,
  address_object: {
    vicinity: String,
    lat: Number, 
    lng: Number 
  },
  price_level: Number,
  rating: Number,
  distance: Number,
  numberOfPeople: Number
})

restaurantSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)