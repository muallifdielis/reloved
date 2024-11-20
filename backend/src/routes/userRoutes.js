const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/me', authMiddleware.authenticate, userController.getUserProfile);
router.put('/me', authMiddleware.authenticate, userController.updateUserProfile);
router.delete('/me', authMiddleware.authenticate, userController.deleteUserAccount);

module.exports = router;