import { db } from "../config/database.js";
import crypto from "crypto";

const ApiKey = {
    create: async (userId, name = null) => {
        const key = crypto.randomBytes(16).toString("hex");

        const result = await db.run(
            "INSERT INTO api_keys (user_id, key, name) VALUES (?, ?, ?)",
            [userId, key, name]
        );

        return {
            id: result.lastID,
            user_id: userId,
            key,
            name,
        };
    },
    findByUserId: async (userId) => {
        return await db.all("SELECT * FROM api_keys WHERE user_id = ?", [userId]);
    },

    findByKey: async (key) => {
        return await db.get("SELECT * FROM api_keys WHERE key = ?", [key]);
    },

    incrementUsage: async (key) => {
        await db.run(
            "UPDATE api_keys SET usage_count = usage_count + 1 WHERE key = ?",
            [key]
        );
    },
};

export default ApiKey;