const pool = require("../db");
const crypto = require("crypto");
require("dotenv").config();

// Создание чата. In: ID создателя, название чата
const createChat = async (req, res) => {
  try {
    const { user_id, chat_name } = req.body;
    const chat_id = crypto.randomBytes(16).toString("hex");
    const created_at = new Date();
    const responseCreateChat = await pool.query(
      "INSERT INTO chats (id,name,created_at) VALUES($1,$2,$3) RETURNING *",
      [chat_id, chat_name, created_at]
    );
    const responseAddUser = await pool.query(
      "INSERT INTO users_chats (user_id,chat_id,isAdmin) VALUES($1,$2,$3) RETURNING *",
      [user_id, chat_id, 1]
    );
    res.json([responseCreateChat.rows[0], responseAddUser.rows[0]]);
  } catch (error) {
    console.log(error);
    const responseWithErrorCodeAndMessage = dbErrorsHandling(error.code);
    res.json(responseWithErrorCodeAndMessage);
  }
};

// Удаление чата. In: ID чата
const deleteChat = async (req, res) => {
  try {
    const { chat_id } = req.params;
    const responseDeleteChat = await pool.query(
      " DELETE FROM chats WHERE id=$1 RETURNING *",
      [chat_id]
    );
    res.json(responseDeleteChat.rows);
  } catch (error) {
    const responseWithErrorCodeAndMessage = dbErrorsHandling(error.code);
    res.json(responseWithErrorCodeAndMessage);
  }
};

// Добавление пользователя в чат. In ID пользователя ID чата
const addUserToChat = async (req, res) => {
  try {
    const { user_id, chat_id } = req.body;
    const responseAddUserToChat = await pool.query(
      "INSERT INTO users_chats (user_id,chat_id,isAdmin) VALUES($1,$2,$3) RETURNING *",
      [user_id, chat_id, 0]
    );
    res.json(responseAddUserToChat.rows);
  } catch (error) {
    const responseWithErrorCodeAndMessage = dbErrorsHandling(error.code);
    res.json(responseWithErrorCodeAndMessage);
  }
};

// Предоставить статус админа. In ID пользователя ID чата
const grantAdminStatus = async (req, res) => {
  try {
    const { user_id, chat_id } = req.body;
    const responseGrantAdminStatus = await pool.query(
      "UPDATE users_chats SET isadmin=$1 WHERE user_id=$2 AND chat_id=$3 RETURNING *",
      [1, user_id, chat_id]
    );
    res.json(responseGrantAdminStatus.rows);
  } catch (error) {
    const responseWithErrorCodeAndMessage = dbErrorsHandling(error.code);
    res.json(responseWithErrorCodeAndMessage);
  }
};

// Удаление пользователя из чата. In ID пользователя ID чата
const deleteUserFromChat = async (req, res) => {
  try {
    const { user_id, chat_id } = req.body;
    const responseDeleteUserFromChat = await pool.query(
      "DELETE FROM users_chats WHERE user_id=$1 AND chat_id=$2 RETURNING *",
      [user_id, chat_id]
    );
    res.json(responseDeleteUserFromChat.rows);
  } catch (error) {
    const responseWithErrorCodeAndMessage = dbErrorsHandling(error.code);
    res.json(responseWithErrorCodeAndMessage);
  }
};

///////

function dbErrorsHandling(errorCode) {
  switch (errorCode) {
    case process.env.postgres_unique_violation:
      console.log("ERROR CODE:" + errorCode);
      return { errorCode: errorCode, message: "The PK value isn't unique!" };
      break;
    case process.env.foreign_key_violation:
      console.log("ERROR CODE:" + errorCode);
      return { errorCode: errorCode, message: "The FK does not exists!" };
      break;
    default:
      console.log("ERROR CODE:" + errorCode);
      return { errorCode: errorCode, message: "UNHANDLED DB ERROR" };
      break;
  }
}

module.exports = {
  createChat,
  deleteChat,
  addUserToChat,
  grantAdminStatus,
  deleteUserFromChat,
};
