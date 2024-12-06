const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { port } = require("./config/env");

const dotenv = require("dotenv");

// Mengimpor rute
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");
// const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Menggunakan rute
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/cart", cartRoutes);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
