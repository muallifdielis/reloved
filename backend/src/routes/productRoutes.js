const express = require("express");
const productController = require("../controllers/productController");
const verifyToken = require("../middleware/verifyToken");

const productRoutes = express.Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post("/", verifyToken, productController.createProduct);
productRoutes.put("/:id", verifyToken, productController.updateProduct);
productRoutes.delete("/:id", verifyToken, productController.deleteProduct);

module.exports = productRoutes;