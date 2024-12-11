const express = require("express");
const orderController = require("../controllers/orderController");
const { verifyToken, isAdmin } = require("../middleware/verifyToken");

const orderRoutes = express.Router();

orderRoutes.post("/", verifyToken, orderController.createOrder);
orderRoutes.get("/", verifyToken, orderController.getOrdersByUser);
orderRoutes.get("/seller", verifyToken, orderController.getOrderBySeller);
orderRoutes.get("/:id", verifyToken, orderController.getOrderById);
orderRoutes.put("/:id/status", verifyToken, orderController.updateOrderStatus);
orderRoutes.delete("/:id", verifyToken, isAdmin, orderController.deleteOrder);

module.exports = orderRoutes;
