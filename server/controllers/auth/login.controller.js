const { pool, dbErrorsHandling } = require("../../db");
const bcrypt = require("bcrypt"); // bcrypt
require("dotenv").config();
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  // Валдиация
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  // Проверка данных в БД
  try {
    const responseLogin = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    // Проверка на email
    if (responseLogin.rowCount === 0) {
      return res.status(422).json({
        success: false,
        errors: `email`,
        message: `Неверный e-mail`,
      });
    }

    const { id, role, nickname, birth_date, created_at, active } = responseLogin.rows[0];

    // Проверка пароля
    const validPassword = await bcrypt.compare(password, responseLogin.rows[0].password);
    if (!validPassword) {
      return res.status(422).json({
        success: false,
        errors: `password`,
        message: {
          h2: "Неверный пароль!",
          p: "На вашу почту было выслано сообщение с ссылкой для активации вашего аккаунта!",
        },
      });
    }

    if (!active) {
      return res.status(403).json({
        success: false,
        errors: `active`,
        message: `Аккаунт не активирован!`,
      });
    }

    // Создать и присвоить JWT
    // В Header поле "auth-token" - там сам токен JWT
    // ID пользователя - в req.user.id
    const token = jwt.sign({ id: id }, process.env.TOKEN_SECRET);
    res
      .header("auth-token", token)
      .header("Access-Control-Expose-Headers", "auth-token")
      .status(200)
      .json({
        success: true,
        message: `Успешный вход`,
        data: {
          user_id: id,
          email: email,
          role: role,
          nickname: nickname,
          birth_date: birth_date,
          //birth_dateee: `${birth_date.getFullYear()}/${birth_date.getMonth()}/${birth_date.getDate()}`,
          created_at: created_at,
        },
      });
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

module.exports = login;
