const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/verifyToken");
const categoryController = require("../controllers/categoryController");

const categoryRoutes = express.Router(); 

categoryRoutes.get("/", categoryController.getAllCategories);
categoryRoutes.get("/:id", verifyToken, categoryController.getCategoryById);
categoryRoutes.post("/", verifyToken, categoryController.createCategory);
categoryRoutes.delete("/id", verifyToken, categoryController.deleteCategory);
categoryRoutes.put("/:id", verifyToken, categoryController.updateCategory);

module.exports = categoryRoutes;