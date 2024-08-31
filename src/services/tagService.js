const tagRepository = require("../repositories/tagRepository");
const ResponseError = require("../utils/response-error");

const getAll = async () => {
    return await tagRepository.findAll();
};

const getById = async (id) => {
    const tag = await tagRepository.findById(id);
    if (!tag) {
        throw new ResponseError("Tag not found", 404);
    }

    return tag;
};

const create = async (tagData) => {
    const existingTag = await tagRepository.findByName(tagData.name);

    if (existingTag) {
        throw new ResponseError("Tag name is already exists", 400);
    }

    return await tagRepository.create(tagData);
};

const updateById = async (id, tagData) => {
    const existingTag = await tagRepository.findByName(tagData.name);

    if (existingTag) {
        throw new ResponseError("Tag name is already exists", 400);
    }

    const tag = await tagRepository.findById(id);
    if (!tag) {
        throw new ResponseError("Tag not found", 404);
    }

    return await tagRepository.updateById(id, tagData);
};

const deleteById = async (id) => {
    const tag = await tagRepository.findById(id);

    if (!tag) {
        throw new ResponseError("Tag not found", 404);
    }

    return await tagRepository.deleteById(id);
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
