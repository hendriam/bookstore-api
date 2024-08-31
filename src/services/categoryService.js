const categoryRepository = require('../repositories/categoryRepository');
const ResponseError = require('../utils/response-error');

const getAll = async () => {
    return await categoryRepository.findAll();
};

const getById = async (id) => {
    const category = await categoryRepository.findById(id);
    if (!category) {
        throw new ResponseError('Category not found', 404);
    }

    return category;
};

const create = async (categoryData) => {
    const existingCategory = await categoryRepository.findByName(categoryData.name);

    if (existingCategory) {
        throw new ResponseError('Category name is already exists', 400);
    }

    return await categoryRepository.create(categoryData);
};

const updateById = async (id, categoryData) => {
    const existingCategory = await categoryRepository.findByName(categoryData.name);

    if (existingCategory) {
        throw new ResponseError('Category name is already exists', 400);
    }

    const category = await categoryRepository.findById(id);
    if (!category) {
        throw new ResponseError('Category not found', 404);
    }

    return await categoryRepository.updateById(id, categoryData);
};

const deleteById = async (id) => {
    const category = await categoryRepository.findById(id);

    if (!category) {
        throw new ResponseError('Category not found', 404);
    }

    return await categoryRepository.deleteById(id);
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
