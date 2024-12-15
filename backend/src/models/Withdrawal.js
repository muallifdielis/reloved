const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userBank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserBank",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 10000,
    },
    totalEarnings: {
      type: Number,
      required: true,
      min: 0,
    },
    remainingEarnings: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    withdrawal_id: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);

module.exports = Withdrawal;
