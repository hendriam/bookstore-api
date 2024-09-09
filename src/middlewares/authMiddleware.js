const { verifyToken } = require('../utils/jwt');
const ResponseError = require('../utils/response-error');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new ResponseError('No token provided', 401);
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        throw new ResponseError('Invalid or expired token', 403);
    }
};

module.exports = authenticateUser;
