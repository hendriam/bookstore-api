const express = require('express');
const categoryController = require('../controllers/categoryController');

const authentication = require('../middlewares/authMiddleware');
const { validateCreate } = require('../validations/validateCategory');
const authorize = require('../middlewares/authorization-middleware');

const router = express.Router();
router.use(authentication);

router.get('/api/categories', authorize('read', 'Category'), categoryController.getAll);
router.get('/api/categories/:id', authorize('read', 'Category'), categoryController.getById);
router.post('/api/categories', authorize('manage', 'Category'), validateCreate, categoryController.create);
router.put('/api/categories/:id', authorize('manage', 'Category'), validateCreate, categoryController.updateById);
router.delete('/api/categories/:id', authorize('manage', 'Category'), categoryController.deleteById);

module.exports = router;
