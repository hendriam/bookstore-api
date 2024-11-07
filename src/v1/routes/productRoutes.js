const express = require('express');
const productController = require('../controllers/productController');
const authentication = require('../../middlewares/authMiddleware');
const { validateCreateProduct } = require('../../validations/validateProduct');
const uploadImage = require('../../utils/upload-image');
const authorize = require('../../middlewares/authorization-middleware');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', authentication, authorize('manage', 'Product'), uploadImage.single('image'), validateCreateProduct, productController.create);
router.put('/:id', authentication, authorize('manage', 'Product'), uploadImage.single('image'), validateCreateProduct, productController.updateById);
router.delete('/:id', authentication, authorize('manage', 'Product'), productController.deleteById);

module.exports = router;
