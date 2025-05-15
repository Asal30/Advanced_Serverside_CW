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

  findById: async (userId) => {
    return await db.get("SELECT * FROM users WHERE id = ?", [userId]);
  },

  updateUserType: async (userId, userType) => {
    if (!['admin', 'user'].includes(userType)) {
      throw new Error('Invalid user type');
    }

    await db.run(
      "UPDATE users SET user_type = ? WHERE id = ?",
      [userType, userId]
    );
  },
  count: async () => {
    const row = await db.get("SELECT COUNT(*) as count FROM users");
    return row.count;
  },

  updateUsername: async (userId, newUsername) => {
    await db.run(
      "UPDATE users SET username = ? WHERE id = ?",
      [newUsername, userId]
    );
  },

  updatePassword: async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await db.run(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, userId]
    );
  },

  updateProfilePicture: async (userId, profileImage) => {
    await db.run(
      "UPDATE users SET profile_image = ? WHERE id = ?",
      [profileImage, userId]
    );
  },

  updateBio: async (userId, bio) => {
    await db.run(
      "UPDATE users SET bio = ? WHERE id = ?",
      [bio, userId]
    );
  },

  updateCity: async (userId, city) => {
    await db.run(
      "UPDATE users SET city = ? WHERE id = ?",
      [city, userId]
    );
  },

  updateUser: async (userId, { username, bio, city, profile_image, password }) => {

    const fields = [];
    const values = [];

    if (username) {
      fields.push("username = ?");
      values.push(username);
    }
    if (bio) {
      fields.push("bio = ?");
      values.push(bio);
    }
    if (city) {
      fields.push("city = ?");
      values.push(city);
    }
    if (profile_image) {
      fields.push("profile_image = ?");
      values.push(profile_image);
    }
    if (password) {

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      fields.push("password = ?");
      values.push(hashedPassword);
    }

    if (fields.length === 0) return;

    values.push(userId);

    await db.run(
      `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
  },

  getUserStats: async (userId) => {
    const totalBlogsRow = await db.get(
      "SELECT COUNT(*) as totalBlogs FROM blogs WHERE user_id = ?",
      [userId]
    );

    const totalLikesRow = await db.get(
      `SELECT COUNT(*) as totalLikes
       FROM likes
       WHERE blog_id IN (SELECT id FROM blogs WHERE user_id = ?)`,
      [userId]
    );

    const totalCommentsRow = await db.get(
      `SELECT COUNT(*) as totalComments
       FROM comments
       WHERE blog_id IN (SELECT id FROM blogs WHERE user_id = ?)`,
      [userId]
    );

    const mostLikedBlog = await db.get(
      `SELECT id, title, image, description, likes, comments
       FROM blogs
       WHERE user_id = ?
       ORDER BY likes DESC
       LIMIT 1`,
      [userId]
    );

    return {
      totalBlogs: totalBlogsRow.totalBlogs || 0,
      totalLikes: totalLikesRow.totalLikes || 0,
      totalComments: totalCommentsRow.totalComments || 0,
      mostLikedBlog: mostLikedBlog || null,
    };
  },

  follow: async (followerId, followingId) => {
    if (followerId === followingId) throw new Error("Cannot follow yourself");
    const exists = await db.get(
      "SELECT 1 FROM follows WHERE follower_id = ? AND following_id = ?",
      [followerId, followingId]
    );
    if (exists) throw new Error("Already following this user");
    await db.run(
      "INSERT INTO follows (follower_id, following_id) VALUES (?, ?)",
      [followerId, followingId]
    );
    await db.run(
      "UPDATE users SET followers_count = followers_count + 1 WHERE id = ?",
      [followingId]
    );
    await db.run(
      "UPDATE users SET following_count = following_count + 1 WHERE id = ?",
      [followerId]
    );
  },

  unfollow: async (followerId, followingId) => {
    const result = await db.run(
      "DELETE FROM follows WHERE follower_id = ? AND following_id = ?",
      [followerId, followingId]
    );
    if (result.changes === 0) throw new Error("Not following this user");
    await db.run(
      "UPDATE users SET followers_count = followers_count - 1 WHERE id = ? AND followers_count > 0",
      [followingId]
    );
    await db.run(
      "UPDATE users SET following_count = following_count - 1 WHERE id = ? AND following_count > 0",
      [followerId]
    );
  },

  isFollowing: async (followerId, followingId) => {
    const row = await db.get(
      "SELECT 1 FROM follows WHERE follower_id = ? AND following_id = ?",
      [followerId, followingId]
    );
    return !!row;
  },

  getFollowers: async (userId) => {
    return await db.all(
      `SELECT users.id, users.username, users.profile_image
       FROM follows
       JOIN users ON follows.follower_id = users.id
       WHERE follows.following_id = ?`,
      [userId]
    );
  },

  getFollowings: async (userId) => {
    return await db.all(
      `SELECT users.id, users.username, users.profile_image
       FROM follows
       JOIN users ON follows.following_id = users.id
       WHERE follows.follower_id = ?`,
      [userId]
    );
  },
};

export default User;