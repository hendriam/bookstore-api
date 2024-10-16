const productRepository = require('../repositories/productRepository');
const categoryRepository = require('../repositories/categoryRepository');
const tagRepository = require('../repositories/tagRepository');
const ResponseError = require('../../utils/response-error');
const { getCache, setCache, deleteCache } = require('../../utils/cache');
const logger = require('../../configs/logger');

const getAll = async (query) => {
    // Retrieving data from cache
    const cacheKey = `products:${JSON.stringify(query)}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        logger.info(`Data fetched from key => ${cacheKey}`);
        return JSON.parse(cachedData);
    }

    const filter = generateFilter(query);

    // Pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = query.sortBy || 'createdAt';
    const order = query.order === 'desc' ? -1 : 1;

    const products = await productRepository.findAll(page, limit, skip, sortBy, order, filter);

    // Save data to cache
    await setCache(cacheKey, products);

    return products;
};

const getById = async (id) => {
    return await checkProductExistById(id);
};

const create = async (productData) => {
    // Check if the given product name already exists
    const existingProduct = await productRepository.findByName(productData.name);
    if (existingProduct) {
        throw new ResponseError('Product name is already exists', 400);
    }

    // Checks if a given category exists
    if (productData.category) {
        await checkCategoryExist(productData);
    }

    // Checks if all given tags exist
    await checkTagsExist(productData);

    // Cache invalidation after create
    await deleteCache();

    return await productRepository.create(productData);
};

const updateById = async (id, productData) => {
    // Check if the product already exists
    const productExist = await checkProductExistById(id);

    // const existingProduct = await productRepository.findByName(productData.name);
    // Check if the given product name already exists
    if (productExist.name === productData.name) {
        throw new ResponseError('Product name is already exists', 400);
    }

    // Checks if a given category exists
    if (productData.category) {
        await checkCategoryExist(productData);
    }

    // Checks if all given tags exist
    await checkTagsExist(productData);

    // If there is a new image file uploaded
    if (productData.image) {
        // Delete old image files
        deleteFile(productExist);
    }

    // Cache invalidation after create
    await deleteCache();

    return await productRepository.updateById(id, productData);
};

const deleteById = async (id) => {
    // Check if the product to be deleted exists
    const productExist = await checkProductExistById(id);

    deleteFile(productExist);

    // Cache invalidation after create
    await deleteCache();

    return await productRepository.deleteById(id);
};

const checkProductExistById = async (id) => {
    const productExist = await productRepository.findById(id);
    if (!productExist) {
        throw new ResponseError('Product not found', 404);
    }

    return productExist;
};

const checkCategoryExist = async (productData) => {
    const categoryExist = await categoryRepository.findById(productData.category);
    if (!categoryExist) {
        throw new ResponseError('Category not found', 404);
    }
};

const checkTagsExist = async (productData) => {
    if (productData.tags) {
        const tagsExist = await tagRepository.findByIdIn({ _id: { $in: productData.tags } });
        if (tagsExist.length !== productData.tags.length) {
            throw new ResponseError('One or more tags were not found', 404);
        }
    }
};

const deleteFile = (product) => {
    const fs = require('fs');
    if (product.image) {
        fs.unlink(product.image, (err) => {
            if (err) {
                throw new Error('Failed to delete old files');
            }
        });
    }
};

const generateFilter = (query) => {
    // Create an empty filter object
    let filter = {};

    // Filter by category (if applicable)
    if (query.category) {
        filter.category = query.category;
    }

    // Filter by tags (if applicable)
    if (query.tags) {
        const tagIds = query.tags.split(',');
        filter.tags = { $in: tagIds };
    }

    // Filter by search (if applicable)
    if (query.search) {
        filter.name = { $regex: query.search, $options: 'i' }; // Case-insensitive search
    }

    return filter;
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
