const tagService = require("../services/tagService");
const responseSuccess = require("../utils/response-success");

const getAll = async (req, res, next) => {
    try {
        const tags = await tagService.getAll();
        responseSuccess(res, "Tag list successfully retrieved", tags, 200);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const tag = await tagService.getById(req.params.id);
        responseSuccess(res, "Tag successfully retrieved by ID", tag, 200);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const tag = await tagService.create(req.body);
        responseSuccess(res, "Tag created successfully", tag, 201);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const tag = await tagService.updateById(req.params.id, req.body);
        responseSuccess(res, "Tag updated successfully", tag, 200);
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const tag = await tagService.deleteById(req.params.id);
        responseSuccess(res, "Tag deleted successfully", null, 200);
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
