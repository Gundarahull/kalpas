const Order = require("../models/order.model");

module.exports = {
  async createOrder(data) {
    const order = new Order(data);
    return await order.save();
  },

  async deleteOrder(id) {
    await Order.findByIdAndDelete(id);
    return "Order deleted";
  },

  async getOrders() {
    return Order.find();
  },

  async getOrderById(id) {
    return Order.findById(id);
  },
};
