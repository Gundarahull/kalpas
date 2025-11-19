const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # -----------------------------
  # GraphQL Types
  # -----------------------------
  type User {
    id: ID!
    name: String
    email: String
    age: Int
    Orders:[Order]
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int!
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }

  type Order {
    id: ID!
    userId: String
    items: [String]
    total: Float

  }

  input CreateOrderInput {
    userId: String!
    items: [String!]!
    total: Float!
  }

  type Cart {
    id: ID!
    userId: String
    products: [String]
  }

  input CreateCartInput {
    userId: String!
    products: [String]!
  }

  input CreateCompanyInput {
    name: String!
    location: String!
  }

  type Company {
    id:ID!
    name:String
    location:String
  }

  # -----------------------------
  # Queries (READ)
  # -----------------------------
  type Query {
    users: [User]
    user(id: ID!): User

    orders: [Order]
    order(id: ID!): Order

    carts: [Cart]
    cart(id: ID!): Cart

    companys:[Company]
    company(id:ID!): Company
  }

  # -----------------------------
  # Mutations (CREATE, UPDATE, DELETE)
  # -----------------------------
  type Mutation {
    createUser(data: CreateUserInput!): User
    updateUser(id: ID!, data: UpdateUserInput!): User
    deleteUser(id: ID!): String

    createOrder(data: CreateOrderInput!): Order
    deleteOrder(id: ID!): String

    createCart(data: CreateCartInput!): Cart
    clearCart(userId: ID!): String

    createCompany(data:CreateCompanyInput!): Company
    getCompany(id: ID!): Company
    
  }
`;

module.exports = typeDefs;
