const { check } = require("express-validator/check");

exports.validateUser = [
  check("first_name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Maximum 255 characters!")
    .bail(),
  check("last_name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User last name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Maximum 255 characters!")
    .bail(),
  check("birth_date").trim().isDate().withMessage("Must be a date").bail(),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address!")
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Email address can not be empty!")
    .bail(),
  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User password can not be empty!")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Minimum 8 characters required!")
    .isLength({ max: 255 })
    .withMessage("Maximum 255 characters!")
    .bail(),
];
