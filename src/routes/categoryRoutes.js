const express = require('express');
const categoryController = require('../controllers/categoryController');

const authentication = require('../middlewares/authMiddleware');
const { validateCreate } = require('../validations/validateCategory');

const router = express.Router();
router.use(authentication);

router.get('/api/categories', categoryController.getAll);
router.get('/api/categories/:id', categoryController.getById);
router.post('/api/categories', validateCreate, categoryController.create);
router.put('/api/categories/:id', validateCreate, categoryController.updateById);
router.delete('/api/categories/:id', categoryController.deleteById);

module.exports = router;
