const mongoose = require("mongoose");

const withdrawalHistorySchema = new mongoose.Schema(
  {
    riwayatPenjualan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesHistory",
      required: true,
    },
    totalPenarikan: {
      type: Number,
      required: true,
      min: [0, "Total penarikan cannot be negative"],
    },
    tglPenarikan: {
      type: Date,
      required: true,
    },
    statusPenarikan: {
      type: String,
      enum: ["berhasil", "gagal"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WithdrawalHistory = mongoose.model(
  "WithdrawalHistory",
  withdrawalHistorySchema
);

module.exports = WithdrawalHistory;
