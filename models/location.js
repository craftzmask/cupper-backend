const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  place_id: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

locationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Location', locationSchema)