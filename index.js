import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import countryRoutes from './routes/countryRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import { authenticate } from "./authMiddleware.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use('/api', authenticate);
app.use('/api/countries', authenticate, countryRoutes);
app.use("/api/admin", authenticate, adminRoutes);


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
