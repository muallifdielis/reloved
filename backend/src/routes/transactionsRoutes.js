const express = require("express");
const transactionController = require("../controllers/transactionController");
const { verifyToken } = require("../middleware/verifyToken");

const transactionRoutes = express.Router();

// Create: Membuat transaksi baru berdasarkan order
transactionRoutes.post("/", verifyToken, transactionController.createTransaction);

// Read: Mendapatkan semua transaksi
transactionRoutes.get("/", verifyToken, transactionController.getAllTransactions);

// Read: Mendapatkan transaksi berdasarkan ID
transactionRoutes.get("/:id", verifyToken, transactionController.getTransactionById);

// Update: Memperbarui transaksi berdasarkan ID
transactionRoutes.put("/:id", verifyToken, transactionController.updateTransaction);

// Delete: Menghapus transaksi berdasarkan ID
transactionRoutes.delete("/:id", verifyToken, transactionController.deleteTransaction);

module.exports = transactionRoutes;
