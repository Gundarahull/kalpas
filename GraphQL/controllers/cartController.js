const Cart = require("../models/cart.model");
const Company = require("../models/company.model");

module.exports = {
  async createCart(data) {
    const cart = new Cart(data);
    return await cart.save();
  },

  async clearCart(userId) {
    await Cart.deleteMany({ userId });
    return "Cart cleared";
  },

  async getCarts() {
    return Cart.find();
  },

  async getCartById(id) {
    return Cart.findById(id);
  },

  async createCompany(data) {
    const company = await Company.create(data);
    return company;
  },

  async getCompany(id) {
    console.log("Id--------------", id);

    const company = await Company.findById(id);
    console.log("Company--------------", company);

    return company;
  },

  async getAllCompanies() {
    const cs = await Company.find();
    return cs;
  },
};
