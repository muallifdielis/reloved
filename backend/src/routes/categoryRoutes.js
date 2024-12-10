const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/verifyToken");
const categoryController = require("../controllers/categoryController");

const categoryRoutes = express.Router();

categoryRoutes.get("/", categoryController.getAllCategories);
categoryRoutes.get(
  "/:id",
  verifyToken,
  isAdmin,
  categoryController.getCategoryById
);
categoryRoutes.post(
  "/",
  verifyToken,
  isAdmin,
  categoryController.createCategory
);
categoryRoutes.delete(
  "/:id",
  verifyToken,
  isAdmin,
  categoryController.deleteCategory
);
categoryRoutes.put(
  "/:id",
  verifyToken,
  isAdmin,
  categoryController.updateCategory
);

module.exports = categoryRoutes;
