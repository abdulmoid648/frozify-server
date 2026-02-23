const express = require('express');
const router = express.Router();
const { createPaymentIntent, sendStripeKey } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-intent', protect, createPaymentIntent);
router.get('/stripekey', protect, sendStripeKey);

module.exports = router;
