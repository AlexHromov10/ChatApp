var express = require("express");
var router = express.Router();
const messagesControllers = require("../controllers/messages/messages.controllers");
const chatControllers = require("../controllers/chat/chat.controllers");
const { verifyJwt } = require("../controllers/common");

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
