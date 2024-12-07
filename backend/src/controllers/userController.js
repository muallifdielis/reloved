const User = require("../models/Users");
const cloudinary = require("cloudinary").v2;

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({
        success: true,
        message: "Data pengguna berhasil diambil",
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
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }
      return res.status(200).json({
        success: true,
        message: "Pengguna berhasil diambil",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, bio, phone, address } = req.body;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      user.image = newImage || user.image;

      if (req.file) {
        // Hapus gambar lama jika ada
        if (user.image) {
          const publicId = user.image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`reloved/${publicId}`);
        }
        user.image = req.file.path;
      }

      await user.save();
      return res.status(200).json({
        success: true,
        message: "Pengguna berhasil diperbarui",
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
          .json({ success: false, message: "ID pengguna wajib diisi" });
      }

      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
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
          .json({ success: false, message: "Pengguna tidak ditemukan" });
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
