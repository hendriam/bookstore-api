const userService = require('../services/userService');

const register = async (req, res, next) => {
    try {
        await userService.register(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const token = await userService.getToken(req.body);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

const profile = async (req, res, next) => {
    try {
        const profile = await userService.getProfile(req.user.id);
        res.status(200).json({ profile });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, profile };
