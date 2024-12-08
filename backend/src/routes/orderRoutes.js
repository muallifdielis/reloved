const express = require("express");
const orderController = require("../controllers/orderController");
const { verifyToken, isAdmin} = require("../middleware/verifyToken");

const orderRoutes = express.Router();

orderRoutes.post("/", verifyToken, orderController.createOrder);
orderRoutes.get("/", verifyToken, orderController.getOrdersByUser);
orderRoutes.get("/:id", verifyToken, orderController.getOrderById);
orderRoutes.put("/:id/status", verifyToken, isAdmin, orderController.updateOrderStatus);
orderRoutes.delete("/:id", verifyToken, orderController.deleteOrder);

module.exports = orderRoutes;
