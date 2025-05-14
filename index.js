import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
// import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import countryRoutes from './routes/countryRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { authenticate } from "./authMiddleware.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

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

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("like", (data) => handleLikeEvent(io, data));

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });

httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
