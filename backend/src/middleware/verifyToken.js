const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const { jwtSecret } = require("../config/env");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Akses ditolak. Token tidak ditemukan." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(400).json({ message: "Token tidak valid." });
  }
};

// Middleware untuk memeriksa apakah pengguna adalah admin
const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (user && user.role === "admin") {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Akses ditolak, Anda bukan admin",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      error: error.message,
    });
  }
};

module.exports = { verifyToken, isAdmin };
