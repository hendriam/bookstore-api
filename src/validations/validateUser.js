const { check, validationResult } = require("express-validator");
const logger = require("../utils/logger");

const validateRegistration = [
    check("fullname")
        .notEmpty()
        .withMessage("Fullname is required")
        .isLength({ min: 3 })
        .withMessage("Full name length must be at least 3 characters")
        .isLength({ max: 20 })
        .withMessage("Maximum full name length is 20 characters"),
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please use a valid email address"),
    check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    (req, res, next) => {
        const errs = validationResult(req);
        console.log(errs);
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
                    message: "Validation Error",
                    errors,
                })}`
            );
            return res
                .status(400)
                .json({ message: "Validation Error", errors });
        }
        next();
    },
];

const validateLogin = [
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please use a valid email address"),
    check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
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
                    message: "Validation Error",
                    errors,
                })}`
            );
            return res
                .status(400)
                .json({ message: "Validation Error", errors });
        }
        next();
    },
];

module.exports = {
    validateRegistration,
    validateLogin,
};
