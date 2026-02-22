const express = require('express');
const router = express.Router();
const { processPayment, sendStripeKey } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/process', protect, processPayment);
router.get('/stripekey', protect, sendStripeKey);

module.exports = router;
