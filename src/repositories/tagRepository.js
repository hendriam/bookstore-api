const Tag = require("../models/Tag");

const findAll = async () => {
    return await Tag.find();
};

const findById = async (id) => {
    return await Tag.findById(id);
};

const create = async (tagData) => {
    const tag = new Tag(tagData);
    return await tag.save();
};

const updateById = async (id, tagData) => {
    return await Tag.findByIdAndUpdate(id, tagData, {
        new: true,
        runValidators: true,
    });
};

const deleteById = async (id) => {
    return await Tag.findByIdAndDelete(id);
};

const findByName = async (name) => {
    return await Tag.findOne({ name });
};

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    findByName,
};
