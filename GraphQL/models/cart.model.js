const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,
  products: [String],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
