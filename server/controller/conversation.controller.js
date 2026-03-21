import axios from "axios";
import { Conversation } from "../model/Conversation.model.js";

const isDevelopment = process.env.NODE_ENV === "development";

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
    if (isDevelopment) console.error("Detailed Error:", { message: error.message, status: error.response?.status, data: error.response?.data });
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

    if (isDevelopment) console.log("Conversation saved successfully:", savedConversation._id);

    res.status(201).json({ message: "Conversation saved successfully", id: savedConversation._id });
  } catch (error) {
    if (isDevelopment)   console.error("Error saving conversation:", error.message);
    res.status(500).json({ error: "Failed to save conversation" });
  }
};

// Controller to fetch all conversations
export const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ createdAt: -1 });
    res.status(200).json(conversations);
  } catch (error) {
    if (isDevelopment) console.error("Error fetching conversations:", error.message);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};
