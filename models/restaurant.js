const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  place_id: String,
  name: String,
  address_object: {
    vicinity: String,
    // lat: Number,
    // long: Number,
  },
  price_level: Number,
  rating: Number,
  distance: Number,
  numberOfPeople: [String],
});

restaurantSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
