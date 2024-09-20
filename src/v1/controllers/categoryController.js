const categoryService = require('../services/categoryService');
const responseSuccess = require('../../utils/response-success');

const getAll = async (req, res, next) => {
    try {
        const categories = await categoryService.getAll();
        responseSuccess(res, 'Category list successfully retrieved', categories, 200);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const category = await categoryService.getById(req.params.id);
        responseSuccess(res, 'Category successfully retrieved by ID', category, 200);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const category = await categoryService.create(req.body);
        responseSuccess(res, 'Category created successfully', category, 201);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const category = await categoryService.updateById(req.params.id, req.body);
        responseSuccess(res, 'Category updated successfully', category, 200);
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const category = await categoryService.deleteById(req.params.id);
        responseSuccess(res, 'Category deleted successfully', null, 200);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
