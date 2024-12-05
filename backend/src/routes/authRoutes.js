const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');


// Rute untuk registrasi pengguna baru
router.post('/register', authController.register);

// Rute untuk login pengguna
router.post('/login', authController.login);


module.exports = router;
