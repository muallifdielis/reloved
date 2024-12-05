const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0
  }
});

cartSchema.methods.calculateTotalPrice = function () {
  this.totalPrice = this.items.reduce((total, item) => total + item.total, 0);
  return this.totalPrice;
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
