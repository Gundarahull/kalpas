const { getFood } = require("../controller/food.controller");
const { foods, restaurants, Ingredients } = require("../data/data");
const { authorize, authentication } = require("../middleware/auth.middleware");
const { runMiddleware } = require("../middleware/runMiddleware");

const resolvers = {
  Query: {
    hello: () => "Starting the Hello chicken",
    foods: () => foods,

    food: runMiddleware(
      [authentication, authorize("admin")],
      (_, { id }) => getFood(id)
    ),
    searchFoods: (_, { category }) => {
      for (let i = 0; i < foods.length; i++) {
        if (foods[i].category == category) {
          return foods[i];
        }
      }
      return null;
    },

    restuarnts: () => restaurants,
    restuarnt: (_, { id }) => {
      for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].id == id) {
          console.log("<<<<<<<<<<<<<<<<", restaurants[i]);

          return restaurants[i];
        }
      }
    },

    topRestuatnt: (_, { minRating }) => {
      return restaurants.sort((a, b) => a.minRating - b.minRating);
    },

    foodsByRestaurant: (_, { restaurantId }) => {},
  },

  Mutation: {
    addFood: (_, { data }) => {
      const newItem = {
        id: foods.length + 1,
        name: data.name,
        price: data.price,
        category: data.category,
        rating: data.rating,
      };
      foods.push(newItem);
      return foods[foods.length - 1];
    },
    addRestuarnt: (_, { data }) => {
      const newItem = {
        id: restaurants.length + 1,
        name: data.name,
        location: data.location,
        minRating: data.minRating,
      };
      restaurants.push(newItem);
      return restaurants[restaurants.length - 1];
    },
  },

  //RelationShips

  // Restuarnt -> Foods
  Restuarnt: {
    foods: (parent) => {
      const foodies = [];
      for (let i = 0; i < foods.length; i++) {
        if (foods[i].restaurantId == parent.id) {
          foodies.push(foods[i]);
        }
      }
      if (foodies.length > 0) {
        return foodies;
      } else {
        return "No Food";
      }
    },
  },

  //Foods->Resturant
  Food: {
    restuarnt: (parent) => {
      return restaurants.find((r) => r.id == parent.restaurantId);
    },
  },

  Food: {
    ingredients: (parent) => {
      console.log("parents---------", parent);

      const ingred = [];
      for (let i = 0; i < Ingredients.length; i++) {
        if (Ingredients[i].foodId == parent.id) {
          ingred.push(Ingredients[i]);
        }
      }
      console.log("Ingred list---------------", ingred);

      if (ingred.length > 0) {
        return ingred;
      } else {
        return "No INGREDIENTS";
      }
    },
  },
};

module.exports = resolvers;

