const { pool, dbErrorsHandling } = require("../../db");
const crypto = require("crypto");
require("dotenv").config();

////////// MIDDLEWARE:
// Существует ли чат
const isExistingChat = async (req, res, next) => {
  const { chat_id } = req.body;
  try {
    const responseChatExists = await pool.query("SELECT * FROM chats WHERE id = $1", [chat_id]);

    if (responseChatExists.rowCount === 0) {
      return res.status(404).send("This chat doesn't exists");
    }
    // ЗАПИСЬ ИНФОРМАЦИИ О ЧАТА, ЧТОБ НЕ ДЕЛАТЬ ПОВТОРНЫЙ ЗАПРОС
    //req.chat_data = responseChatExists;

    next();
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

// Является ли участником чата пользователь, отправивший этот запрос
const isMemberOfChat = async (req, res, next) => {
  const { chat_id } = req.body;
  const user_id = req.user.id;
  try {
    const responseIsMemberOfChat = await pool.query("SELECT * FROM users_chats WHERE user_id = $1 AND chat_id = $2", [
      user_id,
      chat_id,
    ]);

    if (responseIsMemberOfChat.rowCount === 0) {
      return res.status(403).send("The user isn't member of this chat!");
    }

    req.users_chatsData = responseIsMemberOfChat;
    next();
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

// Является ли админом пользователь, отправивший этот запрос
const isAdminInChat = async (req, res, next) => {
  if (req.users_chatsData.rows[0].isadmin == false) {
    return res.status(403).send("This user isn't admin in this chat");
  }

  next();
};
////////////////////////////////////////////////////

////////// ENDPOINTS:
// Создание чата. In: ID создателя, название чата
const createChat = async (req, res, next) => {
  const { chat_name } = req.body;
  const { id } = req.user;

  try {
    // Создание ID чата
    const chat_id = crypto.randomUUID();
    const created_at = new Date();
    await pool.query("INSERT INTO chats (id,name,created_at) VALUES($1,$2,$3) RETURNING *", [
      chat_id,
      chat_name,
      created_at,
    ]);

    // Заполнение полей в body и переход к addUserToChat
    req.body.user_id = id;
    req.body.chat_id = chat_id;
    req.body.isAdmin = 1;
    next();
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

// Удаление чата. In: ID чата
const deleteChat = async (req, res) => {
  const { chat_id } = req.body;

  try {
    // Удаление чата
    const responseDeleteChat = await pool.query(" DELETE FROM chats WHERE id=$1 RETURNING *", [chat_id]);

    return res.json({ "deleted-chat-info": responseDeleteChat.rows[0] });
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

// Добавление пользователя в чат. In ID пользователя ID чата isAdmin пользователя
const addUserToChat = async (req, res) => {
  const { user_id, chat_id, isAdmin } = req.body;
  try {
    const responseAddUserToChat = await pool.query(
      "INSERT INTO users_chats (user_id,chat_id,isAdmin) VALUES($1,$2,$3) RETURNING *",
      [user_id, chat_id, isAdmin]
    );
    return res.status(200).json({
      "added-user-to-chat-info": responseAddUserToChat.rows[0],
    });
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

// Предоставить статус админа. In ID пользователя ID чата
const grantAdminStatus = async (req, res) => {
  const { user_id, chat_id } = req.body;

  try {
    const responseGrantAdminStatus = await pool.query(
      "UPDATE users_chats SET isadmin=$1 WHERE user_id=$2 AND chat_id=$3 RETURNING *",
      [1, user_id, chat_id]
    );
    if (responseGrantAdminStatus.rowCount === 0) {
      return res.status(400).send("The selected user is not in the chat!");
    }
    return res.status(200).json({
      "granted-admin-rigths-info": responseGrantAdminStatus.rows,
    });
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

// Удаление пользователя из чата. In ID пользователя ID чата
const deleteUserFromChat = async (req, res) => {
  const { user_id, chat_id } = req.body;

  try {
    const responseDeleteUserFromChat = await pool.query(
      "DELETE FROM users_chats WHERE user_id=$1 AND chat_id=$2 RETURNING *",
      [user_id, chat_id]
    );
    if (responseDeleteUserFromChat.rowCount === 0) {
      return res.status(400).send("The selected user is not in the chat!");
    }

    return res.status(200).json({
      "deleted-user-from-chat-info": responseDeleteUserFromChat.rows[0],
    });
  } catch (error) {
    return res.json([dbErrorsHandling(error.code), { details: error.detail }]);
  }
};

///////

module.exports = {
  createChat,
  deleteChat,
  addUserToChat,
  grantAdminStatus,
  deleteUserFromChat,
  isMemberOfChat,
  isExistingChat,
  isAdminInChat,
};
