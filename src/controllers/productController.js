const productService = require('../services/productService');
const responseSuccess = require('../utils/response-success');

const getAll = async (req, res, next) => {
    try {
        const products = await productService.getAll(req.query);
        responseSuccess(res, 'Product list successfully retrieved', products, 200);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const product = await productService.getById(req.params.id);
        responseSuccess(res, 'Product successfully retrieved by ID', product, 200);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const productData = {
            ...req.body,
            image: req.file ? req.file.path : null,
        };
        const product = await productService.create(productData);
        responseSuccess(res, 'Product created successfully', product, 201);
    } catch (error) {
        deleteFile(req);
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        let productData = { ...req.body };

        if (req.file) productData.image = req.file ? req.file.path : null;

        const product = await productService.updateById(req.params.id, productData);

        responseSuccess(res, 'Product updated successfully', product, 200);
    } catch (error) {
        deleteFile(req);
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const product = await productService.deleteById(req.params.id);
        responseSuccess(res, 'Product deleted successfully', product, 200);
    } catch (error) {
        next(error);
    }
};

const deleteFile = (req) => {
    const fs = require('fs');
    if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                next(err);
            }
        });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
