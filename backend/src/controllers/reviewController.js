const Review = require('../models/Reviews');
const { verifyToken } = require("../middleware/verifyToken");

const reviewController = {};

reviewController.getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find().populate('product user');
      res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil ulasan',
        error: error.message,
      });
    }
  };
  
  reviewController.createReview = async (req, res) => {
    const { product, user, comment, rating } = req.body;
  
    if (!product || !user || !comment || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Semua field (product, user, comment, rating) harus diisi',
      });
    }
  
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating harus berupa angka antara 1 dan 5',
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
        message: 'Ulasan berhasil dibuat',
        data: newReview,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat membuat ulasan',
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
        message: 'Ulasan tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Ulasan berhasil dihapus',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus ulasan',
      error: error.message,
    });
  }
}; 

module.exports = reviewController;