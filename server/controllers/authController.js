import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isDbConnected } from "../config/db.js";

const memoryUsers = [];

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  if (isDbConnected()) {
    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    return res.json(user);
  }

  const existing = memoryUsers.find((user) => user.email === email);
  if (existing) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const user = {
    _id: `${Date.now()}`,
    username,
    email,
    password: hashed,
  };

  memoryUsers.push(user);
  res.json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = isDbConnected()
    ? await User.findOne({ email })
    : memoryUsers.find((item) => item.email === email);

  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });
};