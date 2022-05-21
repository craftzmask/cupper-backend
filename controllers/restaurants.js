const restaurantsRouter = require("express").Router();
const Restaurant = require("../models/restaurant");

restaurantsRouter.post("/", async (request, response) => {
  const body = request.body;
  
  const restaurant = await Restaurant.findOne({ place_id: body.place_id });

  if (!restaurant) {
    const restaurantObject = new Restaurant(request.body)
    const savedRestaurant = await restaurantObject.save();
    response.status(201).json(savedRestaurant);
  }
});

restaurantsRouter.get("/", async (request, response) => {
  const restaurants = await Restaurant.find({});
  response.json(restaurants);
});

restaurantsRouter.get("/:id", async (request, response) => {
  const restaurant = await Restaurant.findOne({ place_id: request.params.id });
  response.json(restaurant);
});

module.exports = restaurantsRouter;
