const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.authenticate, reviewController.createReview);
router.get('/product/:productId', reviewController.getReviewsByProductId);
router.put('/:id', authMiddleware.authenticate, reviewController.updateReview);
router.delete('/:id', authMiddleware.authenticate, reviewController.deleteReview);

module.exports = router;