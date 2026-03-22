import axios from "axios";
import { Conversation } from "../model/Conversation.model.js";

// Controller to ask AI
export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Call OpenRouter API
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.FRONTEND_URL,
          "X-Title": "Vortex AI App",
        },
      },
    );

    const aiResponse = response.data.choices[0].message.content;

    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Detailed Error:", { message: error.message, status: error.response?.status, data: error.response?.data });
    res.status(500).json({ error: "Failed to get response from AI" });
  }
};

// Controller to save conversation
export const saveConversation = async (req, res) => {
  try {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res.status(400).json({ error: "Prompt and response are required" });
    }

    const newConversation = new Conversation({
      prompt: prompt.trim(),
      response: response.trim(),
    });

    const savedConversation = await newConversation.save();

    res.status(201).json({ message: "Conversation saved successfully", id: savedConversation._id });
  } catch (error) {
    console.error("Error saving conversation:", error.message);
    res.status(500).json({ error: "Failed to save conversation" });
  }
};

// Controller to fetch all conversations
export const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ createdAt: -1 });
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error.message);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

// Delete conversation by ID
export const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Conversation ID is required" });

    const deletedConversation = await Conversation.findByIdAndDelete(id);
    if (!deletedConversation) return res.status(404).json({ error: "Conversation not found" });

    res.status(200).json({ message: "Conversation deleted successfully", id: deletedConversation._id });
  } catch (error) {
    console.error("Error deleting conversation:", error.message);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
};
