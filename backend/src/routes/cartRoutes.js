const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const cartController = require("../controllers/cartController");

const cartRoutes = express.Router();

cartRoutes.post("/", verifyToken, cartController.addToCart);
cartRoutes.get("/", verifyToken, cartController.getCart);
cartRoutes.delete("/remove/:id", verifyToken, cartController.removeCartItem);
cartRoutes.delete("/clear", verifyToken, cartController.clearCart);

module.exports = cartRoutes;
