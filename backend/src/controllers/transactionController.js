const Order = require('../models/Orders');
const Transaction = require('../models/Transactions');
const Product = require('../models/Products');
const midtransService = require('../services/midtransService');

// Fungsi untuk membuat transaksi Midtrans
const transactionController = {
  createTransaction: async (req, res) => {
    try {
      const orderId = req.body.orderId;
      const order = await Order.findById(orderId).populate('order_items.product');

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Validasi sebelum membuat transaksi, pastikan semua produk yang dipesan tersedia
      const invalidItems = [];
      let totalAmount = 0; // Total harga untuk transaksi
      const itemDetails = order.order_items.map(item => {
        const product = item.product;
        let quantity = 0;

        // Tentukan quantity berdasarkan apakah produk tersedia atau tidak
        if (product.isAvailable) {
          quantity = 1;
        } else {
          invalidItems.push(product._id);  // Simpan produk yang tidak tersedia
        }

        // Hitung total harga dari item
        const itemAmount = product.price * quantity;
        totalAmount += itemAmount; // Menambahkan harga item ke totalAmount

        return {
          id: product._id.toString(),
          name: product.name,
          price: product.price,
          quantity: quantity,  // Gunakan quantity yang telah dihitung
        };
      });

      // Jika ada produk yang tidak tersedia
      if (invalidItems.length > 0) {
        return res.status(400).json({
          message: 'Some products are no longer available',
          unavailableProducts: invalidItems,
        });
      }

      // Pastikan gross_amount sesuai dengan total harga item
      const transactionDetails = {
        orderId: order._id.toString(),
        grossAmount: totalAmount, // Set gross_amount sesuai dengan total harga
        customerDetails: {
          first_name: order.user.name,
          email: order.user.email,
          phone: order.shippingAddress.phone,
          address: order.shippingAddress.address,
        },
        itemDetails: itemDetails, // Sertakan item_details dengan quantity yang benar
      };

      // Kirim transaksi ke Midtrans
      const midtransResponse = await midtransService.createTransaction(transactionDetails);

      // Cek respons dari Midtrans
      if (midtransResponse.success) {
        const newTransaction = new Transaction({
          order: order._id,
          user: order.user,
          amount: totalAmount, // Menggunakan totalAmount sebagai jumlah transaksi
          payment_url: midtransResponse.transaction.payment_url, // Pastikan URL pembayaran ada
          transaction_id: midtransResponse.transaction.transaction_id,
        });

        await newTransaction.save();

        order.status = 'menunggu';  // Status order adalah "menunggu" pembayaran
        await order.save();

        // Mengirimkan response sukses beserta payment_url
        return res.status(200).json({
          message: 'Transaction created successfully',
          payment_url: midtransResponse.transaction.payment_url, // Ini untuk menyertakan payment_url
          transaction_id: midtransResponse.transaction.transaction_id,
        });
      } else {
        return res.status(500).json({
          message: 'Failed to create transaction',
          error: midtransResponse.error,
        });
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  },

  // Fungsi untuk mendapatkan transaksi berdasarkan ID
  getTransactionById: async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      const transaction = await Transaction.findById(transactionId).populate('order user');

      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      return res.status(200).json(transaction);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  },

  // Fungsi untuk mengupdate status pembayaran transaksi
  updatePaymentStatus: async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      const { paymentStatus } = req.body; // paymentStatus bisa berisi 'paid', 'unpaid', 'pending', dll.

      // Validasi status pembayaran yang diterima
      const validStatuses = ["unpaid", "paid", "pending", "cancelled", "expired"];
      if (!validStatuses.includes(paymentStatus)) {
        return res.status(400).json({ message: "Invalid payment status" });
      }

      const transaction = await Transaction.findById(transactionId);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      transaction.payment_status = paymentStatus;

      // Jika status pembayaran berhasil, update transaksi
      await transaction.save();

      // Jika pembayaran diterima (status 'paid'), ubah status order menjadi "paid"
      if (paymentStatus === 'paid') {
        const order = await Order.findById(transaction.order);
        order.status = 'paid';  // Status order menjadi sudah dibayar
        await order.save();
      }

      return res.status(200).json({
        message: `Transaction status updated to ${paymentStatus}`,
        transaction,
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  },

  // Fungsi untuk menangani notifikasi dari Midtrans
  handleNotification: async (req, res) => {
    try {
      const notificationData = req.body;
      
      // Proses notifikasi transaksi menggunakan Midtrans
      const response = await midtransService.handleNotification(notificationData);

      if (response.success) {
        // Jika notifikasi berhasil diproses, kirim respons sukses
        return res.status(200).json({
          message: 'Notification processed successfully',
          transactionStatus: response.transactionStatus,
          fraudStatus: response.fraudStatus,
        });
      } else {
        // Jika ada masalah dalam memproses notifikasi
        return res.status(400).json({
          message: 'Failed to process notification',
          error: response.error,
        });
      }
    } catch (error) {
      console.error('Error handling notification:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  },
};

module.exports = transactionController;
