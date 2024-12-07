const User = require("../models/Users");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ role: "user" });
      return res.status(200).json({
        success: true,
        message: "Data user berhasil diambil",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id).populate("likedProducts");
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User tidak ditemukan" });
      }
      return res.status(200).json({
        success: true,
        message: "User berhasil diambil",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, bio, phone, address } = req.body;
    const newImage = req.file ? req.file.filename : null;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User tidak ditemukan" });
      }

      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      user.image = newImage || user.image;

      await user.save();
      return res.status(200).json({
        success: true,
        message: "User berhasil diperbarui",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Khusus Admin
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "User ID wajib diisi" });
      }

      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User tidak ditemukan" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Akun berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Khusus User
  deleteSelfAccount: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User tidak ditemukan" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Akun berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = userController;
