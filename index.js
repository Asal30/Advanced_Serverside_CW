import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";

import authRoutes from "./routes/authRoutes.js";
import countryRoutes from './routes/countryRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { authenticate } from "./Middleware/authMiddleware.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use('/api/countries', authenticate, countryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", authenticate, adminRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));

httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
