const { validationResult } = require("express-validator");
const { pool, dbErrorsHandling } = require("../../db");

const isNicknameFree = async (req, res, next) => {
  const { nickname } = req.body;
  if (nickname === undefined || nickname === "") {
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
    const responseIsNicknameFree = await pool.query("SELECT COUNT(*) FROM users WHERE nickname=$1", [nickname]);
    if (responseIsNicknameFree.rows[0].count != 0) {
      return res.status(422).json({
        success: false,
        message: `Никнейм занят`,
        data: {
          nickname: nickname,
        },
      });
    }

    req.message = `Никнейм свободен`;
    req.data = {
      nickname: nickname,
    };
    next();
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

module.exports = isNicknameFree;
