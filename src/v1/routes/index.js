const express = require('express');
const router = express.Router();

const addressRouter = require('./addressRoutes');
const categoryRouter = require('./categoryRoutes');
const productRouter = require('./productRoutes');
const tagRouter = require('./tagRoutes');
const userRouter = require('./userRoutes');
const cartRouter = require('./cartRoutes');
const orderRouter = require('./orderRoutes');

router.use('/address', addressRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/tags', tagRouter);
router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);

module.exports = router;
