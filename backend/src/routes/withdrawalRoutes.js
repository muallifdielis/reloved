const express = require("express");
const withdrawalController = require("../controllers/withdrawalController");
const { verifyToken, isAdmin } = require("../middleware/verifyToken");

const withdrawalRoutes = express.Router();

withdrawalRoutes.post("/", verifyToken, withdrawalController.createWithdrawal);
withdrawalRoutes.get("/seller/earnings/:sellerId", verifyToken, withdrawalController.getSellerEarnings);
withdrawalRoutes.get("/seller", verifyToken, withdrawalController.getWithdrawals);
withdrawalRoutes.get("/:withdrawalId", verifyToken, withdrawalController.getWithdrawalById);

module.exports = withdrawalRoutes;
