import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import conversationRoutes from "./route/conversation.routes.js";

const app = express();

// Parse CORS origins from .env
const FRONTEND_URLS = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",").map((url) => url.trim()) : ["http://localhost:5173"];

// CORS Configuration
app.use(
  cors({
    origin: FRONTEND_URLS,
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());
connectDB();

// Routes
app.use("/api", conversationRoutes);

// Test endpoint
app.get("/", (req, res) => res.json({ message: "Vortex Backend is running!" }));
