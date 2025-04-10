import bcrypt from "bcrypt";
import { db } from "../config/database.js";

const SALT_ROUNDS = 10;

const User = {
  create: async (username, email, password, userType = 'user') => {
    
    if (!['admin', 'user'].includes(userType)) {
      throw new Error('Invalid user type');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await db.run(
      "INSERT INTO users (username, email, password, user_type) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, userType]
    );

    return {
      id: result.lastID,
      username,
      email,
      user_type: userType,
    };
  },

  findByUsername: async (username) => {
    return await db.get("SELECT * FROM users WHERE username = ?", [username]);
  },

  findByEmail: async (email) => {
    return await db.get("SELECT * FROM users WHERE email = ?", [email]);
  },

  updateUserType: async (userId, userType) => {
    if (!['admin', 'user'].includes(userType)) {
      throw new Error('Invalid user type');
    }

    await db.run(
      "UPDATE users SET user_type = ? WHERE id = ?",
      [userType, userId]
    );
  }
};

export default User;