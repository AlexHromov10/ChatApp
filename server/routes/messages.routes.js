var express = require("express");
var router = express.Router();
const messagesControllers = require("../controllers/messages.controllers");
const chatControllers = require("../controllers/chat.controllers");
const verifyJwt = require("../controllers/auth/verifyJwt");
const authControllers = require("../controllers/auth/auth.controllers");

// Пример: ~/messages/get
// Получить сообщения
router.get(
  "/get",
  verifyJwt,
  chatControllers.isExistingChat,
  chatControllers.isMemberOfChat,
  messagesControllers.getMessages
);

// Записать сообщение в бд
router.post(
  "/send",
  verifyJwt,
  chatControllers.isExistingChat,
  chatControllers.isMemberOfChat,
  messagesControllers.sendMessage
);

module.exports = router;
