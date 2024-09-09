const Product = require('../models/Product');
const Category = require('../models/Category');

const findAll = async (page, limit, skip, sortBy, order, filter) => {
    const products = await Product.find(filter)
        .populate('category')
        .populate('tags')
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit);

    // Calculate total products (for total pages)
    const total = await Product.countDocuments(filter);

    // Returning data with pagination information
    return {
        products,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
    };
};

const findById = async (id) => {
    return await Product.findById(id).populate('category', 'name').populate('tags', 'name');
};

const create = async (productData) => {
    const product = new Product(productData);
    const saved = await product.save();
    return await Product.findById(saved._id).populate('category', 'name').populate('tags', 'name');
};

const updateById = async (id, productData) => {
    const updated = await Product.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true,
    });
    return await Product.findById(updated._id).populate('category', 'name').populate('tags', 'name');
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
