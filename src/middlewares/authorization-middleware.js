const defineAbilities = require('../utils/defineAbilities');
const ResponseError = require('../utils/response-error');

function authorize(action, subject) {
    return (req, res, next) => {
        const ability = defineAbilities(req.user);

        if (ability.can(action, subject)) {
            // If permission is granted, proceed to the next handler
            return next();
        }
        // Return 403 Forbidden if permission is not available
        return next(new ResponseError('Unauthorized access', 403));
    };
}

module.exports = authorize;
