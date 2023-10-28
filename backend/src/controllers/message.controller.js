const { ConversationModel } = require("../models/conversation.model");
const { MessageModel } = require("../models/message.model");

module.exports.sendMessage = (io) => async (req, res) => {
  const { conversationId } = req.params;
  const { content } = req.body;
  console.log({ content });
  const conversation = await ConversationModel.findById(conversationId);
  if (!conversation) {
    return res.status(400).json({ message: "Invalid conversation id." });
  }
  const user = req.user;
  const message = new MessageModel({
    content,
    conversationId,
    senderId: user._id,
  });
  await message.save();
  io.to(conversationId).emit("new_message", message);
  return res.json(message);
};

module.exports.getMessage = async (req, res) => {
  const { conversationId } = req.params;
  const conversation = await ConversationModel.findById(conversationId);
  if (!conversation) {
    return res.status(400).json({ message: "Invalid conversation id." });
  }
  const messages = await MessageModel.find({
    conversationId,
  });
  return res.json(messages);
};
