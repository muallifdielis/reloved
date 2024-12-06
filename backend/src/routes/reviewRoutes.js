const express = require("express");
const reviewController = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/verifyToken");

const reviewRoutes = express.Router();

reviewRoutes.get("/", reviewController.getAllReviews);
reviewRoutes.get("/:id", reviewController.getReviewById);
reviewRoutes.post("/", verifyToken, reviewController.createReview);
reviewRoutes.put("/:id", verifyToken, reviewController.updateReview);
reviewRoutes.delete("/:id", verifyToken, reviewController.deleteReview);

module.exports = reviewRoutes;