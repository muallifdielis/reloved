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
      enum: ["pending", "paid", "failed", "expired"],
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
        "E-Wallets",
        // "GoPay",
        // "ShopeePay",
        // "QRIS",

        "Bank_Transfers",
        // "Permata Virtual Account",
        // "BCA Virtual Account",
        // "Mandiri Bill Payment",
        // "BNI Virtual Account",
        // "BRI Virtual Account",
        // "CIMB Virtual Account",

        "Convenience_Store",
        // "Indomaret",
        // "Alfamart",

        "Cardless_Credit",
        // "Akulaku",
        // "Kredivo",
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
