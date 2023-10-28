const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  content: String,
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
});
const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = { MessageModel, MessageSchema };
