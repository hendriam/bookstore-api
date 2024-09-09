const redis = require('redis');
const config = require('./config');
const logger = require('./logger');

// Create a Redis client with async/await
const redisClient = redis.createClient({
    url: config.redisUrl,
});

async function connectRedis() {
    try {
        // Connecting to Redis
        await redisClient.connect();
        logger.info('Redis client connected');
    } catch (err) {
        logger.error(`Could not connect to Redis: ${err}`);
    }
}

// Call the Redis connect function
connectRedis();

// Handle Redis error events
redisClient.on('error', (err) => {
    logger.error(`Redis error : ${err}`);
});

module.exports = redisClient;
