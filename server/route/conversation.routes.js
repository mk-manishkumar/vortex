import express from "express";
import { askAI, saveConversation, getAllConversations, deleteConversation } from "../controller/conversation.controller.js";

const router = express.Router();

// POST route to ask AI
router.post("/ask-ai", askAI);

// POST route to save conversation
router.post("/save-conversation", saveConversation);

// GET route to fetch all conversations
router.get("/conversations", getAllConversations);

// DELETE route to delete a conversation by ID
router.delete("/conversations/:id", deleteConversation);

export default router;
