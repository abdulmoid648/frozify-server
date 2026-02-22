const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe payment intent
// @route   POST /api/payment/process
// @access  Private
exports.processPayment = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, error: 'Invalid amount' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects amount in cents/paisa
            currency: 'pkr',
            metadata: { integration_check: 'accept_a_payment' },
        });

        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Send Stripe publishable key to frontend
// @route   GET /api/payment/stripekey
// @access  Private
exports.sendStripeKey = async (req, res) => {
    res.status(200).json({
        success: true,
        stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
};
