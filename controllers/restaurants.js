const restaurantsRouter = require("express").Router();
const Restaurant = require("../models/restaurant");

restaurantsRouter.post("/", async (request, response) => {
  const body = request.body;

  console.log("getting restuarants");
  const restaurant = await Restaurant.findById(body.place_id);

  console.log("restaurant is");
  console.log(restaurant);

  if (!restaurant) {
    const restaurantObject = new Restaurant({
      _id: body.place_id,
      name: body.name,
      address_object: {
        vicinity: body.vicinity,
        lat: body.lat,
        lng: body.lng,
      },
      price_level: body.price_level,
      rating: body.rating,
      distance: body.distance,
      numberOfPeople: [],
    });

    const savedRestaurant = await restaurantObject.save();
    response.status(201).json(savedRestaurant);
  }

  response.status(200).json(restaurant);
});

restaurantsRouter.get("/", async (request, response) => {
  const restaurants = await Restaurant.find({});
  response.json(restaurants);
});

restaurantsRouter.get("/:id", async (request, response) => {
  const restaurant = await Restaurant.findById(request.params.id);
  response.json(restaurant);
});

module.exports = restaurantsRouter;
