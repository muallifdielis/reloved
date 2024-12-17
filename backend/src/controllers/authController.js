const User = require("../models/Users");
const Orders = require("../models/Orders");
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
  register: async (req, res) => {
    try {
      const { name, username, email, phone, password, role } = req.body;

      if (!name || !username || !email || !phone || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Semua field wajib diisi" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email sudah terdaftar" });
      }

      const user = await User.create({
        name,
        username,
        email,
        phone,
        password,
        role,
      });

      const token = generateToken({ id: user._id, email: user.email }, "15m");
      const verifyLink = `${clientUrl}/verify-email/${token}`;

      const templatePath = "src/utils/emails/verification.html";

      let emailTemplate = fs.readFileSync(templatePath, "utf8");

      // Gantikan placeholder dengan data dinamis
      emailTemplate = emailTemplate
        .replace("{{name}}", name)
        .replace("{{verificationLink}}", verifyLink);

      sendEmail(user.email, "Verifikasi Email Anda", emailTemplate);

      return res.status(201).json({
        success: true,
        message: "Pengguna berhasil dibuat",
        data: {
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            isVerified: user.isVerified,
          },
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, jwtSecret);

      const user = await User.findOne({ email: decoded.id.email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      user.isVerified = true;
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Email berhasil diverifikasi" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  resendVerifyEmail: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      if (user.isVerified) {
        return res
          .status(400)
          .json({ success: false, message: "Email sudah diverifikasi" });
      }

      const token = generateToken({ id: user._id, email: user.email }, "15m");
      const verifyLink = `${clientUrl}/verify-email/${token}`;

      const templatePath = "src/utils/emails/verification.html";

      let emailTemplate = fs.readFileSync(templatePath, "utf8");

      // Gantikan placeholder dengan data dinamis
      emailTemplate = emailTemplate
        .replace("{{name}}", user.name)
        .replace("{{verificationLink}}", verifyLink);

      sendEmail(user.email, "Verifikasi Email Anda", emailTemplate);

      return res.status(200).json({
        success: true,
        message: "Email verifikasi berhasil dikirim",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Semua field wajib diisi" });
      }

      const user = await User.findOne({ email });
      if (!user || user.isActive) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ success: false, message: "Kata sandi salah" });
      }

      const token = generateToken(user._id, "1d");

      return res.status(200).json({
        success: true,
        message: "Berhasil masuk",
        data: {
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            isVerified: user.isVerified,
            role: user.role,
          },
          token,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res
          .status(400)
          .json({ success: false, message: "Email wajib diisi" });
      }

      const user = await User.findOne({ email });
      if (!user || user.isActive) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      const token = generateToken({ id: user._id, email: user.email }, "15m");

      const templatePath = "src/utils/emails/forgotPassword.html";

      let emailTemplate = fs.readFileSync(templatePath, "utf8");

      // Gantikan placeholder dengan data dinamis
      emailTemplate = emailTemplate
        .replace("{{name}}", user?.name)
        .replace(/{{resetLink}}/g, `${clientUrl}/reset-password/${token}`);

      sendEmail(user.email, "Atur Ulang Kata Sandi Anda", emailTemplate);

      return res
        .status(200)
        .json({ success: true, message: "Email berhasil dikirim" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      if (!token || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Semua field wajib diisi" });
      }

      const decoded = jwt.verify(token, jwtSecret);

      const user = await User.findOne({ email: decoded.id.email });
      if (!user || user.isActive) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      user.password = password;
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Kata sandi berhasil diatur ulang" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Semua field wajib diisi" });
      }

      const user = await User.findById(req.user.id);

      if (!user || user.isActive) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      const isPasswordCorrect = await user.comparePassword(currentPassword);
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ success: false, message: "Kata sandi saat ini salah" });
      }

      user.password = newPassword;
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Kata sandi berhasil diubah" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteAccount: async (req, res) => {
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
      if (!user || user.isActive) {
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

  changeRole: async (req, res) => {
    try {
      const { userId, role } = req.body;

      if (!userId || !role) {
        return res.status(400).json({
          success: false,
          message: "ID pengguna dan role wajib diisi",
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Pengguna tidak ditemukan" });
      }

      const order = await Orders.findOne({ user: userId, status: "proses" });
      if (order) {
        return res.status(400).json({
          success: false,
          message: "Pengguna memiliki pesanan, tidak dapat mengubah role",
        });
      }

      if (!["user", "admin"].includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Role tidak valid, role harus 'user' atau 'admin'",
        });
      }

      if (user.role === role) {
        return res.status(400).json({
          success: false,
          message: "Pengguna sudah memiliki role tersebut",
        });
      }

      user.role = role;
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Role berhasil diubah", data: user });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = userController;
