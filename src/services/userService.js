const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/jwt');
const ResponseError = require('../utils/response-error');
const bcrypt = require('bcrypt');

const register = async (userData) => {
    const existingEmail = await userRepository.findByEmail(userData.email);
    if (existingEmail) {
        throw new ResponseError('Email is already exists, please use a different email', 400);
    }

    return await userRepository.create(userData);
};

const getToken = async (userData) => {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (!existingUser) {
        throw new ResponseError('User not found', 404);
    }

    const isPasswordMatch = await bcrypt.compare(userData.password, existingUser.password);

    if (!isPasswordMatch) {
        throw new ResponseError('Invalid credentials', 401);
    }

    const token = generateToken({
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    });

    return token;
};

module.exports = { register, getToken };
