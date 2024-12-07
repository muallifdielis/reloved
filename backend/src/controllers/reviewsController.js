const Reviews = require('../models/Reviews');

const reviewsController = {};

reviewsController.getAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find()
            .populate('userId')
            .populate('productId');
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

reviewsController.addReview = async (req, res) => {
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
        const newReview = await Reviews.create({
            productId,
            rating,
            reviewText,
            userId: req.user.id
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

reviewsController.deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Reviews.findByIdAndDelete(id); 

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

module.exports = reviewsController;