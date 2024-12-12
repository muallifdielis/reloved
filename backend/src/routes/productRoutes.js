const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const productsController = require("../controllers/productsController");
const { uploadMultiple } = require("../middleware/uploadImage");

const productRoutes = express.Router();

productRoutes.get("/", productsController.getAllProducts);
productRoutes.get("/search", productsController.searchProducts);
productRoutes.get("/:id", productsController.getProductById);
productRoutes.post(
  "/",
  verifyToken,
  (req, res, next) => {
    uploadMultiple(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Format file tidak sesuai",
          error: err,
        });
      }
      next();
    });
  },
  productsController.createProducts
);
productRoutes.put(
  "/:id",
  verifyToken,
  uploadMultiple,
  productsController.updateProduct
);
productRoutes.delete("/:id", verifyToken, productsController.deleteProduct);
productRoutes.get("/seller/:sellerId", productsController.getProductBySeller);
productRoutes.post("/search", productsController.searchProducts);
productRoutes.post(
  "/like/:id",
  verifyToken,
  productsController.likeUnlikeProduct
);

productRoutes.get("/liked/:id", productsController.getLikedProducts);

module.exports = productRoutes;
