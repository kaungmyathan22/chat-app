const http = require("http");
const express = require("express");
const { connect } = require("./db");
const cors = require("cors");
const {
  login,
  register,
  userList,
  me,
} = require("./controllers/auth.controller");
const { isAuthenticated } = require("./middlewares/auth.middleware");
const {
  createConversation,
  getConversation,
} = require("./controllers/conversation.controller");
const { sendMessage, getMessage } = require("./controllers/message.controller");
const { Server } = require("socket.io");
async function init() {
  try {
    await connect();
    const app = express();
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
      transports: ["websocket"],
      cors: "*",
    });
    const port = 3000;
    app.use(cors());
    app.use(express.json());
    app.get("/", (req, res) => res.send("Hello World!"));
    app.post("/api/v1/authentication/login", login);
    app.post("/api/v1/authentication/register", register);
    app.get("/api/v1/authentication/users", userList);
    app.get("/api/v1/authentication/me", isAuthenticated, me);
    app.post("/api/v1/conversation", isAuthenticated, createConversation);
    app.get("/api/v1/conversation", isAuthenticated, getConversation);
    app.post(
      "/api/v1/conversation/:conversationId/message",
      isAuthenticated,
      sendMessage(io)
    );
    app.get(
      "/api/v1/conversation/:conversationId/message",
      isAuthenticated,
      getMessage
    );
    io.on("connection", (socket) => {
      socket.on("join", (payload) => {
        const { conversationId } = payload;
        socket.join(conversationId);
        socket
          .to(conversationId)
          .emit(
            "user_join",
            `${socket.id} is now connected to chat room ${conversationId}`
          );
        console.log(`Joining to ${conversationId} by ${socket.id}`);
      });
      socket.on("leave", ({ conversationId }) => {
        socket.leave(conversationId);
        console.log(`leaving to ${conversationId} by ${socket.id}`);
      });
      // console.log(socket);
    });
    io.use((socket, next) => {
      let handshake = socket.handshake;
      const token = handshake?.auth?.token;
      if (!token) {
        next(new Error("Unauthorized"));
      }
      next();
    });

    httpServer.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
