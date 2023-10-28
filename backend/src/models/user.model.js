const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});
const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel, UserSchema };
