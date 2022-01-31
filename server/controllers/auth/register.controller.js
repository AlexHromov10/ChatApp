const { pool, dbErrorsHandling } = require("../../db");
const bcrypt = require("bcrypt"); // bcrypt
const crypto = require("crypto");
const { randomUUID } = require("crypto");
const { role_user } = require("../../constants/role.constants");
const { validationResult } = require("express-validator");
const { sendEmail } = require("./emailVerification");

const saltRounds = 10; // data processing time

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password, nickname, birth_date } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const user_id = crypto.randomUUID();

    const role = role_user;
    const created_at = new Date();

    //const email_verification_code = await bcrypt.hash(password, saltRounds);

    //sendEmail(email, email_verification_code);

    const responseRegister = await pool.query(
      "INSERT INTO users (id,email,password,role,nickname, birth_date,created_at,active) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [user_id, email, hash, role, nickname, birth_date, created_at, false]
    );
    return res.status(200).json({
      success: true,
      message: `Успешная регистрация! Осталось подтвердить почту!`,
      data: {
        user_id: user_id,
        email: email,
        role: role,
        nickname: nickname,
        birth_date: birth_date,
        created_at: created_at,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

module.exports = register;
