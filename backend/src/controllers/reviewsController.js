const Review = require('../models/Reviews');

const reviewsController = {};

reviewsController.getAllReviews = async (req, res) => {
    const { productId } = req.query;

    try {
        let reviews;
        if (productId) {
            reviews = await Review.find({ product: productId})
            .populate('user')
            .populate('product');
        } else {
            reviews = await Review.find()
            .populate('user')
            .populate('product');
        }

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

reviewsController.createReview = async (req, res) => {
    const { product, rating, reviewText } = req.body;

    if (!product || !rating || !reviewText) {
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
            product,
            rating,
            reviewText,
            user: req.user
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