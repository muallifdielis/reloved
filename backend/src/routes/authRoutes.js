const express = require("express");
const authController = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middleware/verifyToken");

// const authRoutes = express.Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/verify-email/:token", authController.verifyEmail);
authRoutes.post("/resend-verify-email", authController.resendVerifyEmail);
authRoutes.post("/forgot-password", authController.forgotPassword);
authRoutes.post("/reset-password/:token", authController.resetPassword);
authRoutes.put("/change-password", verifyToken, authController.changePassword);

module.exports = authRoutes;
