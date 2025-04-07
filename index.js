import express from "express";
import authRoutes from "./routes/authRoutes.js";
// import countryRoutes from "./routes/countryRoutes.js";
import { authenticate, checkApiKey } from "./authMiddleware.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api', authenticate, checkApiKey);

app.listen(4200, () => {
    console.log("Server running in http://localhost:4200/");
});