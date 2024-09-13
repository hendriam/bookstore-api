const express = require('express');
const tagController = require('../controllers/tagController');

const authentication = require('../middlewares/authMiddleware');
const { validateCreate } = require('../validations/validateTag');
const authorize = require('../middlewares/authorization-middleware');

const router = express.Router();
router.use(authentication);

router.get('/api/tags', authorize('read', 'Tags'), tagController.getAll);
router.get('/api/tags/:id', authorize('read', 'Tags'), tagController.getById);
router.post('/api/tags', authorize('manage', 'Tags'), validateCreate, tagController.create);
router.put('/api/tags/:id', authorize('manage', 'Tags'), validateCreate, tagController.updateById);
router.delete('/api/tags/:id', authorize('manage', 'Tags'), tagController.deleteById);

module.exports = router;
