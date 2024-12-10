const Review = require("../models/Reviews");

const reviewController = {};

reviewController.getAllReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ product: id })
      .populate("product user")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil ulasan",
      error: error.message,
    });
  }
};

reviewController.createReview = async (req, res) => {
  const { product, user, comment, rating } = req.body;

  if (!product || !user || !comment || rating === undefined) {
    return res.status(400).json({
      success: false,
      message: "Semua field (product, user, comment, rating) harus diisi",
    });
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating harus berupa angka antara 1 dan 5",
    });
  }

  const existingReview = await Review.findOne({
    product,
    user,
  });
  if (existingReview) {
    return res.status(400).json({
      success: false,
      message: "Anda sudah memberikan ulasan untuk produk ini",
    });
  }

  try {
    const newReview = new Review({
      product,
      user,
      comment,
      rating,
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Ulasan berhasil dibuat",
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membuat ulasan",
      error: error.message,
    });
  }
};

reviewController.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Ulasan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ulasan berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus ulasan",
      error: error.message,
    });
  }
};

module.exports = reviewController;
