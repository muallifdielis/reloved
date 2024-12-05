const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database"); // Koneksi database
const authRoutes = require("./routes/authRoutes"); // Impor rute autentikasi
const userRoutes = require("./routes/userRoutes");

const dotenv = require("dotenv");

// Mengimpor rute
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

const app = express();

// Koneksi ke MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Menggunakan rute
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/cart", cartRoutes);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
