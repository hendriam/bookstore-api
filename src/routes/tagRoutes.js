const express = require('express');
const tagController = require('../controllers/tagController');

const authentication = require('../middlewares/authMiddleware');
const { validateCreate } = require('../validations/validateTag');

const router = express.Router();
router.use(authentication);

router.get('/api/tags', tagController.getAll);
router.get('/api/tags/:id', tagController.getById);
router.post('/api/tags', validateCreate, tagController.create);
router.put('/api/tags/:id', validateCreate, tagController.updateById);
router.delete('/api/tags/:id', tagController.deleteById);

module.exports = router;
