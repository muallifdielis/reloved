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
        order_id: `ORDER-${order._id}`,
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

    console.log("Notification received:", notification);

    // Pastikan data yang diterima sesuai dengan struktur yang diharapkan
    const { order_id, transaction_status, payment_type, payment_method } = notification;

    // Temukan transaksi berdasarkan transaction_id
    const transaction = await Transaction.findOne({
      transaction_id: order_id,  // Cocokkan dengan transaction_id dari notifikasi
    });

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaksi tidak ditemukan" });
    }

    // Update status transaksi berdasarkan status pembayaran
    transaction.payment_status = transaction_status; // misalnya: 'settlement', 'pending', 'failed'
    transaction.payment_type = payment_type; // misalnya: 'gopay', 'credit_card', dll.

    // Sesuaikan dengan payment_method yang diterima
    if (payment_type) {
      transaction.payment_type = payment_type;
    }

    if (transaction_status === 'settlement') {
      // Pembayaran berhasil
      transaction.payment_status = 'paid';
    } else if (transaction_status === 'pending') {
      // Pembayaran pending
      transaction.payment_status = 'pending';
    } else if (transaction_status === 'failed') {
      // Pembayaran gagal
      transaction.payment_status = 'failed';
    }

    // Simpan status terbaru transaksi
    await transaction.save();

    // Balas dengan status sukses
    res.status(200).json({ success: true, message: "Transaksi berhasil diperbarui" });

  } catch (error) {
    console.error("Error while handling notification:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memproses notifikasi pembayaran",
      error: error.message,
    });
  }
};
module.exports = transactionController;
