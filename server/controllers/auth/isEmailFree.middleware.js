const { validationResult } = require("express-validator");
const { pool, dbErrorsHandling } = require("../../db");

const isEmailFree = async (req, res, next) => {
  const { email } = req.body;
  if (email === undefined || email === "" || email === "@") {
    return res.status(400).json({
      success: false,
      message: "Неверный запрос",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const responseIsEmailFree = await pool.query("SELECT COUNT(*) FROM users WHERE email=$1", [email]);
    if (responseIsEmailFree.rows[0].count != 0) {
      return res.status(422).json({
        success: false,
        message: `E-mail занят`,
        data: {
          email: email,
        },
      });
    }

    req.message = `E-mail свободен`;
    req.data = {
      email: email,
    };
    next();
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

module.exports = isEmailFree;
