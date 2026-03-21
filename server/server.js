import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import conversationRoutes from "./route/conversation.routes.js";


const app = express();
const PORT = process.env.PORT || 5000;
const isDevelopment = process.env.NODE_ENV === "development";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", conversationRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Vortex Backend is running!" });
});

app.listen(PORT, () => {
  if (isDevelopment) console.log(`Server running on http://localhost:${PORT}`);
});
