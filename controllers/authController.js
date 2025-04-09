import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { db } from "../config/database.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.create(username, email, password);

    const apiKey = crypto.randomBytes(16).toString("hex");

    await db.run("INSERT INTO api_keys (user_id, key) VALUES (?, ?)", [
      user.id,
      apiKey,
    ]);

    res.status(201).json({
      message: "User registered successfully",
      apiKey: apiKey,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "User registration failed",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    const row = await db.get("SELECT key FROM api_keys WHERE user_id = ?", [
      user.id,
    ]);

    res.status(200).json({
      message: "User logged in successfully",
      token,
      apiKey: row?.key || null,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Login failed",
    });
  }
};