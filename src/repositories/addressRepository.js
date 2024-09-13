const Address = require('../models/Address');

const findAll = async (filter) => {
    return await Address.find(filter).populate('user', 'fullname');
};

const findAllByUser = async (userId) => {
    return await Address.find({ user: userId }).populate('user', 'fullname');
};

const findById = async (id) => {
    return await Address.findById(id).populate('user', 'fullname');
};

const findByIdNoPopolate = async (id) => {
    return await Address.findById(id);
};

const create = async (addressData) => {
    const address = new Address(addressData);
    const saved = await address.save();
    return await Address.findById(saved._id).populate('user', 'fullname');
};

const updateById = async (id, addressData) => {
    const updated = await Address.findByIdAndUpdate(id, addressData, {
        new: true,
        runValidators: true,
    });
    return await Address.findById(updated._id).populate('user', 'fullname');
};

const deleteById = async (id) => {
    return await Address.findByIdAndDelete(id);
};

const findDefaultAddresByUser = async (user) => {
    return await Address.find({ user, isDefault: true });
};

module.exports = {
    findAll,
    findAllByUser,
    findById,
    findByIdNoPopolate,
    create,
    updateById,
    deleteById,
    findDefaultAddresByUser,
};
