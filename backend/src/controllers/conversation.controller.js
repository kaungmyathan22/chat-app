const { ConversationModel } = require("../models/conversation.model");

module.exports.createConversation = async (req, res) => {
  const { name } = req.body;
  const conversation = await ConversationModel.findOne({ name });
  if (conversation) {
    return res.status(401).json({ message: "Conversation already existed." });
  }
  const newConversation = new ConversationModel({ name });
  await newConversation.save();
  return res.json(newConversation);
};

module.exports.getConversation = async (req, res) => {
  const conversations = await ConversationModel.find();
  return res.json(conversations);
};
