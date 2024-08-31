const logger = require('../utils/logger');
const ResponseError = require('../utils/response-error');

const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((err) => ({
            path: err.path,
            message: err.message,
            value: err.value,
        }));

        logger.warn(`${JSON.stringify({ message: 'Validation Error', errors })}`);
        return res.status(400).json({ message: 'Validation Error', errors });
    }

    if (err instanceof ResponseError) {
        logger.warn(`${JSON.stringify({ message: err.message })}`);
        return res.status(err.statusCode).json({ message: err.message });
    }

    logger.error(`${JSON.stringify({ message: err.message })}`);
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
