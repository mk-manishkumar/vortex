import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:5001/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Ask AI endpoint
export const askAI = async (prompt) => {
  try {
    const response = await apiClient.post("/ask-ai", { prompt });
    return response.data.response;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || "Failed to get AI response";
    toast.error(errorMessage);
    throw error;
  }
};

// Save conversation endpoint
export const saveConversation = async (prompt, response) => {
  try {
    const result = await apiClient.post("/save-conversation", { prompt, response });
    toast.success("Conversation saved successfully!");
    return result.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || "Failed to save conversation";
    toast.error(errorMessage);
    throw error;
  }
};

// Get all conversations endpoint
export const getConversations = async () => {
  try {
    const response = await apiClient.get("/conversations");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || "Failed to fetch conversations";
    toast.error(errorMessage);
    throw error;
  }
};
