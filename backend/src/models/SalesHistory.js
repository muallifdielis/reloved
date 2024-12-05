const mongoose = require("mongoose");

const salesHistorySchema = new mongoose.Schema(
  {
    order: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount cannot be negative"],
    },
    tglPemesanan: {
      type: Date,
      required: true,
    },
    statusOrder: {
      type: String,
      enum: ["selesai", "gagal"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SalesHistory = mongoose.model("SalesHistory", salesHistorySchema);

module.exports = SalesHistory;
