const { check, validationResult } = require('express-validator');
const logger = require('../configs/logger');

const validateCreateAddress = [
    check('recipientName')
        .notEmpty()
        .withMessage('Recipient name is required')
        .isLength({ min: 5 })
        .withMessage('Length must be at least 5 characters')
        .isLength({ max: 50 })
        .withMessage('Maximum length is 50 characters'),
    check('streetAddress')
        .notEmpty()
        .withMessage('Street Address is required')
        .isLength({ min: 5 })
        .withMessage('Length must be at least 5 characters')
        .isLength({ max: 500 })
        .withMessage('Maximum length is 500 characters'),
    check('city')
        .notEmpty()
        .withMessage('City is required')
        .isLength({ min: 3 })
        .withMessage('Length must be at least 3 characters')
        .isLength({ max: 50 })
        .withMessage('Maximum length is 50 characters'),
    check('state')
        .notEmpty()
        .withMessage('State is required')
        .isLength({ min: 3 })
        .withMessage('Length must be at least 3 characters')
        .isLength({ max: 50 })
        .withMessage('Maximum length is 50 characters'),
    check('postalCode')
        .notEmpty()
        .withMessage('Postal Code is required')
        .isLength({ min: 4 })
        .withMessage('Length must be at least 4 characters')
        .isLength({ max: 10 })
        .withMessage('Maximum length is 10 characters')
        .isNumeric()
        .withMessage('Postal Code must be a number'),
    check('country')
        .notEmpty()
        .withMessage('Country is required')
        .isLength({ min: 3 })
        .withMessage('Length must be at least 3 characters')
        .isLength({ max: 50 })
        .withMessage('Maximum length is 50 characters'),
    check('phoneNumber')
        .notEmpty()
        .withMessage('Phone Number is required')
        .isLength({ max: 13 })
        .withMessage('Maximum length is 13 characters')
        .isNumeric()
        .withMessage('Postal Code must be a number'),
    check('isDefault').isBoolean().withMessage('Default Address must be true/false'),
    check('user').notEmpty().withMessage('User is required'),
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
    validateCreateAddress,
};
