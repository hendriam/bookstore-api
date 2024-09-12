const express = require('express');
const addressController = require('../controllers/addressController');

const authentication = require('../middlewares/authMiddleware');
const { validateCreateAddress } = require('../validations/validateAddress');

const router = express.Router();
router.use(authentication);

router.get('/api/address', addressController.getAll);
router.get('/api/address/:id', addressController.getById);
router.post('/api/address', validateCreateAddress, addressController.create);
router.put('/api/address/:id', validateCreateAddress, addressController.updateById);
router.delete('/api/address/:id', addressController.deleteById);

module.exports = router;
