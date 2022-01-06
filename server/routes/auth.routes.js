var express = require("express");
var router = express.Router();
const validator = require("../validator");
const authControllers = require("../controllers/auth.controllers");

// Пример: ~/auth/login
// Зарегистрироваться
router.post("/register", validator.validateUser, authControllers.register);

// Войти в систему
router.post("/login", authControllers.login);

//Проверка на существующий email
router.post("/checkemail", authControllers.checkEmail);

module.exports = router;
