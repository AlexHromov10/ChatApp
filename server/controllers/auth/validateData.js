const { check } = require("express-validator");

const isUUID = (fieldName) =>
  check(fieldName)
    .trim()
    .not()
    .isEmpty()
    .withMessage(`${fieldName} can not be empty!`)
    .bail()
    .isUUID(4)
    .withMessage(`${fieldName} is not UUID!`)
    .bail();

const validateUserId = isUUID("user_id");

const validateEmail = check("email")
  .trim()
  .not()
  .isEmpty()
  .withMessage("Email address can not be empty!")
  .bail()
  .isEmail()
  .withMessage("Invalid email address!")
  .bail()
  .normalizeEmail();

const validatePassword = check("password")
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
  .bail();

const validateNickname = check("nickname")
  .trim()
  .escape()
  .not()
  .isEmpty()
  .withMessage("Nickname can not be empty!")
  .bail()
  .isLength({ min: 3 })
  .withMessage("Minimum 3 characters required!")
  .bail()
  .isLength({ max: 255 })
  .withMessage("Maximum 255 characters!")
  .bail();

const validateBirthDate = check("birth_date").trim().isDate().withMessage("Must be a date").bail();

const validateRegister = [validateEmail, validatePassword, validateNickname, validateBirthDate];

const validateLogin = [validateEmail, validatePassword];

module.exports = {
  validateEmail,
  validatePassword,
  validateNickname,
  validateBirthDate,
  validateRegister,
  validateLogin,
  validateUserId,
};
