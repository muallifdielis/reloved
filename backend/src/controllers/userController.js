const User = require("../models/Users");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");
const {
  jwtSecret,
  senderEmail,
  emailPassword,
  clientUrl,
} = require("../config/env");

const generateToken = (id, expiresIn) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: expiresIn,
  });
};

const sendEmail = async (email, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: email,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email Berhasil Dikirim");
  } catch (error) {
    console.error("Terjadi kesalahan saat mengirim email:", error);
  }
};

const userController = {
  getAllUsers: async (req, res) => {
    try {
      // const { includeDeleted } = req.query;
      // const filter =
      //   includeDeleted === "true" ? {} : { isActive: { $ne: true } };
      const users = await User.find().sort({ createdAt: -1 });
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
      if (!user || user.isActive) {
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
    const { name, bio, phone, address, image } = req.body;

    try {
      const user = await User.findById(id);

      if (!user || user.isActive) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.phone = phone || user.phone;
      user.address = address || user.address;

      if (image === "") {
        if (user.image) {
          const publicId = user.image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`reloved/${publicId}`);
        }
        user.image = "";
      } else if (req.file) {
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

  // Khusus admin
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "ID pengguna wajib diisi" });
      }

      const user = await User.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      await User.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "Pengguna berhasil dihapus secara permanen",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // khusus admin
  softDeleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "ID pengguna wajib diisi" });
      }

      const user = await User.findById(id);
      if (!user || user.isActive) {
        return res.status(404).json({
          success: false,
          message: "Pengguna tidak ditemukan atau sudah dihapus",
        });
      }

      user.isActive = true;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Akun telah dinonaktifkan",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Khusus pengguna
  deleteSelfAccount: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      await User.findByIdAndDelete(req.user.id);
      return res.status(200).json({
        success: true,
        message: "Akun berhasil dihapus secara permanen",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // khusus pengguna
  softDeleteSelfAccount: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user || user.isActive) {
        return res.status(404).json({
          success: false,
          message: "Pengguna tidak ditemukan atau sudah dihapus",
        });
      }

      user.isActive = true;
      await user.save();

      const token = generateToken(user._id, "1d");
      const restoreLink = `${clientUrl}/restore-account/${token}/restore`;

      const templatePath = "src/utils/emails/restoreAccount.html";

      let emailTemplate = fs.readFileSync(templatePath, "utf8");

      emailTemplate = emailTemplate
        .replace("{{name}}", user?.name)
        .replace(/{{restoreLink}}/g, restoreLink);
      sendEmail(user.email, "Pengguna telah dinonaktifkan", emailTemplate);

      return res.status(200).json({
        success: true,
        message: "Akun telah dinonaktifkan",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Kembalikan akun khusus admin
  restoreSoftDeletedUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      user.isActive = false;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Pengguna berhasil dikembalikan",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Kembalikan akun khusus pengguna
  restoreSelfAccount: async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, jwtSecret);

      const id = decoded.id;
      const user = await User.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      user.isActive = false;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Pengguna berhasil dikembalikan",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = userController;
