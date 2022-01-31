//const emailExists = require("./emailExists.middleware");
module.exports = {
  validateData: require("./validateData"),
  isEmailFree: require("./isEmailFree.middleware"),
  isNicknameFree: require("./isNicknameFree.middleware"),
  isUserIdFree: require("./isUserIdFree.middlware"),
  responseSuccess: require("./responeSuccess.controller"),
  register: require("./register.controller"),
  login: require("./login.controller"),
};
