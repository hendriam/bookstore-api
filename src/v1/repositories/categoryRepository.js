const Category = require('../models/Category');

const findAll = async () => {
    return await Category.find();
};

const findById = async (id) => {
    return await Category.findById(id);
};

const create = async (categoryData) => {
    const category = new Category(categoryData);
    return await category.save();
};

const updateById = async (id, categoryData) => {
    return await Category.findByIdAndUpdate(id, categoryData, {
        new: true,
        runValidators: true,
    });
};

const deleteById = async (id) => {
    return await Category.findByIdAndDelete(id);
};

const findByName = async (name) => {
    return await Category.findOne({ name });
};

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    findByName,
};
