const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyToken, isAdmin } = require('../middleware/verifyToken'); // Pastikan untuk menambahkan middleware autentikasi jika diperlukan

// Route untuk membuat transaksi baru
router.post('/create', verifyToken, transactionController.createTransaction);

// Route untuk mendapatkan transaksi berdasarkan ID
router.get('/:transactionId', verifyToken, transactionController.getTransactionById);

// Route untuk memperbarui status pembayaran transaksi
router.put('/:transactionId/payment-status', verifyToken, isAdmin, transactionController.updatePaymentStatus);

// Route untuk menangani notifikasi dari Midtrans
router.post('/notification', transactionController.handleNotification);

module.exports = router;
