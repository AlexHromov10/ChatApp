var express = require("express");
var router = express.Router();
const chatControllers = require("../controllers/chat.controllers");

// Пример: ~/chat/create
// Создать чат
router.post("/create", chatControllers.createChat);

// Удалить чат
router.delete("/delete/:chat_id", chatControllers.deleteChat);

// Добавить пользователя в чат
router.post("/adduser", chatControllers.addUserToChat);

// Предоставить статус админа
router.put("/grantadminstatus", chatControllers.grantAdminStatus);

// Удалить пользователя из чата
router.delete("/deleteuser", chatControllers.deleteUserFromChat);

module.exports = router;
