const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const userRoutes = express.Router();

userRoutes.get("/", verifyToken, userController.getAllUsers);
userRoutes.get("/:id", verifyToken, userController.getUserById);
userRoutes.put("/:id", verifyToken, userController.updateUser);
userRoutes.delete("/:id", verifyToken, userController.deleteUser);

module.exports = userRoutes;
