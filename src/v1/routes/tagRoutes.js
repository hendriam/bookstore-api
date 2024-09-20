const express = require('express');
const tagController = require('../controllers/tagController');

const authentication = require('../../middlewares/authMiddleware');
const { validateCreate } = require('../../validations/validateTag');
const authorize = require('../../middlewares/authorization-middleware');

const router = express.Router();
router.use(authentication);

router.get('/', authorize('read', 'Tags'), tagController.getAll);
router.get('/:id', authorize('read', 'Tags'), tagController.getById);
router.post('/', authorize('manage', 'Tags'), validateCreate, tagController.create);
router.put('/:id', authorize('manage', 'Tags'), validateCreate, tagController.updateById);
router.delete('/:id', authorize('manage', 'Tags'), tagController.deleteById);

module.exports = router;
