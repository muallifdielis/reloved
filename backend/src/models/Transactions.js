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
    payment_type: {
      type: String,
      enum: [
        "e-wallets", // e.g., GoPay, ShopeePay
        "bank_transfers", // e.g., Virtual Accounts, Bank Transfer
        "convenience_store", // e.g., Indomaret, Alfamart
        "cardless_credit", // e.g., Akulaku, Kredivo
      ],
      required: false,
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
