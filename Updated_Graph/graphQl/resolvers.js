const { UserInputError } = require("apollo-server");
const { getFood, addFood } = require("../controller/food.controller");
const { foods, restaurants, Ingredients } = require("../data/data");
const { authorize, authentication } = require("../middleware/auth.middleware");
const { runMiddleware } = require("../middleware/runMiddleware");
const foodSchema = require("../validations/food.validation");

const resolvers = {
  Query: {
    hello: () => "Starting the Hello chicken",
    foods: () => foods,

    food: runMiddleware([authentication, authorize("admin")], (_, { id }) =>
      getFood(id)
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
    addFood: async (_, { data }) => {
      try {
        // validate the input data using Yup
        await foodSchema.validate(data, { abortEarly: false });
      } catch (err) {
        throw new UserInputError("Validation failed", {
          errors: err.errors, // Yup gives array of messages
        });
      }

      // if validation passed → proceed
      return addFood(data);
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

// Greetings of the day!

// As part of the interview process, the panel has shared the task outlined below, as discussed on the call.

// Please find the task below and submit it within 3 to 5 days. If you have any questions or need further clarification, feel free to reach out.

// Task: Organization and User Management API (GraphQL)

// Objective

// Build a GraphQL API for managing users, organizations, and memberships. Each organization can have multiple users, and each user can belong to multiple organizations with different roles.
// Requirements

//     Entities:
//         User: Each user has a unique email, a name, and a password.
//         Organization: Each organization has a name and can have associated users.
//         Membership: Represents a user's association with an organization, with a specific role (e.g., member, admin).

//     GraphQL Schema:
//         User Type:
//             User: Fields include id, name, email, and organizations (list of Organization objects where the user is a member).
//         Organization Type:
//             Organization: Fields include id, name, and members (list of Membership objects).
//         Membership Type:
//             Membership: Fields include id, user (the User object), organization (the Organization object), and role (e.g., member, admin).

//     Mutations:
//         User Registration & Login:
//             registerUser(name: String!, email: String!, password: String!): AuthPayload!
//             loginUser(email: String!, password: String!): AuthPayload!
//             AuthPayload: Should return a JWT token and basic user details.
//         Organization Management:
//             createOrganization(name: String!): Organization!: Creates a new organization. Only logged-in users can create an organization.
//         Membership Management:
//             addMemberToOrganization(orgId: ID!, userId: ID!, role: String!): Membership!: Adds a user to an organization with a specific role. Only users with the admin role in that organization can add members.

//     Queries:
//         organizations: [Organization!]!: List all organizations. Only logged-in users can view the list.
//         organizationMembers(orgId: ID!): [Membership!]!: List all members of an organization, showing each member's name, email, and role. Only logged-in users who are members of that organization can view the list.
//         me: User: Fetch the currently logged-in user's details, including organizations they belong to.

//     Authorization & Authentication:
//         Use JWT for authentication.
//         Passwords should be securely hashed before storing in the database.
//         Use role-based access control within GraphQL resolvers to ensure that only authorized users can perform certain actions (e.g., only admins can add members to an organization).

//     Environment & Tools:
//         Node.js with GraphQL (e.g., Apollo Server, Express with graphqlHTTP).
//         Relational database (e.g., PostgreSQL or SQLite).
//         Any ORM of choice (e.g., Drizzle ORM, Sequelize, Knex).

//     Bonus:
//         Implement a refresh token mechanism for managing session expiry.
//         Provide pagination on organizationMembers query to limit results for large organizations.
//         Implement basic input validation and meaningful error handling in GraphQL responses.
//         Write unit tests or integration tests for critical GraphQL operations (registration, login, role-based access control).
