require("dotenv").config(); // Pastikan dotenv sudah di-import untuk membaca file .env
const midtransClient = require('midtrans-client');

// Inisialisasi Midtrans client menggunakan variabel lingkungan
const snap = new midtransClient.Snap({
  isProduction: false,  // Set to false for sandbox environment
  serverKey: process.env.MIDTRANS_SERVER_KEY,  // Ambil server key dari .env
  clientKey: process.env.MIDTRANS_CLIENT_KEY,  // Ambil client key dari .env
});

const midtransService = {
  createTransaction: async (transactionDetails) => {
    try {
      const parameters = {
        transaction_details: {
          order_id: transactionDetails.orderId,
          gross_amount: transactionDetails.grossAmount,
        },
        customer_details: transactionDetails.customerDetails,
        item_details: transactionDetails.itemDetails,
      };

      // Memanggil Midtrans untuk membuat transaksi
      const transaction = await snap.createTransaction(parameters);

      return {
        success: true,
        transaction,  // Return the full transaction object from Midtrans
      };
    } catch (error) {
      console.error('Midtrans Error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  handleNotification: async (notificationData) => {
    try {
      const statusResponse = await snap.transaction.notification(notificationData);

      // Memproses status transaksi
      const transactionStatus = statusResponse.transaction_status;
      const fraudStatus = statusResponse.fraud_status;

      return {
        success: true,
        transactionStatus,
        fraudStatus,
      };
    } catch (error) {
      console.error('Midtrans Notification Error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

module.exports = midtransService;
