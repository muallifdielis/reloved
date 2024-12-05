const mongoose = require("mongoose");

const userBankSchema = new mongoose.Schema(
  {
    namePank: {
      type: String,
      required: true,
      trim: true,
    },
    norek: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    deskripsi: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserBank = mongoose.model("UserBank", userBankSchema);

module.exports = UserBank;
