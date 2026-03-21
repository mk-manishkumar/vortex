import express from "express";
import { askAI, saveConversation, getAllConversations } from "../controller/conversation.controller.js";

const router = express.Router();

// POST route to ask AI
router.post("/ask-ai", askAI);

// POST route to save conversation
router.post("/save-conversation", saveConversation);

// GET route to fetch all conversations
router.get("/conversations", getAllConversations);

export default router;
