const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  items: [String],
  total: Number,
});

const Order= mongoose.model("Order", OrderSchema);
module.exports=Order
