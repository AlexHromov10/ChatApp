const { pool, dbErrorsHandling } = require("../db");
const crypto = require("crypto");
require("dotenv").config();

// Получение определенного сообщений с ограничениями:
// 1) Дата (от которой нужно делать выборку)
// 2) Коичество сообщений
const getMessages = async (req, res) => {
  try {
    const { chat_id, starting_date, ammount } = req.body;
    const starting_date_dateFormat = new Date(starting_date);
    const responseGetMessage = await pool.query(
      "SELECT * FROM messages \
      WHERE chat_id = $1 AND created_at > $2 \
      ORDER BY created_at \
      fetch first $3 rows only",
      [chat_id, starting_date_dateFormat, ammount]
    );
    res.json(responseGetMessage.rows);
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

// Отправка сообщений
const sendMessage = async (req, res) => {
  const { text, media, chat_id } = req.body;
  const user_id = req.user.id;
  const created_at = new Date();
  const id = crypto.randomUUID();

  try {
    const responseSendMessage = await pool.query(
      "INSERT INTO messages (id,text,media,created_at,chat_id,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [id, text, media, created_at, chat_id, user_id]
    );
    res.json(responseSendMessage.rows);
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

module.exports = {
  getMessages,
  sendMessage,
};
