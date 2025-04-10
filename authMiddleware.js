import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
      return res.status(401).json({ error: "Access denied" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log("Decoded token:", decoded);  // Log the decoded token to check if 'id' exists
      req.userId = decoded.id;
      if (!req.userId) {
          throw new Error("User ID not found in token");
      }
      next();
  } catch (error) {
      console.error("Authentication error:", error.message); // Log error details
      res.status(401).json({ error: "Invalid token" });
  }
}
