import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import countryRoutes from './routes/countryRoutes.js';
import { authenticate, checkApiKey } from "./authMiddleware.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Adjust as needed
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use('/api', authenticate, checkApiKey);
app.use('/api/country', countryRoutes);


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
