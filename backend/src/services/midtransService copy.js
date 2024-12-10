require("dotenv").config(); 
const midtransClient = require('midtrans-client');

// Inisialisasi Midtrans client menggunakan variabel lingkungan
const snap = new midtransClient.Snap({
  isProduction: false,  // Set to false for sandbox environment
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
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

      // Log respons dari Midtrans untuk debugging
      console.log('Midtrans Response:', transaction);

      // Pastikan respons memiliki property payment_url
      if (transaction && transaction.redirect_url) {
        return {
          success: true,
          transaction: {
            payment_url: transaction.redirect_url, 
            transaction_id: transaction.transaction_id, 
          },
        };
      }

      return {
        success: false,
        error: 'Payment URL not found in the response',
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
