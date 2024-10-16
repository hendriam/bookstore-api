const express = require('express');
const cartController = require('../controllers/cartController');

const authentication = require('../../middlewares/authMiddleware');
const authorize = require('../../middlewares/authorization-middleware');

const router = express.Router();
router.use(authentication);

router.get('/', authorize('read', 'Cart'), cartController.getCart);
router.post('/', authorize('create', 'Cart'), cartController.addToCart);
router.delete('/:itemId', authorize('delete', 'Cart'), cartController.removeProductFromCart);
router.delete('/', authorize('delete', 'Cart'), cartController.clearCart);

module.exports = router;
