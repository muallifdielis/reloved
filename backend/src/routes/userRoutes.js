const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// Mendapatkan semua pengguna (Admin-only)
router.get('/', protect, isAdmin, userController.getAllUsers);

// Mendapatkan pengguna berdasarkan ID
router.get('/:id', protect, userController.getUserById);

// Memperbarui profil pengguna
router.put('/profile', protect, userController.updateProfile);

// Menghapus pengguna (Admin-only)
router.delete('/:id', protect, isAdmin, userController.deleteUser);

module.exports = router;
