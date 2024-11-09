const express = require('express');
const userController = require('../controllers/userController');
const { validateRegistration, validateLogin } = require('../../validations/validateUser');
const authenticateUser = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', validateRegistration, userController.register);
router.post('/login', validateLogin, userController.login);

// Route yang memerlukan autentikasi
router.get('/profile', authenticateUser, userController.profile);

module.exports = router;
