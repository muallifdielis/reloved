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
      enum: ["Sangat Baik", "Baik", "Layak Pakai"],
      required: true,
    },
    images: {
      type: [String],
      validate: [arrayLimit, "Gambar tidak boleh lebih dari 10"],
    },
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL", "Other"],
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
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
