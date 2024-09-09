const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('./config');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoURI);
        logger.info('MongoDB connected successfully');
    } catch (error) {
        logger.error(`Error connecting to MongoDB:: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
