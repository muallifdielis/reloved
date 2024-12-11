const midtransService = require("../services/midtransService");
const Transaction = require("../models/Transactions");
const Order = require("../models/Orders");

const transactionController = {};

// Create
transactionController.createTransaction = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Cari order berdasarkan ID dan populate user dengan data tertentu saja
    const order = await Order.findById(orderId).populate({
      path: "user",
      select: "_id name username email phone role", 
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    }

    const transactionDetails = {
      transaction_details: {
        order_id: `ORDER-${order._id}-${Date.now()}`,
        gross_amount: order.total_price,
      },
      customer_details: {
        first_name: order.shippingAddress.name,
        email: order.user.email,
        phone: order.shippingAddress.phone,
      },
    };

    // Panggil layanan Midtrans untuk membuat transaksi
    const midtransResponse = await midtransService.createTransaction(transactionDetails);

    const transaction = new Transaction({
      order: order._id,
      user: order.user,
      amount: order.total_price,
      payment_url: midtransResponse.redirect_url,
      transaction_id: transactionDetails.transaction_details.order_id,
      // Tidak menyertakan `payment_type` pada pembuatan transaksi
    });

    // Simpan transaksi ke database
    await transaction.save();

    res.status(201).json({
      success: true,
      message: "Transaksi berhasil dibuat",
      data: {
        order: transaction.order,
        user: transaction.user,
        amount: transaction.amount,
        payment_status: "pending",
        payment_url: transaction.payment_url,
        transaction_id: transaction.transaction_id,
        _id: transaction._id,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membuat transaksi",
      error: error.message,
    });
  }
};


// Read
transactionController.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("order").populate("user");
    res.status(200).json({ success: true, message: "Daftar transaksi berhasil diambil", data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan saat mengambil daftar transaksi", error: error.message });
  }
};

transactionController.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id).populate("order").populate("user");
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaksi tidak ditemukan" });
    }
    res.status(200).json({ success: true, message: "Detail transaksi berhasil diambil", data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan saat mengambil detail transaksi", error: error.message });
  }
};


// Notification handler (untuk callback Midtrans)
transactionController.paymentNotification = async (req, res) => {
  try {
    const notification = req.body;

    // Temukan transaksi berdasarkan transaction_id
    const transaction = await Transaction.findOne({
      transaction_id: notification.transaction_id,
    });

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaksi tidak ditemukan" });
    }

    // Update transaksi dengan status dan payment_type
    transaction.payment_status = notification.transaction_status;  // Misalnya 'settlement', 'pending', 'failed'
    transaction.payment_type = notification.payment_type;  // 'gopay', 'credit_card', dll.
    
    // Anda dapat menambahkan logika lebih lanjut jika perlu untuk menangani status pembayaran
    if (notification.transaction_status === 'settlement') {
      // Handle jika pembayaran berhasil
      transaction.payment_status = 'paid';
    } else if (notification.transaction_status === 'pending') {
      // Handle jika pembayaran masih pending
      transaction.payment_status = 'pending';
    } else if (notification.transaction_status === 'failed') {
      // Handle jika pembayaran gagal
      transaction.payment_status = 'failed';
    }

    await transaction.save();

    res.status(200).json({ success: true, message: "Transaksi berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memproses notifikasi pembayaran",
      error: error.message,
    });
  }
};







module.exports = transactionController;
