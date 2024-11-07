const express = require('express');
const tagController = require('../controllers/tagController');

const authentication = require('../../middlewares/authMiddleware');
const { validateCreate } = require('../../validations/validateTag');
const authorize = require('../../middlewares/authorization-middleware');

const router = express.Router();

router.get('/', tagController.getAll);
router.get('/:id', authentication, authorize('read', 'Tags'), tagController.getById);
router.post('/', authentication, authorize('manage', 'Tags'), validateCreate, tagController.create);
router.put('/:id', authentication, authorize('manage', 'Tags'), validateCreate, tagController.updateById);
router.delete('/:id', authentication, authorize('manage', 'Tags'), tagController.deleteById);

module.exports = router;
