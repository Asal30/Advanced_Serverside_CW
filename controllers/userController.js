import User from "../models/User.js";

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    // If using FormData, fields are in req.body and files in req.file or req.files
    const { username, bio, city, password } = req.body;
    let profile_image = req.body.profile_image;

    // If you handle file uploads, set profile_image = req.file.path or similar

    await User.updateUser(userId, { username, bio, city, profile_image, password });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const updateUsername = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newUsername } = req.body;

    await User.updateUsername(userId, newUsername);
    res.json({ message: "Username updated successfully" });
  } catch (error) {
    console.error("Failed to update username:", error);
    res.status(500).json({ error: "Failed to update username" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    await User.updatePassword(userId, newPassword);
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Failed to update password:", error);
    res.status(500).json({ error: "Failed to update password" });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;
    const { profileImage } = req.body;

    await User.updateProfilePicture(userId, profileImage);
    res.json({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error("Failed to update profile picture:", error);
    res.status(500).json({ error: "Failed to update profile picture" });
  }
};

export const updateBio = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio } = req.body;
    await User.updateBio(userId, bio);
    res.json({ message: "Bio updated successfully" });
  } catch (error) {
    console.error("Failed to update bio:", error);
    res.status(500).json({ error: "Failed to update bio" });
  }
};

export const updateCity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { city } = req.body;
    await User.updateCity(userId, city);
    res.json({ message: "City updated successfully" });
  } catch (error) {
    console.error("Failed to update city:", error);
    res.status(500).json({ error: "Failed to update city" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await User.findById(userId);
    const user = {
      id: userData.id,
      username: userData.username,
      profile_image: userData.profile_image,
      bio: userData.bio,
      city: userData.city,
      created_at: userData.created_at
    };
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const stats = await User.getUserStats(userId);
    res.json(stats);
  } catch (error) {
    console.error("Failed to fetch user stats:", error);
    res.status(500).json({ error: "Failed to fetch user stats" });
  }
};