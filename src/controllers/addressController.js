const addressService = require('../services/addressService');
const responseSuccess = require('../utils/response-success');

const getAll = async (req, res, next) => {
    try {
        const address = await addressService.getAll(req.query);
        responseSuccess(res, 'Address list successfully retrieved', address, 200);
    } catch (error) {
        next(error);
    }
};

const getAllByUser = async (req, res, next) => {
    try {
        const address = await addressService.getAllByUser(req.params.userId);
        responseSuccess(res, 'Address list successfully retrieved', address, 200);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const address = await addressService.getById(req.params.id);
        responseSuccess(res, 'Address successfully retrieved by ID', address, 200);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const address = await addressService.create(req.body);
        responseSuccess(res, 'Address created successfully', address, 201);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const address = await addressService.updateById(req.params.id, req.body);
        responseSuccess(res, 'Address updated successfully', address, 200);
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const address = await addressService.deleteById(req.params.id);
        responseSuccess(res, 'Address deleted successfully', null, 200);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getAllByUser,
    getById,
    create,
    updateById,
    deleteById,
};
