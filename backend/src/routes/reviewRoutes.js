const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const verifyToken = require("../middleware/verifyToken");

const reviewRoutes = express.Router();

reviewRoutes.get("/", reviewsController.getAllReviews);
reviewRoutes.post("/", verifyToken, reviewsController.createReview);
reviewRoutes.delete("/:id", verifyToken, reviewsController.deleteReview);

module.exports = reviewRoutes;
