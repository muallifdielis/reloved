require("dotenv").config();
const midtransClient = require("midtrans-client");

// Inisialisasi Midtrans Snap Client
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "false" ? false : true,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

console.log(process.env.MIDTRANS_SERVER_KEY)
console.log(process.env.MIDTRANS_SERVER_KEY)

const midtransService = {
  /**
   * Membuat transaksi baru di Midtrans
   * @param {Object} transactionDetails - Detail transaksi (order_id, gross_amount, customer_details, dll.)
   * @returns {Object} - Response dari Midtrans Snap API
   */
  createTransaction: async (transactionDetails) => {
    try {
      const transaction = await snap.createTransaction(transactionDetails);
      return transaction;
    } catch (error) {
      throw new Error(`Gagal membuat transaksi Midtrans: ${error.message}`);
    }
  },

  /**
   * Mengecek status transaksi di Midtrans
   * @param {String} transactionId - ID transaksi yang diberikan Midtrans
   * @returns {Object} - Status transaksi dari Midtrans
   */
  getTransactionStatus: async (transactionId) => {
    try {
      const transactionStatus = await snap.transaction.status(transactionId);
      return transactionStatus;
    } catch (error) {
      throw new Error(`Gagal mendapatkan status transaksi: ${error.message}`);
    }
  },

  /**
   * Membatalkan transaksi di Midtrans
   * @param {String} transactionId - ID transaksi yang diberikan Midtrans
   * @returns {Object} - Response dari Midtrans setelah pembatalan
   */
  cancelTransaction: async (transactionId) => {
    try {
      const cancelResponse = await snap.transaction.cancel(transactionId);
      return cancelResponse;
    } catch (error) {
      throw new Error(`Gagal membatalkan transaksi: ${error.message}`);
    }
  },
};

module.exports = midtransService;
