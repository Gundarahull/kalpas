const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");
const cartController = require("../controllers/cartController");

module.exports = {
  Query: {
    users: () => userController.getUsers(),
    user: (_, { id }) => userController.getUserById(id),

    orders: () => orderController.getOrders(),
    order: (_, { id }) => orderController.getOrderById(id),

    carts: () => cartController.getCarts(),
    cart: (_, { id }) => cartController.getCartById(id),

    companys :() => cartController.getAllCompanies(),
    company: (_, { id }) => cartController.getCompany(id),
  },

  Mutation: {
    createUser: (_, { data }) => userController.createUser(data),
    updateUser: (_, { id, data }) => userController.updateUser(id, data),
    deleteUser: (_, { id }) => userController.deleteUser(id),

    createOrder: (_, { data }) => orderController.createOrder(data),
    deleteOrder: (_, { id }) => orderController.deleteOrder(id),

    createCart: (_, { data }) => cartController.createCart(data),
    clearCart: (_, { userId }) => cartController.clearCart(userId),

    createCompany: (_, { data }) => cartController.createCompany(data),
    getCompany: (_, { id }) => cartController.getCompany(id),
  },
};

//691d8e04ac4f6e22ad1714af - user

//order - 691d94f9aa3c3965573c9344
