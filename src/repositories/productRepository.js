const Product = require('../models/Product');
const Category = require('../models/Category');

const findAll = async () => {
    return await Product.find().populate('category', 'name').populate('tags', 'name');
};

const findById = async (id) => {
    return await Product.findById(id);
};

const create = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

const updateById = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true,
    });
};

const deleteById = async (id) => {
    return await Product.findByIdAndDelete(id);
};

const findByName = async (name) => {
    return await Product.findOne({ name });
};

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    findByName,
};
