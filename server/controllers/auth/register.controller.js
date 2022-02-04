const { pool, dbErrorsHandling } = require("../../db");
const bcrypt = require("bcrypt"); // bcrypt
const crypto = require("crypto");
const { randomUUID } = require("crypto");
const { role_user } = require("../../constants/role.constants");
const { validationResult } = require("express-validator");
const { sendEmail } = require("../common");

const saltRounds = 10; // data processing time

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { email, password, nickname, birth_date } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const user_id = crypto.randomUUID();

    const role = role_user;
    const created_at = new Date();

    const verification_code = crypto.randomUUID();
    const isSentVerificationCode = await sendEmail({
      to: email,
      subject: "Yupchick Chat. Подтверждение e-mail адреса",
      text: `Для подтверждения e-mail адреса перейдите по ссылке: ${process.env.serverIP}/auth/emailverification?verification_code=${verification_code}`,
    });
    if (!isSentVerificationCode.success) {
      return res.status(422).json({ success: false, message: "Не существующий email" });
    }

    const responseRegister = await pool.query(
      "INSERT INTO users (id,email,password,role,nickname, birth_date,created_at,active,verification_code) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [user_id, email, hash, role, nickname, birth_date, created_at, false, verification_code]
    );
    return res.status(200).json({
      success: true,
      message: {
        h1: "Успешная регистрация!",
        p: "На вашу почту было выслано сообщение с ссылкой для активации вашего аккаунта!",
      },
    });
  } catch (error) {
    console.log(error);
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

module.exports = register;
