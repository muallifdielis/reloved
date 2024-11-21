const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    condition: {
      type: String,
      enum: ["Very Good", "Good", "Usable"],
      required: true,
    },
    image_urls: {
      type: [String],
      validate: [arrayLimit, "Image URLs exceed the limit of 10"],
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 10;
}

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
