const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  id: String,
  place_id: String,
  numberOfPeople: Number
})

locationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Location', locationSchema)