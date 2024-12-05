const express = require("express");
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middleware/verifyToken");

const orderRoutes = express.Router();

orderRoutes.get("/", verifyToken, orderController.getAllOrders);
orderRoutes.get("/:id", verifyToken, orderController.getOrderById);
orderRoutes.post("/", verifyToken, orderController.createOrder);
orderRoutes.put("/:id", verifyToken, orderController.updateOrder);
orderRoutes.delete("/:id", verifyToken, orderController.deleteOrder);

module.exports = orderRoutes;
