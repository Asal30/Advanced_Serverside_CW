import bcrypt from "bcrypt";
import { db } from "../config/database.js";

const SALT_ROUNDS = 10;

const User = {
  create: async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return {
      id: result.lastID,
      username,
      email,
    };
  },

  findByUsername: async (username) => {
    return await db.get("SELECT * FROM users WHERE username = ?", [username]);
  },

  findByEmail: async (email) => {
    return await db.get("SELECT * FROM users WHERE email = ?", [email]);
  },
};

export default User;