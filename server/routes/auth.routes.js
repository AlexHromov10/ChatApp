var express = require("express");
var router = express.Router();
const validator = require("../validator");
const authControllers = require("../controllers/auth.controllers");

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
router.post("/emailexists", authControllers.emailExists);

module.exports = router;
