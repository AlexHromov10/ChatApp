const { pool, dbErrorsHandling } = require("../db");
const bcrypt = require("bcrypt"); // bcrypt
const crypto = require("crypto");
require("dotenv").config();
const { role_user } = require("../constants/role.constants");
const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");

const saltRounds = 10; // data processing time

////////// MIDDLEWARE:
//Проверка EMAIL
const emailExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email === undefined) {
      return res.status(400).json({
        success: false,
        message: "Request syntax error",
      });
    }

    const responseEmailExists = await pool.query("SELECT COUNT(*) FROM users WHERE email=$1", [email]);
    if (responseEmailExists.rows[0].count != 0) {
      return res.status(400).json({
        success: false,
        message: `E-mail ${email} is already taken!`,
      });
    }

    req.message = `E-mail ${email} is free!`;
    next();
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

const nicknameExists = async (req, res, next) => {
  try {
    const { nickname } = req.body;
    if (nickname === undefined) {
      return res.status(400).json({
        success: false,
        message: "Request syntax error",
      });
    }

    const responseEmailExists = await pool.query("SELECT COUNT(*) FROM users WHERE nickname=$1", [nickname]);
    if (responseEmailExists.rows[0].count != 0) {
      return res.status(400).json({
        success: false,
        message: `Nickname ${nickname} is already taken!`,
      });
    }

    req.message = `Nickname ${nickname} is free!`;
    next();
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

const userIdExists = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    if (user_id === undefined) {
      return res.status(400).json({
        success: false,
        message: "Request syntax error",
      });
    }

    const responseUserIdExists = await pool.query("SELECT COUNT(*) FROM users WHERE id=$1", [user_id]);
    if (responseUserIdExists.rows[0].count != 0) {
      return res.status(400).json({
        success: false,
        message: "This ID is already taken!",
      });
    }

    req.message = "This ID is free!";
    next();
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

////////////////////////////////////////////////////

////////// ENDPOINTS:
// Для положительного результата
const ifSuccess = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: req.message,
  });
};
// РЕГИСТРАЦИЯ
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password, nickname, birth_date } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const user_id = crypto.randomBytes(16).toString("hex");
    const role = role_user;
    const created_at = new Date();

    const responseRegister = await pool.query(
      "INSERT INTO users (id,email,password,role,nickname, birth_date,created_at) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [user_id, email, hash, role, nickname, birth_date, created_at]
    );
    return res.status(200).send("Succesful registration!");
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

// ЛОГИН
const login = async (req, res) => {
  // Валдиация
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Проверка данных в БД
  try {
    const { email, password } = req.body;
    const responseLogin = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    // Проверка на email
    if (responseLogin.rowCount === 0) {
      return res.status(400).json({ errors: "Wrong email!" });
    }

    // Проверка пароля
    const validPassword = await bcrypt.compare(password, responseLogin.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ errors: "Wrong password!" });
    }

    // Создать и присвоить JWT
    // В Header поле "auth-token" - там сам токен JWT
    // ID пользователя - в req.user.id
    const token = jwt.sign({ id: responseLogin.rows[0].id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).status(200).send("Succesful login!");
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

//////

module.exports = {
  register,
  emailExists,
  nicknameExists,
  userIdExists,
  ifSuccess,
  login,
};
