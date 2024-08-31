const express = require('express');
const productController = require('../controllers/productController');
const authentication = require('../middlewares/authMiddleware');
const { validateCreateProduct } = require('../validations/validateProduct');
const uploadImage = require('../utils/upload-image');

const router = express.Router();
router.use(authentication);

router.get('/api/products', productController.getAll);
router.get('/api/products/:id', productController.getById);
router.post('/api/products', uploadImage.single('image'), productController.create);
router.put('/api/products/:id', uploadImage.single('image'), productController.updateById);
router.delete('/api/products/:id', productController.deleteById);

module.exports = router;
