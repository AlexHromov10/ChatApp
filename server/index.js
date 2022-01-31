require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const chat = require("./routes/chat.routes");
const auth = require("./routes/auth.routes");
const messages = require("./routes/messages.routes");

// middleware
app.use(cors());
app.use(express.json());
app.use("/chat", chat);
app.use("/auth", auth);
app.use("/messages", messages);

// io.on("connection", (socket) => {
//   socket.on("message", ({ nickname, message }) =>{
//     io.emmit("message",{nickname, message});
//   )}
// });

// СТАРТ //
const start = () => {
  try {
    const server = app.listen(process.env.serverPORT, () => console.log(`Started on port ${process.env.serverPORT}`));

    return server;
  } catch (error) {
    console.log(error);
  }
};

const server = start();

// подключаем к серверу Socket.IO
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });
// io.on("connection", (socket) => {
//   console.log("---User connected---\n" + socket.id);
// });
