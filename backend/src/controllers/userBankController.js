const UserBank = require("../models/UserBank");
const User = require("../models/Users");

const userBankController = {};

// Menambahkan rekening bank baru
userBankController.addUserBank = async (req, res) => {
  try {
    const { userId, namebank, norek, deskripsi } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan.",
      });
    }

    const existingBank = await UserBank.findOne({ norek });
    if (existingBank) {
      return res.status(400).json({
        success: false,
        message: "Nomor rekening sudah terdaftar.",
      });
    }

    const userBank = new UserBank({ user: userId, namebank, norek, deskripsi });
    await userBank.save();

    res.status(201).json({
      success: true,
      message: "Rekening bank berhasil ditambahkan.",
      data: userBank,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan rekening bank.",
      error: error.message,
    });
  }
};

// Mendapatkan semua rekening bank berdasarkan userId
userBankController.getsUserBanks = async (req, res) => {
  try {
    const { userId } = req.params;

    const userBanks = await UserBank.find({ user: userId }).populate("user", "name email");

    if (userBanks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tidak ada rekening bank untuk pengguna ini.",
      });
    }

    res.status(200).json({
      success: true,
      data: userBanks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mendapatkan rekening bank.",
      error: error.message,
    });
  }
};

// Menghapus rekening bank berdasarkan ID
userBankController.deleteUserBank = async (req, res) => {
  try {
    const { userBankId } = req.params;

    const userBank = await UserBank.findByIdAndDelete(userBankId);

    if (!userBank) {
      return res.status(404).json({
        success: false,
        message: "Rekening bank tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rekening bank berhasil dihapus.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus rekening bank.",
      error: error.message,
    });
  }
};

// Memperbarui rekening bank berdasarkan ID
userBankController.updateUserBank = async (req, res) => {
  try {
    const { userBankId } = req.params;
    const { namebank, norek, deskripsi } = req.body;

    const updatedUserBank = await UserBank.findByIdAndUpdate(
      userBankId,
      { namebank, norek, deskripsi },
      { new: true, runValidators: true }
    );

    if (!updatedUserBank) {
      return res.status(404).json({ success: false, message: "Rekening bank tidak ditemukan." });
    }

    res.status(200).json({
      success: true,
      message: "Rekening bank berhasil diperbarui.",
      data: updatedUserBank,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui rekening bank.",
      error: error.message,
    });
  }
};

module.exports = userBankController;
