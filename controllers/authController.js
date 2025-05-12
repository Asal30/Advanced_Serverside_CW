import User from "../models/User.js";
import ApiKey from "../models/ApiKey.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { db } from "../config/database.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, user_type, userType } = req.body;
    const newUserType = user_type || userType || 'user';

    const user = await User.create(username, email, password, newUserType);

    const apiKey = crypto.randomBytes(16).toString('hex');
    await db.run("INSERT INTO api_keys (user_id, key) VALUES (?, ?)", [user.id, apiKey]);

    res.status(201).json({
      message: "User registered successfully",
      apiKey: apiKey,
      user_type: user.user_type,
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

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "1h" });

    const row = await db.get("SELECT key FROM api_keys WHERE user_id = ?", [
      user.id,
    ]);

    res.status(200).json({
      message: "User logged in successfully",
      token: accessToken,
      apiKey: row?.key || null,
      user_type: user.user_type,
      userId: user.id,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Login failed",
    });
  }
};

export const generateApiKey = async (req, res) => {
  try {
      const userId = req.userId;
      if (!userId) {
          return res.status(400).json({ error: "User ID is missing" });  // Return error if userId is null
      }

      const { name } = req.body;
      const newKey = await ApiKey.create(userId, name);

      res.status(201).json({
          message: "API key generated successfully",
          apiKey: newKey.key,
          name: newKey.name,
      });
  } catch (error) {
      console.error("Error generating API key:", error.message);  // Log the error for debugging
      res.status(500).json({
          error: error.message,
          message: "API key generation failed",
      });
  }
};