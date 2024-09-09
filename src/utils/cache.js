const redisClient = require('../configs/redisClient');
const logger = require('../configs/logger');
const ResponseError = require('../utils/response-error');

// Function to get cache
const getCache = async (key) => {
    try {
        return await redisClient.get(key);
    } catch (error) {
        logger.error('Redis get cache error:', error);
        throw new ResponseError('Redis get cache error', 500);
    }
};

// Function to save data to cache
const setCache = async (key, value, expirationTime = 3600) => {
    try {
        await redisClient.set(key, JSON.stringify(value), {
            EX: expirationTime,
        });
    } catch (error) {
        logger.error('Redis set cache error:', error);
        throw new ResponseError('Redis set cache error', 500);
    }
};

// Function to clear cache
const deleteCache = async () => {
    try {
        return await redisClient.FLUSHALL();
    } catch (error) {
        logger.error('Redis delete cache error:', error);
        throw new ResponseError('Redis delete cache error', 500);
    }
};

module.exports = {
    getCache,
    setCache,
    deleteCache,
};
