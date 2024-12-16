const Product = require("../models/Products");
const Order = require("../models/Orders");
const Withdrawal = require("../models/Withdrawal");
const UserBank = require("../models/UserBank");

const withdrawalController = {};

withdrawalController.getSellerEarnings = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const orders = await Order.find({
      "order_items.product": {
        $in: await Product.find({ seller: sellerId }).select("_id"),
      },
      status: "selesai",
    });

    let totalEarnings = 0;
    const orderDetails = [];

    orders.forEach((order) => {
      order.order_items.forEach((item) => {
        totalEarnings += item.price;

        orderDetails.push({
          orderId: order._id,
          productId: item.product._id,
          productName: item.product.name,
          productPrice: item.price,
        });
      });
    });

    const withdrawals = await Withdrawal.find({ seller: sellerId });

    let totalWithdrawn = 0;
    withdrawals.forEach((withdrawal) => {
      totalWithdrawn += withdrawal.amount;
    });

    const availableEarnings = totalEarnings - totalWithdrawn;

    res.status(200).json({
      success: true,
      message:
        "Total pendapatan seller berhasil dihitung berdasarkan order items.",
      data: {
        totalEarnings,
        availableEarnings,
        orderDetails,
      },
    });
  } catch (error) {
    console.error("Error saat menghitung pendapatan seller:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan pada server." });
  }
};

withdrawalController.createWithdrawal = async (req, res) => {
  const sellerId = req.user.id;
  const { userBank, amount } = req.body;

  if (!userBank || !amount) {
    return res.status(400).json({
      success: false,
      message: "Nomor rekening dan jumlah penarikan harus diisi.",
    });
  }

  try {
    const orders = await Order.find({
      "order_items.product": {
        $in: await Product.find({ seller: sellerId }).select("_id"),
      },
      status: "selesai",
    });

    let totalEarnings = 0;
    orders.forEach((order) => {
      order.order_items.forEach((item) => {
        totalEarnings += item.price;
      });
    });

    const withdrawals = await Withdrawal.find({ seller: sellerId });
    let totalWithdrawn = 0;
    withdrawals.forEach((withdrawal) => {
      totalWithdrawn += withdrawal.amount;
    });

    const availableEarnings = totalEarnings - totalWithdrawn;

    // Validasi jumlah penarikan
    const MIN_WITHDRAWAL_AMOUNT = 10000; // Batas minimal penarikan
    if (amount < MIN_WITHDRAWAL_AMOUNT) {
      return res.status(400).json({
        message: `Jumlah minimal penarikan adalah ${MIN_WITHDRAWAL_AMOUNT}.`,
      });
    }

    if (amount > availableEarnings) {
      return res.status(400).json({
        success: false,
        message: "Jumlah penarikan melebihi total pendapatan yang tersedia.",
      });
    }

    // Temukan bank yang sesuai
    const bank = await UserBank.findById(userBank);
    if (!bank) {
      return res
        .status(400)
        .json({ success: false, message: "User bank tidak ditemukan." });
    }

    // Hitung dana tersisa setelah penarikan
    const remainingEarnings = availableEarnings - amount;

    // Buat data withdrawal
    const withdrawal = new Withdrawal({
      seller: sellerId,
      userBank,
      amount,
      totalEarnings,
      remainingEarnings,
      withdrawal_id: `WITHDRAWAL-${Date.now()}`,
    });

    await withdrawal.save();

    const populatedWithdrawal = await Withdrawal.findById(
      withdrawal._id
    ).populate({
      path: "userBank",
      select: "namebank norek",
    });

    res.status(200).json({
      success: true,
      message: "Withdrawal berhasil diproses.",
      withdrawal: populatedWithdrawal,
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat memproses withdrawal:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

// Mendapatkan semua withdrawal milik seller
withdrawalController.getWithdrawals = async (req, res) => {
  const sellerId = req.user.id;

  try {
    const withdrawals = await Withdrawal.find({ seller: sellerId }).populate({
      path: "userBank",
      select: "namebank norek",
    });

    res.status(200).json({
      success: true,
      message: "Daftar withdrawal berhasil diambil.",
      withdrawals,
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data withdrawal:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

// Mendapatkan satu withdrawal berdasarkan ID
withdrawalController.getWithdrawalById = async (req, res) => {
  const { withdrawalId } = req.params;

  try {
    const withdrawal = await Withdrawal.findById(withdrawalId).populate({
      path: "userBank",
      select: "namebank norek",
    });

    if (!withdrawal) {
      return res
        .status(404)
        .json({ success: false, message: "Withdrawal tidak ditemukan." });
    }

    res.status(200).json({
      success: true,
      message: "Withdrawal berhasil diambil.",
      withdrawal,
    });
  } catch (error) {
    console.error("Error saat mendapatkan withdrawal:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan pada server." });
  }
};

// Menghapus withdrawal berdasarkan ID
withdrawalController.deleteWithdrawal = async (req, res) => {
  const { withdrawalId } = req.params;

  try {
    const withdrawal = await Withdrawal.findById(withdrawalId);

    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: "Withdrawal tidak ditemukan.",
      });
    }

    // Hapus withdrawal dari database
    await Withdrawal.findByIdAndDelete(withdrawalId);

    res.status(200).json({
      success: true,
      message: "Withdrawal berhasil dihapus.",
    });
  } catch (error) {
    console.error("Error saat menghapus withdrawal:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan pada server." });
  }
};

module.exports = withdrawalController;
