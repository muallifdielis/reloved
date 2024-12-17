const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { port } = require("./config/env");
// Mengimpor rute
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const transactionRoutes = require("./routes/transactionsRoutes");
const withdrawalRoutes = require("./routes/withdrawalRoutes");
const userbankRoutes = require("./routes/userbankRoutes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Menggunakan rute
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Pong!" });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/withdrawal", withdrawalRoutes);
app.use("/api/userbank", userbankRoutes);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
