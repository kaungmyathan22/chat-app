const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { JWT_SECRET } = require("../config");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({ username: user.username }, JWT_SECRET);
    res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication failed" });
  }
}

async function register(req, res) {
  const { username, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
}

async function userList(req, res) {
  const users = await UserModel.find();
  return res.json(users);
}

async function me(req, res) {
  return res.json(req.user);
}

module.exports = { login, register, userList, me };
