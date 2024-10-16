const express = require('express');
const categoryController = require('../controllers/categoryController');

const authentication = require('../../middlewares/authMiddleware');
const { validateCreate } = require('../../validations/validateCategory');
const authorize = require('../../middlewares/authorization-middleware');

const router = express.Router();
router.use(authentication);

router.get('/', authorize('read', 'Category'), categoryController.getAll);
router.get('/:id', authorize('read', 'Category'), categoryController.getById);
router.post('/', authorize('manage', 'Category'), validateCreate, categoryController.create);
router.put('/:id', authorize('manage', 'Category'), validateCreate, categoryController.updateById);
router.delete('/:id', authorize('manage', 'Category'), categoryController.deleteById);

module.exports = router;
