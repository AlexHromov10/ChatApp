const { pool, dbErrorsHandling } = require("../../db");

require("dotenv").config();

const emailVerification = async (req, res) => {
  const { verification_code } = req.query;
  try {
    const responseEmailVerification = await pool.query("SELECT * FROM users WHERE verification_code=$1", [
      verification_code,
    ]);
    if (responseEmailVerification.rowCount === 0) {
      return res.status(422).json({
        success: false,
        message: `Неверный код подтверждения e-mail`,
      });
    }

    const { id, email, role, nickname, birth_date, created_at } = responseEmailVerification.rows[0];
    const responseUpdateUsersActiveField = await pool.query(
      "UPDATE users SET active = true WHERE id = $1 RETURNING *",
      [id]
    );
    return res.status(200).json({
      success: true,
      message: `Аккаунт подтвержден!`,
      data: {
        user_id: id,
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

module.exports = emailVerification;
