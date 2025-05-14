import User from "../models/User.js";

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