const pool = require("../db");
const bcrypt = require("bcrypt"); // bcrypt
const crypto = require("crypto");
const { validationResult } = require("express-validator/check");
require("dotenv").config();
const saltRounds = 10; // data processing time
const { role_user } = require("../constants/role.constants");

// РЕГИСТРАЦИЯ
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { email, password, first_name, last_name, birth_date } = req.body;
    bcrypt.hash(password, saltRounds).then(async function (hash) {
      const user_id = crypto.randomBytes(16).toString("hex");
      const role = role_user;
      const created_at = new Date();
      const responseRegister = await pool.query(
        "INSERT INTO users (id,email,password,role,first_name, last_name, birth_date,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
        [
          user_id,
          email,
          hash,
          role,
          first_name,
          last_name,
          birth_date,
          created_at,
        ]
      );
      res.json(responseRegister);
    });
  } catch (error) {
    console.log(error);
  }
};

//Проверка EMAIL
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const responseRegister = await pool.query(
      "SELECT COUNT(*) FROM users WHERE email=$1",
      [email]
    );
    if (responseRegister.rows[0].count == 0) {
      res.json({ "check email": true });
    } else {
      res.json({ "check email": false });
    }
  } catch (error) {
    console.log(error);
  }
};

// ЛОГИН
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    res.json({ username, password });
  } catch (error) {
    console.log(error);
  }
};

//////

function validateRegistrationInfo(request) {
  const { email, password, first_name, last_name, birth_date } = request.body;
}

module.exports = {
  register,
  checkEmail,
  login,
};
