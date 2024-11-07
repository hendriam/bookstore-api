const express = require('express');
const categoryController = require('../controllers/categoryController');

const authentication = require('../../middlewares/authMiddleware');
const { validateCreate } = require('../../validations/validateCategory');
const authorize = require('../../middlewares/authorization-middleware');

const router = express.Router();

router.get('/', categoryController.getAll);
router.get('/:id', authentication, authorize('read', 'Category'), categoryController.getById);
router.post('/', authentication, authorize('manage', 'Category'), validateCreate, categoryController.create);
router.put('/:id', authentication, authorize('manage', 'Category'), validateCreate, categoryController.updateById);
router.delete('/:id', authentication, authorize('manage', 'Category'), categoryController.deleteById);

module.exports = router;
