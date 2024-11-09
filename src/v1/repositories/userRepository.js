const User = require('../models/User');

const create = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

const findById = async (id) => {
    return await User.findById(id);
};

module.exports = { create, findByEmail, findById };
