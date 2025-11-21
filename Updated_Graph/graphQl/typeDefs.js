const { gql } = require("apollo-server");

//Creating menus

const typeDefs = gql`
  type Food { # segemnt like a Combo,
    id: ID!
    name: String!
    price: Int!
    category: String!
    rating: Float!
    restuarntId: Restuarnt # reverse relation ship between Resturant and Food like in which resturant this food in present
    ingredients: [Ingredient]
  }

  input inputAddFood {
    name: String!
    price: Int!
    category: String!
    rating: Float!
  }

  type Restuarnt {
    id: ID!
    name: String!
    location: String!
    minRating: Float!
    foods: [Food] #relation between Resturant and Food
  }

  input inputAddRestuarnt {
    name: String!
    location: String!
    minRating: Float!
  }

  type Ingredient {
    name: String!
    localName: String!
  }

  type Query {
    hello: String
    foods: [Food]
    food(id: ID!): Food

    searchFoods(category: String!): Food

    restuarnts: [Restuarnt]
    restuarnt(id: ID!): Restuarnt

    topRestuatnt(minRating: Float): [Restuarnt]

    foodsByRestaurant(restaurantId: ID!): [Food]
  }

  type Mutation {
    addFood(data: inputAddFood!): Food
    addRestuarnt(data: inputAddRestuarnt!): Restuarnt
  }
`;

module.exports = typeDefs;
