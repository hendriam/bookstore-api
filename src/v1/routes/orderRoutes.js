const express = require('express');
const orderController = require('../controllers/orderController');

const authentication = require('../../middlewares/authMiddleware');
const authorize = require('../../middlewares/authorization-middleware');

const router = express.Router();
router.use(authentication);

router.post('/', authorize('create', 'Order'), orderController.order);
router.get('/', authorize('manage', 'Order'), orderController.getAllOrders);
router.get('/:id', authorize('read', 'Order'), orderController.getOrderById);
router.get('/user', authorize('read', 'Order'), orderController.getOrdersByUserId);
router.put('/:id', authorize('manage', 'Order'), orderController.updateStatus);

module.exports = router;
