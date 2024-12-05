const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database"); // Koneksi database
const authRoutes = require("./routes/authRoutes"); // Impor rute autentikasi
const userRoutes = require("./routes/userRoutes"); 

const app = express();

// Koneksi ke MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Gunakan rute 
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
