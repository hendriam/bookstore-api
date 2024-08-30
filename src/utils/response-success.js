// class ResponseHelper {
//     static successResponse(res, message, data = null, statusCode = 200) {
//         return res.status(statusCode).json({
//             status: "success",
//             message,
//             data,
//         });
//     }
// }

const logger = require("../utils/logger");
const responseSuccess = (res, message, data = null, statusCode = 200) => {
    logger.info(`${message} => ${JSON.stringify(data)}`);
    return res.status(statusCode).json({
        message,
        data,
    });
};

module.exports = responseSuccess;
