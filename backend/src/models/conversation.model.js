const mongoose = require("mongoose");
const ConversationSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});
const ConversationModel = mongoose.model("Conversation", ConversationSchema);

module.exports = { ConversationModel, ConversationSchema };
