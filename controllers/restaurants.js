const restaurantsRouter = require("express").Router();
const Restaurant = require("../models/restaurant");

restaurantsRouter.post("/", async (request, response) => {
  const body = request.body;

  const restaurant = await Restaurant.find({ place_id: body.place_id });

  if (!restaurant) {
    const restaurantObject = new Restaurant({
      place_id: body.place_id,
      name: body.name,
      address_object: {
        vicinity: body.vicinity,
        lat: body.lat,
        long: body.long,
      },
      price_level: body.price_level,
      rating: body.rating,
      distance: body.distance,
      numberOfPeople: [],
    });

    const savedRestaurant = await restaurantObject.save();
    response.status(201).json(savedRestaurant);
  }

  console.log(restaurant);
  response.status(200).json(restaurant);
});

restaurantsRouter.get("/", async (request, response) => {
  const restaurants = await Restaurant.find({});
  response.json(restaurants);
});

restaurantsRouter.get("/:id", async (request, response) => {
  const restaurant = await Restaurant.findById(request.params.place_id);
  response.json(restaurant);
});

module.exports = restaurantsRouter;
