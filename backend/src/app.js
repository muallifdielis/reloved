const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { port } = require("./config/env");
const userController = require("./controllers/userController");
const authMiddleware = require("./middleware/authMiddleware");
const productsController = require("./controllers/productsController");
const cartController = require("./controllers/cartController");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Register User
app.post("/register", userController.createUser);

// Login User
app.post("/login", userController.loginUser);

// Get User Profile (Harus terautentikasi dengan token JWT)
app.get("/profile", authMiddleware, userController.getUserProfile);

// Create a product (requires authentication)
app.post("/products", authMiddleware, productsController.createProducts);

// Get all products with optional filters
app.get("/products", productsController.getAllProducts);

// Get a product by ID
app.get("/products/:id", productsController.getProductById);

// Update a product (requires authentication)
app.put("/products/:id", authMiddleware, productsController.updateProduct);

// Delete a product (requires authentication)
app.delete("/products/:id", authMiddleware, productsController.deleteProduct);

// Get products by seller ID (requires authentication)
app.get(
  "/seller/:sellerId",
  authMiddleware,
  productsController.getProductBySeller
);

// Tambahkan item ke keranjang
app.post("/cart/add", authMiddleware, cartController.addToCart);

// Ambil keranjang user
app.get("/cart", authMiddleware, cartController.getCart);

// Perbarui jumlah item di keranjang
app.put("/cart/update", authMiddleware, cartController.updateCartItem);

// Hapus item dari keranjang
app.delete(
  "/cart/remove/:productId",
  authMiddleware,
  cartController.removeCartItem
);

// Kosongkan keranjang
app.delete("/cart/clear", authMiddleware, cartController.clearCart);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
