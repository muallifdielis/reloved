const mongoose = require("mongoose");

const arrayLimit = (val) => val.length <= 10; // Maksimal 10 gambar

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
      default: 1,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL", "Other"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    condition: {
      type: String,
      enum: ["Sangat Bagus", "Bagus", "Dapat Digunakan"],
      required: true,
    },
    image_urls: {
      type: [String],
      validate: [arrayLimit, "Image URLs exceed the limit of 10"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    unlikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
