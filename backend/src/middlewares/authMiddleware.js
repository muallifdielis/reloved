// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware untuk melindungi rute dengan autentikasi
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Ambil token dari header
      token = req.headers.authorization.split(' ')[1];

      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ambil data pengguna berdasarkan ID
      req.user = await User.findById(decoded.id);

      // Lanjutkan ke rute berikutnya
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};

// Middleware untuk memeriksa apakah pengguna adalah admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied, admin only' });
  }
};

module.exports = { protect, isAdmin };
