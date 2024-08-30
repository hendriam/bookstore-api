const User = require("../models/User");

const create = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

module.exports = { create, findByEmail };
