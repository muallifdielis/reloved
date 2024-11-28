// Memastikan pengguna telah login dengan token yang valid.

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Mengambil token dari header Authorization

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
        req.user = decoded; // Tambahkan data pengguna ke request
        next(); // Lanjutkan ke handler berikutnya
    } catch (error) {
        return res.status(401).json({ message: 'Token tidak valid.' });
    }
};

module.exports = authMiddleware;
