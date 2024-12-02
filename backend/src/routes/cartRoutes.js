const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const cartController = require("../controllers/cartController");

const cartRoutes = express.Router();

cartRoutes.get("/", cartController.getCartItems);
cartRoutes.post("/", verifyToken, cartController.createCartItem);
cartRoutes.delete("/:id", verifyToken, cartController.deleteCartItem);
cartRoutes.put("/:id", verifyToken, cartController.updateCartItem);

module.exports = cartRoutes;