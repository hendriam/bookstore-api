const { verifyToken } = require('../utils/jwt');
const ResponseError = require('../utils/response-error');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new ResponseError('No token provided', 401);
        // return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Attach decoded token payload to request object
        next();
    } catch (error) {
        throw new ResponseError('Invalid or expired token', 403);
        // res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateUser;
