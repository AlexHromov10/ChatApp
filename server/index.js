require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var chat = require("./routes/chat.routes");
var auth = require("./routes/auth.routes");
var messages = require("./routes/messages.routes");

// middleware
app.use(cors());
app.use(express.json());
app.use("/chat", chat);
app.use("/auth", auth);
app.use("/messages", messages);

// СТАРТ //
const start = () => {
  try {
    app.listen(process.env.serverPORT, () => console.log(`Started on port ${process.env.serverPORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
