var express = require("express");
var router = express.Router();

const auth = require("../controllers/auth");
const common = require("../controllers/common");

const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Пример: ~/auth/login
// Зарегистрироваться
router.post("/register", common.validateData.validateRegister, auth.isEmailFree, auth.isNicknameFree, auth.register);

// Войти в систему
router.post("/login", common.validateData.validateEmail, auth.login);

//Проверка на существующий email
router.post("/isemailfree", apiLimiter, common.validateData.validateEmail, auth.isEmailFree, auth.responseSuccess);

//Проверка на существующий nickname
router.post(
  "/isnicknamefree",
  apiLimiter,
  common.validateData.validateNickname,
  auth.isNicknameFree,
  auth.responseSuccess
);

//Проверка на существующий ID
router.post("/isuseridfree", apiLimiter, common.validateData.validateUserId, auth.isUserIdFree, auth.responseSuccess);

router.get("/emailverification", apiLimiter, auth.emailVerification);

/*
router.post(
  "/testemail",
  apiLimiter,
  common.validateData.validateEmail,
  common.validateData.validateUserId,
  auth.emailverification.testEmailVerification
);
*/

module.exports = router;
