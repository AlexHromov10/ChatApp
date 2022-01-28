var express = require("express");
var router = express.Router();
const validator = require("../validator");
const authControllers = require("../controllers/auth.controllers");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Пример: ~/auth/login
// Зарегистрироваться
router.post(
  "/register",
  validator.validateRegister,
  authControllers.emailExists,
  authControllers.nicknameExists,
  authControllers.register
);

// Войти в систему
router.post("/login", validator.validateLogin, authControllers.login);

//Проверка на существующий email
router.post("/emailexists", apiLimiter, authControllers.emailExists, authControllers.ifSuccess);

//Проверка на существующий nickname
router.post("/nickexists", apiLimiter, authControllers.nicknameExists, authControllers.ifSuccess);

module.exports = router;
