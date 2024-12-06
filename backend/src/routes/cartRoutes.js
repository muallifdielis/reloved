const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const cartController = require("../controllers/cartController");

const cartRoutes = express.Router();

cartRoutes.get("/", verifyToken, cartController.getCartItems);
cartRoutes.post("/:id", verifyToken, cartController.createCartItem);
cartRoutes.delete("/:id", verifyToken, cartController.deleteCartItem);

module.exports = cartRoutes;
