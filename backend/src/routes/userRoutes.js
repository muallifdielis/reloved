const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middleware/verifyToken");
const { uploadSingle } = require("../middleware/uploadImage");

const userRoutes = express.Router();

userRoutes.get("/", verifyToken, isAdmin, userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", verifyToken, uploadSingle, userController.updateUser);
userRoutes.delete("/me", verifyToken, userController.deleteSelfAccount);
userRoutes.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = userRoutes;
