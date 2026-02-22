const express = require('express');
const {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.get('/', protect, authorize('admin'), getOrders);

module.exports = router;
