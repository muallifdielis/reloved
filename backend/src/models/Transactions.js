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
    amount: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "expired", "cancelled", "denied"],
      default: "pending",
    },
    payment_url: {
      type: String,
      required: true,
    },
    transaction_id: {
      type: String,
      unique: true,
      required: true,
    },
    transaction_status: {
      type: String,
      enum: ["pending", "settlement", "deny", "expire", "cancel"],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
