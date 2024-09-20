const express = require('express');
const addressController = require('../controllers/addressController');

const authentication = require('../../middlewares/authMiddleware');
const { validateCreateAddress } = require('../../validations/validateAddress');
const authorize = require('../../middlewares/authorization-middleware');

const router = express.Router();
router.use(authentication);

router.get('/', authorize('manage', 'Address'), addressController.getAll);
router.get('/:userId', authorize('read', 'Address'), addressController.getAllByUser);
router.get('/:id', authorize('read', 'Address'), addressController.getById);
router.post('/', authorize('create', 'Address'), validateCreateAddress, addressController.create);
router.put('/:id', authorize('update', 'Address'), validateCreateAddress, addressController.updateById);
router.delete('/:id', authorize('delete', 'Address'), addressController.deleteById);

module.exports = router;
