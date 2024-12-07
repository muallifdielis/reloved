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
    category: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL", "Other"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    isAvailable: {
      type: Boolean,
      default: true,
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
