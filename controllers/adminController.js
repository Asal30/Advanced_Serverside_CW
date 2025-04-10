import User from "../models/User.js";
import ApiKey from "../models/ApiKey.js";
import { db } from "../config/database.js";

export const getDashboardCounts = async (req, res) => {
    try {
        const [users, apiKeys, countries] = await Promise.all([
            User.count(),
            ApiKey.countActive(),
            db.get("SELECT COUNT(*) as count FROM countries").then(r => r.count)
        ]);

    res.json({
      users,
      apiKeys,
      countries
    });
  } catch (error) {
    console.error("Failed to get dashboard counts:", error);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
};