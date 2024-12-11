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

// Callback: Menangani notifikasi dari Midtrans untuk memperbarui status pembayaran
transactionRoutes.post('/midtrans/callback', transactionController.handleMidtransCallback);

module.exports = transactionRoutes;