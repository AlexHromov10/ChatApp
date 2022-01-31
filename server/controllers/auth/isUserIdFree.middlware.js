const { validationResult } = require("express-validator");
const { pool, dbErrorsHandling } = require("../../db");

const isUserIdFree = async (req, res, next) => {
  const { user_id } = req.body;
  if (user_id === undefined || user_id === "") {
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
    const responseUserIdExists = await pool.query("SELECT COUNT(*) FROM users WHERE id=$1", [user_id]);
    if (responseUserIdExists.rows[0].count != 0) {
      return res.status(422).json({
        success: false,
        message: "ID пользователя занято",
        data: {
          user_id: user_id,
        },
      });
    }

    req.message = "ID пользователя свободно";
    req.data = {
      user_id: user_id,
    };
    next();
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

module.exports = isUserIdFree;
