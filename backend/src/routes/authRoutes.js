const express = require("express");
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

const authRoutes = express.Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/profile", verifyToken, authController.getProfile);

module.exports = authRoutes;