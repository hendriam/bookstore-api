const { check, validationResult } = require('express-validator');
const logger = require('../configs/logger');

const validateCreate = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isString()
        .withMessage('Category name must be a string')
        .isLength({ min: 3 })
        .withMessage('Length must be at least 3 characters')
        .isLength({ max: 100 })
        .withMessage('Maximum length is 100 characters'),
    (req, res, next) => {
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
            // Takes only the first error from each field and formats the output according to the request.
            const errors = Object.values(errs.mapped()).map((error) => ({
                type: error.type,
                value: error.value,
                msg: error.msg,
                path: error.path,
                location: error.location,
            }));

            logger.warn(
                `${JSON.stringify({
                    message: 'Validation Error',
                    errors,
                })}`
            );
            return res.status(400).json({ message: 'Validation Error', errors });
        }
        next();
    },
];

module.exports = {
    validateCreate,
};
