require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var chat = require("./routes/chat.routes");

// middleware
app.use(cors());
app.use(express.json());
app.use("/chat", chat);

// СТАРТ //
const start = () => {
  try {
    app.listen(process.env.serverPORT, () =>
      console.log(`Started on port ${process.env.serverPORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
