const logger = require("../utils/logger");
const ResponseError = require("../utils/response-error");

const errorHandler = (err, req, res, next) => {
    if (err instanceof ResponseError) {
        logger.warn(`${JSON.stringify({ message: err.message })}`);
        return res.status(err.statusCode).json({ message: err.message });
    }

    logger.error(`${JSON.stringify({ message: err.message })}`);
    res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
