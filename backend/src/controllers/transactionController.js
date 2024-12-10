const midtransService = require("../services/midtransService");
const Transaction = require("../models/Transactions");
const Order = require("../models/Orders");

const transactionController = {};

// Create
transactionController.createTransaction = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate("user");
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

    const midtransResponse = await midtransService.createTransaction(transactionDetails);

    const transaction = new Transaction({
      order: order._id,
      user: order.user,
      amount: order.total_price,
      payment_url: midtransResponse.redirect_url,
      transaction_id: transactionDetails.transaction_details.order_id,
    });
    await transaction.save();

    res.status(201).json({
      success: true,
      message: "Transaksi berhasil dibuat",
      data: transaction,
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

// Update
transactionController.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const transaction = await Transaction.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaksi tidak ditemukan" });
    }

    res.status(200).json({ success: true, message: "Transaksi berhasil diperbarui", data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan saat memperbarui transaksi", error: error.message });
  }
};

// Delete
transactionController.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaksi tidak ditemukan" });
    }

    res.status(200).json({ success: true, message: "Transaksi berhasil dihapus", data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan saat menghapus transaksi", error: error.message });
  }
};

module.exports = transactionController;
