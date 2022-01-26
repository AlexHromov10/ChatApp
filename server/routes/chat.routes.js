var express = require("express");
var router = express.Router();
const chatControllers = require("../controllers/chat.controllers");
const verifyJwt = require("../controllers/verifyJwt");
const authControllers = require("../controllers/auth.controllers");

// Пример: ~/chat/create
// Создать чат
router.post(
  "/create",
  verifyJwt,
  chatControllers.createChat,
  chatControllers.addUserToChat
);

// Удалить чат
router.post(
  "/delete",
  verifyJwt,
  chatControllers.isExistingChat,
  chatControllers.isMemberOfChat,
  chatControllers.isAdminInChat,
  chatControllers.deleteChat
);

// Добавить пользователя в чат
router.post(
  "/adduser",
  verifyJwt,
  chatControllers.isExistingChat,
  chatControllers.isMemberOfChat,
  chatControllers.addUserToChat
);

// Предоставить статус админа
router.post(
  "/grantadminstatus",
  verifyJwt,
  chatControllers.isExistingChat,
  chatControllers.isMemberOfChat,
  chatControllers.isAdminInChat,
  chatControllers.grantAdminStatus
);

// Удалить пользователя из чата
router.post(
  "/deleteuser",
  verifyJwt,
  chatControllers.isExistingChat,
  chatControllers.isMemberOfChat,
  chatControllers.isAdminInChat,
  chatControllers.deleteUserFromChat
);

module.exports = router;
