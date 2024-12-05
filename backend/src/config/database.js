const mongoose = require("mongoose");
const { mongodbUri } = require("./env"); 

const connectDB = async () => {
  try {
    if (!mongodbUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Keluar jika gagal koneksi
  }
};

module.exports = connectDB;
