const { body, validationResult, check } = require('express-validator');
const logger = require('../configs/logger');

const validateCreateProduct = [
    body('name')
        .notEmpty()
        .withMessage('Product name is required')
        .isString()
        .withMessage('Product name must be a string')
        .isLength({ min: 3 })
        .withMessage('Length must be at least 3 characters')
        .isLength({ max: 100 })
        .withMessage('Maximum length is 100 characters'),
    body('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isString()
        .withMessage('Product description must be a string'),
    body('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isFloat()
        .withMessage('Product price must be a number'),
    body('image').optional().isString().withMessage('Image must be a string'),
    body('category').notEmpty().withMessage('Category is required'),
    (req, res, next) => {
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
            // If there is an error, delete the uploaded file
            const fs = require('fs');
            if (req.file && req.file.path) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error('Gagal menghapus file:', err);
                    }
                });
            }

            // Takes only the first error from each field and formats the output according to the request.
            const errors = Object.values(errs.mapped()).map((error) => ({
                type: error.type,
                value: error.value,
                msg: error.msg,
                path: error.path,
                location: error.location,
            }));

            logger.warn(`${JSON.stringify({ message: 'Validation Error', errors })}`);
            return res.status(400).json({ message: 'Validation Error', errors });
        }
        next();
    },
];

module.exports = {
    validateCreateProduct,
};
