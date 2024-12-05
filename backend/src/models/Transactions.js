const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["transfer", "E-wallet"],
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
