import jwt from "jsonwebtoken";
import { db } from "./config/database.js";

export const authenticate = async (req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

export const checkApiKey = async (req, res, next) => {
    const apiKey = req.header('api-key');
  
    if (!apiKey) {
      return res.status(401).json({ error: "API key missing" });
    }
    const row = await db.get(
      'SELECT * FROM api_keys WHERE key = ? AND user_id = ?',
      [apiKey, req.userId]
    );
    if (!row) {
      return res.status(401).json({ error: "Invalid API key" });
    }
    await db.run(
      'UPDATE api_keys SET usage_count = usage_count + 1 WHERE id = ?',
      [row.id]
    );
    next();
  };