const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

module.exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split("Bearer ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  jwt.verify(token, JWT_SECRET, (err, { username }) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    UserModel.findOne({ username })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).json({ message: "Invalid token." });
      });
  });
};
