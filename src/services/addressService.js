const addressRepository = require('../repositories/addressRepository');
const ResponseError = require('../utils/response-error');

const getAll = async (query) => {
    const filter = generateFilter(query);

    return await addressRepository.findAll(filter);
};

const getById = async (id) => {
    const address = await addressRepository.findById(id);
    if (!address) {
        throw new ResponseError('Address not found', 404);
    }

    return address;
};

const create = async (addressData) => {
    // If the value isDefault, sent by the user, is TRUE, then update the old isDefault to false.
    if (addressData.isDefault) {
        const addressExist = await addressRepository.findDefaultAddresByUser(addressData.user);
        if (addressExist.length !== 0) {
            addressExist.forEach(async (element) => {
                if (element.isDefault) {
                    await addressRepository.updateById(element._id, { isDefault: false });
                }
            });
        }
    }

    return await addressRepository.create(addressData);
};

const updateById = async (id, addressData) => {
    const address = await addressRepository.findById(id);
    if (!address) {
        throw new ResponseError('Address not found', 404);
    }

    // If the value isDefault, sent by the user, is TRUE, then update the old isDefault to false.
    if (addressData.isDefault) {
        const addressExist = await addressRepository.findDefaultAddresByUser(addressData.user);
        if (addressExist.length !== 0) {
            addressExist.forEach(async (element) => {
                if (element.isDefault) {
                    await addressRepository.updateById(element._id, { isDefault: false });
                }
            });
        }
    }

    return await addressRepository.updateById(id, addressData);
};

const deleteById = async (id) => {
    const addressExist = await addressRepository.findById(id);
    if (!addressExist) {
        throw new ResponseError('Address not found', 404);
    }

    // Address can't be deleted because it is address default.
    if (addressExist.isDefault) {
        throw new ResponseError(`Address can't be deleted because it is address default`, 400);
    }

    return await addressRepository.deleteById(id);
};

const generateFilter = (query) => {
    // Create an empty filter object
    let filter = {};

    // Filter by user (if applicable)
    if (query.user) {
        filter.user = query.user;
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
