const productRepository = require('../repositories/productRepository');
const categoryRepository = require('../repositories/categoryRepository');
const tagRepository = require('../../repositories/tagRepository');
const ResponseError = require('../../utils/response-error');

const getAll = async () => {
    return await productRepository.findAll();
};

const checkById = async (id) => {
    const product = await productRepository.findById(id);
    if (!product) {
        throw new ResponseError('Product not found', 404);
    }

    return product;
};

const checkIfCategoryExists = async (productData) => {
    const categoryExists = await categoryRepository.findById(productData.category);
    if (!categoryExists) {
        throw new ResponseError('Category not found', 404);
    }
};

const checkIfAllTagsExists = async (productData) => {
    if (productData.tags) {
        const tagsExist = await tagRepository.findByIdIn({
            _id: { $in: productData.tags },
        });

        if (tagsExist.length !== productData.tags.length) {
            throw new ResponseError('One or more tags were not found', 404);
        }
    }
};

const getById = async (id) => {
    // Check if the product already exists
    // const product = await productRepository.findById(id);
    // if (!product) {
    //     throw new ResponseError('Product not found', 404);
    // }
    // return product;

    return await checkById(id);
};

const create = async (productData) => {
    // Check if the given product name already exists
    const existingProduct = await productRepository.findByName(productData.name);
    if (existingProduct) {
        throw new ResponseError('Product name is already exists', 400);
    }

    // Checks if a given category exists
    const categoryExists = await categoryRepository.findById(productData.category);
    if (!categoryExists) {
        throw new ResponseError('Category not found', 404);
    }

    // Checks if all given tags exist
    if (productData.tags) {
        const tagsExist = await tagRepository.findByIdIn({
            _id: { $in: productData.tags },
        });

        if (tagsExist.length !== productData.tags.length) {
            throw new ResponseError('One or more tags were not found', 404);
        }
    }

    return await productRepository.create(productData);
};

const updateById = async (id, productData) => {
    // Check if the product already exists
    const product = await productRepository.findById(id);
    if (!product) {
        throw new ResponseError('Product not found', 404);
    }

    // const existingProduct = await productRepository.findByName(productData.name);
    // Check if the given product name already exists
    if (product.name === productData.name) {
        throw new ResponseError('Product name is already exists', 400);
    }

    // Checks if a given category exists
    const categoryExists = await categoryRepository.findById(productData.category);
    if (!categoryExists) {
        throw new ResponseError('Category not found', 404);
    }

    // Checks if all given tags exist
    if (productData.tags) {
        const tagsExist = await tagRepository.findByIdIn({
            _id: { $in: productData.tags },
        });
        if (tagsExist.length !== productData.tags.length) {
            throw new ResponseError('One or more tags were not found', 404);
        }
    }

    // If there is a new image file uploaded
    if (productData.image) {
        // Delete old image files
        const fs = require('fs');
        if (product.image) {
            fs.unlink(product.image, (err) => {
                if (err) {
                    throw new Error('Failed to delete old files');
                }
            });
        }
    }

    return await productRepository.updateById(id, productData);
};

const deleteById = async (id) => {
    // Check if the product to be deleted exists
    const product = await productRepository.findById(id);
    if (!product) {
        throw new ResponseError('Product not found', 404);
    }

    return await productRepository.deleteById(id);
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
