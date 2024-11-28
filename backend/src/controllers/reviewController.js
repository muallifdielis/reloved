const Review = require('../models/reviewModel');

const reviewController = {};

reviewController.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({
            success: true,
            message: "Ulasan berhasil diambil",
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

reviewController.addReview = async (req, res) => {
    const { productId, rating, reviewText } = req.body;

    if (!productId || !rating || !reviewText) {
        return res.status(400).json({
            success: false,
            message: "Semua field harus diisi",
        });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            success: false,
            message: "Rating harus antara 1 dan 5",
        });
    }

    try {
        const newReview = await Review.create({
            productId,
            rating,
            reviewText,
        });

        res.status(201).json({
            success: true,
            message: "Ulasan berhasil ditambahkan",
            data: newReview,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat menambahkan ulasan",
            error: error.message,
        });
    }
};

reviewController.updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, reviewText } = req.body;

    try {
        const review = await Review.findById(id); // Temukan ulasan berdasarkan ID

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Ulasan tidak ditemukan",
            });
        }

        if (rating) {
            if (rating < 1 || rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: "Rating harus antara 1 dan 5",
                });
            }
            review.rating = rating;
        }

        if (reviewText) {
            review.reviewText = reviewText;
        }

        await review.save();

        res.status(200).json({
            success: true,
            message: "Ulasan berhasil diperbarui",
            data: review,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat memperbarui ulasan",
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