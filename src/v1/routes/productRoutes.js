const express = require('express');
const productController = require('../controllers/productController');
const authentication = require('../../middlewares/authMiddleware');
const { validateCreateProduct } = require('../../validations/validateProduct');
const uploadImage = require('../../utils/upload-image');
const authorize = require('../../middlewares/authorization-middleware');

const router = express.Router();
router.use(authentication);

router.get('/', authorize('read', 'Product'), productController.getAll);
router.get('/:id', authorize('read', 'Product'), productController.getById);
router.post('/', authorize('manage', 'Product'), uploadImage.single('image'), validateCreateProduct, productController.create);
router.put('/:id', authorize('manage', 'Product'), uploadImage.single('image'), validateCreateProduct, productController.updateById);
router.delete('/:id', authorize('manage', 'Product'), productController.deleteById);

module.exports = router;
