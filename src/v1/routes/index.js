const express = require('express');
const router = express.Router();

const addressRouter = require('./addressRoutes');
const categoryRouter = require('./categoryRoutes');
const productRouter = require('./productRoutes');
const tagRouter = require('./tagRoutes');
const userRouter = require('./userRoutes');
const cartRouter = require('./cartRoutes');

router.use('/address', addressRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/tags', tagRouter);
router.use('/user', userRouter);
router.use('/cart', cartRouter);

module.exports = router;